import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  HospitalSetupMiddleware,
  DashboardDetailsMiddleware,
  DoctorMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './admin-dashboard.scss'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

const {
  fetchDashboardAppointmentStatisticsList,
  fetchDashboardRegisteredPatientList,
  fetchDashboardRevenueDayList,
  fetchDashboardRevenueMonthList,
  fetchDashboardRevenueRefundList,
  fetchDashboardRevenueWeekList,
  fetchDashboardRevenueYearList,
  fetchAppointmentQueueList,
  fetchDashboardDoctorRevenue
} = DashboardDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
const DashBoardHOC = (ComposedComponent, props, type) => {
  const {
    hospitalSetupApiConstants,
    DashboardApiConstant,
    doctorSetupApiConstants
  } = AdminModuleAPIConstants

  class DashBoardDetails extends React.PureComponent {
    state = {
      searchParameterForGenerateRevenue: {
        currentToDate: new Date(),
        currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
        previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 2),
        previousFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 3),
        hospitalId: {label: 'ALL', value: null}
      },
      searchParamsForOverallAppoinment: {
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        toDate: new Date(),
        hospitalId: {label: 'ALL', value: null}
      },
      searchParameterForRevenueTrend: {
        revFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        revToDate: new Date(),
        revHospitalId: {label: 'ALL', value: null}
      },
      revenueFilter: 'W',
      appointmentFilter: 'W',
      hospitalList: [],
      appointmentQueue: {
        doctorId: '',
        hospitalId: ''
      },
      queryParams: {
        page: 0,
        size: 6
      },
      totalRecords: 0,
      doctorRevenue: {
        doctorId: '',
        hospitalId: '',
        fromDate: '',
        toDate: ''
      },
      doctorQueryParams: {
        page: 0,
        size: 6
      },
      doctorTotalRecords: 0,
      doctorTotalAppointments:0,
      doctorTotalRevenueAmount:0,
    }

    searchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveHospitalsForDropdown(
          hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
        )
        const {hospitalsForDropdown} = {...this.props.HospitalDropdownReducer}
        let hospitals = [...hospitalsForDropdown]
        hospitals.push({label: 'ALL', value: 'A'})
        this.setState({
          hospitalList: [...hospitals]
        })
      } catch (e) {
        console.log(e)
      }
    }

    callApiForHospitalChange = statsType => {
      const {
        hospitalId,
        fromDate,
        toDate
      } = this.state.searchParamsForOverallAppoinment
      const {
        revFromDate,
        revHospitalId,
        revToDate
      } = this.state.searchParameterForRevenueTrend
      if (!statsType || statsType !== 'refund')
        this.props.fetchDashboardAppointmentStatisticsList(
          DashboardApiConstant.OVERALL_APPOINTMENTS,
          {
            hospitalId: hospitalId
              ? hospitalId.value === 'A'
                ? null
                : hospitalId.value
              : null,
            fromDate,
            toDate
          }
        )
      if (!statsType || statsType === 'refund')
        this.props.fetchDashboardRevenueRefundList(
          DashboardApiConstant.REVENUE_STATISTICS,
          {
            hospitalId: hospitalId
              ? hospitalId.value === 'A'
                ? null
                : hospitalId.value
              : null,
            fromDate: revFromDate,
            toDate: revToDate
          }
        )
      if (!statsType) {
        this.props.fetchDashboardRegisteredPatientList(
          DashboardApiConstant.REGISTERED_PATIENTS,
          hospitalId
            ? hospitalId.value
              ? hospitalId.value === 'A'
                ? 0
                : hospitalId.value
              : 0
            : 0
        )

        this.props.fetchDashboardRevenueDayList(
          DashboardApiConstant.REVENUE_GENERATED,
          {
            currentToDate: new Date(),
            currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
            previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 2),
            previousFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              3
            ),
            hospitalId: hospitalId
              ? hospitalId.value === 'A'
                ? null
                : hospitalId.value
              : null
          }
        )
        this.props.fetchDashboardRevenueWeekList(
          DashboardApiConstant.REVENUE_GENERATED,
          {
            currentToDate: new Date(),
            currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
            previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 8),
            previousFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              15
            ),
            hospitalId: hospitalId
              ? hospitalId.value === 'A'
                ? null
                : hospitalId.value
              : null
          }
        )
        this.props.fetchDashboardRevenueMonthList(
          DashboardApiConstant.REVENUE_GENERATED,
          {
            currentToDate: new Date(),
            currentFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              30
            ),
            previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 31),
            previousFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              61
            ),
            hospitalId: hospitalId
              ? hospitalId.value === 'A'
                ? null
                : hospitalId.value
              : null
          }
        )

        this.props.fetchDashboardRevenueYearList(
          DashboardApiConstant.REVENUE_GENERATED,
          {
            currentToDate: new Date(),
            currentFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              366
            ),
            previousToDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              367
            ),
            previousFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              733
            ),
            hospitalId: hospitalId
              ? hospitalId.value === 'A'
                ? null
                : hospitalId.value
              : null
          }
        )
      }
    }

    filterDateAccordingToDayFilter = dayFilter => {
      let searchParameterChange = {
        fromDate: '',
        toDate: '',
        hospitalId: this.state.searchParamsForOverallAppoinment.hospitalId
      }
      switch (dayFilter) {
        case 'D':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId
          }
          break
        case 'W':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId
          }
          break
        case 'M':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 30),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId
          }
          break
        case 'Y':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 366),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId
          }
          break
      }
      return searchParameterChange
    }

    onPillsClickHandler = async (dayFilter, type) => {
      let searchParameter = this.filterDateAccordingToDayFilter(dayFilter)
      if (type === 'refund') {
        if (this.state.revenueFilter !== dayFilter) {
          await this.setState({
            searchParameterForRevenueTrend: {
              revFromDate: searchParameter.fromDate,
              revToDate: searchParameter.toDate,
              hospitalId: searchParameter.hospitalId
            },
            revenueFilter: dayFilter
          })
          this.callApiForHospitalChange(type)
        }
      } else {
        if (this.state.appointmentFilter !== dayFilter) {
          await this.setState({
            searchParamsForOverallAppoinment: {
              ...searchParameter
            },
            appointmentFilter: dayFilter
          })
          this.callApiForHospitalChange(type)
        }
      }
    }

    searchDoctorForHospitalWise = async value => {
      await this.props.fetchActiveDoctorsHospitalWiseForDropdown(
        doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
        value
      )
    }

    handleHospitalChange = async (event, field) => {
      let searchParams1 = {...this.state.searchParameterForGenerateRevenue}
      let searchParams = {
        ...this.state.searchParamsForOverallAppoinment
      }
      let searchParams3 = {...this.state.searchParameterForRevenueTrend}
      let searchParams4 = {...this.state.appointmentQueue}
      let searchParams5 = {...this.state.doctorRevenue}
      let fieldName, value, label
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      searchParams[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams1[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams3[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams4[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams5[fieldName] = label ? (value ? {value, label} : '') : value
      await this.setState({
        searchParamsForOverallAppoinment: searchParams,
        searchParameterForGenerateRevenue: searchParams1,
        searchParameterForRevenueTrend: searchParams3,
        appointmentQueue: searchParams4,
        doctorRevenue: searchParams5
      })

      if (fieldName === 'hospitalId') {
        this.callApiForHospitalChange()
        if (value) {
          this.searchAppointmentQueue();
          this.searchDoctorRevenueList();
          this.searchDoctorForHospitalWise(value)
        }
      }
    }

    handleDoctorChange = async (event, types) => {
      let searchParams = {
        ...this.state.appointmentQueue
      }

      let searchParamsForDoctor = {
        ...this.state.doctorRevenue
      }

      let fieldName, value, label
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      if (types === 'Q') {
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        await this.setState({
          appointmentQueue: searchParams
        })
      } else {
        searchParamsForDoctor[fieldName] = label
          ? value
            ? {value, label}
            : ''
          : value
        await this.setState({
          doctorRevenue: searchParamsForDoctor
        })
      }

      if (
        fieldName === 'doctorId' &&
        this.state.searchParameterForGenerateRevenue.hospitalId
      )
        if (types === 'Q') this.searchAppointmentQueue()
        else this.searchDoctorRevenueList()
    }

    searchAppointmentQueue = async page => {
      const {doctorId, hospitalId} = this.state.appointmentQueue
      const response = ''
      if (hospitalId) {
        let updatedPage =
          this.state.queryParams.page === 0
            ? 1
            : page
            ? page
            : this.state.queryParams.page
        try {
          response = await this.props.fetchAppointmentQueueList(
            DashboardApiConstant.APPOINTMENT_QUERY,
            {
              page: updatedPage,
              size: this.state.queryParams.size
            },
            {
              doctorId: doctorId.value || '',
              hospitalId: hospitalId.value
            }
          )
          await this.setState({
            totalRecords: this.props.DashboardAppointmentQueueReducer.totalItems
              ? this.props.DashboardAppointmentQueueReducer.totalItems
              : 0,
              
            queryParams: {
              ...this.state.queryParams,
              page: updatedPage
            }
          })
          return response
        } catch (e) {
          throw e
          console.log(e)
        }
      }
    }

    searchDoctorRevenueList = async page => {
      const {doctorId, hospitalId, fromDate, toDate} = this.state.doctorRevenue
      const response = ''
      if (hospitalId) {
        let updatedPage =
          this.state.doctorQueryParams.page === 0
            ? 1
            : page
            ? page
            : this.state.doctorQueryParams.page
        try {
          response = await this.props.fetchDashboardDoctorRevenue(
            DashboardApiConstant.DOCTOR_REVENUE,
            {
              page: updatedPage,
              size: this.state.doctorQueryParams.size
            },
            {
              doctorId: doctorId.value || '',
              hospitalId: hospitalId.value,
              fromDate: fromDate,
              toDate: toDate
            }
          )
          await this.setState({
            doctorTotalRecords:this.props.DashboardRevenueGeneratedByDoctorReducer.totalItemsDoctorsRevenue,
            doctorTotalAppointments:this.props.DashboardRevenueGeneratedByDoctorReducer.overallAppointment,
            doctorTotalRevenueAmount:this.props.DashboardRevenueGeneratedByDoctorReducer.totalRevenueAmount,  
            doctorQueryParams: {
              ...this.state.doctorQueryParams,
              page: updatedPage
            }
          })
          return response
        } catch (e) {
          throw e
          console.log(e)
        }
      }
    }

    handleDoctorRevenuePageChange = async newPage => {
      try {
        await this.setState({
          doctorQueryParams: {
            ...this.state.doctorQueryParams,
            page: newPage
          }
        })
        const response = await this.searchDoctorRevenueList()
        return response
      } catch (e) {
        throw e
      }
    }

    handleDateChange = async(e,fieldName) => {
      let doctorRevenueParam = {...this.state.doctorRevenue};
      doctorRevenueParam[fieldName] = e||'';
      await this.setState({
        doctorRevenue:doctorRevenueParam
      })
    }

    handlePageChange = async newPage => {
      try {
        await this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: newPage
          }
        })
        const response = await this.searchAppointmentQueue()
        return response
      } catch (e) {
        throw e
      }
    }

    componentDidMount () {
      this.callApiForHospitalChange()
      this.searchHospitalForDropDown()
    }
    render () {
      const {
        searchParameterForGenerateRevenue,
        searchParamsForOverallAppoinment,
        searchParameterForRevenueTrend,
        hospitalList,
        totalRecords,
        doctorRevenue,
        doctorTotalAppointments,
        doctorTotalRevenueAmount,
        doctorTotalRecords,
        doctorQueryParams,
        appointmentQueue,
        queryParams
      } = this.state
      const {revFromDate, revToDate} = searchParameterForRevenueTrend

      const {
        currentToDate,
        previousFromDate,
        hospitalId
      } = searchParameterForGenerateRevenue
      const {fromDate, toDate} = searchParamsForOverallAppoinment
      //   const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      const {
        isAppointmentStatsLoading,
        appointmentStatsData,
        appointmentStatsErrorMessage
      } = this.props.DashboardAppointmentStatisticsReducer
      const {
        isAppointmentQueueLoading,
        appointmentQueueData,
        appointmentQueueErrorMessage
      } = this.props.DashboardAppointmentQueueReducer
      const {
        isRevenueStatsLoading,
        revenueStatsData,
        revenueStatsErrorMessage
      } = this.props.DashboardRevenueStatisticsReducer

      const {
        isRegisteredPatientLoading,
        registeredPatientsData,
        registeredPatientsErrorMessage
      } = this.props.DashboardRegisteredPatientReducer

      const {
        isRevenueGeneratedDayLoading,
        revenueGeneratedDayData,
        revenueGeneratedDayErrorMessage
      } = this.props.DashboardRevenueGeneratedDayReducer

      const {
        isRevenueGeneratedMonthLoading,
        revenueGeneratedMonthData,
        revenueGeneratedMonthErrorMessage
      } = this.props.DashboardRevenueGeneratedMonthReducer

      const {
        isRevenueGeneratedWeekLoading,
        revenueGeneratedWeekData,
        revenueGeneratedWeekErrorMessage
      } = this.props.DashboardRevenueGeneratedWeekReducer
      const {
        isRevenueGeneratedYearLoading,
        revenueGeneratedYearData,
        revenueGeneratedYearErrorMessage
      } = this.props.DashboardRevenueGeneratedYearReducer

      const {
        isDoctorRevenueGeneratedLoading,
        doctorRevenueGenerated,
        doctorRevenueGeneratedErrorMessage,
      } = this.props.DashboardRevenueGeneratedByDoctorReducer
      
      const {
        activeDoctorsByHospitalForDropdown
      } = this.props.DoctorDropdownReducer
      
      return (
        <ComposedComponent
          {...this.props}
          {...props}
          generateRevenue={{
            previousFromDate: previousFromDate,
            currentToDate: currentToDate,
            hospitalId: hospitalId,
            isRevenueGeneratedDayLoading: isRevenueGeneratedDayLoading,
            revenueGeneratedDayData: revenueGeneratedDayData,
            revenueGeneratedDayErrorMessage: revenueGeneratedDayErrorMessage,
            isRevenueGeneratedMonthLoading: isRevenueGeneratedMonthLoading,
            revenueGeneratedMonthData: revenueGeneratedMonthData,
            revenueGeneratedMonthErrorMessage: revenueGeneratedMonthErrorMessage,
            isRevenueGeneratedWeekLoading: isRevenueGeneratedWeekLoading,
            revenueGeneratedWeekData: revenueGeneratedWeekData,
            revenueGeneratedWeekErrorMessage: revenueGeneratedWeekErrorMessage,
            isRevenueGeneratedYearLoading: isRevenueGeneratedYearLoading,
            revenueGeneratedYearData: revenueGeneratedYearData,
            revenueGeneratedYearErrorMessage: revenueGeneratedYearErrorMessage
          }}
          appointmentList={{
            isAppointmentStatsLoading: isAppointmentStatsLoading,
            appointmentStatsData: appointmentStatsData,
            appointmentStatsErrorMessage: appointmentStatsErrorMessage,
            fromDate: {fromDate},
            toDate: {toDate}
          }}
          revenueStatistics={{
            isRevenueStatsLoading: isRevenueStatsLoading,
            revenueStatsData: revenueStatsData,
            revenueStatsErrorMessage: revenueStatsErrorMessage,
            fromDate: {revFromDate},
            toDate: {revToDate}
          }}
          registeredPatients={{
            isRegisteredPatientLoading: isRegisteredPatientLoading,
            registeredPatientsData: registeredPatientsData,
            registeredPatientsErrorMessage: registeredPatientsErrorMessage
          }}
          appointmentQueue={{
            isAppointmentQueueLoading: isAppointmentQueueLoading,
            appointmentQueueData: appointmentQueueData,
            appointmentQueueErrorMessage: appointmentQueueErrorMessage,
            totalRecords: totalRecords,
            queryParams: queryParams,
            handlePageChange: this.handlePageChange,
            handleDoctorChange: this.handleDoctorChange,
            doctorId: appointmentQueue.doctorId,
            doctorDropdown: activeDoctorsByHospitalForDropdown
          }}
          doctorRevenue ={{
            isDoctorRevenueLoading:isDoctorRevenueGeneratedLoading,
            doctorRevenueData:doctorRevenueGenerated,
            doctorRevenueErrorMessage:doctorRevenueGeneratedErrorMessage,
            totalRecords:doctorTotalRecords,
            queryParams:doctorQueryParams,
            handlePageChange:this.handleDoctorRevenuePageChange,
            doctorId:doctorRevenue.doctorId,
            handleDoctorChange:this.handleDoctorChange,
            doctorDropdown:activeDoctorsByHospitalForDropdown,
            fromDate:doctorRevenue.fromDate,
            toDate:doctorRevenue.toDate, 
            handleDateChange:this.handleDateChange
          }}
          onPillsClickHandler={this.onPillsClickHandler}
          handleHospitalChange={this.handleHospitalChange}
          hospitalDropdown={hospitalList}
          hospitalId={hospitalId}
          revenueFilter={this.state.revenueFilter}
          appointmentFilter={this.state.appointmentFilter}
        />
      )
    }
  }

  return ConnectHoc(
    DashBoardDetails,
    [
      'HospitalDropdownReducer',
      'DashboardAppointmentStatisticsReducer',
      'DashboardRegisteredPatientReducer',
      'DashboardRevenueGeneratedDayReducer',
      'DashboardRevenueGeneratedMonthReducer',
      'DashboardRevenueGeneratedWeekReducer',
      'DashboardRevenueGeneratedYearReducer',
      'DashboardRevenueStatisticsReducer',
      'DashboardAppointmentQueueReducer',
      'DashboardRevenueGeneratedByDoctorReducer',
      'DoctorDropdownReducer'
    ],
    {
      fetchDashboardAppointmentStatisticsList,
      fetchDashboardRegisteredPatientList,
      fetchDashboardRevenueDayList,
      fetchDashboardRevenueMonthList,
      fetchDashboardRevenueRefundList,
      fetchDashboardRevenueWeekList,
      fetchDashboardRevenueYearList,
      fetchActiveHospitalsForDropdown,
      fetchAppointmentQueueList,
      fetchActiveDoctorsHospitalWiseForDropdown,
      fetchDashboardDoctorRevenue
    }
  )
}
export default DashBoardHOC
