import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers'
import './appointment-status.scss'
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'

const {
    fetchAppointmentStatusList,
    clearAppointmentStatusMessage
} = AppointmentDetailsMiddleware;
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDoctorsForDropdown} = DoctorMiddleware;
const {
    fetchSpecializationForDropdown
} = SpecializationSetupMiddleware;

const {
    appointmentSetupApiConstant,
    doctorSetupApiConstants,
    specializationSetupAPIConstants
} = AdminModuleAPIConstants;

const {
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
} = doctorSetupApiConstants;
const {
    ACTIVE_DROPDOWN_SPECIALIZATION
} = specializationSetupAPIConstants;
const {APPOINTMENT_STATUS_LIST} = appointmentSetupApiConstant;

const {
    isFirstDateGreaterThanSecondDate,
    getDateWithTimeSetToGivenTime,
    getNoOfDaysBetweenGivenDatesInclusive
} = DateTimeFormatterUtils;

const SELECT_HOSPITAL_MESSAGE = 'Select Hospital.';
const SELECT_DOCTOR_MESSAGE = 'Select Doctor.';
// const SELECT_HOSPITAL_AND_DOCTOR_MESSAGE = 'Select Hospital and Doctor.';
const DATE_RANGE_ERROR_MESSAGE =
    'From date and to date must be within 7 days or less.';

