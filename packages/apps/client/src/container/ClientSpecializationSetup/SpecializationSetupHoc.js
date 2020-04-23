import {ConnectHoc} from '@frontend-appointment/commons'
import {EnterKeyPressUtils, FileExportUtils} from '@frontend-appointment/helpers'
import {HospitalSetupMiddleware, SpecializationSetupMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import React from 'react'
import './specialization.scss'

const {
    clearSpecializationCreateMessage,
    createSpecialization,
    deleteSpecialization,
    downloadExcelForSpecializations,
    editSpecialization,
    previewSpecialization,
    searchSpecialization
} = SpecializationSetupMiddleware;

const SpecializationHOC = (ComposedComponent, props, type) => {
    const {specializationSetupAPIConstants, hospitalSetupApiConstants} = AdminModuleAPIConstants;

    class SpecializationSetup extends React.PureComponent {
        state = {
            specializationData: {
                id: '',
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
            },
            showSpecializationModal: false,
            showEditModal: false,
            deleteModalShow: false,
            searchParameters: {
                code: '',
                id: null,
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
            totalRecords: 0
        };

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        setShowModal = () => {
            this.setState({
                showSpecializationModal: false,
                deleteModalShow: false,
                showEditModal: false
            })
        };

        resetSpecializationStateValues = () => {
            this.setState({
                specializationData: {
                    id: '',
                    name: '',
                    code: '',
                    status: 'Y',
                    remarks: ''
                },
                formValid: false,
                nameValid: false,
                codeValid: false,
                showEditModal: false
            })
        };

        checkInputValidity = (fieldName, valueToChange, valid, eventName) => {
            let stateObj = {[fieldName]: valueToChange};
            if (eventName)
                if (eventName === 'name') stateObj = {...stateObj, nameValid: valid};
            return {...stateObj}
        };

        setTheState = async (fieldName, valueToChange, valid, eventName) => {
            await this.setState(
                this.checkInputValidity(fieldName, valueToChange, valid, eventName)
            )
        };

        closeAlert = () => {
            this.props.clearSpecializationCreateMessage();
            this.setState({
                showAlert: !this.state.showAlert,
                alertMessageInfo: ''
            })
        };

        checkFormValidity = eventType => {
            const {specializationData, nameValid} = this.state;
            let formValidity =
                nameValid &&
                specializationData.name &&
                specializationData.code &&
                specializationData.status;

            if (eventType === 'E')
                formValidity = formValidity && specializationData.remarks;
            this.setState({
                formValid: formValidity
            })
        };

        handleOnChange = async (event, fieldValid, eventType) => {
            let specialization = {...this.state.specializationData};
            let {name, value, label} = event.target;
            value = name === 'code' ? value.toUpperCase() : value;
            specialization[name] = !label
                ? value
                : value
                    ? {value: value, label: label}
                    : {value: null};
            await this.setTheState(
                'specializationData',
                specialization,
                fieldValid,
                name
            );
            this.checkFormValidity(eventType)
        };

        setShowConfirmModal = () => {
            this.setState({showConfirmModal: !this.state.showConfirmModal})
        };

        handleConfirmClick = async () => {
            const {name, code, status} = this.state.specializationData;
            try {
                await this.props.createSpecialization(
                    specializationSetupAPIConstants.CREATE_SPECIALIZATION,
                    {
                        name,
                        code,
                        status
                    }
                );
                this.resetSpecializationStateValues();
                this.setShowConfirmModal();
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.SpecializationSaveReducer
                            .createSpecializationsuccessMessage
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
        };

        previewApiCall = async id => {
            await this.props.previewSpecialization(
                specializationSetupAPIConstants.FETCH_SPECIALIZATION_DETAILS,
                id
            )
        };

        onPreviewHandler = async id => {
            try {
                await this.previewApiCall(id);
                this.setState({
                    showSpecializationModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.SpecializationPreviewReducer
                            .specializationPreviewErrorMessage
                    }
                })
            }
        };

        onEditHandler = async id => {
            this.props.clearSpecializationCreateMessage();
            try {
                await this.previewApiCall(id);
                const {
                    name,
                    code,
                    status,
                    hospitalName
                } = this.props.SpecializationPreviewReducer.specializationPreviewData;
                // let formValid = this.state.formValid;
                // if (remarks)
                //     formValid = true;
                await this.setState({
                    showEditModal: true,
                    specializationData: {
                        id: id,
                        name: name,
                        code: code,
                        status: status,
                        remarks: ''
                    },
                    nameValid: name.length||false
                })
                this.checkFormValidity('E')
            } catch (e) {
                console.log(e)
            }
        };

        searchSpecialization = async page => {
            const {code, name, status, id} = this.state.searchParameters;
            let searchData = {
                name: name,
                code: code,
                status: status.value,
                id: id
            };

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page;
            await this.props.searchSpecialization(
                specializationSetupAPIConstants.SEARCH_SPECIALIZATION,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            );

            await this.setState({
                totalRecords: this.props.SpecializationSearchReducer.specializationList
                    .length
                    ? this.props.SpecializationSearchReducer.specializationList[0]
                        .totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        };

        appendSNToTable = specializationList => {
            const newSpecializationList = specializationList.length &&
                specializationList.map((spec, index) => ({
                    ...spec,
                    sN: index + 1

                }));
            return newSpecializationList;
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            this.searchSpecialization()
        };

        editSpeclization = async () => {
            const {id, name, status, code, remarks} = this.state.specializationData;
            const data = {
                id: id,
                name: name,
                status: status,
                code: code,
                remarks: remarks
            };
            try {
                await this.props.editSpecialization(
                    specializationSetupAPIConstants.EDIT_SPECIALIZATION,
                    data
                );
                this.resetSpecializationStateValues()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.SpecializationEditReducer
                            .specializationEditSuccessMessage
                    }
                });
                await this.searchSpecialization()
            } catch (e) {
            }
        };

        onDeleteHandler = async id => {
            this.props.clearSpecializationCreateMessage();
            let deleteRequestDTO = {...this.state.deleteRequestDTO};
            deleteRequestDTO['id'] = id
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                deleteModalShow: true
            })
        };

        deleteRemarksHandler = event => {
            const {name, value} = event.target;
            let deleteRequest = {...this.state.deleteRequestDTO};
            deleteRequest[name] = value;
            this.setState({
                deleteRequestDTO: deleteRequest
            })
        };

        onSubmitDeleteHandler = async () => {
            try {
                await this.props.deleteSpecialization(
                    specializationSetupAPIConstants.DELETE_SPECIALIZATION,
                    this.state.deleteRequestDTO
                );
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.SpecializationDeleteReducer
                            .deleteSuccessMessage
                    },
                    showAlert: true

                });
                await this.searchSpecialization()
            } catch (e) {
                this.setState({
                    deleteModalShow: true
                })
            }
        };

        downloadEXCEL = async () => {
            try {
                let response = await this.props.downloadExcelForSpecializations(
                    specializationSetupAPIConstants.EXPORT_SPECIALIZATION_EXCEL
                );
                FileExportUtils.exportEXCEL(response.data, 'specializations')
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage
                            ? e.errorMessage
                            : 'Sorry File Couldnot Be Downloaded Due To Server Problem!!'
                    }
                })
            }
        };

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    code: '',
                    status: {value: '', label: 'All'},
                    name: '',
                    id: null
                }
            });
            this.searchSpecialization();
        };

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        };

        handleSearchFormChange = async event => {
            if (event) {
                let fieldName = event.target.name;
                let label = event.target.label;
                let value = fieldName === 'code' ? ((event.target.value).toUpperCase()) : event.target.value;
                let searchParams = {...this.state.searchParameters};
                searchParams[fieldName] = label ? (value ? {value, label} : '') : value;
                await this.setStateValuesForSearch(searchParams)
            }
        };

        setFormValidManage = () => {
            this.setState({
                formValid: true
            })
        };

        async componentDidMount() {
            if (type === "M") {
                await this.searchSpecialization();
                //this.setFormValidManage();
            }
        }

        render() {
            const {
                specializationData,
                showAlert,
                showConfirmModal,
                formValid,
                codeValid,
                nameValid,
                errorMessageForSpecializationCode,
                errorMessageForSpecializationName,
                alertMessageInfo,
                showSpecializationModal,
                showEditModal,
                deleteModalShow,
                searchParameters,
                queryParams,
                deleteRequestDTO,
                totalRecords
            } = this.state;

            const {
                isSearchLoading,
                specializationList,
                searchErrorMessage
            } = this.props.SpecializationSearchReducer;

            const {
                specializationPreviewData,
                isPreviewLoading,
                specializationPreviewErrorMessage
            } = this.props.SpecializationPreviewReducer;

            const {
                specializationEditErrorMessage
            } = this.props.SpecializationEditReducer;

            const {deleteErrorMessage} = this.props.SpecializationDeleteReducer;
            return (
                <ComposedComponent
                    {...this.props}
                    {...props}
                    handleEnter={this.handleEnterPress}
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
                    handleSearchFormChange={this.handleSearchFormChange}
                    downloadEXCEL={this.downloadEXCEL}
                    deleteRemarksHandler={this.deleteRemarksHandler}
                    resetSearch={this.handleSearchFormReset}
                    searchSpecialization={this.searchSpecialization}
                    handlePageChange={this.handlePageChange}
                    onSubmitDeleteHandler={this.onSubmitDeleteHandler}
                    editSpecialization={this.editSpeclization}
                    onEditHandler={this.onEditHandler}
                    onDeleteHandler={this.onDeleteHandler}
                    onPreviewHandler={this.onPreviewHandler}
                    // appendSNToTable={this.appendSNToTable}
                    setShowModal={this.setShowModal}
                    showSpecializationModal={showSpecializationModal}
                    showEditModal={showEditModal}
                    deleteModalShow={deleteModalShow}
                    searchParameters={searchParameters}
                    queryParams={queryParams}
                    deleteRequestDTO={deleteRequestDTO}
                    totalRecords={totalRecords}
                    isSearchLoading={isSearchLoading}
                    specializationList={this.appendSNToTable(specializationList)}
                    searchErrorMessage={searchErrorMessage}
                    specializationPreviewErrorMessage={specializationPreviewErrorMessage}
                    deleteErrorMessage={deleteErrorMessage}
                    specializationEditErrorMessage={specializationEditErrorMessage}
                    isPreviewLoading={isPreviewLoading}
                    specializationPreviewData={specializationPreviewData}
                />
            )
        }
    }

    return ConnectHoc(
        SpecializationSetup,
        [
            'SpecializationSaveReducer',
            'SpecializationDeleteReducer',
            'SpecializationEditReducer',
            'SpecializationPreviewReducer',
            'SpecializationSearchReducer'
        ],
        {
            clearSpecializationCreateMessage,
            createSpecialization,
            deleteSpecialization,
            downloadExcelForSpecializations,
            editSpecialization,
            previewSpecialization,
            searchSpecialization
        }
    )
};
export default SpecializationHOC
