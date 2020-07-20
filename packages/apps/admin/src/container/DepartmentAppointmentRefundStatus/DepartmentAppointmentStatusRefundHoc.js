import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  HospitalDepartmentSetupMiddleware,
  HmacMiddleware,
  HospitalSetupMiddleware,
  PatientDetailsMiddleware,
  RoomSetupMiddleware,
  AppointmentModeMiddleware
} from '@frontend-appointment/thunk-middleware'
import {
  AdminModuleAPIConstants,
  IntegrationConstants
} from '@frontend-appointment/web-resource-key-constants'
import {
  DateTimeFormatterUtils,
  EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import './appointment-refund-status.scss'
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
const {
  fetchActiveHospitalDepartmentForDropdownByHospitalId
} = HospitalDepartmentSetupMiddleware
const {fetchActiveRoomNumberForDropdownByDepartmentId} = RoomSetupMiddleware
const {fetchActiveAppointmentModeForDropdown} = AppointmentModeMiddleware
const {fetchPatientMetaDropdown} = PatientDetailsMiddleware

const AppointRefundHOC = (ComposedComponent, props, type) => {
  const {
    appointmentSetupApiConstant,
    hospitalSetupApiConstants,
    // doctorSetupApiConstants,
    // specializationSetupAPIConstants,
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
        hospitalDepartmentId: '',
        patientType: '',
        roomId: '',
        appointmentModeId: '',
        esewaId: ''
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

    searchAppointmentModeForDropdown = async () => {
      this.props.fetchActiveAppointmentModeForDropdown(
        AdminModuleAPIConstants.appointmentModeApiConstants
          .FETCH_APPOINTMENT_MODE_FOR_DROPDOWN
      )
    }

    fetchDepartmentByHospitalId = async hospitalId => {
      await this.props.fetchActiveHospitalDepartmentForDropdownByHospitalId(
        AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants
          .FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
        hospitalId
      )
    }

    fetchRoomByDepartmentId = async departmentId => {
      await this.props.fetchActiveRoomNumberForDropdownByDepartmentId(
        AdminModuleAPIConstants.roomSetupApiConstants
          .FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN,
        departmentId
      )
    }

    searchAppointment = async page => {
      const {
        appointmentNumber,
        fromDate,
        toDate,
        hospitalId,
        patientMetaInfoId,
        patientType,
        hospitalDepartmentId,
        roomId,
        appointmentModeId,
        esewaId
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        fromDate: appointmentNumber ? '' : fromDate,
        toDate: appointmentNumber ? '' : toDate,
        hospitalId: hospitalId.value || '',
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        appointmentModeId: appointmentModeId.value || '',
        esewaId,
        hospitalDepartmentId: hospitalDepartmentId.value || '',
        roomId: roomId.value || ''
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchAppointmentRefundList(
        appointmentSetupApiConstant.SEARCH_APPOINTMENT_REFUND_STATUS,
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
          mobileNumber: spec.mobileNumber
          // sN: index + 1
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
          roomId: '',
          hospitalDepartmentId: '',
          appointmentModeId: '',
          esewaId: ''
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
        appointmentSetupApiConstant.DETAIL_APPOINTMENT_REFUND_STATUS,
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
          hospitalDepartmentId: '',
          roomId: '',
          patientCategory: ''
        }
      })
    }

    handleDepartmentChangeReset = async () => {
      await this.setState({
        searchParameters: {
          ...this.state.searchParameters,
          roomId: ''
        }
      })
    }

    callApiForHospitalChange = async hospitalId => {
      await this.handleHospitalChangeReset()
      this.props.fetchPatientMetaDropdown(
        patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS,
        hospitalId
      )
      this.fetchDepartmentByHospitalId(hospitalId)
    }

    callApiForDepartmentChange = async hospitalDepartmentId => {
      this.fetchRoomByDepartmentId(hospitalDepartmentId)
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
          if (fieldName === 'hospitalDepartmentId')
            await this.callApiForDepartmentChange(value)
        }
        let searchParams = {...this.state.searchParameters}
        if (fieldName === 'hospitalId')
          await this.handleHospitalChangeReset(searchParams)
        if (fieldName === 'hospitalDepartmentId')
          await this.handleDepartmentChangeReset(searchParams)
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

    refundHandler = async data => {
      try{
        await this.previewApiCall(data.appointmentId)
        await this.setState({
          refundConfirmationModal: true,
          refundAppointmentId: data.appointmentId
        })
        this.refundHandleApi()
        }catch(e){
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

    refundHandleApi = async () => {
      const {refundDetail} = this.props.AppointmentRefundDetailReducer
      // const {remarks} = this.state
      this.setState({
        isConfirming: true
      })
      // const {hospitalId, appointmentId, appointmentModeId} = refundDetail
      let requestDTO
      try {
        // let hmacCode = await this.props.fetchHmacTokenByAppointmentId(
        //   hmacApiConstants.FETCH_HMAC_CODE_BY_APPOINTMENT_ID,
        //   appointmentId
        // )
        const {successResponse, apiRequestBody} = await thirdPartyApiCallRefund(
          {...refundDetail},
          IntegrationConstants.apiIntegrationFeatureTypeCodes
            .APPOINTMENT_REFUND_STATUS_CODE,
          IntegrationConstants.apiIntegrationKey
            .ALL_APPOINTMENT_MODE_FEATURE_INTEGRATION,
          true,
          hmacApiConstants.FETCH_HMAC_CODE_BY_APPOINTMENT_ID
        )
        requestDTO = {
          ...apiRequestBody,
          ...refundDetail
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
            },
            remarks: ''
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
              'Could not access third party api.',
            remarks: ''
          }
        })
      }
    }

    rejectHandleApi = async () => {
      const {refundDetail} = this.props.AppointmentRefundDetailReducer
      const {remarks} = this.state
      this.setState({
        isConfirming: true
      })
      const {hospitalId, appointmentId, appointmentModeId} = refundDetail
      let requestDTO
      try {
        // let hmacCode = await this.props.fetchHmacTokenByAppointmentId(
        //   hmacApiConstants.FETCH_HMAC_CODE_BY_APPOINTMENT_ID,
        //   appointmentId
        // )

        const {successResponse, apiRequestBody} = await thirdPartyApiCallRefund(
          {...refundDetail, remarks},
          IntegrationConstants.apiIntegrationFeatureTypeCodes
            .APPOINTMENT_REFUND_APPROVAL_CODE,
          IntegrationConstants.apiIntegrationKey
            .ALL_APPOINTMENT_MODE_FEATURE_INTEGRATION,
          false,
          //hmacCode,
          hmacApiConstants.FETCH_HMAC_CODE_BY_APPOINTMENT_ID
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
          // await this.setState({
          //   rejectModalShow: true
          // })
          this.rejectSubmitHandler(requestDTO)
        } else if (
          successResponse.status &&
          !successResponse.message &&
          !successResponse.code
        ) {
          // await this.setState({
          //   rejectModalShow: true
          // })
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
      const {
        appointmentId,
        appointmentMode,
        remarks,
        integrationChannelCode,
        featureCode,
        appointmentModeId,
        esewaMerchantCode,
        esewaId,
        transactionNumber,
        status,
        hospitalId
      } = data

      const requestData = {
        appointmentId,
        appointmentMode,
        esewaId,
        esewaMerchantCode,
        transactionNumber,
        appointmentModeId,
        status,
        remarks,
        hospitalId,
        integrationChannelCode,
        featureCode
      }
      try {
        await this.props.appointmentRefund(
          appointmentSetupApiConstant.CHECK_APPOINTMENT_REFUND_STATUS,
          requestData
        )
        this.setState({
          isConfirming: false,
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.AppointmentRefundReducer.refundSuccess
          },
          remarks: ''
        })
        this.searchAppointment()
      } catch (e) {
        this.setState({
          isConfirming: false,
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.AppointmentRefundReducer.refundError
          },
          remarks: ''
        })
      } finally {
        this.setShowModal()
      }
    }

    rejectSubmitHandler = async rejectRequestBody => {
      let refundRejectRequestDTO = {...this.state.refundRejectRequestDTO}
      refundRejectRequestDTO.remarks = ''
      try {
        await this.props.appointmentRejectRefund(
          appointmentSetupApiConstant.APPOINTMENT_REJECT_REFUND,
          rejectRequestBody
        )

        this.setState({
          isConfirming: false,
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.AppointmentRefundRejectReducer
              .refundRejectSuccess
          },
          refundRejectRequestDTO: refundRejectRequestDTO
        })
        this.searchAppointment()
      } catch (e) {
        this.setState({
          isConfirming: false,
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.AppointmentRefundRejectReducer.refundRejectError
          },
          refundRejectRequestDTO: refundRejectRequestDTO
        })
      } finally {
        this.setShowModal()
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
      await this.previewApiCall(data.appointmentId)
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
      await this.searchAppointmentModeForDropdown()
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
        activeAppointmentModeForDropdown
      } = this.props.AppointmentModeDropdownReducer

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

      const {
        isFetchActiveHospitalDepartmentLoading,
        activeHospitalDepartmentForDropdown,
        activeDepartmentDropdownErrorMessage
      } = this.props.HospitalDepartmentDropdownReducer

      const {
        isFetchActiveRoomNumberByDepartmentLoading,
        activeRoomNumberForDropdownByDepartment,
        activeRoomsByDepartmentDropdownErrorMessage
      } = this.props.RoomNumberDropdownReducer

      const {refundDetail} = this.props.AppointmentRefundDetailReducer

      return (
        <>
        <div id ="appointment-refund-status">
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
              patientDropdownErrorMessage: patientDropdownErrorMessage,
              activeAppointmentModeForDropdown,
              isFetchActiveHospitalDepartmentLoading,
              activeHospitalDepartmentForDropdown,
              activeDepartmentDropdownErrorMessage,
              isFetchActiveRoomNumberByDepartmentLoading,
              activeRoomNumberForDropdownByDepartment,
              activeRoomsByDepartmentDropdownErrorMessage
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
              isRejectLoading: isConfirming,
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
          </div>
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
      'AppointmentRefundDetailReducer',
      'AppointmentModeDropdownReducer',
      'HospitalDepartmentDropdownReducer',
      'RoomNumberDropdownReducer'
    ],
    {
      clearAppointmentRefundPending,
      fetchAppointmentRefundList,
      fetchActiveHospitalsForDropdown,
      fetchPatientMetaDropdown,
      clearAppointmentRefundRejectMessage,
      clearAppointmentRefundMessage,
      appointmentRefund,
      appointmentRejectRefund,
      fetchAppointmentRefundDetailByAppointmentId,
      clearAppointmentRefundDetailMessage,
      thirdPartyApiCallRefund,
      fetchHmacTokenByAppointmentId,
      fetchActiveAppointmentModeForDropdown,
      fetchActiveHospitalDepartmentForDropdownByHospitalId,
      fetchActiveRoomNumberForDropdownByDepartmentId
    }
  )
}
export default AppointRefundHOC
