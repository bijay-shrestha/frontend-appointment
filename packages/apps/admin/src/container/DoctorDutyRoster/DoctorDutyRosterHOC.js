import React, {PureComponent} from 'react';
import {ConnectHoc, TryCatchHandler} from "@frontend-appointment/commons";
import {
    HospitalSetupMiddleware,
    SpecializationSetupMiddleware,
    WeekdaysMiddleware
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {DoctorMiddleware} from "@frontend-appointment/thunk-middleware";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware;
const {fetchDoctorsBySpecializationIdForDropdown} = DoctorMiddleware;
const {fetchWeekdays} = WeekdaysMiddleware;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hostpitalSetupApiConstants;
const {ACTIVE_DROPDOWN_SPECIALIZATION} = AdminModuleAPIConstants.specializationSetupAPIConstants;
const {FETCH_DOCTOR_BY_SPECIALIZATION_ID} = AdminModuleAPIConstants.doctorSetupApiConstants;
const {FETCH_WEEKDAYS} = CommonAPIConstants.WeekdaysApiConstants;

const DoctorDutyRosterHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRoster extends PureComponent {
        state = {
            showExistingRosterModal: false,
            hospital: null,
            specialization: null,
            doctor: null,
            rosterGapDuration: '',
            status: 'Y',
            fromDate: new Date(),
            toDate: new Date(),
            doctorWeekDaysDutyRosterRequestDTOS: [],
            hasOverrideDutyRoster: '',
            doctorDutyRosterOverrideRequestDTOS: []
        };

        componentDidMount() {
            this.initialApiCalls()
        }

        fetchHospitalsForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
        };

        fetchSpecializationForDropdown = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchSpecializationForDropdown(ACTIVE_DROPDOWN_SPECIALIZATION))
        };

        fetchWeekdaysData = async () => {
            await TryCatchHandler.genericTryCatch(this.props.fetchWeekdays(FETCH_WEEKDAYS));
            this.setState({
                doctorWeekDaysDutyRosterRequestDTOS: [...this.props.WeekdaysReducer.weekdaysList]
            });
        };

        fetchExistingRoster = () => {

        };

        handleShowExistingRoster = () => {
            this.setState(prevState => ({
                showExistingRosterModal: !prevState.showExistingRosterModal
            }))
        };

        handleInputChange = (event, fieldValid) => {
            event && this.bindValuesToState(event, fieldValid);
        };

        handleDateChange = (date, name) => {
            date && this.setState({
                [name]: date
            })
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event)
        };

        setStateValues = (key, value, label, fieldValid) =>
            label ? value ?
                this.setState({[key]: {value, label}})
                : this.setState({[key]: null})
                : this.setState({[key]: value, [key + "Valid"]: fieldValid});

        bindValuesToState = async (event, fieldValid) => {
            let fieldName = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            await this.setStateValues(fieldName, value, label, fieldValid);

            if (fieldName === 'specialization') {
                await this.props.fetchDoctorsBySpecializationIdForDropdown(FETCH_DOCTOR_BY_SPECIALIZATION_ID, value);
                await this.setState({
                    doctor: null
                })
            }

            // this.checkFormValidity();
        };

        getExistingRoster = async () => {
            const existingRosters = await this.fetchExistingRoster();
        };

        initialApiCalls = async () => {
            await this.fetchHospitalsForDropdown();
            await this.fetchSpecializationForDropdown();
            await this.fetchWeekdaysData();
        };

        render() {
            const {
                showExistingRosterModal, hospital, specialization, doctor, rosterGapDuration, fromDate, toDate,
                doctorWeekDaysDutyRosterRequestDTOS
            } = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            const {activeSpecializationList, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;
            const {doctorsBySpecializationForDropdown, doctorDropdownErrorMessage} = this.props.DoctorDropdownReducer;
            return <>
                <ComposedComponent
                    {...props}
                    doctorInfoData={
                        {
                            hospital: hospital,
                            specialization: specialization,
                            doctor: doctor,
                            rosterGapDuration: rosterGapDuration,
                            fromDate: fromDate,
                            toDate: toDate
                        }
                    }
                    doctorAvailabilityData={doctorWeekDaysDutyRosterRequestDTOS}
                    hospitalList={hospitalsForDropdown}
                    specializationList={activeSpecializationList}
                    specializationDropdownError={dropdownErrorMessage}
                    doctorList={doctorsBySpecializationForDropdown}
                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                    showExistingRosterModal={showExistingRosterModal}
                    handleShowExistingRoster={this.handleShowExistingRoster}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleEnter={this.handleEnter}
                    getExistingRoster={this.getExistingRoster}
                />
            </>;
        }
    }

    return ConnectHoc(DoctorDutyRoster,
        [
            'HospitalDropdownReducer',
            'SpecializationDropdownReducer',
            'DoctorDropdownReducer',
            'WeekdaysReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchSpecializationForDropdown,
            fetchDoctorsBySpecializationIdForDropdown,
            fetchWeekdays
        })
};

export default DoctorDutyRosterHOC;
