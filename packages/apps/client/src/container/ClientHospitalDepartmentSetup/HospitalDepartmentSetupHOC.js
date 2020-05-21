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
    fetchActiveRoomNumberForDropdown
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
    FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN
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
                status: 'Y'
            },
            showConfirmModal: false,
            showPreviewModal: false,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
            errorMessageForDepartmentName: '',
            errorMessageForDescription: '',
            errorMessageForAppointmentCharge:
                'Appointment Charge Should only be number and upto 2 decimal',
            formValid: false,
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
                status
            } = this.state.departmentData;

            let formValid =
                appointmentCharge &&
                code &&
                description &&
                doctors && doctors.length &&
                followUpCharge &&
                name &&
                rooms && rooms.length &&
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

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handleInputChange = async (event, fieldValid) => {
            let key = event.target.name;
            let value = event.target.value;
            let label = event.target.label;
            let fileUri = event.target.fileUri;
            let values = event.target.values;

            await this.setValuesInState(key, values ? values : value, label, fileUri, fieldValid, "departmentData");
            this.checkFormValidity();
        };

        handleAddDepartment = () => {
            this.setShowModal(true)
        };

        initialApiCalls = () => {
            this.fetchActiveDoctorsForDropdown();
            this.fetchActiveRoomNumberForDropdown();
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
                    status: 'Y'
                },
                errorMessageForDepartmentName: '',
                errorMessageForDescription: ''
            })
        };

        setValuesInState = (key, value, label, fileUri, fieldValid, objectName) => {
            let departmentData = {...this.state[objectName]};
            departmentData[key] = label
                ? (value
                    ? (fileUri ? {label, value, fileUri} : {label, value})
                    : null)
                : value;
            this.setState({
                [objectName]: {...departmentData}
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

        render() {
            const {
                departmentData, alertMessageInfo, showAlert, showConfirmModal, errorMessageForDepartmentName,
                errorMessageForDescription, errorMessageForAppointmentCharge, formValid, showPreviewModal
            } = this.state;

            const {activeDoctorsForDropdown} = this.props.DoctorDropdownReducer;

            const {activeRoomNumberForDropdown} = this.props.RoomNumberDropdownReducer;

            const {isSaveHospitalDepartmentLoading} = this.props.HospitalDepartmentSaveReducer;
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
        ], {
            clearSuccessErrorMessageFormStore,
            deleteHospitalDepartment,
            editHospitalDepartment,
            fetchActiveHospitalDepartmentForDropdown,
            fetchAllHospitalDepartmentForDropdown,
            fetchHospitalDepartmentDetailsByHospitalDepartmentId,
            fetchActiveDoctorsForDropdown,
            fetchActiveRoomNumberForDropdown,
            saveHospitalDepartment,
            searchHospitalDepartment
        });

};

export default HospitalDepartmentSetupHOC;
