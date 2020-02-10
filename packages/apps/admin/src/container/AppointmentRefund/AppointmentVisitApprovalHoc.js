import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {AppointmentDetailsMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  EnterKeyPressUtils,
  FileExportUtils
} from '@frontend-appointment/helpers'
import './hospitalHoc.scss'

const {
   clearAppointmentRefundPending,
   fetchAppointmentRefundList
  //downloadExcelForHospitals
} = AppointmentDetailsMiddleware
const AppointmentDetailHOC = (ComposedComponent, props, type) => {
  const {appointmentSetupApiConstant} = AdminModuleAPIConstants

  class AppointmentSetup extends React.PureComponent {
    state = {
      searchParameters: {
        appointmentNumber:'',
        fromDate:'',
        toDate:'',
        hospitalId:'',
        patientMetaInfoId:'',
        patientType:'',
        specializationId:'',
        name: '',
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
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    // setShowModal = () => {
    //   this.setState({
    //     showHospitalModal: false,
    //     deleteModalShow: false,
    //     showEditModal: false
    //   })
    // }

    // resetHospitalStateValues = () => {
    //   this.setState({
    //     hospitalData: {
    //       id: '',
    //       name: '',
    //       address: '',
    //       panNumber: '',
    //       status: 'Y',
    //       hospitalCode: '',
    //       contactNumber: [''],
    //       contactNumberUpdateRequestDTOS: [],
    //       editContactNumberRequestDTOS: []
    //     },
    //     hospitalLogo: '',
    //     hospitalImage: '',
    //     hospitalImageCroppedUrl: '',
    //     hospitalFileCropped: '',
    //     formValid: false,
    //     nameValid: false,
    //     codeValid: false,
    //     showEditModal: false
    //   })
    // }

    // checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
    //   let stateObj = {[fieldName]: valueToChange}
    //   if (eventName)
    //     if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
    //   return {...stateObj}
    // }

    // setTheState = async (fieldName, valueToChange, valid, eventName) => {
    //   await this.setState(
    //     this.checkInputValidity(fieldName, valueToChange, valid, eventName)
    //   )
    // }

    // closeAlert = () => {
    //   this.props.clearHospitalCreateMessage()
    //   this.setState({
    //     showAlert: !this.state.showAlert,
    //     alertMessageInfo: ''
    //   })
    // }

    // checkFormValidity = eventType => {
    //   const {hospitalData, nameValid} = this.state
    //   let formValidity =
    //     nameValid &&
    //     hospitalData.name &&
    //     hospitalData.status &&
    //     hospitalData.hospitalCode &&
    //     hospitalData.address &&
    //     hospitalData.panNumber

    //   if (eventType === 'E')
    //     formValidity =
    //       formValidity &&
    //       hospitalData.remarks &&
    //       hospitalData.contactNumberUpdateRequestDTOS.length
    //   else formValidity = formValidity && hospitalData.contactNumber.length

    //   console.log('Form Valid', formValidity)
    //   this.setState({
    //     formValid: formValidity
    //   })
    // }

    // handleOnChange = async (event, fieldValid, eventType) => {
    //   let hospital = {...this.state.hospitalData}
    //   let {name, value, label} = event.target
    //   value = name === 'hospitalCode' ? value.toUpperCase() : value
    //   hospital[name] = !label
    //     ? value
    //     : value
    //     ? {value: value, label: label}
    //     : {value: null}
    //   await this.setTheState('hospitalData', hospital, fieldValid, name)
    //   this.checkFormValidity(eventType)
    // }

    // setShowConfirmModal = () => {
    //   this.setState({showConfirmModal: !this.state.showConfirmModal})
    // }

    // handleConfirmClick = async () => {
    //   const {
    //     name,
    //     status,
    //     contactNumber,
    //     hospitalLogo,
    //     address,
    //     panNumber,
    //     hospitalCode
    //   } = this.state.hospitalData
    //   let formData = new FormData()
    //   formData.append(
    //     'file',
    //     new File([hospitalLogo], name.concat('-picture.jpeg'))
    //   )
    //   try {
    //     await this.props.createHospital(
    //       hospitalSetupApiConstants.CREATE_HOSPITAL,
    //       {name, hospitalCode, status, contactNumber, address, panNumber},
    //       formData
    //     )

    //     await this.setShowConfirmModal()
    //     this.resetHospitalStateValues()
    //     this.setState({
    //       showAlert: true,
    //       alertMessageInfo: {
    //         variant: 'success',
    //         message: this.props.HospitalSaveReducer.createHospitalsuccessMessage
    //       }
    //     })
    //   } catch (e) {
    //     this.setState({
    //       showAlert: true,
    //       alertMessageInfo: {
    //         variant: 'danger',
    //         message: e.errorMessage ? e.errorMessage : e.message
    //       }
    //     })
    //   }
    // }

    // previewApiCall = async id => {
    //   await this.props.previewHospital(
    //     hospitalSetupApiConstants.FETCH_HOSPITAL_DETAILS,
    //     id
    //   )
    // }

    // onPreviewHandler = async id => {
    //   try {
    //     await this.previewApiCall(id)
    //     this.setState({
    //       showHospitalModal: true
    //     })
    //   } catch (e) {
    //     this.setState({
    //       showAlert: true,
    //       alertMessageInfo: {
    //         variant: 'danger',
    //         message: this.props.HospitalPreviewReducer
    //           .hospitalPreviewErrorMessage
    //       }
    //     })
    //   }
    // }

    // onEditHandler = async id => {
    //   this.props.clearHospitalCreateMessage()
    //   try {
    //     await this.previewApiCall(id)
    //     const {
    //       name,
    //       status,
    //       remarks,
    //       panNumber,
    //       address,
    //       contactNumberResponseDTOS,
    //       hospitalCode,
    //       fileUri
    //     } = this.props.HospitalPreviewReducer.hospitalPreviewData
    //     let formValid = this.state.formValid
    //     if (remarks) formValid = true
    //     this.setState({
    //       showEditModal: true,
    //       hospitalData: {
    //         id: id,
    //         name: name,
    //         status: status,
    //         panNumber: panNumber,
    //         address: address,
    //         hospitalCode: hospitalCode,
    //         remarks: remarks,
    //         contactNumberUpdateRequestDTOS: [...contactNumberResponseDTOS],
    //         editContactNumberRequestDTOS: [...contactNumberResponseDTOS],
    //         hospitalLogoUrl: fileUri,
    //         hospitalLogo: new File([5120], fileUri),
    //         hospitalImage: new File([5120], fileUri),
    //         hospitalImageCroppedUrl: fileUri
    //       },
    //       formValid: formValid,
    //       nameValid: true
    //     })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    searchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveHospitalsForDropdown(
          hospitalSetupApiConstants.SPECIFIC_DROPDOWN_HOSPITAL
        )
      } catch (e) {
        console.log(e)
      }
    }

    searchAppointment = async page => {
      let searchData = {
       ...this.state.searchParameters  
      }

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchAppointmentRefundList(
         appointmentSetupApiConstant.APPOINTMENT_REFUND_LIST,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )

      await this.setState({
        totalRecords: this.props.AppointmentRefundSearchReducer.refundList.length
          ? this.props.AppointmentRefundSearchReducer.refundList[0].totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        }
      })
    }

    // handleImageSelect = imageUrl => {
    //   imageUrl && this.setState({hospitalImage: imageUrl})
    // }

    // handleCropImage = croppedImageUrl => {
    //   croppedImageUrl &&
    //     this.setState({
    //       hospitalImageCroppedUrl: croppedImageUrl
    //     })
    // }

    // handleImageUpload = async croppedImageFile => {
    //   let croppedImage = this.state.hospitalImageCroppedUrl
    //   let hospitalImage = {...this.state.hospitalData}
    //   hospitalImage.hospitalLogo = new File(
    //     [croppedImageFile],
    //     'hospitalAvatar.jpeg'
    //   )
    //   hospitalImage.hospitalLogoUrl = croppedImage
    //   await this.setState({
    //     hospitalData: {...hospitalImage},
    //     showImageUploadModal: false
    //   })
    // }

    // appendSNToTable = hospitalList => {
    //   const newHospitalList =
    //     hospitalList.length &&
    //     hospitalList.map((spec, index) => ({
    //       ...spec,
    //       sN: index + 1,
    //       name: spec.name.toUpperCase()
    //     }))
    //   console.log('New HospitalList', newHospitalList)
    //   return newHospitalList
    // }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchAppointment()
    }

    // editHospital = async () => {
    //   const {
    //     name,
    //     status,
    //     hospitalLogo,
    //     address,
    //     panNumber,
    //     hospitalCode,
    //     editContactNumberRequestDTOS,
    //     remarks,
    //     id
    //   } = this.state.hospitalData
    //   let formData = new FormData()
    //   formData.append(
    //     'file',
    //     new File([hospitalLogo], name.concat('-picture.jpeg'))
    //   )
    //   try {
    //     console.log(this.state.editContactNumberRequestDTOS)
    //     await this.props.editHospital(
    //       hospitalSetupApiConstants.EDIT_HOSPITAL,
    //       {
    //         name,
    //         status,
    //         address,
    //         panNumber,
    //         hospitalCode,
    //         remarks,
    //         id,
    //         contactNumberUpdateRequestDTOS: [...editContactNumberRequestDTOS]
    //       },
    //       formData
    //     )
    //     this.resetHospitalStateValues()
    //     this.setState({
    //       showAlert: true,
    //       alertMessageInfo: {
    //         variant: 'success',
    //         message: this.props.HospitalEditReducer.hospitalEditSuccessMessage
    //       }
    //     })
    //     await this.searchHospital()
    //   } catch (e) {}
    // }

    // onDeleteHandler = async id => {
    //   this.props.clearHospitalCreateMessage()
    //   let deleteRequestDTO = {...this.state.deleteRequestDTO}
    //   deleteRequestDTO['id'] = id
    //   await this.setState({
    //     deleteRequestDTO: deleteRequestDTO,
    //     deleteModalShow: true
    //   })
    // }

    // deleteRemarksHandler = event => {
    //   const {name, value} = event.target
    //   let deleteRequest = {...this.state.deleteRequestDTO}
    //   deleteRequest[name] = value
    //   this.setState({
    //     deleteRequestDTO: deleteRequest
    //   })
    // }

    // onSubmitDeleteHandler = async () => {
    //   try {
    //     await this.props.deleteHospital(
    //       hospitalSetupApiConstants.DELETE_HOSPITAL,
    //       this.state.deleteRequestDTO
    //     )
    //     await this.setState({
    //       deleteModalShow: false,
    //       deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
    //       alertMessageInfo: {
    //         variant: 'success',
    //         message: this.props.HospitalDeleteReducer.deleteSuccessMessage
    //       },
    //       showAlert: true
    //     })
    //     await this.searchHospital()
    //   } catch (e) {
    //     this.setState({
    //       deleteModalShow: true
    //     })
    //   }
    // }

    handleSearchFormReset = async () => {
      await this.setState({
          searchParameters: {
            appointmentNumber:'',
            fromDate:'',
            toDate:'',
            hospitalId:'',
            patientMetaInfoId:'',
            patientType:'',
            specializationId:'',
            name: '',
          }
      })
      this.searchAppointment();
    }

    // setStateValuesForSearch = searchParams => {
    //   this.setState({
    //     searchParameters: searchParams
    //   })
    // }

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
      await this.searchAppointment()
    }

    // setImageShowModal = () =>
    //   this.setState({showImageUploadModal: !this.state.showImageUploadModal})

    render () {
      const {
        searchParameters,
        queryParams,
        deleteRequestDTO,
        totalRecords,
      } = this.state

      const {
        isSearchLoading,
        refundList,
        searchErrorMessage
      } = this.props.HospitalSearchReducer

      const {
        hospitalPreviewData,
        isPreviewLoading,
        hospitalPreviewErrorMessage
      } = this.props.HospitalPreviewReducer

      const {hospitalEditErrorMessage} = this.props.HospitalEditReducer

      const {deleteErrorMessage} = this.props.HospitalDeleteReducer

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
          searchAppointment={this.searchAppointment}
          handlePageChange={this.handlePageChange}
          handleSearchFormChange={this.handleSearchFormChange}
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
          hospitalDropdown={hospitalsForDropdown}
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
