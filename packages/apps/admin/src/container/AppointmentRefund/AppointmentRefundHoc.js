import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  HospitalSetupMiddleware,
  DoctorMiddleware,
  SpecializationSetupMiddleware,
  PatientDetailsMiddleware
} from '@frontend-appointment/thunk-middleware';
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  FileExportUtils
} from '@frontend-appointment/helpers';
import './appointment-refund.scss';
import { DateTimeFormatterUtils} from "@frontend-appointment/helpers";
const {
  clearAppointmentRefundPending,
  fetchAppointmentRefundList
  //downloadExcelForHospitals
} = AppointmentDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
const {
  fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaList} = PatientDetailsMiddleware
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
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(),7),
        toDate:new Date(),
        hospitalId: '',
        patientMetaInfoId: '',
        doctorId:'',
        patientType: '',
        specializationId: ''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      totalRecords: 0
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
      let searchData = {
        ...this.state.searchParameters
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
      let newRefundList =[];

      newRefundList = refundList.length &&
        refundList.map((spec, index) => ({
          "appointmentNumber":spec.appointmentNumber||"",
          "hospitalName": spec.hospitalName||"",
          "patientName":spec.patientName||"",
          "registrationNumber": spec.registrationNumber||"",
          "doctorName": spec.doctorName||" ",
          "specializationName": spec.specializationName||"",
          "transactionNumber": spec.transactionNumber||"",
          "cancelledDate": spec.cancelledDate|| "",
          "refundAmount": spec.refundAmount||"",
          "esewaId": spec.esewaId||"",
           sN: index + 1
        }))
    
      console.log('New RefundList', newRefundList)
      return newRefundList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchAppointment();
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentNumber: '',
          fromDate: DateTimeFormatterUtils.subtractDate(new Date(),7),
         toDate:new Date(),
          hospitalId: '',
          patientMetaInfoId: '',
          patientType: '',
          specializationId: '',
          doctorId:''
        }
      })
      this.searchAppointment()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    callApiForHospitalChange = hospitalId => {
      this.props.fetchActiveDoctorsHospitalWiseForDropdown(doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,hospitalId);
      this.props.fetchSpecializationHospitalWiseForDropdown(specializationSetupAPIConstants.SPECIALIZATION_BY_HOSPITAL,hospitalId);
      this.props.fetchPatientMetaList(patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS,hospitalId);
    }

    handleSearchFormChange = async (event,field) => {
      if (event) {
        let fieldName,value,label;
        if(field){
          fieldName=field;
          value=event;
        }
        else{
          fieldName=event.target.name;
          value=event.target.value;
          label=event.target.label
        if(fieldName==="hospitalId")
           this.callApiForHospitalChange(value)
        }              
        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        await this.setStateValuesForSearch(searchParams)
      }
    }
    // setFormValidManage = () => {
    //   this.setState({
    //     formValid: true
    //   })
    // }

    async componentDidMount () {
      await this.searchAppointment()
      await this.searchHospitalForDropDown()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords
      } = this.state

      const {
        isRefundListLoading,
        refundList,
        refundErrorMessage
      } = this.props.AppointmentRefundListReducer

      const {
        activeDoctorsForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        activeSpecializationList,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer
       
      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
      const {patientList,patientDropdownErrorMessage}=this.props.PatientDropdownListReducer;
      return (
        <ComposedComponent
          {...this.props}
          {...props}
          searchHandler={{
            handleEnter: this.handleEnterPress,
            handleSearchFormChange: this.handleSearchFormChange,
            resetSearch: this.handleSearchFormReset,
            searchAppointment: this.searchAppointment,
            handleSearchFormChange: this.handleSearchFormChange,
            hospitalsDropdown: hospitalsForDropdown,
            doctorsDropdown: activeDoctorsForDropdown,
            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
            activeSpecializationList: activeSpecializationList,
            specializationDropdownErrorMessage: dropdownErrorMessage,
            searchParameters: searchParameters,
            patientListDropdown:patientList,
            patientDropdownErrorMessage:patientDropdownErrorMessage
          }}
          paginationProps={{
            queryParams: queryParams,
            totalRecords: totalRecords,
            handlePageChange: this.handlePageChange
          }}
          tableHandler={{
            isSearchLoading: isRefundListLoading,
            appointmentRefundList:this.appendSNToTable(refundList),
            searchErrorMessage: refundErrorMessage,
          }}
        ></ComposedComponent>
      )
    }
  }

  return ConnectHoc(
    AppointmentRefundDetails,
    [
      'AppointmentRefundListReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'HospitalDropdownReducer',
      'PatientDropdownListReducer'
    ],
    {
      clearAppointmentRefundPending,
      fetchAppointmentRefundList,
      fetchActiveHospitalsForDropdown,
      fetchActiveDoctorsHospitalWiseForDropdown,
      fetchSpecializationHospitalWiseForDropdown,
      fetchPatientMetaList
    }
  )
}
export default AppointRefundHOC
