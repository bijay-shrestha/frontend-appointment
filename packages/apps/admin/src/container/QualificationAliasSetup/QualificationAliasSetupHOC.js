import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {QualificationAliasSetupMiddleware} from "@frontend-appointment/thunk-middleware/src/admin-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import "./qualification-alias.scss";
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";

const {
    searchQualificationAlias,
    deleteQualificationAlias,
    editQualificationAlias,
    fetchActiveQualificationAliasForDropdown,
    saveQualificationAlias,
    clearSuccessErrorMessageFormStore
} = QualificationAliasSetupMiddleware;

const {
    DELETE_QUALIFICATION_ALIAS,
    EDIT_QUALIFICATION_ALIAS,
    FETCH_QUALIFICATION_ALIAS_CODE,
    SAVE_QUALIFICATION_ALIAS,
    SEARCH_QUALIFICATION_ALIAS
} = AdminModuleAPIConstants.qualificationSetupAliasCode;

const QualificationAliasSetupHOC = (ComposedComponent, props, type) => {
    class QualificationAliasSetup extends PureComponent {
        state = {
            aliasData: {
                id: '',
                name: '',
                status: {value: 'Y', label: 'Active'},
                remarks: '',
                isNew: true
            },
            formValid: false,
            qualificationAlias: [],
            searchParameters: {
                name: '',
                status: {value: 'A', label: 'All'},
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            actionType: '',
            showEditRemarksModal: false,
            showDeleteModal: false,

        };

        defaultAliasValueForEdit = {
            id: '',
            name: '',
            status: {value: 'Y', label: 'Active'},
            remarks: '',
            isNew: true
        };

        alertTimer = '';

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event);
        };

        handleResetSearchForm = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    name: '',
                    status: {value: 'A', label: 'All'},
                }
            });
            this.searchQualificationAlias(1);
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchQualificationAlias();
        };

        handleInputChange = async (event, fType) => {
            let key = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            if (fType === 'SEARCH') {
                label ? value ?
                    this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: {value, label}
                        }
                    })
                    : this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: null
                        }
                    })
                    : this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: value
                            // , [key + "Valid"]: fieldValid
                        }
                    })
            } else {
                label ? value ?
                    await this.setState({
                        aliasData: {
                            ...this.state.aliasData,
                            [key]: {value, label}
                        }
                    })
                    : await this.setState({
                        aliasData: {
                            ...this.state.aliasData,
                            [key]: null
                        }
                    })
                    : await this.setState({
                        aliasData: {
                            ...this.state.aliasData,
                            [key]: value
                            // , [key + "Valid"]: fieldValid
                        }
                    });

                this.checkFormValidity();
            }
        };

        handleCancel = () => {
            this.resetAliasData();
        };

        handleEdit = async (editData) => {
            this.defaultAliasValueForEdit.id = editData.id;
            this.defaultAliasValueForEdit.name = editData.name;
            this.defaultAliasValueForEdit.status = {
                value: editData.status,
                label: editData.status === 'Y' ? 'Active' : 'Inactive'
            };

            this.checkFormValidity();
        };

        handleDelete = async (deleteData) => {
            let alias = {...this.state.aliasData};
            alias.id = deleteData.id;
            this.setState({
                aliasData: {...alias},
                showDeleteModal: true
            })
        };

        handleAddNew = () => {
          this.props.clearSuccessErrorMessageFormStore();
        };

        checkFormValidity = () => {
            const {name, status} = this.state.aliasData;
            let formValid = name && status;
            this.setState({
                formValid: Boolean(formValid)
            })
        };

        initialApiCalls = async () => {
            this.fetchQualificationAliasForDropdown();
            await this.searchQualificationAlias(1);
        };

        fetchQualificationAliasForDropdown = async () => {
            await this.props.fetchActiveQualificationAliasForDropdown(FETCH_QUALIFICATION_ALIAS_CODE);
        };

        showAlertMessage = (type, message) => {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: type,
                    message: message
                }
            });
            this.clearAlertTimeout();
        };

        clearAlertTimeout = () => {
            this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            });
        };

        resetAliasData = () => {
            let currentAliasData = {...this.state.aliasData};
            currentAliasData.id = '';
            currentAliasData.name = '';
            currentAliasData.remarks = '';
            currentAliasData.status = {value: 'Y', label: 'Active'};

            this.defaultAliasValueForEdit.id = '';
            this.defaultAliasValueForEdit.name = '';
            this.defaultAliasValueForEdit.status = '';
            this.defaultAliasValueForEdit.remarks = '';
            this.defaultAliasValueForEdit.isNew = true;

            this.setState({
                aliasData: {...currentAliasData}
            })
        };

        actionsOnOperationComplete = () => {
            this.resetAliasData();
            this.searchQualificationAlias();
        };

        searchQualificationAlias = async (page) => {
            const {name, status} = this.state.searchParameters;
            let searchData = {
                qualificationAliasId: name ? name.value : '',
                status: status && status.value !== 'A' ? status.value : ''
            };

            let updatedPage =
                this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);

            try {
                await this.props.searchQualificationAlias(
                    SEARCH_QUALIFICATION_ALIAS,
                    searchData,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.QualificationAliasSearchReducer.qualificationAliasList.length
                        ? this.props.QualificationAliasSearchReducer.qualificationAliasList[0].totalItems
                        : 0,
                    queryParams: {
                        ...this.state.queryParams,
                        page: updatedPage
                    },
                    qualificationAlias: [...this.props.QualificationAliasSearchReducer.qualificationAliasList]
                })
            } catch (e) {
                await this.setState({
                    qualificationAlias: [],
                })
            }

        };

        saveQualificationAlias = async (saveData) => {
            const {name, status} = saveData.data;
            if (!name || !status) {
                if (!name && !status) this.showAlertMessage("warning", "Name and status must be not empty.");
                else if (!name) this.showAlertMessage("warning", "Name should not  be empty.");
                else if (!status) this.showAlertMessage("warning", "Status should not  be empty.")
            } else {
                let requestDTO = {
                    name: name,
                    status: status && status.value
                };
                try {
                    const response = await this.props.saveQualificationAlias(SAVE_QUALIFICATION_ALIAS, requestDTO);
                    this.showAlertMessage("success", this.props.QualificationAliasSaveReducer.saveSuccessMessage);
                    this.actionsOnOperationComplete();
                    return true
                } catch (e) {
                    this.showAlertMessage("danger", this.props.QualificationAliasSaveReducer.saveErrorMessage);
                    return false;
                }
            }
        };

        openEditRemarksModal = (updateData) => {
            const {id, name, status} = updateData.data;
            let aliasData = {...this.state.aliasData};
            aliasData.id = id;
            aliasData.name = name;
            aliasData.status = status;

            this.defaultAliasValueForEdit.id = id;
            this.defaultAliasValueForEdit.name = name;
            this.defaultAliasValueForEdit.status = status;

            if (!name || !status) {
                if (!name && !status) this.showAlertMessage("warning", "Name and status must be not empty.");
                else if (!name) this.showAlertMessage("warning", "Name should not  be empty.");
                else if (!status) this.showAlertMessage("warning", "Status should not  be empty.")
            } else {
                this.setState({
                    showEditRemarksModal: true,
                    aliasData: {...aliasData}
                })
            }
        };

        closeModal = () => {
            this.setState({
                showEditRemarksModal: false,
                showDeleteModal: false
            });
            this.resetAliasData();
            this.props.clearSuccessErrorMessageFormStore();
        };

        editQualificationAlias = async () => {
            const {id, name, status, remarks} = this.state.aliasData;
            let requestDTO = {
                id,
                name: name,
                status: status && status.value,
                remarks
            };
            try {
                const response = await this.props.editQualificationAlias(EDIT_QUALIFICATION_ALIAS, requestDTO);
                this.showAlertMessage("success", this.props.QualificationAliasEditReducer.editSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
                return true;
            } catch (e) {
                // this.showAlertMessage("danger", this.props.QualificationAliasEditReducer.editErrorMessage);
                return false;
            }
        };

        deleteQualificationAlias = async () => {
            const {id, remarks} = this.state.aliasData;
            let deleteRequestDTO = {
                id: id,
                remarks,
                status: 'D'
            };
            try {
                const response = await this.props.deleteQualificationAlias(DELETE_QUALIFICATION_ALIAS, deleteRequestDTO);
                this.showAlertMessage("success", this.props.QualificationAliasDeleteReducer.deleteSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
            } catch (e) {

            }
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        render() {

            const {
                aliasData,
                qualificationAlias,
                searchParameters,
                queryParams,
                totalRecords,
                alertMessageInfo,
                showAlert,
                showEditRemarksModal,
                formValid,
                showDeleteModal,
            } = this.state;

            const {activeQualificationAliasForDropdown, dropdownErrorMessage} = this.props.QualificationAliasDropdownReducer;

            const {
                isSearchQualificationAliasLoading,
                searchErrorMessage
            } = this.props.QualificationAliasSearchReducer;

            const {editErrorMessage} = this.props.QualificationAliasEditReducer;
            const {deleteErrorMessage} = this.props.QualificationAliasDeleteReducer;

            return <>
                <ComposedComponent
                    {...props}
                    tableData={{
                        qualificationAliasList: qualificationAlias,
                        isSearchQualificationAliasLoading,
                        searchErrorMessage,
                        currentPage: queryParams.page,
                        maxSize: queryParams.size,
                        totalItems: totalRecords,
                        handlePageChange: this.handlePageChange,
                        aliasData: this.defaultAliasValueForEdit,
                        handleInputChange: this.handleInputChange,
                        handleCancel: this.handleCancel,
                        handleEdit: this.handleEdit,
                        handleSave: this.saveQualificationAlias,
                        handleUpdate: this.openEditRemarksModal,
                        handleUpdateConfirm: this.editQualificationAlias,
                        handleDelete: this.handleDelete,
                        showEditRemarksModal,
                        handleDeleteSubmit: this.deleteQualificationAlias,
                        onRemarksModalClose: this.closeModal,
                        editErrorMessage,
                        formValid,
                        deleteErrorMessage,
                        showDeleteModal,
                        handleAddNew: this.handleAddNew
                    }}
                    searchData={{
                        onInputChange: this.handleInputChange,
                        searchParameters,
                        resetSearchForm: this.handleResetSearchForm,
                        handleEnter: this.handleEnter,
                        qualificationsAliasForDropdown: activeQualificationAliasForDropdown,
                        dropdownErrorMessage: dropdownErrorMessage,
                        onSearchClick: this.searchQualificationAlias
                    }}
                />
                {showEditRemarksModal ?
                    <CRemarksModal
                        confirmationMessage="Provide remarks for edit."
                        modalHeader="Edit Qualification"
                        showModal={showEditRemarksModal}
                        onCancel={this.closeModal}
                        onRemarksChangeHandler={this.handleInputChange}
                        remarks={aliasData.remarks}
                        onPrimaryAction={this.editQualificationAlias}
                        primaryActionName={"Confirm"}
                        errorMessage={editErrorMessage}
                    />
                    : ''
                }
                {showDeleteModal ?
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete the Qualification Alias? If yes please provide remarks."
                        modalHeader="Delete Qualification Alias"
                        showModal={showDeleteModal}
                        setShowModal={this.closeModal}
                        onDeleteRemarksChangeHandler={this.handleInputChange}
                        remarks={aliasData.remarks}
                        onSubmitDelete={this.deleteQualificationAlias}
                        deleteErrorMessage={deleteErrorMessage}
                    />
                    : ''
                }
                <CAlert
                    id="profile-manage"
                    variant={alertMessageInfo.variant}
                    show={showAlert}
                    onClose={this.closeAlert}
                    alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                    </> : <><i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                    </>}
                    message={alertMessageInfo.message}
                />
            </>
        }
    }

    return ConnectHoc(
        QualificationAliasSetup, [
            'QualificationAliasDropdownReducer',
            'QualificationAliasSaveReducer',
            'QualificationAliasEditReducer',
            'QualificationAliasDeleteReducer',
            'QualificationAliasSearchReducer'
        ], {
            fetchActiveQualificationAliasForDropdown,
            searchQualificationAlias,
            deleteQualificationAlias,
            editQualificationAlias,
            saveQualificationAlias,
            clearSuccessErrorMessageFormStore
        }
    )
};

export default QualificationAliasSetupHOC;
