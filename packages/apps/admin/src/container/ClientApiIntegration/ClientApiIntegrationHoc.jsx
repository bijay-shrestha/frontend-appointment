import React, {PureComponent} from 'react'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {CommonUtils, ObjectUtils} from '@frontend-appointment/helpers'
import {
  HospitalApiIntegrationMiddleware,
  HospitalSetupMiddleware
} from '@frontend-appointment/thunk-middleware'

import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './client-api-integration.scss'
const {
  hospitalIntegrationConstants,
  hospitalSetupApiConstants
} = AdminModuleAPIConstants
const {
  fetchFeatureTypeForDrodown,
  fetchRequestMethodDropdown,
  saveHospitalIntegration,
  deleteApiIntegrationData,
  editApiIntegrationData,
  previewApiIntegrationData,
  searchApiIntegrationData,
  clearMessages,
  fetchIntegrationChannelDropdown,
  fetchIntegrationTypeDropdown
} = HospitalApiIntegrationMiddleware
const {
  changeCommaSeperatedStringToObjectAndStringifyIt,
  checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent
} = CommonUtils
const {
  changeObjectStructureToKeyValueArray,
  changeJSONObjectToCommaSepratedValue,
  addDescriptionInHeaderAndParams
} = ObjectUtils
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
        requestBody: '',
        id: '',
        integrationChannelId: '',
        integrationTypeId:''
      },
      searchParameters: {
        clientId: '',
        requestMethodId: '',
        featureTypeId: '',
        apiUrl: ''
      },
      deleteRequestDTO: {
        id: 0,
        remarks: '',
        status: 'D'
      },
      totalRecords: 0,
      requestBodyValid: false,
      apiUrlValid: false,
      editQueryParams: [],
      editHeaders: [],
      searchQueryParams: {
        page: 0,
        size: 10
      },
      addObjectId: 0,
      previewModal: false,
      editShowModal: false,
      showConfirmationModal: false,
      deleteModalShow: false,
      regexForCommaSeperation: /^(?!,)(,?[a-zA-Z]+)+$/,
      regexForApiUrl: /^((http[s]?|ftp):\/)?\/?([^:\s]+)((\/\w+)*\/)([\w]+[^#?\s]+)(.*)?(#[\w]+)?$/,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showAlert: false,
      formValid: false,
      requestParamsIsSelected: false,
      requestHeadersIsSelected: false,
      previewData: null
    }

    resetIntegrationData = () => {
      this.setState({
        integrationData: {
          clientId: '',
          featureType: '',
          requestMethod: '',
          apiUrl: '',
          headers: [],
          queryParams: [],
          requestBody: '',
          id: '',
          integrationChannelId: '',
          integrationTypeId:''
        },
        formValid: false,
        requestBodyValid: false,
        restApiValid: false,
        requestHeadersIsSelected: false,
        requestParamsIsSelected: false
      })
    }

    setTheStateForIntegrationData = objectToModify => {
      this.setState({
        integrationData: {...objectToModify}
      })
    }

    setTheStateForInputValidity = async (objectToModify, validity, name) => {
      const newName = name + 'Valid'
      await this.setState({
        integrationData: {...objectToModify},
        [newName]: validity
      })
      console.log('====', this.state)
    }
    onChangeHandler = async (e, validity, type) => {
      const {name, value, label} = e.target
      let integrationDatas = {...this.state.integrationData}
      integrationDatas[name] = label ? (value ? {value, label} : '') : value
      if(name === 'integrationTypeId'){
        integrationDatas['featureType']=''
        this.onIntegrationTypeChangeFeatureType(value)
      }
      if (name !== 'requestBody' && name !== 'apiUrl') {
        await this.setTheStateForIntegrationData(integrationDatas)
      } else {
        await this.setTheStateForInputValidity(integrationDatas, validity, name)
      }
      this.checkFormValidity(type)
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          clientId: '',
          requestMethodId: '',
          featureTypeId: '',
          apiUrl: ''
        }
      })
      this.searchHospitalApiIntegration()
    }

    searchHospitalApiIntegration = async page => {
      const {
        apiUrl,
        clientId,
        featureTypeId,
        requestMethodId
      } = this.state.searchParameters

      let updatedPage =
        this.state.searchQueryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.searchQueryParams.page
      await this.props.searchApiIntegrationData(
        hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_SEARCH,
        {
          page: updatedPage,
          size: this.state.searchQueryParams.size
        },
        {
          apiUrl,
          clientId: clientId.value || '',
          featureTypeId: featureTypeId.value || '',
          requestMethodId: requestMethodId.value || ''
        }
      )

      await this.setState({
        totalRecords: this.props.hospitalSearchApiIntegrationReducers
          .searchApiIntegrationData.length
          ? this.props.hospitalSearchApiIntegrationReducers.totalItems
          : 0,
        searchQueryParams: {
          ...this.state.searchQueryParams,
          page: updatedPage
        }
      })
    }

    handlePageChange = async newPage => {
      await this.setState({
        searchQueryParams: {
          ...this.state.searchQueryParams,
          page: newPage
        }
      })
      this.searchHospitalApiIntegration()
    }

    appendSNToTable = apiIntegrationList => {
      const newApiIntegrationList = apiIntegrationList.map(
        (apiIntegrate, index) => ({
          ...apiIntegrate,
          sN: index + 1
        })
      )
      return newApiIntegrationList
    }
    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    handleSearchFormChange = async event => {
      if (event) {
        let fieldName = event.target.name
        let value = event.target.value
        let label = event.target.label
        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label ? (value ? {value, label} : '') : value
        await this.setStateValuesForSearch(searchParams)
      }
    }

    previewApiCall = async (id, path) => {
      await this.props.previewApiIntegrationData(path, id)
    }

    onPreviewHandler = async id => {
      this.props.clearMessages()
      try {
        await this.previewApiCall(
          id,
          hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_PREVIEW
        )
        const {
          previewApiIntegrationData
        } = this.props.hospitalPreviewApiIntegrationReducers
        const {
          featureCode,
          // requestMethodId,
          // featureId,
          requestMethodName,
          url,
          requestBody,
          headers,
          queryParameters,
          hospitalName
        } = previewApiIntegrationData
        let integrationData = {
          apiUrl: url,
          requestMethod: requestMethodName,
          requestBody: changeJSONObjectToCommaSepratedValue(requestBody),
          featureType: featureCode,
          headers: changeObjectStructureToKeyValueArray(headers),
          queryParams: changeObjectStructureToKeyValueArray(queryParameters),
          clientId: hospitalName
        }
        this.setTheStateForIntegrationData(integrationData)
        this.setShowModal('previewModal')
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.hospitalPreviewApiIntegrationReducers
              .previewApiIntegrationErorrMessage
          }
        })
      }
    }

    onEditHandler = async id => {
      this.props.clearMessages()
      try {
        await this.previewApiCall(
          id,
          hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_UPDATE_PREVIEW
        )
        const {
          previewApiIntegrationData
        } = this.props.hospitalPreviewApiIntegrationReducers
        const {
          hospitalName,
          featureId,
          featureCode,
          requestMethodId,
          requestMethodName,
          url,
          requestBody,
          headers,
          queryParameters
        } = previewApiIntegrationData
        let integrationData = {
          clientId: hospitalName,
          featureType: {value: featureId, label: featureCode},
          requestMethod: {value: requestMethodId, label: requestMethodName},
          apiUrl: url,
          headers: addDescriptionInHeaderAndParams(headers),
          queryParams: addDescriptionInHeaderAndParams(queryParameters),
          requestBody: changeJSONObjectToCommaSepratedValue(requestBody),
          id: id
        }
        this.setTheStateForIntegrationData(integrationData)
        this.setShowModal('editShowModal')
        await this.setState({
          requestParamsIsSelected: true,
          requestHeadersIsSelected: true,
          editHeaders: headers,
          editQueryParams: queryParameters,
          apiUrlValid: url.match(this.state.regexForApiUrl) ? true : false,
          requestBodyValid: integrationData.requestBody.match(
            this.state.regexForCommaSeperation
          )
            ? true
            : false
        })

        this.checkFormValidity('E')
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.hospitalPreviewApiIntegrationReducers
              .previewApiIntegrationErorrMessage
          }
        })
      }
    }

    onDeleteHandler = async id => {
      this.props.clearMessages()
      let deleteRequestDTO = {...this.state.deleteRequestDTO}
      deleteRequestDTO['id'] = id
      await this.setState({
        deleteRequestDTO: deleteRequestDTO,
        deleteModalShow: true
      })
    }

    deleteRemarksHandler = event => {
      const {name, value} = event.target
      let deleteRequest = {...this.state.deleteRequestDTO}
      deleteRequest[name] = value
      this.setState({
        deleteRequestDTO: deleteRequest
      })
    }

    onSubmitDeleteHandler = async () => {
      try {
        await this.props.deleteApiIntegrationData(
          hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_DELETE,
          this.state.deleteRequestDTO
        )
        this.setCloseModal('D')
        this.setShowAlertModal(
          'success',
          this.props.hospitalDeleteApiIntegrationReducers
            .deleteApiIntegrationSuccessMessage
        )
        await this.searchHospitalApiIntegration()
      } catch (e) {
        this.setShowModal('deleteModalShow')
      }
    }

    setCloseModal = type => {
      if (type === 'D') this.resetDeleteRequestDTO()

      this.setState({
        previewModal: false,
        editShowModal: false,
        showConfirmationModal: false,
        deleteModalShow: false
      })
    }

    resetDeleteRequestDTO = () => {
      this.setState({
        deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
      })
    }

    setShowModal = fieldName => {
      this.setState({
        [fieldName]: true
      })
    }

    onAddHeaderOrQueryParams = (fieldName, type) => {
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName].push({
        keyParam: '',
        valueParam: '',
        description: ''
      })
      this.setTheStateForIntegrationData(objectToModify)
      this.checkFormValidity(type)
    }

    onChangeHandlerHeaderOrQueryParams = (e, index, fieldName, type) => {
      const {name, value} = e.target
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName][index][name] = value
      this.setTheStateForIntegrationData(objectToModify)
      this.checkFormValidity(type)
    }

    onRemoveHandlerHeaderOrQueryParams = (index, fieldName, type) => {
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName].splice(index, 1)
      this.setTheStateForIntegrationData(objectToModify)
      this.checkFormValidity(type)
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

    checkFormValidity = type => {
      const {
        apiUrl,
        clientId,
        featureType,
        // headers,
        // queryParams,
        requestBody,
        requestMethod
      } = this.state.integrationData
      const {requestBodyValid, apiUrlValid} = this.state
      let formValid =
        apiUrl &&
        featureType.value &&
        //headers.length &&
        //queryParams.length &&
        //requestBody &&
        requestMethod.value &&
        apiUrlValid
      if (type === 'E') {
        formValid = formValid && clientId
      } else {
        formValid = formValid && clientId.value
      }
      if (requestBody.length) {
        formValid = formValid && requestBodyValid
      }
      this.setState({
        formValid: Boolean(formValid)
      })
    }

    onConfirmHandler = () => {
      this.setShowModal('showConfirmationModal')
    }

    changeRequestHandler = async (fieldName, parentFieldName, type) => {
      let field = this.state[fieldName]
      field = field ? false : true
      await this.setState({
        [fieldName]: field
      })
      if (field) {
        this.onAddHeaderOrQueryParams(parentFieldName, type)
      } else {
        let integrationData = this.state.integrationData
        integrationData[parentFieldName] = []
        await this.setState({
          integrationData: {...integrationData}
        })
        console.log(this.state.integrationData)
      }
    }

    filterOutRequestAndHeaderParams = (dataToFilter, keyName) => {
      let filteredObj = []

      const newFilterObj = this.state[keyName]
      newFilterObj.map(newFilterObj => {
        let flag = false
        for (let i = 0; i < dataToFilter.length; i++) {
          if (Number(newFilterObj.id) === Number(dataToFilter[i].id)) {
            filteredObj.push(dataToFilter[i])
            flag = true
            break
          }
        }
        if (!flag) {
          filteredObj.push({...newFilterObj, status: 'N'})
        }

        return newFilterObj
      })
      // console.log(filteredContactNumber)
      dataToFilter.map(filterData => {
        if (!filterData.id && filterData.keyParam && filterData.valueParam)
          filteredObj.push(filterData)
        return filterData
      })
      return filteredObj
    }

    onEditApiHandler = async () => {
      const {
        apiUrl,
        featureType,
        headers,
        queryParams,
        requestBody,
        requestMethod,
        id
      } = this.state.integrationData
      try {
        await this.props.editApiIntegrationData(
          hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_EDIT,
          {
            apiUrl,
            clientApiRequestHeaders: this.filterOutRequestAndHeaderParams(
              headers,
              'editHeaders'
            ),
            clientFeatureIntegrationId: id,
            featureId: featureType.value,
            queryParametersRequestDTOS: this.filterOutRequestAndHeaderParams(
              queryParams,
              'editQueryParams'
            ),
            requestMethodId: requestMethod.value,
            requestBodyAttrribute: requestBody
          }
        )
        this.resetIntegrationData()
        this.setCloseModal()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.hospitalEditApiIntegrationReducers
              .editApiIntegrationSuccessMessage
          }
        })
        await this.searchHospitalApiIntegration()
      } catch (e) {}
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
        await this.props.saveHospitalIntegration(
          hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_SAVE,
          {
            apiUrl,
            clientApiRequestHeaders: checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent(
              headers
            ),
            parametersRequestDTOS: checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent(
              queryParams
            ),
            requestMethodId: requestMethod.value || '',
            hospitalId: clientId.value || '',
            featureTypeId: featureType.value || '',
            requestBodyAttribute: JSON.stringify(
              changeCommaSeperatedStringToObjectAndStringifyIt(requestBody)
            )
          }
        )
        this.resetIntegrationData()
        this.setShowAlertModal(
          'success',
          this.props.hospitalApiIntegrationSaveReducers
            .hospitalApiSaveSucessMessage
        )
        this.setCloseModal()
      } catch (e) {
        this.setShowAlertModal(
          'danger',
          this.props.hospitalApiIntegrationSaveReducers
            .hospitalApiSaveErrorMessage
        )
        this.setCloseModal()
      }
    }

    onIntegrationTypeChangeFeatureType = async(id)=>{
      await this.props.fetchFeatureTypeForDrodown(
        hospitalIntegrationConstants.HOSPITAL_FEATURE_TYPE_DROPDOWN_BY_INTEGRATION_TYPE,id
      )
    }

    callInitialApi = async () => {
      await this.props.fetchIntegrationChannelDropdown(
        hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_CHANNEL_DROPDOWN
      )

      await this.props.fetchIntegrationTypeDropdown(
        hospitalIntegrationConstants.HOSPITAL_API_INTEGRATION_TYPE_DROPDOWN
      )

      await this.props.fetchRequestMethodDropdown(
        hospitalIntegrationConstants.HOSPITAL_REQUEST_METHOD_DROPDOWN
      )

      await this.props.fetchActiveHospitalsForDropdown(
        hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
      )
    }

    componentDidMount () {
      if (type === 'M') this.searchHospitalApiIntegration()
      this.callInitialApi()
    }

    render () {
      const {
        showAlert,
        alertMessageInfo,
        integrationData,
        regexForCommaSeperation,
        formValid,
        regexForApiUrl,
        showConfirmationModal,
        searchParameters,
        searchQueryParams,
        totalRecords,
        deleteModalShow,
        deleteRequestDTO,
        previewModal,
        requestHeadersIsSelected,
        requestParamsIsSelected,
        editShowModal
      } = this.state
      const {
        isHospitalApiSaveLoading
      } = this.props.hospitalApiIntegrationSaveReducers
      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
      console.log('hospitalDropdw', this.props.HospitalDropdownReducer)
      const {
        featureTypeDropdownData,
        featureTypeDropdownError,
        isFeatureTypeDropdownLoading
      } = this.props.hospitalFeatureTypeDropdownReducers
      const {
        isRequestMethodDropdownLoading,
        requestMethodData,
        requestMethodDropdownError
      } = this.props.hospitalRequestMethodDropdownReducers
      const {
        isSearchApiIntegrationLoading,
        searchApiIntegrationData,
        searchApiIntegrationMessageError
      } = this.props.hospitalSearchApiIntegrationReducers
      const {
        deleteApiIntegrationErrorMessage,
        isDeleteApiIntegrationLoading
      } = this.props.hospitalDeleteApiIntegrationReducers
      // console.log('done', this.props.hospitalRequestMethodDropdownReducers)
      const {
        isEditApiIntegrationLoading,
        editApiIntegrationErrorMessage
      } = this.props.hospitalEditApiIntegrationReducers

      const {
        isIntegrationChannelDropdownLoading,
        integrationChannelData,
        integrationChannelDropdownError
      } = this.props.integrationChannelReducers
      const {
        isIntegrationTypeDropdownLoading,
        integrationTypeData,
        integrationTypeDropdownError
      } = this.props.integrationTypeReducers
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
              featureTypeDropdownData: featureTypeDropdownData.length
                ? featureTypeDropdownData
                : [],
              featureTypeDropdownError: featureTypeDropdownError,
              isFeatureTypeDropdownLoading: isFeatureTypeDropdownLoading,
              isRequestMethodDropdownLoading: isRequestMethodDropdownLoading,
              requestMethodData: requestMethodData.length
                ? [...requestMethodData]
                : [],
              requestMethodDropdownError: requestMethodDropdownError,
              regexForApiUrl: regexForApiUrl,
              formValid,
              hospitalsForDropdown,
              requestParamsIsSelected,
              requestHeadersIsSelected,
              changeRequestHandler: this.changeRequestHandler,
              isIntegrationChannelDropdownLoading,
              integrationChannelData,
              integrationChannelDropdownError,
              isIntegrationTypeDropdownLoading,
              integrationTypeData,
              integrationTypeDropdownError
            }}
            addHandler={{
              isHospitalApiSaveLoading: isHospitalApiSaveLoading,
              onConfirmHandler: this.onConfirmHandler,
              onSaveHandler: this.onSaveHandler,
              showConfirmationModal: showConfirmationModal
            }}
            searchHandler={{
              onSearchChangeHandler: this.handleSearchFormChange,
              onSearchResetHandler: this.handleSearchFormReset,
              searchParams: searchParameters,
              searchApiIntegration: this.searchHospitalApiIntegration
            }}
            editHandler={{
              isEditApiIntegrationLoading,
              showEditModal: editShowModal,
              editApiHandler: this.onEditApiHandler,
              errorMessage: editApiIntegrationErrorMessage
            }}
            tableHandler={{
              integrationList: this.appendSNToTable(searchApiIntegrationData),
              isSearchLoading: isSearchApiIntegrationLoading,
              searchErrorMessage: searchApiIntegrationMessageError,
              searchQueryParams: searchQueryParams,
              onPageChangehandler: this.handlePageChange,
              totalItems: totalRecords,
              deleteApiIntegrationErrorMessage,
              isDeleteApiIntegrationLoading,
              deleteRemarksHandler: this.deleteRemarksHandler,
              deleteHandler: this.onDeleteHandler,
              deleteApiCall: this.onSubmitDeleteHandler,
              deleteRequestDTO,
              deleteModalShow,
              previewApiIntegrationData: integrationData,
              previewModal,
              previewHandler: this.onPreviewHandler,
              editHandler: this.onEditHandler
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
      'HospitalDropdownReducer',
      'hospitalPreviewApiIntegrationReducers',
      'hospitalSearchApiIntegrationReducers',
      'hospitalDeleteApiIntegrationReducers',
      'hospitalEditApiIntegrationReducers',
      'integrationChannelReducers',
      'integrationTypeReducers'
    ],
    {
      fetchFeatureTypeForDrodown,
      fetchRequestMethodDropdown,
      saveHospitalIntegration,
      fetchActiveHospitalsForDropdown,
      deleteApiIntegrationData,
      editApiIntegrationData,
      previewApiIntegrationData,
      searchApiIntegrationData,
      clearMessages,
      fetchIntegrationChannelDropdown,
      fetchIntegrationTypeDropdown
    }
  )
}
export default ClientApiIntegrationHoc
