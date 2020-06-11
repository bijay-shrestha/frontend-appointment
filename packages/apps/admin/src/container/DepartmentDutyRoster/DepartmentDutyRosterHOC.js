import React, {PureComponent} from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    DateTimeFormatterUtils,
    EnterKeyPressUtils,
    MultiSelectOptionUpdateUtils,
    StringUtils,
    TryCatchHandler
} from '@frontend-appointment/helpers'
import {
    DepartmentDutyRosterMiddleware,
    DoctorMiddleware,
    HospitalDepartmentSetupMiddleware,
    HospitalSetupMiddleware,
    RoomSetupMiddleware,
    WeekdaysMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants, CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {CAlert, CButton, CModal} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'
import DepartmentDutyRosterPreviewModal from './common/DepartmentDutyRosterPreviewModal';

const {fetchActiveHospitalsForDropdown, fetchAllHospitalsForDropdown} = HospitalSetupMiddleware;

const {fetchWeekdays, fetchWeekdaysData} = WeekdaysMiddleware;

const {fetchActiveHospitalDepartmentForDropdownByHospitalId, fetchAllHospitalDepartmentForDropdownByHospitalId} = HospitalDepartmentSetupMiddleware;

const {fetchActiveRoomNumberForDropdownByDepartmentId, fetchAllRoomNumberForDropdownByHospitalId} = RoomSetupMiddleware;

const {fetchActiveDoctorsByDepartmentForDropdown} = DoctorMiddleware;

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

const {FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT} = AdminModuleAPIConstants.doctorSetupApiConstants;

const {
    CREATE_DEPARTMENT_DUTY_ROSTER,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
    SEARCH_DEPARTMENT_DUTY_ROSTER,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
    DELETE_DEPARTMENT_DUTY_ROSTER,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE,
    UPDATE_DEPARTMENT_DUTY_ROSTER,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE
} = AdminModuleAPIConstants.departmentDutyRosterApiConstants;

const {
    getDateWithTimeSetToGivenTime,
    addDate,
    isFirstTimeGreaterThanSecond,
    isFirstDateGreaterThanSecondDate,
    getNoOfDaysBetweenGivenDatesInclusive,
    convertDateToStringMonthDateYearFormat,
    checkIfFromDateAndToDateExistsInObjectList,
    isFromDateToDateWithinTheGivenDateRange
} = DateTimeFormatterUtils;

const DATE_ERROR_MESSAGE = 'From date must not be greater than to date!';
const TIME_ERROR_MESSAGE = 'Start time must not be greater than end time!';
const OVERRIDE_DATE_RANGE_ERROR_MESSAGE = "Override 'From date' and 'To Date' must lie within roster From and To date!";

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
                isRoomUpdated: 'N',
                rosterGapDuration: '',
                status: 'Y',
                fromDate: new Date(),
                toDate: addDate(new Date(), 6),
                hasOverrideDutyRoster: 'N',
                isWholeWeekOff: 'N',
                departmentWeekDaysDutyRosterRequestDTOS: [],
                departmentDutyRosterOverrideRequestDTOS: [],
                // FOR UPDATE
                hddRosterId: '',
                rosterRoomId: '',
                weekDaysDataOriginal: [],
                overridesUpdate: [],
                originalOverrides: [],
                updatedOverrides: [],
                isCloneAndAdd: false,
                remarks: '',
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
                overrideErrorMessage: '',
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
                overrideUpdateErrorMessage: '',
                dateErrorMessage: ''
            };

            alertTimer = '';

            actionOnHospitalChange = async (value) => {
                if (value) {
                    await this.fetchActiveDepartmentByHospitalId(value);
                }
                this.resetDepartmentAndRoomOnHospitalChange();
                await this.fetchActiveDoctorsByDepartmentId(0);
            };

            actionsOnDepartmentChange = async departmentId => {
                let deptId = departmentId ? departmentId : 0;
                this.resetDepartmentAndRoomOnHospitalChange(deptId);
                try {
                    await this.fetchActiveDoctorsByDepartmentId(deptId);
                } catch (e) {

                }
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
                let isRoomEnabled = "N", isRoomUpdated = "Y";
                if (value === 'Y') {
                    if (department && department.value) {
                        try {
                            await this.fetchActiveRoomByDepartmentId(department.value);
                            isRoomEnabled = 'Y';
                            isRoomUpdated = 'Y';
                        } catch (e) {
                            isRoomEnabled = "N";
                            isRoomUpdated = 'N';
                            this.showAlertMessage("warning", this.props.RoomNumberDropdownReducer.activeRoomsByDepartmentDropdownErrorMessage)
                        }
                    } else {
                        isRoomEnabled = "N";
                        isRoomUpdated = 'N';
                        this.showAlertMessage("warning", "Select Department first.")
                    }
                }
                await this.setState({
                    isRoomEnabled: isRoomEnabled,
                    isRoomUpdated: isRoomUpdated,
                    room: null
                });
            };

            componentDidMount() {
                this.initialApiCalls()
            }

            componentWillUnmount() {
                clearTimeout(this.alertTimer)
            }

            cancelCloseEditModal = async () => {
                if (this.state.updatedOverrides.length) {
                    await this.revertOverrideUpdatesOnCancel()
                }
                this.setState({
                    showEditModal: false,
                    dateErrorMessage: ''
                })
            };

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
                    formValid = weekDay.dayOffStatus === 'N' ?
                        formValid
                        && weekDay.startTime
                        && weekDay.endTime
                        && weekDay.weekDaysDoctorInfo
                        && weekDay.weekDaysDoctorInfo.length :
                        formValid
                        && weekDay.startTime
                        && weekDay.endTime;
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
                    departmentWeekDaysDutyRosterRequestDTOS,
                    isCloneAndAdd,
                    hospital,
                    department
                } = this.state;

                let formValid = isCloneAndAdd
                    ? rosterGapDuration && hospital && department
                    : rosterGapDuration && remarks && !StringUtils.stringContainsWhiteSpacesOnly(remarks);

                if (hasOverrideDutyRoster === 'Y') {
                    formValid = formValid && overridesUpdate.length
                }

                departmentWeekDaysDutyRosterRequestDTOS.map(weekDay => {
                    formValid = weekDay.dayOffStatus === 'N' ?
                        formValid
                        && weekDay.startTime
                        && weekDay.endTime
                        && weekDay.weekDaysDoctorInfo
                        && weekDay.weekDaysDoctorInfo.length :
                        formValid
                        && weekDay.startTime
                        && weekDay.endTime;
                    return weekDay
                });

                this.setState({
                    formValid: Boolean(formValid)
                });
            };

            checkOverrideFormValidity = () => {
                const {
                    fromDate,
                    toDate,
                    startTime,
                    endTime,
                    dayOffStatus,
                    remarks,
                    dateErrorMessage
                } = this.state.overrideRequestDTO;

                const validForm =
                    fromDate &&
                    toDate &&
                    startTime &&
                    endTime &&
                    dayOffStatus &&
                    !dateErrorMessage &&
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
                let updatedOverride = [...this.state.updatedOverrides];
                try {
                    await this.props.deleteDepartmentDutyRosterOverride(
                        DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE,
                        this.state.deleteRequestDTO
                    );
                    let overrides = [...this.state.overridesUpdate];

                    let deletedOverride = overrides.splice(
                        this.state.deleteRequestDTO.index,
                        1
                    );
                    updatedOverride.push(deletedOverride[0]);
                    this.setState({
                        overridesUpdate: [...overrides],
                        updatedOverrides: [...updatedOverride],
                        showDeleteOverrideModal: false,
                        deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
                    })
                } catch (e) {

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

            editDepartmentDutyRoster = async () => {
                const {
                    hddRosterId,
                    hasOverrideDutyRoster,
                    remarks,
                    rosterGapDuration,
                    status,
                    isRoomEnabled,
                    isRoomUpdated,
                    room,
                    rosterRoomId,
                    departmentWeekDaysDutyRosterRequestDTOS
                } = this.state;

                let updatedWeekDays = departmentWeekDaysDutyRosterRequestDTOS.filter(weekDay => weekDay.isUpdated),
                    updatedWeekDayWithUpdatedDoctorList = updatedWeekDays.map(updatedWeekDay => ({
                        dayOffStatus: updatedWeekDay.dayOffStatus,
                        endTime: updatedWeekDay.endTime,
                        rosterWeekDaysId: updatedWeekDay.rosterWeekDaysId,
                        startTime: updatedWeekDay.startTime,
                        weekDaysId: updatedWeekDay.weekDaysId,
                        weekDaysName: updatedWeekDay.weekDaysName,
                        weekDaysDoctorInfo: [...MultiSelectOptionUpdateUtils.getUpdatedDataListForMultiSelect(
                            updatedWeekDay.originalWeekDaysDoctorInfo,
                            updatedWeekDay.weekDaysDoctorInfo,
                            "hospitalDepartmentDoctorInfo",
                            "hospitalDepartmentWeekDaysDutyRosterDoctorInfoId")]
                    }));


                let updateData = {
                    roomDetail: {
                        hospitalDepartmentRoomInfoId: room && room.value,
                        rosterRoomId: rosterRoomId,
                        status: isRoomEnabled
                    },
                    updateDetail: {
                        hasOverrideDutyRoster: hasOverrideDutyRoster,
                        hddRosterId: hddRosterId,
                        isRoomEnabled,
                        isRoomUpdated,
                        remarks,
                        rosterGapDuration,
                        status
                    },
                    weekDaysDetail: [...updatedWeekDayWithUpdatedDoctorList]
                };
                try {
                    await this.props.updateDepartmentDutyRoster(
                        UPDATE_DEPARTMENT_DUTY_ROSTER,
                        updateData
                    );
                    this.setState({showEditModal: false,});
                    this.showAlertMessage('success', this.props.DepartmentDutyRosterEditReducer.editSuccessMessage);
                    this.resetEditForm();
                    await this.searchDepartmentDutyRoster()
                } catch (e) {
                }
            };

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

            fetchActiveDoctorsByDepartmentId = async departmentId =>
                await this.props.fetchActiveDoctorsByDepartmentForDropdown(FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT, departmentId);

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
                    departmentWeekDaysDutyRosterRequestDTOS: [...JSON.parse(
                        JSON.stringify([...weekDaysData])
                    )]
                })
            };

            fetchDepartmentDutyRosterDetailsById = async id => {
                await this.props.fetchDepartmentDutyRosterDetailById(
                    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID,
                    id
                )
            };

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

                    if (key !== "isRoomEnabled") {
                        await this.setStateValues(key, value, label, fileUri, fieldValid);
                    }
                    switch (key) {
                        case "hospital":
                            await this.actionOnHospitalChange(value);
                            break;
                        case "department":
                            await this.actionsOnDepartmentChange(value);
                            break;
                        case "room":
                            if (type === "MANAGE")
                                this.setState({
                                    isRoomUpdated: 'Y'
                                });
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
                let value = fieldName ? event.target.value : event.target.checked,
                    key = fieldName ? fieldName : event.target.name,
                    values = fieldName ? '' : event.target.values;
                let departmentWeekDaysAvailability, wholeWeekOff;
                departmentWeekDaysAvailability = [
                    ...this.state.departmentWeekDaysDutyRosterRequestDTOS
                ];
                this.setAvailabilityData(
                    fieldName,
                    departmentWeekDaysAvailability,
                    index,
                    values ? values : value,
                    key
                );
                if (type === "ADD")
                    wholeWeekOff = this.checkIfWholeWeekOff(
                        departmentWeekDaysAvailability
                    );

                await this.setState({
                    departmentWeekDaysDutyRosterRequestDTOS: [
                        ...departmentWeekDaysAvailability
                    ],
                    isWholeWeekOff: wholeWeekOff ? 'Y' : 'N'
                });
                type === "ADD" ? this.checkFormValidity() : this.checkManageFormValidity();
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
                            overridesUpdate: [],
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
                    type === "ADD" ? this.checkFormValidity() : this.checkManageFormValidity();

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
                    const {overrideErrorMessage, fromDate, toDate} = this.state;
                    let overrideRequestDTO = {...this.state.overrideRequestDTO};
                    let overrideErrorMsg = overrideErrorMessage;

                    if (key === 'dayOffStatus') {
                        this.setDefaultStartAndEndTimeAndDayOffStatus(
                            event.target.checked,
                            overrideRequestDTO
                        )
                    } else {
                        overrideRequestDTO[key] = value
                    }
                    if (key === 'fromDate' || key === 'toDate') {
                        overrideRequestDTO.dateErrorMessage =
                            isFirstDateGreaterThanSecondDate(overrideRequestDTO.fromDate, overrideRequestDTO.toDate)
                                ? DATE_ERROR_MESSAGE
                                : !isFromDateToDateWithinTheGivenDateRange(
                                overrideRequestDTO.fromDate, overrideRequestDTO.toDate, fromDate, toDate) ?
                                OVERRIDE_DATE_RANGE_ERROR_MESSAGE : '';
                        overrideErrorMsg = "";
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
                        overrideRequestDTO: {...overrideRequestDTO},
                        overrideErrorMessage: overrideErrorMsg
                    });
                    this.checkOverrideFormValidity()
                }
            };

            handleAddOverride = async (isAddAnother, isModifyOverride) => {
                let overrideList =
                    type === 'ADD'
                        ? [...this.state.departmentDutyRosterOverrideRequestDTOS]
                        : [...this.state.overridesUpdate];
                let currentOverride = {...this.state.overrideRequestDTO};

                switch (type) {
                    case 'ADD':
                        if (!checkIfFromDateAndToDateExistsInObjectList(currentOverride.fromDate,
                            currentOverride.toDate, overrideList)) {
                            this.addOrModifyOverride(
                                isModifyOverride,
                                overrideList,
                                currentOverride
                            );
                            await this.resetOverrideRequestDTOAndUpdateStateValues({
                                departmentDutyRosterOverrideRequestDTOS: [...overrideList]
                            }, isAddAnother);
                            this.checkFormValidity();
                        } else {
                            await this.setState({
                                overrideErrorMessage: `Override already exists for
                                 ${convertDateToStringMonthDateYearFormat(currentOverride.fromDate)} -
                                  ${convertDateToStringMonthDateYearFormat(currentOverride.toDate)}.`
                            });
                            this.checkOverrideFormValidity();
                        }
                        break;
                    case 'MANAGE':
                        let updatedOverrides = [
                            ...this.state.updatedOverrides
                        ];
                        const {isRoomEnabled, room} = this.state;
                        try {
                            let dataToSave = {
                                hddRosterId: this.state.hddRosterId,
                                rosterOverrideId: isModifyOverride
                                    ? currentOverride.rosterOverrideId
                                    : '',
                                dayOffStatus: currentOverride.dayOffStatus,
                                hospitalDepartmentRoomInfoId: isRoomEnabled === 'Y' ? room ? room.value : '' : '',
                                endTime: currentOverride.endTime,
                                fromDate: currentOverride.fromDate,
                                toDate: currentOverride.toDate,
                                remarks: currentOverride.remarks,
                                startTime: currentOverride.startTime,
                                status: 'Y'
                            };
                            if (this.state.isCloneAndAdd) {
                                this.addOrModifyOverride(
                                    isModifyOverride,
                                    overrideList,
                                    currentOverride
                                );
                                await this.resetOverrideRequestDTOAndUpdateStateValues({
                                    overridesUpdate: [...overrideList],
                                    updatedOverrides: [...updatedOverrides],
                                }, isAddAnother);
                                this.checkManageFormValidity()
                            } else {
                                try {
                                    await this.updateOverride(dataToSave);
                                    if (isModifyOverride) {
                                        overrideList[currentOverride.id] = currentOverride
                                    } else {
                                        currentOverride.rosterOverrideId =
                                            this.props.DepartmentDutyRosterOverrideUpdateReducer.savedOverrideId;

                                        currentOverride.isNew = true;
                                        overrideList.push(currentOverride)
                                    }
                                    updatedOverrides.push(currentOverride);
                                    await this.resetOverrideRequestDTOAndUpdateStateValues({
                                        overridesUpdate: [...overrideList],
                                        updatedOverrides: [...updatedOverrides],
                                    }, isAddAnother);
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
                                rosterOverrideId: data.rosterOverrideId,
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
                        deleteRequestDTO['id'] = data.rosterOverrideId;
                        deleteRequestDTO['index'] = index;

                        await this.setState({
                            deleteRequestDTO: deleteRequestDTO,
                            showDeleteOverrideModal: true,
                            showAlert: false,
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
                    const departmentDutyRosterInfo = this.prepareDataForPreview();
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
                    const departmentDutyRosterInfo = this.prepareDataForPreview();
                    await this.prepareDataForEdit(departmentDutyRosterInfo, false)
                } catch (e) {
                    this.showAlertMessage('danger', this.props.DepartmentDutyRosterPreviewReducer.previewErrorMessage);

                }
            };

            handleCloneAndAddNew = async data => {
                try {
                    await this.fetchDepartmentDutyRosterDetailsById(data.hddRosterId);
                    const departmentDutyRosterInfo = await this.prepareDataForPreview();
                    this.fetchActiveDepartmentByHospitalId(departmentDutyRosterInfo.hospital && departmentDutyRosterInfo.hospital.value);
                    await this.prepareDataForEdit(departmentDutyRosterInfo, true);
                    this.checkManageFormValidity();
                } catch (e) {
                    this.showAlertMessage('danger', this.props.DepartmentDutyRosterPreviewReducer.previewErrorMessage);
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

            prepareDataForPreview = () => {
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
                    hddRosterId: hddRosterId,
                    hospital: {label: hospitalName, value: hospitalId},
                    department: {label: hospitalDeptName, value: hospitalDeptId},
                    isRoomEnabled,
                    room: isRoomEnabled === 'Y' ? {
                        label: roomInfo.roomNumber,
                        value: roomInfo.hospitalDepartmentRoomInfoId
                    } : null,
                    rosterRoomId: isRoomEnabled === 'Y' ? roomInfo.rosterRoomId : '',
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
                    departmentWeekDaysDutyRosterRequestDTOS,
                    departmentDutyRosterOverrideRequestDTOS,
                    department, isRoomEnabled, room, hddRosterId
                } = departmentDutyRosterInfo;

                let weekDaysAvailabilityData = departmentWeekDaysDutyRosterRequestDTOS.map(
                    weekDay => {
                        weekDay.startTime = new Date(weekDay.startTime);
                        weekDay.endTime = new Date(weekDay.endTime);
                        weekDay.dayOffStatus = weekDay.dayOffStatus
                            ? weekDay.dayOffStatus
                            : 'N';
                        weekDay.isUpdated = false;
                        weekDay.weekDaysDoctorInfo = !isCloneAndAdd && weekDay.weekDaysDoctorInfo ? weekDay.weekDaysDoctorInfo : [];
                        weekDay.originalWeekDaysDoctorInfo = !isCloneAndAdd && weekDay.weekDaysDoctorInfo ? weekDay.weekDaysDoctorInfo : [];
                        return weekDay
                    }
                );

                await this.setState({
                    showEditModal: true,
                    ...departmentDutyRosterInfo,
                    remarks: '',
                    department: isCloneAndAdd ? null : {...department},
                    room: isCloneAndAdd ? null : {...room},
                    hddRosterId: isCloneAndAdd ? null : hddRosterId,
                    isRoomEnabled: isCloneAndAdd ? 'N' : isRoomEnabled,
                    isRoomUpdated: 'N',
                    departmentWeekDaysDutyRosterRequestDTOS: [...weekDaysAvailabilityData],
                    weekDaysDataOriginal: [...weekDaysAvailabilityData],
                    overridesUpdate: [...departmentDutyRosterOverrideRequestDTOS],
                    originalOverrides: [...departmentDutyRosterOverrideRequestDTOS],
                    updatedOverrides: [],
                    isCloneAndAdd: isCloneAndAdd
                });
                if (!isCloneAndAdd)
                    this.fetchActiveDoctorsByDepartmentId(department.value);
                else
                    this.fetchActiveDoctorsByDepartmentId(0);
                this.checkManageFormValidity()
            };

            partialResetAddForm = async onSuccessData => {
                let weekDaysDataWithoutDoctor = this.state.departmentWeekDaysDutyRosterRequestDTOS.map(
                    weekDays => ({...weekDays, weekDaysDoctorInfo: null}));
                await this.setState({
                    department: null,
                    isRoomEnabled: 'N',
                    room: null,
                    rosterGapDuration: '',
                    status: 'Y',
                    departmentWeekDaysDutyRosterRequestDTOS: weekDaysDataWithoutDoctor && [...weekDaysDataWithoutDoctor],
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

            resetOverrideRequestDTOAndUpdateStateValues = async (updateData, isAddAnother) => {
                const {fromDate} = this.state;
                await this.setState({
                    ...updateData,
                    overrideRequestDTO: {
                        ...this.state.overrideRequestDTO,
                        fromDate: fromDate ? fromDate : new Date(),
                        toDate: fromDate ? fromDate : new Date(),
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
            };

            resetAddForm = async onSuccessData => {

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
                    // departmentWeekDaysDutyRosterRequestDTOS: [...weekDays],
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
                await this.fetchWeekdaysData();
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
                });
                await this.searchDepartmentDutyRoster(1)
            };

            resetEditForm = () => {
                this.setState({
                    fromDate: '',
                    toDate: '',
                    hospital: null,
                    specialization: null,
                    department: null,
                    hddRosterId: '',
                    hasOverrideDutyRoster: '',
                    remarks: '',
                    rosterGapDuration: 0,
                    status: '',
                    departmentWeekDaysDutyRosterRequestDTOS: [],
                    overridesUpdate: [],
                    originalOverrides: [],
                    rosterRoomId: '',
                    updateFormValid: true
                })
            };

            resetDepartmentAndRoomOnHospitalChange = (departmentValue) => {
                const {departmentWeekDaysDutyRosterRequestDTOS, department} = this.state;
                let weekDaysDataWithDoctorReset = departmentWeekDaysDutyRosterRequestDTOS.map(
                    weekDays => ({...weekDays, weekDaysDoctorInfo: null}));
                this.setState({
                    isRoomEnabled: 'N',
                    room: null,
                    department: departmentValue ? department : null,
                    departmentWeekDaysDutyRosterRequestDTOS: weekDaysDataWithDoctorReset && [...weekDaysDataWithDoctorReset]
                })
            };

            revertOverrideUpdatesOnCancel = async () => {
                const {
                    updatedOverrides,
                    originalOverrides,
                    hddRosterId,
                    room
                } = this.state;
                let overridesToBeReverted = [];
                let originalUpdatedOverrides = updatedOverrides.filter(
                    override => !override.isNew
                );
                let newOverrides = updatedOverrides.filter(override => override.isNew);

                originalUpdatedOverrides.map(originalUpdated => {
                    // FIND THE ORIGINAL DATA, CHANGE IT'S STATUS TO 'Y' ; ADD isOriginal FLAG THEN ADD TO ARRAY
                    let originalOverride = originalOverrides.find(
                        original =>
                            original.departmentDutyRosterOverrideId ===
                            originalUpdated.departmentDutyRosterOverrideId
                    );
                    if (originalOverride) {
                        let override = {
                            dayOffStatus: originalOverride.dayOffStatus,
                            hddRosterId: hddRosterId,
                            departmentDutyRosterOverrideId:
                            originalOverride.departmentDutyRosterOverrideId,
                            endTime: originalOverride.endTime,
                            // original: true,
                            fromDate: new Date(originalOverride.fromDate),
                            toDate: new Date(originalOverride.toDate),
                            remarks: originalOverride.remarks,
                            startTime: originalOverride.startTime,
                            status: 'Y',
                            hospitalDepartmentRoomInfoId: room ? room.value : '',
                            rosterOverrideId: originalOverride.rosterOverrideId,
                        };
                        overridesToBeReverted.push(override)
                    }
                    return originalUpdated;
                });

                newOverrides.length &&
                newOverrides.map(newAdded => {
                    // FOR NEWLY ADDED DATA, CHANGE STATUS TO 'D' , ADD REMARKS THEN ADD TO ARRAY
                    let override = {
                        dayOffStatus: newAdded.dayOffStatus,
                        hddRosterId: hddRosterId,
                        departmentDutyRosterOverrideId: newAdded.departmentDutyRosterOverrideId,
                        endTime: newAdded.endTime,
                        // original: false,
                        fromDate: newAdded.fromDate,
                        toDate: newAdded.toDate,
                        remarks: 'Update Cancelled.',
                        startTime: newAdded.startTime,
                        status: 'D',
                        hospitalDepartmentRoomInfoId: room ? room.value : '',
                        rosterOverrideId: newAdded.rosterOverrideId,
                    };
                    overridesToBeReverted.push(override);
                    return newOverrides;
                });

                try {
                    await this.props.revertDepartmentDutyRosterOverrideUpdate(
                        REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE,
                        overridesToBeReverted
                    )
                } catch (e) {
                    console.log('Revert Override Error', e.errorMessage)
                }
            };

            setStateValues = (key, value, label, fileUri, fieldValid) => {
                label
                    ? value
                    ? fileUri ? this.setState({[key]: {value, label, fileUri}})
                        : this.setState({[key]: {value, label}})
                    : this.setState({[key]: null})
                    : this.setState({[key]: value, [key + 'Valid']: fieldValid})
            };

            setAvailabilityData(fieldName, departmentWeekDaysAvailability, index, value, key) {
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
                    if (key === "dayOffStatus")
                        this.setDefaultStartAndEndTimeAndDayOffStatus(
                            value,
                            departmentWeekDaysAvailability[index]
                        );
                    else
                        departmentWeekDaysAvailability[index][key] = value;

                }
                if (type === "MANAGE")
                    departmentWeekDaysAvailability[index].isUpdated = true;
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
                } else {
                    departmentWeekDaysAvailability.dayOffStatus = 'N';
                    departmentWeekDaysAvailability.startTime = '';
                    departmentWeekDaysAvailability.endTime = '';
                }
                departmentWeekDaysAvailability.weekDaysDoctorInfo = null;
                departmentWeekDaysAvailability.errorMessage = ''
            };


            setShowAddOverrideModal = async () => {
                let hasOverride;
                const {fromDate} = this.state;
                hasOverride =
                    type === "ADD" ?
                        (this.state.departmentDutyRosterOverrideRequestDTOS.length <= 0
                            ? 'N'
                            : this.state.hasOverrideDutyRoster)
                        :
                        (this.state.overridesUpdate.length <= 0
                            ? 'N'
                            : this.state.hasOverrideDutyRoster);
                await this.setState({
                    showAddOverrideModal: !this.state.showAddOverrideModal,
                    isModifyOverride: false,
                    overrideUpdateErrorMessage: '',
                    overrideErrorMessage: '',
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
                this.checkFormValidity();
            };

            setShowModal = () => {
                this.setState({
                    showConfirmModal: false,
                    showDeleteModal: false,
                    originalOverrides: [],
                    updatedOverrides: []
                })
            };

            setShowDeleteOverrideModal = () => {
                this.setState({
                    showDeleteOverrideModal: !this.state.showDeleteOverrideModal
                })
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

            saveDepartmentDutyRoster = async (isClone, isSaveFromManageClone) => {
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
                    hospital,
                    overridesUpdate
                } = this.state;
                let dataToSave = {
                    fromDate,
                    toDate,
                    hospitalDepartmentId: department ? department.value : '',
                    hospitalId: hospital ? hospital.value : '',
                    isRoomEnabled,
                    hospitalDepartmentRoomInfoId: room ? room.value : '',
                    rosterGapDuration,
                    hasOverrideDutyRoster,
                    status,
                    weekDaysDetail: [],
                    overrideDetail: [],
                };
                if (!isSaveFromManageClone) {
                    let weekDayData = departmentWeekDaysDutyRosterRequestDTOS.map(weekDay => ({
                        ...weekDay,
                        hospitalDepartmentDoctorInfoIds: weekDay.weekDaysDoctorInfo ? weekDay.weekDaysDoctorInfo.map(doctor => doctor.value) : []
                    }));
                    dataToSave.weekDaysDetail = [...weekDayData];
                    dataToSave.overrideDetail = departmentDutyRosterOverrideRequestDTOS;
                } else {
                    let overrideList = overridesUpdate && overridesUpdate.length ? overridesUpdate.map(override => {
                        return {
                            ...override,
                            rosterOverrideId: '',
                            fromDate: new Date(override.fromDate),
                            toDate: new Date(override.toDate)
                        }
                    }) : [];

                    let weekDaysList = departmentWeekDaysDutyRosterRequestDTOS.map(weekdays => {
                        weekdays.rosterWeekDaysId = '';
                        weekdays.hospitalDepartmentDoctorInfoIds = weekdays.weekDaysDoctorInfo.map(doctor => doctor.value);
                        return weekdays;
                    });
                    dataToSave.weekDaysDetail = [...weekDaysList];
                    dataToSave.overrideDetail = [...overrideList];
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
                    const {saveErrorMessage} = this.props.DepartmentDutyRosterSaveReducer;
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
                    return await this.props.updateDepartmentDutyRosterOverride(
                        UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE,
                        overrideData
                    )
                } catch (e) {
                    throw e
                }
            };

            validateAndSetWeekDaysDataOnDateChange = async () => {
                let errorMessage = '',
                    originalWeekDaysData = [...this.state.departmentWeekDaysDutyRosterRequestDTOS],
                    weekDaysData = [],
                    weekDaysWithTime = [];

                const {
                    fromDate,
                    toDate,
                    weekDaysDataOriginal
                } = this.state;

                if (isFirstDateGreaterThanSecondDate(
                    getDateWithTimeSetToGivenTime(fromDate, 0, 0, 0),
                    getDateWithTimeSetToGivenTime(toDate, 0, 0, 0))
                ) {
                    errorMessage = DATE_ERROR_MESSAGE;
                    weekDaysData = [...originalWeekDaysData];
                    weekDaysWithTime = [...originalWeekDaysData]
                } else {
                    weekDaysData = DateTimeFormatterUtils.getDaysInGivenDateRange(
                        fromDate,
                        toDate,
                        [...this.props.WeekdaysReducer.weekdaysDataList]
                    );
                    if (type === "MANAGE") {
                        weekDaysWithTime = weekDaysData.map(weekDayData => {
                            let originalDataWithTime = weekDaysDataOriginal.find(
                                originalData =>
                                    originalData.weekDaysId === weekDayData.weekDaysId
                            );
                            weekDayData.startTime = originalDataWithTime
                                ? originalDataWithTime.startTime
                                : '';
                            weekDayData.endTime = originalDataWithTime
                                ? originalDataWithTime.endTime
                                : '';
                            weekDayData.dayOffStatus = originalDataWithTime
                                ? originalDataWithTime.dayOffStatus
                                : 'N';
                            return weekDayData
                        })
                    }
                }

                await this.setState({
                    dateErrorMessage: errorMessage,
                    departmentWeekDaysDutyRosterRequestDTOS: type === "ADD" ? [...weekDaysData] : [...weekDaysWithTime]
                });
            };

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
                    remarks,
                    departmentWeekDaysDutyRosterRequestDTOS,
                    isWholeWeekOff,
                    status,
                    overridesUpdate,
                    isCloneAndAdd,
                    updatedOverrides,
                    hasOverrideDutyRoster,
                    overrideRequestDTO,
                    departmentDutyRosterOverrideRequestDTOS,
                    showAlert,
                    alertMessageInfo,
                    showAddOverrideModal,
                    isModifyOverride,
                    formValid,
                    showConfirmModal,
                    searchParameters,
                    queryParams,
                    totalRecords,
                    showDeleteModal,
                    deleteRequestDTO,
                    showEditModal,
                    overrideUpdateErrorMessage,
                    showDeleteOverrideModal,
                    dateErrorMessage,
                    overrideFormValid,
                    overrideErrorMessage
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

                const {editErrorMessage, isEditRosterPending} = this.props.DepartmentDutyRosterEditReducer;

                const {departmentDutyRosterList, isSearchRosterLoading, searchErrorMessage} = this.props.DepartmentDutyRosterListReducer;

                const {
                    existingDepartmentDutyRosterList,
                    existingDepartmentDutyRosterWeekdaysDetails,
                    existingDepartmentDutyRosterOverrideDetails,
                    existingRostersDetailErrorMessage
                } = this.props.DepartmentDutyRosterExistingReducer;

                const {overrideDeleteErrorMessage, isDeleteOverrideLoading} = this.props.DepartmentDutyRosterOverrideDeleteReducer;

                const {isUpdateOverrideLoading} = this.props.DepartmentDutyRosterOverrideUpdateReducer;

                const {activeDoctorsByDepartment} = this.props.DoctorDropdownReducer;

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
                                    rosterGapDuration: rosterGapDuration,
                                    activeDoctorsByDepartment: activeDoctorsByDepartment
                                }}
                                departmentAvailabilityOverrideData={{
                                    addOverride: this.handleAddOverride,
                                    departmentDutyRosterOverrideRequestDTOS: type === "ADD" ?
                                        departmentDutyRosterOverrideRequestDTOS : overridesUpdate,
                                    departmentInfoData: departmentInfoData,
                                    handleEnter: this.handleEnter,
                                    handleOverrideDutyRoster: this.handleOverrideDutyRoster,
                                    handleOverrideFormInputChange: this.handleOverrideFormInputChange,
                                    hasOverrideDutyRoster: hasOverrideDutyRoster,
                                    isModifyOverride,
                                    isUpdateOverrideLoading,
                                    onModify: this.handleModifyOverride,
                                    onRemove: this.handleRemoveOverride,
                                    overrideData: {...overrideRequestDTO},
                                    setShowAddOverrideModal: this.setShowAddOverrideModal,
                                    showAddOverrideModal,
                                    overrideFormValid,
                                    overrideErrorMessage,// FOR ADD
                                    overrideUpdateErrorMessage//EDIT MANAGE
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
                                editRosterProps={{
                                    hospitalList: hospitalsForDropdown,
                                    departmentList: activeHospitalDepartmentForDropdown,
                                    roomList: activeRoomNumberForDropdownByDepartment,
                                    isSaveRosterLoading,
                                    isEditRosterPending,
                                    remarksHandler: this.handleDeleteRemarksChange,
                                    remarks: deleteRequestDTO.remarks,
                                    showEditModal,
                                    updateDoctorDutyRosterData: {
                                        ...departmentInfoData,
                                        overridesUpdate,
                                        isCloneAndAdd,
                                        updatedOverrides,
                                        formValid
                                    },
                                    editErrorMessage,
                                    editDepartmentDutyRoster: this.editDepartmentDutyRoster,
                                    onEnterKeyPress: this.handleEnter,
                                    onInputChange: this.handleGeneralInfoFormInputChange,
                                    cancelCloseEditModal: this.cancelCloseEditModal,
                                    deleteOverride: this.deleteOverride,
                                    setShowDeleteOverrideModal: this.setShowDeleteOverrideModal,
                                    showDeleteOverrideModal,
                                    deleteOverrideErrorMessage: overrideDeleteErrorMessage,
                                    isDeleteOverrideLoading,
                                    saveDepartmentDutyRoster: this.saveDepartmentDutyRoster,
                                    dateErrorMessage,
                                }}
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
                                                remarks,
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
                'DepartmentDutyRosterEditReducer',
                'HospitalDropdownReducer',
                'WeekdaysReducer',
                'HospitalDepartmentDropdownReducer',
                'RoomNumberDropdownReducer',
                'DepartmentDutyRosterOverrideUpdateReducer',
                'DepartmentDutyRosterOverrideDeleteReducer',
                'DoctorDropdownReducer'
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
                fetchAllHospitalsForDropdown,
                fetchActiveDoctorsByDepartmentForDropdown
            }
        )
    }
;

export default DepartmentDutyRosterHOC
