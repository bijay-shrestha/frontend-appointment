import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  HospitalSetupMiddleware,
  PatientDetailsMiddleware,
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import './patient-detail.scss'
import {CAlert} from '@frontend-appointment/ui-elements'

const {
  clearPatientDetails,
  clearPatientPreview,
  editPatient,
  fetchPatientMetaList,
  previewPatient,
  fetchPatientMetaDropdown
} = PatientDetailsMiddleware

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware

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
        status: {value: '', label: 'All'}
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
      emailValid: false,
      hospitalNumber: false
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
        esewaId,
        hospitalId: hospitalId.value || '',
        patientMetaInfoId: patientMetaInfoId.value || '',
        status: status.value || ''
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
        totalRecords: this.props.PatientSearchReducer.patientSearchList.length,
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
          id: patient.id || 'N/A',
          name: patient.name || 'N/A',
          address: patient.address || 'N/A',
          email: patient.email || 'N/A',
          registrationNumber: patient.registrationNumber || 'N/A',
          mobileNumber: patient.mobileNumber || 'N/A',
          esewaId: patient.esewaId || 'N/A',
          age: patient.age || 'N/A',
          status: patient.status || 'N/A',
          hospitalNumber: patient.hospitalNumber || 'N/A',
          hospitalName:patient.hospitalName || 'N/A',
          dateOfBirth: patient.dateOfBirth || 'N/A',
          sN: index + 1
        }))
      return patientList;
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
          status: {value: '', label: 'All'}
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
          patientMetaInfoId: ''
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
          if (fieldName === 'hospitalId')
            await this.callApiForHospitalChange(value)
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
      const {patientUpdate, mobileNumberValid, emailValid} = this.state
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
        emailValid
      this.setState({
        formValid: formValidity
      })
    }

    checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
      let stateObj = {[fieldName]: valueToChange}
      if (eventName)
        if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
      return {...stateObj}
    }

    setTheState = async (fieldName, valueToChange, valid, eventName) => {
      await this.setState(
        this.checkInputValidity(fieldName, valueToChange, valid, eventName)
      )
    }

    handleOnChange = async (event, fieldValid, eventType) => {
      let patientData = {...this.state.patientUpdate}
      let {name, value, label} = event.target
      patientData[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState('patientUpdate', 'update', fieldValid, name)
      this.checkFormValidity(eventType)
    }

    editHandler = async id => {
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
          hospitalName,
          dateOfBirth,
          hospitalId,
          remarks
        } = this.props.PatientPreviewReducer.patientPreviewData
        this.setState({
          patientUpdate: {
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            mobileNumber: mobileNumber,
            address: address,
            gender: gender,
            email: email,
            hospitalNumber: hospitalNumber,
            status: status,
            remarks: remarks,
            hospitalId: {value: hospitalId, label: hospitalName}
          }
        })
      }
    }

    editHandleApi = async () => {
      try {
        await this.props.editPatient(
          patientSetupApiConstant.UPDATE_PATIENT_DETAIL_BY_ID,
          this.state.previewData
        )
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.PatientEditReducer.patientSuccessMessage
          }
        })
        this.searchPatient()
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'error',
            message: this.props.PatientEditReducer.patientErrorMessage
          }
        })
      } finally {
        this.setShowModal()
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
        showAlert
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
              patientDropdownErrorMessage: patientDropdownErrorMessage
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
              hospitalsDropdown: hospitalsForDropdown
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
      'PatientDropdownListReducer'
    ],
    {
      clearPatientDetails,
      clearPatientPreview,
      editPatient,
      fetchPatientMetaList,
      fetchPatientMetaDropdown,
      previewPatient,
      fetchActiveHospitalsForDropdown
    }
  )
}
export default PatientDetailsHOC
