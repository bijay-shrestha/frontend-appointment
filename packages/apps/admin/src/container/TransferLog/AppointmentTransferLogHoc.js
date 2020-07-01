import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  DoctorMiddleware,
  SpecializationSetupMiddleware,
  PatientDetailsMiddleware,
  AppointmentTransferMiddleware,
  HospitalSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './transfer-log.scss'
import {DateTimeFormatterUtils,CommonUtils} from '@frontend-appointment/helpers'

const {
   fetchAppointmentPreviewInfo,
   fetchAppointmentTransferSearch
} = AppointmentTransferMiddleware
const {fetchActiveHospitalsForDropdown} =HospitalSetupMiddleware;
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
        specializationId: '',
        hospitalId:''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      activeStatus:'All',
      filteredData:[],
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
        fromDate,
        toDate,
        patientMetaInfoId,
        // patientType,
        specializationId,
        doctorId,
        hospitalId
       // patientCategory
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        appointmetnFromDate: appointmentNumber ? '' : fromDate, // WHEN SEARCHED WITH APPOINTMENT NUMBER IGNORE DATE
        appointmentToDate: appointmentNumber ? '' : toDate,
        patientMetaInfoId: patientMetaInfoId.value || '',
        //patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        hospitalId:hospitalId.value||''
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
        },
        filteredData:this.props.appointmentTransferSearchReducer.appointmentTransferList
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
          hospitalId:''
          //patientCategory: '',
          //appointmentDetails: ''
        },
        activeStatus:'All',
        filteredData:[],
      })
      this.searchTransfer()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    handleStatusChange= (event,status) =>{
      let filteredData=[]
      if(this.props.appointmentTransferSearchReducer.appointmentTransferList.length){
        if(status==='All'){
           filteredData= [...this.props.appointmentTransferSearchReducer.appointmentTransferList]
        }
        else
       filteredData=CommonUtils.filterTableDataWithGivenStatus(status,this.props.appointmentTransferSearchReducer.appointmentTransferList)
      }
      this.setState({
          activeStatus:status,
          filteredData:[...filteredData]
      })
      return false;
    }

    callApiForHospitalChange = async () => {
      this.props.fetchActiveDoctorsForDropdown(
        doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
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

    async componentDidMount () {
      await this.searchTransfer();
      await this.props.fetchActiveHospitalsForDropdown(AdminModuleAPIConstants.hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN)
      await this.callApiForHospitalChange()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        filteredData,
        activeStatus
      } = this.state

      const {
        activeDoctorsForDropdown,
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
        allActiveSpecializationList,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer
     const {
      hospitalsForDropdown
     }=this.props.HospitalDropdownReducer
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
              hospitalsForDropdown:hospitalsForDropdown,
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
              previewData: appointmentTransferInfo
            }}
            activeStatus={activeStatus}
            handleStatusChange={this.handleStatusChange}
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
      fetchSpecializationForDropdown,
      fetchPatientMetaDropdownForClient,
      fetchActiveDoctorsForDropdown,
      fetchAppointmentPreviewInfo,
      fetchAppointmentTransferSearch,
      fetchActiveHospitalsForDropdown
    }
  )
}
export default TransferApprovalHOC
