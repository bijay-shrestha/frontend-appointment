import React, {PureComponent} from 'react';
import {Container, Row} from "react-bootstrap";
import WeekdaysRosterShift from "./WeekdaysRosterShift";
import WeekdaysRosterTimeAvailabilityDetails from "./WeekdaysRosterTimeAvailabilityDetails";
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";

class WeekdaysRosterForm extends PureComponent {

    state = {
        activeShiftKey: '',
        selectedShift: {}
    };

    handleShiftAccordionSelect = async shift => {
        let active = shift.shiftId === Number(this.state.activeShiftKey) ? 0 : shift.shiftId;

        let hasWholeWeekOffParam = Object.keys(shift).includes("wholeWeekOff");
        await this.setState({
            activeShiftKey: active,
            selectedShift: {...shift, wholeWeekOff: hasWholeWeekOffParam ? shift.wholeWeekOff : 'N'}
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {shiftDetails} = this.props.weekdaysRosterFormData;
        let hasWholeWeekOffParam = Object.keys(shiftDetails[0]).includes("wholeWeekOff");
        if (prevProps.weekdaysRosterFormData.shiftDetails.length !== shiftDetails.length) {
            this.setState({
                activeShiftKey: '',
                selectedShift: {
                    ...shiftDetails[0],
                    wholeWeekOff: hasWholeWeekOffParam ? shiftDetails[0].wholeWeekOff : 'N'
                },
            })
        }
        this.checkAndUpdateRosterGapDurationOfSelectedShift(shiftDetails);
    }

    checkAndUpdateRosterGapDurationOfSelectedShift = shiftDetails => {
        const {selectedShift} = this.state;
        let selectedShiftFromProps = shiftDetails.length
            && shiftDetails.find(shift => shift.shiftId === selectedShift.shiftId);
        if (selectedShiftFromProps && selectedShiftFromProps.rosterGapDuration !== selectedShift.rosterGapDuration) {
            this.setState({
                selectedShift: {
                    ...selectedShift,
                    rosterGapDuration: selectedShiftFromProps.rosterGapDuration
                }
            })
        }
    };

    componentDidMount() {
        const {shiftDetails} = this.props.weekdaysRosterFormData;
        this.setState({
            activeShiftKey: shiftDetails[0].shiftId,
            selectedShift: {...shiftDetails[0], wholeWeekOff: 'N'}
        })
    }

    render() {
        const {activeShiftKey, selectedShift} = this.state;
        const {
            shiftDetails,
            doctorInformationData,
            handleWholeWeekOff,
            type
        } = this.props.weekdaysRosterFormData;
        return <>
            <div>
                <Container className="p-0" fluid>
                    <span>
                        <h5 className="title">Weekdays Roster </h5>
                        &nbsp;as of&nbsp;
                        <h5 className="title">
                               {DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(doctorInformationData.fromDate)}
                           </h5>
                        &nbsp; to &nbsp;
                        <h5 className="title">
                            {DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(doctorInformationData.toDate)}
                        </h5>
                    </span>
                    <Row className="mb-2">
                        {/*****************************************DOCTOR SHIFTS START***************************************************/}
                        <WeekdaysRosterShift
                            shiftDetails={shiftDetails}
                            activeShiftKey={activeShiftKey}
                            handleShiftAccordionSelect={this.handleShiftAccordionSelect}/>
                        {/******************************************DOCTOR SHIFTS END ****************************************************/}

                        {/********************************************WEEKDAYS START******************************************************/}
                        <WeekdaysRosterTimeAvailabilityDetails
                            type={type}
                            selectedShift={selectedShift}
                            handleWholeWeekOff={handleWholeWeekOff}
                            weekDayRowFormProps={{
                                selectedShift: selectedShift,
                                ...this.props.weekdaysRosterFormData
                            }}
                        />
                        {/*********************************************WEEKDAYS END ******************************************************/}
                    </Row>
                </Container>
            </div>
        </>
    }
}

export default WeekdaysRosterForm;
