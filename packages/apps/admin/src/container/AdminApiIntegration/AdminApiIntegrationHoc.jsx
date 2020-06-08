import React, {PureComponent} from 'react'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {CommonUtils, ObjectUtils} from '@frontend-appointment/helpers'
import {
  HospitalApiIntegrationMiddleware,
  RequestBodyApiIntegrationMiddleware,
  AdminApiIntegrationMiddleware
} from '@frontend-appointment/thunk-middleware'

import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import './admin-api-integration.scss'
const {
  hospitalIntegrationConstants,
  adminApiIntegrationConstants,
  appointmentModeApiConstants,
  requestbodyIntegrationConstants
} = AdminModuleAPIConstants
const {
  fetchFeatureTypeForDrodown,
  fetchRequestMethodDropdown,
  fetchIntegrationChannelDropdown,
  fetchIntegrationTypeDropdown
} = HospitalApiIntegrationMiddleware

const {
  clearMessages,
  deleteAdminApiIntegrationData,
  editAdminApiIntegrationData,
  fetchAppointmentModeAdminForDrodown,
  previewAdminApiIntegrationData,
  saveAdminApiIntegration,
  searchAdminApiIntegrationData
} = AdminApiIntegrationMiddleware
const {
  changeCommaSeperatedStringToObjectAndStringifyIt,
  checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent
} = CommonUtils
const {getRequestBodyByFeatureId} = RequestBodyApiIntegrationMiddleware
const {
  changeObjectStructureToKeyValueArray,
  addDescriptionInHeaderAndParams
} = ObjectUtils

