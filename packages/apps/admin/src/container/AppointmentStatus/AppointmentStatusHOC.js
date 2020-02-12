import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers';
import './appointment-status.scss';
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';

const {fetchAppointmentStatusList} = AppointmentDetailsMiddleware;
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware;
const {fetchSpecializationHospitalWiseForDropdown} = SpecializationSetupMiddleware;

const {
    appointmentSetupApiConstant,
    hospitalSetupApiConstants,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
} = AdminModuleAPIConstants;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = hospitalSetupApiConstants;
const {FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN} = doctorSetupApiConstants;
const {SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL} = specializationSetupAPIConstants;
const {APPOINTMENT_STATUS_LIST} = appointmentSetupApiConstant;

const {isFirstDateGreaterThanSecondDate, getDateWithTimeSetToGivenTime, getNoOfDaysBetweenGivenDatesInclusive} = DateTimeFormatterUtils;

const SELECT_HOSPITAL_MESSAGE = "Select Hospital then search to view Appointment Status Details";
const SELECT_DOCTOR_MESSAGE = "Select Doctor then search to view Appointment Status Details";
const SELECT_HOSPITAL_AND_DOCTOR_MESSAGE = "Select Hospital and Doctor then search to view Appointment Status Details";

const AppointmentStatusHOC = (ComposedComponent, props, type) => {
    class AppointmentStatusHOC extends React.PureComponent {
        state = {
            searchParameters: {
                fromDate: new Date(),
                toDate: new Date(),
                hospitalId: '',
                doctorId: '',
                specializationId: '',
                status: ''
            },
            showModal: false,
            appointmentStatusDetails: [],
            errorMessageForStatusDetails: SELECT_HOSPITAL_MESSAGE,
            showTimeSlotsOfStatus: '',
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            }
        };

        fetchHospitalForDropDown = async () => {
            try {
                await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN)
            } catch (e) {
                console.log(e)
            }
        };

        fetchDoctorsByHospital = async hospitalId => {
            await this.props.fetchActiveDoctorsHospitalWiseForDropdown(FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
                hospitalId);
        };

        fetchSpecializationByHospital = async hospitalId => {
            await this.props.fetchSpecializationHospitalWiseForDropdown(SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
                hospitalId);
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
            this.searchAppointmentStatus();
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
                errorMessageForStatus: SELECT_HOSPITAL_MESSAGE,
            });
            // this.searchAppointmentStatus()
        };

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label;
                if (field) {
                    fieldName = field;
                    value = event;
                } else {
                    fieldName = event.target.name;
                    value = event.target.value;
                    label = event.target.label;
                    if (fieldName === 'hospitalId') this.callApiForHospitalChange(value)
                }
                let searchParams = {...this.state.searchParameters};
                searchParams[fieldName] = label ? (value ? {value, label} : '') : value;
                await this.setStateValuesForSearch(searchParams);

                if (['fromDate', 'toDate'].indexOf(fieldName) >= 0) {
                    if (isFirstDateGreaterThanSecondDate(
                        getDateWithTimeSetToGivenTime(this.state.searchParameters.fromDate, 0, 0, 0),
                        getDateWithTimeSetToGivenTime(this.state.searchParameters.toDate, 0, 0, 0))) {
                        this.setState({
                            showAlert: true,
                            alertMessageInfo: {
                                variant: "danger",
                                message: "From date cannot be greater than To date!"
                            }
                        });
                        this.clearAlertTimeout();
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
            }));
        };

        clearAlertTimeout = () => {
            setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            })
        };

        callApiForHospitalChange = hospitalId => {
            this.fetchDoctorsByHospital(hospitalId);
            this.fetchSpecializationByHospital(hospitalId);
        };

        initialApiCalls = async () => {
            await this.fetchHospitalForDropDown();
        };

        searchAppointmentStatus = async () => {
            const {
                fromDate,
                toDate,
                hospitalId,
                doctorId,
                specializationId,
                status
            } = this.state.searchParameters;

            if (this.isSearchParametersValid()) {
                let searchData = {
                    fromDate,
                    toDate,
                    hospitalId: hospitalId.value || '',
                    specializationId: specializationId.value || '',
                    doctorId: doctorId.value || '',
                    status: status.value || ''
                };

                await this.props.fetchAppointmentStatusList(APPOINTMENT_STATUS_LIST, searchData);
                await this.setState({
                    appointmentStatusDetails: [...this.props.AppointmentStatusListReducer.statusList]
                })
            }

        };

        filterAppointmentDetailsByStatus = (status) => {
            this.setState({
                showTimeSlotsOfStatus: status
            })
        };

        isSearchParametersValid = () => {
            const {
                fromDate,
                toDate,
                hospitalId,
                doctorId
            } = this.state.searchParameters;

            let errorMessageForStatus = '';

            if (fromDate && toDate && getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) === 1) {
                errorMessageForStatus = hospitalId ? '' : SELECT_HOSPITAL_MESSAGE;
            } else if (fromDate && toDate && getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) <= 7) {
                errorMessageForStatus = hospitalId ? (doctorId ? '' : SELECT_DOCTOR_MESSAGE)
                    : SELECT_HOSPITAL_AND_DOCTOR_MESSAGE
            } else if (fromDate && toDate && getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) > 7) {
                errorMessageForStatus = "From date and to date should include 7 days or less."
            }

            this.setState({
                errorMessageForStatusDetails: errorMessageForStatus
            });

            return errorMessageForStatus ? false : true;
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.clearAlertTimeout);
        }

        render() {
            const {
                searchParameters, appointmentStatusDetails, errorMessageForStatusDetails, showAlert, alertMessageInfo
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {activeDoctorsByHospitalForDropdown, doctorDropdownErrorMessage} = this.props.DoctorDropdownReducer;

            const {activeSpecializationListByHospital, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;

            const {statusErrorMessage, statusList, isStatusListLoading} = this.props.AppointmentStatusListReducer;

            return (
                <>
                    <ComposedComponent
                        {...this.props}
                        {...props}
                        searchHandler={{
                            handleSearchFormChange: this.handleSearchFormChange,
                            resetSearchForm: this.handleSearchFormReset,
                            searchAppointmentStatus: this.searchAppointmentStatus,
                            hospitalList: hospitalsForDropdown,
                            doctorList: activeDoctorsByHospitalForDropdown,
                            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                            specializationList: activeSpecializationListByHospital,
                            specializationDropdownErrorMessage: dropdownErrorMessage,
                            searchParameters: searchParameters
                        }}
                        statusDetailsData={{
                            appointmentStatusDetails,
                            errorMessageForStatusDetails,
                            searchErrorMessage: statusErrorMessage,
                            isStatusListLoading,
                            searchAppointmentStatus: this.searchAppointmentStatus,
                            filterAppointmentDetailsByStatus: this.filterAppointmentDetailsByStatus
                        }}
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
            fetchActiveDoctorsHospitalWiseForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchAppointmentStatusList
        }
    )
};

export default AppointmentStatusHOC;
