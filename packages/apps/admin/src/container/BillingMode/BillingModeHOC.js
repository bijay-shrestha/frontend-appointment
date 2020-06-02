import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {BillingModeMiddleware} from "@frontend-appointment/thunk-middleware/src/admin-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import "./billing-mode.scss";
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";

const {
    clearSuccessErrorMessageFormStore,
    deleteBillingMode,
    editBillingMode,
    fetchAllBillingModeForDropdown,
    saveBillingMode,
    searchBillingMode,
} = BillingModeMiddleware;

const {
    DELETE_BILLING_MODE,
    EDIT_BILLING_MODE,
    FETCH_ALL_BILLING_MODE_FOR_DROPDOWN,
    PREVIEW_BILLING_MODE,
    SAVE_BILLING_MODE,
    SEARCH_BILLING_MODE
} = AdminModuleAPIConstants.billingModeApiConstants;


const RoomSetupHOC = (ComposedComponent, props, type) => {
    class RoomSetup extends PureComponent {
        state = {
            billingModeData: {
                id: '',
                name: '',
                code: '',
                description: '',
                status: {value: 'Y', label: 'Active'},
                remarks: '',
                isNew: true
            },
            formValid: false,
            searchParameters: {
                billingMode: null,
                status: {value: 'A', label: 'All'},
                code: ""
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
            isActionComplete: false
        };

        defaultBillingModeValueForEdit = {
            id: '',
            name: '',
            code: '',
            description: '',
            status: {value: 'Y', label: 'Active'},
            remarks: '',
            isNew: true
        };

        alertTimer = '';

        changeActionComplete = () => {
            this.setState({
                isActionComplete: false
            })
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event);
        };

        handleResetSearchForm = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    billingMode: null,
                    code: "",
                    status: {value: 'A', label: 'All'},
                }
            });
            this.searchBillingMode(1);
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchBillingMode();
        };

        handleInputChange = async (event, fType) => {
            let key = event.target.name;
            let value = key === 'code' ? event.target.value.toUpperCase() : event.target.value;
            let label = event.target.label;


            if (fType === 'SEARCH') {
                label ? value ?
                    await this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: {value, label}
                        }
                    })
                    : await this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: null
                        }
                    })
                    : await this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: value
                            // , [key + "Valid"]: fieldValid
                        }
                    });
            } else {
                label ? value ?
                    await this.setState({
                        billingModeData: {
                            ...this.state.billingModeData,
                            [key]: {value, label}
                        }
                    })
                    : await this.setState({
                        billingModeData: {
                            ...this.state.billingModeData,
                            [key]: null
                        }
                    })
                    : await this.setState({
                        billingModeData: {
                            ...this.state.billingModeData,
                            [key]: value
                            // , [key + "Valid"]: fieldValid
                        }
                    });

                // this.checkFormValidity();
            }
        };

        handleCancel = () => {
            this.resetAliasData();
        };

        handleEdit = async (editData) => {
            let status = {
                value: editData.status,
                label: editData.status === 'Y' ? 'Active' : 'Inactive'
            };
            this.setDefaultRoomValues(editData.id, editData.name, editData.code, editData.description, status, '')
        };

        handleDelete = async (deleteData) => {
            let billingMode = {...this.state.billingModeData};
            billingMode.id = deleteData.id;
            this.setState({
                billingModeData: {...billingMode},
                showDeleteModal: true
            })
        };

        initialApiCalls = async () => {
            this.fetchAllBillingModeForDropdown();
            this.searchBillingMode(1);
        };

        fetchAllBillingModeForDropdown = async () => {
            await this.props.fetchAllBillingModeForDropdown(FETCH_ALL_BILLING_MODE_FOR_DROPDOWN);
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
            let currentRoomData = {...this.state.billingModeData};
            currentRoomData.id = '';
            currentRoomData.name = "";
            currentRoomData.code = "";
            currentRoomData.description = '';
            currentRoomData.remarks = '';
            currentRoomData.status = {value: 'Y', label: 'Active'};

            this.setDefaultRoomValues('', '', '', '', currentRoomData.status, '');

            this.setState({
                billingModeData: {...currentRoomData},
                isActionComplete: true
            })
        };

        actionsOnOperationComplete = () => {
            this.resetAliasData();
            this.handleResetSearchForm();
        };

        searchBillingMode = async (page) => {
            const {code, status, billingMode} = this.state.searchParameters;
            let searchData = {
                code: code,
                id: billingMode ? billingMode.value : '',
                status: status && status.value !== 'A' ? status.value : ''
            };

            let updatedPage =
                this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);

            try {
                await this.props.searchBillingMode(
                    SEARCH_BILLING_MODE,
                    searchData,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.BillingModeSearchReducer.billingModeList.length
                        ? this.props.BillingModeSearchReducer.totalRecords
                        : 0,
                    queryParams: {
                        ...this.state.queryParams,
                        page: updatedPage
                    },
                    isActionComplete: true
                })
            } catch (e) {

            }

        };

        saveBillingMode = async (saveData) => {
            const {name, code, description, status} = saveData.data;
            this.setDefaultRoomValues('', name, code, description, status, '');
            if (!name || !status || !code || !description) {
                this.validateFields(name, code, description, status);
            } else {
                let requestDTO = {
                    name: name,
                    code: code,
                    description: description,
                    status: status && status.value
                };
                try {
                    await this.props.saveBillingMode(SAVE_BILLING_MODE, requestDTO);
                    this.showAlertMessage("success", this.props.BillingModeSaveReducer.saveSuccessMessage);
                    this.actionsOnOperationComplete();
                    return true
                } catch (e) {
                    this.showAlertMessage("danger", this.props.BillingModeSaveReducer.saveErrorMessage);
                    return false;
                }
            }
        };

        validateFields = (name, code, description, status) => {
            if (!name && !status && !code && !description) this.showAlertMessage("warning",
                "Name,Code,Description and status must be not empty.");
            else if (!name && !code)
                this.showAlertMessage("warning", "Name and Code must be not empty.");
            else if (!name && !status)
                this.showAlertMessage("warning", "Name and Status must be not empty.");
            else if (!status && !code)
                this.showAlertMessage("warning", "Code and Status must be not empty.");
            else if (!name) this.showAlertMessage("warning", "Name should not  be empty.");
            else if (!code) this.showAlertMessage("warning", "Code should not  be empty.");
            else if (!description) this.showAlertMessage("warning", "Description should not  be empty.");
            else if (!status) this.showAlertMessage("warning", "Status should not  be empty.")
        };

        setDefaultRoomValues = (id, name, code, description, status, remarks) => {
            this.defaultBillingModeValueForEdit.id = id;
            this.defaultBillingModeValueForEdit.name = name;
            this.defaultBillingModeValueForEdit.code = code;
            this.defaultBillingModeValueForEdit.description = description;
            this.defaultBillingModeValueForEdit.status = status;
            this.defaultBillingModeValueForEdit.remarks = remarks;
            this.defaultBillingModeValueForEdit.isNew = true;
        };

        openEditRemarksModal = (updateData) => {
            const {id, name, code, description, status} = updateData.data;
            let billingModeData = {...this.state.billingModeData};
            billingModeData.id = id;
            billingModeData.name = name;
            billingModeData.code = code;
            billingModeData.description = description;
            billingModeData.status = status;

            this.setDefaultRoomValues(id, name, code, description, status, '');

            if (!name || !status || !code || !description) {
                this.validateFields(name, code, description, status);
            } else {
                this.setState({
                    showEditRemarksModal: true,
                    billingModeData: {...billingModeData}
                })
            }
        };

        closeModal = () => {
            this.setState({
                showEditRemarksModal: false,
                showDeleteModal: false,
                billingModeData: {
                    ...this.state.billingModeData,
                    remarks: ''
                }
            });
            this.props.clearSuccessErrorMessageFormStore();
        };

        editBillingMode = async () => {
            const {id, name, code, description, status, remarks} = this.state.billingModeData;
            let requestDTO = {
                id,
                name,
                code,
                description,
                status: status && status.value,
                remarks
            };
            try {
                await this.props.editBillingMode(EDIT_BILLING_MODE, requestDTO);
                this.showAlertMessage("success", this.props.BillingModeEditReducer.editSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
                return true;
            } catch (e) {
                this.setDefaultRoomValues(id, name, code, description, status, '');
                return false;
            }
        };

        deleteBillingMode = async () => {
            const {id, remarks} = this.state.billingModeData;
            let deleteRequestDTO = {
                id: id,
                remarks,
                status: 'D'
            };
            try {
                await this.props.deleteBillingMode(DELETE_BILLING_MODE, deleteRequestDTO);
                this.showAlertMessage("success", this.props.BillingModeDeleteReducer.deleteSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
            } catch (e) {

            }
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer);
        }

        render() {

            const {
                billingModeData,
                searchParameters,
                queryParams,
                totalRecords,
                alertMessageInfo,
                showAlert,
                showEditRemarksModal,
                formValid,
                showDeleteModal,
                isActionComplete
            } = this.state;

            const {allBillingModeForDropdown, allRoomDropdownErrorMessage} = this.props.BillingModeDropdownReducer;

            const {
                isSearchBillingModeLoading,
                searchErrorMessage,
                billingModeList
            } = this.props.BillingModeSearchReducer;

            const {editErrorMessage, isEditBillingModeLoading} = this.props.BillingModeEditReducer;
            const {deleteErrorMessage, isDeleteBillingModeLoading} = this.props.BillingModeDeleteReducer;

            return <>
                <ComposedComponent
                    {...props}
                    tableData={{
                        billingModeList: billingModeList,
                        isSearchBillingModeLoading,
                        searchErrorMessage,
                        currentPage: queryParams.page,
                        maxSize: queryParams.size,
                        totalItems: totalRecords,
                        handlePageChange: this.handlePageChange,
                        billingModeData: this.defaultBillingModeValueForEdit,
                        handleInputChange: this.handleInputChange,
                        handleCancel: this.handleCancel,
                        handleEdit: this.handleEdit,
                        handleSave: this.saveBillingMode,
                        handleUpdate: this.openEditRemarksModal,
                        handleUpdateConfirm: this.editBillingMode,
                        handleDelete: this.handleDelete,
                        handleDeleteSubmit: this.deleteBillingMode,
                        formValid,
                        isActionComplete,
                        changeActionComplete: this.changeActionComplete
                    }}
                    searchData={{
                        onInputChange: this.handleInputChange,
                        searchParameters,
                        resetSearchForm: this.handleResetSearchForm,
                        handleEnter: this.handleEnter,
                        billingModeForDropdown: allBillingModeForDropdown,
                        dropdownErrorMessage: allRoomDropdownErrorMessage,
                        onSearchClick: this.searchBillingMode,
                    }}
                />
                {showEditRemarksModal ?
                    <CRemarksModal
                        confirmationMessage="Provide remarks for edit."
                        modalHeader="Edit Billing Mode"
                        showModal={showEditRemarksModal}
                        onCancel={this.closeModal}
                        onRemarksChangeHandler={this.handleInputChange}
                        remarks={billingModeData.remarks}
                        onPrimaryAction={this.editBillingMode}
                        primaryActionName={"Confirm"}
                        actionDisabled={isEditBillingModeLoading}
                        primaryActionLoading={isEditBillingModeLoading}
                        errorMessage={editErrorMessage}
                    />
                    : ''
                }
                {showDeleteModal ?
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete the Billing Mode? If yes please provide remarks."
                        modalHeader="Delete Billing Mode"
                        showModal={showDeleteModal}
                        setShowModal={this.closeModal}
                        onDeleteRemarksChangeHandler={this.handleInputChange}
                        remarks={billingModeData.remarks}
                        onSubmitDelete={this.deleteBillingMode}
                        deleteErrorMessage={deleteErrorMessage}
                        isLoading={isDeleteBillingModeLoading}
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
        RoomSetup, [
            'BillingModeDropdownReducer',
            'BillingModeSaveReducer',
            'BillingModeEditReducer',
            'BillingModeDeleteReducer',
            'BillingModeSearchReducer',
        ], {
            clearSuccessErrorMessageFormStore,
            deleteBillingMode,
            editBillingMode,
            fetchAllBillingModeForDropdown,
            saveBillingMode,
            searchBillingMode,
        }
    )
};

export default RoomSetupHOC;
