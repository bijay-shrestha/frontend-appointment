import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {TryCatchHandler} from "@frontend-appointment/helpers";
import {
    DoctorDutyRosterMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware,
    WeekdaysMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {DateTimeFormatterUtils, DoctorDutyRosterUtils, EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert, CButton, CModal} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import DoctorDutyRosterPreviewModal from "./common/DoctorDutyRosterPreviewModal";

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware;
const {fetchDoctorsBySpecializationIdForDropdown, fetchActiveDoctorsForDropdown} = DoctorMiddleware;
const {fetchWeekdays} = WeekdaysMiddleware;
const {
    createDoctorDutyRoster,
    fetchDoctorDutyRosterList,
    fetchExistingDoctorDutyRoster,
    fetchExistingDoctorDutyRosterDetails,
    fetchDoctorDutyRosterDetailById,
    deleteDoctorDutyRoster,
    updateDoctorDutyRoster
} = DoctorDutyRosterMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {ACTIVE_DROPDOWN_SPECIALIZATION} = AdminModuleAPIConstants.specializationSetupAPIConstants;
const {FETCH_DOCTOR_BY_SPECIALIZATION_ID, FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN} = AdminModuleAPIConstants.doctorSetupApiConstants;
const {FETCH_WEEKDAYS} = CommonAPIConstants.WeekdaysApiConstants;
const {
    CREATE_DOCTOR_DUTY_ROSTER,
    DELETE_DOCTOR_DUTY_ROSTER,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID,
    FETCH_DOCTOR_DUTY_ROSTER_OVERRIDE,
    FETCH_EXISTING_DOCTOR_DUTY_ROSTER,
    FETCH_EXISTING_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID,
    SEARCH_DOCTOR_DUTY_ROSTER,
    UPDATE_DOCTOR_DUTY_ROSTER,
} = AdminModuleAPIConstants.doctorDutyRosterApiConstants;

const {convertDateToHourMinuteFormat, convertDateToYearMonthDateFormat, getDateWithTimeSetToGivenTime} = DateTimeFormatterUtils;

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
                status: 'Y'
            },
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            existingRosterTableData: [],
            existingDoctorWeekDaysAvailability: [],
            existingOverrides: [],
            searchParameters: {
                fromDate: new Date(),
                toDate: new Date(),
                hospital: null,
                specialization: null,
                doctor: null
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            previewData: {}
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
                    status: 'Y'
                },
            })
        };

        resetSearchForm = async () => {
            this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    fromDate: new Date(),
                    toDate: new Date(),
                    hospital: null,
                    specialization: null,
                    doctor: null
                }
            });
            await this.searchDoctorDutyRoster(1);
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        fetchHospitalsForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
        };

        fetchActiveSpecializationForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchSpecializationForDropdown(ACTIVE_DROPDOWN_SPECIALIZATION))
        };

        fetchActiveDoctors = async () => {
            await this.props.fetchActiveDoctorsForDropdown(FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN);
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

        fetchDoctorDutyRosterDetailsById = async id => {
            await this.props.fetchDoctorDutyRosterDetailById(FETCH_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID, id);
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
                this.setDefaultStartAndEndTimeAndDayOffStatus(event.target.checked, doctorWeekDaysAvailability[index]);
                this.setState({
                    doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysAvailability]
                })
            }
        };

        handleWholeWeekOff = (event) => {
            if (event) {
                let doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                let updatedWeekDays = doctorWeekDaysAvailability.map(day => {
                    this.setDefaultStartAndEndTimeAndDayOffStatus(event.target.checked, day);
                    return day;
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
                            id: '',
                            status: 'Y'
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
                let overrideRequestDTO = {...this.state.overrideRequestDTO};
                if (key === 'dayOffStatus' && event.target.checked) {
                    this.setDefaultStartAndEndTimeAndDayOffStatus(event.target.checked, overrideRequestDTO);
                } else {
                    overrideRequestDTO[key] = value;
                }
                this.setState({
                    overrideRequestDTO: {...overrideRequestDTO}
                })
            }
        };

        handleAddOverride = (isAddAnother, isModifyOverride) => {
            let showOverrideModal = isAddAnother;

            let overrideList = [...this.state.doctorDutyRosterOverrideRequestDTOS];

            let currentOverride = {...this.state.overrideRequestDTO};

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

        handleViewDetailsExisting = async (data) => {
            try {
                let detailsData = await this.props.fetchExistingDoctorDutyRosterDetails(
                    FETCH_EXISTING_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID, data.doctorDutyRosterId);
                this.setState({
                    existingDoctorWeekDaysAvailability: [...detailsData.weekDaysRosters],
                    existingOverrides: [...detailsData.overrideRosters]
                })
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

        handleSearchInputChange = (event, fieldName) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;

            this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    [key]: label ? {label, value} : value
                }
            })
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchDoctorDutyRoster();
        };

        handlePreview = async id => {
            await this.fetchDoctorDutyRosterDetailsById(id);
            const {doctorDutyRosterInfo, overrideRosters, weekDaysRosters} = this.props.DoctorDutyRosterPreviewReducer.doctorDutyRosterPreviewData;
            const {specializationName, specializationId, doctorId, doctorName, rosterGapDuration, fromDate, toDate, hasOverrideDutyRoster} = doctorDutyRosterInfo && doctorDutyRosterInfo;
            await this.setState({
                // hospital: hospital,
                showConfirmModal: true,
                specialization: {label: specializationName, value: specializationId},
                doctor: {label: doctorName, value: doctorId},
                rosterGapDuration: rosterGapDuration,
                fromDate: new Date(fromDate),
                toDate: new Date(toDate),
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysRosters],
                doctorDutyRosterOverrideRequestDTOS: [...overrideRosters]
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

        setDefaultStartAndEndTimeAndDayOffStatus = (dayOff, doctorWeekDaysAvailability) => {
            if (dayOff) {
                doctorWeekDaysAvailability.dayOffStatus = 'Y';
                doctorWeekDaysAvailability.startTime =
                    getDateWithTimeSetToGivenTime(new Date(), 24, 0, 0);
                doctorWeekDaysAvailability.endTime =
                    getDateWithTimeSetToGivenTime(new Date(), 12, 0, 0);
            } else {
                doctorWeekDaysAvailability.dayOffStatus = 'N';
                doctorWeekDaysAvailability.startTime = '';
                doctorWeekDaysAvailability.endTime = '';
            }
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
                    this.setState({
                        showAlert: false,
                        showExistingRosterModal: true,
                        existingRosterTableData: [...existingRosters],
                        existingDoctorWeekDaysAvailability: [],
                        existingOverrides: [],
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
            await this.fetchActiveSpecializationForDropdown();
            await this.fetchWeekdaysData();
            if (type === 'M') {
                await this.fetchActiveDoctors();
                await this.searchDoctorDutyRoster(1);
            }
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
                    showConfirmModal: false,
                    alertMessageInfo: {
                        variant: "danger",
                        message: saveErrorMessage ? saveErrorMessage : 'Error occurred while saving Doctor Duty Roster.'
                    },
                });
            }
        };

        searchDoctorDutyRoster = async page => {
            const {fromDate, toDate, hospital, specialization, doctor} = this.state.searchParameters;
            let searchData = {
                doctorId: doctor ? doctor.value : '',
                specializationId: specialization ? specialization.value : '',
                fromDate: fromDate,
                toDate: toDate
            };

            let updatedPage =
                this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);

            await this.props.fetchDoctorDutyRosterList(
                SEARCH_DOCTOR_DUTY_ROSTER,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            );

            await this.setState({
                totalRecords: this.props.DoctorDutyRosterListReducer.doctorDutyRosterList.length
                    ? this.props.DoctorDutyRosterListReducer.doctorDutyRosterList[0].totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        };

        render() {
            const {
                showExistingRosterModal, hospital, specialization, doctor, rosterGapDuration, fromDate, toDate,
                doctorWeekDaysDutyRosterRequestDTOS, isWholeWeekOff,
                hasOverrideDutyRoster, overrideRequestDTO, doctorDutyRosterOverrideRequestDTOS,
                showAlert, alertMessageInfo, showAddOverrideModal, isModifyOverride, formValid, showConfirmModal,
                existingRosterTableData, existingDoctorWeekDaysAvailability, existingOverrides,
                searchParameters, queryParams, totalRecords
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            const {activeSpecializationList, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;
            const {doctorsBySpecializationForDropdown, doctorDropdownErrorMessage, activeDoctorsForDropdown} = this.props.DoctorDropdownReducer;

            const {isSaveRosterLoading} = this.props.DoctorDutyRosterSaveReducer;
            const {doctorDutyRosterList, isSearchRosterLoading, searchErrorMessage} = this.props.DoctorDutyRosterListReducer;
            return (<>
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
                    activeDoctorList={activeDoctorsForDropdown}
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
                    existingRosterTableData={existingRosterTableData}
                    onViewDetailsExisting={this.handleViewDetailsExisting}
                    existingDoctorWeekDaysAvailability={existingDoctorWeekDaysAvailability}
                    existingOverrides={existingOverrides}
                    searchParameters={searchParameters}
                    resetSearchForm={this.resetSearchForm}
                    searchDoctorDutyRoster={() => this.searchDoctorDutyRoster(1)}
                    onSearchInputChange={this.handleSearchInputChange}
                    isSearchRosterLoading={isSearchRosterLoading}
                    searchErrorMessage={searchErrorMessage}
                    doctorDutyRosterList={doctorDutyRosterList}
                    paginationData={{...queryParams, totalRecords}}
                    handlePageChange={this.handlePageChange}
                    onPreviewHandler={this.handlePreview}
                    // onDeleteHandler={}
                    // onEditHandler={}
                />
                <CModal
                    show={showConfirmModal}
                    modalHeading="Doctor Duty Roster Details"
                    size="lg"
                    bodyChildren={
                        <DoctorDutyRosterPreviewModal
                            doctorInfoData={{
                                hospital: hospital,
                                specialization: specialization,
                                doctor: doctor,
                                rosterGapDuration: rosterGapDuration,
                                fromDate: fromDate,
                                toDate: toDate
                            }}
                            doctorAvailabilityData={doctorWeekDaysDutyRosterRequestDTOS}
                            hasOverrideDutyRoster={hasOverrideDutyRoster}
                            doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}/>
                    }
                    footerChildren={type === 'A' ?
                        <CButton
                            variant="primary"
                            name={isSaveRosterLoading ? 'Confirming' : 'Confirm'}
                            disabled={isSaveRosterLoading}
                            size="lg"
                            className="float-right btn-action mr-3"
                            onClickHandler={this.saveDoctorDutyRoster}/> : ''
                    }
                    onHide={this.setShowConfirmModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
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
            </>);
        }
    }

    return ConnectHoc(
        DoctorDutyRoster,
        [
            'DoctorDropdownReducer',
            'DoctorDutyRosterDeleteReducer',
            'DoctorDutyRosterEditReducer',
            'DoctorDutyRosterListReducer',
            'DoctorDutyRosterPreviewReducer',
            'DoctorDutyRosterSaveReducer',
            'HospitalDropdownReducer',
            'SpecializationDropdownReducer',
            'WeekdaysReducer',
        ],
        {
            createDoctorDutyRoster,
            deleteDoctorDutyRoster,
            fetchActiveDoctorsForDropdown,
            fetchActiveHospitalsForDropdown,
            fetchDoctorDutyRosterDetailById,
            fetchDoctorDutyRosterList,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchExistingDoctorDutyRoster,
            fetchExistingDoctorDutyRosterDetails,
            fetchSpecializationForDropdown,
            fetchWeekdays,
            updateDoctorDutyRoster
        })
};

export default DoctorDutyRosterHOC;
