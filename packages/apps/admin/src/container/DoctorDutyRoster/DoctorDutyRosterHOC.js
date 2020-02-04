import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {HospitalSetupMiddleware, SpecializationSetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {TryCatchHandler} from "@frontend-appointment/helpers";
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hostpitalSetupApiConstants;
const {ACTIVE_DROPDOWN_SPECIALIZATION} = AdminModuleAPIConstants.specializationSetupAPIConstants;

const DoctorDutyRosterHOC = (ComposedComponent, props, type) => {
    class DoctorDutyRoster extends PureComponent {
        state = {
            showExistingRosterModal: false,
            hospital: null,
            specialization: null,
            doctor: null,
            rosterGapDuration: '',
            status: 'Y',
            fromDate: '',
            toDate: '',
            doctorWeekDaysDutyRosterRequestDTOS: {
                dayOffStatus: '',
                endTime: '',
                startTime: '',
                weekDaysId: ''
            },
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

        handleShowExistingRoster = () => {
            this.setState(prevState => ({
                showExistingRosterModal: !prevState.showExistingRosterModal
            }))
        };

        handleInputChange = (event, fieldValid) => {
            event && this.bindValuesToState(event, fieldValid);
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

            // this.checkFormValidity();
        };

        initialApiCalls = async () => {
            await this.fetchHospitalsForDropdown();
            await this.fetchSpecializationForDropdown();
        };

        render() {
            const {showExistingRosterModal, hospital, specialization, doctor, rosterGapDuration} = this.state;

            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            const {activeSpecializationList, dropdownErrorMessage} = this.props.SpecializationDropdownReducer;
            return <>
                <ComposedComponent
                    {...props}
                    doctorInfoData={
                        {
                            hospital: hospital,
                            specialization: specialization,
                            doctor: doctor,
                            rosterGapDuration: rosterGapDuration,
                        }
                    }
                    hospitalList={hospitalsForDropdown}
                    specializationList={activeSpecializationList}
                    specializationDropdownError={dropdownErrorMessage}
                    showExistingRosterModal={showExistingRosterModal}
                    handleShowExistingRoster={this.handleShowExistingRoster}
                    handleInputChange={this.handleInputChange}
                />
            </>;
        }
    }

    return ConnectHoc(DoctorDutyRoster,
        [
            'HospitalDropdownReducer',
            'SpecializationDropdownReducer'
        ],
        {
            fetchActiveHospitalsForDropdown,
            fetchSpecializationForDropdown

        })
};

export default DoctorDutyRosterHOC;
