import React, {PureComponent} from 'react';
import {Accordion, Card, Col, Container, Row} from "react-bootstrap";
import {CButton, CCheckbox, CScrollbar} from "@frontend-appointment/ui-elements";
import WeekdayRowForm from "./WeekdayRowForm";

class WeekdaysRosterForm extends PureComponent {

    state = {
        activeShiftKey: '',
        selectedShift: {}
    };

    handleShiftAccordionSelect = async shift => {
        let active = shift.shiftId === Number(this.state.activeShiftKey) ? 0 : shift.shiftId;

        await this.setState({
            activeShiftKey: active,
            selectedShift: {...shift}
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
        const {weekdaysDetail} = selectedShift;
        const {shiftDetails} = this.props.weekdaysRosterFormData;
        return <>
            <div className=" ">
                <Container className="bg-white add-container " fluid>

                    <Row>
                        <Col sm={12} md={6} lg={3} className="menu-list-wrapper">
                            <h5 className="title">&nbsp;</h5>
                            <div className="assign-menu">
                                <div className="am-header">
                                <span className="am-title">
                                    Shifts
                                </span>
                                </div>
                                <CScrollbar
                                    id="menus"
                                    autoHide={true}
                                    style={{height: 312}}>
                                    {
                                        shiftDetails.length ?
                                            <Accordion
                                                className="menu-accordion"
                                                activeKey={activeShiftKey ? activeShiftKey : shiftDetails[0].shiftId}>
                                                {shiftDetails.map(shift =>
                                                    <Card
                                                        key={"shift" + shift.shiftId}>
                                                        <Accordion.Toggle
                                                            eventKey={shift.shiftId}
                                                            key={shift.shiftId}
                                                            as={Card.Header}
                                                            className={
                                                                (activeShiftKey ? activeShiftKey
                                                                    : shiftDetails[0].shiftId) === shift.shiftId ?
                                                                    'activeParent' : ''
                                                            }
                                                            onClick={() => this.handleShiftAccordionSelect(shift)}>
                                                            <span>{shift.shiftName}</span>
                                                        </Accordion.Toggle>
                                                    </Card>
                                                )}
                                            </Accordion> :
                                            ''
                                    }

                                </CScrollbar>
                            </div>
                        </Col>

                        <Col sm={12} md={6} lg={5} className="roles-wrapper">
                            <div className="assign-previledge">
                                <div className="am-header">
                                    <span className="am-title">
                                        Availability:{selectedShift.shiftName}
                                    </span>
                                </div>

                                <div className="doctor-availability bg-white p-4">
                                    <Row className="header">
                                        <Col> Days</Col>
                                        <Col>
                                            Start Time
                                        </Col>
                                        <Col> End Time</Col>
                                        <Col>
                                            {/*{type === 'ADD' ?*/}
                                            <CCheckbox
                                                id="check-all-menu"
                                                label="Off"
                                                className="select-all check-all"
                                                checked={selectedShift.wholeWeekOff === 'Y'}
                                                // onChange={handleWholeWeekOff}
                                            />
                                            {/*: "Off"*/}
                                            {/*}*/}
                                        </Col>
                                        <Col> Advanced Settings</Col>
                                    </Row>
                                </div>
                                <CScrollbar
                                    id="menus"
                                    autoHide={true}
                                    style={{height: 312}}>
                                    {
                                        selectedShift.weekdaysDetail && selectedShift.weekdaysDetail.length ?
                                            <Accordion className="menu-accordion"
                                                       activeKey={activeShiftKey ? activeShiftKey : weekdaysDetail[0].weekDaysId}
                                            >
                                                {weekdaysDetail.map(weekdayData =>
                                                    <WeekdayRowForm key={weekdayData.weekDaysId}
                                                                    weekdayData={weekdayData}/>
                                                )}
                                            </Accordion> :
                                            <div className="filter-message">
                                                <div className="no-data">
                                                    <i className="fa fa-file-text-o"/>
                                                </div>
                                                <div className="message"> No weekday data available.</div>
                                            </div>
                                    }

                                </CScrollbar>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save"
                                name="Save"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    }
}

export default WeekdaysRosterForm;
