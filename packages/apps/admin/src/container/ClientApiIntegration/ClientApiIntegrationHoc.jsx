import React, {PureComponent} from 'react'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {CommonUtils, ObjectUtils} from '@frontend-appointment/helpers'
import {
  HospitalApiIntegrationMiddleware,
  HospitalSetupMiddleware,
  RequestBodyApiIntegrationMiddleware
} from '@frontend-appointment/thunk-middleware'

import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './client-api-integration.scss'
const {
  hospitalIntegrationConstants,
  hospitalSetupApiConstants,
  requestbodyIntegrationConstants
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
const {getRequestBodyByFeatureId} = RequestBodyApiIntegrationMiddleware
const {
 // changeObjectStructureToKeyValueArray,
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
        requestBody: null,
        id: '',
        integrationChannelId: '',
        integrationTypeId: '',
        remarks:''
      },
      searchParameters: {
        hospitalId: '',
        requestMethodId: '',
        featureTypeId: '',
        apiUrl: '',
        apiIntegrationTypeId: ''
      },
      deleteRequestDTO: {
        id: 0,
        remarks: '',
        status: 'D'
      },
      totalRecords: 0,
      requestBodyValid: false,
      //apiUrlValid: false,
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
      //regexForCommaSeperation: /^(?!,)(,?[a-zA-Z]+)+$/,
      //regexForApiUrl: /^((http[s]?|ftp):\/)?\/?([^:\s]+)((\/\w+)*\/)([\w]+[^#?\s]+)(.*)?(#[\w]+)?$/,
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
          integrationTypeId: '',
          remarks:''
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

    // setTheStateForInputValidity = async (objectToModify, validity, name) => {
    //   const newName = name + 'Valid'
    //   await this.setState({
    //     integrationData: {...objectToModify},
    //     [newName]: validity
    //   })
    //   console.log('====', this.state)
    // }
    onChangeHandler = async (e, validity, type) => {
      const {name, value, label} = e.target
      let integrationDatas = {...this.state.integrationData}
      integrationDatas[name] = label ? (value ? {value, label} : '') : value
      if (name === 'clientId') {
        integrationDatas['requestBody'] = ''
        integrationDatas['featureType'] = ''
        integrationDatas['integrationTypeId'] = ''
        integrationDatas['apiUrl'] = ''
        integrationDatas['requestMethod'] = ''
        integrationDatas['integrationChannelId'] = ''
      }
      if (name === 'integrationTypeId') {
        integrationDatas['requestBody'] = ''
        integrationDatas['featureType'] = ''
        this.onIntegrationTypeChangeFeatureType(value)
      }
      if (name === 'featureType') {
        integrationDatas['requestBody'] = ''
        this.onFeatureTypeChangeRequestBody(value)
      }
      // if (name !== 'requestBody' && name !== 'apiUrl') {
        await this.setTheStateForIntegrationData(integrationDatas)
      // } else {
      //   await this.setTheStateForInputValidity(integrationDatas, validity, name)
      // }

      this.checkFormValidity(type)
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          hospitalId: '',
          requestMethodId: '',
          featureTypeId: '',
          apiUrl: '',
          apiIntegrationTypeId: ''
        }
      })
      this.searchHospitalApiIntegration()
    }

    searchHospitalApiIntegration = async page => {
      const {
        apiUrl,
        hospitalId,
        featureTypeId,
        requestMethodId,
        apiIntegrationTypeId
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
          url:apiUrl,
          hospitalId: hospitalId.value || '',
          featureTypeId: featureTypeId.value || '',
          requestMethodId: requestMethodId.value || '',
          apiIntegrationTypeId: apiIntegrationTypeId.value || ''
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
        if(fieldName==="apiIntegrationTypeId"){
          this.onIntegrationTypeChangeFeatureType(value)
        }
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
          featureName,
          // requestMethodId,
          featureId,
          integrationChannel,
          integrationType,
          requestMethodName,
          url,
          headers,
          queryParameters,
          hospitalName,
          lastModifiedBy,
          lastModifiedDate,
          createdDate,
          createdBy
        } = previewApiIntegrationData
        await this.onFeatureTypeChangeRequestBody(featureId)
        const {requestBody} = this.state.integrationData
        let integrationData = {
          apiUrl: url,
          requestMethod: requestMethodName,
          requestBody: requestBody,
          featureType: featureName,
          headers: headers ? headers : [],
          queryParams: queryParameters
            ? queryParameters
            : [],
          clientId: hospitalName,
          integrationChannelId: integrationChannel,
          integrationTypeId: integrationType,
          lastModifiedBy,
          lastModifiedDate,
          createdDate,
          createdBy
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
          featureName,
          requestMethodId,
          requestMethodName,
          url,
          // requestBody,
          headers,
          queryParameters,
          integrationTypeId,
          integrationType,
          integrationChannelId,
          integrationChannel

        } = previewApiIntegrationData
        await this.onIntegrationTypeChangeFeatureType(integrationTypeId)
        await this.onFeatureTypeChangeRequestBody(featureId)
        const {requestBody} = this.state.integrationData
        let integrationData = {
          clientId: hospitalName,
          featureType: {value: featureId, label: featureName},
          requestMethod: {value: requestMethodId, label: requestMethodName},
          apiUrl: url,
          headers: headers ? addDescriptionInHeaderAndParams(headers) : [],
          queryParams: queryParameters
            ? addDescriptionInHeaderAndParams(queryParameters)
            : [],
          requestBody: requestBody ? requestBody : null,
          id: id,
          integrationTypeId: {value: integrationTypeId, label: integrationType},
          integrationChannelId: {
            value: integrationChannelId,
            label: integrationChannel
          }
        }
        this.setTheStateForIntegrationData(integrationData)
        this.setShowModal('editShowModal')
        await this.setState({
          requestParamsIsSelected: true,
          requestHeadersIsSelected: true,
          editHeaders: headers?headers.length?headers:[]:[],
          editQueryParams:queryParameters?queryParameters.length?queryParameters:[]:[],
          apiUrlValid: url.match(this.state.regexForApiUrl) ? true : false
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
        this.setCloseModal()
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
        integrationChannelId,
        integrationTypeId,
        requestMethod,
        remarks
      } = this.state.integrationData
      let formValid =
        apiUrl &&
        featureType.value &&
        integrationChannelId.value &&
        integrationTypeId.value &&
        requestMethod.value
      if (type === 'E') {
        formValid = formValid && clientId
        formValid= formValid && remarks
      } else {
        formValid = formValid && clientId.value
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
      if(newFilterObj!==null)
      newFilterObj.map(newFiltObj => {
        let flag = false
        for (let i = 0; i < dataToFilter.length; i++) {
          if (Number(newFiltObj.id) === Number(dataToFilter[i].id)) {
            filteredObj.push(dataToFilter[i])
            flag = true
            break
          }
        }
        if (!flag) {
          filteredObj.push({...newFiltObj, status: 'N'})
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
        id,
        integrationChannelId,
        integrationTypeId
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
            requestBodyAttrribute: requestBody,
            integrationChannelId: integrationChannelId.value,
            integrationTypeId: integrationTypeId.value
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
        requestMethod,
        integrationChannelId,
        integrationTypeId
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
            apiIntegrationTypeId: integrationTypeId.value || '',
            integrationChannelId: integrationChannelId.value || '',
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
            .hospitalApiErrorMessage
        )
        this.setCloseModal()
      }
    }

    onIntegrationTypeChangeFeatureType = async id => {
      await this.props.fetchFeatureTypeForDrodown(
        hospitalIntegrationConstants.HOSPITAL_FEATURE_TYPE_DROPDOWN_BY_INTEGRATION_TYPE,
        id
      )
    }

    onFeatureTypeChangeRequestBody = async id => {
      await this.props.getRequestBodyByFeatureId(
        requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_BY_FEATURE_TYPE,
        id
      )
      const {requestBodyByFeatureData} = this.props.RequestBodyByFeatureReducers
      this.getObjectValue(requestBodyByFeatureData)
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

    getObjectValue = async dataObjArray => {
      let requestBodyObj = null
      if (dataObjArray.length) requestBodyObj = {}
      dataObjArray.map(dataObj => {
        requestBodyObj = {...requestBodyObj, [dataObj.name]: ''}
        return dataObj
      })
      let integrationDatas = {...this.state.integrationData}
      if(requestBodyObj !==null){
      integrationDatas['requestBody'] = JSON.stringify(requestBodyObj)
      await this.setState({
        integrationData: {...integrationDatas}
      })
    }
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
       // regexForApiUrl,
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

      const {
        isRequestBodyByFeatureLoading,
        requestBodyByFeatureErrorMessage
      }= this.props.RequestBodyByFeatureReducers

      console.log('=======', this.props.integrationChannelReducers)
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
              //regexForApiUrl: regexForApiUrl,
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
              integrationTypeDropdownError,
              isRequestBodyByFeatureLoading,
              requestBodyByFeatureErrorMessage
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
      'integrationTypeReducers',
      'RequestBodyByFeatureReducers'
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
      fetchIntegrationTypeDropdown,
      getRequestBodyByFeatureId
    }
  )
}
export default ClientApiIntegrationHoc
