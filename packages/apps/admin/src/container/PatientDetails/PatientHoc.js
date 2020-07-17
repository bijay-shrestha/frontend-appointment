import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  HospitalSetupMiddleware,
  PatientDetailsMiddleware,
  AppointmentDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  DateTimeFormatterUtils
} from '@frontend-appointment/helpers'
import './patient-detail.scss'
import {CAlert} from '@frontend-appointment/ui-elements'

const {
  clearPatientDetails,
  clearPatientPreview,
  editPatient,
  clearPatientEdit,
  fetchPatientMetaList,
  previewPatient,
  fetchPatientMetaDropdown,
  fetchEsewaDetails
} = PatientDetailsMiddleware

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {appointmentExcelDownload} = AppointmentDetailsMiddleware
const PatientDetailsHOC = (ComposedComponent, props, type) => {
  const {
    hospitalSetupApiConstants,
    patientSetupApiConstant
  } = AdminModuleAPIConstants

  class PatientDetails extends React.PureComponent {
    state = {
      searchParameters: {
        esewaId: '',
        hospitalId: '',
        patientMetaInfoId: '',
        status: {value: 'A', label: 'All'}
      },
      patientUpdate: {
        id: '',
        name: '',
        dateOfBirth: '',
        mobileNumber: '',
        address: '',
        gender: '',
        hospitalNumber: '',
        email: '',
        status: '',
        remarks: '',
        hospitalId: ''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      errorMessageForMobileNumber: 'Number Should be valid and only 10 digit',
      errorMessageForName: 'Name Should only contain alphabet',
      totalRecords: 0,
      showModal: false,
      previewData: {},
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showAlert: false,
      previewModalShow: false,
      editModalShow: false,
      formValid: false,
      mobileNumberValid: false,
      nameValid: false,
      hospitalNumber: false
    }

    alertTimer = ''

    clearAlertTimeout = () => {
      this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
    }

    closeAlert = () => {
      this.showOrCloseAlertMessage(false, '', '')
    }

    showOrCloseAlertMessage = (showAlert, type, message) => {
      this.setState({
        showAlert,
        alertMessageInfo: {
          variant: type,
          message: message
        }
      })
      this.clearAlertTimeout()
    }


    setShowAlert = () => {
      this.setState(prevState => ({
        showAlert: !prevState.showAlert
      }))
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

    searchPatient = async page => {
      const {
        esewaId,
        hospitalId,
        patientMetaInfoId,
        status
      } = this.state.searchParameters
      let searchData = {
        esewaId: esewaId.label || '',
        hospitalId: hospitalId.value || '',
        patientMetaInfoId: patientMetaInfoId.value || '',
        status: status && status.value === 'A' ? '' : status.value
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchPatientMetaList(
        patientSetupApiConstant.SEARCH_PATIENT_INFO,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )
      await this.setState({
        totalRecords: this.props.PatientSearchReducer.patientSearchList.length
          ? this.props.PatientSearchReducer.patientSearchList[0].totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    appendSNToTable = patientSearchList => {
      let patientList =
        patientSearchList.length &&
        patientSearchList.map((patient, index) => ({
          ...patient,
          id: patient.id || 'N/A',
          patientName: patient.name || 'N/A',
          address: patient.address || 'N/A',
          email: patient.email || 'N/A',
          registrationNumber: patient.registrationNumber || 'N/A',
          mobileNumber: patient.mobileNumber || 'N/A',
          esewaId: patient.esewaId || 'N/A',
          age: patient.age ? patient.age.slice(0, 4) : 'N/A',
          status: patient.status || 'N/A',
          hospitalNumber: patient.hospitalNumber || 'N/A',
          hospitalName: patient.hospitalName || 'N/A',
          dateOfBirth: patient.dateOfBirth || 'N/A',
          sN: index + 1,
          gender: patient.gender ? patient.gender.split('')[0] : 'N/A'
        }))
      return patientList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchPatient()
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          esewaId: '',
          hospitalId: '',
          patientMetaInfoId: '',
          status: {value: 'A', label: 'All'}
        }
      })
      this.searchPatient()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    previewApiCall = async id => {
      this.props.clearPatientPreview()
      await this.props.previewPatient(
        patientSetupApiConstant.PREVIEW_PATIENT_DETAIL_BY_ID,
        id
      )
    }

    previewHandler = async id => {
      await this.previewApiCall(id)
      this.setState({
        previewModalShow: true,
        previewData: this.props.PatientPreviewReducer.patientPreviewData
      })
    }

    handleHospitalChangeReset = async () => {
      await this.setState({
        searchParameters: {
          ...this.state.searchParameters,
          patientMetaInfoId: '',
          esewaId: ''
        }
      })
    }

    callApiForHospitalChange = async hospitalId => {
      this.props.fetchPatientMetaDropdown(
        patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS,
        hospitalId
      )
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
          if (fieldName === 'hospitalId') {
            await this.callApiForHospitalChange(value)
            await this.searchEsewaId(value)
          }
        }
        let searchParams = {...this.state.searchParameters}
        if (fieldName === 'hospitalId')
          await this.handleHospitalChangeReset(searchParams)

        let newSearchParams = {...this.state.searchParameters}

        newSearchParams[fieldName] = label
          ? value
            ? {value, label}
            : ''
          : value
        await this.setStateValuesForSearch(newSearchParams)
      }
    }

    setShowModal = () => {
      this.setState(prevState => ({
        previewModalShow: false,
        editModalShow: false
      }))
    }

    checkFormValidity = eventType => {
      const {patientUpdate, mobileNumberValid, nameValid} = this.state
      const {
        address,
        dateOfBirth,
        email,
        gender,
        hospitalId,
        hospitalNumber,
        id,
        mobileNumber,
        name,
        remarks,
        status
      } = patientUpdate
      let formValidity =
        address &&
        dateOfBirth &&
        email &&
        gender &&
        hospitalId &&
        hospitalNumber &&
        id &&
        mobileNumber &&
        name &&
        remarks &&
        status &&
        mobileNumberValid &&
        nameValid
      this.setState({
        formValid: formValidity
      })
    }

    checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
      let stateObj = {[fieldName]: valueToChange}
      if (eventName)
        if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
      if (eventName === 'mobileNumber')
        stateObj = {...stateObj, mobileNumberValid: valid}
      return {...stateObj}
    }

    setTheState = async (fieldName, valueToChange, valid, eventName) => {
      await this.setState(
        this.checkInputValidity(fieldName, valueToChange, valid, eventName)
      )
    }

    handleOnChange = async (event, fieldValid, eventType, field) => {
      let patientData = {...this.state.patientUpdate}
      let name, value, label
      if (field) {
        name = field
        value = event
      } else {
        name = event.target.name
        value = event.target.value
        label = event.target.label
      }

      patientData[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState('patientUpdate', patientData, fieldValid, name)
      this.checkFormValidity(eventType)
    }

    editHandler = async id => {
      this.props.clearPatientEdit()
      await this.previewApiCall(id)
      if (this.props.PatientPreviewReducer.patientPreviewData) {
        const {
          name,
          gender,
          address,
          email,
          mobileNumber,
          status,
          hospitalNumber,
          dateOfBirth,
          hospitalId,
          remarks
        } = this.props.PatientPreviewReducer.patientPreviewData
        let nameValid = false,
          mobileNumberValid = false
        if (name) nameValid = true
        if (mobileNumber) mobileNumberValid = true
        this.setState({
          patientUpdate: {
            id: id,
            name: name,
            dateOfBirth: new Date(dateOfBirth),
            mobileNumber: mobileNumber,
            address: address,
            gender: gender,
            email: email,
            hospitalNumber: hospitalNumber,
            status: status,
            remarks: remarks,
            hospitalId: hospitalId
          },
          nameValid: nameValid,
          mobileNumberValid: mobileNumberValid,
          editModalShow: true
        })
      }
      this.checkFormValidity()
    }

    editHandleApi = async () => {
      try {
        await this.props.editPatient(
          patientSetupApiConstant.UPDATE_PATIENT_DETAIL_BY_ID,
          this.state.patientUpdate
        )
        await this.setShowModal()
        await this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.PatientEditReducer.patientSuccessMessage
          }
        })
        await this.searchPatient()
      } catch (e) {}
    }

    searchEsewaId = async value => {
      if (value) {
        await this.props.fetchEsewaDetails(
          patientSetupApiConstant.FETCH_PATIENT_ESEWA_ID_FOR_DROPDOWN,
          value
        )
      }
    }

    downloadExcel = async () => {
      const {
        esewaId,
        hospitalId,
        patientMetaInfoId,
        status
      } = this.state.searchParameters
      let searchData = {
        esewaId: esewaId.label || '',
        hospitalId: hospitalId.value || '',
        patientMetaInfoId: patientMetaInfoId.value || '',
        status: status && status.value === 'A' ? '' : status.value
      }

      try {
        await appointmentExcelDownload(
          AdminModuleAPIConstants.excelApiConstants.PATIENT_LOG_EXCEL,
          this.state.queryParams,
          searchData,
          `patientDetails-${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            new Date().toLocaleString()
          )}-${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            new Date().toLocaleString()
          )}`
        )
        this.showOrCloseAlertMessage(
          true,
          'success',
          `patientDetails ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            new Date().toLocaleDateString()
          )} - ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
           new Date().toLocaleDateString()
          )} downloaded successfully!!`
        )
        return false
      } catch (e) {
        this.showOrCloseAlertMessage(
          true,
          'danger',
           e.errorMessage||'Sorry Internal Server Error!!'
        )
        return false
      }
    }

    async componentDidMount () {
      await this.searchPatient()
      await this.searchHospitalForDropDown()
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        previewModalShow,
        editModalShow,
        previewData,
        alertMessageInfo,
        showAlert,
        patientUpdate,
        formValid,
        errorMessageForMobileNumber,
        errorMessageForName
      } = this.state

      const {
        patientSearchList,
        isPatientSearchLoading,
        patientSearchErrorMessage
      } = this.props.PatientSearchReducer

      const {
        isPatientPreviewLoading,
        patientPreviewErrorMessage
      } = this.props.PatientPreviewReducer

      const {
        patientSuccessMessage,
        isPatientEditLoading,
        patientEditErrorMessage
      } = this.props.PatientEditReducer

      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      const {esewaIdDropdown} = this.props.PatientEsewaIdReducer
      const {
        patientList,
        patientDropdownErrorMessage
      } = this.props.PatientDropdownListReducer
      return (
        <>
          <ComposedComponent
            {...this.props}
            {...props}
            searchHandler={{
              handleEnter: this.handleEnterPress,
              handleSearchFormChange: this.handleSearchFormChange,
              resetSearch: this.handleSearchFormReset,
              searchPatient: this.searchPatient,
              hospitalsDropdown: hospitalsForDropdown,
              searchParameters: searchParameters,
              patientListDropdown: patientList,
              patientDropdownErrorMessage: patientDropdownErrorMessage,
              esewaIdDropdown: esewaIdDropdown
            }}
            paginationProps={{
              queryParams: queryParams,
              totalRecords: totalRecords,
              handlePageChange: this.handlePageChange
            }}
            tableHandler={{
              isSearchLoading: isPatientSearchLoading,
              patientSearchList: this.appendSNToTable(patientSearchList),
              searchErrorMessage: patientSearchErrorMessage,
              setShowModal: this.setShowModal,
              showModal: previewModalShow,
              previewCall: this.previewHandler,
              previewData: previewData,
              previewErrorMsg: patientPreviewErrorMessage,
              previewLoading: isPatientPreviewLoading,
              patientSuccessMessage: patientSuccessMessage,
              isPatientEditLoading: isPatientEditLoading,
              patientEditErrorMessage: patientEditErrorMessage,
              editHandler: this.editHandler,
              editModal: editModalShow,
              patientUpdate: patientUpdate,
              hospitalsDropdown: hospitalsForDropdown,
              errorMessageForMobileNumber: errorMessageForMobileNumber,
              errorMessageForName: errorMessageForName,
              formValid: formValid,
              editChange: this.handleOnChange,
              handleEnter: this.handleEnterPress,
              editHandleApi: this.editHandleApi,
              downloadExcel: this.downloadExcel
            }}
          />
          <CAlert
            id="profile-add"
            variant={alertMessageInfo.variant}
            show={showAlert}
            onClose={this.setShowAlert}
            alertType={
              alertMessageInfo.variant === 'success' ? (
                <>
                  <i className="fa fa-check-circle" aria-hidden="true">
                    {' '}
                  </i>
                </>
              ) : (
                <>
                  <i className="fa fa-exclamation-triangle" aria-hidden="true">
                    {' '}
                  </i>
                </>
              )
            }
            message={alertMessageInfo.message}
          />
        </>
      )
    }
  }

  return ConnectHoc(
    PatientDetails,
    [
      'PatientDropdownListReducer',
      'PatientEditReducer',
      'PatientPreviewReducer',
      'PatientSearchReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'HospitalDropdownReducer',
      'PatientDropdownListReducer',
      'PatientEsewaIdReducer'
    ],
    {
      clearPatientDetails,
      clearPatientEdit,
      clearPatientPreview,
      editPatient,
      fetchPatientMetaList,
      fetchPatientMetaDropdown,
      previewPatient,
      fetchActiveHospitalsForDropdown,
      fetchEsewaDetails
    }
  )
}
export default PatientDetailsHOC
