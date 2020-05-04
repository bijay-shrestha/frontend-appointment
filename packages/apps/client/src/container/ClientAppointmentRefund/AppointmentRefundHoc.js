import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    DateTimeFormatterUtils,
    EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import './appointment-refund.scss'
import {CAlert} from '@frontend-appointment/ui-elements'

const {
    clearAppointmentRefundPending,
    fetchAppointmentRefundList,
    clearAppointmentRefundRejectMessage,
    clearAppointmentRefundMessage,
    appointmentRefund,
    appointmentRejectRefund,
    fetchAppointmentRefundDetailByAppointmentId,
    clearAppointmentRefundDetailMessage
} = AppointmentDetailsMiddleware;

const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {
    fetchSpecializationForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware
const AppointRefundHOC = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
        hospitalSetupApiConstants,
        doctorSetupApiConstants,
        specializationSetupAPIConstants,
        patientSetupApiConstant
    } = AdminModuleAPIConstants

    class AppointmentRefundDetails extends React.PureComponent {
        state = {
            searchParameters: {
                appointmentNumber: '',
                fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
                toDate: new Date(),
                hospitalId: '',
                patientMetaInfoId: '',
                doctorId: '',
                patientType: '',
                specializationId: ''
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showModal: false,
            previewData: {},
            refundRejectRequestDTO: {
                appointmentId: '',
                remarks: ''
            },
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            rejectModalShow: false,
            showAlert: false,
            refundConfirmationModal: false,
            refundAppointmentId: ''
        }

        setShowAlert = () => {
            this.setState(prevState => ({
                showAlert: !prevState.showAlert
            }))
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

        searchAppointment = async page => {
            const {
                appointmentNumber,
                fromDate,
                toDate,
                patientMetaInfoId,
                patientType,
                specializationId,
                doctorId
            } = this.state.searchParameters;
            let searchData = {
                appointmentNumber,
                fromDate: appointmentNumber ? '' : fromDate,
                toDate: appointmentNumber ? '' : toDate,
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || ''
            };

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page
            await this.props.fetchAppointmentRefundList(
                appointmentSetupApiConstant.APPOINTMENT_REFUND_LIST,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            );
            await this.setState({
                totalRecords: this.props.AppointmentRefundListReducer.refundList.length
                    ? this.props.AppointmentRefundListReducer.totalItems
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
                    appointmentId: spec.appointmentId || 'N/A',
                    appointmentDate: spec.appointmentDate || 'N/A',
                    appointmentTime: spec.appointmentTime || 'N/A',
                    appointmentNumber: spec.appointmentNumber || 'N/A',
                    // hospitalName: spec.hospitalName || 'N/A',
                    patientName: spec.patientName || 'N/A',
                    registrationNumber: spec.registrationNumber || 'N/A',
                    age: spec.age.slice(0, 4) || 'N/A',
                    gender: spec.gender ? spec.gender.split('')[0] : '',
                    doctorName: spec.doctorName || 'N/A',
                    specializationName: spec.specializationName || 'N/A',
                    transactionNumber: spec.transactionNumber || 'N/A',
                    cancelledDate: spec.cancelledDate || 'N/A',
                    refundAmount: spec.refundAmount || 'N/A',
                    esewaId: spec.esewaId || 'N/A',
                    // remarks: spec.remarks || 'N/A',
                    appointmentMode: spec.appointmentMode,
                    mobileNumber: spec.mobileNumber,
                    sN: index + 1
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
                    // hospitalId: '',
                    patientMetaInfoId: '',
                    patientType: '',
                    specializationId: '',
                    doctorId: ''
                }
            })
            this.searchAppointment()
        };

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        };

        previewApiCalll = async appointmentId => {
            await this.props.fetchAppointmentRefundDetailByAppointmentId(
                appointmentSetupApiConstant.APPOINTMENT_REFUND_DETAIL, appointmentId)
        };

        previewCall = async data => {
            try {
                await this.previewApiCalll(data.appointmentId);
                this.setState({
                    showModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: this.props.AppointmentRefundDetailReducer.refundDetailErrorMessage
                    },
                })
            }
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
        }

        callApiForHospitalChange = async () => {
            // await this.handleHospitalChangeReset()
            this.props.fetchActiveDoctorsForDropdown(
                doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
            );
            this.props.fetchSpecializationForDropdown(
                specializationSetupAPIConstants.ACTIVE_DROPDOWN_SPECIALIZATION
            );
            this.props.fetchPatientMetaDropdownForClient(
                patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS)
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
                    fileUri = event.target.fileUri;
                }

                let newSearchParams = {...this.state.searchParameters};

                newSearchParams[fieldName] = label
                    ? value
                        ? fileUri ? {value, label, fileUri} : {value, label}
                        : ''
                    : value;
                await this.setStateValuesForSearch(newSearchParams)
            }
        };

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: false,
                rejectModalShow: false,
                refundConfirmationModal: false
            }))
        };

        refundHandler = data => {
            this.setState({
                refundConfirmationModal: true,
                refundAppointmentId: data.appointmentId
            })
        };

        refundHandleApi = async () => {
            try {
                await this.props.appointmentRefund(
                    appointmentSetupApiConstant.APPOINTMENT_REFUND_BY_ID,
                    this.state.refundAppointmentId
                );
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentRefundReducer.refundSuccess
                    }
                });
                this.searchAppointment()
            } catch (e) {
                let message = this.props.AppointmentRefundReducer.refundError;
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: message
                    }
                })
            } finally {
                this.setShowModal()
            }
        };

        rejectSubmitHandler = async () => {
            try {
                await this.props.appointmentRejectRefund(
                    appointmentSetupApiConstant.APPOINTMENT_REJECT_REFUND,
                    this.state.refundRejectRequestDTO
                );
                this.setShowModal();
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentRefundRejectReducer
                            .refundRejectSuccess
                    }
                });
                this.searchAppointment()
            } catch (e) {
                console.log(e)
            }
        };

        refundRejectRemarksHandler = event => {
            const {name, value} = event.target;
            let refundReject = {...this.state.refundRejectRequestDTO};
            refundReject[name] = value;
            this.setState({
                refundRejectRequestDTO: refundReject
            })
        };

        onRejectHandler = async data => {
            this.props.clearAppointmentRefundRejectMessage();
            let refundReject = {...this.state.refundRejectRequestDTO};
            refundReject['appointmentId'] = data.appointmentId;
            await this.setState({
                refundRejectRequestDTO: refundReject,
                rejectModalShow: true
            })
        };

        async componentDidMount() {
            this.callApiForHospitalChange();
            await this.searchAppointment();
            await this.searchHospitalForDropDown()
        }

        render() {
            const {
                searchParameters,
                queryParams,
                totalRecords,
                showModal,
                previewData,
                alertMessageInfo,
                showAlert,
                rejectModalShow,
                refundRejectRequestDTO,
                refundConfirmationModal
            } = this.state;

            const {
                isRefundListLoading,
                refundList,
                refundErrorMessage,
                totalRefundAmount
            } = this.props.AppointmentRefundListReducer;

            const {
                refundRejectError,
                isRefundLoading
            } = this.props.AppointmentRefundRejectReducer;
            const {
                activeDoctorsForDropdown,
                doctorDropdownErrorMessage
            } = this.props.DoctorDropdownReducer;

            const {
                allActiveSpecializationList,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer;

            const {
                patientList,
                patientDropdownErrorMessage
            } = this.props.PatientDropdownListReducer;

            const {refundDetail, isRefundDetailFetchLoading} = this.props.AppointmentRefundDetailReducer;

            return (
                <>
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
                            isSearchLoading: isRefundListLoading,
                            appointmentRefundList: this.appendSNToTable(refundList),
                            searchErrorMessage: refundErrorMessage,
                            setShowModal: this.setShowModal,
                            showModal: showModal,
                            previewCall: this.previewCall,
                            previewData: refundDetail,
                            rejectSubmitHandler: this.rejectSubmitHandler,
                            refundRejectRemarksHandler: this.refundRejectRemarksHandler,
                            onRejectHandler: this.onRejectHandler,
                            refundHandler: this.refundHandler,
                            refundHandleApi: this.refundHandleApi,
                            refundRejectError: refundRejectError,
                            isRefundLoading: isRefundLoading,
                            refundConfirmationModal: refundConfirmationModal,
                            rejectModalShow: rejectModalShow,
                            remarks: refundRejectRequestDTO.remarks,
                            totalRefundAmount
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
                </>
            )
        }
    }

    return ConnectHoc(
        AppointmentRefundDetails,
        [
            'AppointmentRefundRejectReducer',
            'AppointmentRefundReducer',
            'AppointmentRefundListReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'PatientDropdownListReducer',
            'AppointmentRefundDetailReducer'
        ],
        {
            clearAppointmentRefundPending,
            fetchAppointmentRefundList,
            fetchActiveDoctorsForDropdown,
            fetchSpecializationForDropdown,
            clearAppointmentRefundRejectMessage,
            clearAppointmentRefundMessage,
            fetchPatientMetaDropdownForClient,
            appointmentRefund,
            appointmentRejectRefund,
            fetchAppointmentRefundDetailByAppointmentId,
            clearAppointmentRefundDetailMessage
        }
    )
};
export default AppointRefundHOC
