import React from 'react'
import { ConnectHoc } from '@frontend-appointment/commons'
import { QualificationSetupMiddleware } from '@frontend-appointment/thunk-middleware'
import { AdminModuleAPIConstants } from '@frontend-appointment/web-resource-key-constants'
import {
    EnterKeyPressUtils,
    // FileExportUtils,
    // AdminInfoUtils
} from '@frontend-appointment/helpers'
import './qualification.scss'

const {
    clearQualificationCreateMessage,
    createQualification,
    deleteQualification,
    editQualification,
    fetchActiveCountryCodeForDropdown,
    fetchActiveQualificationAliasForDropdown,
    fetchActiveQualificationsForDropdown,
    fetchActiveUniversityForDropdown,
    previewQualification,
    searchQualification
} = QualificationSetupMiddleware
const QualificationSetupHoc = (ComposedComponent, props, type) => {
    const {
        qualificationSetupApiConstants,
        countrySetupAliasCode,
        universitySetupAliasCode,
        qualificationSetupAliasCode
    } = AdminModuleAPIConstants

    class QualificationSetup extends React.PureComponent {
        state = {
            qualificationData: {
                id: "",
                countryId: "",
                name: "",
                qualificationAliasId: 0,
                status: "Y",
                universityId: 0,
                remarks: ""
            },
            formValid: false,
            nameValid: false,
            showConfirmModal: false,
            errorMessageForQualificationName: "Qualification Name should not contain special characters",
            showAlert: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            showQualificationModal: false,
            showEditModal: false,
            deleteModalShow: false,
            searchParameters: {
                name: '',
                universityId: '',
                qualificationAliasId: '',
                status: { value: '', label: 'All' }
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
            isLoading: false
        }

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        setShowModal = () => {
            this.setState({
                showQualificationModal: false,
                deleteModalShow: false,
                showEditModal: false
            })
        }

        resetQualificationStateValues = () => {
            this.setState({
                qualificationData: {
                    id: "",
                    name: "",
                    qualificationAliasId: 0,
                    status: "Y",
                    universityId: 0,
                    remarks: ""
                },
                formValid: false,
                nameValid: false,
                showEditModal: false,

            })
        }

        checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
            let stateObj = { [fieldName]: valueToChange }
            if (eventName)
                if (eventName === 'name') stateObj = { ...stateObj, nameValid: valid }
            return { ...stateObj }
        }

        setTheState = async (fieldName, valueToChange, valid, eventName) => {
            await this.setState(
                this.checkInputValidity(fieldName, valueToChange, valid, eventName)
            )
        }

        closeAlert = () => {
            this.props.clearQualificationCreateMessage();
            this.setState({
                showAlert: !this.state.showAlert,
                alertMessageInfo: ''
            })
        }

        checkFormValidity = eventType => {
            const { qualificationData, nameValid } = this.state
            let formValidity =
                nameValid &&
                qualificationData.name &&
                qualificationData.status &&
                qualificationData.qualificationAliasId &&
                qualificationData.universityId
            console.log('Add formValidiy', formValidity);
            if (eventType === 'E')
                formValidity = formValidity && qualificationData.remarks
            console.log('Edit Form Validity', formValidity);
            this.setState({
                formValid: formValidity
            })
        }

        handleOnChange = async (event, fieldValid, eventType) => {
            let qualification = { ...this.state.qualificationData }
            let { name, value, label } = event.target
            qualification[name] = !label
                ? value
                : value
                    ? { value: value, label: label }
                    : { value: null }
            await this.setTheState(
                'qualificationData',
                qualification,
                fieldValid,
                name
            )
            this.checkFormValidity(eventType)
        }

        setShowConfirmModal = () => {
            this.setState({ 
                showConfirmModal: !this.state.showConfirmModal,
                isLoading: !this.state.isLoading
             })
        }

        handleConfirmClick = async () => {
            const { name, qualificationAliasId, status, universityId } = this.state.qualificationData
            try {
                await this.props.createQualification(
                    qualificationSetupApiConstants.CREATE_QUALIFICATION,
                    {
                        name,
                        qualificationAliasId: qualificationAliasId.value,
                        universityId: universityId.value,
                        status
                    }
                )
                this.resetQualificationStateValues();
                this.setShowConfirmModal();
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.QualificationSaveReducer
                            .createQualificationSuccessMessage
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
            await this.props.previewQualification(
                qualificationSetupApiConstants.FETCH_QUALIFICATION_DETAIL,
                id
            )
        }

        onPreviewHandler = async id => {
            try {
                await this.previewApiCall(id)
                this.setState({
                    showQualificationModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.QualificationPreviewReducer
                            .qualificationPreviewErrorMessage
                    }
                })
            }
        }

        onEditHandler = async idx => {
            this.props.clearQualificationCreateMessage()
            try {
                await this.previewApiCall(idx)
                const {
                    name,
                    universityId,
                    qualificationAliasId,
                    universityName,
                    qualificationAliasName,
                    status,
                    remarks,
                } = this.props.QualificationPreviewReducer.qualificationPreviewData
                let formValid = this.state.formValid
                if (remarks) formValid = true
                this.setState({
                    showEditModal: true,
                    qualificationData: {
                        id: idx,
                        name: name,
                        universityId: { value: universityId, label: universityName },
                        qualificationAliasId: { value: qualificationAliasId, label: qualificationAliasName },
                        status: status,
                        remarks: remarks
                    },
                    formValid: formValid,
                    nameValid: true
                })
            } catch (e) {
                console.log(e)
            }
        }

        searchQualification = async page => {
            const { name, status, universityId, qualificationAliasId } = this.state.searchParameters
            let searchData = {
                qualificationId: name.value ? name.value : name,
                universityId: universityId.value ? universityId.value : universityId,
                qualificationAliasId: qualificationAliasId.value ? qualificationAliasId.value : qualificationAliasId,
                status: status.value,
            };

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                        ? page
                        : this.state.queryParams.page
            await this.props.searchQualification(
                qualificationSetupApiConstants.SEARCH_QUALIFICATION,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            )
            console.log('QualificationSearchReducer', this.props.QualificationSearchReducer);
            await this.setState({
                totalRecords: this.props.QualificationSearchReducer.qualificationList
                    .length
                    ? this.props.QualificationSearchReducer.qualificationList[0]
                        .totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        }

        appendSNToTable = qualificationList => {
            console.log('Specialization', qualificationList)
            const newQualificationList =
                qualificationList.length &&
                qualificationList.map((spec, index) => ({
                    ...spec,
                    sN: index + 1,
                    name: spec.name.toUpperCase()
                }))
            return newQualificationList;
        }

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            this.searchQualification()
        }

        editQualification = async () => {
            const {
                id,
                name,
                universityId,
                qualificationAliasId,
                status,
                remarks,
            } = this.state.qualificationData
            try {
                await this.props.editQualification(
                    qualificationSetupApiConstants.EDIT_QUALIFICATION,
                    {
                        id,
                        name,
                        universityId: universityId.value,
                        qualificationAliasId: qualificationAliasId.value,
                        status,
                        remarks,
                    }
                )
                this.resetQualificationStateValues();
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.QualificationEditReducer
                            .qualificationEditSuccessMessage
                    }
                })
                await this.searchQualification()
            } catch (e) {
            }
        }

        onDeleteHandler = async id => {
            this.props.clearQualificationCreateMessage()
            let deleteRequestDTO = { ...this.state.deleteRequestDTO }
            deleteRequestDTO['id'] = id
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                deleteModalShow: true
            })
        }

        deleteRemarksHandler = event => {
            const { name, value } = event.target
            let deleteRequest = { ...this.state.deleteRequestDTO }
            deleteRequest[name] = value
            this.setState({
                deleteRequestDTO: deleteRequest
            })
        }

        onSubmitDeleteHandler = async () => {
            try {
                await this.props.deleteQualification(
                    qualificationSetupApiConstants.DELETE_QUALIFICATION,
                    this.state.deleteRequestDTO
                )
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: { id: 0, remarks: '', status: 'D' },
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.QualificationDeleteReducer.deleteSuccessMessage
                    },
                    showAlert: true
                })
                await this.searchQualification()
            } catch (e) {
                this.setState({
                    deleteModalShow: true
                })
            }
        }


        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    universityId: '',
                    qualificationAliasId: '',
                    status: { value: '', label: 'All' },
                    name: '',
                }
            })
            this.searchQualification()
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
                let searchParams = { ...this.state.searchParameters }
                searchParams[fieldName] = label ? (value ? { value, label } : '') : value
                await this.setStateValuesForSearch(searchParams)
            }
        }

        setFormValidManage = () => {
            this.setState({
                formValid: true
            })
        }

        async componentDidMount() {
            if (type === 'M') {
                await this.searchQualification();
                await this.props.fetchActiveQualificationsForDropdown(
                    qualificationSetupApiConstants.SPECIFIC_DROPDOWN_QUALIFICATION_ACTIVE
                )
            }
            await this.props.fetchActiveQualificationAliasForDropdown(
                qualificationSetupAliasCode.FETCH_QUALIFICATION_ALIAS_CODE
            )
            await this.props.fetchActiveUniversityForDropdown(
                universitySetupAliasCode.FETCH_UNIVERSITY_CODE
            )
        }

        render() {
            const {
                qualificationData,
                showAlert,
                showConfirmModal,
                formValid,
                nameValid,
                errorMessageForQualificationName,
                alertMessageInfo,
                showQualificationModal,
                showEditModal,
                deleteModalShow,
                searchParameters,
                queryParams,
                deleteRequestDTO,
                totalRecords,
                isLoading
            } = this.state

            const {
                isSearchLoading,
                qualificationList,
                searchErrorMessage
            } = this.props.QualificationSearchReducer

            const {
                qualificationPreviewData,
                isPreviewLoading,
                qualificationPreviewErrorMessage
            } = this.props.QualificationPreviewReducer

            const {
                qualificationEditErrorMessage
            } = this.props.QualificationEditReducer

            const { deleteErrorMessage } = this.props.QualificationDeleteReducer;
            // const {countryCodeForDropdown} = this.props.CountryCodeDropdownReducer;
            const { qualificationsAliasForDropdown } = this.props.QualificationAliasDropdownReducer;
            const { qualificationsForDropdown } = this.props.QualificationDropdownReducer;
            const { universitiesDropdown } = this.props.UniversitiesForDropdownReducer;
            return (
                <ComposedComponent
                    {...props}
                    handleEnter={this.handleEnterPress}
                    qualificationData={qualificationData}
                    resetStateAddValues={this.resetQualificationStateValues}
                    closeAlert={this.closeAlert}
                    showConfirmModal={showConfirmModal}
                    formValid={formValid}
                    showAlert={showAlert}
                    nameValid={nameValid}
                    errorMessageForQualificationName={errorMessageForQualificationName}
                    alertMessageInfo={alertMessageInfo}
                    handleInputChange={this.handleOnChange}
                    submitAddChanges={this.handleConfirmClick}
                    setShowConfirmModal={this.setShowConfirmModal}
                    handleSearchFormChange={this.handleSearchFormChange}
                    deleteRemarksHandler={this.deleteRemarksHandler}
                    resetSearch={this.handleSearchFormReset}
                    searchQualification={this.searchQualification}
                    handlePageChange={this.handlePageChange}
                    handleSearchFormChange={this.handleSearchFormChange}
                    onSubmitDeleteHandler={this.onSubmitDeleteHandler}
                    editQualification={this.editQualification}
                    onEditHandler={this.onEditHandler}
                    onDeleteHandler={this.onDeleteHandler}
                    onPreviewHandler={this.onPreviewHandler}
                    setShowModal={this.setShowModal}
                    showQualificationModal={showQualificationModal}
                    showEditModal={showEditModal}
                    deleteModalShow={deleteModalShow}
                    searchParameters={searchParameters}
                    queryParams={queryParams}
                    deleteRequestDTO={deleteRequestDTO}
                    totalRecords={totalRecords}
                    isSearchLoading={isSearchLoading}
                    qualificationList={this.appendSNToTable(qualificationList)}
                    searchErrorMessage={searchErrorMessage}
                    qualificaitonPreviewErrorMessage={qualificationPreviewErrorMessage}
                    deleteErrorMessage={deleteErrorMessage}
                    qualificationEditErrorMessage={qualificationEditErrorMessage}
                    isPreviewLoading={isPreviewLoading}
                    qualificationPreviewData={qualificationPreviewData}
                    qualificationsAliasForDropdown={qualificationsAliasForDropdown}
                    qualificationsForDropdown={qualificationsForDropdown}
                    universitiesDropdown={universitiesDropdown} 
                    isLoading={isLoading}/>
            )
        }
    }

    return ConnectHoc(
        QualificationSetup,
        [
            'QualificationSaveReducer',
            'QualificationDeleteReducer',
            'QualificationEditReducer',
            'QualificationPreviewReducer',
            'QualificationSearchReducer',
            'CountryCodeDropdownReducer',
            'QualificationAliasDropdownReducer',
            'QualificationDropdownReducer',
            'UniversitiesForDropdownReducer'
        ],
        {
            clearQualificationCreateMessage,
            createQualification,
            deleteQualification,
            editQualification,
            fetchActiveCountryCodeForDropdown,
            fetchActiveQualificationAliasForDropdown,
            fetchActiveQualificationsForDropdown,
            fetchActiveUniversityForDropdown,
            previewQualification,
            searchQualification
        }
    )
}
export default QualificationSetupHoc
