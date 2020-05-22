import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {
    DoctorMiddleware,
    HospitalDepartmentSetupMiddleware,
    RoomSetupMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";

const {
    clearSuccessErrorMessageFormStore,
    deleteHospitalDepartment,
    editHospitalDepartment,
    fetchActiveHospitalDepartmentForDropdown,
    fetchAllHospitalDepartmentForDropdown,
    fetchHospitalDepartmentDetailsByHospitalDepartmentId,
    saveHospitalDepartment,
    searchHospitalDepartment
} = HospitalDepartmentSetupMiddleware;

const {
    fetchActiveDoctorsForDropdown
} = DoctorMiddleware;

const {
    fetchActiveRoomNumberForDropdown,
    fetchAllRoomNumberForDropdown
} = RoomSetupMiddleware;

const {
    DELETE_HOSPITAL_DEPARTMENT,
    EDIT_HOSPITAL_DEPARTMENT,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
    FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
    SAVE_HOSPITAL_DEPARTMENT,
    SEARCH_HOSPITAL_DEPARTMENT
} = AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants;

const {
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
} = AdminModuleAPIConstants.doctorSetupApiConstants;

const {
    FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN,
    FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN
} = AdminModuleAPIConstants.roomSetupApiConstants;

const HospitalDepartmentSetupHOC = (Component, props, type) => {

    class HospitalDepartmentSetupHOC extends PureComponent {

        state = {
            departmentData: {
                name: '',
                code: '',
                description: '',
                doctors: null,
                rooms: null,
                appointmentCharge: '',
                followUpCharge: '',
                status: 'Y',
                nameValid: true,
                descriptionValid: true,
                appointmentChargeValid: true,
                followUpChargeValid: true,
            },
            showConfirmModal: false,
            showPreviewModal: false,
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
                appointmentCharge,
                code,
                description,
                doctors,
                followUpCharge,
                name,
                rooms,
                status,
                nameValid,
                descriptionValid,
                appointmentChargeValid,
                followUpChargeValid
            } = this.state.departmentData;

            let formValid =
                name && nameValid &&
                description && descriptionValid &&
                appointmentCharge && appointmentChargeValid &&
                followUpCharge && followUpChargeValid &&
                doctors && doctors.length &&
                rooms && rooms.length &&
                code &&
                status;

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

        fetchActiveDoctorsForDropdown = async () => {
            await this.props.fetchActiveDoctorsForDropdown(FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN);
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

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handleInputChange = async (event, fieldValid) => {
            let key = event.target.name;
            let value = key === "code" ? event.target.value.toUpperCase() : event.target.value;
            let label = event.target.label;
            let fileUri = event.target.fileUri;
            let values = event.target.values;

            await this.setValuesInState(key, values ? values : value, label, fileUri, fieldValid, "departmentData");
            this.checkFormValidity();
        };

        handleSearchFormChange = async (event) => {
            let key = event.target.name;
            let value = key === "code" ? event.target.value.toUpperCase() : event.target.value;
            let label = event.target.label;
            let fileUri = event.target.fileUri;

            await this.setValuesInState(key, value, label, fileUri, undefined, "searchParameters");
            this.checkFormValidity();
        };

        handleAddDepartment = () => {
            this.setShowModal(true)
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

        initialApiCalls = () => {
            this.fetchActiveDoctorsForDropdown();
            this.fetchActiveRoomNumberForDropdown();
            if (type === "MANAGE") {
                this.fetchAllHospitalDepartmentsForDropdown();
                this.fetchAllRoomNumbersForDropdown();
                this.searchDepartmentList(1);
            }
        };

        resetDepartmentAddForm = () => {
            this.setState({
                departmentData: {
                    ...this.state.departmentData,
                    name: '',
                    code: '',
                    description: '',
                    doctors: null,
                    rooms: null,
                    appointmentCharge: '',
                    followUpCharge: '',
                    status: 'Y',
                    nameValid: true,
                    descriptionValid: true,
                    appointmentChargeValid: true,
                    followUpChargeValid: true,
                },
                errorMessageForDepartmentName: '',
                errorMessageForDescription: ''
            })
        };

        setValuesInState = (key, value, label, fileUri, fieldValid, objectName) => {
            let stateData = {...this.state[objectName]};
            stateData[key] = label
                ? (value
                    ? (fileUri ? {label, value, fileUri} : {label, value})
                    : null)
                : value;
            if (!label) stateData[key + "Valid"] = fieldValid;
            this.setState({
                [objectName]: {...stateData}
            })
        };

        setShowModal = (value) => {
            this.setState({
                showConfirmModal: value ? value : false,
                showPreviewModal: value ? value : false,
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
                status, rooms,
                name, followUpCharge, doctors,
                description, code,
                appointmentCharge
            } = this.state.departmentData;
            let doctorIds = doctors && doctors.map(doctor => doctor.value);
            let roomIds = rooms && rooms.map(room => room.value);
            console.log(doctorIds);
            let requestDTO = {
                name,
                code,
                description,
                status,
                appointmentCharge,
                followUpCharge,
                doctorId: [...doctorIds],
                roomId: [...roomIds]
            };
            try {
                await this.props.saveHospitalDepartment(SAVE_HOSPITAL_DEPARTMENT, requestDTO);
                this.showAlertMessage("success", this.props.HospitalDepartmentSaveReducer.saveSuccessMessage);
                this.resetDepartmentAddForm();
            } catch (e) {
                this.showAlertMessage("danger", this.props.HospitalDepartmentSaveReducer.saveErrorMessage);
            }
            this.setShowModal(false);
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

        render() {
            const {
                departmentData, alertMessageInfo, showAlert, showConfirmModal, errorMessageForDepartmentName,
                errorMessageForDescription, errorMessageForAppointmentCharge, formValid, showPreviewModal,
                searchParameters, totalRecords, queryParams
            } = this.state;

            const {activeDoctorsForDropdown} = this.props.DoctorDropdownReducer;

            const {activeRoomNumberForDropdown, allRoomNumberForDropdown} = this.props.RoomNumberDropdownReducer;

            const {isSaveHospitalDepartmentLoading} = this.props.HospitalDepartmentSaveReducer;

            const {allHospitalDepartmentForDropdown, allDepartmentDropdownErrorMessage} = this.props.HospitalDepartmentDropdownReducer;

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
                        activeRoomNumberForDropdown,
                        handleEnterPress: this.handleEnterPress,
                        handleInputChange: this.handleInputChange,
                        errorMessageForDepartmentName,
                        errorMessageForDescription,
                        errorMessageForAppointmentCharge,
                        resetDepartmentAddForm: this.resetDepartmentAddForm,
                        formValid,
                        showConfirmModal,
                        setShowConfirmModal: this.setShowModal,
                        handleAddDepartment: this.handleAddDepartment
                    }}
                    departmentPreviewData={{
                        departmentData: departmentData,
                        showPreviewModal,
                        setShowModal: this.setShowModal,
                        onConfirmClick: this.saveDepartment,
                        isSaveHospitalDepartmentLoading
                    }}
                    searchData={{
                        searchParameters: searchParameters,
                        allHospitalDepartmentForDropdown,
                        allDepartmentDropdownErrorMessage,
                        allRoomNumberForDropdown,
                        activeDoctorsForDropdown,
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
            'RoomNumberDropdownReducer'
        ],
        {
            clearSuccessErrorMessageFormStore,
            deleteHospitalDepartment,
            editHospitalDepartment,
            fetchActiveHospitalDepartmentForDropdown,
            fetchAllHospitalDepartmentForDropdown,
            fetchHospitalDepartmentDetailsByHospitalDepartmentId,
            fetchActiveDoctorsForDropdown,
            fetchAllRoomNumberForDropdown,
            fetchActiveRoomNumberForDropdown,
            saveHospitalDepartment,
            searchHospitalDepartment
        });

};

export default HospitalDepartmentSetupHOC;
