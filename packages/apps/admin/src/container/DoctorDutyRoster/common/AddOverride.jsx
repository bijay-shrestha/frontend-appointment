import React from 'react';
import {CCheckbox, CHybridTextArea, CModal} from "@frontend-appointment/ui-elements";
import {Container, Form, Row} from "react-bootstrap";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";

const AddOverrideModal = ({
                              showAddOverrideModal,
                              setShowAddOverrideModal,
                              overrideData,
                              onOverrideFormChange,
                              onEnterKeyPress,
                          }) => {

    const body = <>
        <Container className="p-0" fluid>
            <Row className="mb-2">
                <Form>
                    {/*<Form.Label>Date</Form.Label>*/}
                    <div className="d-flex">
                        <CEnglishDatePicker
                            id="from-date-override"
                            name="fromDate"
                            label="From Date"
                            dateFormat="yyyy-MM-dd"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={overrideData.fromDate}
                            peekNextMonth={true}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            dropdownMode="select"
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date) => onOverrideFormChange(date, "fromDate")}
                        />
                        &nbsp;&nbsp;
                        <CEnglishDatePicker
                            id="to-date-override"
                            name="toDate"
                            label="To Date"
                            dateFormat="yyyy-MM-dd"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={overrideData.toDate}
                            peekNextMonth={true}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            dropdownMode="select"
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date) => onOverrideFormChange(date, "toDate")}
                        />
                    </div>

                    <div className="d-flex">
                        <div className="time-picker">
                            <CEnglishDatePicker
                                id={"startTime-override"}
                                name={"startTime"}
                                label="Start Time"
                                onChange={(val) => onOverrideFormChange(val, 'startTime')}
                                selected={overrideData.startTime}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={15}
                                timeCaption="Start Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                        <div className="time-picker">
                            <CEnglishDatePicker
                                id={"endTime-override"}
                                name={"endTime"}
                                label="End Time"
                                onChange={(val) => onOverrideFormChange(val, 'endTime')}
                                selected={overrideData.endTime}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={15}
                                timeCaption="Start Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                    </div>
                    <CCheckbox
                        id="check-all-menu"
                        label="Days Off"
                        className="select-all check-all"
                        checked={overrideData.dayOffStatus === 'Y'}
                        onChange={(e)=>onOverrideFormChange(e)}
                    />
                    <CHybridTextArea
                        id="remarks"
                        name="remarks"
                        onChange={onOverrideFormChange}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        placeholder="Remarks"
                        value={overrideData.remarks}
                        max={200}
                        required={true}
                    />
                </Form>
            </Row>
        </Container>
    </>;

    const footer = <></>;

    return <>
        <CModal show={showAddOverrideModal}
                modalHeading="Add Override"
                size="xl"
                bodyChildren={body}
                onHide={setShowAddOverrideModal}
                dialogClassName="preview-modal"
                footerChildren={footer}
        />
    </>;
};

export default AddOverrideModal;
