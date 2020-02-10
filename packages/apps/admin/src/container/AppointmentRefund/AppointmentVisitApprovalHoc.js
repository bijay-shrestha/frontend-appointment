import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  HospitalSetupMiddleware,
  DoctorMiddleware,
  SpecializationSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  FileExportUtils
} from '@frontend-appointment/helpers'
import './hospitalHoc.scss'

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
const AppointmentDetailHOC = (ComposedComponent, props, type) => {
  const {appointmentSetupApiConstant} = AdminModuleAPIConstants

  class AppointmentSetup extends React.PureComponent {
    state = {
      searchParameters: {
        appointmentNumber: '',
        fromDate: '',
        toDate: '',
        hospitalId: '',
        patientMetaInfoId: '',
        patientType: '',
        specializationId: '',
        name: ''
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
          hospitalSetupApiConstants.SPECIFIC_DROPDOWN_HOSPITAL
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
        totalRecords: this.props.AppointmentRefundSearchReducer.refundList
          .length
          ? this.props.AppointmentRefundSearchReducer.refundList[0].totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    appendSNToTable = refundList => {
      const newRefundList =
        refundList.length &&
        refundList.map((spec, index) => ({
          ...spec,
          sN: index + 1,
          name: spec.name.toUpperCase()
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
      this.searchAppointment()
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentNumber: '',
          fromDate: '',
          toDate: '',
          hospitalId: '',
          patientMetaInfoId: '',
          patientType: '',
          specializationId: '',
          name: ''
        }
      })
      this.searchAppointment()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    callApiForHospitalChange = (hospitalId) => {
       
    }

    handleSearchFormChange = async event => {
      if (event) {
        let fieldName = event.target.name
        let value = event.target.value
        let label = event.target.label
        this.callApiForHospitalChange();
        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        await this.setStateValuesForSearch(searchParams)
      }
    }
    setFormValidManage = () => {
      this.setState({
        formValid: true
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
        deleteRequestDTO,
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

      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

      return (
        <ComposedComponent
          {...this.props}
          {...props}
          searchHandler={{
            handleEnter: this.handleEnterPress,
            handleSearchFormChange: this.handleSearchFormChange,
            resetSearch: this.handleSearchFormReset,
            searchAppointment: this.searchAppointment,
            handlePageChange: this.handlePageChange,
            handleSearchFormChange: this.handleSearchFormChange,
            hospitalsDropdown: hospitalsForDropdown,
            doctorsDropdown: activeDoctorsForDropdown,
            doctorDropdownErrorMessage: doctorDropdownErrorMessage,
            activeSpecializationList: activeSpecializationList,
            specializationDropdownErrorMessage:dropdownErrorMessage,
            searchParameters: searchParameters
          }}
          paginationProps={{
            queryParams: queryParams,
            totalRecords: totalRecords,
            handlePageChange: this.handlePageChange
          }}
          tableHandler={{
            isSearchLoading: isRefundListLoading,
            appointmentRefundList: this.appendSNToTable(refundList),
            searchErrorMessage: refundErrorMessage
          }}
        ></ComposedComponent>
      )
    }
  }

  return ConnectHoc(
    HospitalSetup,
    [
      'AppointmentRefundListReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'HospitalDropdownReducer'
    ],
    {
      clearAppointmentRefundPending,
      fetchAppointmentRefundList,
      fetchActiveHospitalsForDropdown,
      fetchActiveDoctorsHospitalWiseForDropdown,
      fetchSpecializationHospitalWiseForDropdown
    }
  )
}
export default HospitalHOC
