import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {AppointmentModeMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert, CModal} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";
import AppointmentModeDetails from "./AppointmentModeDetails";
import "./appointment-mode.scss"
import AppointmentModeConfirmationModalContent from "./AppointmentModeConfirmatonModalContent";

const {
    clearSuccessErrorMessageFormStore,
    deleteAppointmentMode,
    editAppointmentMode,
    fetchActiveAppointmentModeForDropdown,
    fetchAppointmentModeDetailsByAppointmentModeId,
    saveAppointmentMode,
    searchAppointmentMode
} = AppointmentModeMiddleware;

const {
    DELETE_APPOINTMENT_MODE,
    EDIT_APPOINTMENT_MODE,
    FETCH_APPOINTMENT_MODE_DETAILS_BY_ID,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN,
    SAVE_APPOINTMENT_MODE,
    SEARCH_APPOINTMENT_MODE
} = AdminModuleAPIConstants.appointmentModeApiConstants;

const AppointmentModeHOC = (ComposedComponent, props) => {
    class AppointmentModeHOC extends PureComponent {

        state = {
            id: '',
            description: "",
            code: "",
            name: "",
            status: "Y",
            isEditable: "Y",
            remarks: "",
            formValid: false,
            searchParameters: {
                code: "",
                appointmentMode: null,
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
            showSaveConfirmationModal: false,
            showEditConfirmationModal: false,
            showDeleteModal: false,
            showPreviewModal: false,
            isActionComplete: false
        };

        alertTimer = '';

        defaultAppointmentModeData = {
            id: '',
            name: '',
            status: {label: 'Active', value: 'Y'},
            description: '',
            code: '',
            remarks: '',
            isEditable: "Y",
            isNew: true
        };

        actionsOnOperationComplete = () => {
            this.resetAppointmentModeData();
            this.handleResetSearchForm();
            // this.searchAppointmentModes();
        };

        clearAlertTimeout = () => {
            this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
        };

        closeAlert = () => {
            this.setState({
                showAlert: false
            });
        };

        closeModal = () => {
            this.setState({
                showEditConfirmationModal: false,
                showDeleteModal: false,
                showPreviewModal: false,
                remarks: '',
            });
            this.props.clearSuccessErrorMessageFormStore();
        };

        closeSaveModal = () => {
            this.setState({
                showSaveConfirmationModal: false,
                description: '',
                isEditable: 'Y'
            });
            this.props.clearSuccessErrorMessageFormStore();
        };

        deleteAppointmentModeSetup = async () => {
            const {id, remarks} = this.state;
            let deleteRequestDTO = {
                id: id,
                remarks,
                status: 'D'
            };
            try {
                const response = await this.props.deleteAppointmentMode(DELETE_APPOINTMENT_MODE, deleteRequestDTO);
                this.showAlertMessage("success", this.props.AppointmentModeDeleteReducer.deleteSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
            } catch (e) {

            }
        };

        editAppointmentModeSetup = async () => {
            const {id, name, description, code, status, isEditable, remarks} = this.state;
            let requestDTO = {
                id,
                name,
                description,
                code,
                status: status && status.value,
                isEditable,
                remarks
            };
            try {
                const response = await this.props.editAppointmentMode(EDIT_APPOINTMENT_MODE, requestDTO);
                this.showAlertMessage("success", this.props.AppointmentModeEditReducer.editSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
                return true;
            } catch (e) {
                this.setDefaultValues(name, description, code, status, isEditable, id);
                return false;
            }
        };

        fetchAppointmentModeListForDropDown = async () => {
            await this.props.fetchActiveAppointmentModeForDropdown(FETCH_APPOINTMENT_MODE_FOR_DROPDOWN);
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event);
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
                label ? (
                        value ?
                            await this.setState({
                                [key]: {value, label}
                            })
                            : await this.setState({
                                [key]: null
                            })
                    )
                    : await this.setState({
                        [key]: value
                        // , [key + "Valid"]: fieldValid
                    });
            }
        };

        handleResetSearchForm = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    code: null,
                    appointmentMode: null,
                    status: {value: 'A', label: 'All'},
                }
            });
            this.searchAppointmentModes(1);
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchAppointmentModes();
        };

        handleCancel = () => {
            this.resetAppointmentModeData();
        };

        handleEdit = async (editData) => {
            // if (editData.isEditable) {
            this.defaultAppointmentModeData.name = editData.name;
            this.defaultAppointmentModeData.description = editData.address;
            this.defaultAppointmentModeData.code = editData.code;
            try {
                await this.previewApiCall(editData);
                const {name, description, code, isEditable, id, status} = this.props.AppointmentModePreviewReducer.appointmentModeDetails;
                let statusObj = {
                    value: status,
                    label: status === 'Y' ? 'Active' : 'Inactive'
                };
                this.setDefaultValues(name, description, code, statusObj, isEditable, id);
            } catch (e) {
                this.showAlertMessage("danger", this.AppointmentModePreviewReducer.previewAppointmentModeErrorMessage);
            }
            // } else {
            //     this.showAlertMessage("warning", "You are not allowed to edit " + editData.name + " Appointment mode");
            //     this.handleCancel();
            // }
        };

        handleSave = async (saveData) => {
            const {name, description, code, status, isEditable} = saveData.data;
            this.setDefaultValues(name, description, code, status, isEditable, '');
            if (!name || !status || !code) {
                this.validateAppointmentModeData(name, description, code, status, isEditable, '');
            } else {
                if (this.validateNameAndCodeLength(name, code))
                    this.setState({
                        showSaveConfirmationModal: true,
                        name: name,
                        code: code,
                        status: status,
                    })
            }
        };

        handleOpenEditConfirmationModal = (updateData) => {
            const {id, name, code, status, isEditable} = updateData.data;
            // UPDATE THE DEFAULT VALUES WITH CURRENTLY UPDATED DATA.....
            // WILL BE USED IN CASE REMARKS MODAL IS CLOSED
            this.setDefaultValues(name, this.defaultAppointmentModeData.description, code, status, isEditable, id);

            if (!name || !status || !code) {
                this.validateAppointmentModeData(name, code, status, isEditable, id);
            } else {
                // IF ALL DATA IS VALID, SAVE THEM IN STATE FOR UPDATE AND OTHER PURPOSES
                this.setState({
                    showEditConfirmationModal: true,
                    id: id,
                    name: name,
                    description: this.defaultAppointmentModeData.description,
                    code: code,
                    status: status,
                    isEditable: isEditable,
                })
            }
        };

        handleDelete = async (deleteData) => {
            this.setState({
                id: deleteData.id,
                showDeleteModal: true
            })
        };

        handlePreview = async (previewData) => {
            try {
                await this.previewApiCall(previewData);
                this.setState({
                    showPreviewModal: true
                })
            } catch (e) {
                this.showAlertMessage("danger", this.props.AppointmentModePreviewReducer.previewAppointmentModeErrorMessage);
            }
        };

        previewApiCall = async (previewData) => {
            await this.props.fetchAppointmentModeDetailsByAppointmentModeId(FETCH_APPOINTMENT_MODE_DETAILS_BY_ID, previewData.id);
        };

        initialApiCalls = async () => {
            this.fetchAppointmentModeListForDropDown();
            this.searchAppointmentModes();
        };

        resetAppointmentModeData = () => {
            this.defaultAppointmentModeData.id = '';
            this.defaultAppointmentModeData.name = '';
            this.defaultAppointmentModeData.status = {value: 'Y', label: 'Active'};
            this.defaultAppointmentModeData.isEditable = 'Y';
            this.defaultAppointmentModeData.description = '';
            this.defaultAppointmentModeData.code = '';
            this.defaultAppointmentModeData.remarks = '';
            this.defaultAppointmentModeData.isNew = true;

            // FOR EDIT
            this.setState({
                description: "",
                code: null,
                name: "",
                status: "Y",
                isEditable: "Y",
                remarks: "",
                isActionComplete: true
            })
        };

        changeActionComplete = () => {
            this.setState({
                isActionComplete: false
            })
        };

        saveAppointmentModeSetup = async () => {
            const {name, description, code, status, isEditable} = this.state;

            this.setDefaultValues(name, description, code, status, isEditable, '');
            // if (!name || !status || !code) {
            //     this.validateAppointmentModeData(name, code, status);
            // } else {
            let requestDTO = {
                name,
                description,
                code: code,
                status: status && status.value,
                isEditable
            };
            try {
                const response = await this.props.saveAppointmentMode(SAVE_APPOINTMENT_MODE, requestDTO);
                this.showAlertMessage("success", this.props.AppointmentModeSaveReducer.saveSuccessMessage);
                this.closeSaveModal();
                this.actionsOnOperationComplete();
                return true;
            } catch (e) {
                this.showAlertMessage("danger", this.props.AppointmentModeSaveReducer.saveErrorMessage);
                this.closeSaveModal();
                return false;
            }
            // }
        };

        searchAppointmentModes = async (page) => {
            const {searchParameters, queryParams} = this.state;
            const {code, appointmentMode, status} = searchParameters;
            let requestDTO = {
                code,
                id: appointmentMode ? appointmentMode.value : '',
                status: status && status.value !== 'A' ? status.value : ''
            };

            let updatedPage =
                queryParams.page === 0 ? 1 : (page ? page : queryParams.page);

            try {
                await this.props.searchAppointmentMode(
                    SEARCH_APPOINTMENT_MODE,
                    requestDTO,
                    {
                        page: updatedPage,
                        size: queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.AppointmentModeSearchReducer.appointmentModeList.length
                        ? this.props.AppointmentModeSearchReducer.appointmentModeList[0].totalItems
                        : 0,
                    queryParams: {
                        ...queryParams,
                        page: updatedPage
                    },
                })
            } catch (e) {

            }

        };

        setDefaultValues = (name, description, code, status, isEditable, id) => {
            this.defaultAppointmentModeData.name = name;
            this.defaultAppointmentModeData.description = description;
            this.defaultAppointmentModeData.code = code;
            this.defaultAppointmentModeData.status = status;
            this.defaultAppointmentModeData.isEditable = isEditable;
            this.defaultAppointmentModeData.id = id;
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

        validateNameAndCodeLength = (name, code) => {
            let nameMaxLength = 50, codeMaxLength = 6;
            let alertType = "warning", message = "";
            if (name.length > nameMaxLength)
                message = "Name should contain 50 characters only.";
            else if (code.length > codeMaxLength)
                message = "Code should contain 6 characters only.";
            if (message) {
                this.showAlertMessage(alertType, message);
                return false;
            } else {
                return true;
            }
        };

        validateAppointmentModeData = (name, code, status) => {
            let alertType = "warning", message = "";
            if (!name && !code && !status)
                message = "Name, Code and Status must be not empty.";
            else if (!name && !code)
                message = "Name and Code should not  be empty.";
            else if (!name)
                message = "Name should not  be empty.";
            else if (!code)
                message = "Code should not  be empty.";
            else if (!status)
                message = "Status should not  be empty.";
            if (message)
                this.showAlertMessage(alertType, message);
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer);
        }


        render() {

            const {
                searchParameters, queryParams, totalRecords,
                formValid,
                alertMessageInfo, showAlert,
                showEditConfirmationModal, remarks, showDeleteModal,
                showPreviewModal,
                description, isEditable,
                showSaveConfirmationModal,
                isActionComplete
            } = this.state;

            const {
                isSaveAppointmentModeLoading,
                saveSuccessMessage,
                saveErrorMessage
            } = this.props.AppointmentModeSaveReducer;

            const {
                isFetchAppointmentModeLoading, activeAppointmentModeForDropdown, dropdownErrorMessage
            } = this.props.AppointmentModeDropdownReducer;

            const {appointmentModeList, isSearchAppointmentModeLoading, searchErrorMessage} = this.props.AppointmentModeSearchReducer;

            const {editErrorMessage, isEditAppointmentModeLoading} = this.props.AppointmentModeEditReducer;

            const {deleteErrorMessage, isDeleteAppointmentModeLoading} = this.props.AppointmentModeDeleteReducer;

            const {
                isPreviewAppointmentModeLoading,
                previewAppointmentModeErrorMessage,
                appointmentModeDetails
            } = this.props.AppointmentModePreviewReducer;

            return <>
                <>
                    <ComposedComponent
                        {...props}
                        searchParams={{
                            searchParameters,
                            appointmentModeList: activeAppointmentModeForDropdown,
                            appointmentModeDropdownErrorMessage: dropdownErrorMessage,
                            isFetchAppointmentModeLoading,
                            onInputChange: this.handleInputChange,
                            resetSearchForm: this.handleResetSearchForm,
                            handleEnter: this.handleEnter,
                            onSearchClick: this.searchAppointmentModes
                        }}
                        tableData={{
                            appointmentModeList,
                            isSearchAppointmentModeLoading,
                            searchErrorMessage,
                            currentPage: queryParams.page,
                            maxSize: queryParams.size,
                            totalItems: totalRecords,
                            handlePageChange: this.handlePageChange,
                            appointmentModeData: this.defaultAppointmentModeData,
                            formValid: formValid,
                            handleSave: this.handleSave,
                            handleCancel: this.handleCancel,
                            handleEdit: this.handleEdit,
                            handleUpdate: this.handleOpenEditConfirmationModal,
                            handleDelete: this.handleDelete,
                            handlePreview: this.handlePreview,
                            changeActionComplete: this.changeActionComplete,
                            isActionComplete
                        }}
                    />
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

                    {showSaveConfirmationModal ?
                        <CModal
                            show={showSaveConfirmationModal}
                            modalHeading={"Save Appointment Mode"}
                            size="lg"
                            bodyChildren={
                                <AppointmentModeConfirmationModalContent
                                    errorMessage={""}
                                    onChangeHandler={this.handleInputChange}
                                    actionDisabled={isSaveAppointmentModeLoading || (!description && !remarks)}
                                    onPrimaryAction={this.saveAppointmentModeSetup}
                                    primaryActionName={"Confirm"}
                                    onCancel={this.closeSaveModal}
                                    confirmationMessage={"Provide Description and select if Appointment mode is editable."}
                                    modalActionType={"SAVE"}
                                    modalData={{
                                        description,
                                        isEditable
                                    }}
                                    isPrimaryActionLoading={isSaveAppointmentModeLoading}
                                />}
                            onHide={this.closeSaveModal}
                            dialogClassName="cogent-modal"
                        />
                        : ''
                    }

                    {showEditConfirmationModal ?
                        <CModal
                            show={showEditConfirmationModal}
                            modalHeading={"Edit Appointment Mode"}
                            size="lg"
                            bodyChildren={
                                <AppointmentModeConfirmationModalContent
                                    errorMessage={editErrorMessage}
                                    onChangeHandler={this.handleInputChange}
                                    actionDisabled={isEditAppointmentModeLoading || (!description && !remarks)}
                                    onPrimaryAction={this.editAppointmentModeSetup}
                                    primaryActionName={"Confirm"}
                                    onCancel={this.closeModal}
                                    confirmationMessage={"Provide Remarks and change description(if necessary)."}
                                    modalActionType={"EDIT"}
                                    modalData={{
                                        remarks,
                                        description
                                    }}
                                    isPrimaryActionLoading={isEditAppointmentModeLoading}
                                />}
                            onHide={this.closeModal}
                            dialogClassName="cogent-modal"
                        />
                        : ''
                    }
                    {showDeleteModal ?
                        <ConfirmDelete
                            confirmationMessage="Are you sure you want to delete the Appointment Mode? If yes please provide remarks."
                            modalHeader="Delete Appointment Mode"
                            showModal={showDeleteModal}
                            isLoading={isDeleteAppointmentModeLoading}
                            setShowModal={this.closeModal}
                            onDeleteRemarksChangeHandler={this.handleInputChange}
                            remarks={remarks}
                            onSubmitDelete={this.deleteAppointmentModeSetup}
                            deleteErrorMessage={deleteErrorMessage}
                        />
                        : ''
                    }
                    {showPreviewModal ?
                        <AppointmentModeDetails
                            showPreviewModal={showPreviewModal}
                            closeModal={this.closeModal}
                            appointmentModeData={appointmentModeDetails}
                        /> : ''}
                </>
            </>
        }
    }

    return ConnectHoc(AppointmentModeHOC,
        [
            'AppointmentModeSaveReducer',
            'AppointmentModeEditReducer',
            'AppointmentModeDeleteReducer',
            'AppointmentModeSearchReducer',
            'AppointmentModePreviewReducer',
            'AppointmentModeDropdownReducer',
        ],
        {
            clearSuccessErrorMessageFormStore,
            deleteAppointmentMode,
            editAppointmentMode,
            fetchActiveAppointmentModeForDropdown,
            fetchAppointmentModeDetailsByAppointmentModeId,
            saveAppointmentMode,
            searchAppointmentMode
        });
};

export default AppointmentModeHOC;
