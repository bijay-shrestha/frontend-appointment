import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {
    BillingModeMiddleware,
    DoctorMiddleware,
    HospitalDepartmentSetupMiddleware,
    RoomSetupMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {CommonUtils, EnterKeyPressUtils} from "@frontend-appointment/helpers";

const {
    clearSuccessErrorMessageFormStore,
    deleteHospitalDepartment,
    editHospitalDepartment,
    fetchActiveHospitalDepartmentForDropdown,
    fetchAvailableRoomsForDropdown,
    fetchAllHospitalDepartmentForDropdown,
    fetchHospitalDepartmentDetailsByHospitalDepartmentId,
    saveHospitalDepartment,
    searchHospitalDepartment
} = HospitalDepartmentSetupMiddleware;

const {
    fetchActiveDoctorsForDropdown,
    fetchAllDoctorsForDropdown
} = DoctorMiddleware;

const {
    fetchActiveRoomNumberForDropdown,
    fetchAllRoomNumberForDropdown
} = RoomSetupMiddleware;

const {fetchActiveBillingModeForDropdown} = BillingModeMiddleware;

const {
    DELETE_HOSPITAL_DEPARTMENT,
    EDIT_HOSPITAL_DEPARTMENT,
    FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
    SAVE_HOSPITAL_DEPARTMENT,
    SEARCH_HOSPITAL_DEPARTMENT,
    FETCH_HOSPITAL_DEPARTMENT_DETAILS_BY_ID,
    FETCH_AVAILABLE_ROOMS_FOR_DROPDOWN
} = AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants;

const {
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN
} = AdminModuleAPIConstants.doctorSetupApiConstants;

const {
    FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN,
    FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN
} = AdminModuleAPIConstants.roomSetupApiConstants;

const {FETCH_ACTIVE_BILLING_MODE_FOR_DROPDOWN} = AdminModuleAPIConstants.billingModeApiConstants;

const NO_BILLING_MODE_MESSAGE = "Billing Mode not assigned! Contact the system administrator for assigning Billing Mode.";

const HospitalDepartmentSetupHOC = (Component, props, type) => {

    class HospitalDepartmentSetupHOC extends PureComponent {

        state = {
            departmentData: {
                id: '',
                name: '',
                code: '',
                description: '',
                doctorList: null,
                roomList: null,
                status: 'Y',
                nameValid: true,
                descriptionValid: true,
                // appointmentCharge: '',
                // followUpCharge: '',
                // appointmentChargeValid: true,
                // followUpChargeValid: true,
                originalDoctorList: [],
                originalRoomList: [],
                remarks: '',
                departmentChargeSchemes: [{
                    billingMode: null,
                    appointmentCharge: '',
                    followUpCharge: '',
                    appointmentChargeValid: true,
                    followUpChargeValid: true,
                }]
            },
            billingModeList: [],
            showDeleteModal: false,
            showPreviewModal: false,
            showEditModal: false,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            errorMessageForDepartmentName: 'Department Name should not contain special characters.',
            errorMessageForDescription: 'Department Description should contain 200 characters only.',
            errorMessageForAppointmentCharge:
                'Charge Should only be number and upto 2 decimal.',
            formValid: false,
            searchParameters: {
                code: '',
                doctor: null,
                department: null,
                room: null,
                status: {value: 'A', label: 'All'},
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            deleteRequestDTO: {
                id: 0,
                remarks: '',
                status: 'D'
            },
        };

        alertTimer = '';

        componentDidMount() {
            this.initialApiCalls();
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer);
        }

        checkFormValidity = () => {
            const {
                // roomList,//roomList can be null
                // nameValid, NAME VALIDATION REMOVED AS NEPALI NAME IS ALSO TO BE ADDED
                code,
                description,
                doctorList,
                name,
                status,
                descriptionValid,
                remarks,
                departmentChargeSchemes
            } = this.state.departmentData;

            let formValid =
                name &&
                description && descriptionValid &&
                doctorList && doctorList.length &&
                code &&
                status &&
                departmentChargeSchemes.length;

            if (departmentChargeSchemes.length) {
                departmentChargeSchemes.map(deptCharge =>
                    formValid = deptCharge.billingMode
                        && Number(deptCharge.appointmentCharge) >= 0
                        && deptCharge.appointmentChargeValid
                        && deptCharge.appointmentCharge.toString()
                        && Number(deptCharge.followUpCharge) >= 0
                        && deptCharge.followUpChargeValid
                        && deptCharge.followUpCharge.toString())
            }

            if (type === 'MANAGE') {
                formValid = formValid && remarks
            }

            this.setState({
                formValid: Boolean(formValid)
            })
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
                showPreviewModal: false,
                showDeleteModal: false,
                showEditModal: false
            })
        };

        deleteDepartment = async () => {
            try {
                await this.props.deleteHospitalDepartment(
                    DELETE_HOSPITAL_DEPARTMENT,
                    this.state.deleteRequestDTO
                )
                await this.setState({
                    showDeleteModal: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
                })
                this.showAlertMessage(
                    'success',
                    this.props.HospitalDepartmentDeleteReducer
                        .deleteSuccessMessage
                )
                this.searchDepartmentList()
            } catch (e) {
                this.setState({
                    showDeleteModal: true
                })
            }
        };

        editDepartment = async () => {
            const {
                id, name, code, description, appointmentCharge, followUpCharge, remarks, status,
                originalDoctorList, originalRoomList, doctorList, roomList
            } = this.state.departmentData;

            let updatedDoctors = [...this.getUpdatedDataListForMultiSelect(originalDoctorList, doctorList, "doctor")];

            let updatedRooms = [...this.getUpdatedDataListForMultiSelect(originalRoomList, roomList, "room")];

            let editRequestDTO = {
                id: id,
                name: name,
                code: code,
                description: description,
                appointmentCharge: appointmentCharge,
                followUpCharge: followUpCharge,
                remarks: remarks,
                status: status,
                doctorUpdateList: [...updatedDoctors],
                roomUpdateList: [...updatedRooms],
            };
            try {
                await this.props.editHospitalDepartment(
                    EDIT_HOSPITAL_DEPARTMENT,
                    editRequestDTO
                );
                this.resetDepartmentData();
                this.showAlertMessage("success", this.props.HospitalDepartmentEditReducer.editSuccessMessage);
                await this.searchDepartmentList();
            } catch (e) {
            }
        };

        getUpdatedDataListForMultiSelect = (originalList, currentList, fieldName) => {
            let updatedDataList = [];
            // FIND NEW ADDED DATA
            currentList && currentList.map(currentItem => {
                let currentItemInOriginalList = originalList && originalList.find(original => original.value === currentItem.value);
                if (!currentItemInOriginalList) {
                    updatedDataList.push({
                        [fieldName.concat("Id")]: currentItem.value,
                        status: 'Y'
                    })
                }
                return '';
            });

            // REMOVE EXISTING DATA
            originalList && originalList.map(originalItem => {
                let originalItemInCurrentList = currentList && currentList.find(current => current.value === originalItem.value);
                if (!originalItemInCurrentList) {
                    updatedDataList.push({
                        [fieldName.concat("Id")]: originalItem.value,
                        status: 'D'
                    })
                }
                return '';
            });

            return updatedDataList;
        };

        fetchAvailableRoomNumbersForDropdown = async () => {
            await this.props.fetchAvailableRoomsForDropdown(FETCH_AVAILABLE_ROOMS_FOR_DROPDOWN);
        };

        fetchActiveDoctorsForDropdown = async () => {
            await this.props.fetchActiveDoctorsForDropdown(FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN);
        };

        fetchAllDoctorsForDropdown = async () => {
            await this.props.fetchAllDoctorsForDropdown(FETCH_ALL_DOCTORS_FOR_DROPDOWN);
        };

        fetchActiveRoomNumberForDropdown = async () => {
            await this.props.fetchActiveRoomNumberForDropdown(FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN);
        };

        fetchAllRoomNumbersForDropdown = async () => {
            await this.props.fetchAllRoomNumberForDropdown(FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN);
        };

        fetchAllHospitalDepartmentsForDropdown = async () => {
            await this.props.fetchAllHospitalDepartmentForDropdown(FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN);
        };

        fetchActiveBillingModes = async () => {
            try {
                await this.props.fetchActiveBillingModeForDropdown(FETCH_ACTIVE_BILLING_MODE_FOR_DROPDOWN);
                const {activeBillingModeForDropdown} = this.props.BillingModeDropdownReducer;
                this.updateBillingModeListInState(activeBillingModeForDropdown);
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'warning',
                        message: NO_BILLING_MODE_MESSAGE
                    }
                });
            }
        };

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handleInputChange = async (event, fieldValid, objectName) => {
            let key = event.target.name;
            let value = key === "code" ? event.target.value.toUpperCase() : event.target.value;
            let label = event.target.label;
            let fileUri = event.target.fileUri;
            let values = event.target.values;

            await this.setValuesInState(key, values ? values : value, label, fileUri, fieldValid,
                objectName ? objectName : "departmentData");
            this.checkFormValidity();
        };

        handleChargeDataChange = async (event, fieldValid, index) => {
            let key = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            const {billingModeList, departmentData} = this.state;
            let deptChargeSchemes = [...departmentData.departmentChargeSchemes];
            let updatedBillingModes = [...billingModeList];
            let oldSelectedBillingMode = deptChargeSchemes[index].billingMode;

            if (key === 'billingMode') {
                oldSelectedBillingMode && updatedBillingModes.push(oldSelectedBillingMode);
                if (value) {
                    updatedBillingModes = updatedBillingModes.filter(billMode => billMode.value !== value);
                }
            }
            deptChargeSchemes[index][key] = label ? value ? {label, value} : null : value;
            deptChargeSchemes[index][key + "Valid"] = fieldValid;

            await this.setValuesInState("departmentChargeSchemes", [...deptChargeSchemes], '', '', fieldValid,
                "departmentData");
            this.updateBillingModeListInState(updatedBillingModes);
            this.checkFormValidity();
        };

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    code: '',
                    hospital: null,
                    doctor: null,
                    department: null,
                    room: null,
                    status: {value: 'A', label: 'All'},
                }
            });

            this.searchDepartmentList(1);
        };

        handleSearchFormChange = async (event) => {
            let key = event.target.name;
            let value = key === "code" ? event.target.value.toUpperCase() : event.target.value;
            let label = event.target.label;
            let fileUri = event.target.fileUri;

            await this.setValuesInState(key, value, label, fileUri, undefined, "searchParameters");
            this.checkFormValidity();
        };

        handleAddDepartment = async () => {
            this.setShowPreviewModal();
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchDepartmentList();
        };

        handlePreviewDepartmentDetails = async departmentId => {
            await this.previewDepartmentDetails(departmentId);
        };

        handleDeleteDepartment = async departmentId => {
            this.props.clearSuccessErrorMessageFormStore();
            let deleteRequestDTO = {...this.state.deleteRequestDTO};
            deleteRequestDTO['id'] = departmentId;
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                showDeleteModal: true
            })
        };

        handleDepartmentEdit = async departmentId => {
            try {
                await this.previewApiCall(departmentId);
                this.setDepartmentDataForEdit();
                this.checkFormValidity()
            } catch (e) {
                this.showAlertMessage("danger",
                    this.props.HospitalDepartmentPreviewReducer.previewHospitalDepartmentErrorMessage);
            }
        };

        handleAddDepartmentChargeScheme = async () => {
            let chargeRowData = {
                billingMode: null,
                appointmentCharge: '',
                followUpCharge: '',
                appointmentChargeValid: true,
                followUpChargeValid: true,
            };
            let currentDepartmentSchemes = [...this.state.departmentData.departmentChargeSchemes];
            currentDepartmentSchemes.push(chargeRowData);
            await this.setDepartmentChargeSchemeData(currentDepartmentSchemes);
            this.checkFormValidity();
        };

        handleRemoveDepartmentChargeScheme = (chargeScheme, index) => {
            const {billingModeList, departmentData} = this.state;

            let deptChargeSchemes = [...departmentData.departmentChargeSchemes],
                updatedBillingModes = [...billingModeList],
                selectedBillingModeOfRow = deptChargeSchemes[index].billingMode;

            selectedBillingModeOfRow && updatedBillingModes.push(selectedBillingModeOfRow);

            deptChargeSchemes.splice(index, 1);
            this.setDepartmentChargeSchemeData(deptChargeSchemes);
            this.updateBillingModeListInState(updatedBillingModes);
            this.checkFormValidity();
        };

        initialApiCalls = () => {
            this.fetchActiveDoctorsForDropdown();
            this.fetchActiveRoomNumberForDropdown();
            this.fetchAvailableRoomNumbersForDropdown();
            this.fetchActiveBillingModes();
            if (type === "MANAGE") {
                this.fetchAllHospitalDepartmentsForDropdown();
                this.fetchAllDoctorsForDropdown();
                this.fetchAllRoomNumbersForDropdown();
                this.searchDepartmentList(1);
            }
        };

        previewApiCall = async departmentId =>
            await this.props.fetchHospitalDepartmentDetailsByHospitalDepartmentId(
                FETCH_HOSPITAL_DEPARTMENT_DETAILS_BY_ID, departmentId);

        previewDepartmentDetails = async departmentId => {
            try {
                await this.previewApiCall(departmentId);
                this.setShowPreviewModal();
            } catch (e) {
                this.showAlertMessage("danger",
                    this.props.HospitalDepartmentPreviewReducer.previewHospitalDepartmentErrorMessage);
            }
        };

        resetDepartmentData = () => {
            this.setState({
                departmentData: {
                    ...this.state.departmentData,
                    name: '',
                    code: '',
                    description: '',
                    doctorList: null,
                    roomList: null,
                    appointmentCharge: '',
                    followUpCharge: '',
                    status: 'Y',
                    nameValid: true,
                    descriptionValid: true,
                    appointmentChargeValid: true,
                    followUpChargeValid: true,
                    originalDoctorList: [],
                    originalRoomList: [],
                    remarks: '',
                    departmentChargeSchemes: [{
                        billingMode: null,
                        appointmentCharge: '',
                        followUpCharge: '',
                        appointmentChargeValid: true,
                        followUpChargeValid: true,
                    }]
                },
                errorMessageForDepartmentName: '',
                errorMessageForDescription: '',
                showEditModal: false

            })
        };

        setValuesInState = (key, value, label, fileUri, fieldValid, objectName) => {
            let stateData = {...this.state[objectName]};
            stateData[key] = label
                ? (value
                    ? (fileUri ? {label, value, fileUri} : {label, value})
                    : null)
                : value;
            if (!label && fieldValid) stateData[key + "Valid"] = fieldValid;
            this.setState({
                [objectName]: {...stateData}
            })
        };

        setDepartmentChargeSchemeData = async departmentChargeScheme => {
            await this.setState({
                departmentData: {
                    ...this.state.departmentData,
                    departmentChargeSchemes: [...departmentChargeScheme]
                }
            })
        };

        setShowPreviewModal = () => {
            this.setState({
                showPreviewModal: true
            })
        };

        setDepartmentDataForEdit = async () => {
            const {hospitalDepartmentDetails} = this.props.HospitalDepartmentPreviewReducer;
            const {id, name, code, description, doctorList, roomList, appointmentCharge, followUpCharge, status} = hospitalDepartmentDetails;
            await this.setState({
                departmentData: {
                    ...this.state.departmentData,
                    id: id,
                    name: name,
                    code: code,
                    description: description,
                    doctorList: doctorList && [...doctorList],
                    roomList: roomList && [...roomList],
                    appointmentCharge: appointmentCharge,
                    followUpCharge: followUpCharge,
                    status: status,
                    originalDoctorList: [...doctorList],
                    originalRoomList: [...roomList]
                },
                showEditModal: true
            })
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

        saveDepartment = async () => {
            const {
                status, roomList,
                name, followUpCharge, doctorList,
                description, code,
                appointmentCharge, departmentChargeSchemes
            } = this.state.departmentData;
            let doctorIds = doctorList ? doctorList.map(doctor => doctor.value) : [],
                roomIds = roomList ? roomList.map(room => room.value) : [],
                billingModes = departmentChargeSchemes.map(deptCharge => ({
                    ...deptCharge,
                    billingModeId: deptCharge.billingMode && deptCharge.billingMode.value
                }));

            let requestDTO = {
                name,
                code,
                description,
                status,
                appointmentCharge,
                followUpCharge,
                doctorId: [...doctorIds],
                roomId: [...roomIds],
                billingModeChargeDTOList: billingModes ? billingModes : []
            };
            try {
                await this.props.saveHospitalDepartment(SAVE_HOSPITAL_DEPARTMENT, requestDTO);
                this.showAlertMessage("success", this.props.HospitalDepartmentSaveReducer.saveSuccessMessage);
                this.resetDepartmentData();
            } catch (e) {
                this.showAlertMessage("danger", this.props.HospitalDepartmentSaveReducer.saveErrorMessage);
            }
            this.closeModal();
        };

        searchDepartmentList = async page => {
            const {doctor, code, department, room, status} = this.state.searchParameters;
            let searchData = {
                code,
                doctorId: doctor && doctor.value,
                id: department && department.value,
                roomId: room && room.value,
                status: status && status.value === 'A' ? '' : status.value,
            };

            let updatedPage =
                this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);

            try {
                await this.props.searchHospitalDepartment(
                    SEARCH_HOSPITAL_DEPARTMENT,
                    searchData,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.HospitalDepartmentSearchReducer.hospitalDepartmentList.length
                        ? this.props.HospitalDepartmentSearchReducer.totalRecords
                        : 0,
                    queryParams: {
                        ...this.state.queryParams,
                        page: updatedPage
                    }
                })
            } catch (e) {

            }
        };

        updateBillingModeListInState = async billingModeList =>
            await this.setState({
                billingModeList: billingModeList ? [...CommonUtils.sortDropdownListAlphabetically(billingModeList)] : []
            });

        render() {
            const {
                departmentData, alertMessageInfo, showAlert, errorMessageForDepartmentName,
                errorMessageForDescription, errorMessageForAppointmentCharge, formValid, showPreviewModal,
                searchParameters, totalRecords, queryParams,
                showDeleteModal, deleteRequestDTO,
                showEditModal, billingModeList
            } = this.state;

            const {activeDoctorsForDropdown, allDoctorsForDropdown} = this.props.DoctorDropdownReducer;

            const {allRoomNumberForDropdown} = this.props.RoomNumberDropdownReducer;

            const {isSaveHospitalDepartmentLoading} = this.props.HospitalDepartmentSaveReducer;

            const {hospitalDepartmentDetails} = this.props.HospitalDepartmentPreviewReducer;

            const {deleteErrorMessage, isDeleteHospitalDepartmentLoading} = this.props.HospitalDepartmentDeleteReducer;

            const {isEditHospitalDepartmentLoading, editErrorMessage} = this.props.HospitalDepartmentEditReducer;

            const {
                allHospitalDepartmentForDropdown, allDepartmentDropdownErrorMessage,
                availableRoomsForDropdown
            } = this.props.HospitalDepartmentDropdownReducer;

            const {
                isSearchHospitalDepartmentLoading,
                hospitalDepartmentList,
                searchErrorMessage
            } = this.props.HospitalDepartmentSearchReducer;

            return <>
                <Component
                    {...props}
                    hospitalDepartmentAddData={{
                        departmentData: departmentData,
                        activeDoctorsForDropdown,
                        availableRoomsForDropdown,
                        handleEnterPress: this.handleEnterPress,
                        handleInputChange: this.handleInputChange,
                        errorMessageForDepartmentName,
                        errorMessageForDescription,
                        errorMessageForAppointmentCharge,
                        resetDepartmentData: this.resetDepartmentData,
                        formValid,
                        showConfirmModal: showPreviewModal,
                        setShowConfirmModal: this.closeModal,
                        handleAddDepartment: this.handleAddDepartment,
                    }}
                    departmentChargeProps={{
                        activeBillingModeForDropdown: billingModeList,
                        handleAddDepartmentChargeScheme: this.handleAddDepartmentChargeScheme,
                        handleRemoveDepartmentChargeScheme: this.handleRemoveDepartmentChargeScheme,
                        handleChargeDataChange: this.handleChargeDataChange
                    }}
                    departmentPreviewData={{
                        departmentData: departmentData,
                        showPreviewModal,
                        closeModal: this.closeModal,
                        onConfirmClick: this.saveDepartment,
                        isSaveHospitalDepartmentLoading
                    }}
                    searchData={{
                        searchParameters: searchParameters,
                        allHospitalDepartmentForDropdown,
                        allDepartmentDropdownErrorMessage,
                        allRoomNumberForDropdown,
                        allDoctorsForDropdown: allDoctorsForDropdown,
                        onSearchClick: this.searchDepartmentList,
                        onInputChange: this.handleSearchFormChange,
                        resetSearchForm: this.handleSearchFormReset
                    }}
                    tableData={{
                        filteredActions: props.filteredAction,
                        isSearchHospitalDepartmentLoading,
                        hospitalDepartmentList,
                        searchErrorMessage,
                        totalItems: totalRecords,
                        maxSize: queryParams.size,
                        currentPage: queryParams.page,
                        handlePageChange: this.handlePageChange,
                        // PREVIEW MODAL PROPS
                        departmentPreviewData: {
                            departmentData: hospitalDepartmentDetails,
                            showPreviewModal,
                            closeModal: this.closeModal,
                        },
                        closeModal: this.closeModal,
                        onPreviewHandler: this.handlePreviewDepartmentDetails,
                        //
                        // DELETE MODAL PROPS
                        showDeleteModal,
                        onDeleteHandler: this.handleDeleteDepartment,
                        remarksHandler: this.handleInputChange,
                        remarks: deleteRequestDTO.remarks,
                        onSubmitDelete: this.deleteDepartment,
                        deleteErrorMsg: deleteErrorMessage,
                        isDeleteHospitalDepartmentLoading,
                        //
                        onEditHandler: this.handleDepartmentEdit
                    }}
                    updateData={{
                        departmentData: departmentData,
                        showEditModal: showEditModal,
                        closeModal: this.closeModal,
                        editApiCall: this.editDepartment,
                        errorMessage: editErrorMessage,
                        isEditHospitalDepartmentLoading,
                        activeDoctorsForDropdown,
                        availableRoomsForDropdown,
                        handleEnterPress: this.handleEnterPress,
                        handleInputChange: this.handleInputChange,
                        errorMessageForDepartmentName,
                        errorMessageForDescription,
                        errorMessageForAppointmentCharge,
                        formValid: formValid
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
            </>
        }
    }

    return ConnectHoc(HospitalDepartmentSetupHOC,
        [
            'HospitalDepartmentDeleteReducer',
            'HospitalDepartmentDropdownReducer',
            'HospitalDepartmentEditReducer',
            'HospitalDepartmentPreviewReducer',
            'HospitalDepartmentSaveReducer',
            'HospitalDepartmentSearchReducer',
            'DoctorDropdownReducer',
            'RoomNumberDropdownReducer',
            'BillingModeDropdownReducer'
        ],
        {
            clearSuccessErrorMessageFormStore,
            deleteHospitalDepartment,
            editHospitalDepartment,
            fetchActiveHospitalDepartmentForDropdown,
            fetchAvailableRoomsForDropdown,
            fetchAllHospitalDepartmentForDropdown,
            fetchHospitalDepartmentDetailsByHospitalDepartmentId,
            fetchAllDoctorsForDropdown,
            fetchActiveDoctorsForDropdown,
            fetchAllRoomNumberForDropdown,
            fetchActiveRoomNumberForDropdown,
            saveHospitalDepartment,
            searchHospitalDepartment,
            fetchActiveBillingModeForDropdown
        });

};

export default HospitalDepartmentSetupHOC;
