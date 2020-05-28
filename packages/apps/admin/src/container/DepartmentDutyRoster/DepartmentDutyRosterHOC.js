import React, {PureComponent} from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    DateTimeFormatterUtils,
    EnterKeyPressUtils,
    StringUtils,
    TryCatchHandler
} from '@frontend-appointment/helpers'
import {
    DepartmentDutyRosterMiddleware,
    HospitalSetupMiddleware,
    HospitalDepartmentSetupMiddleware,
    RoomSetupMiddleware,
    WeekdaysMiddleware
} from '@frontend-appointment/thunk-middleware'
import {
    AdminModuleAPIConstants,
    CommonAPIConstants
} from '@frontend-appointment/web-resource-key-constants'
import {CAlert, CButton, CModal} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'
import DepartmentDutyRosterPreviewModal
    from './common/DepartmentDutyRosterPreviewModal';
import {ConfirmDelete} from "@frontend-appointment/ui-components";

const {fetchActiveHospitalsForDropdown, fetchAllHospitalsForDropdown} = HospitalSetupMiddleware;

const {fetchWeekdays, fetchWeekdaysData} = WeekdaysMiddleware;

const {fetchActiveHospitalDepartmentForDropdownByHospitalId, fetchAllHospitalDepartmentForDropdownByHospitalId} = HospitalDepartmentSetupMiddleware;

const {fetchActiveRoomNumberForDropdownByDepartmentId, fetchAllRoomNumberForDropdownByHospitalId} = RoomSetupMiddleware;

const {
    createDepartmentDutyRoster,
    clearDepartmentDutyRosterMessages,
    deleteDepartmentDutyRoster,
    deleteDepartmentDutyRosterOverride,
    fetchDepartmentDutyRosterDetailById,
    fetchExistingDepartmentDutyRoster,
    fetchExistingDepartmentDutyRosterDetails,
    revertDepartmentDutyRosterOverrideUpdate,
    searchDepartmentDutyRoster,
    updateDepartmentDutyRoster,
    updateDepartmentDutyRosterOverride
} = DepartmentDutyRosterMiddleware;

const {
    FETCH_HOSPITALS_FOR_DROPDOWN,
    FETCH_ALL_HOSPITALS_FOR_DROPDOWN
} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {
    FETCH_WEEKDAYS_DATA
} = CommonAPIConstants.WeekdaysApiConstants;

const {
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
    FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN
} = AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants;

const {
    FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN,
    FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN
} = AdminModuleAPIConstants.roomSetupApiConstants;

const {
    CREATE_DEPARTMENT_DUTY_ROSTER,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
    SEARCH_DEPARTMENT_DUTY_ROSTER,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
    DELETE_DEPARTMENT_DUTY_ROSTER,

    UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE,
    UPDATE_DOCTOR_DUTY_ROSTER,
    DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE,
    REVERT_DOCTOR_DUTY_ROSTER_OVERRIDE_UPDATE
} = AdminModuleAPIConstants.departmentDutyRosterApiConstants;

const {
    getDateWithTimeSetToGivenTime,
    addDate,
    isFirstTimeGreaterThanSecond,
    isFirstDateGreaterThanSecondDate,
    getNoOfDaysBetweenGivenDatesInclusive
} = DateTimeFormatterUtils;

const DATE_ERROR_MESSAGE = 'From date must not be greater than to date!';
const TIME_ERROR_MESSAGE = 'Start time must not be greater than end time!';

