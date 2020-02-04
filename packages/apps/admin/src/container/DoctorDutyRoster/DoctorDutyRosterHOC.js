import React, {PureComponent} from 'react';
import {ConnectHoc, TryCatchHandler} from "@frontend-appointment/commons";
import {
    DoctorDutyRosterMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware,
    WeekdaysMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {DateTimeFormatterUtils, DoctorDutyRosterUtils, EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware;
const {fetchDoctorsBySpecializationIdForDropdown} = DoctorMiddleware;
const {fetchWeekdays} = WeekdaysMiddleware;
const {fetchExistingDoctorDutyRoster, createDoctorDutyRoster} = DoctorDutyRosterMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hostpitalSetupApiConstants;
const {ACTIVE_DROPDOWN_SPECIALIZATION} = AdminModuleAPIConstants.specializationSetupAPIConstants;
const {FETCH_DOCTOR_BY_SPECIALIZATION_ID} = AdminModuleAPIConstants.doctorSetupApiConstants;
const {FETCH_WEEKDAYS} = CommonAPIConstants.WeekdaysApiConstants;
const {FETCH_EXISTING_DOCTOR_DUTY_ROSTER, CREATE_DOCTOR_DUTY_ROSTER} = AdminModuleAPIConstants.doctorDutyRosterApiConstants;

const {convertDateToHourMinuteFormat, convertDateToYearMonthDateFormat} = DateTimeFormatterUtils;

const DoctorDutyRosterHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRoster extends PureComponent {
        state = {
            showExistingRosterModal: false,
            showAddOverrideModal: false,
            isModifyOverride: false,
            showAlert: false,
            formValid: true,
            showConfirmModal: false,
            hospital: null,
            specialization: null,
            doctor: null,
            rosterGapDuration: '',
            status: 'Y',
            fromDate: new Date(),
            toDate: new Date(),
            hasOverrideDutyRoster: 'N',
            isWholeWeekOff: 'N',
            doctorWeekDaysDutyRosterRequestDTOS: [],
            doctorDutyRosterOverrideRequestDTOS: [],
            overrideRequestDTO: {
                fromDate: new Date(),
                toDate: new Date(),
                startTime: '',
                endTime: '',
                dayOffStatus: 'N',
                remarks: '',
                fromDateDisplay: '',
                toDateDisplay: '',
                startTimeDisplay: '',
                endTimeDisplay: ''
            },
            alertMessageInfo: {
                variant: "",
                message: ""
            },
        };

        resetAddForm = () => {
            this.setState({
                hospital: null,
                specialization: null,
                doctor: null,
                rosterGapDuration: '',
                status: 'Y',
                fromDate: new Date(),
                toDate: new Date(),
                hasOverrideDutyRoster: 'N',
                isWholeWeekOff: 'N',
                doctorWeekDaysDutyRosterRequestDTOS: [],
                doctorDutyRosterOverrideRequestDTOS: [],
                overrideRequestDTO: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    startTime: '',
                    endTime: '',
                    dayOffStatus: 'N',
                    remarks: '',
                    fromDateDisplay: '',
                    toDateDisplay: '',
                    startTimeDisplay: '',
                    endTimeDisplay: ''
                },
            })
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        fetchHospitalsForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
        };

        fetchSpecializationForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchSpecializationForDropdown(ACTIVE_DROPDOWN_SPECIALIZATION))
        };

        fetchWeekdaysData = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchWeekdays(FETCH_WEEKDAYS));
            let weekDaysData = await DoctorDutyRosterUtils.prepareWeekdaysData([...this.props.WeekdaysReducer.weekdaysList]);
            this.setState({
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
            });
        };

        fetchExistingRoster = async () => {
            const {doctor, fromDate, toDate, specialization} = this.state;
            return await this.props.fetchExistingDoctorDutyRoster(
                FETCH_EXISTING_DOCTOR_DUTY_ROSTER, {
                    doctorId: doctor ? doctor.value : '',
                    specializationId: specialization ? specialization.value : '',
                    fromDate: fromDate,
                    toDate: toDate
                });
        };

        handleShowExistingRoster = () => {
            this.setState({
                showExistingRosterModal: !this.state.showExistingRosterModal
            })
        };

        handleInputChange = (event, fieldValid) => {
            event && this.bindValuesToState(event, fieldValid);
        };

        handleDateChange = (date, name) => {
            date && this.setState({
                [name]: date
            })
        };

        handleAvailabilityTimeChange = (time, fieldName, index) => {
            if (time) {
                let doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                doctorWeekDaysAvailability[index][fieldName] = time;
                this.setState({
                    doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysAvailability]
                })
            }
        };

        handleDayOffStatusChange = (event, index) => {
            if (event) {
                let doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                doctorWeekDaysAvailability[index].dayOffStatus = event.target.checked ? 'Y' : 'N';
                this.setState({
                    doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysAvailability]
                })
            }
        };

        handleWholeWeekOff = (event) => {
            if (event) {
                let doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                let updatedWeekDays = doctorWeekDaysAvailability.map(day => {
                    day.dayOffStatus = event.target.checked ? 'Y' : 'N';
                    return day
                });
                this.setState({
                    isWholeWeekOff: event.target.checked ? 'Y' : 'N',
                    doctorWeekDaysDutyRosterRequestDTOS: [...updatedWeekDays]
                })
            }
        };

        handleOverrideDutyRoster = (event) => {
            if (event) {
                let isOverride = event.target.checked;
                if (isOverride) {
                    this.setState({
                        hasOverrideDutyRoster: 'Y',
                        showAddOverrideModal: true
                    })
                } else {
                    this.setState({
                        hasOverrideDutyRoster: 'N',
                        doctorDutyRosterOverrideRequestDTOS: [],
                        overrideRequestDTO: {
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: '',
                            remarks: '',
                            fromDateDisplay: '',
                            toDateDisplay: '',
                            startTimeDisplay: '',
                            endTimeDisplay: '',
                            id: ''
                        },
                    })
                }
            }
        };

        handleOverrideFormInputChange = (event, field) => {
            if (event) {
                let key = field ? field : event.target.name;
                let value = field ? event
                    : (event.target.type === 'checkbox' ? (event.target.checked === true ? 'Y' : 'N')
                        : event.target.value);
                this.setState({
                    overrideRequestDTO: {
                        ...this.state.overrideRequestDTO,
                        [key]: value
                    }
                })
            }
        };

        handleAddOverride = (isAddAnother, isModifyOverride) => {
            let showOverrideModal = isAddAnother;

            let overrideList = [...this.state.doctorDutyRosterOverrideRequestDTOS];

            let currentOverride = {...this.state.overrideRequestDTO};
            currentOverride.fromDateDisplay = convertDateToYearMonthDateFormat(currentOverride.fromDate);
            currentOverride.toDateDisplay = convertDateToYearMonthDateFormat(currentOverride.toDate);
            currentOverride.startTimeDisplay = convertDateToHourMinuteFormat(currentOverride.startTime);
            currentOverride.endTimeDisplay = convertDateToHourMinuteFormat(currentOverride.endTime);

            if (isModifyOverride) {
                // IF MODIFYING EXISTING OVERRIDE REPLACE OLD ONE WITH NEW MODIFIED
                overrideList[currentOverride.id] = currentOverride;
            } else {
                // ELSE SIMPLY ADD
                overrideList.push(currentOverride);
            }

            this.setState({
                doctorDutyRosterOverrideRequestDTOS: [...overrideList],
                overrideRequestDTO: {
                    ...this.state.overrideRequestDTO,
                    fromDate: new Date(),
                    toDate: new Date(),
                    startTime: '',
                    endTime: '',
                    dayOffStatus: 'N',
                    remarks: '',
                    fromDateDisplay: '',
                    toDateDisplay: '',
                    startTimeDisplay: '',
                    endTimeDisplay: '',
                    id: ''
                },
                isModifyOverride: false,
                showAddOverrideModal: showOverrideModal
            })

        };

        handleModifyOverride = (data, index) => {
            this.setState({
                overrideRequestDTO: {
                    ...this.state.overrideRequestDTO,
                    fromDate: data.fromDate,
                    toDate: data.toDate,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    dayOffStatus: data.dayOffStatus,
                    remarks: data.remarks,
                    id: index
                },
                isModifyOverride: true,
                showAddOverrideModal: true
            })
        };

        handleRemoveOverride = (data, index) => {
            let overrides = [...this.state.doctorDutyRosterOverrideRequestDTOS];
            overrides.splice(index, 1);
            this.setState({
                doctorDutyRosterOverrideRequestDTOS: [...overrides]
            });
        };

        handleSaveButtonClick = async () => {
            await this.setState({
                showConfirmModal: true
            })
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event)
        };

        setStateValues = (key, value, label, fieldValid) =>
            label ? value ?
                this.setState({[key]: {value, label}})
                : this.setState({[key]: null})
                : this.setState({[key]: value, [key + "Valid"]: fieldValid});

        setShowAddOverrideModal = () => {
            this.setState({
                showAddOverrideModal: !this.state.showAddOverrideModal,
                isModifyOverride: false
            })
        };

        setShowConfirmModal = () => {
            this.setState({
                showConfirmModal: !this.state.showConfirmModal
            })
        };

        bindValuesToState = async (event, fieldValid) => {
            let fieldName = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            await this.setStateValues(fieldName, value, label, fieldValid);

            if (fieldName === 'specialization') {
                await this.props.fetchDoctorsBySpecializationIdForDropdown(FETCH_DOCTOR_BY_SPECIALIZATION_ID, value);
                await this.setState({
                    doctor: null
                })
            }
            // this.checkFormValidity();
        };

        closeAlert = () => {
            // this.props.clearDepartmentSuccessErrorMessagesFromStore();
            this.setState({
                showAlert: !this.state.showAlert
            });
        };

        getExistingRoster = async () => {
            try {
                const existingRosters = await this.fetchExistingRoster();
                if (existingRosters.length) {
                    // TODO prepare data for existing and set data
                    this.setState({
                        showExistingRosterModal: true
                    })
                } else {
                    this.setState({
                        showAlert: true,
                        alertMessageInfo: {
                            variant: "warning",
                            message: "No existing rosters found."
                        }
                    })
                }
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage
                    }
                })
            }

        };

        initialApiCalls = async () => {
            await this.fetchHospitalsForDropdown();
            await this.fetchSpecializationForDropdown();
            await this.fetchWeekdaysData();
        };

        saveDoctorDutyRoster = async () => {
            const {
                doctorDutyRosterOverrideRequestDTOS, doctor, doctorWeekDaysDutyRosterRequestDTOS, fromDate,
                hasOverrideDutyRoster, rosterGapDuration, specialization, status, toDate
            } = this.state;
            let dataToSave = {
                fromDate,
                toDate,
                specializationId: specialization ? specialization.value : '',
                doctorId: doctor ? doctor.value : '',
                rosterGapDuration,
                doctorWeekDaysDutyRosterRequestDTOS,
                hasOverrideDutyRoster,
                doctorDutyRosterOverrideRequestDTOS,
                status,
            };
            const {saveSuccessMessage, saveErrorMessage} = this.props.DoctorDutyRosterSaveReducer;
            try {
                await this.props.createDoctorDutyRoster(CREATE_DOCTOR_DUTY_ROSTER, dataToSave);
                this.setState({
                    showConfirmModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: saveSuccessMessage ? saveSuccessMessage : 'Doctor Duty Roster saved successfully.'
                    },
                });
                this.resetAddForm();
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: saveErrorMessage ? saveErrorMessage : 'Error occurred while saving Doctor Duty Roster.'
                    },
                });
            }
        };

        render() {
            const {
                showExistingRosterModal, hospital, specialization, doctor, rosterGapDuration, fromDate, toDate,
                doctorWeekDaysDutyRosterRequestDTOS, isWholeWeekOff,
                hasOverrideDutyRoster, overrideRequestDTO, doctorDutyRosterOverrideRequestDTOS,
                showAlert, alertMessageInfo, showAddOverrideModal, isModifyOverride, formValid, showConfirmModal
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            const {activeSpecializationList, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;
            const {doctorsBySpecializationForDropdown, doctorDropdownErrorMessage} = this.props.DoctorDropdownReducer;

            const {isSaveRosterLoading} = this.props.DoctorDutyRosterSaveReducer;
            return <>
                <ComposedComponent
                    {...props}
                    doctorInfoData={
                        {
                            hospital: hospital,
                            specialization: specialization,
                            doctor: doctor,
                            rosterGapDuration: rosterGapDuration,
                            fromDate: fromDate,
                            toDate: toDate
                        }
                    }
                    overrideData={{...overrideRequestDTO}}
                    doctorAvailabilityData={doctorWeekDaysDutyRosterRequestDTOS}
                    hospitalList={hospitalsForDropdown}
                    specializationList={activeSpecializationList}
                    specializationDropdownError={dropdownErrorMessage}
                    doctorList={doctorsBySpecializationForDropdown}
                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                    showExistingRosterModal={showExistingRosterModal}
                    wholeWeekOff={isWholeWeekOff}
                    handleWholeWeekOff={this.handleWholeWeekOff}
                    handleShowExistingRoster={this.handleShowExistingRoster}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleAvailabilityTimeChange={this.handleAvailabilityTimeChange}
                    handleDayOffStatusChange={this.handleDayOffStatusChange}
                    handleEnter={this.handleEnter}
                    getExistingRoster={this.getExistingRoster}
                    hasOverrideDutyRoster={hasOverrideDutyRoster}
                    doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}
                    handleOverrideDutyRoster={this.handleOverrideDutyRoster}
                    showAddOverrideModal={showAddOverrideModal}
                    setShowAddOverrideModal={this.setShowAddOverrideModal}
                    handleOverrideFormInputChange={this.handleOverrideFormInputChange}
                    addOverride={this.handleAddOverride}
                    onModifyOverride={this.handleModifyOverride}
                    onRemoveOverride={this.handleRemoveOverride}
                    isModifyOverride={isModifyOverride}
                    formValid={formValid}
                    showConfirmModal={showConfirmModal}
                    setShowConfirmModal={this.setShowConfirmModal}
                    saveDoctorDutyRoster={this.saveDoctorDutyRoster}
                    onSaveButtonClick={this.handleSaveButtonClick}
                    isSaveRosterLoading={isSaveRosterLoading}
                />
                <CAlert
                    id="profile-manage"
                    variant={alertMessageInfo.variant}
                    show={showAlert}
                    onClose={this.closeAlert}
                    alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                    </> : <><i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                    </>}
                    message={alertMessageInfo.message}
                />
            </>;
        }
    }

    return ConnectHoc(DoctorDutyRoster,
        [
            'HospitalDropdownReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'WeekdaysReducer',
            'DoctorDutyRosterSaveReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchSpecializationForDropdown,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchWeekdays,
            fetchExistingDoctorDutyRoster,
            createDoctorDutyRoster
        })
};

export default DoctorDutyRosterHOC;
