import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {SpecializationSetupMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {CAlert, CButton} from '@frontend-aappointment/ui-elements';
import {Col, Container, Row} from 'react-bootstrap';
import {
  EnterKeyPressUtils,
  FileExportUtils,
  AdminInfoUtils
} from '@frontend-appointment/helpers';
import './specialization.css';
const {
  clearSpecializationCreateMessage,
  createSpecialization,
  deleteSpecialization,
  downloadExcelForSpecializations,
  editSpecialization,
  previewSpecialization,
  searchSpecialization
} = SpecializationSetupMiddleware
const SpecializationHOC = ComposedComponent => {
  const {specializationSetupAPIConstants} = AdminModuleAPIConstants

  return class SpecializationSetup extends React.PureComponent {
    state = {
      specializationData: {
        name: '',
        code: '',
        status: 'Y',
        remarks: ''
      },
      formValid: false,
      nameValid: false,
      codeValid: false,
      showConfirmModal: false,
      errorMessageForSpecializationName:
        'Specialization Name should not contain special characters',
      errorMessageForSpecializationCode: '',
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      }
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    resetSpecializationStateValues = () => {
      this.setState({
        specializationData: {name: '', code: '', status: 'Y', remarks: ''},
        showConfirmModal: false,
        formValid: false,
        nameValid: false,
        codeValid: false
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
      this.props.clearSpecializationCreateMessage()
      this.setState({
        showAlert: !this.state.showAlert,
        alertMessageInfo: ''
      })
    }

    checkFormValidity = () => {
      const {specializationData, nameValid} = this.state
      let formValidity =
        nameValid &&
        specializationData.name &&
        specializationData.code &&
        specializationData.status &&
        specializationData.remarks
      this.setState({
        formValid: formValidity
      })
    }

    handleOnChange = async (event, fieldValid) => {
      let specialization = {...this.state.specializationData}
      let {name, value, label} = event.target
      value = name === 'code' ? value.toUpperCase() : value
      specialization[name] = !label
        ? value
        : value
        ? {value: value, label: label}
        : {value: null}
      await this.setTheState(
        'specializationData',
        specialization,
        fieldValid,
        name
      )
      this.checkFormValidity()
    }

    setShowConfirmModal = () => {
      this.setState({showConfirmModal: !this.state.showConfirmModal})
    }

    handleConfirmClick = async () => {
      const {name, code, departmentId, status} = this.state.subDepartment
      try {
        await this.props.createSubDepartMent(CREATE_SUB_DEPARTMENT, {
          name,
          code,
          departmentId: departmentId.value,
          status
        })
        this.resetSpecializationStateValues()
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.SpecializationSaveReducer
              .createSpecializationsuccessMessage
          }
        })
      } catch (e) {
        await this.setShowConfirmModal();
        this.setState({
          showAlert: true,
          alertMessageInfo: {
            variant: 'danger',
            message: e.errorMessage ? e.errorMessage : e.message
          }
        })
      }
    }

    render () {
      const {
        specializationData,
        showAlert,
        showConfirmModal,
        formValid,
        codeValid,
        nameValid,
        errorMessageForSpecializationCode,
        errorMessageForSpecializationName,
        alertMessageInfo
      } = this.state
      return (
        <ComposedComponent
          {...this.props}
          handleEnter={this.handleEnterPress}
          fileExportUtils={FileExportUtils}
          adminInfoUtils={AdminInfoUtils}
          specializationApi={specializationSetupAPIConstants}
          specializationData={specializationData}
          resetStateAddValues={this.resetSpecializationStateValues}
          closeAlert={this.closeAlert}
          showConfirmModal={showConfirmModal}
          formValid={formValid}
          showAlert={showAlert}
          codeValid={codeValid}
          nameValid={nameValid}
          errorMessageForSpecializationCode={errorMessageForSpecializationCode}
          errorMessageForSpecializationName={errorMessageForSpecializationName}
          alertMessageInfo={alertMessageInfo}
          handleInputChange={this.handleOnChange}
          submitAddChanges={this.handleConfirmClick}
          setShowConfirmModal={this.setShowConfirmModal}
        ></ComposedComponent>
      )
    }
  }
}
export default ConnectHoc(SpecializationHOC, [
  'SpecializationSaveReducer',
  'SpecializationDeleteReducer',
  'SpecializationEditReducer',
  'SpecializationPreviewReducer',
  'SpecializationSearchReducer',
  {
    clearSpecializationCreateMessage,
    createSpecialization,
    deleteSpecialization,
    downloadExcelForSpecializations,
    editSpecialization,
    previewSpecialization,
    searchSpecialization
  }
])