const AppointmentStatusHOC = (ComposedComponent, props, type) => {
    class AppointmentStatusHOC extends React.PureComponent {
        state = {
            searchParameters: {
                fromDate: new Date(),
                toDate: new Date(),
                doctorId: '',
                specializationId: '',
                status: ''
            },
            showModal: false,
            appointmentStatusDetails: [],
            appointmentStatusDetailsCopy: [],
            errorMessageForStatusDetails: SELECT_DOCTOR_MESSAGE,
            showAlert: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            activeStatus: 'ALL'
        };

        fetchDoctorsByHospital = async () => {
            await this.props.fetchActiveDoctorsForDropdown(
                FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
            )
        };

        fetchSpecializationByHospital = async () => {
            await this.props.fetchSpecializationForDropdown(
                ACTIVE_DROPDOWN_SPECIALIZATION
            )
        };

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            this.searchAppointmentStatus()
        };

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    hospitalId: '',
                    doctorId: '',
                    specializationId: '',
                    status: ''
                },
                statusDetails: [],
                errorMessageForStatusDetails: SELECT_HOSPITAL_MESSAGE,
                appointmentStatusDetails: [],
                appointmentStatusDetailsCopy: []
            });
            this.props.clearAppointmentStatusMessage()
        };

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label;
                if (field) {
                    fieldName = field;
                    value = event
                } else {
                    fieldName = event.target.name;
                    value = event.target.value;
                    label = event.target.label;
                }
                let searchParams = {...this.state.searchParameters};
                searchParams[fieldName] = label ? (value ? {value, label} : '') : value;
                await this.setStateValuesForSearch(searchParams);

                let errorMsg = '';
                if (['fromDate', 'toDate'].indexOf(fieldName) >= 0) {
                    if (
                        isFirstDateGreaterThanSecondDate(
                            getDateWithTimeSetToGivenTime(searchParams.fromDate, 0, 0, 0),
                            getDateWithTimeSetToGivenTime(searchParams.toDate, 0, 0, 0)
                        )
                    ) {
                        errorMsg = 'From date cannot be greater than To date!';
                        this.showWarningAlert(errorMsg);
                        this.clearAlertTimeout()
                    } else if (
                        getNoOfDaysBetweenGivenDatesInclusive(
                            searchParams.fromDate,
                            searchParams.toDate
                        ) > 7
                    ) {
                        errorMsg = DATE_RANGE_ERROR_MESSAGE;
                        this.showWarningAlert(errorMsg);
                        this.clearAlertTimeout()
                    }
                }
            }
        };

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        };

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: !prevState.showModal
            }))
        };

        showWarningAlert = message => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'warning',
                    message: message
                }
            })
        };

        clearAlertTimeout = () => {
            setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            })
        };

        callApiForHospitalChange = () => {
            this.fetchDoctorsByHospital();
            this.fetchSpecializationByHospital();
        };

        initialApiCalls = async () => {
            await this.fetchDoctorsByHospital();
            await this.searchAppointmentStatus();
        };

        searchAppointmentStatus = async () => {
            const {
                fromDate,
                toDate,
                doctorId,
                specializationId,
                status
            } = this.state.searchParameters;

            if (this.isSearchParametersValid()) {
                let searchData = {
                    fromDate,
                    toDate,
                    specializationId: specializationId.value || '',
                    doctorId: doctorId.value || '',
                    status: (status.value === 'ALL' ? '' : status.value) || ''
                };

                await this.props.fetchAppointmentStatusList(
                    APPOINTMENT_STATUS_LIST,
                    searchData
                );
                let statusList = [];
                if (this.props.AppointmentStatusListReducer.statusList)
                    if (
                        this.props.AppointmentStatusListReducer.statusList.doctorDutyRosterInfo.length
                    )
                        statusList = [
                            ...this.props.AppointmentStatusListReducer.statusList
                                .doctorDutyRosterInfo
                        ];
                await this.setState({
                    appointmentStatusDetails: [...statusList],
                    appointmentStatusDetailsCopy: [...statusList]
                })
            }
        };

        filterAppointmentDetailsByStatus = async (status, event) => {
            event.preventDefault();
            let appointmentStatus = [...this.state.appointmentStatusDetailsCopy],
                filteredStatus;

            if (status !== 'ALL') {
                filteredStatus = appointmentStatus.map(appointment => {
                    let appointmentCopy = {...appointment};
                    if (appointment.doctorTimeSlots) {
                        let filteredTimeSlots = appointment.doctorTimeSlots.filter(
                            time => time.status === status
                        );
                        appointmentCopy.doctorTimeSlots = [...filteredTimeSlots]
                    }
                    return appointmentCopy
                })
            } else {
                filteredStatus = [...this.state.appointmentStatusDetailsCopy]
            }

            await this.setState({
                appointmentStatusDetails: [...filteredStatus],
                activeStatus: status
            })
        };

        isSearchParametersValid = () => {
            const {
                fromDate,
                toDate,
                doctorId
            } = this.state.searchParameters;

            let errorMessageForStatus = '',
                appointmentStatusDetails = [...this.state.appointmentStatusDetails];

            if (
                fromDate &&
                toDate &&
                getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) === 1
            ) {
                // errorMessageForStatus = hospitalId ? '' : SELECT_HOSPITAL_MESSAGE
            } else if (
                fromDate &&
                toDate &&
                getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) <= 7
            ) {
                errorMessageForStatus = doctorId
                    ? ''
                    : SELECT_DOCTOR_MESSAGE
            } else if (
                fromDate &&
                toDate &&
                getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) > 7
            ) {
                errorMessageForStatus = DATE_RANGE_ERROR_MESSAGE
            }

            this.setState({
                errorMessageForStatusDetails: errorMessageForStatus,
                appointmentStatusDetails: errorMessageForStatus
                    ? []
                    : appointmentStatusDetails
            });

            return errorMessageForStatus ? false : true
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        componentWillUnmount() {
            clearTimeout(this.clearAlertTimeout)
        }

        render() {
            const {
                searchParameters,
                appointmentStatusDetails,
                errorMessageForStatusDetails,
                showAlert,
                alertMessageInfo,
                activeStatus
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {
                activeDoctorsForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer;

            const {
                allActiveSpecializationList,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer;

            const {
                statusErrorMessage,
                statusList,
                isStatusListLoading
            } = this.props.AppointmentStatusListReducer;

            return (
                <>
                    <div id="appointment-status">
                        <ComposedComponent
                            {...this.props}
                            {...props}
                            searchHandler={{
                                handleSearchFormChange: this.handleSearchFormChange,
                                resetSearchForm: this.handleSearchFormReset,
                                searchAppointmentStatus: this.searchAppointmentStatus,
                                doctorList: activeDoctorsForDropdown,
                                doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                                specializationList: allActiveSpecializationList,
                                specializationDropdownErrorMessage: dropdownErrorMessage,
                                searchParameters: searchParameters
                            }}
                            statusDetailsData={{
                                appointmentStatusDetails,
                                errorMessageForStatusDetails,
                                searchErrorMessage: statusErrorMessage,
                                isStatusListLoading,
                                searchAppointmentStatus: this.searchAppointmentStatus,
                                activeStatus: activeStatus,
                                filterAppointmentDetailsByStatus: this
                                    .filterAppointmentDetailsByStatus
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
                    </div>
                </>
            )
        }
    }

    return ConnectHoc(
        AppointmentStatusHOC,
        [
            'AppointmentStatusListReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchActiveDoctorsForDropdown,
            fetchSpecializationForDropdown,
            fetchAppointmentStatusList,
            clearAppointmentStatusMessage
        }
    )
};

export default AppointmentStatusHOC
