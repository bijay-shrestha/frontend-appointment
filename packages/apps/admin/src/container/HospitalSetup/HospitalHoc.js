import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {HospitalSetupMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  FileExportUtils,
  AdminInfoUtils
} from '@frontend-appointment/helpers'
import './hospitalHoc.scss'

const {
  clearHospitalCreateMessage,
  createHospital,
  deleteHospital,
  editHospital,
  previewHospital,
  searchHospital
  //downloadExcelForHospitals
} = HospitalSetupMiddleware
const HospitalHOC = (ComposedComponent, props, type) => {
  const {hostpitalSetupApiConstants} = AdminModuleAPIConstants

  class HospitalSetup extends React.PureComponent {
    state = {
      hospitalData: {
        name: '',
        address: '',
        panNumber: '',
        status: 'Y',
        hospitalCode: '',
        hospitalLogo: null,
        hospitalLogoUrl: '',
        contactNumber: [],
        contactNumberUpdateRequestDTOS: []
      },
      formValid: false,
      nameValid: false,
      codeValid: false,
      logoValid: false,
      contactLength: 5,
      showConfirmModal: false,
      errorMessageForHospitalName:
        'Hospital Name should not contain special characters',
      errorMessageForHospitalCode:
        'Hospital Code should not contain special characters',
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showHospitalModal: false,
      showEditModal: false,
      deleteModalShow: false,
      searchParameters: {
        // code: '',
        // id: null,
        name: '',
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
      hospitalImage: '',
      hospitalImageCroppedUrl: '',
      hospitalFileCropped: '',
      showImageUploadModal: false
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    setShowModal = () => {
      this.setState({
        showHospitalModal: false,
        deleteModalShow: false,
        showEditModal: false
      })
    }

    resetHospitalStateValues = () => {
      this.setState({
        hospitalData: {
          name: '',
          address: '',
          panNumber: '',
          status: 'Y',
          hospitalCode: '',
          contactNumber: [],
          contactNumberUpdateRequestDTOS: []
        },
        hospitalLogo: '',
        formValid: false,
        nameValid: false,
        codeValid: false,
        showEditModal: false
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

    closeAlert = () => {
      this.props.clearHospitalCreateMessage()
      this.setState({
        showAlert: !this.state.showAlert,
        alertMessageInfo: ''
      })
    }

    checkFormValidity = eventType => {
      const {hospitalData, nameValid} = this.state
      let formValidity =
        nameValid &&
        hospitalData.name &&
        hospitalData.hospitalCode &&
        hospitalData.status &&
        hospitalData.address &&
        hospitalData.panNumber

      if (eventType === 'E')
        formValidity =
          formValidity &&
          hospitalData.remarks &&
          hospitalData.contactNumberUpdateRequestDTOS.length
      else formValidity = formValidity && hospitalData.contactNumber.length
      this.setState({
        formValid: formValidity
      })
    }

    addContactNumber = (fieldName, value, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].push(value)
        this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    removeContactNumber = (fieldName, idx, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].splice(idx, 1)
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    editContactNumber = (fieldName, value, idx, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName][idx] = value
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    handleOnChange = async (event, fieldValid, eventType) => {
      let hospital = {...this.state.hospitalData}
      let {name, value, label} = event.target
      value = name === 'hospitalCode' ? value.toUpperCase() : value
      hospital[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState('hospitalData', hospital, fieldValid, name)
      this.checkFormValidity(eventType)
    }

    setShowConfirmModal = () => {
      this.setState({showConfirmModal: !this.state.showConfirmModal})
    }

    handleConfirmClick = async () => {
      const {
        name,
        hospitalCode,
        status,
        contactNumber,
        hospitalLogo,
        address,
        panNumber
      } = this.state.hospitalData
      let formData = new FormData()
      formData.append(
        'file',
        new File([hospitalLogo], name.concat('-picture.jpeg'))
      )
      try {
        await this.props.createHospital(
          hostpitalSetupApiConstants.CREATE_HOSPITAL,
          {name, hospitalCode, status, contactNumber, address, panNumber},
          formData
        )
        this.resetHospitalStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalSaveReducer.createHospitalsuccessMessage
          }
        })
      } catch (e) {
        await this.setShowConfirmModal()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: e.errorMessage ? e.errorMessage : e.message
          }
        })
      }
    }

    previewApiCall = async id => {
      await this.props.previewHospital(
        hostpitalSetupApiConstants.FETCH_HOSPITAL_DETAILS,
        id
      )
    }

    onPreviewHandler = async id => {
      try {
        await this.previewApiCall(id)
        this.setState({
          showHospitalModal: true
        })
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.HospitalPreviewReducer
              .hospitalPreviewErrorMessage
          }
        })
      }
    }

    onEditHandler = async id => {
      this.props.clearHospitalCreateMessage()
      try {
        await this.previewApiCall(id)
        const {
          name,
          code,
          status,
          remarks
        } = this.props.HospitalPreviewReducer.hospitalPreviewData
        let formValid = this.state.formValid
        if (remarks) formValid = true
        this.setState({
          showEditModal: true,
          specializationData: {
            id: id,
            name: name,
            code: code,
            status: status,
            remarks: remarks
          },
          formValid: formValid
        })
      } catch (e) {
        console.log(e)
      }
    }

    searchHospital = async page => {
      const {code, name, status, id} = this.state.searchParameters
      let searchData = {
        name: name,
        code: code,
        status: status.value,
        id: id
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.searchHospital(
        hostpitalSetupApiConstants.SEARCH_HOSPITAL,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )

      await this.setState({
        totalRecords: this.props.HospitalSearchReducer.hospitalList.length
          ? this.props.HospitalSearchReducer.hospitalList[0].totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    handleImageSelect = imageUrl => {
      imageUrl && this.setState({hospitalImage: imageUrl})
    }

    handleCropImage = croppedImageUrl => {
      croppedImageUrl &&
        this.setState({
          hospitalImageCroppedUrl: croppedImageUrl
        })
    }

    handleImageUpload = async croppedImageFile => {
      let croppedImage = this.state.hospitalImageCroppedUrl
      let hospitalImage = {...this.state.hospitalData}
      hospitalImage.hospitalLogo = new File(
        [croppedImageFile],
        'hospitalAvatar.jpeg'
      )
      hospitalImage.hospitalLogoUrl = croppedImage
      await this.setState({
        hospitalData: {...hospitalImage},
        showImageUploadModal: false
      })
    }

    appendSNToTable = hospitalList => {
      const newHospitalList =
        hospitalList.length &&
        hospitalList.map((spec, index) => ({
          ...spec,
          sN: index + 1,
          name: spec.name.toUpperCase()
        }))
        console.log('New HospitalList',newHospitalList)
      return newHospitalList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchSpecialization()
    }

    editHospital = async () => {
      try {
        await this.props.editHospital(
          hostpitalSetupApiConstants.EDIT_HOSPITAL,
          this.state.hospitalData
        )
        this.resetHospitalStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalEditReducer.hospitalEditSuccessMessage
          }
        })
        await this.searchHospital()
      } catch (e) {}
    }

    onDeleteHandler = async id => {
      this.props.clearHospitalCreateMessage()
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
        await this.props.deleteHospital(
          hostpitalSetupApiConstants.DELETE_HOSPITAL,
          this.state.deleteRequestDTO
        )
        await this.setState({
          deleteModalShow: false,
          deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalDeleteReducer.deleteSuccessMessage
          },
          showAlert: true
        })
        await this.searchHospital()
      } catch (e) {
        this.setState({
          deleteModalShow: true
        })
      }
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          // code: '',
          status: {value: '', label: 'All'},
          name: ''
          //id: null
        }
      })
      this.searchHospital()
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

    async componentDidMount () {
      if (type === 'M') {
        await this.searchHospital()
        //this.setFormValidManage();
      }
    }
    setImageShowModal = () =>
      this.setState({showImageUploadModal: !this.state.showImageUploadModal})

    render () {
      console.log(this.props.HospitalSearchReducer);
      console.log('Preview Data',this.props.HospitalSearchReducer)
      const {
        hospitalData,
        showAlert,
        showConfirmModal,
        formValid,
        codeValid,
        nameValid,
        errorMessageForHospitalCode,
        errorMessageForHospitalName,
        alertMessageInfo,
        showHospitalModal,
        showEditModal,
        deleteModalShow,
        searchParameters,
        queryParams,
        deleteRequestDTO,
        totalRecords,
        contactLength,
        hospitalImage,
        hospitalImageCroppedUrl,
        hospitalFileCropped,
        showImageUploadModal
      } = this.state

      const {
        isSearchLoading,
        hospitalList,
        searchErrorMessage
      } = this.props.HospitalSearchReducer

      const {
        hospitalPreviewData,
        isPreviewLoading,
        hospitalPreviewErrorMessage
      } = this.props.HospitalPreviewReducer

      const {hospitalEditErrorMessage} = this.props.HospitalEditReducer

      const {deleteErrorMessage} = this.props.HospitalDeleteReducer

      return (
        <ComposedComponent
          {...this.props}
          {...props}
          handleEnter={this.handleEnterPress}
          hospitalData={hospitalData}
          resetStateAddValues={this.resetHospitalStateValues}
          closeAlert={this.closeAlert}
          showConfirmModal={showConfirmModal}
          formValid={formValid}
          showAlert={showAlert}
          codeValid={codeValid}
          nameValid={nameValid}
          errorMessageForHospitalCode={errorMessageForHospitalCode}
          errorMessageForHospitalName={errorMessageForHospitalName}
          alertMessageInfo={alertMessageInfo}
          handleInputChange={this.handleOnChange}
          submitAddChanges={this.handleConfirmClick}
          setShowConfirmModal={this.setShowConfirmModal}
          handleSearchFormChange={this.handleSearchFormChange}
          deleteRemarksHandler={this.deleteRemarksHandler}
          resetSearch={this.handleSearchFormReset}
          searchHospital={this.searchHospital}
          handlePageChange={this.handlePageChange}
          handleSearchFormChange={this.handleSearchFormChange}
          onSubmitDeleteHandler={this.onSubmitDeleteHandler}
          editHospital={this.editSpeclization}
          onEditHandler={this.onEditHandler}
          onDeleteHandler={this.onDeleteHandler}
          onPreviewHandler={this.onPreviewHandler}
          // appendSNToTable={this.appendSNToTable}
          setShowModal={this.setShowModal}
          showHospitalModal={showHospitalModal}
          showEditModal={showEditModal}
          deleteModalShow={deleteModalShow}
          searchParameters={searchParameters}
          queryParams={queryParams}
          deleteRequestDTO={deleteRequestDTO}
          totalRecords={totalRecords}
          isSearchLoading={isSearchLoading}
          hospitalList={this.appendSNToTable(hospitalList)}
          searchErrorMessage={searchErrorMessage}
          specializationPreviewErrorMessage={hospitalPreviewErrorMessage}
          deleteErrorMessage={deleteErrorMessage}
          specializationEditErrorMessage={hospitalEditErrorMessage}
          isPreviewLoading={isPreviewLoading}
          specializationPreviewData={hospitalPreviewData}
          addContactNumber={this.addContactNumber}
          removeContactNumber={this.removeContactNumber}
          editContactNumber={this.editContactNumber}
          contactLength={contactLength}
          hospitalImage={hospitalImage}
          onImageSelect={this.handleImageSelect}
          hospitalImageCroppedUrl={hospitalImageCroppedUrl}
          hospitalFileCropped={hospitalFileCropped}
          showImageUploadModal={showImageUploadModal}
          handleCropImage={this.handleCropImage}
          handleImageUpload={this.handleImageUpload}
          setImageShow={this.setImageShowModal}
        ></ComposedComponent>
      )
    }
  }

  return ConnectHoc(
    HospitalSetup,
    [
      'HospitalSaveReducer',
      'HospitalDeleteReducer',
      'HospitalEditReducer',
      'HospitalPreviewReducer',
      'HospitalSearchReducer'
    ],
    {
      clearHospitalCreateMessage,
      createHospital,
      deleteHospital,
      editHospital,
      previewHospital,
      searchHospital
    }
  )
}
export default HospitalHOC
