import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {DateTimeFormatterUtils, EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware,
    DoctorMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationHospitalWiseForDropdown} = SpecializationSetupMiddleware;
const {fetchDoctorsBySpecializationIdForDropdown} = DoctorMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {
    ACTIVE_DROPDOWN_SPECIALIZATION,
    SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL
} = AdminModuleAPIConstants.specializationSetupAPIConstants;

const {
    FETCH_DOCTOR_BY_SPECIALIZATION_ID,
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN,
    FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
} = AdminModuleAPIConstants.doctorSetupApiConstants;

const {addDate} = DateTimeFormatterUtils;

const DoctorDutyRosterShiftWiseHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRosterShiftWiseHOC extends PureComponent {

        state = {
            doctorInformation: {
                fromDate: new Date(),
                toDate: addDate(new Date(), 6),
                hospital: null,
                specialization: null,
                doctor: null,
                rosterGapDuration: '',
                status: 'Y',
                doctorShifts: [],
            },
            formValid: false

        };

        checkFormValidity = () => {
            const {
                doctorInformation,
                // hasOverrideDutyRoster,
                // doctorDutyRosterOverrideRequestDTOS,
                // doctorWeekDaysDutyRosterRequestDTOS
            } = this.state;
            const {
                fromDate,
                toDate,
                hospital,
                specialization,
                doctor,
                rosterGapDuration,
                status,
                doctorShifts
            } = doctorInformation;

            let formValid =
                fromDate &&
                toDate &&
                hospital &&
                specialization &&
                doctor &&
                rosterGapDuration &&
                status &&
                doctorShifts;
            // if (hasOverrideDutyRoster === 'Y') {
            //     formValid = formValid && doctorDutyRosterOverrideRequestDTOS.length
            // }
            //
            // doctorWeekDaysDutyRosterRequestDTOS.map(weekDay => {
            //     formValid = formValid && weekDay.startTime && weekDay.endTime
            // })

            this.setState({
                formValid: Boolean(formValid)
            })
        };

        fetchHospitalsForDropdown = async () => {
            await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
        };

        fetchActiveSpecializationByHospitalForDropdown = async hospitalId => {
            return await this.props.fetchSpecializationHospitalWiseForDropdown(
                SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
                hospitalId
            )
        };

        fetchActiveDoctorsBySpecializationIdForDropdown = async specializationId => {
            return await this.props.fetchDoctorsBySpecializationIdForDropdown(
                FETCH_DOCTOR_BY_SPECIALIZATION_ID,
                specializationId
            )
        };

        handleEnter = event => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handleDoctorInformationFormChange = async (event, fieldName, fieldValid) => {
            let key = fieldName ? fieldName : event.target.name;
            let value = fieldName ? event : event.target.value;
            let label = fieldName ? '' : event.target.label;
            let fileUri = fieldName ? '' : event.target.fileUri;

            await this.setValuesInState(key, value, label, fileUri, fieldValid, "doctorInformation");

            switch (key) {
                case "hospital":
                    value && await this.fetchActiveSpecializationByHospitalForDropdown(value);
                    this.resetSpecializationAndDoctorOnHospitalChange();
                    break;
                case "specialization":
                    value && this.fetchActiveDoctorsBySpecializationIdForDropdown(value);
                    this.resetDoctorOnSpecializationChange();
                    break;
                case "fromDate" || "toDate":
                    await this.validateAndSetWeekDaysDataOnDateChange(key);
                    break;
                default:
                    break;
            }
            this.checkFormValidity();
            // type === 'ADD' ? this.checkFormValidity() : this.checkManageFormValidity();
        };

        resetSpecializationAndDoctorOnHospitalChange = () => {
            this.setState({
                doctorInformation: {
                    ...this.state.doctorInformation,
                    specialization: null,
                    doctor: null,
                }
            })
        };

        resetDoctorOnSpecializationChange = () => {
            this.setState({
                doctor: null
            });
        };

        setValuesInState = (key, value, label, fileUri, fieldValid, objectName) => {
            let doctorInformationData = {...this.state[objectName]};
            doctorInformationData[key] = label
                ? (value
                    ? (fileUri ? {label, value, fileUri} : {label, value})
                    : null)
                : value;
            this.setState({
                [objectName]: {...doctorInformationData}
            })
        };

        initialApiCalls = () => {
            this.fetchHospitalsForDropdown();
        };

        componentDidMount() {
            this.initialApiCalls();
        }

        render() {
            const {doctorInformation} = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

            const {
                allActiveSpecializationList,
                activeSpecializationListByHospital,
                dropdownErrorMessage
            } = this.props.SpecializationDropdownReducer;

            const {
                doctorsBySpecializationForDropdown,
                doctorDropdownErrorMessage,
                activeDoctorsForDropdown,
                activeDoctorsByHospitalForDropdown
            } = this.props.DoctorDropdownReducer;

            return <>
                <ComposedComponent
                    doctorInformationFormData={{
                        doctorInformationData: doctorInformation,
                        onInputChange: this.handleDoctorInformationFormChange,
                        onEnterKeyPress: this.handleEnter,
                        hospitalList: hospitalsForDropdown,
                        specializationList: activeSpecializationListByHospital,
                        doctorList: doctorsBySpecializationForDropdown
                    }}
                />
            </>;
        }
    }

    return ConnectHoc(DoctorDutyRosterShiftWiseHOC, [
        'DoctorDropdownReducer',
        'HospitalDropdownReducer',
        'SpecializationDropdownReducer',
        'WeekdaysReducer'
    ], {
        fetchActiveHospitalsForDropdown,
        fetchSpecializationHospitalWiseForDropdown,
        fetchDoctorsBySpecializationIdForDropdown
    });

};

export default DoctorDutyRosterShiftWiseHOC;
