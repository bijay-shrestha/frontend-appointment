import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  HospitalSetupMiddleware,
  DashboardDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {} from '@frontend-appointment/helpers'
import './admin-dashboard.scss'
import {
  DateTimeFormatterUtils,
  dateHelpers
} from '@frontend-appointment/helpers'

const {
  fetchDashboardAppointmentStatisticsList,
  fetchDashboardRegisteredPatientList,
  fetchDashboardRevenueDayList,
  fetchDashboardRevenueMonthList,
  fetchDashboardRevenueRefundList,
  fetchDashboardRevenueWeekList,
  fetchDashboardRevenueYearList
} = DashboardDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const DashBoardHOC = (ComposedComponent, props, type) => {
  const {
    hospitalSetupApiConstants,
    DashboardApiConstant
  } = AdminModuleAPIConstants

  class DashBoardDetails extends React.PureComponent {
    state = {
      searchParameterForGenerateRevenue: {
        currentToDate: new Date(),
        currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
        previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 2),
        previousFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 3),
        hospitalId: null
      },
      searchParamsForOverallAppoinmentAndRevenueTrend: {
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        toDate: new Date(),
        hospitalId: null
      }
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

    callApiForHospitalChange = () => {
      this.props.fetchDashboardAppointmentStatisticsList(
        DashboardApiConstant.OVERALL_APPOINTMENTS,
        this.state.searchParamsForOverallAppoinmentAndRevenueTrend
      )
      this.props.fetchDashboardRegisteredPatientList(
        DashboardApiConstant.REGISTERED_PATIENTS,
        0
      )
      this.props.fetchDashboardRevenueRefundList(
        DashboardApiConstant.REVENUE_STATISTICS,
        this.state.searchParamsForOverallAppoinmentAndRevenueTrend
      )
      this.props.fetchDashboardRevenueDayList(
        DashboardApiConstant.REVENUE_GENERATED,
        {
          currentToDate: new Date(),
          currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
          previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 2),
          previousFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 3),
          hospitalId: null
        }
      )
      this.props.fetchDashboardRevenueWeekList(
        DashboardApiConstant.REVENUE_GENERATED,
        {
          currentToDate: new Date(),
          currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
          previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 8),
          previousFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 15),
          hospitalId: null
        }
      )
      this.props.fetchDashboardRevenueMonthList(
        DashboardApiConstant.REVENUE_GENERATED,
        {
          currentToDate: new Date(),
          currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 30),
          previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 31),
          previousFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 61),
          hospitalId: null
        }
      )

      this.props.fetchDashboardRevenueYearList(
        DashboardApiConstant.REVENUE_GENERATED,
        {
          currentToDate: new Date(),
          currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 365),
          previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 366),
          previousFromDate: DateTimeFormatterUtils.subtractDate(
            new Date(),
            731
          ),
          hospitalId: null
        }
      )
    }

    onPillsClickHandler = type => {}

    handleHospitalChange = async (event, field) => {
      let searchParams1 = {...this.state.searchParameterForGenerateRevenue}
      let searchParams = {
        ...this.state.searchParamsForOverallAppoinmentAndRevenueTrend
      }
      let fieldName, value, label
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      searchParams[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams1[fieldName] = label ? (value ? {value, label} : '') : value
      await this.setState({
        searchParams,
        searchParams1
      })
      if (fieldName === 'hospitalId') this.callApiForHospitalChange(value)
    }

    componentDidMount () {
      this.callApiForHospitalChange()
      this.searchHospitalForDropDown()
    }

    render () {
      const {
        searchParameterForGenerateRevenue,
        searchParamsForOverallAppoinmentAndRevenueTrend
      } = this.state
      const {fromDate, toDate} = searchParamsForOverallAppoinmentAndRevenueTrend

      const {
        currentFromDate,
        currentToDate,
        previousFromDate,
        previousToDate,
        hospitalId
      } = searchParameterForGenerateRevenue
      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      const {
        isAppointmentStatsLoading,
        appointmentStatsData,
        appointmentStatsErrorMessage
      } = this.props.DashboardAppointmentStatisticsReducer

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
            fromDate: {fromDate},
            toDate: {toDate}
          }}
          registerePatients={{
            isRegisteredPatientLoading: isRegisteredPatientLoading,
            registeredPatientsData: registeredPatientsData,
            registeredPatientsErrorMessage: registeredPatientsErrorMessage
          }}
          onPillsClickHandler={this.onPillsClickHandler}
          handleHospitalChange={this.handleHospitalChange}
          hospitalDropdown={hospitalsForDropdown}
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
      'DashboardRevenueStatisticsReducer'
    ],
    {
      fetchDashboardAppointmentStatisticsList,
      fetchDashboardRegisteredPatientList,
      fetchDashboardRevenueDayList,
      fetchDashboardRevenueMonthList,
      fetchDashboardRevenueRefundList,
      fetchDashboardRevenueWeekList,
      fetchDashboardRevenueYearList,
      fetchActiveHospitalsForDropdown
    }
  )
}
export default DashBoardHOC
