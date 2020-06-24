import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  DoctorMiddleware,
  HmacMiddleware,
  HospitalSetupMiddleware,
  PatientDetailsMiddleware,
  SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {
  AdminModuleAPIConstants,
  IntegrationConstants
} from '@frontend-appointment/web-resource-key-constants'
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
  clearAppointmentRefundDetailMessage,
  thirdPartyApiCallRefund
  //downloadExcelForHospitals
} = AppointmentDetailsMiddleware
const {fetchHmacTokenByAppointmentId} = HmacMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
const {
  fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdown} = PatientDetailsMiddleware
const AppointRefundHOC = (ComposedComponent, props, type) => {
  const {
    appointmentSetupApiConstant,
    hospitalSetupApiConstants,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant,
    hmacApiConstants
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
      remarks: '',
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
      refundAppointmentId: '',
      isConfirming: false,
      thirdPartyApiErrorMessage: ''
    }

    setShowAlert = () => {
      this.setState(prevState => ({
        showAlert: !prevState.showAlert
      }))
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

    searchAppointment = async page => {
      const {
        appointmentNumber,
        fromDate,
        toDate,
        hospitalId,
        patientMetaInfoId,
        patientType,
        specializationId,
        doctorId
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        fromDate: appointmentNumber ? '' : fromDate,
        toDate: appointmentNumber ? '' : toDate,
        hospitalId: hospitalId.value || '',
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || ''
      }

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
      )
      await this.setState({
        totalRecords: this.props.AppointmentRefundListReducer.refundList.length
          ? this.props.AppointmentRefundListReducer.totalItems
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
          appointmentId: spec.appointmentId || 'N/A',
          appointmentDate: spec.appointmentDate || 'N/A',
          appointmentTime: spec.appointmentTime || 'N/A',
          appointmentNumber: spec.appointmentNumber || 'N/A',
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
          doctorId: ''
        }
      })
      this.searchAppointment()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    previewApiCall = async appointmentId => {
      await this.props.fetchAppointmentRefundDetailByAppointmentId(
        appointmentSetupApiConstant.APPOINTMENT_REFUND_DETAIL,
        appointmentId
      )
    }

    previewCall = async data => {
      try {
        await this.previewApiCall(data.appointmentId)
        this.setState({
          showModal: true
        })
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.AppointmentRefundDetailReducer
              .refundDetailErrorMessage
          }
        })
      }
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
          if (fieldName === 'hospitalId')
            await this.callApiForHospitalChange(value)
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

    handleInputChange = async (event, field) => {
      if (event) {
        let value = event.target.value
        let key = event.target.name
        this.setState({
          [key]: value
        })
      }
    }

    setShowModal = () => {
      this.setState(prevState => ({
        showModal: false,
        rejectModalShow: false,
        refundConfirmationModal: false
      }))
    }

    refundHandler = data => {
      this.previewApiCall(data.appointmentId)
      this.setState({
        refundConfirmationModal: true,
        refundAppointmentId: data.appointmentId
      })
    }

    refundHandleApi = async () => {
      const {refundDetail} = this.props.AppointmentRefundDetailReducer
      const {remarks} = this.state
      this.setState({
        isConfirming: true
      })
      const {hospitalId, appointmentId, appointmentModeId} = refundDetail
      let requestDTO
      try {
        let hmacCode = await this.props.fetchHmacTokenByAppointmentId(
          hmacApiConstants.FETCH_HMAC_CODE_BY_APPOINTMENT_ID,
          appointmentId
        )
        const {successResponse, apiRequestBody} = await thirdPartyApiCallRefund(
          {...refundDetail, remarks},
          IntegrationConstants.apiIntegrationFeatureTypeCodes
            .APPOINTMENT_REFUND_APPROVAL_CODE,
          IntegrationConstants.apiIntegrationKey
            .ALL_APPOINTMENT_MODE_FEATURE_INTEGRATION,
          true,
          hmacCode
        )
        requestDTO = {
          hospitalId: hospitalId,
          appointmentId: appointmentId,
          appointmentModeId: appointmentModeId,
          status: null,
          remarks: remarks,
          ...apiRequestBody
        }
        if (!successResponse) {
          this.refundAppointment(requestDTO)
        } else if (
          successResponse.status &&
          !successResponse.message &&
          !successResponse.code
        ) {
          requestDTO.status = successResponse.status
          this.refundAppointment(requestDTO)
        } else {
          this.setState({
            thirdPartyApiErrorMessage: successResponse.message,
            isConfirming: false,
            refundConfirmationModal: false,
            showAlert: true,
            alertMessageInfo: {
              variant: 'danger',
              message:
                successResponse.message || 'Could not access third party api.'
            }
          })
        }
      } catch (e) {
        this.setState({
          isConfirming: false,
          showAlert: true,
          refundConfirmationModal: false,
          alertMessageInfo: {
            variant: 'danger',
            message:
              this.props.AppointmentRefundReducer.refundError ||
              e.message ||
              e.errorMessage ||
              'Could not access third party api.'
          }
        })
      }
    }
    
    rejectHandleApi = async () =>{
      const {refundDetail} = this.props.AppointmentRefundDetailReducer
      //const {remarks} = this.state
      this.setState({
        isConfirming: true
      })
      const {hospitalId, appointmentId, appointmentModeId} = refundDetail
      let requestDTO
      try {
        let hmacCode = await this.props.fetchHmacTokenByAppointmentId(
          hmacApiConstants.FETCH_HMAC_CODE_BY_APPOINTMENT_ID,
          appointmentId
        )
        const {successResponse, apiRequestBody} = await thirdPartyApiCallRefund(
          {...refundDetail, remarks},
          IntegrationConstants.apiIntegrationFeatureTypeCodes
            .APPOINTMENT_REFUND_APPROVAL_CODE,
          IntegrationConstants.apiIntegrationKey
            .ALL_APPOINTMENT_MODE_FEATURE_INTEGRATION,
          false,
          hmacCode
        )
        requestDTO = {
          hospitalId: hospitalId,
          appointmentId: appointmentId,
          appointmentModeId: appointmentModeId,
          status: null,
          remarks: this.state.refundRejectRequestDTO.remarks,
          ...apiRequestBody
        }
        if (!successResponse) {
          this.rejectSubmitHandler(requestDTO)
        } else if (
          successResponse.status &&
          !successResponse.message &&
          !successResponse.code
        ) {
          requestDTO.status = successResponse.status
          this.rejectSubmitHandler(requestDTO)
        } else {
          this.setState({
            thirdPartyApiErrorMessage: successResponse.message,
            isConfirming: false,
            refundConfirmationModal: false,
            showAlert: true,
            alertMessageInfo: {
              variant: 'danger',
              message:
                successResponse.message || 'Could not access third party api.'
            }
          })
        }
      } catch (e) {
        this.setState({
          isConfirming: false,
          showAlert: true,
          refundConfirmationModal: false,
          alertMessageInfo: {
            variant: 'danger',
            message:
              this.props.AppointmentRefundReducer.refundError ||
              e.message ||
              e.errorMessage ||
              'Could not access third party api.'
          }
        })
      }
    }
    refundAppointment = async data => {
      try {
        await this.props.appointmentRefund(
          appointmentSetupApiConstant.APPOINTMENT_REFUND_BY_ID,
          data
        )
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.AppointmentRefundReducer.refundSuccess
          }
        })
        this.searchAppointment()
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.AppointmentRefundReducer.refundError
          }
        })
      } finally {
        this.setShowModal()
      }
    }

    rejectSubmitHandler = async (rejectRequestBody) => {
      try {
        await this.props.appointmentRejectRefund(
          appointmentSetupApiConstant.APPOINTMENT_REJECT_REFUND,
          rejectRequestBody
        )
        this.setShowModal()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.AppointmentRefundRejectReducer
              .refundRejectSuccess
          }
        })
        this.searchAppointment();
      } catch (e) {
        console.log(e)
      }
    }

    refundRejectRemarksHandler = event => {
      const {name, value} = event.target
      let refundReject = {...this.state.refundRejectRequestDTO}
      refundReject[name] = value
      this.setState({
        refundRejectRequestDTO: refundReject
      })
    }

    onRejectHandler = async data => {
      this.props.clearAppointmentRefundRejectMessage()
      await this.previewApiCall()
      let refundReject = {...this.state.refundRejectRequestDTO}
      refundReject['appointmentId'] = data.appointmentId
      await this.setState({
        refundRejectRequestDTO: refundReject,
        rejectModalShow: true
      })
    }

    async componentDidMount () {
      await this.searchAppointment()
      await this.searchHospitalForDropDown()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        alertMessageInfo,
        showAlert,
        rejectModalShow,
        refundRejectRequestDTO,
        refundConfirmationModal,
        isConfirming,
        remarks
      } = this.state

      const {
        isRefundListLoading,
        refundList,
        refundErrorMessage,
        totalRefundAmount
      } = this.props.AppointmentRefundListReducer

      const {
        refundRejectError
        // isRefundLoading
      } = this.props.AppointmentRefundRejectReducer
      const {
        activeDoctorsByHospitalForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        activeSpecializationListByHospital,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer

      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      const {
        patientList,
        patientDropdownErrorMessage
      } = this.props.PatientDropdownListReducer

      const {refundDetail} = this.props.AppointmentRefundDetailReducer

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
              isSearchLoading: isRefundListLoading,
              appointmentRefundList: this.appendSNToTable(refundList),
              searchErrorMessage: refundErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: refundDetail,
              rejectSubmitHandler: this.rejectHandleApi,
              refundRejectRemarksHandler: this.refundRejectRemarksHandler,
              onRejectHandler: this.onRejectHandler,
              refundHandler: this.refundHandler,
              refundHandleApi: this.refundHandleApi,
              refundRejectError: refundRejectError,
              isRefundLoading: isConfirming,
              refundConfirmationModal: refundConfirmationModal,
              rejectModalShow: rejectModalShow,
              rejectRemarks: refundRejectRequestDTO.remarks,
              remarks: remarks,
              handleInputChange: this.handleInputChange,
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
      'HospitalDropdownReducer',
      'PatientDropdownListReducer',
      'AppointmentRefundDetailReducer'
    ],
    {
      clearAppointmentRefundPending,
      fetchAppointmentRefundList,
      fetchActiveHospitalsForDropdown,
      fetchActiveDoctorsHospitalWiseForDropdown,
      fetchSpecializationHospitalWiseForDropdown,
      fetchPatientMetaDropdown,
      clearAppointmentRefundRejectMessage,
      clearAppointmentRefundMessage,
      appointmentRefund,
      appointmentRejectRefund,
      fetchAppointmentRefundDetailByAppointmentId,
      clearAppointmentRefundDetailMessage,
      thirdPartyApiCallRefund,
      fetchHmacTokenByAppointmentId
    }
  )
}
export default AppointRefundHOC
