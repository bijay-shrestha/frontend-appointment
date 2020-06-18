import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    AppointmentDetailsMiddleware,
    DoctorMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    SpecializationSetupMiddleware,
    AppointmentTransferMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants, IntegrationConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    DateTimeFormatterUtils,
    EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import './appointment-approval.scss'
import {CAlert} from '@frontend-appointment/ui-elements'
import AppointmentTransferContent from './TransferContent'
import {CConfirmationModal} from '@frontend-appointment/ui-components'

const {
    clearAppointmentRefundPending,
    fetchAppointmentApprovalList,
    appointmentApprove,
    appointmentReject,
    clearAppointmentApproveMessage,
    clearAppointmentRejectMessage,
    fetchAppointmentApprovalDetailByAppointmentId,
    thirdPartyApiCallCheckIn
    //downloadExcelForHospitals
} = AppointmentDetailsMiddleware

const {
    appointmentTransfer,
    fetchAppointmentTransferCharge,
    fetchAppointmentTransferDate,
    fetchAppointmentTransferTime,
} = AppointmentTransferMiddleware

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown, fetchDoctorsBySpecializationIdForDropdown} = DoctorMiddleware
const {
    fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdown} = PatientDetailsMiddleware
const AppointApprovalHOC = (ComposedComponent, props, type) => {
    const {
        appointmentSetupApiConstant,
        hospitalSetupApiConstants,
        doctorSetupApiConstants,
        specializationSetupAPIConstants,
        patientSetupApiConstant,
        appointmentTransferApiConstants
    } = AdminModuleAPIConstants

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
            isConfirming: false,
            appointmentTransferData: {
                transferData: {},
                transferDate: [],
                transferTime: [],
                transferCharge: 0
            },
            transferConfirmationModal: false,
            transferValid: false
        }

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        searchHospitalForDropDown = async () => {
            try {
                await this.props.fetchActiveHospitalsForDropdown(
                    hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
                )
            } catch (e) {
                console.log(e)
            }
        }

        previewApiCall = async data => {
            await this.props.fetchAppointmentApprovalDetailByAppointmentId(
                appointmentSetupApiConstant.APPOINTMENT_APPROVAL_DETAIL,
                data.appointmentId
            )
        }

        previewCall = async data => {
            try {
                await this.previewApiCall(data)
                this.setState({
                    showModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.AppointmentDetailReducer
                            .appointmentDetailErrorMessage
                    }
                })
            }
        }

        setShowModal = () => {
            this.setState(prevState => ({
                showModal: false,
                rejectModalShow: false,
                approveConfirmationModal: false,
                transferConfirmationModal: false
            }))
        }

        checkValidityOfTransfer = () => {
            const {transferData} = this.state.appointmentTransferData
            const {
                transferredDate,
                transferredTime,
                transferredSpecialization,
                transferredDoctor,
                remarks
            } = transferData
            const transferValid =
                transferredDate.value &&
                transferredTime.value &&
                transferredSpecialization.value &&
                transferredDoctor.value &&
                remarks
            this.setState({
                transferValid: Boolean(transferValid)
            })
        }

        resetTransferData = () => {
            this.setState({
                appointmentTransferData: {
                    transferData: {},
                    transferDate: [],
                    transferTime: [],
                    transferCharge: 0
                },
                transferConfirmationModal: false,
                transferValid: false
            })
        }
        callApiAfterSpecializationAndDoctorChange = async appointmentDetail => {
            console.log("==========tappdetail", appointmentDetail);
            await this.props.fetchAppointmentTransferCharge(
                appointmentTransferApiConstants.APPOINTMENT_TRANSFER_CHARGE,
                {
                    hospitalId: appointmentDetail.hospitalId,
                    doctorId: appointmentDetail.transferredDoctor.value,
                    specializationId: appointmentDetail.transferredSpecialization.value,
                    followUp: appointmentDetail.followUp
                }
            )

            await this.props.fetchAppointmentTransferDate(
                appointmentTransferApiConstants.APPOINTMENT_TRANSFER_DATE,
                {
                    hospitalId: appointmentDetail.hospitalId,
                    doctorId: appointmentDetail.transferredDoctor.value,
                    specializationId: appointmentDetail.transferredSpecialization.value,
                    followUp: appointmentDetail.followUp
                }
            )
        }

        onDoctorOrDateChangeHandler = async (appointmentDetail, transferedDate) => {
            await this.props.fetchAppointmentTransferTime(
                appointmentTransferApiConstants.APPOINTMENT_TRANSFER_TIME,
                {
                    hospitalId: appointmentDetail.hospitalId,
                    doctorId: appointmentDetail.transferredDoctor.value,
                    specializationId: appointmentDetail.transferredSpecialization.value,
                    date: transferedDate.value
                        ? new Date(transferedDate.value)
                        : new Date()
                }
            )
        }

        callApiAfterSpecializationChange = async specializationId => {
            await this.props.fetchDoctorsBySpecializationIdForDropdown(
                doctorSetupApiConstants.FETCH_DOCTOR_BY_SPECIALIZATION_ID,
                specializationId
            )
        }

        transferHandler = async data => {
            await this.previewApiCall(data)
            const {appointmentDetail} = this.props.AppointmentDetailReducer
            await this.props.clearAppointmentApproveMessage()

            await this.callApiAfterSpecializationChange(
                appointmentDetail.specializationId
            )
            let appointmentDetailData = {
                ...appointmentDetail,
                transferredDoctor: {
                    value: appointmentDetail.doctorId,
                    label: appointmentDetail.doctorName
                },
                transferredSpecialization: {
                    value: appointmentDetail.specializationId,
                    label: appointmentDetail.specializationName
                },

            }
            await this.callApiAfterSpecializationAndDoctorChange(
                appointmentDetailData
            )
            await this.onDoctorOrDateChangeHandler(appointmentDetailData, {
                value: appointmentDetail.date,
                label: appointmentDetail.date
            })
            const {
                appointmentTransferCharge
            } = this.props.appointmentTransferChargeReducer
            const {
                appointmentTransferTime,
                appointmentTransferTimeError,
                isAppointmentTransferTimeLoading
            } = this.props.appointmentTransferTimeReducer
            // console.log("========",this.props.appointmentTransferTimeReducer)

            const {
                appointmentTransferDate,
                appointmentTransferDateError,
                isAppointmentTransferDateLoading
            } = this.props.appointmentTransferDateReducer
            this.setState({
                appointmentTransferData: {
                    transferData: {
                        ...this.props.AppointmentDetailReducer.appointmentDetail,
                        transferredDoctor: {
                            value: appointmentDetail.doctorId,
                            label: appointmentDetail.doctorName,
                            fileUri: appointmentDetail.fileUri
                        },
                        transferredSpecialization: {
                            value: appointmentDetail.specializationId,
                            label: appointmentDetail.specializationName
                        },
                        transferredDate: '',
                        transferredTime: '',
                        transferredCharge: appointmentTransferCharge,
                        remarks: ''
                    },
                    transferDate: {
                        appointmentTransferDate,
                        appointmentTransferDateError,
                        isAppointmentTransferDateLoading
                    },
                    transferTime: {
                        appointmentTransferTime,
                        appointmentTransferTimeError,
                        isAppointmentTransferTimeLoading
                    },
                    transferCharge: appointmentTransferCharge
                },
                transferConfirmationModal: true
            })
        }

        transferApiCall = async () => {
            const {transferData} = this.state.appointmentTransferData
            const {
                transferredDoctor,
                transferredSpecialization,
                followUp,
                transferredTime,
                transferredDate,
                appointmentId,
                transferredCharge,
                hospitalId,
                remarks
            } = transferData
            try {
                await this.props.appointmentTransfer(
                    appointmentTransferApiConstants.APPOINTMENT_TRANSFER,
                    {
                        appointmentCharge: transferredCharge,
                        appointmentDate: new Date(transferredDate.value),
                        appointmentId: appointmentId,
                        appointmentTime: transferredTime.value,
                        hospitalId: hospitalId,
                        doctorId: transferredDoctor.value,
                        isFollowUp: followUp,
                        remarks: remarks,
                        specializationId: transferredSpecialization.value
                    }
                )
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.appointmentTransferReducer
                            .appointmentTransferSucessMessage
                    }
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.appointmentTransferReducer
                            .appointmentTransferErrorMessage
                    }
                })
            } finally {
                this.resetTransferData()
                await this.searchAppointment()
                this.setShowModal()
            }
        }
        handleTransferChange = async e => {
            const {value, label, name, fileUri} = e.target

            let transferAppointment = {
                ...this.state.appointmentTransferData
            }
            transferAppointment['transferData'][name] = label
                ? value
                    ? fileUri
                        ? {value, label, fileUri}
                        : {value, label, fileUri: ''}
                    : ''
                : value
                    ? value
                    : ''

            console.log("=========", transferAppointment)

            // if (name === 'transferredSpecialization')
            //   await this.callApiAfterSpecializationChange(transf)
            if (
                name === 'transferredSpecialization' ||
                name === 'transferredDoctor' ||
                name === 'transferredDate'
            ) {
                await this.onDoctorOrDateChangeHandler(
                    transferAppointment.transferData,
                    transferAppointment.transferData.transferredDate
                )
                const {
                    appointmentTransferTime,
                    appointmentTransferTimeError,
                    isAppointmentTransferTimeLoading
                } = this.props.appointmentTransferTimeReducer
                transferAppointment.transferTime = {
                    appointmentTransferTime,
                    appointmentTransferTimeError,
                    isAppointmentTransferTimeLoading
                }
                transferAppointment['transferData']['transferredTime'] = ''
                // this.setState({
                //   appointmentTransferData: {...transferAppointment}
                // })
            }
            if (
                name === 'transferredSpecialization' ||
                name === 'transferredDoctor'
            ) {
                if (value) {
                    transferAppointment['transferData']['transferredDate'] = ''
                    transferAppointment['transferData']['transferredTime'] = ''

                    await this.callApiAfterSpecializationAndDoctorChange(
                        transferAppointment.transferData
                    )
                    const {
                        appointmentTransferCharge
                    } = this.props.appointmentTransferChargeReducer
                    const {
                        appointmentTransferDate,
                        appointmentTransferDateError,
                        isAppointmentTransferDateLoading
                    } = this.props.appointmentTransferDateReducer
                    transferAppointment.transferDate = {
                        appointmentTransferDate,
                        appointmentTransferDateError,
                        isAppointmentTransferDateLoading
                    }
                    transferAppointment.transferCharge = {
                        appointmentTransferCharge
                    }

                    transferAppointment['transferData'][
                        'transferredCharge'
                        ] = appointmentTransferCharge

                }
            }
            await this.setState({
                appointmentTransferData: {...transferAppointment}
            })

            this.checkValidityOfTransfer()
        }

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
            } = this.state.searchParameters
            let searchData = {
                appointmentNumber,
                fromDate: appointmentNumber ? '' : fromDate, // WHEN SEARCHED WITH APPOINTMENT NUMBER IGNORE DATE
                toDate: appointmentNumber ? '' : toDate,
                hospitalId: hospitalId.value || '',
                patientMetaInfoId: patientMetaInfoId.value || '',
                patientType: patientType.value || '',
                specializationId: specializationId.value || '',
                doctorId: doctorId.value || '',
                patientCategory: patientCategory.value || ''
            }

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
            let newRefundList = []

            newRefundList =
                refundList.length &&
                refundList.map((spec, index) => ({
                    ...spec,
                    patientMobileNumber: spec.mobileNumber,
                    sN: index + 1,
                    registrationNumber: spec.registrationNumber || 'N/A'
                }))
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
                    appointmentDetails: ''
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
                let fieldName, value, label, fileUri
                if (field) {
                    fieldName = field
                    value = event
                } else {
                    fieldName = event.target.name
                    value = event.target.value
                    label = event.target.label
                    fileUri = event.target.fileUri
                    if (fieldName === 'hospitalId') this.callApiForHospitalChange(value)
                }
                let searchParams = {...this.state.searchParameters}
                if (fieldName === 'hospitalId')
                    await this.handleHospitalChangeReset(searchParams)

                let newSearchParams = {...this.state.searchParameters}

                newSearchParams[fieldName] = label
                    ? value
                        ? fileUri
                            ? {value, label, fileUri}
                            : {value, label}
                        : ''
                    : value
                await this.setStateValuesForSearch(newSearchParams)
            }
        }

        approveHandler = async data => {
            await this.previewApiCall(data)
            this.props.clearAppointmentApproveMessage()
            this.setState({
                approveConfirmationModal: true,
                approveAppointmentId: data.appointmentId,
                appointmentDetails: {
                    ...this.props.AppointmentDetailReducer.appointmentDetail
                }
            })
        }


        approveHandleApi = async () => {
            this.setState({
                isConfirming: true
            })
            const {hospitalId, hospitalNumber, appointmentId} = this.state.appointmentDetails;
            // sabu
            let requestDTO;
            try {
                const {successResponse, apiRequestBody} = await thirdPartyApiCallCheckIn(
                    this.state.appointmentDetails,
                    IntegrationConstants.apiIntegrationFeatureTypeCodes.APPOINTMENT_CHECK_IN_CODE,
                    IntegrationConstants.apiIntegrationKey.ALL_CLIENT_FEATURE_INTEGRATION,
                    this.state.appointmentDetails.hospitalId
                );
                requestDTO = {
                    hospitalId: hospitalId,
                    appointmentId: appointmentId,
                    hospitalNumber: '',
                    patientStatus: !hospitalNumber,
                    ...apiRequestBody
                }
                if (!successResponse) {
                    requestDTO.hospitalNumber = null
                    this.approveApiCall(requestDTO)
                } else if (successResponse.responseData && !successResponse.responseMessage) {
                    requestDTO.hospitalNumber = successResponse.responseData
                    this.approveApiCall(requestDTO)
                } else {
                    this.setState({
                        thirdPartyApiErrorMessage: successResponse.responseMessage,
                        // THE ALERT TO BE REMOVED AFTER FIXING HOW TO SHOW THIRD PARTY ERROR
                        showAlert: true,
                        alertMessageInfo: {
                            variant: 'danger',
                            message: successResponse.responseMessage
                                || "Could not access third party api."
                        }
                    })
                }
            } catch (e) {
                this.setState({
                    isConfirming: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message:
                            this.props.AppointmentApproveReducer.approveErrorMessage ||
                            e.message || e.errorMessage || "Could not access third party api."
                    }
                })
            }
            // finally {
            //     await this.searchAppointment()
            //     this.setShowModal()
            // }
        }

        approveApiCall = async (requestDTO) => {
            try {
                await this.props.appointmentApprove(
                    appointmentSetupApiConstant.APPOINTMENT_APPROVE,
                    requestDTO
                )
                this.setState({
                    isConfirming: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AppointmentApproveReducer
                            .approveSuccessMessage
                    }
                })
            } catch (e) {
                this.setState({
                    isConfirming: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message:
                            this.props.AppointmentApproveReducer.approveErrorMessage ||
                            e.message
                    }
                })
            } finally {
                await this.searchAppointment()
                this.setShowModal()
            }
        }

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
                rejectRequestDTO,
                rejectModalShow,
                // approveAppointmentId,
                approveConfirmationModal,
                alertMessageInfo,
                showAlert,
                appointmentDetails,
                isConfirming,
                transferValid,
                transferConfirmationModal,
                appointmentTransferData
            } = this.state

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
                doctorsBySpecializationForDropdown
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

            const {appointmentDetail} = this.props.AppointmentDetailReducer
            const {
                isAppointmentTransferLoading
            } = this.props.appointmentTransferReducer

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
                            isConfirming: isConfirming,
                            transferHandler: this.transferHandler
                        }}
                    />
                    {transferConfirmationModal ? (
                        <CConfirmationModal
                            modalHeader="Confirm Transfer?"
                            modalBody={
                                <AppointmentTransferContent
                                    {...appointmentTransferData}
                                    doctorList={doctorsBySpecializationForDropdown}
                                    specializationList={activeSpecializationListByHospital}
                                    //transferValid={transferValid}
                                    onChangeHandler={this.handleTransferChange}
                                />
                            }
                            onConfirm={this.transferApiCall}
                            onCancel={this.setShowModal}
                            isConfirming={isAppointmentTransferLoading}
                            isDisabled={!transferValid}
                            setShowModal={this.setShowModal}
                            showModal={transferConfirmationModal}
                        />
                    ) : (
                        ''
                    )}
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
            'AppointmentRejectReducer',
            'AppointmentDetailReducer',
            'appointmentTransferReducer',
            'appointmentTransferDateReducer',
            'appointmentTransferTimeReducer',
            'appointmentTransferChargeReducer'
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
            clearAppointmentRejectMessage,
            fetchAppointmentApprovalDetailByAppointmentId,
            appointmentTransfer,
            fetchAppointmentTransferCharge,
            fetchAppointmentTransferDate,
            fetchAppointmentTransferTime,
            fetchDoctorsBySpecializationIdForDropdown,
            thirdPartyApiCallCheckIn,
        }
    )
}
export default AppointApprovalHOC
