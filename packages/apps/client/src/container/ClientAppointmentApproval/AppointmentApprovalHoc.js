import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    SpecializationSetupMiddleware,
    PatientDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    EnterKeyPressUtils,
} from '@frontend-appointment/helpers'
import './appointment-approval.scss'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'
import {CAlert} from "@frontend-appointment/ui-elements";

const {
    clearAppointmentRefundPending,
    fetchAppointmentApprovalList,
    appointmentApprove,
    appointmentReject,
    clearAppointmentApproveMessage,
    clearAppointmentRejectMessage,
    fetchAppointmentApprovalDetailByAppointmentId
    //downloadExcelForHospitals
} = AppointmentDetailsMiddleware;

const {fetchActiveDoctorsForDropdown} = DoctorMiddleware;
const {
    fetchSpecializationForDropdown
} = SpecializationSetupMiddleware;
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware;
const AppointApprovalHOC = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
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
            // previewData: {},
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

        previewApiCall = async data => {
            await this.props.fetchAppointmentApprovalDetailByAppointmentId(
                appointmentSetupApiConstant.APPOINTMENT_APPROVAL_DETAIL, data.appointmentId)
        };

        previewCall = async data => {
            try {
                await this.previewApiCall(data);
                this.setState({
                    showModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.AppointmentDetailReducer.appointmentDetailErrorMessage
                    }
                })
            }

        };

        setShowModal = () => {
            this.setState({
                showModal: false,
                approveConfirmationModal: false
            })
        };

        searchAppointment = async page => {
            const {
                appointmentNumber,
                fromDate,
                toDate,
                patientMetaInfoId,
                patientType,
                specializationId,
                doctorId,
                patientCategory
            } = this.state.searchParameters;
            let searchData = {
                appointmentNumber,
                fromDate: appointmentNumber ? '' : fromDate, // WHEN SEARCHED WITH APPOINTMENT NUMBER IGNORE DATE
                toDate: appointmentNumber ? '' : toDate,
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
                    : this.state.queryParams.page;
            await this.props.fetchAppointmentApprovalList(
                appointmentSetupApiConstant.APPOINTMENT_APPROVAL_LIST,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            );
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
        };

        appendSNToTable = refundList => {
            let newRefundList = [];

            newRefundList =
                refundList.length &&
                refundList.map((spec, index) => ({
                    ...spec,
                    patientMobileNumber: spec.mobileNumber,
                    sN: index + 1,
                    registrationNumber: spec.registrationNumber || 'N/A'
                }));
            return newRefundList
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            this.searchAppointment()
        };

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    appointmentNumber: '',
                    fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                    toDate: new Date(),
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: '',
                    patientCategory: '',
                    appointmentDetails: '',
                }
            });
            this.searchAppointment()
        };

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
        };

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        };

        callApiForHospitalChange = async () => {

            this.props.fetchActiveDoctorsForDropdown(
                doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
            );

            this.props.fetchSpecializationForDropdown(
                specializationSetupAPIConstants.ACTIVE_DROPDOWN_SPECIALIZATION
            );

            this.props.fetchPatientMetaDropdownForClient(
                patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS
            )
        };

        handleSearchFormChange = async (event, field) => {
            if (event) {
                let fieldName, value, label, fileUri;
                if (field) {
                    fieldName = field;
                    value = event
                } else {
                    fieldName = event.target.name;
                    value = event.target.value;
                    label = event.target.label;
                    fileUri = event.target.fileUri
                }

                let newSearchParams = {...this.state.searchParameters};

                newSearchParams[fieldName] = label
                    ? value
                        ? fileUri ? {value, label, fileUri}
                            : {value, label}
                        : ''
                    : value;
                await this.setStateValuesForSearch(newSearchParams)
            }
        };

        approveHandler = async data => {
            await this.previewApiCall(data);
            this.props.clearAppointmentApproveMessage();
            this.setState({
                approveConfirmationModal: true,
                approveAppointmentId: data.appointmentId,
                appointmentDetails: {...this.props.AppointmentDetailReducer.appointmentDetail}
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
            await this.searchAppointment();
            await this.callApiForHospitalChange();
        }

        render() {
            const {
                searchParameters,
                queryParams,
                totalRecords,
                showModal,
                rejectRequestDTO,
                rejectModalShow,
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
            } = this.props.AppointmentApprovalListReducer;

            const {
                activeDoctorsForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer;

            const {
                isAppointmentRejectLoading,
                appointmentRejectErrorMessage
            } = this.props.AppointmentRejectReducer;

            const {
                allActiveSpecializationList,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer;

            const {
                patientList,
                patientDropdownErrorMessage
            } = this.props.PatientDropdownListReducer;

            const {appointmentDetail} = this.props.AppointmentDetailReducer;

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
                            doctorsDropdown: activeDoctorsForDropdown,
                            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                            activeSpecializationList: allActiveSpecializationList,
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
                            previewData: appointmentDetail,
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
            'PatientDropdownListReducer',
            'AppointmentApproveReducer',
            'AppointmentRejectReducer',
            'AppointmentDetailReducer'
        ],
        {
            clearAppointmentRefundPending,
            fetchActiveDoctorsForDropdown,
            fetchSpecializationForDropdown,
            fetchPatientMetaDropdownForClient,
            fetchAppointmentApprovalList,
            appointmentApprove,
            appointmentReject,
            clearAppointmentApproveMessage,
            clearAppointmentRejectMessage,
            fetchAppointmentApprovalDetailByAppointmentId
        }
    )
};
export default AppointApprovalHOC
