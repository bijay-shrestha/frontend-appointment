import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {EnterKeyPressUtils, ObjectUtils} from '@frontend-appointment/helpers'
import {MdDone} from 'react-icons/md'
import {
  RequestBodyApiIntegrationMiddleware,
  HospitalApiIntegrationMiddleware
} from '@frontend-appointment/thunk-middleware'
import {CAlert} from '@frontend-appointment/ui-elements'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'

import './specialization.scss'
const {fetchFeatureTypeForDrodown} = HospitalApiIntegrationMiddleware

const {
  clearMessages,
  deleteRequestBodyIntegrationData,
  editRequestBodyIntegrationData,
  fetchRequestBodyForDrodown,
  previewRequestBodyIntegrationData,
  saveRequestBodyIntegration,
  searchRequestBodyIntegrationData
} = RequestBodyApiIntegrationMiddleware
const {
  hospitalIntegrationConstants,
  requestbodyIntegrationConstants
} = AdminModuleAPIConstants

const RequestBodyApiIntegrationHOC = (ComposedComponent, props, type) => {
  class RequestBodyApiIntegrationSetup extends React.PureComponent {
    state = {
      requestBodyData: {
        requestBodys: [],
        featureTypeId: '',
        remarks: ''
      },
      formValid: false,
      showConfirmModal: false,
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showRequestBodyModal: false,
      showEditModal: false,
      deleteModalShow: false,
      searchParameters: {
        featureType: '',
        requestBody: '',
        status: {value: '', label: 'All'}
      },
      queryParams: {
        page: 0,
        size: 10
      },
      deleteRequestDTO: {
        id: 0,
        remarks: '',
        status: 'D'
      },
      totalRecords: 0,
      previewData: null,
      editRequestBodys: []
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    setShowModal = () => {
      this.setState({
        showRequestBodyModal: false,
        deleteModalShow: false,
        showEditModal: false
      })
    }

    resetRequestBodyValues = () => {
      this.setState({
        requestBodyData: {
          requestBodys: [],
          featureTypeId: ''
        },
        formValid: false
      })
    }

    closeAlert = () => {
      this.props.clearMessages()
      this.setState({
        showAlert: !this.state.showAlert,
        alertMessageInfo: ''
      })
    }

    checkFormValidity = eventType => {
      const {featureTypeId, requestBodys, remarks} = this.state.requestBodyData
      let formValidity = featureTypeId.value && requestBodys.length
      if (eventType === 'E') {
        formValidity = formValidity && remarks
      }
      this.setState({
        formValid: formValidity
      })
    }

    handleOnChange = async (event, eventType) => {
      let requestBodyData = {...this.state.requestBodyData}
      let name, value, label, select, values
      values = event.target.values
      name = event.target.name
      value = event.target.value
      label = event.target.label
      if (values) {
        value = values
        label = values
        select = values
      } else {
        select = {value: value, label: label}
      }
      requestBodyData[name] = !label ? value : value ? select : {value: null}
      await this.setState({
        requestBodyData: requestBodyData
      })
      this.checkFormValidity(eventType)
    }

    setShowConfirmModal = () => {
      this.setState({showConfirmModal: !this.state.showConfirmModal})
    }

    handleConfirmClick = async () => {
      const {featureTypeId, requestBodys} = this.state.requestBodyData
      try {
        await this.props.saveRequestBodyIntegration(
          requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_SAVE,
          {
            featureId: featureTypeId.value || '',
            requestBodyAttributes: ObjectUtils.changeValueLabelAraaryToIdsArray(
              requestBodys
            )
          }
        )
        this.resetRequestBodyValues()
        this.setShowConfirmModal()
        // this.setFormValidManage()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.RequestBodyIntegrationSaveReducers
              .requestBodyApiSaveSucessMessage
          }
        })
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: e.errorMessage ? e.errorMessage : e.message
          }
        })
        this.setShowConfirmModal()
      }
    }

    previewApiCall = async (id,path) => {
      await this.props.previewRequestBodyIntegrationData(
        path,
        id
      )
    }

    onPreviewHandler = async data => {
      try {
        await this.previewApiCall(data.featureId,requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_PREVIEW)
        const {
          // isPreviewRequestBodyIntegrationLoading,
          previewRequestBodyIntegrationData
          //previewRequestIntegrationErorrMessage
        } = this.props.RequestBodyPreviewReducers
        await this.setState({
          showRequestBodyModal: true,
          previewData: {
            featureTypeId: {value: data.featureId, label: data.featureName},
            requestBodys: previewRequestBodyIntegrationData.requestBody,
            ...previewRequestBodyIntegrationData
          }
        })
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.RequestBodyPreviewReducers
              .previewRequestIntegrationErorrMessage
          }
        })
      }
    }

    onEditHandler = async data => {
      this.props.clearMessages()
      try {
        await this.previewApiCall(data.featureId,requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_EDIT_PREVIEW)
        const {
          previewRequestBodyIntegrationData
        } = this.props.RequestBodyPreviewReducers
        await this.setState({
          showEditModal: true,
          requestBodyData: {
            featureTypeId: {value: data.featureId, label: data.featureName},
            requestBodys: ObjectUtils.constructValueLabelArrayObjectFromGivenArrayObject(
              previewRequestBodyIntegrationData
            ),
            remarks: ''
          },
          editRequestBodys: ObjectUtils.constructValueLabelArrayObjectFromGivenArrayObject(
            previewRequestBodyIntegrationData
          )
        })
        this.checkFormValidity('E')
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.RequestBodyPreviewReducers
              .previewRequestIntegrationErorrMessage
          }
        })
      }
    }

    searchRequestBody = async page => {
      const {featureType, requestBody, status} = this.state.searchParameters
      let searchData = {
        featureTypeId: featureType.value || '',
        requestBodyId: requestBody.value || '',
        status: status.value === 'All' ? '' : status.value
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.searchRequestBodyIntegrationData(
        requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_SEARCH,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )

      await this.setState({
        totalRecords: this.props.RequestBodySearchReducers.searchRequestBodyData
          .length
          ? this.props.RequestBodySearchReducers.totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    appendSNToTable = requestBodyList => {
      const newRequestBodyList =
        requestBodyList.length &&
        requestBodyList.map((req, index) => ({
          ...req,
          sN: index + 1
        }))
      console.log(newRequestBodyList)
      return newRequestBodyList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchRequestBody()
    }

    filterOutRequestBody = (requestBodys, orgRequestBody) => {
      const filteredObj = []
      const originalBody = [...orgRequestBody]
      const editedRequestBodys = [...requestBodys]
      originalBody.map(orgBody => {
        let flag = false
        for (let i = 0; i < editedRequestBodys.length; i++) {
          if (Number(orgBody.value) === Number(editedRequestBodys[i].value)) {
            filteredObj.push(editedRequestBodys[i])
            flag = true
            break
          }
        }
        if (!flag) {
          filteredObj.push({...orgBody, status: 'N'})
        }

        return orgBody
      })

      editedRequestBodys.map(orgBody => {
        if (!orgBody.status) filteredObj.push({...orgBody, status: 'Y'})
        return orgBody
      })

      const newFilterObj = filteredObj.map(filteredObj => {
        return {
          requestBodyId: filteredObj.value,
          status: filteredObj.status
        }
      })
      return newFilterObj
    }

    editRequestBodyData = async () => {
      const {requestBodys, featureTypeId, remarks} = this.state.requestBodyData
      const data = {
        featureId: featureTypeId.value || '',
        requestBodyUpdateRequestDTOS: this.filterOutRequestBody(
          requestBodys,
          this.state.editRequestBodys
        ),
        remarks: remarks
      }

      try {
        await this.props.editRequestBodyIntegrationData(
          requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_EDIT,
          data
        )
        this.resetRequestBodyValues()

        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.RequestBodyEditReducers
              .editRequestBodySuccessMessage
          }
        })
        this.setShowModal();
        await this.searchRequestBody()
      } catch (e) {}
    }

    onDeleteHandler = async data => {
      this.props.clearMessages()
      let deleteRequestDTO = {...this.state.deleteRequestDTO}
      deleteRequestDTO['id'] = data.featureId
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
        await this.props.deleteRequestBodyIntegrationData(
          requestbodyIntegrationConstants.REQUEST_BODY_API_INTEGRATION_DELETE,
          this.state.deleteRequestDTO
        )
        await this.setState({
          deleteModalShow: false,
          deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
          alertMessageInfo: {
            variant: 'success',
            message: this.props.RequestBodyDeleteReducers
              .deleteRequestBodyIntegrationSuccessMessage
          },
          showAlert: true
        })
        await this.searchRequestBody()
      } catch (e) {
        this.setState({
          deleteModalShow: true
        })
      }
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          featureType: '',
          status: {value: '', label: 'All'},
          requestBody: ''
        }
      })
      this.searchRequestBody()
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

    setFormValidManage = () => {
      this.setState({
        formValid: true
      })
    }

    intialApiCall = async () => {
      await this.props.fetchFeatureTypeForDrodown(
        hospitalIntegrationConstants.HOSPITAL_FEATURE_TYPE_DROPDOWN
      )
      await this.props.fetchRequestBodyForDrodown(
        requestbodyIntegrationConstants.REQUEST_BODY_INTEGRATION_DROPDOWN
      )
    }

    async componentDidMount () {
      if (type === 'M') {
        await this.searchRequestBody()
      }
      await this.intialApiCall()
    }

    render () {
      const {
        alertMessageInfo,
        deleteModalShow,
        deleteRequestDTO,
        formValid,
        queryParams,
        requestBodyData,
        searchParameters,
        showAlert,
        showConfirmModal,
        showEditModal,
        showRequestBodyModal,
        totalRecords,
        previewData
      } = this.state

      const {
        isSearchRequestBodyLoading,
        searchRequestBodyData,
        searchRequestBodyMessageError
      } = this.props.RequestBodySearchReducers
      const {
        isrequestBodyApiSaveLoading
      } = this.props.RequestBodyIntegrationSaveReducers
      const {
        isPreviewRequestBodyIntegrationLoading,
        // previewRequestBodyIntegrationData,
        previewRequestIntegrationErorrMessage
      } = this.props.RequestBodyPreviewReducers

      const {
        editRequestBodyErrorMessage,
        isEditRequestBodyIntegrationLoading
      } = this.props.RequestBodyEditReducers

      const {
        featureTypeDropdownData
      } = this.props.hospitalFeatureTypeDropdownReducers

      const {
        isDeleteRequestBodyIntegrationLoading,
        deleteRequestBodyIntegrationErrorMessage
      } = this.props.RequestBodyDeleteReducers

      const {requestBodyDropdownData} = this.props.RequestBodyDropdownReducers
      return (
        <>
          <ComposedComponent
            {...this.props}
            {...props}
            commonHandler={{
              handleOnChange: this.handleOnChange,
              requestBodyData,
              queryParams,
              formValid,
              setShowModal: this.setShowModal,
              resetRequestBodyData: this.resetRequestBodyValues,
              setShowConfirmModal: this.setShowConfirmModal,
              onEnterKeyPress: this.handleEnterPress,
              featureTypeDropdownData,
              requestBodyDropdownData
            }}
            addHandler={{
              showConfirmModal,
              handleConfirmClick: this.handleConfirmClick,
              isrequestBodyApiSaveLoading
            }}
            searchHandler={{
              searchParameters,
              handleSearchFormChange: this.handleSearchFormChange,
              handleSearchFormReset: this.handleSearchFormReset,
              searchRequestBody: this.searchRequestBody
            }}
            editHandler={{
              editRequestBodyErrorMessage,
              isEditRequestBodyIntegrationLoading,
              showEditModal,
              editHandler: this.editRequestBodyData
            }}
            tableHandler={{
              showRequestBodyModal,
              totalRecords,
              deleteModalShow,
              deleteRequestDTO,
              pageChangeHandler: this.handlePageChange,
              isSearchRequestBodyLoading,
              searchRequestBodyData: this.appendSNToTable(
                searchRequestBodyData
              ),
              searchRequestBodyMessageError,
              isPreviewRequestBodyIntegrationLoading,
              previewRequestBodyIntegrationData: previewData,
              previewRequestIntegrationErorrMessage,
              isDeleteRequestBodyIntegrationLoading,
              deleteRequestBodyIntegrationErrorMessage,
              onEditHandler: this.onEditHandler,
              onPreviewHandler: this.onPreviewHandler,
              onDeleteHandler: this.onDeleteHandler,
              submitDelete: this.onSubmitDeleteHandler,
              remarksHandler: this.deleteRemarksHandler
            }}
          />
          <CAlert
            id="profile-manage"
            variant={alertMessageInfo.variant}
            show={showAlert}
            onClose={this.closeAlert}
            alertType={
              alertMessageInfo.variant === 'success' ? (
                <>
                  <MdDone />
                </>
              ) : (
                <>
                  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
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
    RequestBodyApiIntegrationSetup,
    [
      'RequestBodyIntegrationSaveReducers',
      'RequestBodyDropdownReducers',
      'RequestBodyEditReducers',
      'RequestBodyDeleteReducers',
      'RequestBodyPreviewReducers',
      'RequestBodySearchReducers',
      'hospitalFeatureTypeDropdownReducers'
    ],
    {
      clearMessages,
      deleteRequestBodyIntegrationData,
      editRequestBodyIntegrationData,
      fetchRequestBodyForDrodown,
      previewRequestBodyIntegrationData,
      saveRequestBodyIntegration,
      searchRequestBodyIntegrationData,
      fetchFeatureTypeForDrodown
    }
  )
}
export default RequestBodyApiIntegrationHOC