const AdminApiIntegrationHoc = (ComposedComponent, props, type) => {
  class AdminApiIntegration extends PureComponent {
    state = {
      integrationData: {
        appointmentModeId: '',
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
        requestMethodId: '',
        featureTypeId: '',
        appointmentModeId: '',
        apiUrl: '',
        apiIntegrationTypeId: ''
      },
      deleteRequestDTO: {
        id: 0,
        remarks: '',
        status: 'D'
      },
      totalRecords: 0,
      //apiUrlValid: false,
      editQueryParams: [],
      editHeaders: [],
      searchQueryParams: {
        page: 0,
        size: 10
      },
      previewModal: false,
      editShowModal: false,
      showConfirmationModal: false,
      deleteModalShow: false,
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
          appointmentModeId: '',
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
        formValid: false,
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
    // }
    onChangeHandler = async (e, validity, type) => {
      const {name, value, label} = e.target
      let integrationDatas = {...this.state.integrationData}
      integrationDatas[name] = label ? (value ? {value, label} : '') : value
      if (name === 'appointmentId') {
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
     
        await this.setTheStateForIntegrationData(integrationDatas)
      

      this.checkFormValidity(type)
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentModeId: '',
          requestMethodId: '',
          featureTypeId: '',
          apiUrl: '',
          apiIntegrationTypeId: ''
        }
      })
      this.searchAdminApiIntegration()
    }

    searchAdminApiIntegration = async page => {
      const {
        apiUrl,
        appointmentModeId,
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
      await this.props.searchAdminApiIntegrationData(
        adminApiIntegrationConstants.ADMIN_API_INTEGRATION_SEARCH,
        {
          page: updatedPage,
          size: this.state.searchQueryParams.size
        },
        {
          apiUrl,
          appointmentModeId: appointmentModeId.value || '',
          featureTypeId: featureTypeId.value || '',
          requestMethodId: requestMethodId.value || '',
          apiIntegrationTypeId: apiIntegrationTypeId.value || ''
        }
      )

      await this.setState({
        totalRecords: this.props.AdminSearchApiIntegrationReducers
          .searchApiIntegrationData.length
          ? this.props.AdminSearchApiIntegrationReducers.totalItems
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
      this.searchAdminApiIntegration()
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
      await this.props.previewAdminApiIntegrationData(path, id)
    }

    onPreviewHandler = async id => {
      this.props.clearMessages()
      try {
        await this.previewApiCall(
          id,
          adminApiIntegrationConstants.ADMIN_API_INTEGRATION_PREVIEW
        )
        const {
          previewApiIntegrationData
        } = this.props.AdminPreviewApiIntegrationReducers

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
          headers: headers ? changeObjectStructureToKeyValueArray(headers) : [],
          queryParams: queryParameters
            ? changeObjectStructureToKeyValueArray(queryParameters)
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
            message: this.props.AdminPreviewApiIntegrationReducers
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
          adminApiIntegrationConstants.ADMIN_API_INTEGRATION_UPDATE_PREVIEW
        )
        const {
          previewApiIntegrationData
        } = this.props.AdminPreviewApiIntegrationReducers
        const {
          appointmentModeId,
          appointmentMode,
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
          appointmentModeId:{value:appointmentModeId,label:appointmentMode},
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
          },
          remarks:''
        }
        this.setTheStateForIntegrationData(integrationData)
        this.setShowModal('editShowModal')
        await this.setState({
          requestParamsIsSelected: Boolean(queryParameters)||false,
          requestHeadersIsSelected: Boolean(headers)||false,
          editHeaders:integrationData.headers,
          editQueryParams:integrationData.queryParams,
          apiUrlValid: url.match(this.state.regexForApiUrl) ? true : false
        })

        this.checkFormValidity('E')
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.AdminPreviewApiIntegrationReducers
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
        await this.props.deleteAdminApiIntegrationData(
          adminApiIntegrationConstants.ADMIN_API_INTEGRATION_DELETE,
          this.state.deleteRequestDTO
        )
        this.setCloseModal('D')
        this.setShowAlertModal(
          'success',
          this.props.AdminDeleteApiIntegrationReducers
            .deleteApiIntegrationSuccessMessage
        )
        await this.searchAdminApiIntegration()
      } catch (e) {
        this.setShowModal('deleteModalShow')
        this.setCloseModal('D')
        this.setShowAlertModal(
          'danger',
          this.props.AdminDeleteApiIntegrationReducers
            .deleteApiIntegrationErrorMessage
        )
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
        appointmentModeId,
        featureType,
        // headers,
        // queryParams,
        integrationChannelId,
        integrationTypeId,
        requestMethod,
        remarks
      } = this.state.integrationData
      //const {apiUrlValid} = this.state
      let formValid =
        apiUrl &&
        featureType.value &&
        integrationChannelId.value &&
        integrationTypeId.value &&
        requestMethod.value //&&
        //apiUrlValid
      if (type === 'E') {
        formValid = formValid && appointmentModeId
        formValid = formValid && remarks
      } else {
        formValid = formValid && appointmentModeId.value
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
        id,
        integrationChannelId,
        integrationTypeId,
        // appointmentMode,
        appointmentModeId
      } = this.state.integrationData
      try {
        await this.props.editAdminApiIntegrationData(
          adminApiIntegrationConstants.ADMIN_API_INTEGRATION_EDIT,
          {
            adminModeIntegrationId:id,
            appointmentModeId:appointmentModeId.value,
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
            message: this.props.AdminEditApiIntegrationReducers
              .editApiIntegrationSuccessMessage
          }
        })
        await this.searchAdminApiIntegration()
      } catch (e) {}
    }

    onSaveHandler = async () => {
      const {
        appointmentModeId,
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
        await this.props.saveAdminApiIntegration(
          adminApiIntegrationConstants.ADMIN_API_INTEGRATION_SAVE,
          {
            apiUrl,
            clientApiRequestHeaders: checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent(
              headers
            ),
            parametersRequestDTOS: checkKeyValuePairAndRemoveIfAnyOfThemIsNotPresent(
              queryParams
            ),
            requestMethodId: requestMethod.value || '',
            appointmentModeId: appointmentModeId.value || '',
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
          this.props.AdminApiIntegrationSaveReducers.adminApiSaveSucessMessage
        )
        this.setCloseModal()
      } catch (e) {
        this.setShowAlertModal(
          'danger',
          this.props.AdminApiIntegrationSaveReducers.adminApiErrorMessage
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

      await this.props.fetchAppointmentModeAdminForDrodown(
        appointmentModeApiConstants.FETCH_APPOINTMENT_MODE_FOR_DROPDOWN
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
      if (requestBodyObj !== null) {
        integrationDatas['requestBody'] = JSON.stringify(requestBodyObj)
        await this.setState({
          integrationData: {...integrationDatas}
        })
      }
    }

    componentDidMount () {
      if (type === 'M') this.searchAdminApiIntegration()
      this.callInitialApi()
    }

    render () {
      const {
        showAlert,
        alertMessageInfo,
        integrationData,
        formValid,
        //regexForApiUrl,
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
      const {adminApiSaveLoading} = this.props.AdminApiIntegrationSaveReducers

      const {
        isApppointmentModeApiIntegrationDropdownLoading,
        apppointmentModeApiIntegrationData,
        apppointmentModeApiIntegrationDropdownError
      } = this.props.AppointmentModeAdminApiDropdownReducers

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
      } = this.props.AdminSearchApiIntegrationReducers

      const {
        deleteApiIntegrationErrorMessage,
        isDeleteApiIntegrationLoading
      } = this.props.AdminDeleteApiIntegrationReducers

      const {
        isEditApiIntegrationLoading,
        editApiIntegrationErrorMessage
      } = this.props.AdminEditApiIntegrationReducers

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
              // regexForCommaSeperation: regexForCommaSeperation,
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
             // regexForApiUrl: regexForApiUrl,
              formValid,
              //hospitalsForDropdown,
              requestParamsIsSelected,
              requestHeadersIsSelected,
              changeRequestHandler: this.changeRequestHandler,
              isIntegrationChannelDropdownLoading,
              integrationChannelData,
              integrationChannelDropdownError,
              isIntegrationTypeDropdownLoading,
              integrationTypeData,
              integrationTypeDropdownError,
              isApppointmentModeApiIntegrationDropdownLoading,
              apppointmentModeApiIntegrationData,
              apppointmentModeApiIntegrationDropdownError,
              isRequestBodyByFeatureLoading,
              requestBodyByFeatureErrorMessage
            }}
            addHandler={{
              adminApiSaveLoading: adminApiSaveLoading,
              onConfirmHandler: this.onConfirmHandler,
              onSaveHandler: this.onSaveHandler,
              showConfirmationModal: showConfirmationModal
            }}
            searchHandler={{
              onSearchChangeHandler: this.handleSearchFormChange,
              onSearchResetHandler: this.handleSearchFormReset,
              searchParams: searchParameters,
              searchApiIntegration: this.searchAdminApiIntegration
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
    AdminApiIntegration,
    [
      'hospitalRequestMethodDropdownReducers',
      'hospitalFeatureTypeDropdownReducers',
      'integrationChannelReducers',
      'integrationTypeReducers',
      'RequestBodyByFeatureReducers',
      'AdminApiIntegrationSaveReducers',
      'AppointmentModeAdminApiDropdownReducers',
      'AdminEditApiIntegrationReducers',
      'AdminPreviewApiIntegrationReducers',
      'AdminSearchApiIntegrationReducers',
      'AdminDeleteApiIntegrationReducers'
    ],
    {
      fetchFeatureTypeForDrodown,
      fetchRequestMethodDropdown,
      editAdminApiIntegrationData,
      fetchAppointmentModeAdminForDrodown,
      previewAdminApiIntegrationData,
      saveAdminApiIntegration,
      searchAdminApiIntegrationData,
      clearMessages,
      fetchIntegrationChannelDropdown,
      fetchIntegrationTypeDropdown,
      getRequestBodyByFeatureId,
      deleteAdminApiIntegrationData
    }
  )
}
export default AdminApiIntegrationHoc
