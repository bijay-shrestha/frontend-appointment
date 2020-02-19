import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {
    DateTimeFormatterUtils,
    DoctorDutyRosterUtils,
    EnterKeyPressUtils,
    TryCatchHandler
} from "@frontend-appointment/helpers";
import {
    DoctorDutyRosterMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware,
    WeekdaysMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CAlert, CButton, CModal} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import DoctorDutyRosterPreviewModal from "./common/DoctorDutyRosterPreviewModal";

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationForDropdown, fetchSpecializationHospitalWiseForDropdown} = SpecializationSetupMiddleware;
const {fetchDoctorsBySpecializationIdForDropdown, fetchActiveDoctorsForDropdown,
    fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware;
const {fetchWeekdays, fetchWeekdaysData} = WeekdaysMiddleware;
const {
    createDoctorDutyRoster,
    fetchDoctorDutyRosterList,
    fetchExistingDoctorDutyRoster,
    fetchExistingDoctorDutyRosterDetails,
    fetchDoctorDutyRosterDetailById,
    deleteDoctorDutyRoster,
    updateDoctorDutyRoster,
    clearDDRSuccessErrorMessage,
    updateDoctorDutyRosterOverride,
    deleteDoctorDutyRosterOverride,
    revertDoctorDutyRosterOverrideUpdate
} = DoctorDutyRosterMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {ACTIVE_DROPDOWN_SPECIALIZATION, SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL} = AdminModuleAPIConstants.specializationSetupAPIConstants;
const {FETCH_DOCTOR_BY_SPECIALIZATION_ID, FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN,FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN} = AdminModuleAPIConstants.doctorSetupApiConstants;
const {FETCH_WEEKDAYS, FETCH_WEEKDAYS_DATA} = CommonAPIConstants.WeekdaysApiConstants;
const {
    CREATE_DOCTOR_DUTY_ROSTER,
    DELETE_DOCTOR_DUTY_ROSTER,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID,
    UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE,
    FETCH_EXISTING_DOCTOR_DUTY_ROSTER,
    FETCH_EXISTING_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID,
    SEARCH_DOCTOR_DUTY_ROSTER,
    UPDATE_DOCTOR_DUTY_ROSTER,
    DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE,
    REVERT_DOCTOR_DUTY_ROSTER_OVERRIDE_UPDATE
} = AdminModuleAPIConstants.doctorDutyRosterApiConstants;

const {getDateWithTimeSetToGivenTime, addDate, isFirstTimeGreaterThanSecond, isFirstDateGreaterThanSecondDate} = DateTimeFormatterUtils;

const DATE_ERROR_MESSAGE = "From date must not be greater than to date!";
const TIME_ERROR_MESSAGE = "Start time must not be greater than end time!";

const DoctorDutyRosterHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRoster extends PureComponent {
        state = {
            showExistingRosterModal: false,
            showAddOverrideModal: false,
            isModifyOverride: false,
            showAlert: false,
            formValid: false,
            showConfirmModal: false,
            showDeleteModal: false,
            showEditModal: false,
            showDeleteOverrideModal: false,
            hospital: null,
            specialization: null,
            doctor: null,
            rosterGapDuration: '',
            status: 'Y',
            fromDate: new Date(),
            toDate: addDate(new Date(), 6),
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
                status: 'Y',
                doctorDutyRosterOverrideId: '',
                id: '',
                isNew: false,
                dateErrorMessage: '',
                timeErrorMessage: ''
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
                toDate: addDate(new Date(), 30),
                hospital: null,
                specialization: null,
                doctor: null
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            deleteRequestDTO: {
                id: 0,
                remarks: '',
                status: 'D'
            },
            updateDoctorDutyRosterData: {
                fromDate: '',
                toDate: '',
                hospital: null,
                specialization: null,
                doctor: null,
                doctorDutyRosterId: 0,
                hasOverrideDutyRoster: '',
                remarks: '',
                rosterGapDuration: 0,
                status: '',
                weekDaysDutyRosterUpdateRequestDTOS: [],
                overridesUpdate: [],
                originalOverrides: [],
                updatedOverrides: [],
                formValid: false
            },
            overrideUpdateErrorMessage: '',
            deleteOverrideErrorMessage: '',
            dateErrorMessage: ''
        };

        resetAddForm = async (onSuccessData) => {
            const weekDays = await this.getWeekDaysDataForForm();
            await this.setState({
                hospital: null,
                specialization: null,
                doctor: null,
                rosterGapDuration: '',
                status: 'Y',
                fromDate: new Date(),
                toDate: new Date(),
                hasOverrideDutyRoster: 'N',
                isWholeWeekOff: 'N',
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDays],
                doctorDutyRosterOverrideRequestDTOS: [],
                overrideRequestDTO: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    startTime: '',
                    endTime: '',
                    dayOffStatus: 'N',
                    remarks: '',
                    status: 'Y',
                    id: '',
                    dateErrorMessage: '',
                    timeErrorMessage: ''
                },
                ...onSuccessData
            })
        };

        partialResetAddForm = async (onSuccessData) => {
            await this.setState({
                doctor: null,
                rosterGapDuration: '',
                status: 'Y',
                overrideRequestDTO: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    startTime: '',
                    endTime: '',
                    dayOffStatus: 'N',
                    remarks: '',
                    status: 'Y',
                    id: '',
                    dateErrorMessage: '',
                    timeErrorMessage: ''
                },
                ...onSuccessData
            })
        };

        resetSearchForm = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    fromDate: new Date(),
                    toDate: addDate(new Date(), 30),
                    hospital: null,
                    specialization: null,
                    doctor: null,
                },
                showAlert: false
            });
            await this.searchDoctorDutyRoster(1);
        };

        resetEditForm = () => {
            this.setState({
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    fromDate: '',
                    toDate: '',
                    hospital: null,
                    specialization: null,
                    doctor: null,
                    doctorDutyRosterId: 0,
                    hasOverrideDutyRoster: '',
                    remarks: '',
                    rosterGapDuration: 0,
                    status: '',
                    weekDaysDutyRosterUpdateRequestDTOS: [],
                    overridesUpdate: [],
                    originalOverrides: [],
                    updateFormValid: true
                },
            })
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        componentWillUnmount() {
            clearTimeout(this.clearAlertTimeout);
        }

        fetchHospitalsForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
        };

        fetchActiveSpecializationForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchSpecializationForDropdown(ACTIVE_DROPDOWN_SPECIALIZATION))
        };

        fetchActiveSpecializationByHospitalForDropdown = async (hospitalId) => {
            return await this.props.fetchSpecializationHospitalWiseForDropdown(
                SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL, hospitalId)
        };

        fetchActiveDoctors = async () => {
            await this.props.fetchActiveDoctorsForDropdown(FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN);
        };

        fetchActiveDoctorsByHospitalId = async (hospitalId)=> {
            await this.props.fetchActiveDoctorsHospitalWiseForDropdown(FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,hospitalId);
        };

        // fetchWeekdays = async () => {
        //     await TryCatchHandler.genericTryCatch(this.props.fetchWeekdays(FETCH_WEEKDAYS));
        //     let weekDaysData = this.getWeekDaysDataForForm();
        //     this.setState({
        //         doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
        //     });
        // };

        fetchWeekdaysData = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchWeekdaysData(FETCH_WEEKDAYS_DATA));
            let weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(this.state.fromDate,
                this.state.toDate, [...this.props.WeekdaysReducer.weekdaysDataList]);
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

        handleDoctorInfoFormInputChange = (event, fieldName, fieldValid) => {
            event && this.bindValuesToState(event, fieldName, fieldValid);
        };

        handleDoctorAvailabilityFormChange = async (event, fieldName, index) => {
            let value = fieldName ? event : event.target.checked;
            let doctorWeekDaysAvailability;
            switch (type) {
                case 'ADD':
                    doctorWeekDaysAvailability = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                    this.setAvailabilityData(fieldName, doctorWeekDaysAvailability, index, value);
                    let wholeWeekOff = this.checkIfWholeWeekOff(doctorWeekDaysAvailability);
                    await this.setState({
                        doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysAvailability],
                        isWholeWeekOff: wholeWeekOff ? "Y" : "N"
                    });
                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    doctorWeekDaysAvailability = [...this.state.updateDoctorDutyRosterData.weekDaysDutyRosterUpdateRequestDTOS];
                    this.setAvailabilityData(fieldName, doctorWeekDaysAvailability, index, value);
                    this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            weekDaysDutyRosterUpdateRequestDTOS: [...doctorWeekDaysAvailability]
                        }
                    });
                    this.checkManageFormValidity();
                    break;
                default:
                    break;
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
                });
                this.checkFormValidity();
            }
        };

        handleOverrideDutyRoster = async (event) => {
            if (event) {
                let isOverride = event.target.checked;
                switch (type) {
                    case 'ADD':
                        if (isOverride) {
                            await this.setState({
                                hasOverrideDutyRoster: 'Y',
                                showAddOverrideModal: true
                            })
                        } else {
                            await this.setState({
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
                        this.checkFormValidity();
                        break;
                    case 'MANAGE':
                        if (isOverride) {
                            await this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    hasOverrideDutyRoster: 'Y',
                                },
                                showAddOverrideModal: true
                            })
                        } else {
                            await this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    hasOverrideDutyRoster: 'N',
                                    overridesUpdate: []
                                },
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
                        this.checkManageFormValidity();
                        break;
                    default:
                        break;
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

                if (key === 'fromDate' || key === 'toDate') {
                    overrideRequestDTO.dateErrorMessage = isFirstDateGreaterThanSecondDate(overrideRequestDTO.fromDate,
                        overrideRequestDTO.toDate) ? DATE_ERROR_MESSAGE : ''
                } else if (key === 'endTime' || key === 'startTime') {
                    if (overrideRequestDTO.startTime && overrideRequestDTO.endTime) {
                        overrideRequestDTO.timeErrorMessage = isFirstTimeGreaterThanSecond(overrideRequestDTO.startTime,
                            overrideRequestDTO.endTime) ? TIME_ERROR_MESSAGE : ''
                    }
                }
                this.setState({
                    overrideRequestDTO: {...overrideRequestDTO}
                })
            }
        };

        handleAddOverride = async (isAddAnother, isModifyOverride) => {
            let overrideList = type === 'ADD' ? [...this.state.doctorDutyRosterOverrideRequestDTOS] :
                [...this.state.updateDoctorDutyRosterData.overridesUpdate];
            let currentOverride = {...this.state.overrideRequestDTO};
            switch (type) {
                case 'ADD':
                    if (isModifyOverride) {
                        // IF MODIFYING EXISTING OVERRIDE REPLACE OLD ONE WITH NEW MODIFIED
                        overrideList[currentOverride.id] = currentOverride;
                    } else {
                        // ELSE SIMPLY ADD
                        overrideList.push(currentOverride);
                    }
                    await this.setState({
                        doctorDutyRosterOverrideRequestDTOS: [...overrideList],
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            id: '',
                            dateErrorMessage: '',
                            timeErrorMessage: ''
                        },
                        isModifyOverride: false,
                        showAddOverrideModal: isAddAnother,
                        overrideUpdateErrorMessage: ''
                    });
                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    let updatedOverrides = [...this.state.updateDoctorDutyRosterData.updatedOverrides];
                    try {
                        let dataToSave = {
                            dayOffStatus: currentOverride.dayOffStatus,
                            doctorDutyRosterId: this.state.updateDoctorDutyRosterData.doctorDutyRosterId,
                            doctorDutyRosterOverrideId: isModifyOverride ? currentOverride.doctorDutyRosterOverrideId : '',
                            endTime: currentOverride.endTime,
                            overrideFromDate: currentOverride.fromDate,
                            overrideToDate: currentOverride.toDate,
                            remarks: currentOverride.remarks,
                            startTime: currentOverride.startTime,
                            status: 'Y',
                        };
                        try {
                            let response = await this.updateOverride(dataToSave);
                            if (isModifyOverride) {
                                overrideList[currentOverride.id] = currentOverride;
                            } else {
                                currentOverride.doctorDutyRosterOverrideId = response.savedOverrideId;
                                currentOverride.isNew = true;
                                overrideList.push(currentOverride);
                            }
                            updatedOverrides.push(currentOverride);
                            this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    overridesUpdate: [...overrideList],
                                    updatedOverrides: [...updatedOverrides]
                                },
                                overrideRequestDTO: {
                                    ...this.state.overrideRequestDTO,
                                    fromDate: new Date(),
                                    toDate: new Date(),
                                    startTime: '',
                                    endTime: '',
                                    dayOffStatus: 'N',
                                    remarks: '',
                                    id: '',
                                    dateErrorMessage: '',
                                    timeErrorMessage: ''
                                },
                                isModifyOverride: false,
                                showAddOverrideModal: isAddAnother,
                                overrideUpdateErrorMessage: ''
                            });
                            this.checkManageFormValidity();
                        } catch (e) {
                            await this.setState({
                                overrideUpdateErrorMessage: e.errorMessage ? e.errorMessage : 'Error Occurred while adding/modifying override.'
                            })
                        }
                    } catch (e) {

                    }
                    break;
                default:
                    break;
            }

        };

        handleModifyOverride = (data, index) => {
            switch (type) {
                case 'ADD':
                    this.setState({
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: data.fromDate,
                            toDate: data.toDate,
                            startTime: data.startTime,
                            endTime: data.endTime,
                            dayOffStatus: data.dayOffStatus,
                            remarks: data.remarks,
                            id: data.id ? data.id : index
                        },
                        isModifyOverride: true,
                        showAddOverrideModal: true
                    });
                    break;
                case 'MANAGE':
                    this.setState({
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(data.fromDate),
                            toDate: new Date(data.toDate),
                            startTime: new Date(data.startTime),
                            endTime: new Date(data.endTime),
                            dayOffStatus: data.dayOffStatus,
                            remarks: data.remarks,
                            doctorDutyRosterOverrideId: data.doctorDutyRosterOverrideId,
                            id: data.id ? data.id : index
                        },
                        isModifyOverride: true,
                        showAddOverrideModal: true
                    });
                    break;
            }
        };

        handleRemoveOverride = async (data, index) => {
            switch (type) {
                case 'ADD':
                    let overrides = [...this.state.doctorDutyRosterOverrideRequestDTOS];
                    overrides.splice(index, 1);
                    this.setState({
                        doctorDutyRosterOverrideRequestDTOS: [...overrides]
                    });
                    break;
                case 'MANAGE':
                    this.props.clearDDRSuccessErrorMessage();
                    let deleteRequestDTO = {...this.state.deleteRequestDTO};
                    deleteRequestDTO['id'] = data.doctorDutyRosterOverrideId;
                    deleteRequestDTO['index'] = index;
                    // deleteRequestDTO['doctorDutyRosterOverrideId'] = data.doctorDutyRosterOverrideId;
                    await this.setState({
                        deleteRequestDTO: deleteRequestDTO,
                        showDeleteOverrideModal: true,
                        showAlert: false,
                        deleteOverrideErrorMessage: ''
                    });
                    break;
            }

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
                });
                this.clearAlertTimeout();
            }
        };

        handleSearchInputChange = async(event, fieldName) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;

            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    [key]: label ? {label, value} : value
                }
            });

            if (key ==='hospital'){
                await this.fetchActiveDoctorsByHospitalId(value);
                await this.fetchActiveSpecializationByHospitalForDropdown(value);
            }
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
            try {
                await this.fetchDoctorDutyRosterDetailsById(id);
                const doctorDutyRosterInfo = await this.prepareDataForPreview();
                const {
                    hospital, specialization, doctor, rosterGapDuration,
                    fromDate, toDate, hasOverrideDutyRoster, doctorWeekDaysDutyRosterRequestDTOS,
                    doctorDutyRosterOverrideRequestDTOS
                } = doctorDutyRosterInfo;
                await this.setState({
                    hospital: hospital,
                    showConfirmModal: true,
                    showAlert: false,
                    specialization: {...specialization},
                    doctor: {...doctor},
                    rosterGapDuration: rosterGapDuration,
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate),
                    hasOverrideDutyRoster: hasOverrideDutyRoster,
                    doctorWeekDaysDutyRosterRequestDTOS: [...doctorWeekDaysDutyRosterRequestDTOS],
                    doctorDutyRosterOverrideRequestDTOS: [...doctorDutyRosterOverrideRequestDTOS]
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage ? e.errorMessage : 'Error occurred while fetching Doctor Duty Roster details.'
                    },
                });
                this.clearAlertTimeout();
            }

        };

        handleDelete = async data => {
            this.props.clearDDRSuccessErrorMessage();
            let deleteRequestDTO = {...this.state.deleteRequestDTO};
            deleteRequestDTO['id'] = data.id;
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                showDeleteModal: true,
                showAlert: false
            })
        };

        handleDeleteRemarksChange = event => {
            const {name, value} = event.target;
            let deleteRequest = {...this.state.deleteRequestDTO};
            deleteRequest[name] = value;
            this.setState({
                deleteRequestDTO: deleteRequest
            })
        };

        handleEdit = async editId => {
            try {
                await this.fetchDoctorDutyRosterDetailsById(editId);
                const doctorDutyRosterInfo = await this.prepareDataForPreview();
                await this.prepareDataForEdit(doctorDutyRosterInfo);
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage ? e.errorMessage : 'Error occurred while fetching Doctor Duty Roster details.'
                    },
                });
                this.clearAlertTimeout();
            }
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event)
        };

        setStateValues = (key, value, label, fieldValid) => {
            if (type === 'ADD') {
                label ? value ?
                    this.setState({[key]: {value, label}})
                    : this.setState({[key]: null})
                    : this.setState({[key]: value, [key + "Valid"]: fieldValid})
            } else if (type === 'MANAGE') {
                label ? value ?
                    this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            [key]: {value, label}
                        }
                    })
                    : this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            [key]: null
                        }
                    })
                    : this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            [key]: value, [key + "Valid"]: fieldValid
                        }
                    })
            }
        };

        setAvailabilityData(fieldName, doctorWeekDaysAvailability, index, value) {
            if (fieldName) {
                doctorWeekDaysAvailability[index][fieldName] = value;
                if (doctorWeekDaysAvailability[index].startTime && doctorWeekDaysAvailability[index].endTime) {
                    doctorWeekDaysAvailability[index].errorMessage = isFirstTimeGreaterThanSecond(
                        doctorWeekDaysAvailability[index].startTime, doctorWeekDaysAvailability[index].endTime) ?
                        TIME_ERROR_MESSAGE : ''
                }
            } else {
                this.setDefaultStartAndEndTimeAndDayOffStatus(value, doctorWeekDaysAvailability[index]);
            }
        }

        setShowAddOverrideModal = () => {
            let hasOverride;
            switch (type) {
                case 'ADD':
                    hasOverride = this.state.doctorDutyRosterOverrideRequestDTOS.length <= 0 ? 'N'
                        : this.state.hasOverrideDutyRoster;
                    this.setState({
                        showAddOverrideModal: !this.state.showAddOverrideModal,
                        isModifyOverride: false,
                        overrideUpdateErrorMessage: '',
                        hasOverrideDutyRoster: hasOverride,
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            status: 'Y',
                            doctorDutyRosterOverrideId: '',
                            id: '',
                            dateErrorMessage: '',
                            timeErrorMessage: ''
                        }
                    });
                    break;
                case 'MANAGE':
                    hasOverride = this.state.updateDoctorDutyRosterData.overridesUpdate.length <= 0 ? 'N'
                        : this.state.updateDoctorDutyRosterData.hasOverrideDutyRoster;
                    this.setState({
                        showAddOverrideModal: !this.state.showAddOverrideModal,
                        isModifyOverride: false,
                        overrideUpdateErrorMessage: '',
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            hasOverrideDutyRoster: hasOverride
                        },
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(),
                            toDate: new Date(),
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            status: 'Y',
                            doctorDutyRosterOverrideId: '',
                            id: '',
                            dateErrorMessage: '',
                            timeErrorMessage: ''
                        }
                    });
                    break;
            }

        };

        setShowModal = () => {
            this.setState({
                showConfirmModal: false,
                showDeleteModal: false,
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    originalOverrides: [],
                    updatedOverrides: []
                }
            })
        };

        setShowDeleteOverrideModal = () => {
            this.setState({
                showDeleteOverrideModal: !this.state.showDeleteOverrideModal
            })
        };

        setDefaultStartAndEndTimeAndDayOffStatus = (dayOff, doctorWeekDaysAvailability) => {
            if (dayOff) {
                doctorWeekDaysAvailability.dayOffStatus = 'Y';
                doctorWeekDaysAvailability.startTime =
                    getDateWithTimeSetToGivenTime(new Date(), 24, 0, 0);
                doctorWeekDaysAvailability.endTime =
                    getDateWithTimeSetToGivenTime(new Date(), 12, 0, 0);
                doctorWeekDaysAvailability.errorMessage = '';
            } else {
                doctorWeekDaysAvailability.dayOffStatus = 'N';
                doctorWeekDaysAvailability.startTime = '';
                doctorWeekDaysAvailability.endTime = '';
                doctorWeekDaysAvailability.errorMessage = '';
            }
        };

        bindValuesToState = async (event, fieldName, fieldValid) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;

            await this.setStateValues(key, value, label, fieldValid);

            if (key === 'hospital') {
                if (value) {
                    await this.fetchActiveSpecializationByHospitalForDropdown(value);
                    this.setState({
                        specialization: null,
                        doctor: null
                    })
                } else {
                    this.setState({
                        specialization: null,
                        doctor: null
                    });
                    await this.fetchActiveSpecializationByHospitalForDropdown(0);
                }
            } else if (key === 'specialization') {
                await this.props.fetchDoctorsBySpecializationIdForDropdown(FETCH_DOCTOR_BY_SPECIALIZATION_ID, value);
                await this.setState({
                    doctor: null
                })
            }

            if (key === 'fromDate' || key === 'toDate') {
                let errorMessage = '';
                let originalWeekDaysData = [...this.state.doctorWeekDaysDutyRosterRequestDTOS];
                let weekDaysData = [];
                if (isFirstDateGreaterThanSecondDate(
                    getDateWithTimeSetToGivenTime(this.state.fromDate, 0, 0, 0),
                    getDateWithTimeSetToGivenTime(this.state.toDate, 0, 0, 0))) {
                    errorMessage = DATE_ERROR_MESSAGE;
                    weekDaysData=[...originalWeekDaysData];
                } else {
                    weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                        this.state.fromDate, this.state.toDate, [...this.props.WeekdaysReducer.weekdaysDataList])
                }
                await this.setState({
                    dateErrorMessage: errorMessage,
                    doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
                });
            }
            type === 'ADD' ? this.checkFormValidity() : this.checkManageFormValidity();
        };

        cancelCloseEditModal = async () => {
            if (this.state.updateDoctorDutyRosterData.updatedOverrides.length) {
                await this.revertOverrideUpdatesOnCancel();
            }
            this.setState({
                showEditModal: false
            })
        };

        checkFormValidity = () => {
            const {
                fromDate, toDate, hospital, specialization, doctor, rosterGapDuration, hasOverrideDutyRoster,
                doctorDutyRosterOverrideRequestDTOS, doctorWeekDaysDutyRosterRequestDTOS
            } = this.state;

            let formValid = fromDate && toDate && hospital && specialization && doctor && rosterGapDuration;
            if (hasOverrideDutyRoster === "Y") {
                formValid = formValid && doctorDutyRosterOverrideRequestDTOS.length;
            }

            doctorWeekDaysDutyRosterRequestDTOS.map(weekDay => {
                formValid = formValid && weekDay.startTime && weekDay.endTime
            });

            this.setState({
                formValid: Boolean(formValid)
            })
        };

        checkManageFormValidity = () => {
            const {
                rosterGapDuration, remarks, hasOverrideDutyRoster, overridesUpdate,
                weekDaysDutyRosterUpdateRequestDTOS
            } = this.state.updateDoctorDutyRosterData;

            let formValid = rosterGapDuration && remarks;

            if (hasOverrideDutyRoster === "Y") {
                formValid = formValid && overridesUpdate.length;
            }

            weekDaysDutyRosterUpdateRequestDTOS.map(weekDay => {
                formValid = formValid && weekDay.startTime && weekDay.endTime
            });

            this.setState({
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    formValid: Boolean(formValid)
                }
            })

        };

        checkIfWholeWeekOff = (doctorWeekDaysAvailability) => {
            let wholeWeekOff = true;
            doctorWeekDaysAvailability.map(day => {
                wholeWeekOff = wholeWeekOff && day.dayOffStatus === 'Y'
            });
            return wholeWeekOff;
        };

        clearAlertTimeout = () => {
            setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            // this.props.clearDepartmentSuccessErrorMessagesFromStore();
            this.setState({
                showAlert: false
            });
        };

        getWeekDaysDataForForm = () => {
            return DoctorDutyRosterUtils.prepareWeekdaysData([...this.props.WeekdaysReducer.weekdaysList]);
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
                    });
                    this.clearAlertTimeout();
                }
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage
                    }
                });
                this.clearAlertTimeout();
            }

        };

        initialApiCalls = async () => {
            await this.fetchHospitalsForDropdown();
            await this.fetchActiveSpecializationForDropdown();
            await this.fetchWeekdaysData();
            if (type === 'MANAGE') {
                await this.fetchActiveDoctors();
                await this.searchDoctorDutyRoster(1);
            }
        };

        prepareDataForPreview = async () => {
            const {doctorDutyRosterInfo, overrideRosters, weekDaysRosters} =
                this.props.DoctorDutyRosterPreviewReducer.doctorDutyRosterPreviewData;
            const {
                id, specializationName, specializationId, doctorId, doctorName, rosterGapDuration,
                fromDate, toDate, hasOverrideDutyRoster, hospitalId, hospitalName, status,
            } = doctorDutyRosterInfo && doctorDutyRosterInfo;

            return {
                id: id,
                hospital: {label: hospitalName, value: hospitalId},
                specialization: {label: specializationName, value: specializationId},
                doctor: {label: doctorName, value: doctorId},
                rosterGapDuration: rosterGapDuration,
                fromDate: new Date(fromDate),
                toDate: new Date(toDate),
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                doctorWeekDaysDutyRosterRequestDTOS: [...weekDaysRosters],
                doctorDutyRosterOverrideRequestDTOS: [...overrideRosters],
                status: status
            };
        };

        prepareDataForEdit = async doctorDutyRosterInfo => {
            const {
                id, hospital, specialization, doctor, rosterGapDuration,
                fromDate, toDate, hasOverrideDutyRoster, doctorWeekDaysDutyRosterRequestDTOS,
                doctorDutyRosterOverrideRequestDTOS, status
            } = doctorDutyRosterInfo;

            let weekDaysAvailabilityData = doctorWeekDaysDutyRosterRequestDTOS.map(weekDay => {
                weekDay.startTime = new Date(weekDay.startTime);
                weekDay.endTime = new Date(weekDay.endTime);
                weekDay.dayOffStatus = weekDay.dayOffStatus ? weekDay.dayOffStatus : 'N';
                return weekDay;
            });

            await this.setState({
                showEditModal: true,
                showAlert: false,
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate),
                    hospital: {...hospital},
                    specialization: {...specialization},
                    doctor: {...doctor},
                    doctorDutyRosterId: id,
                    hasOverrideDutyRoster: hasOverrideDutyRoster,
                    remarks: '',
                    rosterGapDuration: rosterGapDuration,
                    status: status,
                    weekDaysDutyRosterUpdateRequestDTOS: [...weekDaysAvailabilityData],
                    overridesUpdate: [...doctorDutyRosterOverrideRequestDTOS],
                    originalOverrides: [...doctorDutyRosterOverrideRequestDTOS],
                    updatedOverrides: []
                },
            })
        };

        saveDoctorDutyRoster = async (isClone) => {
            const {
                doctorDutyRosterOverrideRequestDTOS, doctor, doctorWeekDaysDutyRosterRequestDTOS, fromDate,
                hasOverrideDutyRoster, rosterGapDuration, specialization, status, toDate, hospital
            } = this.state;
            let dataToSave = {
                fromDate,
                toDate,
                specializationId: specialization ? specialization.value : '',
                doctorId: doctor ? doctor.value : '',
                hospitalId: hospital ? hospital.value : '',
                rosterGapDuration,
                doctorWeekDaysDutyRosterRequestDTOS,
                hasOverrideDutyRoster,
                doctorDutyRosterOverrideRequestDTOS,
                status,
            };
            const {saveSuccessMessage, saveErrorMessage} = this.props.DoctorDutyRosterSaveReducer;
            try {
                await this.props.createDoctorDutyRoster(CREATE_DOCTOR_DUTY_ROSTER, dataToSave);
                // this.setState({
                //     showConfirmModal: false,
                //     showAlert: true,
                //     alertMessageInfo: {
                //         variant: "success",
                //         message: saveSuccessMessage ? saveSuccessMessage : 'Doctor Duty Roster saved successfully.'
                //     },
                // });
                let onSuccessData = {
                    showConfirmModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: saveSuccessMessage ? saveSuccessMessage : 'Doctor Duty Roster saved successfully.'
                    }
                };
                this.clearAlertTimeout();
                isClone ? this.partialResetAddForm(onSuccessData) : this.resetAddForm(onSuccessData);
            } catch (e) {
                this.setState({
                    showAlert: true,
                    showConfirmModal: false,
                    alertMessageInfo: {
                        variant: "danger",
                        message: saveErrorMessage ? saveErrorMessage : 'Error occurred while saving Doctor Duty Roster.'
                    },
                });
                this.clearAlertTimeout();
            }
        };

        searchDoctorDutyRoster = async page => {
            const {fromDate, toDate, hospital, specialization, doctor} = this.state.searchParameters;
            if (isFirstDateGreaterThanSecondDate(fromDate, toDate)) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: DATE_ERROR_MESSAGE
                    },
                });
                this.clearAlertTimeout();
            } else {
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
            }
        };

        deleteDoctorDutyRoster = async () => {
            try {
                await this.props.deleteDoctorDutyRoster(
                    DELETE_DOCTOR_DUTY_ROSTER,
                    this.state.deleteRequestDTO
                );
                await this.setState({
                    showDeleteModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: this.props.DoctorDutyRosterDeleteReducer.deleteSuccessMessage
                    }
                });
                this.clearAlertTimeout();
                await this.searchDoctorDutyRoster(1);
            } catch (e) {
                this.setState({
                    showDeleteModal: true,
                });
            }
        };

        editDoctorDutyRoster = async () => {
            const {
                doctorDutyRosterId, hasOverrideDutyRoster, remarks, rosterGapDuration, status,
                weekDaysDutyRosterUpdateRequestDTOS
            } = this.state.updateDoctorDutyRosterData;
            let updateData = {
                doctorDutyRosterId: doctorDutyRosterId,
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                remarks: remarks,
                rosterGapDuration: rosterGapDuration,
                status: status,
                weekDaysDutyRosterUpdateRequestDTOS: weekDaysDutyRosterUpdateRequestDTOS
            };
            const {editSuccessMessage} = this.props.DoctorDutyRosterEditReducer;
            try {
                await this.props.updateDoctorDutyRoster(UPDATE_DOCTOR_DUTY_ROSTER, updateData);
                this.setState({
                    showEditModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: editSuccessMessage ? editSuccessMessage : 'Doctor Duty Roster saved successfully.'
                    },
                });
                this.clearAlertTimeout();
                this.resetEditForm();
                await this.searchDoctorDutyRoster();
            } catch (e) {

            }
        };

        updateOverride = async (overrideData) => {
            try {
                return await this.props.updateDoctorDutyRosterOverride(UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE, overrideData);
            } catch (e) {
                throw e;
            }
        };

        deleteOverride = async () => {
            let updatedOverride = [...this.state.updateDoctorDutyRosterData.updatedOverrides];
            try {
                await this.props.deleteDoctorDutyRosterOverride(DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE, this.state.deleteRequestDTO);
                let overrides = [...this.state.updateDoctorDutyRosterData.overridesUpdate];
                let deletedOverride = overrides.splice(this.state.deleteRequestDTO.index, 1);
                updatedOverride.push(deletedOverride[0]);
                this.setState({
                    updateDoctorDutyRosterData: {
                        ...this.state.updateDoctorDutyRosterData,
                        overridesUpdate: [...overrides],
                        updatedOverrides: [...updatedOverride]
                    },
                    showDeleteOverrideModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                });
            } catch (e) {
                this.setState({
                    deleteOverrideErrorMessage: e.errorMessage ? e.errorMessage : 'Error occurred while deleting override'
                })
            }
        };

        revertOverrideUpdatesOnCancel = async () => {
            const {updatedOverrides, originalOverrides, doctorDutyRosterId} = this.state.updateDoctorDutyRosterData;
            let overridesToBeReverted = [];
            let originalUpdatedOverrides = updatedOverrides.filter(override => !override.isNew);
            let newOverrides = updatedOverrides.filter(override => override.isNew);

            originalUpdatedOverrides.map(originalUpdated => {
                // FIND THE ORIGINAL DATA, CHANGE IT'S STATUS TO 'Y' ; ADD isOriginal FLAG THEN ADD TO ARRAY
                let originalOverride = originalOverrides.find(original =>
                    (original.doctorDutyRosterOverrideId === originalUpdated.doctorDutyRosterOverrideId));
                if (originalOverride) {
                    let override = {
                        dayOffStatus: originalOverride.dayOffStatus,
                        doctorDutyRosterId: doctorDutyRosterId,
                        doctorDutyRosterOverrideId: originalOverride.doctorDutyRosterOverrideId,
                        endTime: originalOverride.endTime,
                        // original: true,
                        overrideFromDate: originalOverride.fromDate,
                        overrideToDate: originalOverride.toDate,
                        remarks: originalOverride.remarks,
                        startTime: originalOverride.startTime,
                        status: 'Y'
                    };
                    overridesToBeReverted.push(override);
                }
            });

            newOverrides.length && newOverrides.map(newAdded => {
                // FOR NEWLY ADDED DATA, CHANGE STATUS TO 'D' , ADD REMARKS THEN ADD TO ARRAY
                let override = {
                    dayOffStatus: newAdded.dayOffStatus,
                    doctorDutyRosterId: doctorDutyRosterId,
                    doctorDutyRosterOverrideId: newAdded.doctorDutyRosterOverrideId,
                    endTime: newAdded.endTime,
                    // original: false,
                    overrideFromDate: newAdded.fromDate,
                    overrideToDate: newAdded.toDate,
                    remarks: "Update Cancelled.",
                    startTime: newAdded.startTime,
                    status: 'D'
                };
                overridesToBeReverted.push(override);
            });

            try {
                await this.props.revertDoctorDutyRosterOverrideUpdate(REVERT_DOCTOR_DUTY_ROSTER_OVERRIDE_UPDATE, overridesToBeReverted);
            } catch (e) {
                console.log("Revert Override Error", e.errorMessage);
            }
        };

        render() {
            const {
                showExistingRosterModal, hospital, specialization, doctor, rosterGapDuration, fromDate, toDate,
                doctorWeekDaysDutyRosterRequestDTOS, isWholeWeekOff,
                hasOverrideDutyRoster, overrideRequestDTO, doctorDutyRosterOverrideRequestDTOS,
                showAlert, alertMessageInfo, showAddOverrideModal, isModifyOverride, formValid, showConfirmModal,
                existingRosterTableData, existingDoctorWeekDaysAvailability, existingOverrides,
                searchParameters, queryParams, totalRecords, showDeleteModal, deleteRequestDTO,
                showEditModal, updateDoctorDutyRosterData, overrideUpdateErrorMessage, showDeleteOverrideModal,
                deleteOverrideErrorMessage, dateErrorMessage
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            const {allActiveSpecializationList, activeSpecializationListByHospital, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;
            const {doctorsBySpecializationForDropdown, doctorDropdownErrorMessage, activeDoctorsForDropdown,activeDoctorsByHospitalForDropdown} = this.props.DoctorDropdownReducer;

            const {isSaveRosterLoading} = this.props.DoctorDutyRosterSaveReducer;
            const {deleteErrorMessage} = this.props.DoctorDutyRosterDeleteReducer;
            const {editErrorMessage} = this.props.DoctorDutyRosterEditReducer;
            const {doctorDutyRosterList, isSearchRosterLoading, searchErrorMessage} = this.props.DoctorDutyRosterListReducer;
            return (<>
            <div className="doctorDutyRoster-setup">
                <ComposedComponent
                    {...props}
                    activeDoctorList={activeDoctorsForDropdown}
                    activeDoctorsByHospitalForDropdown={activeDoctorsByHospitalForDropdown}
                    activeSpecializationListByHospital={activeSpecializationListByHospital}
                    addOverride={this.handleAddOverride}
                    cancelCloseEditModal={this.cancelCloseEditModal}
                    dateErrorMessag e={dateErrorMessage}
                    deleteDoctorDutyRoster={this.deleteDoctorDutyRoster}
                    deleteErrorMessage={deleteErrorMessage}
                    deleteOverride={this.deleteOverride}
                    deleteOverrideErrorMessage={deleteOverrideErrorMessage}
                    doctorAvailabilityData={doctorWeekDaysDutyRosterRequestDTOS}
                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                    doctorDutyRosterList={doctorDutyRosterList}
                    doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}
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
                    doctorList={doctorsBySpecializationForDropdown}
                    editDoctorDutyRoster={this.editDoctorDutyRoster}
                    editErrorMessage={editErrorMessage}
                    existingDoctorWeekDaysAvailability={existingDoctorWeekDaysAvailability}
                    existingOverrides={existingOverrides}
                    existingRosterTableData={existingRosterTableData}
                    formValid={formValid}
                    getExistingRoster={this.getExistingRoster}
                    handleDoctorAvailabilityFormChange={this.handleDoctorAvailabilityFormChange}
                    handleEnter={this.handleEnter}
                    handleInputChange={this.handleDoctorInfoFormInputChange}
                    handleOverrideDutyRoster={this.handleOverrideDutyRoster}
                    handleOverrideFormInputChange={this.handleOverrideFormInputChange}
                    handlePageChange={this.handlePageChange}
                    handleShowExistingRoster={this.handleShowExistingRoster}
                    handleWholeWeekOff={this.handleWholeWeekOff}
                    hasOverrideDutyRoster={hasOverrideDutyRoster}
                    hospitalList={hospitalsForDropdown}
                    isModifyOverride={isModifyOverride}
                    isSaveRosterLoading={isSaveRosterLoading}
                    isSearchRosterLoading={isSearchRosterLoading}
                    onDeleteHandler={this.handleDelete}
                    onEditHandler={this.handleEdit}
                    onModifyOverride={this.handleModifyOverride}
                    onPreviewHandler={this.handlePreview}
                    onRemoveOverride={this.handleRemoveOverride}
                    onSaveButtonClick={this.handleSaveButtonClick}
                    onSearchInputChange={this.handleSearchInputChange}
                    onViewDetailsExisting={this.handleViewDetailsExisting}
                    overrideData={{...overrideRequestDTO}}
                    overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                    paginationData={{...queryParams, totalRecords}}
                    remarks={deleteRequestDTO.remarks}
                    remarksHandler={this.handleDeleteRemarksChange}
                    resetSearchForm={this.resetSearchForm}
                    saveDoctorDutyRoster={this.saveDoctorDutyRoster}
                    searchDoctorDutyRoster={() => this.searchDoctorDutyRoster(1)}
                    searchErrorMessage={searchErrorMessage}
                    searchParameters={searchParameters}
                    setShowAddOverrideModal={this.setShowAddOverrideModal}
                    setShowConfirmModal={this.setShowModal}
                    setShowDeleteModal={this.setShowModal}
                    setShowDeleteOverrideModal={this.setShowDeleteOverrideModal}
                    setShowModal={this.setShowModal}
                    showAddOverrideModal={showAddOverrideModal}
                    showConfirmModal={showConfirmModal}
                    showDeleteModal={showDeleteModal}
                    showDeleteOverrideModal={showDeleteOverrideModal}
                    showEditModal={showEditModal}
                    showExistingRosterModal={showExistingRosterModal}
                    specializationDropdownError={dropdownErrorMessage}
                    specializationList={allActiveSpecializationList}
                    updateDoctorDutyRosterData={updateDoctorDutyRosterData}
                    wholeWeekOff={isWholeWeekOff}
                />
                <CModal
                    show={showConfirmModal}
                    modalHeading="Doctor Duty Roster Details"
                    size="xl"
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
                    footerChildren={type === 'ADD' ?
                        <>
                            <CButton
                                variant="outline-primary"
                                name={isSaveRosterLoading ? 'Cloning' : 'Clone and Add New Doctor Duty Roster'}
                                disabled={isSaveRosterLoading}
                                size="lg"
                                className="float-right btn-action mr-3"
                                onClickHandler={() => this.saveDoctorDutyRoster(true)}/>
                            <CButton
                                variant="primary"
                                name={isSaveRosterLoading ? 'Confirming' : 'Confirm'}
                                disabled={isSaveRosterLoading}
                                size="lg"
                                className="float-right btn-action mr-3"
                                onClickHandler={() => this.saveDoctorDutyRoster(false)}/>
                        </> : ''
                    }
                    onHide={this.setShowModal}
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
                </div>
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
            clearDDRSuccessErrorMessage,
            createDoctorDutyRoster,
            deleteDoctorDutyRoster,
            fetchActiveDoctorsForDropdown,
            fetchActiveHospitalsForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchDoctorDutyRosterDetailById,
            fetchDoctorDutyRosterList,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchActiveDoctorsHospitalWiseForDropdown,
            fetchExistingDoctorDutyRoster,
            fetchExistingDoctorDutyRosterDetails,
            fetchSpecializationForDropdown,
            fetchWeekdays,
            fetchWeekdaysData,
            updateDoctorDutyRoster,
            updateDoctorDutyRosterOverride,
            deleteDoctorDutyRosterOverride,
            revertDoctorDutyRosterOverrideUpdate
        })
};

export default DoctorDutyRosterHOC;
