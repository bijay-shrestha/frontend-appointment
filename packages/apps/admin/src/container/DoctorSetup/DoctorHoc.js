import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {DoctorMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  FileExportUtils,
  AdminInfoUtils
} from '@frontend-appointment/helpers'
import './hospitalHoc.scss'

const {
  clearConsultantCreateMessage,
  createConsultant,
  deleteConsultant,
  editConsultant,
  previewConsultant,
  searchConsultant,
  fetchActiveDoctorsForDropdown,
  downloadExcelForConsultants
} = DoctorMiddleware
const DoctorHOC = (ComposedComponent, props, type) => {
  const {
    doctorSetupApiConstants,
    qualificationSetupApiConstants,
    specializationSetupAPIConstants
  } = AdminModuleAPIConstants

  class HospitalSetup extends React.PureComponent {
    state = {
      consultantData: {
        id: '',
        name: '',
        email: '',
        status: 'Y',
        hospitalId: '',
        genderCode: '',
        contactNumber: '',
        specializationIds: [],
        qualificationIds: [],
        appointmentCharge: [],
        nmcNumber: [],
        remarks: '',
        doctorAvatar: null,
        doctorAvatarUrl: ''
      },
      formValid: false,
      nameValid: false,
      contactValid: false,
      logoValid: false,
      showConfirmModal: false,
      errorMessageForDoctorName:
        'Doctor Name should not contain special characters',
      errorMessageForDoctorPhoneNumber:
        'Phone Number should only be 10 digit numbers',
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showDoctorModal: false,
      showEditModal: false,
      deleteModalShow: false,
      searchParameters: {
        code: '',
        mobileNumber: '',
        name: '',
        specializationId: '',
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
      doctorImage: '',
      doctorImageCroppedUrl: '',
      doctorFileCropped: '',
      showImageUploadModal: false
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    setShowModal = () => {
      this.setState({
        showDoctorModal: false,
        deleteModalShow: false,
        showEditModal: false
      })
    }

    resetConsultantStateValues = () => {
      this.setState({
        consultantData: {
          id: '',
          name: '',
          email: '',
          status: 'Y',
          hospitalId: '',
          genderCode: '',
          contactNumber: '',
          specializationIds: [],
          qualificationIds: [],
          appointmentCharge: [],
          nmcNumber: [],
          remarks: '',
          doctorAvatar: null,
          doctorAvatarUrl: ''
        },
        doctorImage: '',
        doctorImageCroppedUrl: '',
        doctorFileCropped: '',
        formValid: false,
        nameValid: false,
        contactValid: false,
        logoValid: false,
        showEditModal: false
      })
    }

    checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
      let stateObj = {[fieldName]: valueToChange}
      if (eventName) {
        if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
        if (eventName === 'contactNmumber')
          stateObj = {...stateObj, contactValid}
      }
      return {...stateObj}
    }

    setTheState = async (fieldName, valueToChange, valid, eventName) => {
      await this.setState(
        this.checkInputValidity(fieldName, valueToChange, valid, eventName)
      )
    }

    closeAlert = () => {
      this.props.clearConsultantCreateMessage()
      this.setState({
        showAlert: !this.state.showAlert,
        alertMessageInfo: ''
      })
    }

    checkFormValidity = eventType => {
      const {consultantData, nameValid, contactValid} = this.state
      let formValidity =
        nameValid &&
        consultantData.appointmentCharge &&
        consultantData.status &&
        consultantData.contactNumber &&
        consultantData.doctorAvatar &&
        consultantData.hospitalId &&
        consultantData.specializationIds.length &&
        consultantData.qualificationIds.length &&
        consultantData.genderCode &&
        consultantData.email &&
        consultantData.nmcNumber &&
        consultantData.doctorAvatar

      if (eventType === 'E') formValidity = formValidity && hospitalData.remarks
      //else formValidity = formValidity && hospitalData.contactNumber.length

      //console.log('Form Valid', formValidity)
      this.setState({
        formValid: formValidity
      })
    }

    addContactNumber = (fieldName, value, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].push(value)
      hospitalData['editContactNumberRequestDTOS'].push(value)
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    removeContactNumber = (fieldName, idx, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].splice(idx, 1)
      if (eventType === 'E')
        hospitalData['editContactNumberRequestDTOS'][idx]['status'] = 'N'
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    editContactNumber = (fieldName, value, idx, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName][idx] = value
      hospitalData['editContactNumberRequestDTOS'][idx] = value
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    handleOnChange = async (event, fieldValid, eventType) => {
      let consultant = {...this.state.consultantData}
      let {name, value, label} = event.target
      value = name === 'nmcNumber' ? value.toUpperCase() : value
      hospital[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState('consultantData', consultant, fieldValid, name)
      this.checkFormValidity(eventType)
    }

    setShowConfirmModal = () => {
      this.setState({showConfirmModal: !this.state.showConfirmModal})
    }

    handleConfirmClick = async () => {
      const {
        name,
        status,
        contactNumber,
        doctorAvatar,
        specializationIds,
        nmcNumber,
        appointmentCharge,
        hospitalId,
        email,
        genderCode,
        qualificationIds
      } = this.state.consultantData
      let formData = new FormData()
      formData.append(
        'avatar',
        new File([doctorAvatar], name.concat('-picture.jpeg'))
      )
      try {
        await this.props.createConsultant(
          doctorSetupApiConstants.CREATE_DOCTOR,
          {
            name,
            status,
            contactNumber,
            specializationIds,
            nmcNumber,
            appointmentCharge,
            hospitalId,
            email,
            genderCode,
            qualificationIds
          },
          formData
        )

        await this.setShowConfirmModal()
        this.resetConsultantStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.DoctorSaveReducer.createConsultantsuccessMessage
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
      }
    }

    previewApiCall = async id => {
      await this.props.previewConsultant(
        doctorSetupApiConstants.FETCH_DOCTOR_DETAILS_FOR_UPDATE,
        id
      )
    }

    onPreviewHandler = async id => {
      try {
        await this.previewApiCall(id)
        this.setState({
          showDoctorModal: true
        })
      } catch (e) {
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: this.props.DoctorPreviewReducer
              .consultantPreviewErrorMessage
          }
        })
      }
    }

    onEditHandler = async id => {
      this.props.clearConsultantCreateMessage()
      try {
        await this.previewApiCall(id)
        const {
          name,
          status,
          remarks,
          panNumber,
          address,
          contactNumberResponseDTOS,
          hospitalCode,
          fileUri
        } = this.props.DoctorPreviewReducer.consultantPreviewData
        let formValid = this.state.formValid
        if (remarks) formValid = true
        this.setState({
          showEditModal: true,
          hospitalData: {
            id: id,
            name: name,
            status: status,
            panNumber: panNumber,
            address: address,
            hospitalCode: hospitalCode,
            remarks: remarks,
            contactNumberUpdateRequestDTOS: [...contactNumberResponseDTOS],
            editContactNumberRequestDTOS: [...contactNumberResponseDTOS],
            hospitalLogoUrl: fileUri,
            hospitalLogo: new File([5120], fileUri),
            hospitalImage: new File([5120], fileUri),
            hospitalImageCroppedUrl: fileUri
          },
          formValid: formValid,
          nameValid: true
        })
      } catch (e) {
        console.log(e)
      }
    }

    searchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveDoctorsForDropdown(
          hospitalSetupApiConstants.SPECIFIC_DROPDOWN_HOSPITAL
        )
      } catch (e) {
        console.log(e)
      }
    }

    searchDoctor = async page => {
      const {
        name,
        status,
        code,
        mobileNumber,
        specializationId
      } = this.state.searchParameters
      let searchData = {
        name: name.value ? name.label : name,
        code: code,
        status: status.value,
        mobileNumber: mobileNumber,
        specializationId: specializationId.value
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.searchConsultant(
        doctorSetupApiConstants.SEARCH_DOCTOR,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )

      await this.setState({
        totalRecords: this.props.DoctorSearchReducer.consultantList.length
          ? this.props.DoctorSearchReducer.hospitalList[0].totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    handleImageSelect = imageUrl => {
      imageUrl && this.setState({consultantImage: imageUrl})
    }

    handleCropImage = croppedImageUrl => {
      croppedImageUrl &&
        this.setState({
          consultantImageCroppedUrl: croppedImageUrl
        })
    }

    handleImageUpload = async croppedImageFile => {
      let croppedImage = this.state.doctorImageCroppedUrl
      let doctorImage = {...this.state.consultantData}
      doctorImage.doctorAvatar = new File(
        [croppedImageFile],
        'doctorAvatar.jpeg'
      )
      doctorImage.doctorAvatarUrl = croppedImage
      await this.setState({
        hospitalData: {...doctorImage},
        showImageUploadModal: false
      })
    }

    appendSNToTable = consultantList => {
      const newConsultantList =
        consultantList.length &&
        consultantList.map((spec, index) => ({
          ...spec,
          sN: index + 1,
          name: spec.name.toUpperCase()
        }))
      console.log('New Consultant List', newConsultantList)
      return newConsultantList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchDoctor()
    }

    editDoctor = async () => {
      const {
        name,
        status,
        hospitalLogo,
        address,
        panNumber,
        hospitalCode,
        editContactNumberRequestDTOS,
        remarks,
        id
      } = this.state.hospitalData
      let formData = new FormData()
      formData.append(
        'file',
        new File([hospitalLogo], name.concat('-picture.jpeg'))
      )
      try {
        console.log(this.state.editContactNumberRequestDTOS)
        await this.props.editHospital(
          hospitalSetupApiConstants.EDIT_HOSPITAL,
          {
            name,
            status,
            address,
            panNumber,
            hospitalCode,
            remarks,
            id,
            contactNumberUpdateRequestDTOS: [...editContactNumberRequestDTOS]
          },
          formData
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
      this.props.clearConsultantCreateMessage()
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
        await this.props.deleteConsultant(
          doctorSetupApiConstants.DELETE_DOCTOR,
          this.state.deleteRequestDTO
        )
        await this.setState({
          deleteModalShow: false,
          deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
          alertMessageInfo: {
            variant: 'success',
            message: this.props.DoctorDeleteReducer.deleteSuccessMessage
          },
          showAlert: true
        })
        await this.searchDoctor()
      } catch (e) {
        this.setState({
          deleteModalShow: true
        })
      }
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          name: '',
          status: {value: '', label: 'All'},
          code: '',
          mobileNumber: '',
          specializationId: ''
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
        await this.searchDoctor()
        await this.searchHospitalForDropDown()
      }
    }
    setImageShowModal = () =>
      this.setState({showImageUploadModal: !this.state.showImageUploadModal})

    render () {
      const {
        consultantData,
        showAlert,
        showConfirmModal,
        formValid,
        contactValid,
        nameValid,
        errorMessageForDoctorPhoneNumber,
        errorMessageForDoctorName,
        alertMessageInfo,
        showHospitalModal,
        showEditModal,
        deleteModalShow,
        searchParameters,
        queryParams,
        deleteRequestDTO,
        totalRecords,
        contactLength,
        doctorImage,
        doctorImageCroppedUrl,
        doctorFileCropped,
        showImageUploadModal
      } = this.state

      const {
        isSearchLoading,
        consultantList,
        searchErrorMessage
      } = this.props.DoctorSearchReducer

      const {
        consultantPreviewData,
        isPreviewLoading,
        consultantPreviewErrorMessage
      } = this.props.DoctorPreviewReducer

      const {consultantEditErrorMessage} = this.props.DoctorEditReducer

      const {consultantErrorMessage} = this.props.DoctorDeleteReducer

      const {doctorsForDropdown} = this.props.DoctorDropdownReducer

      return (
        <ComposedComponent
          {...this.props}
          {...props}
          handleEnter={this.handleEnterPress}
          doctorData={consultantData}
          resetStateAddValues={this.resetConsultantStateValues}
          closeAlert={this.closeAlert}
          showConfirmModal={showConfirmModal}
          formValid={formValid}
          showAlert={showAlert}
          contactValid={contactValid}
          nameValid={nameValid}
          errorMessageForDoctorContact={errorMessageForDoctorContact}
          errorMessageForDoctorName={errorMessageForDoctorName}
          alertMessageInfo={alertMessageInfo}
          handleInputChange={this.handleOnChange}
          submitAddChanges={this.handleConfirmClick}
          setShowConfirmModal={this.setShowConfirmModal}
          handleSearchFormChange={this.handleSearchFormChange}
          deleteRemarksHandler={this.deleteRemarksHandler}
          resetSearch={this.handleSearchFormReset}
          searchDoctor={this.searchDoctor}
          handlePageChange={this.handlePageChange}
          handleSearchFormChange={this.handleSearchFormChange}
          onSubmitDeleteHandler={this.onSubmitDeleteHandler}
          editDoctor={this.editDoctor}
          onEditHandler={this.onEditHandler}
          onDeleteHandler={this.onDeleteHandler}
          onPreviewHandler={this.onPreviewHandler}
          // appendSNToTable={this.appendSNToTable}
          setShowModal={this.setShowModal}
          showDoctorModal={showDoctorModal}
          showEditModal={showEditModal}
          deleteModalShow={deleteModalShow}
          searchParameters={searchParameters}
          queryParams={queryParams}
          deleteRequestDTO={deleteRequestDTO}
          totalRecords={totalRecords}
          isSearchLoading={isSearchLoading}
          hospitalList={this.appendSNToTable(consultantList)}
          searchErrorMessage={searchErrorMessage}
          doctorPreviewErrorMessage={doctorPreviewErrorMessage}
          deleteErrorMessage={deleteErrorMessage}
          doctorEditErrorMessage={doctorEditErrorMessage}
          isPreviewLoading={isPreviewLoading}
          doctorPreviewData={doctorPreviewData}
          addContactNumber={this.addContactNumber}
          removeContactNumber={this.removeContactNumber}
          editContactNumber={this.editContactNumber}
          doctorImage={doctorImage}
          onImageSelect={this.handleImageSelect}
          doctorImageCroppedUrl={doctorImageCroppedUrl}
          doctorFileCropped={doctorFileCropped}
          showImageUploadModal={showImageUploadModal}
          handleCropImage={this.handleCropImage}
          handleImageUpload={this.handleImageUpload}
          setImageShow={this.setImageShowModal}
          doctorDropdown={doctorsForDropdow}
        ></ComposedComponent>
      )
    }
  }

  return ConnectHoc(
    HospitalSetup,
    [
      'DoctorSaveReducer',
      'DoctorDeleteReducer',
      'DoctorEditReducer',
      'DoctorPreviewReducer',
      'DoctorSearchReducer',
      'DoctorDropdownReducer'
    ],
    {
      clearConsultantCreateMessage,
      createConsultant,
      deleteConsultant,
      editConsultant,
      previewConsultant,
      searchConsultant,
      fetchActiveDoctorsForDropdown,
      downloadExcelForConsultants
    }
  )
}
export default DoctorHOC
