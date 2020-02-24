import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  HospitalSetupMiddleware,
  DashboardDetailsMiddleware,
  DoctorMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {} from '@frontend-appointment/helpers'
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
  fetchAppointmentQueueList
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
        size: 10
      },
      totalRecords: 0
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
              365
            ),
            previousToDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              366
            ),
            previousFromDate: DateTimeFormatterUtils.subtractDate(
              new Date(),
              731
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
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 365),
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
      let fieldName, value, label
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      searchParams[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams1[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams3[fieldName] = label ? (value ? {value, label} : '') : value
      searchParams4[fieldName] = label ? (value ? {value, label} : '') : value
      await this.setState({
        searchParamsForOverallAppoinment: searchParams,
        searchParameterForGenerateRevenue: searchParams1,
        searchParameterForRevenueTrend: searchParams3,
        appointmentQueue: searchParams4
      })
      if (fieldName === 'hospitalId') {
        this.callApiForHospitalChange()
        if (value) {
          this.searchAppointmentQueue()
          this.searchDoctorForHospitalWise(value)
        }
      }
    }

    handleDoctorChange = async (event, field) => {
      let searchParams = {
        ...this.state.appointmentQueue
      }
      let fieldName, value, label
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      searchParams[fieldName] = label ? (value ? {value, label} : '') : value
      await this.setState({
        appointmentQueue: searchParams
      })
      if (
        fieldName === 'doctorId' &&
        this.state.searchParameterForGenerateRevenue.hospitalId
      )
        this.searchAppointmentQueue()
    }

    searchAppointmentQueue = async page => {
      const {doctorId, hospitalId} = this.state.appointmentQueue
      if (hospitalId) {
        let updatedPage =
          this.state.queryParams.page === 0
            ? 1
            : page
            ? page
            : this.state.queryParams.page
        await this.props.fetchAppointmentQueueList(
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
      }
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
            doctorId: this.state.appointmentQueue.doctorId,
            doctorDropdown: activeDoctorsByHospitalForDropdown
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
      fetchActiveDoctorsHospitalWiseForDropdown
    }
  )
}
export default DashBoardHOC
