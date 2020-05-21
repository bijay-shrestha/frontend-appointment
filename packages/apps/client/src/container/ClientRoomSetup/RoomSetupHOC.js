import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {
    HospitalSetupMiddleware,
    RoomSetupMiddleware
} from "@frontend-appointment/thunk-middleware/src/admin-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import "./room-setup.scss";
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";

const {
    clearSuccessErrorMessageFormStore,
    deleteRoomNumber,
    editRoomNumber,
    fetchActiveRoomNumberForDropdown,
    fetchAllRoomNumberForDropdown,
    saveRoomNumber,
    searchRoomNumber,
} = RoomSetupMiddleware;

const {
    DELETE_ROOM_NUMBER,
    EDIT_ROOM_NUMBER,
    FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN,
    FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN,
    SAVE_ROOM_NUMBER,
    SEARCH_ROOM_NUMBER
} = AdminModuleAPIConstants.roomSetupApiConstants;

const RoomSetupHOC = (ComposedComponent, props, type) => {
    class RoomSetup extends PureComponent {
        state = {
            roomData: {
                id: '',
                roomNumber: '',
                status: {value: 'Y', label: 'Active'},
                remarks: '',
                isNew: true
            },
            formValid: false,
            searchParameters: {
                roomNumber: '',
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
            isActionComplete: false
        };

        defaultRoomValueForEdit = {
            id: '',
            roomNumber: '',
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
                    roomNumber: '',
                    status: {value: 'A', label: 'All'},
                }
            });
            this.searchRoomNumber(1);
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchRoomNumber();
        };

        handleInputChange = async (event, fType) => {
            let key = event.target.name;
            let value = event.target.value;
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
                        roomData: {
                            ...this.state.roomData,
                            [key]: {value, label}
                        }
                    })
                    : await this.setState({
                        roomData: {
                            ...this.state.roomData,
                            [key]: null
                        }
                    })
                    : await this.setState({
                        roomData: {
                            ...this.state.roomData,
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
            this.setDefaultRoomValues(editData.id, editData.roomNumber, status, '')
            // this.checkFormValidity();
        };

        handleDelete = async (deleteData) => {
            let room = {...this.state.roomData};
            room.id = deleteData.id;
            this.setState({
                roomData: {...room},
                showDeleteModal: true
            })
        };

        initialApiCalls = async () => {
            this.fetchAllRoomNumberForDropdown();
            this.searchRoomNumber(1);
        };

        fetchActiveRoomNumberForDropdown = async () => {
            await this.props.fetchActiveRoomNumberForDropdown(FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN);
        };

        fetchAllRoomNumberForDropdown = async () => {
            await this.props.fetchAllRoomNumberForDropdown(FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN);
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
            let currentRoomData = {...this.state.roomData};
            currentRoomData.id = '';
            currentRoomData.roomNumber = '';
            currentRoomData.remarks = '';
            currentRoomData.status = {value: 'Y', label: 'Active'};

            this.setDefaultRoomValues('', '', null, '');

            this.setState({
                roomData: {...currentRoomData},
                isActionComplete: true
            })
        };

        actionsOnOperationComplete = () => {
            this.resetAliasData();
            this.handleResetSearchForm();
        };

        searchRoomNumber = async (page) => {
            const {roomNumber, status} = this.state.searchParameters;
            let searchData = {
                id: roomNumber ? roomNumber.value : '',
                status: status && status.value !== 'A' ? status.value : ''
            };

            let updatedPage =
                this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);

            try {
                await this.props.searchRoomNumber(
                    SEARCH_ROOM_NUMBER,
                    searchData,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.RoomNumberSearchReducer.roomNumberList.length
                        ? this.props.RoomNumberSearchReducer.totalRecords
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

        saveRoomNumber = async (saveData) => {
            const {roomNumber, status} = saveData.data;
            this.setDefaultRoomValues('', roomNumber, status, '');
            if (!roomNumber || !status) {
                this.validateFields(roomNumber, status);
            } else {
                let requestDTO = {
                    roomNumber: roomNumber,
                    status: status && status.value
                };
                try {
                    await this.props.saveRoomNumber(SAVE_ROOM_NUMBER, requestDTO);
                    this.showAlertMessage("success", this.props.RoomNumberSaveReducer.saveSuccessMessage);
                    this.actionsOnOperationComplete();
                    return true
                } catch (e) {
                    this.showAlertMessage("danger", this.props.RoomNumberSaveReducer.saveErrorMessage);
                    return false;
                }
            }
        };

        validateFields = (roomNumber, status) => {
            if (!roomNumber && !status) this.showAlertMessage("warning",
                "Room Number and status must be not empty.");
            else if (!roomNumber) this.showAlertMessage("warning", "Room Number should not  be empty.");
            else if (!status) this.showAlertMessage("warning", "Status should not  be empty.")
        };

        setDefaultRoomValues = (id, roomNumber, status, remarks) => {
            this.defaultRoomValueForEdit.id = id;
            this.defaultRoomValueForEdit.roomNumber = roomNumber;
            this.defaultRoomValueForEdit.status = status;
            this.defaultRoomValueForEdit.remarks = remarks;
            this.defaultRoomValueForEdit.isNew = true;
        };

        openEditRemarksModal = (updateData) => {
            const {id, roomNumber, status} = updateData.data;
            let roomData = {...this.state.roomData};
            roomData.id = id;
            roomData.roomNumber = roomNumber;
            roomData.status = status;

            this.setDefaultRoomValues(id, roomNumber, status, '');

            if (!roomNumber || !status) {
                this.validateFields(roomNumber, status);
            } else {
                this.setState({
                    showEditRemarksModal: true,
                    roomData: {...roomData}
                })
            }
        };

        closeModal = () => {
            this.setState({
                showEditRemarksModal: false,
                showDeleteModal: false,
                roomData: {
                    ...this.state.roomData,
                    remarks: ''
                }
            });
            this.props.clearSuccessErrorMessageFormStore();
        };

        editRoomNumber = async () => {
            const {id, roomNumber, status, remarks} = this.state.roomData;
            let requestDTO = {
                id,
                roomNumber,
                status: status && status.value,
                remarks
            };
            try {
                await this.props.editRoomNumber(EDIT_ROOM_NUMBER, requestDTO);
                this.showAlertMessage("success", this.props.RoomNumberEditReducer.editSuccessMessage);
                this.closeModal();
                this.actionsOnOperationComplete();
                return true;
            } catch (e) {
                this.setDefaultRoomValues(id, roomNumber, status, '');
                // this.showAlertMessage("danger", this.props.RoomNumberEditReducer.editErrorMessage);
                return false;
            }
        };

        deleteRoomNumber = async () => {
            const {id, remarks} = this.state.roomData;
            let deleteRequestDTO = {
                id: id,
                remarks,
                status: 'D'
            };
            try {
                await this.props.deleteRoomNumber(DELETE_ROOM_NUMBER, deleteRequestDTO);
                this.showAlertMessage("success", this.props.RoomNumberDeleteReducer.deleteSuccessMessage);
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
                roomData,
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

            const {allRoomNumberForDropdown, allRoomDropdownErrorMessage} = this.props.RoomNumberDropdownReducer;

            const {
                isSearchRoomNumberLoading,
                searchErrorMessage,
                roomNumberList
            } = this.props.RoomNumberSearchReducer;

            const {editErrorMessage, isEditRoomNumberLoading} = this.props.RoomNumberEditReducer;
            const {deleteErrorMessage, isDeleteRoomNumberLoading} = this.props.RoomNumberDeleteReducer;


            return <>
                <ComposedComponent
                    {...props}
                    tableData={{
                        roomNumberList: roomNumberList,
                        isSearchRoomNumberLoading,
                        searchErrorMessage,
                        currentPage: queryParams.page,
                        maxSize: queryParams.size,
                        totalItems: totalRecords,
                        handlePageChange: this.handlePageChange,
                        roomData: this.defaultRoomValueForEdit,
                        handleInputChange: this.handleInputChange,
                        handleCancel: this.handleCancel,
                        handleEdit: this.handleEdit,
                        handleSave: this.saveRoomNumber,
                        handleUpdate: this.openEditRemarksModal,
                        handleUpdateConfirm: this.editRoomNumber,
                        handleDelete: this.handleDelete,
                        handleDeleteSubmit: this.deleteRoomNumber,
                        formValid,
                        isActionComplete,
                        changeActionComplete: this.changeActionComplete
                    }}
                    searchData={{
                        onInputChange: this.handleInputChange,
                        searchParameters,
                        resetSearchForm: this.handleResetSearchForm,
                        handleEnter: this.handleEnter,
                        roomNumbersForDropdown: allRoomNumberForDropdown,
                        dropdownErrorMessage: allRoomDropdownErrorMessage,
                        onSearchClick: this.searchRoomNumber,
                    }}
                />
                {showEditRemarksModal ?
                    <CRemarksModal
                        confirmationMessage="Provide remarks for edit."
                        modalHeader="Edit Room"
                        showModal={showEditRemarksModal}
                        onCancel={this.closeModal}
                        onRemarksChangeHandler={this.handleInputChange}
                        remarks={roomData.remarks}
                        onPrimaryAction={this.editRoomNumber}
                        primaryActionName={"Confirm"}
                        actionDisabled={isEditRoomNumberLoading}
                        primaryActionLoading={isEditRoomNumberLoading}
                        errorMessage={editErrorMessage}
                    />
                    : ''
                }
                {showDeleteModal ?
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete the Room Number? If yes please provide remarks."
                        modalHeader="Delete Room Number"
                        showModal={showDeleteModal}
                        setShowModal={this.closeModal}
                        onDeleteRemarksChangeHandler={this.handleInputChange}
                        remarks={roomData.remarks}
                        onSubmitDelete={this.deleteRoomNumber}
                        deleteErrorMessage={deleteErrorMessage}
                        isLoading={isDeleteRoomNumberLoading}
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
            'RoomNumberDropdownReducer',
            'RoomNumberSaveReducer',
            'RoomNumberEditReducer',
            'RoomNumberDeleteReducer',
            'RoomNumberSearchReducer',
        ], {
            fetchActiveRoomNumberForDropdown,
            fetchAllRoomNumberForDropdown,
            searchRoomNumber,
            deleteRoomNumber,
            editRoomNumber,
            saveRoomNumber,
            clearSuccessErrorMessageFormStore
        }
    )
};

export default RoomSetupHOC;