const DepartmentDutyRosterHOC = (ComposedComponent, props, type) => {
    class DepartmentDutyRoster extends PureComponent {
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
            // GENERAL INFO PARAMS
            hospital: null,
            room: null,
            department: null,
            isRoomEnabled: 'N',
            rosterGapDuration: '',
            status: 'Y',
            fromDate: new Date(),
            toDate: addDate(new Date(), 6),
            hasOverrideDutyRoster: 'N',
            isWholeWeekOff: 'N',
            departmentWeekDaysDutyRosterRequestDTOS: [],
            departmentDutyRosterOverrideRequestDTOS: [],
            //
            overrideRequestDTO: {
                fromDate: new Date(),
                toDate: new Date(),
                startTime: '',
                endTime: '',
                dayOffStatus: 'N',
                remarks: '',
                status: 'Y',
                departmentDutyRosterOverrideId: '',
                id: '',
                isNew: false,
                dateErrorMessage: '',
                timeErrorMessage: ''
            },
            overrideFormValid: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            searchParameters: {
                fromDate: new Date(),
                toDate: addDate(new Date(), 30),
                hospital: null,
                department: null,
                room: null,
                status: {value: 'A', label: 'All'}
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
                department: null,
                departmentDutyRosterId: 0,
                hasOverrideDutyRoster: '',
                remarks: '',
                rosterGapDuration: 0,
                status: '',
                weekDaysDutyRosterUpdateRequestDTOS: [],
                overridesUpdate: [],
                originalOverrides: [],
                updatedOverrides: [],
                formValid: false,
                isCloneAndAdd: false,
                weekDaysDataOriginal: []
            },
            overrideUpdateErrorMessage: '',
            deleteOverrideErrorMessage: '',
            dateErrorMessage: ''
        };

        alertTimer = '';

        actionOnHospitalChange = async (value) => {
            if (value) {
                await this.fetchActiveDepartmentByHospitalId(value);
            }
            this.resetDepartmentAndRoomOnHospitalChange();
        };

        addOrModifyOverride = (isModifyOverride, overrideList, currentOverride) => {
            if (isModifyOverride) {
                // IF MODIFYING EXISTING OVERRIDE REPLACE OLD ONE WITH NEW MODIFIED
                overrideList[currentOverride.id] = currentOverride
            } else {
                // ELSE SIMPLY ADD
                overrideList.push(currentOverride)
            }
        };

        actionOnRoomEnableOrDisable = async (value) => {
            const {department} = this.state;
            if (value === 'Y') {
                if (department && department.value) {
                    try {
                        await this.fetchActiveRoomByDepartmentId(department.value);
                    } catch (e) {
                        this.setState({
                            isRoomEnabled: "N"
                        });
                        this.showAlertMessage("warning", this.props.RoomNumberDropdownReducer.activeRoomsByDepartmentDropdownErrorMessage)
                    }
                } else {
                    this.setState({
                        isRoomEnabled: "N"
                    });
                    this.showAlertMessage("warning", "Select Department first.")
                }
            }
            await this.resetRoomOnRoomDisable();
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer)
        }

        cancelCloseEditModal = async () => {
            if (this.state.updateDoctorDutyRosterData.updatedOverrides.length) {
                await this.revertOverrideUpdatesOnCancel()
            }
            this.setState({
                showEditModal: false,
                dateErrorMessage: ''
            })
        }

        checkFormValidity = () => {
            const {
                fromDate,
                toDate,
                hospital,
                department,
                rosterGapDuration,
                hasOverrideDutyRoster,
                departmentDutyRosterOverrideRequestDTOS,
                departmentWeekDaysDutyRosterRequestDTOS
            } = this.state;

            let formValid =
                fromDate &&
                toDate &&
                hospital &&
                department &&
                rosterGapDuration;
            if (hasOverrideDutyRoster === 'Y') {
                formValid = formValid && departmentDutyRosterOverrideRequestDTOS.length
            }

            departmentWeekDaysDutyRosterRequestDTOS.map(weekDay => {
                formValid = formValid && weekDay.startTime && weekDay.endTime;
                return weekDay
            });

            this.setState({
                formValid: Boolean(formValid)
            })
        };

        checkManageFormValidity = () => {
            const {
                rosterGapDuration,
                remarks,
                hasOverrideDutyRoster,
                overridesUpdate,
                weekDaysDutyRosterUpdateRequestDTOS,
                isCloneAndAdd,
                hospital,
                specialization,
                department
            } = this.state.updateDoctorDutyRosterData

            let formValid = isCloneAndAdd
                ? rosterGapDuration && hospital && specialization && department
                : rosterGapDuration && remarks && !StringUtils.stringContainsWhiteSpacesOnly(remarks);

            if (hasOverrideDutyRoster === 'Y') {
                formValid = formValid && overridesUpdate.length
            }

            weekDaysDutyRosterUpdateRequestDTOS.map(weekDay => {
                formValid = formValid && weekDay.startTime && weekDay.endTime
                return weekDay
            })

            this.setState({
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    formValid: Boolean(formValid)
                }
            })
        }

        checkOverrideFormValidity = () => {
            const {
                fromDate,
                toDate,
                startTime,
                endTime,
                dayOffStatus,
                remarks
            } = this.state.overrideRequestDTO;

            const validForm =
                fromDate &&
                toDate &&
                startTime &&
                endTime &&
                dayOffStatus &&
                remarks &&
                !StringUtils.stringContainsWhiteSpacesOnly(remarks);

            this.setState({
                overrideFormValid: Boolean(validForm)
            })
        };

        checkIfWholeWeekOff = departmentWeekDaysAvailability => {
            let wholeWeekOff = true
            departmentWeekDaysAvailability.map(day => {
                wholeWeekOff = wholeWeekOff && day.dayOffStatus === 'Y'
                return day
            })
            return wholeWeekOff
        }

        clearAlertTimeout = () => {
            this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            })
        };

        deleteOverride = async () => {
            let updatedOverride = [
                ...this.state.updateDoctorDutyRosterData.updatedOverrides
            ]
            try {
                await this.props.deleteDoctorDutyRosterOverride(
                    DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE,
                    this.state.deleteRequestDTO
                )
                let overrides = [
                    ...this.state.updateDoctorDutyRosterData.overridesUpdate
                ]
                let deletedOverride = overrides.splice(
                    this.state.deleteRequestDTO.index,
                    1
                )
                updatedOverride.push(deletedOverride[0])
                this.setState({
                    updateDoctorDutyRosterData: {
                        ...this.state.updateDoctorDutyRosterData,
                        overridesUpdate: [...overrides],
                        updatedOverrides: [...updatedOverride]
                    },
                    showDeleteOverrideModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
                })
            } catch (e) {
                this.setState({
                    deleteOverrideErrorMessage: e.errorMessage
                        ? e.errorMessage
                        : 'Error occurred while deleting override'
                })
            }
        }

        deleteDepartmentDutyRoster = async () => {
            try {
                await this.props.deleteDepartmentDutyRoster(
                    DELETE_DEPARTMENT_DUTY_ROSTER,
                    this.state.deleteRequestDTO
                );
                await this.setState({
                    showDeleteModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.DepartmentDutyRosterDeleteReducer
                            .deleteSuccessMessage
                    }
                });
                this.clearAlertTimeout();
                await this.searchDepartmentDutyRoster(1)
            } catch (e) {
                this.setState({
                    showDeleteModal: true
                })
            }
        };

        editDoctorDutyRoster = async () => {
            const {
                departmentDutyRosterId,
                hasOverrideDutyRoster,
                remarks,
                rosterGapDuration,
                status,
                weekDaysDutyRosterUpdateRequestDTOS
            } = this.state.updateDoctorDutyRosterData
            let updateData = {
                departmentDutyRosterId: departmentDutyRosterId,
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                remarks: remarks,
                rosterGapDuration: rosterGapDuration,
                status: status,
                weekDaysDutyRosterUpdateRequestDTOS: weekDaysDutyRosterUpdateRequestDTOS
            }
            const {editSuccessMessage} = this.props.DoctorDutyRosterEditReducer
            try {
                await this.props.updateDoctorDutyRoster(
                    UPDATE_DOCTOR_DUTY_ROSTER,
                    updateData
                )
                this.setState({
                    showEditModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: editSuccessMessage
                            ? editSuccessMessage
                            : 'Doctor Duty Roster updated successfully.'
                    }
                })
                this.clearAlertTimeout()
                this.resetEditForm()
                await this.searchDepartmentDutyRoster()
            } catch (e) {
            }
        }

        fetchActiveHospitalsForDropdown = async () =>
            await TryCatchHandler.genericTryCatch(
                this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN)
            );

        fetchAllHospitalsForDropdown = async () =>
            await this.props.fetchAllHospitalsForDropdown(FETCH_ALL_HOSPITALS_FOR_DROPDOWN);

        fetchActiveDepartmentByHospitalId = async hospitalId =>
            await this.props.fetchActiveHospitalDepartmentForDropdownByHospitalId(
                FETCH_ACTIVE_HOSPITAL_DEPARTMENT_FOR_DROPDOWN, hospitalId);

        fetchActiveRoomByDepartmentId = async departmentId => {
            await this.props.fetchActiveRoomNumberForDropdownByDepartmentId(
                FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN, departmentId);
        };

        fetchAllDepartmentByHospitalId = async hospitalId =>
            await this.props.fetchAllHospitalDepartmentForDropdownByHospitalId(
                FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN, hospitalId);

        fetchAllRoomByHospitalId = async hospitalId => {
            await this.props.fetchAllRoomNumberForDropdownByHospitalId(
                FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN, hospitalId);
        };

        fetchWeekdaysData = async () => {
            await TryCatchHandler.genericTryCatch(
                this.props.fetchWeekdaysData(FETCH_WEEKDAYS_DATA)
            );
            const weekDays = JSON.parse(
                JSON.stringify([...this.props.WeekdaysReducer.weekdaysDataList])
            );
            let weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                this.state.fromDate,
                this.state.toDate,
                [...weekDays]
            );
            this.setState({
                departmentWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
            })
        };

        fetchDepartmentDutyRosterDetailsById = async id => {
            await this.props.fetchDepartmentDutyRosterDetailById(
                FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
                id
            )
        };

        getWeekDaysDataForForm = () => {
            return JSON.parse(
                JSON.stringify([...this.props.WeekdaysReducer.weekdaysDataList])
            )
        }

        getExistingRoster = async () => {
            const {department, fromDate, toDate} = this.state;
            try {
                await this.props.fetchExistingDepartmentDutyRoster(
                    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER,
                    {
                        hospitalDeptId: department ? department.value : '',
                        fromDate: fromDate,
                        toDate: toDate
                    }
                );
                const {existingDepartmentDutyRosterList} = this.props.DepartmentDutyRosterExistingReducer;
                if (existingDepartmentDutyRosterList && existingDepartmentDutyRosterList.length)
                    this.setState({
                        showExistingRosterModal: true,
                    });
                else
                    this.showAlertMessage('danger', 'No Existing Department Duty Roster(s) found for department "' + department.label + '".');
            } catch (e) {
                this.showAlertMessage('danger', this.props.DepartmentDutyRosterExistingReducer.existingRostersFetchErrorMessage);
            }
        };

        handleShowExistingRoster = () => {
            this.setState({
                showExistingRosterModal: !this.state.showExistingRosterModal
            })
        };

        handleGeneralInfoFormInputChange = async (event, fieldName, fieldValid) => {
            if (event) {
                let key = fieldName ? fieldName : event.target.name;
                let value = fieldName ? event : event.target.type === 'checkbox' ? (event.target.checked ? 'Y' : 'N') : event.target.value;
                let label = fieldName ? '' : event.target.label;
                let fileUri = fieldName ? '' : event.target.fileUri;

                await this.setStateValues(key, value, label, fileUri, fieldValid);
                switch (key) {
                    case "hospital":
                        await this.actionOnHospitalChange(value);
                        break;
                    case "isRoomEnabled":
                        await this.actionOnRoomEnableOrDisable(value);
                        break;
                    case "fromDate":
                        await this.validateAndSetWeekDaysDataOnDateChange(key);
                        break;
                    case "toDate":
                        await this.validateAndSetWeekDaysDataOnDateChange(key);
                        break;
                    default:
                        break;
                }
                type === 'ADD' ? this.checkFormValidity() : this.checkManageFormValidity()
            }
        };

        handleDepartmentAvailabilityFormChange = async (event, fieldName, index) => {
            let value = fieldName ? event.target.value : event.target.checked;
            let departmentWeekDaysAvailability;
            switch (type) {
                case 'ADD':
                    departmentWeekDaysAvailability = [
                        ...this.state.departmentWeekDaysDutyRosterRequestDTOS
                    ];
                    this.setAvailabilityData(
                        fieldName,
                        departmentWeekDaysAvailability,
                        index,
                        value
                    );
                    let wholeWeekOff = this.checkIfWholeWeekOff(
                        departmentWeekDaysAvailability
                    );
                    await this.setState({
                        departmentWeekDaysDutyRosterRequestDTOS: [
                            ...departmentWeekDaysAvailability
                        ],
                        isWholeWeekOff: wholeWeekOff ? 'Y' : 'N'
                    });
                    this.checkFormValidity();
                    break;
                case 'MANAGE':
                    departmentWeekDaysAvailability = [
                        ...this.state.updateDoctorDutyRosterData
                            .weekDaysDutyRosterUpdateRequestDTOS
                    ];
                    this.setAvailabilityData(
                        fieldName,
                        departmentWeekDaysAvailability,
                        index,
                        value
                    );
                    this.setState({
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            weekDaysDutyRosterUpdateRequestDTOS: [
                                ...departmentWeekDaysAvailability
                            ]
                        }
                    });
                    this.checkManageFormValidity();
                    break;
                default:
                    break
            }
        };

        handleWholeWeekOff = event => {
            if (event) {
                let departmentWeekDaysAvailability = [
                    ...this.state.departmentWeekDaysDutyRosterRequestDTOS
                ];
                let updatedWeekDays = departmentWeekDaysAvailability.map(day => {
                    this.setDefaultStartAndEndTimeAndDayOffStatus(
                        event.target.checked,
                        day
                    );
                    return day
                });
                this.setState({
                    isWholeWeekOff: event.target.checked ? 'Y' : 'N',
                    departmentWeekDaysDutyRosterRequestDTOS: [...updatedWeekDays]
                });
                this.checkFormValidity()
            }
        };

        handleOverrideDutyRoster = async event => {
            if (event) {
                let isOverride = event.target.checked;
                const {fromDate} = this.state;
                switch (type) {
                    case 'ADD':
                        if (isOverride) {
                            await this.setState({
                                hasOverrideDutyRoster: 'Y',
                                showAddOverrideModal: true,
                                overrideRequestDTO: {
                                    ...this.state.overrideRequestDTO,
                                    fromDate: fromDate,
                                    toDate: fromDate
                                }
                            })
                        } else {
                            await this.setState({
                                hasOverrideDutyRoster: 'N',
                                departmentDutyRosterOverrideRequestDTOS: [],
                                overrideRequestDTO: {
                                    fromDate: new Date(),
                                    toDate: new Date(),
                                    startTime: '',
                                    endTime: '',
                                    dayOffStatus: 'N',
                                    remarks: '',
                                    id: '',
                                    status: 'Y'
                                }
                            })
                        }
                        this.checkFormValidity();
                        break;
                    case 'MANAGE':
                        if (isOverride) {
                            await this.setState({
                                updateDoctorDutyRosterData: {
                                    ...this.state.updateDoctorDutyRosterData,
                                    hasOverrideDutyRoster: 'Y'
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
                                    dayOffStatus: 'N',
                                    remarks: '',
                                    id: '',
                                    status: 'Y'
                                }
                            })
                        }
                        this.checkManageFormValidity();
                        break;
                    default:
                        break
                }
            }
        };

        handleOverrideFormInputChange = async (event, field) => {
            if (event) {
                let key = field ? field : event.target.name;
                let value = field
                    ? event
                    : event.target.type === 'checkbox'
                        ? event.target.checked === true
                            ? 'Y'
                            : 'N'
                        : event.target.value;
                let overrideRequestDTO = {...this.state.overrideRequestDTO};

                if (key === 'dayOffStatus') {
                    this.setDefaultStartAndEndTimeAndDayOffStatus(
                        event.target.checked,
                        overrideRequestDTO
                    )
                } else {
                    overrideRequestDTO[key] = value
                }
                if (key === 'fromDate' || key === 'toDate') {
                    overrideRequestDTO.dateErrorMessage = isFirstDateGreaterThanSecondDate(
                        overrideRequestDTO.fromDate,
                        overrideRequestDTO.toDate
                    )
                        ? DATE_ERROR_MESSAGE
                        : ''
                } else if (key === 'endTime' || key === 'startTime') {
                    if (overrideRequestDTO.startTime && overrideRequestDTO.endTime) {
                        overrideRequestDTO.timeErrorMessage = isFirstTimeGreaterThanSecond(
                            overrideRequestDTO.startTime,
                            overrideRequestDTO.endTime
                        )
                            ? TIME_ERROR_MESSAGE
                            : ''
                    }
                }
                await this.setState({
                    overrideRequestDTO: {...overrideRequestDTO}
                });
                this.checkOverrideFormValidity()
            }
        };

        handleAddOverride = async (isAddAnother, isModifyOverride) => {
            let overrideList =
                type === 'ADD'
                    ? [...this.state.departmentDutyRosterOverrideRequestDTOS]
                    : [...this.state.updateDoctorDutyRosterData.overridesUpdate];
            let currentOverride = {...this.state.overrideRequestDTO};
            const {fromDate} = this.state;
            switch (type) {
                case 'ADD':
                    this.addOrModifyOverride(
                        isModifyOverride,
                        overrideList,
                        currentOverride
                    );
                    await this.setState({
                        departmentDutyRosterOverrideRequestDTOS: [...overrideList],
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: fromDate,
                            toDate: fromDate,
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
                    let updatedOverrides = [
                        ...this.state.updateDoctorDutyRosterData.updatedOverrides
                    ];
                    try {
                        let dataToSave = {
                            dayOffStatus: currentOverride.dayOffStatus,
                            departmentDutyRosterId: this.state.updateDoctorDutyRosterData
                                .departmentDutyRosterId,
                            departmentDutyRosterOverrideId: isModifyOverride
                                ? currentOverride.departmentDutyRosterOverrideId
                                : '',
                            endTime: currentOverride.endTime,
                            overrideFromDate: currentOverride.fromDate,
                            overrideToDate: currentOverride.toDate,
                            remarks: currentOverride.remarks,
                            startTime: currentOverride.startTime,
                            status: 'Y'
                        };
                        if (this.state.updateDoctorDutyRosterData.isCloneAndAdd) {
                            this.addOrModifyOverride(
                                isModifyOverride,
                                overrideList,
                                currentOverride
                            );
                            await this.updateStateDataAfterAddingOrEditingOverride(
                                overrideList,
                                updatedOverrides,
                                isAddAnother
                            );
                            this.checkManageFormValidity()
                        } else {
                            try {
                                let response = await this.updateOverride(dataToSave);
                                if (isModifyOverride) {
                                    overrideList[currentOverride.id] = currentOverride
                                } else {
                                    currentOverride.departmentDutyRosterOverrideId =
                                        response.savedOverrideId;
                                    currentOverride.isNew = true;
                                    overrideList.push(currentOverride)
                                }
                                updatedOverrides.push(currentOverride);
                                this.updateStateDataAfterAddingOrEditingOverride(
                                    overrideList,
                                    updatedOverrides,
                                    isAddAnother
                                );
                                this.checkManageFormValidity()
                            } catch (e) {
                                await this.setState({
                                    overrideUpdateErrorMessage: e.errorMessage
                                        ? e.errorMessage
                                        : 'Error Occurred while adding/modifying override.'
                                })
                            }
                        }
                    } catch (e) {
                    }
                    break;
                default:
                    break
            }
        };

        handleModifyOverride = async (data, index) => {
            switch (type) {
                case 'ADD':
                    await this.setState({
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
                    this.checkOverrideFormValidity();
                    break;
                case 'MANAGE':
                    await this.setState({
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: new Date(data.fromDate),
                            toDate: new Date(data.toDate),
                            startTime: new Date(data.startTime),
                            endTime: new Date(data.endTime),
                            dayOffStatus: data.dayOffStatus,
                            remarks: data.remarks,
                            departmentDutyRosterOverrideId: data.departmentDutyRosterOverrideId,
                            id: data.id ? data.id : index
                        },
                        isModifyOverride: true,
                        showAddOverrideModal: true
                    });
                    this.checkOverrideFormValidity();
                    break;
                default:
                    break;
            }
        };

        handleRemoveOverride = async (data, index) => {
            switch (type) {
                case 'ADD':
                    let overrides = [...this.state.departmentDutyRosterOverrideRequestDTOS],
                        hasOverride = this.state.hasOverrideDutyRoster;
                    overrides.splice(index, 1);
                    if (!overrides.length) {
                        hasOverride = 'N';
                    }
                    this.setState({
                        departmentDutyRosterOverrideRequestDTOS: [...overrides],
                        hasOverrideDutyRoster: hasOverride
                    });
                    break;
                case 'MANAGE':
                    this.props.clearDepartmentDutyRosterMessages();
                    let deleteRequestDTO = {...this.state.deleteRequestDTO};
                    deleteRequestDTO['id'] = data.departmentDutyRosterOverrideId;
                    deleteRequestDTO['index'] = index;

                    await this.setState({
                        deleteRequestDTO: deleteRequestDTO,
                        showDeleteOverrideModal: true,
                        showAlert: false,
                        deleteOverrideErrorMessage: ''
                    });
                    break;
                default:
                    break;
            }
        };

        handleSaveButtonClick = async () => {
            await this.setState({
                showConfirmModal: true
            })
        };

        handleViewDetailsExisting = async data => {
            try {
                await this.props.fetchExistingDepartmentDutyRosterDetails(
                    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
                    data.hddRosterId
                );
            } catch (e) {
                this.setState({
                    showExistingRosterModal: true
                });
            }
        };

        handleSearchInputChange = async (event, fieldName) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;
            let fileUri = fieldName ? '' : event.target.fileUri;

            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    [key]: label ? fileUri ? {label, value, fileUri} : {label, value} : value
                }
            });

            if (key === 'hospital') {
                if (value) {
                    this.fetchAllDepartmentByHospitalId(value);
                    this.fetchAllRoomByHospitalId(value);
                }
                this.setState({
                    searchParameters: {
                        ...this.state.searchParameters,
                        department: null,
                        room: null,
                    }
                })
            }
            if (key === 'fromDate' || key === 'toDate') {
                const {fromDate, toDate} = this.state.searchParameters;
                if (
                    isFirstDateGreaterThanSecondDate(fromDate, toDate) &&
                    getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) !== 1
                )
                    this.showAlertMessage('danger', DATE_ERROR_MESSAGE);

            }
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            await this.searchDepartmentDutyRoster()
        }

        handlePreview = async data => {
            try {
                await this.fetchDepartmentDutyRosterDetailsById(data.hddRosterId);
                const departmentDutyRosterInfo = await this.prepareDataForPreview();
                await this.setState({
                    showConfirmModal: true,
                    ...departmentDutyRosterInfo
                })
            } catch (e) {
                this.showAlertMessage('danger', this.props.DepartmentDutyRosterPreviewReducer.previewErrorMessage);
            }
        };

        handleDelete = async data => {
            this.props.clearDepartmentDutyRosterMessages();
            let deleteRequestDTO = {...this.state.deleteRequestDTO};
            deleteRequestDTO['id'] = data.hddRosterId;
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                showDeleteModal: true
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

        handleEdit = async data => {
            try {
                await this.fetchDepartmentDutyRosterDetailsById(data.hddRosterId);
                const departmentDutyRosterInfo = await this.prepareDataForPreview();
                await this.prepareDataForEdit(departmentDutyRosterInfo, false)
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage
                            ? e.errorMessage
                            : 'Error occurred while fetching Doctor Duty Roster details.'
                    }
                })
                this.clearAlertTimeout()
            }
        };

        handleCloneAndAddNew = async id => {
            try {
                await this.fetchDepartmentDutyRosterDetailsById(id)
                const departmentDutyRosterInfo = await this.prepareDataForPreview()
                await this.fetchActiveSpecializationByHospitalForDropdown(
                    departmentDutyRosterInfo.hospital.value
                )
                await this.prepareDataForEdit(departmentDutyRosterInfo, true)
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage
                            ? e.errorMessage
                            : 'Error occurred while fetching Doctor Duty Roster details.'
                    }
                })
                this.clearAlertTimeout()
            }
        };

        handleEnter = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        initialApiCalls = async () => {
            this.fetchActiveHospitalsForDropdown();
            this.fetchWeekdaysData();
            if (type === 'MANAGE') {
                this.fetchAllHospitalsForDropdown();
                this.searchDepartmentDutyRoster(1)
            }
        };

        prepareDataForPreview = async () => {
            const {
                dutyRosterDetail,
                overrideRosters,
                weekDaysRosters,
                roomInfo
            } = this.props.DepartmentDutyRosterPreviewReducer.departmentDutyRosterPreviewData;
            const {
                hddRosterId,
                hospitalDeptId,
                hospitalDeptName,
                hospitalName,
                hospitalId,
                isRoomEnabled,
                rosterGapDuration,
                fromDate,
                toDate,
                hasOverrideDutyRoster,
                remarks,
                status,
                createdBy,
                createdDate,
                lastModifiedBy,
                lastModifiedDate,
            } = dutyRosterDetail && dutyRosterDetail;

            return {
                id: hddRosterId,
                hospital: {label: hospitalName, value: hospitalId},
                department: {label: hospitalDeptName, value: hospitalDeptId},
                isRoomEnabled,
                room: isRoomEnabled === 'Y' ? {label: roomInfo.roomNumber, value: roomInfo.roomId} : null,
                rosterRoomId: roomInfo.rosterRoomId,
                rosterGapDuration: rosterGapDuration,
                fromDate: new Date(fromDate),
                toDate: new Date(toDate),
                hasOverrideDutyRoster: hasOverrideDutyRoster,
                departmentWeekDaysDutyRosterRequestDTOS: [...weekDaysRosters],
                departmentDutyRosterOverrideRequestDTOS: [...overrideRosters],
                status: status,
                remarks,
                createdBy,
                createdDate,
                lastModifiedBy,
                lastModifiedDate
            }
        };

        prepareDataForEdit = async (departmentDutyRosterInfo, isCloneAndAdd) => {
            const {
                id,
                hospital,
                specialization,
                department,
                rosterGapDuration,
                fromDate,
                toDate,
                hasOverrideDutyRoster,
                departmentWeekDaysDutyRosterRequestDTOS,
                departmentDutyRosterOverrideRequestDTOS,
                status
            } = departmentDutyRosterInfo

            let weekDaysAvailabilityData = departmentWeekDaysDutyRosterRequestDTOS.map(
                weekDay => {
                    weekDay.startTime = new Date(weekDay.startTime)
                    weekDay.endTime = new Date(weekDay.endTime)
                    weekDay.dayOffStatus = weekDay.dayOffStatus
                        ? weekDay.dayOffStatus
                        : 'N'
                    return weekDay
                }
            )

            await this.setState({
                showEditModal: true,
                showAlert: false,
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate),
                    hospital: {...hospital},
                    specialization: isCloneAndAdd ? null : {...specialization},
                    department: isCloneAndAdd ? null : {...department},
                    departmentDutyRosterId: isCloneAndAdd ? null : id,
                    hasOverrideDutyRoster: hasOverrideDutyRoster,
                    remarks: '',
                    rosterGapDuration: rosterGapDuration,
                    status: status,
                    weekDaysDutyRosterUpdateRequestDTOS: [...weekDaysAvailabilityData],
                    weekDaysDataOriginal: [...weekDaysAvailabilityData],
                    overridesUpdate: [...departmentDutyRosterOverrideRequestDTOS],
                    originalOverrides: [...departmentDutyRosterOverrideRequestDTOS],
                    updatedOverrides: [],
                    isCloneAndAdd: isCloneAndAdd
                }
            });
            this.checkManageFormValidity()
        };

        partialResetAddForm = async onSuccessData => {
            await this.setState({
                department: null,
                isRoomEnabled: 'N',
                room: null,
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

        resetAddForm = async onSuccessData => {
            const weekDays = await this.getWeekDaysDataForForm();
            await this.setState({
                hospital: null,
                room: null,
                department: null,
                rosterGapDuration: '',
                isRoomEnabled: 'N',
                status: 'Y',
                fromDate: new Date(),
                toDate: addDate(new Date(), 6),
                hasOverrideDutyRoster: 'N',
                isWholeWeekOff: 'N',
                departmentWeekDaysDutyRosterRequestDTOS: [...weekDays],
                departmentDutyRosterOverrideRequestDTOS: [],
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
                    department: null,
                    status: {value: 'A', label: 'All'}
                },
                showAlert: false
            })
            await this.searchDepartmentDutyRoster(1)
        }

        resetEditForm = () => {
            this.setState({
                updateDoctorDutyRosterData: {
                    ...this.state.updateDoctorDutyRosterData,
                    fromDate: '',
                    toDate: '',
                    hospital: null,
                    specialization: null,
                    department: null,
                    departmentDutyRosterId: 0,
                    hasOverrideDutyRoster: '',
                    remarks: '',
                    rosterGapDuration: 0,
                    status: '',
                    weekDaysDutyRosterUpdateRequestDTOS: [],
                    overridesUpdate: [],
                    originalOverrides: [],
                    updateFormValid: true
                }
            })
        }

        resetRoomOnRoomDisable = async () => {
            type === 'ADD'
                ? await this.setState({
                    room: null
                })
                : await this.setState({
                    updateDoctorDutyRosterData: {
                        ...this.state.updateDoctorDutyRosterData,
                        room: null
                    }
                })
        };

        resetDepartmentAndRoomOnHospitalChange = () => {
            if (type === 'ADD') {
                this.setState({
                    room: null,
                    department: null
                })
            } else {
                this.setState({
                    updateDoctorDutyRosterData: {
                        ...this.state.updateDoctorDutyRosterData,
                        room: null,
                        department: null
                    }
                })
            }
        };

        revertOverrideUpdatesOnCancel = async () => {
            const {
                updatedOverrides,
                originalOverrides,
                departmentDutyRosterId
            } = this.state.updateDoctorDutyRosterData
            let overridesToBeReverted = []
            let originalUpdatedOverrides = updatedOverrides.filter(
                override => !override.isNew
            )
            let newOverrides = updatedOverrides.filter(override => override.isNew)

            originalUpdatedOverrides.map(originalUpdated => {
                // FIND THE ORIGINAL DATA, CHANGE IT'S STATUS TO 'Y' ; ADD isOriginal FLAG THEN ADD TO ARRAY
                let originalOverride = originalOverrides.find(
                    original =>
                        original.departmentDutyRosterOverrideId ===
                        originalUpdated.departmentDutyRosterOverrideId
                )
                if (originalOverride) {
                    let override = {
                        dayOffStatus: originalOverride.dayOffStatus,
                        departmentDutyRosterId: departmentDutyRosterId,
                        departmentDutyRosterOverrideId:
                        originalOverride.departmentDutyRosterOverrideId,
                        endTime: originalOverride.endTime,
                        // original: true,
                        overrideFromDate: originalOverride.fromDate,
                        overrideToDate: originalOverride.toDate,
                        remarks: originalOverride.remarks,
                        startTime: originalOverride.startTime,
                        status: 'Y'
                    }
                    overridesToBeReverted.push(override)
                }
                return originalUpdated;
            })

            newOverrides.length &&
            newOverrides.map(newAdded => {
                // FOR NEWLY ADDED DATA, CHANGE STATUS TO 'D' , ADD REMARKS THEN ADD TO ARRAY
                let override = {
                    dayOffStatus: newAdded.dayOffStatus,
                    departmentDutyRosterId: departmentDutyRosterId,
                    departmentDutyRosterOverrideId: newAdded.departmentDutyRosterOverrideId,
                    endTime: newAdded.endTime,
                    // original: false,
                    overrideFromDate: newAdded.fromDate,
                    overrideToDate: newAdded.toDate,
                    remarks: 'Update Cancelled.',
                    startTime: newAdded.startTime,
                    status: 'D'
                }
                overridesToBeReverted.push(override)
                return newOverrides;
            })

            try {
                await this.props.revertDoctorDutyRosterOverrideUpdate(
                    REVERT_DOCTOR_DUTY_ROSTER_OVERRIDE_UPDATE,
                    overridesToBeReverted
                )
            } catch (e) {
                console.log('Revert Override Error', e.errorMessage)
            }
        }

        setStateValues = (key, value, label, fileUri, fieldValid) => {
            if (type === 'ADD') {
                label
                    ? value
                    ? fileUri ? this.setState({[key]: {value, label, fileUri}})
                        : this.setState({[key]: {value, label}})
                    : this.setState({[key]: null})
                    : this.setState({[key]: value, [key + 'Valid']: fieldValid})
            } else if (type === 'MANAGE') {
                label
                    ? value
                    ? fileUri ? this.setState({
                            updateDoctorDutyRosterData: {
                                ...this.state.updateDoctorDutyRosterData,
                                [key]: {value, label, fileUri}
                            }
                        }) :
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
                            [key]: value,
                            [key + 'Valid']: fieldValid
                        }
                    })
            }
        };

        setAvailabilityData(fieldName, departmentWeekDaysAvailability, index, value) {
            if (fieldName) {
                departmentWeekDaysAvailability[index][fieldName] = value;
                if (
                    departmentWeekDaysAvailability[index].startTime &&
                    departmentWeekDaysAvailability[index].endTime
                ) {
                    departmentWeekDaysAvailability[
                        index
                        ].errorMessage = isFirstTimeGreaterThanSecond(
                        departmentWeekDaysAvailability[index].startTime,
                        departmentWeekDaysAvailability[index].endTime
                    )
                        ? TIME_ERROR_MESSAGE
                        : ''
                }
            } else {
                this.setDefaultStartAndEndTimeAndDayOffStatus(
                    value,
                    departmentWeekDaysAvailability[index]
                )
            }
        }

        setDefaultStartAndEndTimeAndDayOffStatus = (
            dayOff,
            departmentWeekDaysAvailability
        ) => {
            if (dayOff) {
                departmentWeekDaysAvailability.dayOffStatus = 'Y';
                departmentWeekDaysAvailability.startTime = getDateWithTimeSetToGivenTime(
                    new Date(),
                    0,
                    0,
                    0
                );
                departmentWeekDaysAvailability.endTime = getDateWithTimeSetToGivenTime(
                    new Date(),
                    23,
                    59,
                    59
                );
                departmentWeekDaysAvailability.errorMessage = ''
            } else {
                departmentWeekDaysAvailability.dayOffStatus = 'N';
                departmentWeekDaysAvailability.startTime = '';
                departmentWeekDaysAvailability.endTime = '';
                departmentWeekDaysAvailability.errorMessage = ''
            }
        };


        setShowAddOverrideModal = async () => {
            let hasOverride;
            const {fromDate} = this.state;
            switch (type) {
                case 'ADD':
                    hasOverride =
                        this.state.departmentDutyRosterOverrideRequestDTOS.length <= 0
                            ? 'N'
                            : this.state.hasOverrideDutyRoster
                    await this.setState({
                        showAddOverrideModal: !this.state.showAddOverrideModal,
                        isModifyOverride: false,
                        overrideUpdateErrorMessage: '',
                        hasOverrideDutyRoster: hasOverride,
                        overrideRequestDTO: {
                            ...this.state.overrideRequestDTO,
                            fromDate: fromDate,
                            toDate: fromDate,
                            startTime: '',
                            endTime: '',
                            dayOffStatus: 'N',
                            remarks: '',
                            status: 'Y',
                            departmentDutyRosterOverrideId: '',
                            id: '',
                            dateErrorMessage: '',
                            timeErrorMessage: ''
                        }
                    });
                    this.checkOverrideFormValidity();
                    break;
                case 'MANAGE':
                    hasOverride =
                        this.state.updateDoctorDutyRosterData.overridesUpdate.length <= 0
                            ? 'N'
                            : this.state.updateDoctorDutyRosterData.hasOverrideDutyRoster
                    await this.setState({
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
                            departmentDutyRosterOverrideId: '',
                            id: '',
                            dateErrorMessage: '',
                            timeErrorMessage: ''
                        }
                    })
                    this.checkOverrideFormValidity()
                    break
                default:
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
        }

        setShowDeleteOverrideModal = () => {
            this.setState({
                showDeleteOverrideModal: !this.state.showDeleteOverrideModal
            })
        }

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

        saveDepartmentDutyRoster = async (isClone, isSaveFromManageClone) => {
            let dataToSave;
            if (!isSaveFromManageClone) {
                const {
                    departmentDutyRosterOverrideRequestDTOS,
                    department,
                    departmentWeekDaysDutyRosterRequestDTOS,
                    fromDate,
                    hasOverrideDutyRoster,
                    rosterGapDuration,
                    isRoomEnabled,
                    room,
                    status,
                    toDate,
                    hospital
                } = this.state;
                dataToSave = {
                    fromDate,
                    toDate,
                    hospitalDepartmentId: department ? department.value : '',
                    hospitalId: hospital ? hospital.value : '',
                    isRoomEnabled,
                    roomId: room ? room.value : '',
                    rosterGapDuration,
                    weekDaysDetail: departmentWeekDaysDutyRosterRequestDTOS,
                    hasOverrideDutyRoster,
                    overrideDetail: departmentDutyRosterOverrideRequestDTOS,
                    status
                }
            } else {
                const {
                    department,
                    fromDate,
                    hasOverrideDutyRoster,
                    rosterGapDuration,
                    specialization,
                    status,
                    toDate,
                    hospital,
                    weekDaysDutyRosterUpdateRequestDTOS,
                    overridesUpdate
                } = this.state.updateDoctorDutyRosterData;

                dataToSave = {
                    fromDate,
                    toDate,
                    specializationId: specialization ? specialization.value : '',
                    departmentId: department ? department.value : '',
                    hospitalId: hospital ? hospital.value : '',
                    rosterGapDuration,
                    departmentWeekDaysDutyRosterRequestDTOS: weekDaysDutyRosterUpdateRequestDTOS,
                    hasOverrideDutyRoster,
                    departmentDutyRosterOverrideRequestDTOS: overridesUpdate,
                    status
                }
            }

            try {
                await this.props.createDepartmentDutyRoster(
                    CREATE_DEPARTMENT_DUTY_ROSTER,
                    dataToSave
                );
                const {saveSuccessMessage} = this.props.DepartmentDutyRosterSaveReducer;
                let onSuccessData = {
                    showConfirmModal: false,
                    showEditModal: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: saveSuccessMessage
                            ? saveSuccessMessage
                            : 'Department Duty Roster saved successfully.'
                    }
                };
                this.clearAlertTimeout();
                isClone
                    ? this.partialResetAddForm(onSuccessData)
                    : this.resetAddForm(onSuccessData);
                type === 'MANAGE' && this.searchDepartmentDutyRoster(1)
            } catch (e) {
                const {saveErrorMessage} = this.props.DepartmentDutyRosterSaveReducer
                this.setState({
                    showAlert: true,
                    showConfirmModal: false,
                    showEditModal: false,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: saveErrorMessage
                            ? saveErrorMessage
                            : 'Error occurred while saving Doctor Duty Roster.'
                    }
                });
                this.clearAlertTimeout()
            }
        };

        searchDepartmentDutyRoster = async page => {
            const {
                fromDate,
                toDate,
                hospital,
                room,
                department,
                status
            } = this.state.searchParameters;
            if (
                isFirstDateGreaterThanSecondDate(fromDate, toDate) &&
                getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) !== 1
            ) {
                this.showAlertMessage('danger', DATE_ERROR_MESSAGE);
            } else {
                let searchData = {
                    hospitalId: hospital ? hospital.value : '',
                    hospitalDepartmentId: department ? department.value : '',
                    roomId: room ? room.value : '',
                    fromDate: fromDate,
                    toDate: toDate,
                    status: status && status.value === 'A' ? '' : status.value
                };

                let updatedPage =
                    this.state.queryParams.page === 0
                        ? 1
                        : page
                        ? page
                        : this.state.queryParams.page;

                await this.props.searchDepartmentDutyRoster(
                    SEARCH_DEPARTMENT_DUTY_ROSTER,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    },
                    searchData
                );

                await this.setState({
                    totalRecords: this.props.DepartmentDutyRosterListReducer
                        .departmentDutyRosterList.length
                        ? this.props.DepartmentDutyRosterListReducer.departmentDutyRosterList[0]
                            .totalItems
                        : 0,
                    queryParams: {
                        ...this.state.queryParams,
                        page: updatedPage
                    }
                })
            }
        };

        updateOverride = async overrideData => {
            try {
                return await this.props.updateDoctorDutyRosterOverride(
                    UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE,
                    overrideData
                )
            } catch (e) {
                throw e
            }
        }

        updateStateDataAfterAddingOrEditingOverride = async (
            overrideList,
            updatedOverrides,
            isAddAnother
        ) => {
            await this.setState({
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
            })
        }

        validateAndSetWeekDaysDataOnDateChange = async () => {
            let errorMessage = ''
            let originalWeekDaysData = [
                ...this.state.departmentWeekDaysDutyRosterRequestDTOS
            ]
            let weekDaysData = []
            switch (type) {
                case 'ADD':
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(this.state.fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(this.state.toDate, 0, 0, 0)
                        )
                    ) {
                        errorMessage = DATE_ERROR_MESSAGE
                        weekDaysData = [...originalWeekDaysData]
                    } else {
                        weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                            this.state.fromDate,
                            this.state.toDate,
                            [...this.props.WeekdaysReducer.weekdaysDataList]
                        )
                    }
                    await this.setState({
                        dateErrorMessage: errorMessage,
                        departmentWeekDaysDutyRosterRequestDTOS: [...weekDaysData]
                    })
                    break
                case 'MANAGE':
                    const {
                        fromDate,
                        toDate,
                        weekDaysDataOriginal
                    } = this.state.updateDoctorDutyRosterData
                    let weekDaysWithTime = []
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(toDate, 0, 0, 0)
                        )
                    ) {
                        errorMessage = DATE_ERROR_MESSAGE
                        weekDaysWithTime = [...originalWeekDaysData]
                    } else {
                        weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                            fromDate,
                            this.state.updateDoctorDutyRosterData.toDate,
                            [...this.props.WeekdaysReducer.weekdaysDataList]
                        )
                        weekDaysWithTime = weekDaysData.map(weekDayData => {
                            let originalDataWithTime = weekDaysDataOriginal.find(
                                originalData =>
                                    originalData.weekDaysId === weekDayData.weekDaysId
                            )
                            weekDayData.startTime = originalDataWithTime
                                ? originalDataWithTime.startTime
                                : ''
                            weekDayData.endTime = originalDataWithTime
                                ? originalDataWithTime.endTime
                                : ''
                            weekDayData.dayOffStatus = originalDataWithTime
                                ? originalDataWithTime.dayOffStatus
                                : 'N'
                            return weekDayData
                        })
                    }

                    await this.setState({
                        dateErrorMessage: errorMessage,
                        updateDoctorDutyRosterData: {
                            ...this.state.updateDoctorDutyRosterData,
                            weekDaysDutyRosterUpdateRequestDTOS: [...weekDaysWithTime]
                        }
                    })
                    break
                default:
                    break
            }
        }

        render() {
            const {
                showExistingRosterModal,
                hospital,
                room,
                department,
                rosterGapDuration,
                fromDate,
                toDate,
                isRoomEnabled,
                departmentWeekDaysDutyRosterRequestDTOS,
                isWholeWeekOff,
                status,
                hasOverrideDutyRoster,
                overrideRequestDTO,
                departmentDutyRosterOverrideRequestDTOS,
                showAlert,
                alertMessageInfo,
                showAddOverrideModal,
                isModifyOverride,
                formValid,
                showConfirmModal,
                // existingRosterTableData,
                // existingDoctorWeekDaysAvailability,
                // existingOverrides,
                searchParameters,
                queryParams,
                totalRecords,
                showDeleteModal,
                deleteRequestDTO,
                showEditModal,
                updateDoctorDutyRosterData,
                overrideUpdateErrorMessage,
                showDeleteOverrideModal,
                deleteOverrideErrorMessage,
                dateErrorMessage,
                overrideFormValid
            } = this.state;

            const {hospitalsForDropdown, allHospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {
                activeHospitalDepartmentForDropdown,
                activeDepartmentDropdownErrorMessage,
                allHospitalDepartmentForDropdown
            } = this.props.HospitalDepartmentDropdownReducer;

            const {activeRoomNumberForDropdownByDepartment, allRoomNumberForDropdown} = this.props.RoomNumberDropdownReducer;

            const {isSaveRosterLoading} = this.props.DepartmentDutyRosterSaveReducer;

            const {deleteErrorMessage, isDeleteRosterLoading} = this.props.DepartmentDutyRosterDeleteReducer;

            const {
                editErrorMessage,
                isEditRosterPending
            } = this.props.DoctorDutyRosterEditReducer;

            const {
                departmentDutyRosterList,
                isSearchRosterLoading,
                searchErrorMessage
            } = this.props.DepartmentDutyRosterListReducer;

            const {
                existingDepartmentDutyRosterList,
                existingDepartmentDutyRosterWeekdaysDetails,
                existingDepartmentDutyRosterOverrideDetails,
                existingRostersDetailErrorMessage
            } = this.props.DepartmentDutyRosterExistingReducer;

            let departmentInfoData = {
                hospital,
                department,
                room,
                rosterGapDuration,
                fromDate,
                toDate,
                status,
                isRoomEnabled
            };

            return (
                <>
                    <div className="departmentDutyRoster-setup">
                        <ComposedComponent
                            {...props}
                            departmentInfoFormData={{
                                hospitalList: hospitalsForDropdown,
                                departmentList: activeHospitalDepartmentForDropdown,
                                roomList: activeRoomNumberForDropdownByDepartment,
                                departmentInfoData: departmentInfoData,
                                onInputChange: this.handleGeneralInfoFormInputChange,
                                onEnterKeyPress: this.handleEnter,
                                departmentDropdownError: activeDepartmentDropdownErrorMessage,
                                roomDropdownErrorMessage: '',
                                getExistingRoster: this.getExistingRoster,
                                dateErrorMessage: dateErrorMessage
                            }}
                            existingRosterModalData={{
                                showExistingRosterModal,
                                handleShowExistingRoster: this.handleShowExistingRoster,
                                onViewDetailsExisting: this.handleViewDetailsExisting,
                                existingDepartmentWeekDaysAvailability: existingDepartmentDutyRosterWeekdaysDetails,
                                existingOverrides: existingDepartmentDutyRosterOverrideDetails,
                                existingRosterTableData: existingDepartmentDutyRosterList,
                                existingRostersDetailErrorMessage
                            }}
                            departmentAvailabilityFormData={{
                                departmentAvailabilityData: departmentWeekDaysDutyRosterRequestDTOS,
                                handleDepartmentAvailabilityFormChange: this.handleDepartmentAvailabilityFormChange,
                                wholeWeekOff: isWholeWeekOff,
                                handleWholeWeekOff: this.handleWholeWeekOff,
                                rosterGapDuration: rosterGapDuration
                            }}
                            departmentAvailabilityOverrideData={{
                                addOverride: this.handleAddOverride,
                                departmentDutyRosterOverrideRequestDTOS,
                                departmentInfoData: departmentInfoData,
                                handleEnter: this.handleEnter,
                                handleOverrideDutyRoster: this.handleOverrideDutyRoster,
                                handleOverrideFormInputChange: this.handleOverrideFormInputChange,
                                hasOverrideDutyRoster: hasOverrideDutyRoster,
                                isModifyOverride,
                                onModify: this.handleModifyOverride,
                                onRemove: this.handleRemoveOverride,
                                overrideData: {...overrideRequestDTO},
                                setShowAddOverrideModal: this.setShowAddOverrideModal,
                                showAddOverrideModal,
                                overrideFormValid
                            }}
                            saveProps={{
                                formValid: formValid,
                                onSaveButtonClick: this.handleSaveButtonClick,
                                showConfirmModal: showConfirmModal,
                            }}
                            searchFilterProps={{
                                searchParameters,
                                onSearchInputChange: this.handleSearchInputChange,
                                resetSearchForm: this.resetSearchForm,
                                onSearchClick: this.searchDepartmentDutyRoster,
                                hospitalList: allHospitalsForDropdown,
                                departmentList: allHospitalDepartmentForDropdown,
                                roomList: allRoomNumberForDropdown,
                            }}
                            dataTableProps={{
                                isSearchRosterLoading,
                                searchErrorMessage,
                                departmentDutyRosterList,
                                filteredAction: props.filteredAction,
                                totalItems: totalRecords,
                                maxSize: queryParams.size,
                                currentPage: queryParams.page,
                                handlePageChange: this.handlePageChange,
                                onPreviewHandler: this.handlePreview,
                                onDeleteHandler: this.handleDelete,
                                onEditHandler: this.handleEdit,
                                onCloneAndAddNew: this.handleCloneAndAddNew
                            }}
                            deleteProps={{
                                showDeleteModal,
                                setShowModal: this.setShowModal,
                                remarksHandler: this.handleDeleteRemarksChange,
                                remarks: deleteRequestDTO.remarks,
                                deleteDepartmentDutyRoster: this.deleteDepartmentDutyRoster,
                                deleteErrorMessage: deleteErrorMessage,
                                isDeleteRosterLoading
                            }}
                            cancelCloseEditModal={this.cancelCloseEditModal}


                            deleteOverride={this.deleteOverride}
                            deleteOverrideErrorMessage={deleteOverrideErrorMessage}
                            departmentDutyRosterList={departmentDutyRosterList}
                            departmentDutyRosterOverrideRequestDTOS={
                                departmentDutyRosterOverrideRequestDTOS
                            }
                            editDoctorDutyRoster={this.editDoctorDutyRoster}
                            editErrorMessage={editErrorMessage}
                            isSaveRosterLoading={isSaveRosterLoading}
                            isEditRosterPending={isEditRosterPending}

                            isDeleteRosterLoading={isDeleteRosterLoading}

                            overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                            remarks={deleteRequestDTO.remarks}

                            saveDoctorDutyRoster={this.saveDepartmentDutyRoster}
                            searchDoctorDutyRoster={this.searchDepartmentDutyRoster}
                            searchErrorMessage={searchErrorMessage}


                            setShowDeleteOverrideModal={this.setShowDeleteOverrideModal}

                            showDeleteModal={showDeleteModal}
                            showDeleteOverrideModal={showDeleteOverrideModal}
                            showEditModal={showEditModal}
                            showExistingRosterModal={showExistingRosterModal}
                            updateDoctorDutyRosterData={updateDoctorDutyRosterData}
                        />
                        <CModal
                            show={showConfirmModal}
                            modalHeading="Department Duty Roster Details"
                            size="xl"
                            bodyChildren={
                                <DepartmentDutyRosterPreviewModal
                                    departmentInfoData={
                                        {
                                            ...departmentInfoData,
                                            auditableDepartment: {
                                                createdDate: this.state.createdDate,
                                                createdBy: this.state.createdBy,
                                                lastModifiedBy: this.state.lastModifiedBy,
                                                lastModifiedDate: this.state.lastModifiedDate
                                            }
                                        }}
                                    departmentAvailabilityData={departmentWeekDaysDutyRosterRequestDTOS}
                                    hasOverrideDutyRoster={hasOverrideDutyRoster}
                                    departmentDutyRosterOverrideRequestDTOS={
                                        departmentDutyRosterOverrideRequestDTOS
                                    }
                                    type={type}
                                />
                            }
                            footerChildren={
                                type === 'ADD' ? (
                                    <>
                                        <CButton
                                            variant="outline-primary"
                                            name={'Clone and Add New Department Duty Roster'}
                                            disabled={isSaveRosterLoading}
                                            isLoading={isSaveRosterLoading}
                                            size="lg"
                                            className="float-right btn-action mr-3"
                                            onClickHandler={() =>
                                                this.saveDepartmentDutyRoster(true, false)
                                            }
                                        />
                                        <CButton
                                            variant="primary"
                                            name={'Confirm'}
                                            disabled={isSaveRosterLoading}
                                            isLoading={isSaveRosterLoading}
                                            size="lg"
                                            className="float-right btn-action mr-3"
                                            onClickHandler={() =>
                                                this.saveDepartmentDutyRoster(false, false)
                                            }
                                        />
                                    </>
                                ) : (
                                    ''
                                )
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
                    </div>
                </>
            )
        }
    }

    return ConnectHoc(
        DepartmentDutyRoster,
        [
            'DepartmentDutyRosterSaveReducer',
            'DepartmentDutyRosterExistingReducer',
            'DepartmentDutyRosterListReducer',
            'DepartmentDutyRosterPreviewReducer',
            'DepartmentDutyRosterDeleteReducer',

            'DoctorDutyRosterEditReducer',

            'HospitalDropdownReducer',
            'WeekdaysReducer',
            'HospitalDepartmentDropdownReducer',
            'RoomNumberDropdownReducer'
        ],
        {
            createDepartmentDutyRoster,
            clearDepartmentDutyRosterMessages,
            deleteDepartmentDutyRoster,
            deleteDepartmentDutyRosterOverride,
            fetchDepartmentDutyRosterDetailById,
            fetchExistingDepartmentDutyRoster,
            fetchExistingDepartmentDutyRosterDetails,
            revertDepartmentDutyRosterOverrideUpdate,
            searchDepartmentDutyRoster,
            updateDepartmentDutyRoster,
            updateDepartmentDutyRosterOverride,
            fetchActiveHospitalsForDropdown,
            fetchWeekdays,
            fetchWeekdaysData,
            fetchActiveHospitalDepartmentForDropdownByHospitalId,
            fetchActiveRoomNumberForDropdownByDepartmentId,
            fetchAllHospitalDepartmentForDropdownByHospitalId,
            fetchAllRoomNumberForDropdownByHospitalId,
            fetchAllHospitalsForDropdown
        }
    )
};

export default DepartmentDutyRosterHOC
