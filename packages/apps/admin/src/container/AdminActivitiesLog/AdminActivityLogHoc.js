import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {AdminLoggingMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils
  //FileExportUtils
} from '@frontend-appointment/helpers'
import './activity-log.scss'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchAdminLog, fetchAdminLogStatistics} = AdminLoggingMiddleware
const AdminActivityLogHOC = (ComposedComponent, props, type) => {
  const {
    hospitalSetupApiConstants,
    adminLoggingConstant
  } = AdminModuleAPIConstants

  class AdminActivityLogDetails extends React.PureComponent {
    state = {
      searchParameters: {
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        toDate: new Date(),
        hospitalId: '',
        parentId: '',
        roleId: '',
        userName: ''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      totalRecords: 0,
      showModal: false,
      previewData: {}
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

    searchAdminActivityLog = async (page, pageChange) => {
      const {
        fromDate,
        hospitalId,
        parentId,
        roleId,
        toDate,
        userName
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        fromDate,
        toDate,
        userName,
        hospitalId: hospitalId.value || '',
        parentId: parentId.value || '',
        roleId: roleId.value || ''
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchAdminLog(
        adminLoggingConstant.FETCH_ADMIN_LOG,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )

      await this.setState({
        totalRecords: this.props.AdminLoggingSearchReducer.logSearchData.length
          ? this.props.AdminLoggingSearchReducer.logSearchData.totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })

      if (!pageChange) {
        await this.props.fetchAdminLogStatistics(
          adminLoggingConstant.FETCH_ADMIN_LOG_STATS,
          searchData
        )
      }
    }

    appendSNToTable = logList => {
      let newLogList = []
      newLogList =
        logList.length &&
        logList.map((spec, index) => ({
          ...spec,
          sN: index + 1
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
      this.searchAdminActivityLog('', true)
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentNumber: '',
          fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
          toDate: new Date(),
          hospitalId: '',
          parentId: '',
          roleId: '',
          userName: ''
        }
      })
      this.searchAdminActivityLog()
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

    handleSearchFormChange = async (event, field) => {
      if (event) {
        let fieldName, value, label
        if (field) {
          fieldName = field
          value = event
        } else {
          fieldName = event.target.name
          value = event.target.value
          label = event.target.label
        }
        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        await this.setStateValuesForSearch(newSearchParams)
      }
    }

    setShowModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }))
    }

    async componentDidMount () {
      await this.searchAdminActivityLog()
      await this.searchHospitalForDropDown()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        previewData
      } = this.state

      const {
        isLogSearchSearchLoading,
        logSearchData,
        logSearchErrorMessage
      } = this.props.AdminLoggingSearchReducer

      const {
        isLogStatsSearchSearchLoading,
        logStatsSearchData,
        logStatsSearchErrorMessage
      } = this.props.AdminLoggingStatSearchReducer
      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      return (
        <div id="admin-acitivity-log">
          <ComposedComponent
            {...this.props}
            {...props}
            searchHandler={{
              handleEnter: this.handleEnterPress,
              handleSearchFormChange: this.handleSearchFormChange,
              resetSearch: this.handleSearchFormReset,
              searchAdminActivityLog: this.searchAdminActivityLog,
              hospitalsDropdown: hospitalsForDropdown,
              searchParameters: searchParameters
            }}
            paginationProps={{
              queryParams: queryParams,
              totalRecords: totalRecords,
              handlePageChange: this.handlePageChange
            }}
            adminLogData={{
              isSearchLoading: isLogSearchSearchLoading,
              logList: this.appendSNToTable(logSearchData),
              searchErrorMessage: logSearchErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: previewData
            }}
            adminLogStatsData={{
              isLogStatsSearchSearchLoading: isLogStatsSearchSearchLoading,
              logStatsSearchData: logStatsSearchData,
              logStatsSearchErrorMessage: logStatsSearchErrorMessage
            }}
          />
        </div>
      )
    }
  }

  return ConnectHoc(
    AdminActivityLogDetails,
    [
      'HospitalDropdownReducer',
      'AdminLoggingStatSearchReducer',
      'AdminLoggingSearchReducer'
    ],
    {
      fetchActiveHospitalsForDropdown,
      fetchAdminLog,
      fetchAdminLogStatistics
    }
  )
}
export default AdminActivityLogHOC
