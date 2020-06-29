import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  DashboardDetailsMiddleware,
  DoctorMiddleware,
  SpecializationSetupMiddleware,
  AppointmentServiceTypeMiddleware,
  HospitalDepartmentSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  checkDashboardRole,
  DateTimeFormatterUtils,
  LocalStorageSecurity,
  CommonUtils
} from '@frontend-appointment/helpers'
import {CNoDashboardRoleContent} from '@frontend-appointment/ui-components'
const {getPrimaryServiceType} = CommonUtils
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware
const {
  fetchActiveHospitalDepartmentForDropdown
} = HospitalDepartmentSetupMiddleware
const {
  fetchDashboardAppointmentStatisticsList,
  fetchDashboardRevenueDayList,
  fetchDashboardRevenueMonthList,
  fetchDashboardRevenueRefundList,
  fetchDashboardRevenueWeekList,
  fetchDashboardRevenueYearList,
  fetchAppointmentQueueList,
  clearDashboardDoctorRevenue,
  fetchDashboardDoctorRevenue,
  fetchDashboardRegisteredPatientListForClient,
  fetchDashboardDepartmentRevenue,
  clearDashboardDepartmentRevenue
} = DashboardDetailsMiddleware
const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {
  fetchActiveAppointmentServiceTypeWithCode
} = AppointmentServiceTypeMiddleware
const ClientDashboardHoc = (ComposedComponent, props, type) => {
  const {
    DashboardApiConstant,
    doctorSetupApiConstants,
    specializationSetupAPIConstants
  } = AdminModuleAPIConstants
  const ACCESSCODE = {
    REVENUE_STAT: 'REVSTAT',
    PATIENT_STAT: 'PATIENTSTAT',
    APPOINTMENT_LOG: 'APPNTQUEUELOG'
  }

  class ClientDashboardHoc extends React.PureComponent {
    state = {
      searchParameterForGenerateRevenue: {
        currentToDate: new Date(),
        currentFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 0),
        previousToDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
        previousFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
        appointmentServiceTypeCode: getPrimaryServiceType()
      },
      searchParamsForOverallAppoinment: {
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 6),
        toDate: new Date(),
        appointmentServiceTypeCode: getPrimaryServiceType()
      },
      searchParameterForRevenueTrend: {
        revFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 6),
        revToDate: new Date(),
        appointmentServiceTypeCode: getPrimaryServiceType()
      },
      appointmentQueue: {
        appointmentServiceTypeCode: getPrimaryServiceType(),
        doctorId: '',
        hospitalDepartmentId: '',
        date: new Date()
      },
      revenueFilter: 'W',
      appointmentFilter: 'W',
      queryParams: {
        page: 0,
        size: 6
      },
      doctorRevenue: {
        doctorId: '',
        hospitalId: 0,
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
        toDate: new Date(),
        specializationId: 0
      },
      departmentRevenue: {
        hospitalDepartmentId: '',
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
        toDate: new Date()
      },
      doctorQueryParams: {
        page: 0,
        size: 3
      },
      departmentQueryParams: {
        page: 0,
        size: 3
      },
      doctorTotalRecords: 0,
      doctorTotalAppointments: 0,
      doctorTotalRevenueAmount: 0,
      doctorTotalFollowUp: 0,
      departmentTotalRecords: 0,
      departmentTotalAppointments: 0,
      deparmentRevenueAmount: 0,
      departmentTotalFollowUp: 0
    }

    handleAppointmentServiceChange = async e => {
      //this.props.clearDashboardDoctorRevenue()
      const {value, label} = e.target
      const {
        appointmentQueue,
        searchParameterForGenerateRevenue,
        searchParameterForRevenueTrend,
        searchParamsForOverallAppoinment
      } = this.state

      let revenuGenerate = {...searchParameterForGenerateRevenue}
      let queueAppointmentment = {...appointmentQueue}
      let revenueTrend = {...searchParameterForRevenueTrend}
      let overAllAppointment = {...searchParamsForOverallAppoinment}
      const appointmentServiceTypeCode = value ? {value, label} : ''
      revenuGenerate.appointmentServiceTypeCode = appointmentServiceTypeCode
      queueAppointmentment.appointmentServiceTypeCode = appointmentServiceTypeCode
      queueAppointmentment.doctorId = ''
      queueAppointmentment.hospitalDepartmentId = ''
      revenueTrend.appointmentServiceTypeCode = appointmentServiceTypeCode
      overAllAppointment.appointmentServiceTypeCode = appointmentServiceTypeCode
      await this.setState({
        appointmentQueue: queueAppointmentment,
        searchParameterForGenerateRevenue: revenuGenerate,
        searchParameterForRevenueTrend: revenueTrend,
        searchParamsForOverallAppoinment: overAllAppointment,
        doctorRevenue: {
          doctorId: '',
          hospitalId: 0,
          fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
          toDate: new Date(),
          specializationId: 0
        },
        departmentRevenue: {
          hospitalDepartmentId: '',
          fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
          toDate: new Date()
        }
      })

      await this.fetchDashboardData()
      if (value === 'DOC') {
        await this.searchDoctorRevenueList()
      } else {
        await this.searchDepartmentRevenueList()
      }
    }

    fetchDashboardData = statsType => {
      const {
        fromDate,
        toDate,
        appointmentServiceTypeCode
      } = this.state.searchParamsForOverallAppoinment

      const {revFromDate, revToDate} = this.state.searchParameterForRevenueTrend

      //const adminInfo = LocalStorageSecurity.localStorageDecoder('adminInfo')
      //const appointmentServiceTypeCode = adminInfo.hospitalId
      if (checkDashboardRole(ACCESSCODE.PATIENT_STAT)) {
        if (!statsType || statsType !== 'refund')
          this.props.fetchDashboardAppointmentStatisticsList(
            DashboardApiConstant.OVERALL_APPOINTMENTS,
            {
              fromDate,
              toDate,
              appointmentServiceTypeCode: appointmentServiceTypeCode.value || ''
            }
          )
      }
      if (checkDashboardRole(ACCESSCODE.REVENUE_STAT)) {
        if (!statsType || statsType === 'refund')
          this.props.fetchDashboardRevenueRefundList(
            DashboardApiConstant.REVENUE_STATISTICS,
            {
              fromDate: revFromDate,
              toDate: revToDate,
              appointmentServiceTypeCode: appointmentServiceTypeCode.value || ''
            }
          )
      }
      if (!statsType) {
        if (checkDashboardRole(ACCESSCODE.PATIENT_STAT)) {
          this.props.fetchDashboardRegisteredPatientListForClient(
            DashboardApiConstant.REGISTERED_PATIENTS
          )
        }
        if (checkDashboardRole(ACCESSCODE.REVENUE_STAT)) {
          this.props.fetchDashboardRevenueDayList(
            DashboardApiConstant.REVENUE_GENERATED,
            {
              currentToDate: new Date(),
              currentFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                0
              ),
              previousToDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                1
              ),
              previousFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                1
              ),
              appointmentServiceTypeCode: appointmentServiceTypeCode.value || ''
            }
          )
          this.props.fetchDashboardRevenueWeekList(
            DashboardApiConstant.REVENUE_GENERATED,
            {
              currentToDate: new Date(),
              currentFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                6
              ),
              previousToDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                6
              ),
              previousFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                12
              ),
              appointmentServiceTypeCode: appointmentServiceTypeCode.value || ''
            }
          )
          this.props.fetchDashboardRevenueMonthList(
            DashboardApiConstant.REVENUE_GENERATED,
            {
              currentToDate: new Date(),
              currentFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                31
              ),
              previousToDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                31
              ),
              previousFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                60
              ),
              appointmentServiceTypeCode: appointmentServiceTypeCode.value || ''
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
                366
              ),
              previousFromDate: DateTimeFormatterUtils.subtractDate(
                new Date(),
                731
              ),
              appointmentServiceTypeCode: appointmentServiceTypeCode.value || ''
            }
          )
        }
      }
    }

    filterDateAccordingToDayFilter = dayFilter => {
      let searchParameterChange = {
        fromDate: '',
        toDate: '',
        hospitalId: this.state.searchParamsForOverallAppoinment.hospitalId,
        appointmentServiceTypeCode: this.state.searchParamsForOverallAppoinment
          .appointmentServiceTypeCode
      }
      switch (dayFilter) {
        case 'D':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 1),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId,
            appointmentServiceTypeCode:
              searchParameterChange.appointmentServiceTypeCode
          }
          break
        case 'W':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 6),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId,
            appointmentServiceTypeCode:
              searchParameterChange.appointmentServiceTypeCode
          }
          break
        case 'M':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 31),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId,
            appointmentServiceTypeCode:
              searchParameterChange.appointmentServiceTypeCode
          }
          break
        case 'Y':
          searchParameterChange = {
            fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 366),
            toDate: new Date(),
            hospitalId: searchParameterChange.hospitalId,
            appointmentServiceTypeCode:
              searchParameterChange.appointmentServiceTypeCode
          }
          break
        default:
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
          this.fetchDashboardData(type)
        }
      } else {
        if (this.state.appointmentFilter !== dayFilter) {
          await this.setState({
            searchParamsForOverallAppoinment: {
              ...searchParameter
            },
            appointmentFilter: dayFilter
          })
          this.fetchDashboardData(type)
        }
      }
    }

    // handleHospitalChange = async (event, field) => {
    //   let searchParams1 = {...this.state.searchParameterForGenerateRevenue}
    //   let searchParams = {
    //     ...this.state.searchParamsForOverallAppoinment
    //   }
    //   let searchParams3 = {...this.state.searchParameterForRevenueTrend}
    //   let fieldName, value, label
    //   fieldName = event.target.name
    //   value = event.target.value
    //   label = event.target.label
    //   searchParams[fieldName] = label ? (value ? {value, label} : '') : value
    //   searchParams1[fieldName] = label ? (value ? {value, label} : '') : value
    //   searchParams3[fieldName] = label ? (value ? {value, label} : '') : value
    //   await this.setState({
    //     searchParamsForOverallAppoinment: searchParams,
    //     searchParameterForGenerateRevenue: searchParams1,
    //     searchParameterForRevenueTrend: searchParams3
    //   })
    // }

    searchDoctor = async () => {
      await this.props.fetchActiveDoctorsForDropdown(
        doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
      )
    }
    searchSpecialization = async () => {
      await this.props.fetchSpecializationForDropdown(
        specializationSetupAPIConstants.ACTIVE_DROPDOWN_SPECIALIZATION
      )
    }
    searchAppointmentQueue = async page => {
      if (checkDashboardRole(ACCESSCODE.APPOINTMENT_LOG)) {
        const {
          doctorId,
          hospitalDepartmentId,
          date,
          appointmentServiceTypeCode
        } = this.state.appointmentQueue

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
            date: date || new Date(),
            hospitalDepartmentId: hospitalDepartmentId.value || '',
            appointmentServiceType: appointmentServiceTypeCode.value || ''
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

    handleDateChangeForAppointmentQueue = async (e, fieldName) => {
      let appointmentQueueParam = {...this.state.appointmentQueue}
      appointmentQueueParam[fieldName] = e || ''
      await this.setState({
        appointmentQueue: appointmentQueueParam
      })
      this.searchAppointmentQueue()
    }

    handleDateChangeForDepartmentRevenue = async (e, fieldName) => {
      let departmentRevenueParam = {...this.state.departmentRevenue}
      departmentRevenueParam[fieldName] = e || ''
      await this.setState({
        departmentRevenue: departmentRevenueParam
      })
      this.searchDepartmentRevenueList()
    }

    handlePageChangeForDeparmentRevenue = async newPage => {
      await this.setState({
        departmentQueryParams: {
          ...this.state.departmentQueryParams,
          page: newPage
        }
      })
      this.searchAppointmentQueue()
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchAppointmentQueue()
    }

    handleDoctorChange = async (event, types) => {
      let searchParams = {
        ...this.state.appointmentQueue
      }

      let searchParamsForDoctor = {
        ...this.state.doctorRevenue
      }

      let fieldName, value, label, fileUri
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      fileUri = event.target.fileUri
      if (types === 'Q') {
        searchParams[fieldName] = label
          ? value
            ? fileUri
              ? {value, label, fileUri}
              : {value, label}
            : ''
          : value
        searchParams.hospitalDepartmentId = ''
        await this.setState({
          appointmentQueue: searchParams
        })
      } else {
        searchParamsForDoctor[fieldName] = label
          ? value
            ? fileUri
              ? {value, label, fileUri}
              : {value, label}
            : ''
          : value
        await this.setState({
          doctorRevenue: searchParamsForDoctor
        })
      }

      if (fieldName === 'doctorId')
        if (types === 'Q') {
          this.searchAppointmentQueue()
        } else {
          this.searchDoctorRevenueList()
        }
    }

    handleDepartmentChange = async (event, types) => {
      let searchParams = {
        ...this.state.appointmentQueue
      }

      let searchParamsForDepartment = {
        ...this.state.departmentRevenue
      }

      let fieldName, value, label // fileUri
      fieldName = event.target.name
      value = event.target.value
      label = event.target.label
      //fileUri = event.target.fileUri
      if (types === 'Q') {
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        searchParams.doctorId = ''
        await this.setState({
          appointmentQueue: searchParams
        })
      } else {
        searchParamsForDepartment[fieldName] = value ? {value, label} : ''
        await this.setState({
          departmentRevenue: searchParamsForDepartment
        })
      }

      if (fieldName === 'hospitalDepartmentId')
        if (types === 'Q') {
          this.searchAppointmentQueue()
        } else {
          this.searchDepartmentRevenueList()
        }
    }

    searchDoctorRevenueList = async page => {
      if (checkDashboardRole(ACCESSCODE.REVENUE_STAT)) {
        this.props.clearDashboardDoctorRevenue()
        const {
          doctorId,
          fromDate,
          toDate,
          specializationId
        } = this.state.doctorRevenue
        let response = ''

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
              size: this.state.doctorQueryParams.size,
              doctorId: doctorId ? doctorId.value : 0,
              fromDate: DateTimeFormatterUtils.getFormattedDate(fromDate),
              toDate: DateTimeFormatterUtils.getFormattedDate(toDate),
              specializationId: specializationId ? specializationId.value : 0
            }
          )
          await this.setState({
            doctorTotalRecords: this.props
              .DashboardRevenueGeneratedByDoctorReducer
              .totalItemsDoctorsRevenue,
            doctorTotalAppointments: this.props
              .DashboardRevenueGeneratedByDoctorReducer.overallAppointment,
            doctorTotalRevenueAmount: this.props
              .DashboardRevenueGeneratedByDoctorReducer.totalRevenueAmount,
            doctorTotalFollowUp: this.props
              .DashboardRevenueGeneratedByDoctorReducer.totalFollowUp,
            doctorQueryParams: {
              ...this.state.doctorQueryParams,
              page: updatedPage
            }
          })
          return response
        } catch (e) {}
      }
    }

    searchDepartmentRevenueList = async page => {
      if (checkDashboardRole(ACCESSCODE.REVENUE_STAT)) {
        this.props.clearDashboardDepartmentRevenue()
        const {
          hospitalDepartmentId,
          fromDate,
          toDate
        } = this.state.departmentRevenue
        let response = ''

        let updatedPage =
          this.state.departmentQueryParams.page === 0
            ? 1
            : page
            ? page
            : this.state.departmentQueryParams.page
        try {
          response = await this.props.fetchDashboardDepartmentRevenue(
            DashboardApiConstant.DEPARTMENT_REVENUE,
            {
              page: updatedPage,
              size: this.state.departmentQueryParams.size,
              hospitalDepartmentId: hospitalDepartmentId
                ? hospitalDepartmentId.value
                : 0,
              fromDate: DateTimeFormatterUtils.getFormattedDate(fromDate),
              toDate: DateTimeFormatterUtils.getFormattedDate(toDate)
            }
          )
          const {
            totalItemsDepartment,
            totalAmountDepartment,
            overallAppointmentDepartment,
            totalFollowUpDepartment
          } = this.props.DepartmentRevenuGeneratedReducer
          await this.setState({
            departmentTotalRecords: totalItemsDepartment,
            departmentTotalAppointments: overallAppointmentDepartment,
            deparmentRevenueAmount: totalAmountDepartment,
            departmentTotalFollowUp: totalFollowUpDepartment,
            departmentQueryParams: {
              ...this.state.departmentQueryParams,
              page: updatedPage
            }
          })
          return response
        } catch (e) {}
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

    handleDateChange = async (e, fieldName) => {
      let doctorRevenueParam = {...this.state.doctorRevenue}
      doctorRevenueParam[fieldName] = e || ''
      await this.setState({
        doctorRevenue: doctorRevenueParam
      })
      this.searchDoctorRevenueList()
    }

    handleSpecializationChange = async e => {
      let specializationParam = {...this.state.doctorRevenue}
      const {name, value, label} = e.target
      specializationParam[name] = value ? {value: value, label: label} : ''
      await this.setState({
        doctorRevenue: specializationParam
      })
      this.searchDoctorRevenueList()
    }

    searchDepartment = async () => {
      await this.props.fetchActiveHospitalDepartmentForDropdown(
        AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants
          .FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN
      )
    }

    searchAppointmentServiceType = async () => {
      await this.props.fetchActiveAppointmentServiceTypeWithCode(
        AdminModuleAPIConstants.appointmentServiceTypeApiConstants
          .FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_WITH_CODE
      )
    }

    componentDidMount () {
      this.searchDoctor()
      this.searchSpecialization()
      this.searchAppointmentQueue()

      this.fetchDashboardData()
      this.searchAppointmentServiceType()
      this.searchDepartment()
      if (getPrimaryServiceType().value === 'DOC') {
        this.searchDoctorRevenueList()
      } else {
        this.searchDepartmentRevenueList()
      }
    }

    render () {
      const {
        searchParameterForGenerateRevenue,
        searchParamsForOverallAppoinment,
        searchParameterForRevenueTrend,
        hospitalList,
        queryParams,
        totalRecords,
        doctorQueryParams,
        doctorRevenue,
        doctorTotalAppointments,
        doctorTotalRecords,
        doctorTotalRevenueAmount,
        doctorTotalFollowUp,
        deparmentRevenueAmount,
        departmentQueryParams,
        departmentRevenue,
        departmentTotalAppointments,
        departmentTotalFollowUp,
        departmentTotalRecords
      } = this.state
      const {revFromDate, revToDate} = searchParameterForRevenueTrend

      const {
        currentToDate,
        previousFromDate,
        hospitalId,
        appointmentServiceTypeCode
      } = searchParameterForGenerateRevenue
      const {fromDate, toDate} = searchParamsForOverallAppoinment
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
        doctorRevenueGeneratedErrorMessage
      } = this.props.DashboardRevenueGeneratedByDoctorReducer

      const {
        isDepartmentRevenueGeneratedLoading,
        departmentRevenueGenerated,
        departmentRevenueGeneratedErrorMessage
      } = this.props.DepartmentRevenuGeneratedReducer

      const {activeDoctorsForDropdown} = this.props.DoctorDropdownReducer
      const {
        activeAppointmentServiceTypeWithCodeForDropdown
      } = this.props.AppointmentServiceTypeDropdownReducer

      const dashBoardRoles = LocalStorageSecurity.localStorageDecoder(
        'adminDashRole'
      )
      const {
        // isFetchAllHospitalDepartmentLoading,
        activeHospitalDepartmentForDropdown
        //allDepartmentDropdownErrorMessage
      } = this.props.HospitalDepartmentDropdownReducer

      console.log(
        '=======hospitalDepartmentDropdown',
        this.props.HospitalDepartmentDropdownReducer
      )

      return (
        <>
          {dashBoardRoles && dashBoardRoles.length ? (
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
                revenueGeneratedYearErrorMessage: revenueGeneratedYearErrorMessage,
                code: ACCESSCODE.REVENUE_STAT
              }}
              appointmentList={{
                isAppointmentStatsLoading: isAppointmentStatsLoading,
                appointmentStatsData: appointmentStatsData,
                appointmentStatsErrorMessage: appointmentStatsErrorMessage,
                fromDate: {fromDate},
                toDate: {toDate},
                code: ACCESSCODE.PATIENT_STAT
              }}
              revenueStatistics={{
                isRevenueStatsLoading: isRevenueStatsLoading,
                revenueStatsData: revenueStatsData,
                revenueStatsErrorMessage: revenueStatsErrorMessage,
                fromDate: {revFromDate},
                toDate: {revToDate},
                code: ACCESSCODE.REVENUE_STAT
              }}
              registeredPatients={{
                isRegisteredPatientLoading: isRegisteredPatientLoading,
                registeredPatientsData: registeredPatientsData,
                registeredPatientsErrorMessage: registeredPatientsErrorMessage,
                code: ACCESSCODE.PATIENT_STAT
              }}
              appointmentQueue={{
                isAppointmentQueueLoading: isAppointmentQueueLoading,
                appointmentQueueData: appointmentQueueData,
                appointmentQueueErrorMessage: appointmentQueueErrorMessage,
                totalRecords: totalRecords,
                queryParams: queryParams,
                departmentDropdown: activeHospitalDepartmentForDropdown,
                hospitalDepartmentId: this.state.appointmentQueue
                  .hospitalDepartmentId,
                handlePageChange: this.handlePageChange,
                handleDoctorChange: this.handleDoctorChange,
                handleDepartmentChange: this.handleDepartmentChange,
                doctorId: this.state.appointmentQueue.doctorId,
                date: this.state.appointmentQueue.date,
                doctorDropdown: activeDoctorsForDropdown,
                code: ACCESSCODE.APPOINTMENT_LOG,
                handleDateChangeForAppointmentQueue: this
                  .handleDateChangeForAppointmentQueue
              }}
              doctorRevenue={{
                isDoctorRevenueLoading: isDoctorRevenueGeneratedLoading,
                doctorRevenueData: doctorRevenueGenerated,
                doctorRevenueErrorMessage: doctorRevenueGeneratedErrorMessage,
                totalRecords: doctorTotalRecords,
                queryParams: doctorQueryParams,
                handlePageChange: this.handleDoctorRevenuePageChange,
                doctorId: doctorRevenue.doctorId,
                handleDoctorChange: this.handleDoctorChange,
                doctorDropdown: activeDoctorsForDropdown,
                fromDate: doctorRevenue.fromDate,
                toDate: doctorRevenue.toDate,
                handleDateChange: this.handleDateChange,
                hospitalId: doctorRevenue.hospitalId,
                doctorTotalAppointments: doctorTotalAppointments,
                doctorTotalRevenueAmount: doctorTotalRevenueAmount,
                handleSpecializationChange: this.handleSpecializationChange,
                specializationId: doctorRevenue.specializationId,
                specializationListHospitalWise: this.props
                  .SpecializationDropdownReducer.allActiveSpecializationList,
                doctorTotalFollowUp: doctorTotalFollowUp,
                code: ACCESSCODE.REVENUE_STAT
              }}
              departmentRevenue={{
                isDepartmentRevenueLoading: isDepartmentRevenueGeneratedLoading,
                departmentRevenueData: departmentRevenueGenerated,
                departmentRevenueErrorMessage: departmentRevenueGeneratedErrorMessage,
                totalRecords: departmentTotalRecords,
                queryParams: departmentQueryParams,
                handlePageChange: this.handleDoctorRevenuePageChange,
                hospitalDepartmentId: departmentRevenue.hospitalDepartmentId,
                handleDepartmentChange: this.handleDepartmentChange,
                departmentDropdown: activeHospitalDepartmentForDropdown,
                fromDate: departmentRevenue.fromDate,
                toDate: departmentRevenue.toDate,
                handleDateChange: this.handleDateChangeForDepartmentRevenue,
                departmentTotalAppointments: departmentTotalAppointments,
                departmentTotalRevenueAmount: deparmentRevenueAmount,
                handleSpecializationChange: this.handleSpecializationChange,
                departmentTotalFollowUp: departmentTotalFollowUp,
                code: ACCESSCODE.REVENUE_STAT
              }}
              onPillsClickHandler={this.onPillsClickHandler}
              handleAppointmentServiceChange={
                this.handleAppointmentServiceChange
              }
              hospitalDropdown={hospitalList}
              hospitalId={hospitalId}
              revenueFilter={this.state.revenueFilter}
              appointmentFilter={this.state.appointmentFilter}
              appointmentServiceTypeList={
                activeAppointmentServiceTypeWithCodeForDropdown
              }
              appointmentServiceTypeCode={appointmentServiceTypeCode}
            />
          ) : (
            <CNoDashboardRoleContent />
          )}
        </>
      )
    }
  }

  return ConnectHoc(
    ClientDashboardHoc,
    [
      'DashboardRevenueGeneratedByDoctorReducer',
      'DashboardAppointmentStatisticsReducer',
      'DashboardRegisteredPatientReducer',
      'DashboardRevenueGeneratedDayReducer',
      'DashboardRevenueGeneratedMonthReducer',
      'DashboardRevenueGeneratedWeekReducer',
      'DashboardRevenueGeneratedYearReducer',
      'DashboardRevenueStatisticsReducer',
      'DashboardAppointmentQueueReducer',
      'DoctorDropdownReducer',
      'SpecializationDropdownReducer',
      'AppointmentServiceTypeDropdownReducer',
      'HospitalDepartmentDropdownReducer',
      'DepartmentRevenuGeneratedReducer'
    ],
    {
      fetchDashboardAppointmentStatisticsList,
      fetchDashboardRevenueDayList,
      fetchDashboardRevenueMonthList,
      fetchDashboardRevenueRefundList,
      fetchDashboardRevenueWeekList,
      fetchDashboardRevenueYearList,
      fetchAppointmentQueueList,
      fetchDashboardRegisteredPatientListForClient,
      fetchActiveDoctorsForDropdown,
      clearDashboardDoctorRevenue,
      fetchDashboardDoctorRevenue,
      fetchSpecializationForDropdown,
      fetchActiveAppointmentServiceTypeWithCode,
      fetchActiveHospitalDepartmentForDropdown,
      fetchDashboardDepartmentRevenue,
      clearDashboardDepartmentRevenue
    }
  )
}
export default ClientDashboardHoc
