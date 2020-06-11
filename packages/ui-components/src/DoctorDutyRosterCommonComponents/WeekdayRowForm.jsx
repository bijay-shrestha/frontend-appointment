import React from 'react';
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {CButton, CCheckbox, CHybridSelect, CHybridTimePicker} from "@frontend-appointment/ui-elements";

const WeekdayRowForm = ({
                            weekDayRowFormProps
                        }) => {
    const {
        selectedShift,
        handleWeekdaysFormChange,
        handleAddBreak,
        breakTypeList,
        handleRemoveBreak,
        handleBreakFormChange,
        handleCloneSetting
    } = weekDayRowFormProps;

    const {
        weekdaysDetail,
        rosterGapDuration
    } = selectedShift;
    console.log("Roster Duration", rosterGapDuration);
    return <>
        {
            weekdaysDetail &&
            weekdaysDetail.map((weekdayData, weekdayIndex) =>
                <Card
                    key={"weekday" + weekdayData.weekDaysId}>
                    <Card.Header>
                        <div key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                            <Row className="main-content"
                                 key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                                <Col>{weekdayData.weekDaysName}</Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"startTime".concat(weekdayData.weekDaysId)}
                                            name={"startTime"}
                                            label=""
                                            dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            onChange={(event) => handleWeekdaysFormChange(event, selectedShift, weekdayIndex)}
                                            isDisabled={selectedShift.wholeWeekOff === 'Y' || weekdayData.dayOffStatus === 'Y'}
                                            value={weekdayData.startTime}
                                            isClearable={true}

                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"endTime".concat(weekdayData.weekDaysId)}
                                            name={"endTime"}
                                            label=""
                                            dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            onChange={(event) => handleWeekdaysFormChange(event, selectedShift, weekdayIndex)}
                                            isDisabled={selectedShift.wholeWeekOff === 'Y' || weekdayData.dayOffStatus === 'Y'}
                                            value={weekdayData.endTime}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <CCheckbox
                                        id={"weekdayOffStatus".concat(weekdayData.weekDaysId)}
                                        label="&nbsp;"
                                        name="dayOffStatus"
                                        className=" "
                                        checked={weekdayData.dayOffStatus === 'Y'}
                                        onChange={(event) => handleWeekdaysFormChange(event, selectedShift, weekdayIndex)}
                                    />

                                </Col>
                                <Col>
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey={weekdayData.weekDaysId}
                                        className={weekdayData.breakDetail.length ? '' : "inactive"}>
                                        <i className="fa fa-chevron-down"/>
                                    </Accordion.Toggle>
                                </Col>
                            </Row>
                            <div>
                                {weekdayData.errorMessage ?
                                    <p className="time-error">
                                        {weekdayData.errorMessage}</p> : ''}
                            </div>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={weekdayData.weekDaysId}>
                        <Card.Body>
                            {weekdayData.breakDetail.length ?
                                <>
                                    {weekdayData.breakDetail.map((breakDetail, breakIndex) => (
                                        <div key={weekdayData.breakDetail.id}>
                                            <Row className="main-content"
                                                 key={breakDetail.id}>
                                                <Col>
                                                    <CHybridSelect
                                                        id={"break-type".concat(weekdayData.weekDaysId).concat(breakDetail.id)}
                                                        options={breakTypeList}
                                                        label="Break Type"
                                                        name="breakType"
                                                        placeholder={breakTypeList.length ?
                                                            'Select Break type.' : "No Break type(s) available."}
                                                        value={breakDetail.breakType}
                                                        isDisabled={!breakTypeList.length}
                                                        onChange={(event) => handleBreakFormChange(event, selectedShift,
                                                            weekdayIndex,
                                                            breakIndex)}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className="time-picker">
                                                        <CHybridTimePicker
                                                            id={"startTime".concat(weekdayData.weekDaysId).concat(breakDetail.id)}
                                                            name={"startTime"}
                                                            label=""
                                                            dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                                                            onChange={(event) => handleBreakFormChange(event, selectedShift,
                                                                weekdayIndex,
                                                                breakIndex)}
                                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                                            placeholder="00:00"
                                                            value={breakDetail.startTime}
                                                            isClearable={true}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="time-picker">
                                                        <CHybridTimePicker
                                                            id={"endTime".concat(weekdayData.weekDaysId).concat(breakDetail.id)}
                                                            name={"endTime"}
                                                            label=""
                                                            dateTimeFormat={"YYYY-MM-DD HH:mm:ss"}
                                                            onChange={(event) => handleBreakFormChange(event, selectedShift,
                                                                weekdayIndex,
                                                                breakIndex)}
                                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                                            placeholder="00:00"
                                                            value={breakDetail.endTime}
                                                            isClearable={true}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <CButton
                                                            id={"remove break"}
                                                            name=""
                                                            variant="outline-danger"
                                                            className="float-right remove-mac "
                                                            onClickHandler={() => handleRemoveBreak(selectedShift, weekdayIndex, breakIndex)}
                                                        >
                                                            <i className="fa fa-close"/>
                                                        </CButton>
                                                        {breakIndex === 0 ?
                                                            <CButton
                                                                id="addBreak"
                                                                name=""
                                                                variant="outline-secondary"
                                                                className="float-right remove-mac"
                                                                onClickHandler={() => handleAddBreak(selectedShift, weekdayIndex)}
                                                            >
                                                                <i className="fa fa-plus"/>
                                                            </CButton>
                                                            : ''
                                                        }
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <div>
                                                {breakDetail.errorMessage ?
                                                    <p className="time-error">
                                                        {breakDetail.errorMessage}</p> : ''}
                                            </div>
                                        </div>
                                    ))
                                    }
                                </>
                                :
                                <div key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                                    <Row className="main-content"
                                         key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                                        <Col>
                                            <CButton
                                                variant="outline-secondary"
                                                className="float-right "
                                                id="add-break"
                                                name="Add Break"
                                                onClickHandler={() => handleAddBreak(selectedShift, weekdayIndex)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            }
                            <CButton
                                id={"clone-setting".concat(weekdayData.weekDaysId)}
                                name={" Clone the Setting across all Weekdays."}
                                className={"outline-primary"}
                                onClickHandler={() => handleCloneSetting(selectedShift, weekdayIndex)}
                            >
                                <i className={"fa fa-copy"}/>
                            </CButton>
                            {/*<CCheckbox*/}
                            {/*    id={"clone-setting".concat(weekdayData.weekDaysId)}*/}
                            {/*    label={"Clone the Setting across all Weekdays."}*/}
                            {/*    checked={weekdayData.isSettingCloned}*/}
                            {/*    onChange={(event) => handleCloneSetting(event, selectedShift, weekdayIndex)}*/}
                            {/*/>*/}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )

        }


    </>
};

export default WeekdayRowForm;
