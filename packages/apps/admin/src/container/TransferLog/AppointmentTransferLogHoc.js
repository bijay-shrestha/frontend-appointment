import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  DoctorMiddleware,
  SpecializationSetupMiddleware,
  PatientDetailsMiddleware,
  AppointmentTransferMiddleware,
  HospitalSetupMiddleware,
  AppointmentDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './transfer-log.scss'
import {
  DateTimeFormatterUtils,
  CommonUtils
} from '@frontend-appointment/helpers'
import {CAlert} from '@frontend-appointment/ui-elements'
const {appointmentExcelDownload} = AppointmentDetailsMiddleware
const {
  fetchAppointmentPreviewInfo,
  fetchAppointmentTransferSearch
} = AppointmentTransferMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
const {
  fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdown} = PatientDetailsMiddleware
const TransferApprovalHOC = (ComposedComponent, props, type) => {
  const {
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant,
    appointmentTransferApiConstants
  } = AdminModuleAPIConstants

  class TransferApprovalDetails extends React.PureComponent {
    state = {
      searchParameters: {
        appointmentNumber: '',
        appointmentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        appointmentToDate: new Date(),
        patientMetaInfoId: '',
        doctorId: '',
        specializationId: '',
        hospitalId: ''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      activeStatus: 'All',
      filteredData: [],
      totalRecords: 0,
      showModal: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showAlert: false
    }

    alertTimer = ''

    clearAlertTimeout = () => {
      this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
    }

    closeAlert = () => {
      this.showOrCloseAlertMessage(false, '', '')
    }

    showOrCloseAlertMessage = (showAlert, type, message) => {
      this.setState({
        showAlert,
        alertMessageInfo: {
          variant: type,
          message: message
        }
      })
      this.clearAlertTimeout()
    }

    previewApiCall = async data => {
      await this.props.fetchAppointmentPreviewInfo(
        appointmentTransferApiConstants.APPOINTMENT_TRANSFER_PREVIEW,
        data.appointmentTransferId
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
            message: this.props.appointmentTransferPreviewReducer
              .appointmentTransferInfoErrorMessage
          }
        })
      }
    }

    setShowModal = () => {
      this.setState({
        showModal: false
      })
    }

    searchTransfer = async page => {
      const {
        appointmentNumber,
        appointmentFromDate,
        appointmentToDate,
        patientMetaInfoId,
        // patientType,
        specializationId,
        doctorId,
        hospitalId
        // patientCategory
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        appointmetnFromDate: appointmentNumber ? '' : appointmentFromDate, // WHEN SEARCHED WITH APPOINTMENT NUMBER IGNORE DATE
        appointmentToDate: appointmentNumber ? '' : appointmentToDate,
        patientMetaInfoId: patientMetaInfoId.value || '',
        //patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        hospitalId: hospitalId.value || ''
        //patientCategory: patientCategory.value || ''
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchAppointmentTransferSearch(
        appointmentTransferApiConstants.APPOINTMENT_TRANSFER_SEARCH,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )
      await this.setState({
        totalRecords: this.props.appointmentTransferSearchReducer
          .appointmentTransferList.length
          ? this.props.appointmentTransferSearchReducer.totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        },
        filteredData: this.props.appointmentTransferSearchReducer
          .appointmentTransferList
      })
    }

    appendSNToTable = refundList => {
      let newRefundList = []

      newRefundList =
        refundList.length &&
        refundList.map((spec, index) => ({
          ...spec,
          patientMobileNumber: spec.mobileNumber,
          // sN: index + 1,
          registrationNumber: spec.registrationNumber || 'N/A',
          gender: spec.gender.split('')[0],
          age: spec.age.slice(0, 4)
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
      this.searchTransfer()
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentNumber: '',
          appointmentFromDate: DateTimeFormatterUtils.subtractDate(
            new Date(),
            7
          ),
          appointmentToDate: new Date(),
          patientMetaInfoId: '',
          //patientType: '',
          specializationId: '',
          doctorId: '',
          hospitalId: ''
          //patientCategory: '',
          //appointmentDetails: ''
        },
        activeStatus: 'All',
        filteredData: []
      })
      this.searchTransfer()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    handleStatusChange = (event, status) => {
      let filteredData = []
      if (
        this.props.appointmentTransferSearchReducer.appointmentTransferList
          .length
      ) {
        if (status === 'All') {
          filteredData = [
            ...this.props.appointmentTransferSearchReducer
              .appointmentTransferList
          ]
        } else
          filteredData = CommonUtils.filterTableDataWithGivenStatus(
            status,
            this.props.appointmentTransferSearchReducer.appointmentTransferList
          )
      }
      this.setState({
        activeStatus: status,
        filteredData: [...filteredData]
      })
      return false
    }

    callApiForHospitalChange = async hospitalId => {
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
        }

        let newSearchParams = {...this.state.searchParameters}

        newSearchParams[fieldName] = label
          ? value
            ? fileUri
              ? {value, label, fileUri}
              : {value, label}
            : ''
          : value
        if (fieldName === 'hospitalId') this.callApiForHospitalChange(value)
        await this.setStateValuesForSearch(newSearchParams)
      }
    }

    downloadExcel = async () => {
      const {
        appointmentNumber,
        appointmentFromDate,
        appointmentToDate,
        patientMetaInfoId,
        // patientType,
        specializationId,
        doctorId,
        hospitalId
        // patientCategory
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        appointmentFromDate: appointmentNumber ? '' : appointmentFromDate, // WHEN SEARCHED WITH APPOINTMENT NUMBER IGNORE DATE
        appointmentToDate: appointmentNumber ? '' : appointmentToDate,
        patientMetaInfoId: patientMetaInfoId.value || '',
        //patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        hospitalId: hospitalId.value || ''
        //patientCategory: patientCategory.value || ''
      }
      try {
        await appointmentExcelDownload(
          AdminModuleAPIConstants.excelApiConstants.TRANSFER_LOG_EXCEL,
          this.state.queryParams,
          searchData,
          `transferLog ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            new Date()
          )}`
        )
        this.showOrCloseAlertMessage(
          true,
          'success',
          `transferLog ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            new Date()
          )} downloaded successfully!!`
        )

        return false
      } catch (e) {
        this.showOrCloseAlertMessage(
          true,
          'danger',
          e.errorMessage || 'Sorry Internal Server Error'
        )
        return false
      }
    }

    async componentDidMount () {
      await this.searchTransfer()
      await this.props.fetchActiveHospitalsForDropdown(
        AdminModuleAPIConstants.hospitalSetupApiConstants
          .FETCH_HOSPITALS_FOR_DROPDOWN
      )
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        filteredData,
        activeStatus,
        alertMessageInfo,
        showAlert,

      } = this.state

      const {
        activeDoctorsByHospitalForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        // appointmentTransferList,
        isAppointmentTransferSearchLoading,
        appointmentTransferSearchErrorMessage
      } = this.props.appointmentTransferSearchReducer

      const {
        appointmentTransferInfo
      } = this.props.appointmentTransferPreviewReducer

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
              searchAppointment: this.searchTransfer,
              doctorsDropdown: activeDoctorsByHospitalForDropdown,
              doctorDropdownErrorMessage: doctorDropdownErrorMessage,
              activeSpecializationList: activeSpecializationListByHospital,
              specializationDropdownErrorMessage: dropdownErrorMessage,
              searchParameters: searchParameters,
              patientListDropdown: patientList,
              hospitalsForDropdown: hospitalsForDropdown,
              patientDropdownErrorMessage: patientDropdownErrorMessage
            }}
            paginationProps={{
              queryParams: queryParams,
              totalRecords: totalRecords,
              handlePageChange: this.handlePageChange
            }}
            tableHandler={{
              isSearchLoading: isAppointmentTransferSearchLoading,
              appointmentTransferList: this.appendSNToTable(filteredData),
              searchErrorMessage: appointmentTransferSearchErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: appointmentTransferInfo,
              downloadExcel: this.downloadExcel
            }}
            activeStatus={activeStatus}
            handleStatusChange={this.handleStatusChange}
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
    TransferApprovalDetails,
    [
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'PatientDropdownListReducer',
      'AppointmentDetailReducer',
      'appointmentTransferPreviewReducer',
      'appointmentTransferSearchReducer',
      'HospitalDropdownReducer'
    ],
    {
      fetchSpecializationHospitalWiseForDropdown,
      fetchPatientMetaDropdown,
      fetchActiveDoctorsHospitalWiseForDropdown,
      fetchAppointmentPreviewInfo,
      fetchAppointmentTransferSearch,
      fetchActiveHospitalsForDropdown
    }
  )
}
export default TransferApprovalHOC
