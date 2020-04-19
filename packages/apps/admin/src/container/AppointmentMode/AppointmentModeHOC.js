import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {AppointmentModeMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";
import AppointmentModeDetails from "./AppointmentModeDetails";
import "./appointment-mode.scss"

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
            showEditRemarksModal: false,
            showDeleteModal: false,
            showPreviewModal: false
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
            this.searchAppointmentModes();
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
                showEditRemarksModal: false,
                showDeleteModal: false,
                showPreviewModal: false,
                remarks: ''
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
            let status = {
                value: editData.status,
                label: editData.status === 'Y' ? 'Active' : 'Inactive'
            };
            this.setDefaultValues(editData.name, editData.description, editData.code, status, editData.isEditable, editData.id)
        };

        handleOpenEditRemarksModal = (updateData) => {
            const {id, name, description, code, status, isEditable} = updateData.data;

            // UPDATE THE DEFAULT VALUES WITH CURRENTLY UPDATED DATA.....
            // WILL BE USED IN CASE REMARKS MODAL IS CLOSED
            this.setDefaultValues(name, description, code, status, isEditable, id);

            if (!name || !status || !description || !code) {
                this.validateAppointmentModeData(name, address, countryName, status);
            } else {
                // IF ALL DATA IS VALID, SAVE THEM IN STATE FOR UPDATE AND OTHER PURPOSES
                this.setState({
                    showEditRemarksModal: true,
                    id: id,
                    name: name,
                    description: description,
                    code: code,
                    status: status,
                    isEditable: isEditable
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
                await this.props.fetchAppointmentModeDetailsByAppointmentModeId(FETCH_APPOINTMENT_MODE_DETAILS_BY_ID, previewData.id);
                this.setState({
                    showPreviewModal: true
                })
            } catch (e) {
                this.showAlertMessage("danger", this.AppointmentModePreviewReducer.previewAppointmentModeErrorMessage);
            }
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
            })
        };

        saveAppointmentModeSetup = async (saveData) => {
            const {name, description, code, status, isEditable} = saveData.data;

            this.setDefaultValues(name, description, code, status, isEditable, '');

            if (!name || !status || !description || !code) {
                this.validateAppointmentModeData(name, description, code, status);
            } else {
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
                    this.actionsOnOperationComplete();
                    return true;
                } catch (e) {
                    this.showAlertMessage("danger", this.props.AppointmentModeSaveReducer.saveErrorMessage);
                    return false;
                }
            }
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

        setDefaultValues = (name, address, countryName, status, isEditable, id) => {
            this.defaultAppointmentModeData.name = name;
            this.defaultAppointmentModeData.description = address;
            this.defaultAppointmentModeData.code = countryName;
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

        validateAppointmentModeData = (name, description, code, status) => {
            if (!name && !description && !code && !status)
                this.showAlertMessage("warning", "Name, Description, Code and Status must be not empty.");
            else if (!name && !description && !code)
                this.showAlertMessage("warning", "Name, Description and Code should not  be empty.");
            else if (!name)
                this.showAlertMessage("warning", "Name should not  be empty.");
            else if (!description)
                this.showAlertMessage("warning", "Description should not  be empty.");
            else if (!code)
                this.showAlertMessage("warning", "Code should not  be empty.");
            else if (!status)
                this.showAlertMessage("warning", "Status should not  be empty.")
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
                showEditRemarksModal, remarks, showDeleteModal,
                showPreviewModal
            } = this.state;

            const {
                isFetchAppointmentModeLoading, activeAppointmentModeForDropdown, dropdownErrorMessage
            } = this.props.AppointmentModeDropdownReducer;

            const {appointmentModeList, isSearchAppointmentModeLoading, searchErrorMessage} = this.props.AppointmentModeSearchReducer;

            const {editErrorMessage, isEditAppointmentModeLoading} = this.props.AppointmentModeEditReducer;

            const {deleteErrorMessage, isDeleteAppointmentModeLoading} = this.props.AppointmentModeDeleteReducer;

            const {
                isPreviewAppointmentModeLoading,
                previewAppointmentModeErrorMessage,
                universityDetails
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
                            handleSave: this.saveAppointmentModeSetup,
                            handleCancel: this.handleCancel,
                            handleEdit: this.handleEdit,
                            handleUpdate: this.handleOpenEditRemarksModal,
                            handleDelete: this.handleDelete,
                            handlePreview: this.handlePreview
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
                    {showEditRemarksModal ?
                        <CRemarksModal
                            confirmationMessage="Provide remarks for edit."
                            modalHeader="Edit Appointment Mode"
                            showModal={showEditRemarksModal}
                            onCancel={this.closeModal}
                            onRemarksChangeHandler={this.handleInputChange}
                            remarks={remarks}
                            onPrimaryAction={this.editAppointmentModeSetup}
                            primaryActionName={isEditAppointmentModeLoading ? "Confirming" : "Confirm"}
                            actionDisabled={isEditAppointmentModeLoading}
                            errorMessage={editErrorMessage}
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
                            universityData={universityDetails}
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
