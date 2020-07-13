import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  DoctorMiddleware,
  SpecializationSetupMiddleware,
  PatientDetailsMiddleware,
  AppointmentTransferMiddleware,
  AppointmentDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './transfer-log.scss'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

const {
   fetchAppointmentPreviewInfo,
   fetchAppointmentTransferSearch,
} = AppointmentTransferMiddleware

const {
appointmentExcelDownload
} = AppointmentDetailsMiddleware
const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware
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
        specializationId: ''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      totalRecords: 0,
      showModal: false
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
        patientMetaInfoId,
        // patientType,
        specializationId,
        doctorId,
        appointmentFromDate,
        appointmentToDate
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
        totalRecords: this.props.appointmentTransferSearchReducer.appointmentTransferList
          .length
          ? this.props.appointmentTransferSearchReducer.totalItems
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
          // sN: index + 1,
          registrationNumber: spec.registrationNumber || 'N/A',
          gender:spec.gender.split("")[0],
          age:spec.age.slice(0, 4)
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
          appointmentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
          appointmentToDate: new Date(),
          patientMetaInfoId: '',
          //patientType: '',
          specializationId: '',
          doctorId: '',
          //patientCategory: '',
          //appointmentDetails: ''
        }
      })
      this.searchTransfer()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    callApiForHospitalChange = async () => {
      this.props.fetchActiveDoctorsForDropdown(
        doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
      )

      this.props.fetchSpecializationForDropdown(
        specializationSetupAPIConstants.ACTIVE_DROPDOWN_SPECIALIZATION
      )

      this.props.fetchPatientMetaDropdownForClient(
        patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS
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
        await this.setStateValuesForSearch(newSearchParams)
      }
    }

    downloadExcel = async () => {
     try{
      const file = appointmentExcelDownload(AdminModuleAPIConstants.excelApiConstants.TRANSFER_LOG_EXCEL,this.state.queryParams,this.state.searchParameters)
     console.log(file)
    }catch(e){
      console.log(e);
     }
    }

    async componentDidMount () {
      await this.searchTransfer()
      await this.callApiForHospitalChange()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal
      } = this.state

      const {
        activeDoctorsForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        appointmentTransferList,
        isAppointmentTransferSearchLoading,
       appointmentTransferSearchErrorMessage
      } = this.props.appointmentTransferSearchReducer

      const {
        appointmentTransferInfo
      } = this.props.appointmentTransferPreviewReducer

      const {
        allActiveSpecializationList,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer

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
              isSearchLoading: isAppointmentTransferSearchLoading,
              appointmentTransferList: this.appendSNToTable(appointmentTransferList),
              searchErrorMessage: appointmentTransferSearchErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: appointmentTransferInfo,
              downloadExcel:this.downloadExcel
            }}
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
      'appointmentTransferSearchReducer'
    ],
    {
      fetchSpecializationForDropdown,
      fetchPatientMetaDropdownForClient,
      fetchActiveDoctorsForDropdown,
      fetchAppointmentPreviewInfo,
      fetchAppointmentTransferSearch
    }
  )
}
export default TransferApprovalHOC
