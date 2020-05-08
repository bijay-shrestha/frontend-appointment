import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {DateTimeFormatterUtils, EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {
    BreakTypeSetupMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    ShiftSetupMiddleware,
    SpecializationSetupMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
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
    addDate,
    isFirstDateGreaterThanSecondDate,
    getDateWithTimeSetToGivenTime
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
                newDoctorShifts: []
            },
            formValid: false,
            showAssignShiftToDoctorModal: false,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
        };

        alertTimer = '';

        assignShiftsToDoctor = async () => {
            const {doctor, newDoctorShifts} = this.state.doctorInformation;
            let requestData = {
                doctorId: doctor ? doctor.value : '',
                shiftIds: newDoctorShifts && newDoctorShifts.length ? newDoctorShifts.map(newShift => newShift.value)
                    : []
            };
            try {
                await this.props.assignShiftsToDoctor(ASSIGN_SHIFTS_TO_DOCTOR, requestData);
                this.closeAssignNewShiftModal();
                this.addNewShiftsToDoctorShifts();
                let shiftNames = newDoctorShifts && newDoctorShifts.map(newShift => newShift.label);
                let successMessage = "New Shift(s) - " + shiftNames.join(', ') + ", has been assigned to Dr." + doctor.label + '.';
                this.showAlertMessage("success", successMessage);
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
                }
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
                showAssignShiftToDoctorModal: false
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
            // if (hasOverrideDutyRoster === 'Y') {
            //     formValid = formValid && doctorDutyRosterOverrideRequestDTOS.length
            // }
            //
            // doctorWeekDaysDutyRosterRequestDTOS.map(weekDay => {
            //     formValid = formValid && weekDay.startTime && weekDay.endTime
            // })

            this.setState({
                formValid: Boolean(formValid)
            })
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
                    this.resetSpecializationAndDoctorOnHospitalChange();
                    break;
                case "specialization":
                    value && await this.fetchActiveDoctorsBySpecializationIdForDropdown(value);
                    this.resetDoctorOnSpecializationChange();
                    break;
                case "fromDate" || "toDate":
                    await this.validateAndSetWeekDaysDataOnDateChange(key);
                    break;
                case "doctor":
                    if (value) {
                        try {
                            await this.fetchActiveShiftsByDoctorIdForDropdown(value);
                        } catch (e) {

                        }
                        this.setDoctorShifts([...this.props.ShiftDropdownReducer.activeShiftByDoctorIdForDropdown]);
                    } else {
                        this.setDoctorShifts([]);
                    }
                default:
                    break;
            }
            this.checkFormValidity();
            // type === 'ADD' ? this.checkFormValidity() : this.checkManageFormValidity();
        };

        handleAssignNewShiftToDoctor = async () => {
            this.fetchActiveShiftsByHospitalIdForDropdown(this.state.doctorInformation.hospital.value);
            await this.setState({
                showAssignShiftToDoctorModal: true
            });
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

        setDoctorShifts = doctorShiftList =>
            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    doctorShifts: doctorShiftList
                }
            });

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

        validateAndSetWeekDaysDataOnDateChange = async () => {
            let errorMessage = '';
            let originalWeekDaysData = [
                ...this.state.doctorWeekDaysDutyRosterRequestDTOS
            ];
            let weekDaysData = [];
            switch (type) {
                case 'ADD':
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(this.state.fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(this.state.toDate, 0, 0, 0)
                        )
                    ) {
                        errorMessage = DATE_ERROR_MESSAGE;
                        // weekDaysData = [...originalWeekDaysData]
                    } else {
                        // weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                        //     this.state.fromDate,
                        //     this.state.toDate,
                        //     [...this.props.WeekdaysReducer.weekdaysDataList]
                        // )
                    }
                    await this.setState({
                        doctorInformation: {
                            ...this.state.doctorInformation,
                            dateErrorMessage: errorMessage,
                        }
                        // doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
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
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer);
        }


        render() {
            const {doctorInformation, showAssignShiftToDoctorModal, showAlert, alertMessageInfo} = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {activeBreakTypeByHospitalIdForDropdown} = this.props.BreakTypeDropdownReducer;

            const {activeShiftByHospitalIdForDropdown} = this.props.ShiftDropdownReducer;

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
                        handleAssignNewShiftToDoctor: this.handleAssignNewShiftToDoctor
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
        });

};

export default DoctorDutyRosterShiftWiseHOC;
