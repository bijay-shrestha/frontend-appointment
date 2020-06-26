import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  DoctorMiddleware,
  PatientDetailsMiddleware,
  SpecializationSetupMiddleware,
  AppointmentServiceTypeMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  DateTimeFormatterUtils,
  EnterKeyPressUtils,
  CommonUtils,
  LocalStorageSecurity
} from '@frontend-appointment/helpers'
import './transaction-log.scss'

const {
  clearTransactionLogMessage,
  fetchTransactionLogList
} = AppointmentDetailsMiddleware

const {fetchActiveAppointmentServiceTypeWithCode} = AppointmentServiceTypeMiddleware

const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware

const TransactionLogHoc = (ComposedComponent, props, type) => {
  const {
    appointmentSetupApiConstant,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant
  } = AdminModuleAPIConstants

  class TransactionLogDetails extends React.PureComponent {
    state = {
      searchParameters: {
        transactionNumber: '',
        appointmentServiceTypeCode:'',
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        toDate: new Date(),
        patientMetaInfoId: '',
        doctorId: '',
        patientType: '',
        specializationId: '',
        appointmentCategory: '',
        status: {value: 'All', label: 'All'}
      },
      primaryAppointmentServiceType:'',
      queryParams: {
        page: 0,
        size: 10
      },
      totalRecords: 0,
      showModal: false,
      previewData: {},
      filteredData: [],
      activeStatus: 'All'
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    searchAppointmentServiceType=async () =>{
      await this.props.fetchActiveAppointmentServiceTypeWithCode(AdminModuleAPIConstants.appointmentServiceTypeApiConstants.FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_WITH_CODE)
    }

    setPrimaryAppointmentService=async () =>{
     const adminInfo = LocalStorageSecurity.localStorageDecoder('adminInfo');
     if(adminInfo){
     const allAppointmentServices = adminInfo.hospitalAppointmentServiceType;
     const primaryAppointmentService =allAppointmentServices?allAppointmentServices.length?allAppointmentServices.filter(service =>service.isPrimary==='Y'):[]:[];
     if(primaryAppointmentService.length){
      let searchParams = {...this.state.searchParameters}
      searchParams['appointmentServiceTypeCode']={value:primaryAppointmentService[0].code,label:primaryAppointmentService[0].name} 
      await this.setState({
          searchParameters:searchParams
       })
     }
     }
    }

    searchAppointment = async page => {
      const {
        transactionNumber,
        fromDate,
        toDate,
        patientMetaInfoId,
        patientType,
        specializationId,
        doctorId,
        appointmentCategory,
        status,
        appointmentServiceTypeCode
      } = this.state.searchParameters
      let searchData = {
        transactionNumber,
        fromDate,
        toDate,
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        appointmentCategory: appointmentCategory.value || '',
        status: status.value === 'All' ? '' : status.value,
        appointmentServiceTypeCode:appointmentServiceTypeCode.value||''
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchTransactionLogList(
        appointmentSetupApiConstant.TRANSACTION_LOG_LIST,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )
      await this.setState({
        totalRecords: this.props.TransactionLogReducer.logList.length
          ? this.props.TransactionLogReducer.totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        },
        filteredData: this.props.TransactionLogReducer.logList,
        primaryAppointmentServiceType:appointmentServiceTypeCode
      })
    }
    handleStatusChange = (event, status) => {
      let filteredData = []
      if (this.props.TransactionLogReducer.logList.length) {
        if (status === 'All') {
          filteredData = [...this.props.TransactionLogReducer.logList]
        } else
          filteredData = CommonUtils.filterTableDataWithGivenStatus(
            status,
            this.props.TransactionLogReducer.logList
          )
      }
      this.setState({
        activeStatus: status,
        filteredData: [...filteredData]
      })
      return false
    }
    appendSNToTable = logList => {
      let newLogList = []
      newLogList =
        logList.length &&
        logList.map((spec, index) => ({
          ...spec,
          sN: index + 1,
          status: spec.status || 'N/A',
          appointmentDate: spec.appointmentDate || 'N/A',
          appointmentNumber: spec.appointmentNumber || 'N/A',
          appointmentTime: spec.appointmentTime || 'N/A',
          esewaId: spec.esewaId || 'N/A',
          registrationNumber: spec.registrationNumber || 'N/A',
          patientName: spec.patientName || 'N/A',
          patientAddress: spec.patientAddress || 'N/A',
          gender: spec.patientGender.split('')[0] || 'N/A',
          patientGender: spec.patientGender,
          age: spec.age.slice(0, 4) || 'N/A',
          patientAge: spec.age.slice(0, 4),
          patientDob: spec.patientDob || 'N/A',
          isSelf: spec.isSelf || 'N/A',
          isRegistered: spec.isRegistered || 'N/A',
          mobileNumber: spec.mobileNumber || 'N/A',
          doctorName: spec.doctorName || 'N/A',
          specializationName: spec.specializationName || 'N/A',
          transactionNumber: spec.transactionNumber || 'N/A',
          appointmentAmount: spec.appointmentAmount || '0',
          revenueAmount: spec.revenueAmount || '0',
          refundAmount: spec.refundAmount || '0',
          transactionDate: spec.transactionDate || 'N/A'
        }))

      return newLogList
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
          patientMetaInfoId: '',
          patientType: '',
          specializationId: '',
          doctorId: '',
          appointmentCategory: '',
          appointmentServiceTypeCode:'',
          status: {value: 'All', label: 'All'}
        },
        filteredData: [],
        activeStatus: 'All'
      })
      await this.setPrimaryAppointmentService();
      await this.searchAppointment()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    previewCall = data => {
      this.setState({
        previewData: data,
        showModal: true
      })
    }

    handleHospitalChangeReset = async () => {
      await this.setState({
        searchParameters: {
          ...this.state.searchParameters,
          patientMetaInfoId: '',
          patientType: '',
          specializationId: '',
          doctorId: '',
          appointmentCategory: ''
        }
      })
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
        //let searchParams = {...this.state.searchParameters}

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

    setShowModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }))
    }

    async componentDidMount () {
      await this.searchAppointmentServiceType()
     // console.log("=====",this.state);
      await this.setPrimaryAppointmentService()
      await this.searchAppointment()
      this.callApiForHospitalChange()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        previewData,
        filteredData,
        activeStatus,
        primaryAppointmentServiceType
      } = this.state

      const {
        isLogListLoading,
        //logList,
        logErrorMessage,
        appointmentStatistics
      } = this.props.TransactionLogReducer

      const {
        activeDoctorsForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        allActiveSpecializationList,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer

      const {
        patientList,
        patientDropdownErrorMessage
      } = this.props.PatientDropdownListReducer

      const {
        isFetchAppointmentServiceTypeWithCodeLoading,
        activeAppointmentServiceTypeWithCodeForDropdown,
        dropdownWithCodeErrorMessage
      } = this.props.AppointmentServiceTypeDropdownReducer

      return (
        <div id="appointment-log">
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
              patientDropdownErrorMessage: patientDropdownErrorMessage,
              isFetchAppointmentServiceTypeWithCodeLoading,
              activeAppointmentServiceTypeWithCodeForDropdown,
              dropdownWithCodeErrorMessage
            }}
            paginationProps={{
              queryParams: queryParams,
              totalRecords: totalRecords,
              handlePageChange: this.handlePageChange
            }}
            tableHandler={{
              isSearchLoading: isLogListLoading,
              appointmentLogList: this.appendSNToTable(filteredData),
              searchErrorMessage: logErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: previewData,
              appointmentServiceTypeCode:primaryAppointmentServiceType

            }}
            handleStatusChange={this.handleStatusChange}
            activeStatus={activeStatus}
            appointmentStatistics={appointmentStatistics}
            
          />
        </div>
      )
    }
  }

  return ConnectHoc(
    TransactionLogDetails,
    [
      'TransactionLogReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'PatientDropdownListReducer',
      'AppointmentServiceTypeDropdownReducer'
    ],
    {
      clearTransactionLogMessage,
      fetchTransactionLogList,
      fetchActiveDoctorsForDropdown,
      fetchSpecializationForDropdown,
      fetchPatientMetaDropdownForClient,
      fetchActiveAppointmentServiceTypeWithCode
    }
  )
}
export default TransactionLogHoc
