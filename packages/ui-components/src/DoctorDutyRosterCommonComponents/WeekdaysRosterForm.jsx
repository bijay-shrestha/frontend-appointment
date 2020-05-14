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

        await this.setState({
            activeShiftKey: active,
            selectedShift: {...shift, wholeWeekOff: 'N'}
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {shiftDetails} = this.props.weekdaysRosterFormData;
        if (prevProps.weekdaysRosterFormData.shiftDetails.length !== shiftDetails.length) {
            this.setState({
                activeShiftKey: '',
                selectedShift: shiftDetails[0],

            })
        }
    }

    componentDidMount() {
        const {shiftDetails} = this.props.weekdaysRosterFormData;
        this.setState({
            activeShiftKey: shiftDetails[0].shiftId,
            selectedShift: shiftDetails[0]
        })
    }

    render() {
        const {activeShiftKey, selectedShift} = this.state;
        const {weekdaysDetail, rosterGapDuration} = selectedShift;
        const {shiftDetails, doctorInformationData} = this.props.weekdaysRosterFormData;
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
                            rosterGapDuration={rosterGapDuration}
                            selectedShift={selectedShift}
                            weekdaysDetail={weekdaysDetail}
                        />
                        {/*********************************************WEEKDAYS END ******************************************************/}
                    </Row>
                </Container>
            </div>
        </>
    }
}

export default WeekdaysRosterForm;
