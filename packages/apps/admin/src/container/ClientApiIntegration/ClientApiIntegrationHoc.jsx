import React, {PureComponent} from 'react'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {CommonUtils} from '@frontend-appointment/helpers'
import {
  HospitalApiIntegrationMiddleware,
  HospitalSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
const {
  hospitalIntegrationConstants,
  hospitalSetupApiConstants
} = AdminModuleAPIConstants
const {changeCommaSeperatedStringToObjectAndStringifyIt} = CommonUtils
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const ClientApiIntegrationHoc = (ComposedComponent, props, type) => {
  class ClientApiIntegration extends PureComponent {
    state = {
      integrationData: {
        clientId: '',
        featureType: '',
        requestMethod: '',
        apiUrl: '',
        headers: [],
        queryParams: [],
        requestBody: ''
      },
      requestBodyValid: false,
      editQueryParams: [],
      editHeaders: [],
      searchQueryParams: {
        page: 0,
        size: 10
      },
      addObjectId: 0,
      previewModal: true,
      editShowModal: true,
      showConfirmationModal: true,
      regexForCommaSeperation: /^(?!,)(,?[a-zA-Z]+)+$/,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showAlert: false,
      formValid: false
    }

    resetIntegrationData = () => {
      this.setTheStateForIntegrationData({
        integrationData: {
          clientId: '',
          featureType: '',
          requestMethod: '',
          apiUrl: '',
          headers: [],
          queryParams: [],
          requestBody: ''
        },
        formValid: false,
        requestBodyValid: false
      })
    }

    setTheStateForIntegrationData = objectToModify => {
      this.setState({
        integrationData: {...objectToModify}
      })
    }

    setTheStateForInputValidity = (objectToModify, validity) => {
      this.setState({
        integrationData: {...objectToModify},
        requestBodyValid: validity
      })
    }
    onChangeHandler = (e, validity) => {
      const {name, value, label} = e.target
      let integrationDatas = {...this.state.integrationData}
      integrationDatas[name] = label ? (value ? {value, label} : '') : value
      if (name !== 'requestBody')
        this.setTheStateForIntegrationData(integrationDatas)
      else this.setTheStateForInputValidity(integrationDatas, validity)
    }

    setCloseModal = () => {
      this.setState({
        previewModal: false,
        editShowModal: false,
        showConfirmationModal: false
      })
    }

    setShowModal = fieldName => {
      this.setState({
        [fieldName]: true
      })
    }

    onAddHeaderOrQueryParams = fieldName => {
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName].push({
        key: '',
        value: '',
        description: ''
      })
      this.setTheStateForIntegrationData(objectToModify)
    }

    onChangeHandlerHeaderOrQueryParams = (e, index, fieldName) => {
      const {name, value} = e.target
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName][index][name] = value
      this.setTheStateForIntegrationData(objectToModify)
    }

    onRemoveHandlerHeaderOrQueryParams = (index, fieldName) => {
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName].splice(index, index)
      this.setTheStateForIntegrationData(objectToModify)
    }

    setShowAlertModal = (variant, message) => {
      this.setState({
        alertMessageInfo: {
          variant,
          message
        },
        showAlert: true
      })
    }

    closeAlertModal = () => {
      this.setState({
        alertMessageInfo: {
          variant: '',
          message: ''
        },
        showAlert: false
      })
    }

    checkFormValidity = () => {
      const {
        apiUrl,
        clientId,
        featureType,
        headers,
        queryParams,
        requestBody,
        requestMethod
      } = this.state.integrationData
      const formValid =
        apiUrl &&
        clientId.value &&
        featureType.value &&
        headers.length &&
        queryParams.length &&
        requestBody &&
        requestMethod.value
      this.setState({
        formValid: Boolean(formValid)
      })
    }
    onConfirmHandler = () => {
      this.setShowModal('showConfirmationModal')
    }

    onSaveHandler = async () => {
      const {
        clientId,
        featureType,
        apiUrl,
        headers,
        queryParams,
        requestBody,
        requestMethod
      } = this.state.integrationData
      try {
        await this.props.saveHospitalIntegration(hospitalIntegrationConstants, {
          apiUrl,
          clientApiRequestHeaders: [...headers],
          parametersRequestDTOS: [...queryParams],
          requestMethodId: requestMethod,
          hospitalId: clientId,
          featureTypeId: featureType,
          requestBodyAttribute: changeCommaSeperatedStringToObjectAndStringifyIt(
            requestBody
          )
        })
        this.resetIntegrationData(
          'success',
          this.props.hospitalApiIntegrationSaveReducers
            .hospitalApiSaveSucessMessage
        )
        this.setShowAlertModal()
      } catch (e) {
        this.setShowAlertModal(
          'danger',
          this.props.hospitalApiIntegrationSaveReducers
            .hospitalApiSaveErrorMessage
        )
      }
    }

    callInitialApi = async () => {
      await this.props.fetchFeatureTypeForDrodown(
        hospitalIntegrationConstants.HOSPITAL_FEATURE_TYPE_DROPDOWN
      )
      await this.props.fetchRequestMethodDropdown(
        hospitalIntegrationConstants.HOSPITAL_REQUEST_METHOD_DROPDOWN
      )
      await this.props.fetchActiveHospitalsForDropdown(
        hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
      )
    }

    componentDidMount () {
      this.callInitialApi()
    }

    render () {
      const {
        showAlert,
        alertMessageInfo,
        integrationData,
        regexForCommaSeperation,
        formValid
      } = this.state
      const {
        isHospitalApiSaveLoading
      } = this.props.hospitalApiIntegrationSaveReducers
      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      const {} = this.props.h
      const {
        featureTypeDropdownData,
        featureTypeDropdownError,
        isFeatureTypeDropdownLoading
      } = this.props.hospitalRequestMethodDropdownReducers
      const {
        isRequestMethodDropdownLoading,
        requestMethodData,
        requestMethodDropdownError
      } = this.props.hospitalFeatureTypeDropdownReducers
      return (
        <>
          <ComposedComponent
            {...props}
            commonHandler={{
              onChangeHandlerHeaderOrQueryParams: this
                .onChangeHandlerHeaderOrQueryParams,
              onRemoveHandlerHeaderOrQueryParams: this
                .onRemoveHandlerHeaderOrQueryParams,
              onAddHeaderOrQueryParams: this.onAddHeaderOrQueryParams,
              onChangeHandler: this.onChangeHandler,
              integrationData: integrationData,
              setCloseModal: this.setCloseModal,
              resetIntegrationData: this.resetIntegrationData,
              regexForCommaSeperation: regexForCommaSeperation,
              featureTypeDropdownData,
              featureTypeDropdownError,
              isFeatureTypeDropdownLoading,
              isRequestMethodDropdownLoading,
              requestMethodData,
              requestMethodDropdownError,
              formValid,
              hospitalsForDropdown
            }}
            addHandler={{
              isHospitalApiSaveLoading: isHospitalApiSaveLoading,
              onConfirmHandler: this.onConfirmHandler,
              onSaveHandler: this.onSaveHandler
            }}
          />
          <CAlert
            id="profile-add"
            variant={alertMessageInfo.variant}
            show={showAlert}
            onClose={this.closeAlertModal}
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
    ClientApiIntegration,
    [
      'hospitalApiIntegrationSaveReducers',
      'hospitalRequestMethodDropdownReducers',
      'hospitalFeatureTypeDropdownReducers',
      'HospitalDropdownReducer'
    ],
    {
      ...HospitalApiIntegrationMiddleware,
      fetchActiveHospitalsForDropdown
    }
  )
}
export default ClientApiIntegrationHoc
