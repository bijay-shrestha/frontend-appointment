import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers'
import './appointment-approval.scss'
import {CAlert} from '@frontend-appointment/ui-elements'

const {
    clearAppointmentRefundPending,
    fetchAppointmentApprovalList,
    appointmentApprove,
    appointmentReject,
    clearAppointmentApproveMessage,
    clearAppointmentRejectMessage
    //downloadExcelForHospitals
} = AppointmentDetailsMiddleware;
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware;
const {
    fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware;
const {fetchPatientMetaDropdown} = PatientDetailsMiddleware;
const AppointApprovalHOC = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
        hospitalSetupApiConstants,
        doctorSetupApiConstants,
        specializationSetupAPIConstants,
        patientSetupApiConstant
    } = AdminModuleAPIConstants;

    class AppointmentApprovalDetails extends React.PureComponent {
        state = {
            searchParameters: {
                appointmentNumber: '',
                fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                toDate: new Date(),
                hospitalId: '',
                patientMetaInfoId: '',
                doctorId: '',
                patientType: '',
                specializationId: '',
                patientCategory: ''
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showModal: false,
            previewData: {},
            rejectRequestDTO: {
                appointmentId: '',
                remarks: ''
            },
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            rejectModalShow: false,
            showAlert: false,
            approveConfirmationModal: false,
            approveAppointmentId: '',
            appointmentDetails: '',
            isConfirming: false
        };

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        searchHospitalForDropDown = async () => {
            try {
                await this.props.fetchActiveHospitalsForDropdown(
                    hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
                )
            } catch (e) {
                console.log(e)
            }
        };

        previewCall = data => {
            this.setState({
                previewData: data,
                showModal: true
            })
        };

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: false,
                rejectModalShow: false,
                approveConfirmationModal: false
            }))
        };

        searchAppointment = async page => {
            const {
                appointmentNumber,
                fromDate,
                toDate,
                hospitalId,
                patientMetaInfoId,
                patientType,
                specializationId,
                doctorId,
                patientCategory
            } = this.state.searchParameters;
            let searchData = {
                appointmentNumber,
                fromDate,
                toDate,
                hospitalId: hospitalId.value || '',
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || '',
                patientCategory: patientCategory.value || ''
            };

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page
            await this.props.fetchAppointmentApprovalList(
                appointmentSetupApiConstant.APPOINTMENT_APPROVAL_LIST,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            )
            await this.setState({
                totalRecords: this.props.AppointmentApprovalListReducer.approvalList
                    .length
                    ? this.props.AppointmentApprovalListReducer.totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        }

        appendSNToTable = refundList => {
            let newRefundList = [];

            newRefundList =
                refundList.length &&
                refundList.map((spec, index) => ({
                    ...spec,
                    patientMobileNumber:spec.mobileNumber,
                    sN: index + 1,
                    registrationNumber:spec.registrationNumber||'N/A'
                }));
            return newRefundList
        }

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            this.searchAppointment()
        }

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    appointmentNumber: '',
                    fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                    toDate: new Date(),
                    hospitalId: '',
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: '',
                    patientCategory: '',
                    appointmentDetails: '',
                }
            })
            this.searchAppointment()
        }

        handleHospitalChangeReset = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: '',
                    patientCategory: ''
                }
            })
        }

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        }

        callApiForHospitalChange = async hospitalId => {
            await this.handleHospitalChangeReset()

            this.props.fetchActiveDoctorsHospitalWiseForDropdown(
                doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
                hospitalId
            )
            this.props.fetchSpecializationHospitalWiseForDropdown(
                specializationSetupAPIConstants.SPECIALIZATION_BY_HOSPITAL,
                hospitalId
            )
            this.props.fetchPatientMetaDropdown(
                patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS,
                hospitalId
            )
        }

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label
                if (field) {
                    fieldName = field
                    value = event
                } else {
                    fieldName = event.target.name
                    value = event.target.value
                    label = event.target.label
                    if (fieldName === 'hospitalId') this.callApiForHospitalChange(value)
                }
                let searchParams = {...this.state.searchParameters}
                if (fieldName === 'hospitalId')
                    await this.handleHospitalChangeReset(searchParams)

                let newSearchParams = {...this.state.searchParameters}

                newSearchParams[fieldName] = label
                    ? value
                        ? {value, label}
                        : ''
                    : value
                await this.setStateValuesForSearch(newSearchParams)
            }
        }

        approveHandler = data => {
            this.props.clearAppointmentApproveMessage();
            this.setState({
                approveConfirmationModal: true,
                approveAppointmentId: data.appointmentId,
                appointmentDetails: {...data}
            })
        };

        approveHandleApi = async () => {
            this.setState({
                isConfirming: true
            });

            try {
                await this.props.appointmentApprove(
                    appointmentSetupApiConstant.APPOINTMENT_APPROVE,
                    this.state.approveAppointmentId
                );
                this.setState({
                    isConfirming: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentApproveReducer.approveSuccessMessage
                    }
                })

            } catch (e) {
                this.setState({
                    isConfirming: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.AppointmentApproveReducer.approveErrorMessage
                    }
                })
            } finally {
                await this.searchAppointment();
                this.setShowModal()
            }
        };

        setShowAlert = () => {
            this.setState(prevState => ({
                showAlert: !prevState.showAlert
            }))
        }

        rejectSubmitHandler = async () => {
            try {
                await this.props.appointmentReject(
                    appointmentSetupApiConstant.APPOINTMENT_REJECT,
                    this.state.rejectRequestDTO
                )
                this.setShowModal()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentRejectReducer
                            .appointmentRejectSuccessMessage
                    }
                })
                this.searchAppointment()
            } catch (e) {
                console.log(e)
            }
        }

        rejectRemarksHandler = event => {
            const {name, value} = event.target
            let rejectData = {...this.state.rejectRequestDTO}
            rejectData[name] = value
            this.setState({
                rejectRequestDTO: rejectData
            })
        }

        onRejectHandler = async data => {
            this.props.clearAppointmentRejectMessage()
            let rejectData = {...this.state.rejectRequestDTO}
            rejectData['appointmentId'] = data.appointmentId
            await this.setState({
                rejectRequestDTO: rejectData,
                rejectModalShow: true
            })
        }

        async componentDidMount() {
            await this.searchAppointment()
            await this.searchHospitalForDropDown()
        }

        render() {
            const {
                searchParameters,
                queryParams,
                totalRecords,
                showModal,
                previewData,
                rejectRequestDTO,
                rejectModalShow,
                approveAppointmentId,
                approveConfirmationModal,
                alertMessageInfo,
                showAlert,
                appointmentDetails,
                isConfirming
            } = this.state;

            const {
                approvalList,
                isApprovalListLoading,
                approvalErrorMessage
            } = this.props.AppointmentApprovalListReducer

            const {
                activeDoctorsByHospitalForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer

            const {
                isAppointmentRejectLoading,
                appointmentRejectErrorMessage
            } = this.props.AppointmentRejectReducer

            const {
                activeSpecializationListByHospital,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
            const {
                patientList,
                patientDropdownErrorMessage
            } = this.props.PatientDropdownListReducer
            return (
                <div id="appointment-approval">
                    <ComposedComponent
                        {...this.props}
                        {...props}
                        searchHandler={{
                            handleEnter: this.handleEnterPress,
                            handleSearchFormChange: this.handleSearchFormChange,
                            resetSearch: this.handleSearchFormReset,
                            searchAppointment: this.searchAppointment,
                            hospitalsDropdown: hospitalsForDropdown,
                            doctorsDropdown: activeDoctorsByHospitalForDropdown,
                            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                            activeSpecializationList: activeSpecializationListByHospital,
                            specializationDropdownErrorMessage: dropdownErrorMessage,
                            searchParameters: searchParameters,
                            patientListDropdown: patientList,
                            patientDropdownErrorMessage: patientDropdownErrorMessage
                        }}
                        paginationProps={{
                            queryParams: queryParams,
                            totalRecords: totalRecords,
                            handlePageChange: this.handlePageChange
                        }}
                        tableHandler={{
                            isSearchLoading: isApprovalListLoading,
                            appointmentApprovalList: this.appendSNToTable(approvalList),
                            searchErrorMessage: approvalErrorMessage,
                            setShowModal: this.setShowModal,
                            showModal: showModal,
                            previewCall: this.previewCall,
                            previewData: previewData,
                            rejectSubmitHandler: this.rejectSubmitHandler,
                            rejectRemarksHandler: this.rejectRemarksHandler,
                            onRejectHandler: this.onRejectHandler,
                            approveHandler: this.approveHandler,
                            approveHandleApi: this.approveHandleApi,
                            rejectError: appointmentRejectErrorMessage,
                            isAppointmentRejectLoading: isAppointmentRejectLoading,
                            approveConfirmationModal: approveConfirmationModal,
                            rejectModalShow: rejectModalShow,
                            remarks: rejectRequestDTO.remarks,
                            appointmentDetails: appointmentDetails,
                            isConfirming: isConfirming
                        }}
                    />
                    <CAlert
                        id="profile-add"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={this.setShowAlert}
                        alertType={
                            alertMessageInfo.variant === 'success' ? (
                                <>
                                    <i className="fa fa-check-circle" aria-hidden="true">
                                        {' '}
                                    </i>
                                </>
                            ) : (
                                <>
                                    <i className="fa fa-exclamation-triangle" aria-hidden="true">
                                        {' '}
                                    </i>
                                </>
                            )
                        }
                        message={alertMessageInfo.message}
                    />
                </div>
            )
        }
    }

    return ConnectHoc(
        AppointmentApprovalDetails,
        [
            'AppointmentApprovalListReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'HospitalDropdownReducer',
            'PatientDropdownListReducer',
            'AppointmentApproveReducer',
            'AppointmentRejectReducer'
        ],
        {
            clearAppointmentRefundPending,
            fetchActiveHospitalsForDropdown,
            fetchActiveDoctorsHospitalWiseForDropdown,
            fetchSpecializationHospitalWiseForDropdown,
            fetchPatientMetaDropdown,
            fetchAppointmentApprovalList,
            appointmentApprove,
            appointmentReject,
            clearAppointmentApproveMessage,
            clearAppointmentRejectMessage
        }
    )
};
export default AppointApprovalHOC
