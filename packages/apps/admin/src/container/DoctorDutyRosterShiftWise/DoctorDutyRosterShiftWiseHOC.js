import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {DateTimeFormatterUtils, EnterKeyPressUtils, TryCatchHandler} from "@frontend-appointment/helpers";
import {
    BreakTypeSetupMiddleware,
    DDRShiftWiseMiddleware,
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
const {
    checkExistingAvailability,
    saveDDRWeekdays
} = DDRShiftWiseMiddleware;

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
    FETCH_EXISTING_DDR_AVAILABILITY,
    SAVE_DDR_WEEKDAYS,
} = AdminModuleAPIConstants.ddrShiftWiseApiConstants;

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
            hasOverride: "N",
            formValid: false,
            isCreatingRosterAvailable: false,
            showAssignShiftToDoctorModal: false,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            settingsClonedFromWeekday: '',
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
                status,
                doctorShifts
            } = doctorInformation;

            let formValid =
                fromDate &&
                toDate &&
                hospital &&
                specialization &&
                doctor &&
                status;
            if (doctorShifts && doctorShifts.length) {
                let selectedShifts = doctorShifts.filter(docShift => docShift.checked);
                selectedShifts && selectedShifts.map(selectedShift => {
                    formValid = formValid &&
                        selectedShift.rosterGapDuration;
                    selectedShift.weekdaysDetail && selectedShift.weekdaysDetail.map(weekDayDetail => {
                        formValid = weekDayDetail.dayOffStatus === 'Y' ?
                            weekDayDetail.endTime &&
                            weekDayDetail.startTime
                            : formValid;
                        weekDayDetail.breakDetail && weekDayDetail.breakDetail.length && weekDayDetail.breakDetail.map(breakDetail => {
                            formValid = formValid &&
                                breakDetail.startTime &&
                                breakDetail.endTime &&
                                breakDetail.breakType
                            return ''
                        })
                        return ''
                    })
                    return ''
                })
            }

            // shiftDetail.weekdaysDetail ? shiftDetail.weekdaysDetail.map(weekDayDetail => ({
            //         endTime: weekDayDetail.endTime,
            //         hasBreak: weekDayDetail.breakDetail && weekDayDetail.breakDetail.length ? 'Y' : 'N',
            //         offStatus: weekDayDetail.dayOffStatus,
            //         startTime: weekDayDetail.startTime,
            //         weekDaysId: weekDayDetail.weekDaysId,
            //         breakDetail: weekDayDetail.breakDetail && weekDayDetail.breakDetail.length ?
            //             weekDayDetail.breakDetail.map(breakDetail => ({
            //                 breakTypeId: breakDetail.breakType ? breakDetail.breakType.value : '',
            //                 endTime: breakDetail.endTime,
            //                 remarks: '',
            //                 startTime: breakDetail.startTime,
            //                 status: 'Y'
            //             }))
            //             : []
            //     }))

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

        findSelectedShiftIndexAndUpdateShiftDetails = async (shiftDetail) => {
            let shiftDetailsCopy = [...this.state.shiftDetails];
            let changedShiftIndex = shiftDetailsCopy.findIndex(shift => shift.shiftId === shiftDetail.shiftId);
            if (changedShiftIndex >= 0) shiftDetailsCopy[changedShiftIndex] = shiftDetail;

            await this.setState({
                shiftDetails: [
                    ...shiftDetailsCopy
                ],
            });
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
            const {doctor, specialization, fromDate, toDate} = this.state.doctorInformation;
            try {
                let requestDTO = {
                    doctorId: doctor ? doctor.value : "",
                    specializationId: specialization ? specialization.value : '',
                    fromDate,
                    toDate
                };
                await this.props.checkExistingAvailability(FETCH_EXISTING_DDR_AVAILABILITY, requestDTO);
                const {hasExistingRosters} = this.props.DDRExistingAvailabilityReducer;
                if (!hasExistingRosters) {
                    await this.fetchActiveShiftsByDoctorIdForDropdown(this.state.doctorInformation.doctor.value);
                } else {
                    //    OPEN EXISTING MODAL
                }
            } catch (e) {
                this.setState({
                    isCreatingRosterAvailable: false
                })
            }
            this.setDoctorShiftsAndShiftDetails([...this.props.ShiftDropdownReducer.activeShiftByDoctorIdForDropdown]);
        };

        handleShiftSelection = async (shift, index, isGapDurationChange, event) => {
            const {doctorInformation, shiftDetails} = this.state;
            let doctorShiftsCopy = [...doctorInformation.doctorShifts],
                shiftDetailsCopy = [...shiftDetails];

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

                let shiftDetailsWithGapDurationUpdated = shiftDetailsCopy.map(shiftDetail => {
                    if (shiftDetail.shiftId === doctorShiftsCopy[index].value)
                        return {
                            ...shiftDetail,
                            rosterGapDuration: doctorShiftsCopy[index].rosterGapDuration
                        };
                    else
                        return shiftDetail;
                });

                await this.setState({
                    doctorInformation: {
                        ...this.state.doctorInformation,
                        doctorShifts: [...doctorShiftsCopy],
                    },
                    shiftDetails: [...shiftDetailsWithGapDurationUpdated]
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

            switch (type) {
                case 'ADD':
                    // COPY VALUES TO BE CHANGED
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

                    // ON ANY PARAMETER CHANGE OF ANY WEEKDAY, SET IS CLONE SETTING TO FALSE
                    shiftDetail.weekdaysDetail.map(weekday => {
                        return this.setIsCloneSettingToFalse(weekday);
                    });

                    await this.findSelectedShiftIndexAndUpdateShiftDetails(shiftDetail);
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
            switch (type) {
                case 'ADD':
                    selectedShift.wholeWeekOff = value;

                    let updatedWeekdaysDetail = selectedShift.weekdaysDetail.map(weekday => {
                        this.setDefaultStartTimeAndEndTimeOnDayOff(value, weekday);
                        weekday.dayOffStatus = value;
                        return weekday;
                    });

                    selectedShift.weekdaysDetail = [...updatedWeekdaysDetail];
                    await this.findSelectedShiftIndexAndUpdateShiftDetails(selectedShift);
                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    break;
                default:
                    break

            }
        };

        handleAddBreak = async (selectedShift, weekdayIndex) => {
            let selectedWeekday = {...selectedShift.weekdaysDetail[weekdayIndex]},
                breakData = {
                    breakType: null,
                    startTime: '',
                    endTime: '',
                    errorMessage: ''
                };

            selectedWeekday.breakDetail.push(breakData);
            selectedShift.weekdaysDetail[weekdayIndex] = {...selectedWeekday};
            await this.findSelectedShiftIndexAndUpdateShiftDetails(selectedShift);

        };

        handleRemoveBreak = async (selectedShift, weekdayIndex, removedBreakIndex) => {
            let shiftDetailsCopy = [...this.state.shiftDetails],
                selectedWeekday = {...selectedShift.weekdaysDetail[weekdayIndex]};

            selectedWeekday.breakDetail.splice(removedBreakIndex, 1);
            selectedShift.weekdaysDetail[weekdayIndex] = {...selectedWeekday};
            await this.findSelectedShiftIndexAndUpdateShiftDetails(shiftDetailsCopy, selectedShift);
        };

        handleBreakFormChange = async (event, selectedShift, weekdayIndex, breakIndex) => {
            let fieldName = event.target.name;
            let value = event.target.type === "checkbox" ? event.target.checked ? 'Y' : 'N' : event.target.value;
            let label = event.target.label;
            switch (type) {
                case 'ADD':
                    // COPY VALUES TO BE CHANGED
                    let selectedBreak = {...selectedShift.weekdaysDetail[weekdayIndex].breakDetail[breakIndex]};

                    // SET VALUES AND VALIDATE
                    selectedBreak[fieldName] = (fieldName === 'breakType' && label) ? value ? {
                        label,
                        value
                    } : null : value;

                    if (fieldName === 'startTime' || fieldName === 'endTime') {
                        this.validateWeekdayStartTimeAndEndTimeAndSetErrorMessage(selectedBreak);
                    }

                    selectedShift.weekdaysDetail[weekdayIndex].breakDetail[breakIndex] = {...selectedBreak};
                    await this.findSelectedShiftIndexAndUpdateShiftDetails(selectedShift);

                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    break;
                default:
                    break

            }
        };

        handleCloneSetting = async (selectedShift, weekdayIndex) => {
            // let checked = event.target.checked;
            let updatedWeekdaysData,
                selectedWeekdayOfShift = selectedShift.weekdaysDetail[weekdayIndex];
            // if (checked) {
            updatedWeekdaysData
                = selectedShift.weekdaysDetail.map(weekday => {
                return {
                    ...weekday,
                    startTime: selectedWeekdayOfShift.startTime,
                    endTime: selectedWeekdayOfShift.endTime,
                    dayOffStatus: selectedWeekdayOfShift.dayOffStatus,
                    breakDetail: [...selectedWeekdayOfShift.breakDetail],
                    isSettingCloned: true,
                    isSettingCloneDisabled: weekday.weekDaysId !== selectedWeekdayOfShift.weekDaysId,
                }
            });
            // } else {
            //     updatedWeekdaysData
            //         = selectedShift.weekdaysDetail.map(weekday => {
            //         if (weekday.weekDaysId === selectedWeekdayOfShift.weekDaysId)
            //             return this.setIsCloneSettingToFalse(weekday);
            //         else
            //             return {
            //                 ...weekday,
            //                 startTime: "",
            //                 endTime: "",
            //                 dayOffStatus: "",
            //                 breakDetail: [],
            //                 isSettingCloned: false,
            //                 isSettingCloneDisabled: false
            //             }
            //     });
            // }

            selectedShift.weekdaysDetail = [...updatedWeekdaysData];
            await this.findSelectedShiftIndexAndUpdateShiftDetails(selectedShift);
            this.setState({
                settingsClonedFromWeekday: {...updatedWeekdaysData}
            })
        };

        handleSaveWeekDaysDoctorDutyRoster = async isSkipOverride => {
            try {
                await this.saveWeekDaysDoctorDutyRoster()
                if (isSkipOverride) {
                    // SAVE DATA AND RESET DOCTOR INFORMATION AND WEEKDAY DETAILS
                    this.resetDoctorShiftAndWeekDays()
                } else {
                    // SAVE DATA AND SHOW OVERRIDE ADD FORM DO NOT RESET OTHER FORMS BUT DISABLE.
                    this.setState({
                        hasOverride: 'Y'
                    })
                }
            } catch (e) {

            }
        };

        saveWeekDaysDoctorDutyRoster = async () => {
            const {doctorInformation, shiftDetails} = this.state;
            const {toDate, fromDate, specialization, doctor, hospital, status} = doctorInformation;

            let shiftData = shiftDetails && shiftDetails.map(shiftDetail => ({
                rosterGapDuration: shiftDetail.rosterGapDuration,
                shiftId: shiftDetail.shiftId,
                status: 'Y',
                weekDaysDetail: shiftDetail.weekdaysDetail ? shiftDetail.weekdaysDetail.map(weekDayDetail => ({
                        endTime: weekDayDetail.endTime,
                        hasBreak: weekDayDetail.breakDetail && weekDayDetail.breakDetail.length ? 'Y' : 'N',
                        offStatus: weekDayDetail.dayOffStatus,
                        startTime: weekDayDetail.startTime,
                        weekDaysId: weekDayDetail.weekDaysId,
                        breakDetail: weekDayDetail.breakDetail && weekDayDetail.breakDetail.length ?
                            weekDayDetail.breakDetail.map(breakDetail => ({
                                breakTypeId: breakDetail.breakType ? breakDetail.breakType.value : '',
                                endTime: breakDetail.endTime,
                                remarks: '',
                                startTime: breakDetail.startTime,
                                status: 'Y'
                            }))
                            : []
                    }))
                    : [],

            }))

            let requestDTO = {
                ddrDetail: {
                    doctorId: doctor && doctor.value,
                    fromDate: fromDate,
                    hospitalId: hospital && hospital.value,
                    specializationId: specialization && specialization.value,
                    status: status,
                    toDate: toDate
                },
                shiftDetail: shiftData ? [...shiftData] : []
            };
            try {
                await this.props.saveDDRWeekdays(SAVE_DDR_WEEKDAYS, requestDTO);
                this.showAlertMessage('success', this.props.DDRSaveReducer.saveWeekdaysSuccessMessage)
            } catch (e) {
                this.showAlertMessage('danger', this.props.DDRSaveReducer.saveWeekdaysErrorMessage)
                throw e;
            }
        }

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

        resetDoctorShiftAndWeekDays = async () => {
            this.setState({
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
                shiftDetails: [],
                isCreatingRosterAvailable: false,
            })
        }

        setIsCloneSettingToFalse = (weekday) => {
            return {
                ...weekday,
                isSettingCloned: false,
            };
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
                    status: 'Y',
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
                shiftDetails, isCreatingRosterAvailable, formValid, hasOverride
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

            const {isCheckExistingAvailabilityLoading} = this.props.DDRExistingAvailabilityReducer;
            const {isSaveDDRWeekdaysLoading} = this.props.DDRSaveReducer;

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
                        isCheckExistingAvailabilityLoading: isCheckExistingAvailabilityLoading,
                        handleCheckAvailability: this.handleCheckAvailability,
                        shiftErrorMessage: dropdownErrorMessage,
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
                        handleWholeWeekOff: this.handleWholeWeekOff,
                        handleAddBreak: this.handleAddBreak,
                        breakTypeList: activeBreakTypeByHospitalIdForDropdown,
                        handleRemoveBreak: this.handleRemoveBreak,
                        handleBreakFormChange: this.handleBreakFormChange,
                        handleCloneSetting: this.handleCloneSetting
                    }}
                    saveProps={{
                        formValid: formValid,
                        onButtonClick: this.handleSaveWeekDaysDoctorDutyRoster,
                        isSaveDDRWeekdaysLoading: isSaveDDRWeekdaysLoading
                    }}
                    overrideRosterProps={{
                        hasOverride: hasOverride
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
            'DDRExistingAvailabilityReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer',
            'ShiftDropdownReducer',
            'SpecializationDropdownReducer',
            'WeekdaysReducer',
            'DDRSaveReducer'
        ],
        {
            assignShiftsToDoctor,
            checkExistingAvailability,
            fetchActiveBreakTypeByHospitalIdForDropdown,
            fetchActiveHospitalsForDropdown,
            fetchActiveShiftByDoctorIdForDropdown,
            fetchActiveShiftByHospitalIdForDropdown,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchWeekdaysData,
            saveDDRWeekdays,
        });

};

export default DoctorDutyRosterShiftWiseHOC;
