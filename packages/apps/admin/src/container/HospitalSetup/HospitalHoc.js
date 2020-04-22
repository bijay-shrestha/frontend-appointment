import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {HospitalSetupMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {EnterKeyPressUtils} from '@frontend-appointment/helpers'
import './hospitalHoc.scss'

const {
  clearHospitalCreateMessage,
  createHospital,
  deleteHospital,
  editHospital,
  previewHospital,
  searchHospital,
  fetchActiveHospitalsForDropdown
  //downloadExcelForHospitals
} = HospitalSetupMiddleware

const {hospitalSetupApiConstants} = AdminModuleAPIConstants

const HospitalHOC = (ComposedComponent, props, type) => {
  class HospitalSetup extends React.PureComponent {
    state = {
      hospitalData: {
        id: '',
        name: '',
        address: '',
        alias: '',
        panNumber: '',
        status: 'Y',
        hospitalCode: '',
        hospitalLogo: null,
        hospitalLogoUrl: '',
        hospitalBanner: null,
        hospitalBannerUrl: '',
        contactNumber: [''],
        contactNumberUpdateRequestDTOS: [],
        editContactNumberRequestDTOS: [],
        isCompany: 'N',
        refundPercentage: '',
        numberOfAdmins: '',
        numberOfFollowUps: '',
        followUpIntervalDays: ''
      },
      formValid: false,
      nameValid: false,
      codeValid: false,
      logoValid: false,
      contactLength: 5,
      showConfirmModal: false,
      errorMessageForHospitalName:
        'Client Name should not contain special characters',
      errorMessageForHospitalCode:
        'Access Key should not contain special characters',
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
        hospitalCode: '',
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
      hospitalBannerImage: '',
      hospitalBannerImageCroppedUrl: '',
      hospitalBannerFileCropped: '',
      showImageUploadModal: false,
      showBannerUploadModal: false
    }

    resetHospitalStateValues = () => {
      this.setState({
        hospitalData: {
          id: '',
          name: '',
          address: '',
          panNumber: '',
          status: 'Y',
          alias: '',
          hospitalCode: '',
          contactNumber: [''],
          contactNumberUpdateRequestDTOS: [],
          editContactNumberRequestDTOS: [],
          isCompany: 'N',
          numberOfFollowUps: '',
          numberOfAdmins: '',
          followUpIntervalDays: '',
          refundPercentage: '',
          hospitalBanner: '',
          hospitalLogo: ''
        },
        hospitalLogo: '',
        hospitalImage: '',
        hospitalImageCroppedUrl: '',
        hospitalFileCropped: '',
        hospitalBannerImage: '',
        hospitalBannerImageCroppedUrl: '',
        hospitalBannerFileCropped: '',
        formValid: false,
        nameValid: false,
        codeValid: false,
        showEditModal: false
      })
    }

    setShowModal = () => {
      this.setState({
        showHospitalModal: false,
        deleteModalShow: false,
        showEditModal: false
      })
    }

    setTheState = async (fieldName, valueToChange, valid, eventName) => {
      await this.setState(
        this.checkInputValidity(fieldName, valueToChange, valid, eventName)
      )
    }

    setShowConfirmModal = () => {
      this.setState({showConfirmModal: !this.state.showConfirmModal})
    }

    setImageShowModal = () =>
      this.setState({showImageUploadModal: !this.state.showImageUploadModal})

    setShowBannerModal = () =>
      this.setState({showBannerUploadModal: !this.state.showBannerUploadModal})

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    setFormValidManage = () => {
      this.setState({
        formValid: true
      })
    }

    checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
      let stateObj = {[fieldName]: valueToChange}
      if (eventName)
        if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
      return {...stateObj}
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
      const {
        name,
        status,
        hospitalCode,
        address,
        panNumber,
        isCompany,
        refundPercentage,
        followUpIntervalDays,
        alias,
        numberOfAdmins,
        numberOfFollowUps
      } = hospitalData
      let formValidity =
        nameValid &&
        name &&
        status &&
        hospitalCode &&
        address &&
        panNumber &&
        refundPercentage >= 0 &&
        followUpIntervalDays >= 0 &&
        numberOfAdmins >= 0 &&
        numberOfFollowUps >= 0 &&
        alias

      if (eventType === 'E')
        formValidity =
          formValidity &&
          hospitalData.remarks &&
          hospitalData.contactNumberUpdateRequestDTOS &&
          hospitalData.contactNumberUpdateRequestDTOS.length
      else
        formValidity =
          formValidity &&
          hospitalData.contactNumber &&
          hospitalData.contactNumber.length

      this.setState({
        formValid: formValidity
      })
    }

    addContactNumber = (fieldName, value, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].push(value)
     // hospitalData['editContactNumberRequestDTOS'].push(value)
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    removeContactNumber = (fieldName, idx, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName].splice(idx, 1)
    //   if (eventType === 'E')
    //     hospitalData['editContactNumberRequestDTOS'][idx]['status'] = 'N'
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    editContactNumber = (fieldName, value, idx, eventType) => {
      let hospitalData = {...this.state.hospitalData}
      hospitalData[fieldName][idx] = value
     // hospitalData['editContactNumberRequestDTOS'][idx] = value
      this.setTheState('hospitalData', hospitalData)
      this.checkFormValidity(eventType)
    }

    previewApiCall = async id => {
      await this.props.previewHospital(
        hospitalSetupApiConstants.FETCH_HOSPITAL_DETAILS,
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

    onEditHandler = async idSelected => {
      this.props.clearHospitalCreateMessage()
      try {
        await this.previewApiCall(idSelected)
        const {
          id,
          name,
          status,
          remarks,
          panNumber,
          alias,
          address,
          contactNumberResponseDTOS,
          hospitalCode,
          hospitalLogo,
          hospitalBanner,
          refundPercentage,
          numberOfAdmins,
          numberOfFollowUps,
          followUpIntervalDays,
          isCompany
        } = this.props.HospitalPreviewReducer.hospitalPreviewData
        let formValid = this.state.formValid
        if (remarks) formValid = true
        this.setState({
          showEditModal: true,
          hospitalData: {
            id: id,
            name: name,
            status: status,
            panNumber: panNumber,
            alias,
            address: address,
            hospitalCode: hospitalCode,
            // remarks: remarks,
            refundPercentage,
            numberOfAdmins,
            numberOfFollowUps,
            followUpIntervalDays,
            contactNumberUpdateRequestDTOS: [...contactNumberResponseDTOS],
            editContactNumberRequestDTOS: [...contactNumberResponseDTOS],
            hospitalLogoUrl: hospitalLogo,
            hospitalBannerUrl: hospitalBanner,
            hospitalLogo: new File([5120], hospitalLogo),
            hospitalImage: new File([5120], hospitalLogo),
            hospitalImageCroppedUrl: hospitalLogo,
            hospitalBanner: new File([5120], hospitalBanner),
            hospitalBannerImage: new File([5120], hospitalBanner),
            hospitalBannerImageCroppedUrl: hospitalBanner,
            isCompany
          },
          formValid: formValid,
          nameValid: true
        })
        this.checkFormValidity()
      } catch (e) {
        console.log(e)
      }
    }

    filterOutContactNumber = contactNumber => {
      let filteredContactNumber = []
     
      const newContactNumber = [...this.state.hospitalData.editContactNumberRequestDTOS]
       newContactNumber.map(contactEdit => {
        let flag = false
          for (let i = 0; i < contactNumber.length; i++) {
              if (
                Number(contactEdit.hospitalContactNumberId) ===
                Number(contactNumber[i].hospitalContactNumberId)
              ) {
                filteredContactNumber.push(contactEdit)
                flag = true
                console.log("========",filteredContactNumber)
                 break;
              }
              
            }
            if (!flag) {
                filteredContactNumber.push({...contactEdit, status: 'N'})
              }
           

      });
      console.log(filteredContactNumber)
      contactNumber.map(cont => {if(!cont.hospitalContactNumberId && cont.contactNumber.length) filteredContactNumber.push(cont)})
      return filteredContactNumber
    }

    editHospital = async () => {
      const {
        name,
        status,
        hospitalLogo,
        address,
        panNumber,
        hospitalCode,
        editContactNumberRequestDTOS,
        contactNumberUpdateRequestDTOS,
        remarks,
        id,
        refundPercentage,
        followUpIntervalDays,
        hospitalBanner,
        numberOfAdmins,
        numberOfFollowUps,
        // isCompany,
        alias
      } = this.state.hospitalData
      let hospitalData = {
        id,
        name,
        status,
        contactNumberUpdateRequestDTOS: this.filterOutContactNumber(
          contactNumberUpdateRequestDTOS
        ),
        remarks,
        address,
        panNumber,
        hospitalCode,
        alias,
        // isCompany,
        numberOfFollowUps,
        numberOfAdmins,
        followUpIntervalDays,
        refundPercentage
      }

      let formData = new FormData()
      formData.append(
        'logo',
        hospitalLogo
          ? new File([hospitalLogo], name.concat('-picture.jpeg'))
          : null
      )
      formData.append(
        'banner',
        hospitalBanner
          ? new File([hospitalBanner], name.concat('-picture.jpeg'))
          : null
      )
      try {
        await this.props.editHospital(
          hospitalSetupApiConstants.EDIT_HOSPITAL,
          hospitalData,
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

    searchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveHospitalsForDropdown(
          hospitalSetupApiConstants.FETCH_HOSPITALS_FOR_DROPDOWN
        )
      } catch (e) {
        console.log(e)
      }
    }

    searchHospital = async page => {
      const {hospitalCode, name, status, id} = this.state.searchParameters
      let searchData = {
        name: name.value ? name.label : name,
        hospitalCode: hospitalCode,
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
        hospitalSetupApiConstants.SEARCH_HOSPITAL,
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

    appendSNToTable = hospitalList => {
      const newHospitalList =
        hospitalList.length &&
        hospitalList.map((spec, index) => ({
          ...spec,
          sN: index + 1
        }))
      return newHospitalList
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
          hospitalSetupApiConstants.DELETE_HOSPITAL,
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

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
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

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          hospitalCode: '',
          status: {value: '', label: 'All'},
          name: ''
          //id: null
        }
      })
      this.searchHospital()
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchHospital()
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

    handleBannerSelect = imageUrl => {
      imageUrl && this.setState({hospitalBannerImage: imageUrl})
    }

    handleCropBannerImage = croppedImageUrl => {
      croppedImageUrl &&
        this.setState({
          hospitalBannerImageCroppedUrl: croppedImageUrl
        })
    }

    handleBannerImageUpload = async croppedImageFile => {
      let croppedImage = this.state.hospitalBannerImageCroppedUrl
      let hospitalImage = {...this.state.hospitalData}
      hospitalImage.hospitalBanner = new File(
        [croppedImageFile],
        'hospitalBanner.jpeg'
      )
      hospitalImage.hospitalBannerUrl = croppedImage
      await this.setState({
        hospitalData: {...hospitalImage},
        showBannerUploadModal: false
      })
    }

    handleConfirmClick = async () => {
      const {
        name,
        status,
        contactNumber,
        hospitalLogo,
        address,
        panNumber,
        hospitalCode,
        isCompany,
        numberOfFollowUps,
        numberOfAdmins,
        followUpIntervalDays,
        refundPercentage,
        hospitalBanner,
        alias
      } = this.state.hospitalData

      let hospitalData = {
        name,
        status,
        contactNumber,
        address,
        panNumber,
        hospitalCode,
        alias,
        // isCompany,
        numberOfFollowUps,
        numberOfAdmins,
        followUpIntervalDays,
        refundPercentage
      }

      let formData = new FormData()
      formData.append(
        'logo',
        hospitalLogo
          ? new File([hospitalLogo], name.concat('-picture.jpeg'))
          : null
      )
      formData.append(
        'banner',
        hospitalBanner
          ? new File([hospitalBanner], name.concat('-picture.jpeg'))
          : null
      )

      try {
        await this.props.createHospital(
          hospitalSetupApiConstants.CREATE_HOSPITAL,
          hospitalData,
          formData
        )

        await this.setShowConfirmModal()
        this.resetHospitalStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.HospitalSaveReducer.createHospitalsuccessMessage
          }
        })
      } catch (e) {
        this.setState({
          showConfirmModal: false,
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: e.errorMessage ? e.errorMessage : e.message
          }
        })
      }
    }

    handleOnChange = async (event, fieldValid, eventType) => {
      let hospital = {...this.state.hospitalData}
      let {name, value, label, type} = event.target

      value =
        name === 'hospitalCode' || name === 'alias'
          ? value.toUpperCase()
          : type === 'checkbox'
          ? event.target.checked
            ? 'Y'
            : 'N'
          : value

      hospital[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState('hospitalData', hospital, fieldValid, name)
      this.checkFormValidity(eventType)
    }

    async componentDidMount () {
      if (type === 'M') {
        await this.searchHospital()
        await this.searchHospitalForDropDown()
      }
    }

    render () {
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
        showImageUploadModal,
        hospitalBannerFileCropped,
        hospitalBannerImage,
        hospitalBannerImageCroppedUrl,
        showBannerUploadModal
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

      const {createHospitalLoading} = this.props.HospitalSaveReducer

      const {
        hospitalEditErrorMessage,
        isHospitalEditLoading
      } = this.props.HospitalEditReducer

      const {
        deleteErrorMessage,
        isDeleteLoading
      } = this.props.HospitalDeleteReducer

      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

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
          onSubmitDeleteHandler={this.onSubmitDeleteHandler}
          editHospital={this.editHospital}
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
          hospitalPreviewErrorMessage={hospitalPreviewErrorMessage}
          deleteErrorMessage={deleteErrorMessage}
          hospitalEditErrorMessage={hospitalEditErrorMessage}
          isPreviewLoading={isPreviewLoading}
          hospitalPreviewData={hospitalPreviewData}
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
          hospitalBannerImage={hospitalBannerImage}
          hospitalBannerImageCroppedUrl={hospitalBannerImageCroppedUrl}
          hospitalBannerFileCropped={hospitalBannerFileCropped}
          showBannerUploadModal={showBannerUploadModal}
          onBannerImageSelect={this.handleBannerSelect}
          handleCropBannerImage={this.handleCropBannerImage}
          handleBannerImageUpload={this.handleBannerImageUpload}
          setShowBannerUploadModal={this.setShowBannerModal}
          hospitalDropdown={hospitalsForDropdown}
          createHospitalLoading={createHospitalLoading}
          isHospitalEditLoading={isHospitalEditLoading}
          isDeleteLoading={isDeleteLoading}
        />
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
      'HospitalSearchReducer',
      'HospitalDropdownReducer'
    ],
    {
      clearHospitalCreateMessage,
      createHospital,
      deleteHospital,
      editHospital,
      previewHospital,
      searchHospital,
      fetchActiveHospitalsForDropdown
    }
  )
}
export default HospitalHOC
