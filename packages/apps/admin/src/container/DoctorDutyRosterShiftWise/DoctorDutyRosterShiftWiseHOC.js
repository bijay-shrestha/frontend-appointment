import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {DateTimeFormatterUtils, EnterKeyPressUtils, TryCatchHandler} from "@frontend-appointment/helpers";
import {
    BreakTypeSetupMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    ShiftSetupMiddleware,
    SpecializationSetupMiddleware,
    WeekdaysMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md'

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;

const {fetchSpecializationHospitalWiseForDropdown} = SpecializationSetupMiddleware;

const {fetchDoctorsBySpecializationIdForDropdown} = DoctorMiddleware;

const {
    assignShiftsToDoctor,
    fetchActiveShiftByDoctorIdForDropdown,
    fetchActiveShiftByHospitalIdForDropdown
} = ShiftSetupMiddleware;

const {fetchActiveBreakTypeByHospitalIdForDropdown} = BreakTypeSetupMiddleware;

const {fetchWeekdaysData} = WeekdaysMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {
    ASSIGN_SHIFTS_TO_DOCTOR,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN
} = AdminModuleAPIConstants.shiftSetupApiConstants;

const {FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN} = AdminModuleAPIConstants.breakTypeSetupApiConstants;

const {
    // ACTIVE_DROPDOWN_SPECIALIZATION,
    SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL
} = AdminModuleAPIConstants.specializationSetupAPIConstants;

const {
    FETCH_DOCTOR_BY_SPECIALIZATION_ID,
    // FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN,
    // FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
} = AdminModuleAPIConstants.doctorSetupApiConstants;

const {
    FETCH_WEEKDAYS_DATA
} = CommonAPIConstants.WeekdaysApiConstants;

const {
    addDate,
    isFirstDateGreaterThanSecondDate,
    getDateWithTimeSetToGivenTime,
    isFirstTimeGreaterThanSecond
} = DateTimeFormatterUtils;

const DATE_ERROR_MESSAGE = 'From date must not be greater than to date!';
const TIME_ERROR_MESSAGE = 'Start time must not be greater than end time!';

const DoctorDutyRosterShiftWiseHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRosterShiftWiseHOC extends PureComponent {

        state = {
            doctorInformation: {
                fromDate: new Date(),
                toDate: addDate(new Date(), 6),
                hospital: null,
                specialization: null,
                doctor: null,
                rosterGapDuration: '',
                status: 'Y',
                doctorShifts: [],
                newDoctorShifts: [],
                dateErrorMessage: ''
            },
            weekdaysInclusiveOfDates: [],
            shiftDetails: [],
            formValid: false,
            isCreatingRosterAvailable: false,
            showAssignShiftToDoctorModal: false,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
        };

        alertTimer = '';

        assignShiftsToDoctor = async () => {
            const {doctor, hospital, newDoctorShifts} = this.state.doctorInformation;
            let requestData = {
                hospitalId: hospital ? hospital.value : '',
                doctorId: doctor ? doctor.value : '',
                shiftIds: newDoctorShifts && newDoctorShifts.length ? newDoctorShifts.map(newShift => newShift.value)
                    : []
            };
            try {
                await this.props.assignShiftsToDoctor(ASSIGN_SHIFTS_TO_DOCTOR, requestData);
                this.addNewShiftsToDoctorShifts();
                let shiftNames = newDoctorShifts && newDoctorShifts.map(newShift => newShift.label);
                let successMessage = "New Shift(s) - " + shiftNames.join(', ') + ", has been assigned to Dr." + doctor.label + '.';
                this.showAlertMessage("success", successMessage);
                this.setDoctorShiftsAndShiftDetails([...this.state.doctorInformation.doctorShifts]);
            } catch (e) {

            }
        };

        addNewShiftsToDoctorShifts = () => {
            let initialDoctorShifts = [...this.state.doctorInformation.doctorShifts];
            let newShifts = [...this.state.doctorInformation.newDoctorShifts];

            newShifts.map(newShift => initialDoctorShifts.push(
                {...newShift, checked: true}
            ));
            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    doctorShifts: [...initialDoctorShifts],
                    newDoctorShifts: []
                },
                showAssignShiftToDoctorModal: false,
            });
        };

        clearAlertTimeout = () => {
            this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            });
        };

        closeAssignNewShiftModal = () => {
            this.setState({
                showAssignShiftToDoctorModal: false,
                doctorInformation: {
                    ...this.state.doctorInformation,
                    newDoctorShifts: []
                }
            })
        };

        checkFormValidity = () => {
            const {
                doctorInformation,
                // hasOverrideDutyRoster,
                // doctorDutyRosterOverrideRequestDTOS,
                // doctorWeekDaysDutyRosterRequestDTOS
            } = this.state;
            const {
                fromDate,
                toDate,
                hospital,
                specialization,
                doctor,
                rosterGapDuration,
                status,
                doctorShifts
            } = doctorInformation;

            let formValid =
                fromDate &&
                toDate &&
                hospital &&
                specialization &&
                doctor &&
                rosterGapDuration &&
                status &&
                doctorShifts;

            this.setState({
                formValid: Boolean(formValid)
            })
        };

        checkIfWholeWeekOff = weekdaysAvailabilityData => {
            let wholeWeekOff = true;
            weekdaysAvailabilityData.map(day => {
                wholeWeekOff = wholeWeekOff && day.dayOffStatus === 'Y';
                return day
            });
            return wholeWeekOff
        };

        fetchHospitalsForDropdown = async () => {
            await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
        };

        fetchActiveSpecializationByHospitalForDropdown = async hospitalId => {
            return await this.props.fetchSpecializationHospitalWiseForDropdown(
                SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
                hospitalId
            )
        };

        fetchActiveDoctorsBySpecializationIdForDropdown = async specializationId => {
            return await this.props.fetchDoctorsBySpecializationIdForDropdown(
                FETCH_DOCTOR_BY_SPECIALIZATION_ID,
                specializationId
            )
        };

        fetchActiveShiftsByDoctorIdForDropdown = async doctorId => {
            return await this.props.fetchActiveShiftByDoctorIdForDropdown(FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN,
                doctorId);
        };

        fetchActiveShiftsByHospitalIdForDropdown = async hospitalId => {
            return await this.props.fetchActiveShiftByHospitalIdForDropdown(FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN,
                hospitalId);
        };

        fetchActiveBreakTypesByHospitalIdForDropdown = async hospitalId => {
            return await this.props.fetchActiveBreakTypeByHospitalIdForDropdown(
                FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN,
                hospitalId);
        };

        fetchWeekdaysData = async () => {
            const {fromDate, toDate} = this.state.doctorInformation;
            await TryCatchHandler.genericTryCatch(
                this.props.fetchWeekdaysData(FETCH_WEEKDAYS_DATA)
            );
            const weekDays = JSON.parse(
                JSON.stringify([...this.props.WeekdaysReducer.weekdaysDataList])
            );
            let weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                fromDate,
                toDate,
                [...weekDays]
            );
            this.setState({
                weekdaysInclusiveOfDates: [...weekDaysData]
            })
        };

        handleEnter = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handleDoctorInformationFormChange = async (event, fieldName, fieldValid) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;
            let fileUri = fieldName ? '' : event.target.fileUri;
            let values = fieldName ? '' : event.target.values;

            await this.setValuesInState(key, values ? values : value, label, fileUri, fieldValid, "doctorInformation");

            switch (key) {
                case "hospital":
                    value && await this.fetchActiveSpecializationByHospitalForDropdown(value);
                    value && this.fetchActiveBreakTypesByHospitalIdForDropdown(value);
                    this.resetSpecializationAndDoctorOnHospitalChange();
                    break;
                case "specialization":
                    value && await this.fetchActiveDoctorsBySpecializationIdForDropdown(value);
                    this.resetDoctorOnSpecializationChange();
                    break;
                case "fromDate":
                    await this.validateAndSetWeekDaysDataOnDateChange(key);
                    break;
                case "toDate":
                    await this.validateAndSetWeekDaysDataOnDateChange(key);
                    break;
                case "doctor":
                    break;
                default:
                    break;
            }
            if (key !== 'newDoctorShifts') {
                this.resetShiftAndWeekdaysRosterDetails();
                this.checkFormValidity();
            }
        };

        handleCheckAvailability = async () => {
            try {
                await this.fetchActiveShiftsByDoctorIdForDropdown(this.state.doctorInformation.doctor.value);
            } catch (e) {
                this.setState({
                    isCreatingRosterAvailable: false
                })
            }
            this.setDoctorShiftsAndShiftDetails([...this.props.ShiftDropdownReducer.activeShiftByDoctorIdForDropdown]);
        };

        handleShiftSelection = async (shift, index, isGapDurationChange, event) => {
            const {doctorInformation, shiftDetails} = this.state;
            let doctorShiftsCopy = [...doctorInformation.doctorShifts];
            let shiftDetailsCopy = [...shiftDetails];

            if (!isGapDurationChange) {
                // HANDLE SHIFT CHECKED UNCHECKED

                //CHECK UNCHECK SHIFTS FROM DOCTOR'S SHIFT LIST.
                shift.checked = !shift.checked;
                doctorShiftsCopy[index] = shift;

                let activeShift = doctorShiftsCopy.filter(doctorShift => doctorShift.checked);
                if (activeShift.length) {
                    // BASED ON SHIFT SELECTED OR DE-SELECTED, ADD SHIFT WITH WEEKDAYS DATA TO SHIFT DETAILS.
                    if (shift.checked) {
                        let shiftIndexInShiftDetails = shiftDetailsCopy.findIndex(shiftDetail => shiftDetail.shiftId === shift.value);
                        if (shiftIndexInShiftDetails <= 0)
                            shiftDetailsCopy.push(this.setShiftDetailObjectWithWeekdays(shift));
                    } else {
                        let shiftIndexInShiftDetails = shiftDetailsCopy.findIndex(shiftDetail => shiftDetail.shiftId === shift.value);
                        if (shiftIndexInShiftDetails >= 0) {
                            shift.rosterGapDuration = '';
                            shiftDetailsCopy.splice(shiftIndexInShiftDetails, 1);
                        }
                    }

                    await this.setState({
                        shiftDetails: [...shiftDetailsCopy],
                        doctorInformation: {
                            ...this.state.doctorInformation,
                            doctorShifts: [...doctorShiftsCopy]
                        }
                    });
                } else {
                    shift.checked = true;
                    this.showAlertMessage("warning", "There  must be one shift in Doctor Duty Roster.")
                }
            } else {
                // HANDLE SHIFT ROSTER GAP DURATION CHANGE
                shift.rosterGapDuration = event.target.value;
                doctorShiftsCopy[index] = shift;
                await this.setState({
                    doctorInformation: {
                        ...this.state.doctorInformation,
                        doctorShifts: [...doctorShiftsCopy]
                    }
                });
            }
        };

        handleAssignNewShiftToDoctor = async () => {
            this.fetchActiveShiftsByHospitalIdForDropdown(this.state.doctorInformation.hospital.value);
            await this.setState({
                showAssignShiftToDoctorModal: true
            });
        };

        handleWeekdaysFormChange = async (event, shiftDetail, weekDayIndex) => {
            let fieldName = event.target.name;
            let value = event.target.type === "checkbox" ? event.target.checked ? 'Y' : 'N' : event.target.value;
            let shiftDetailsCopy;

            switch (type) {
                case 'ADD':
                    // COPY VALUES TO BE CHANGED
                    shiftDetailsCopy = [...this.state.shiftDetails];
                    let selectedWeekday = {...shiftDetail.weekdaysDetail[weekDayIndex]};

                    // SET VALUES AND VALIDATE
                    selectedWeekday[fieldName] = value;
                    shiftDetail.wholeWeekOff = this.checkIfWholeWeekOff(shiftDetail.weekdaysDetail) ? 'Y' : 'N';

                    if (fieldName === 'startTime' || fieldName === 'endTime') {
                        this.validateWeekdayStartTimeAndEndTimeAndSetErrorMessage(selectedWeekday);
                    } else if (fieldName === 'dayOffStatus') {
                        this.setDefaultStartTimeAndEndTimeOnDayOff(value, selectedWeekday);
                    }

                    shiftDetail.weekdaysDetail[weekDayIndex] = {...selectedWeekday};
                    let changedShiftIndex = shiftDetailsCopy.findIndex(shift => shift.shiftId === shiftDetail.shiftId);
                    if (changedShiftIndex >= 0) shiftDetailsCopy[changedShiftIndex] = shiftDetail;

                    await this.setState({
                        shiftDetails: [
                            ...shiftDetailsCopy
                        ],
                    });

                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    break;
                default:
                    break

            }

        };

        handleWholeWeekOff = async (event, selectedShift) => {
            // let fieldName = event.target.name;
            let value = event.target.type === "checkbox" ? event.target.checked ? 'Y' : 'N' : event.target.value;
            let shiftDetailsCopy;
            switch (type) {
                case 'ADD':
                    shiftDetailsCopy = [...this.state.shiftDetails];
                    selectedShift.wholeWeekOff = value;

                    let updatedWeekdaysDetail = selectedShift.weekdaysDetail.map(weekday => {
                        this.setDefaultStartTimeAndEndTimeOnDayOff(value, weekday);
                        weekday.dayOffStatus = value;
                        return weekday;
                    });

                    selectedShift.weekdaysDetail = [...updatedWeekdaysDetail];
                    let changedShiftIndex = shiftDetailsCopy.findIndex(shift => shift.shiftId === selectedShift.shiftId);
                    if (changedShiftIndex >= 0) shiftDetailsCopy[changedShiftIndex] = selectedShift;

                    await this.setState({
                        shiftDetails: [
                            ...shiftDetailsCopy
                        ],
                    });

                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    break;
                default:
                    break

            }
        };

        resetSpecializationAndDoctorOnHospitalChange = () => {
            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    specialization: null,
                    doctor: null,
                }
            })
        };

        resetDoctorOnSpecializationChange = () => {
            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    doctor: null,
                    doctorShifts: []
                }
            });
        };

        resetShiftAndWeekdaysRosterDetails = () => {
            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    doctorShifts: [],
                },
                shiftDetails: [],
                isCreatingRosterAvailable: false,
            });
        };

        setValuesInState = (key, value, label, fileUri, fieldValid, objectName) => {
            let doctorInformationData = {...this.state[objectName]};
            doctorInformationData[key] = label
                ? (value
                    ? (fileUri ? {label, value, fileUri} : {label, value})
                    : null)
                : value;
            this.setState({
                [objectName]: {...doctorInformationData}
            })
        };

        setDefaultStartTimeAndEndTimeOnDayOff = (value, selectedWeekday) => {
            if (value === 'Y') {
                selectedWeekday.startTime = getDateWithTimeSetToGivenTime(
                    new Date(),
                    0,
                    0,
                    0
                );
                selectedWeekday.endTime = getDateWithTimeSetToGivenTime(
                    new Date(),
                    23,
                    59,
                    59
                );
                selectedWeekday.errorMessage = ''
            } else {
                selectedWeekday.startTime = '';
                selectedWeekday.endTime = '';
                selectedWeekday.errorMessage = '';
            }
        };

        setDoctorShiftsAndShiftDetails = doctorShiftList => {
            let selectedDoctorShifts = doctorShiftList && doctorShiftList.length ?
                doctorShiftList.filter(doctorShift => doctorShift.checked) : [];

            let shiftDetails = this.setShiftDetailsFromDoctorShiftList(selectedDoctorShifts);

            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    doctorShifts: [...doctorShiftList],
                },
                shiftDetails: [...shiftDetails],
                isCreatingRosterAvailable: true
            });
        };

        setShiftDetailsFromDoctorShiftList = doctorShiftList => {
            let shiftDetails = [];

            if (doctorShiftList && doctorShiftList.length) {
                shiftDetails = doctorShiftList.map(shift => {
                    return this.setShiftDetailObjectWithWeekdays(shift);
                })
            }
            return shiftDetails;
        };

        setShiftDetailObjectWithWeekdays = shift => {
            const weekdaysData = JSON.parse(JSON.stringify(this.state.weekdaysInclusiveOfDates));
            if (shift)
                return {
                    shiftId: shift.value,
                    shiftName: shift.label,
                    wholeWeekOff: 'N',
                    rosterGapDuration: shift.rosterGapDuration,
                    weekdaysDetail: [...weekdaysData]
                };
            else return {};
        };

        showAlertMessage = (type, message) => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: type,
                    message: message
                }
            });
            this.clearAlertTimeout();
        };

        validateWeekdayStartTimeAndEndTimeAndSetErrorMessage = (selectedWeekday) => {
            if (
                selectedWeekday.startTime &&
                selectedWeekday.endTime
            ) {
                selectedWeekday.errorMessage = isFirstTimeGreaterThanSecond(
                    selectedWeekday.startTime,
                    selectedWeekday.endTime
                )
                    ? TIME_ERROR_MESSAGE
                    : ''
            } else {
                selectedWeekday.errorMessage = ''
            }
        };

        validateAndSetWeekDaysDataOnDateChange = async () => {
            let errorMessage = '';
            let originalWeekDaysData = [
                ...this.state.weekdaysInclusiveOfDates
            ];
            let weekDaysData = [];
            switch (type) {
                case 'ADD':
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(this.state.doctorInformation.fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(this.state.doctorInformation.toDate, 0, 0, 0)
                        )
                    ) {
                        errorMessage = DATE_ERROR_MESSAGE;
                        weekDaysData = [...originalWeekDaysData]
                    } else {
                        weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                            this.state.doctorInformation.fromDate,
                            this.state.doctorInformation.toDate,
                            [...this.props.WeekdaysReducer.weekdaysDataList]
                        )
                    }
                    await this.setState({
                        doctorInformation: {
                            ...this.state.doctorInformation,
                            dateErrorMessage: errorMessage,
                        },
                        weekdaysInclusiveOfDates: [...weekDaysData],
                    });
                    break;
                case 'MANAGE':
                    //     const {
                    //         fromDate,
                    //         toDate,
                    //         weekDaysDataOriginal
                    //     } = this.state.updateDoctorDutyRosterData
                    //     let weekDaysWithTime = []
                    //     if (
                    //         isFirstDateGreaterThanSecondDate(
                    //             getDateWithTimeSetToGivenTime(fromDate, 0, 0, 0),
                    //             getDateWithTimeSetToGivenTime(toDate, 0, 0, 0)
                    //         )
                    //     ) {
                    //         errorMessage = DATE_ERROR_MESSAGE
                    //         weekDaysWithTime = [...originalWeekDaysData]
                    //     } else {
                    //         weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                    //             fromDate,
                    //             this.state.updateDoctorDutyRosterData.toDate,
                    //             [...this.props.WeekdaysReducer.weekdaysDataList]
                    //         )
                    //         weekDaysWithTime = weekDaysData.map(weekDayData => {
                    //             let originalDataWithTime = weekDaysDataOriginal.find(
                    //                 originalData =>
                    //                     originalData.weekDaysId === weekDayData.weekDaysId
                    //             )
                    //             weekDayData.startTime = originalDataWithTime
                    //                 ? originalDataWithTime.startTime
                    //                 : ''
                    //             weekDayData.endTime = originalDataWithTime
                    //                 ? originalDataWithTime.endTime
                    //                 : ''
                    //             weekDayData.dayOffStatus = originalDataWithTime
                    //                 ? originalDataWithTime.dayOffStatus
                    //                 : 'N'
                    //             return weekDayData
                    //         })
                    //     }
                    //
                    //     await this.setState({
                    //         dateErrorMessage: errorMessage,
                    //         updateDoctorDutyRosterData: {
                    //             ...this.state.updateDoctorDutyRosterData,
                    //             weekDaysDutyRosterUpdateRequestDTOS: [...weekDaysWithTime]
                    //         }
                    //     })
                    break;
                default:
                    break
            }
        };


        initialApiCalls = () => {
            this.fetchHospitalsForDropdown();
            this.fetchWeekdaysData();
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer);
        }


        render() {
            const {
                doctorInformation, showAssignShiftToDoctorModal, showAlert, alertMessageInfo,
                shiftDetails, isCreatingRosterAvailable
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {activeBreakTypeByHospitalIdForDropdown} = this.props.BreakTypeDropdownReducer;

            const {activeShiftByHospitalIdForDropdown, dropdownErrorMessage} = this.props.ShiftDropdownReducer;

            const {
                isAssignShiftsToDoctorLoading,
                assignShiftsToDoctorErrorMessage,
            } = this.props.AssignShiftsToDoctorReducer;

            const {
                activeSpecializationListByHospital,
                // allActiveSpecializationList,
                // dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer;

            const {
                doctorsBySpecializationForDropdown,
                // doctorDropdownErrorMessage,
                // activeDoctorsForDropdown,
                // activeDoctorsByHospitalForDropdown
            } = this.props.DoctorDropdownReducer;

            return <>
                <ComposedComponent
                    doctorInformationFormData={{
                        doctorInformationData: doctorInformation,
                        onInputChange: this.handleDoctorInformationFormChange,
                        onEnterKeyPress: this.handleEnter,
                        hospitalList: hospitalsForDropdown,
                        specializationList: activeSpecializationListByHospital,
                        doctorList: doctorsBySpecializationForDropdown,
                        handleAssignNewShiftToDoctor: this.handleAssignNewShiftToDoctor,
                        handleShiftSelection: this.handleShiftSelection,
                        isCreatingRosterAvailable: isCreatingRosterAvailable,
                        handleCheckAvailability: this.handleCheckAvailability,
                        shiftErrorMessage: dropdownErrorMessage
                    }}
                    assignNewShiftModalData={{
                        showAssignShiftToDoctorModal: showAssignShiftToDoctorModal,
                        closeModal: this.closeAssignNewShiftModal,
                        activeShiftByHospitalIdForDropdown,
                        onInputChange: this.handleDoctorInformationFormChange,
                        doctorInformationData: doctorInformation,
                        assignShiftsToDoctor: this.assignShiftsToDoctor,
                        isAssignShiftsToDoctorLoading: isAssignShiftsToDoctorLoading,
                        errorMessage: assignShiftsToDoctorErrorMessage
                    }}
                    weekdaysRosterFormData={{
                        shiftDetails: shiftDetails,
                        doctorInformationData: doctorInformation,
                        handleWeekdaysFormChange: this.handleWeekdaysFormChange,
                        handleWholeWeekOff: this.handleWholeWeekOff
                    }}
                />
                <CAlert
                    id="profile-manage"
                    variant={alertMessageInfo.variant}
                    show={showAlert}
                    onClose={this.closeAlert}
                    alertType={
                        alertMessageInfo.variant === 'success' ? (
                            <>
                                <Material.MdDone/>
                            </>
                        ) : (
                            <>
                                <i
                                    className="fa fa-exclamation-triangle"
                                    aria-hidden="true"
                                />
                            </>
                        )
                    }
                    message={alertMessageInfo.message}
                />
            </>;
        }
    }

    return ConnectHoc(DoctorDutyRosterShiftWiseHOC,
        [
            'AssignShiftsToDoctorReducer',
            'BreakTypeDropdownReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer',
            'ShiftDropdownReducer',
            'SpecializationDropdownReducer',
            'WeekdaysReducer'
        ],
        {
            assignShiftsToDoctor,
            fetchActiveBreakTypeByHospitalIdForDropdown,
            fetchActiveHospitalsForDropdown,
            fetchActiveShiftByDoctorIdForDropdown,
            fetchActiveShiftByHospitalIdForDropdown,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchWeekdaysData
        });

};

export default DoctorDutyRosterShiftWiseHOC;
