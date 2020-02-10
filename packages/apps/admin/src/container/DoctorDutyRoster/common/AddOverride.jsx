import React from 'react';
import {CButton, CCheckbox, CHybridTextArea, CModal} from "@frontend-appointment/ui-elements";
import {Container, Form, Row, Col} from "react-bootstrap";
import {CEnglishDatePicker, CTimePicker} from "@frontend-appointment/ui-components";

const AddOverrideModal = ({
                              isModifyOverride,
                              showAddOverrideModal,
                              setShowAddOverrideModal,
                              overrideData,
                              handleOverrideFormInputChange,
                              onEnterKeyPress,
                              addOverride,
                              overrideUpdateErrorMessage
                          }) => {
    const body = <>
        <Container className="" fluid>
            <Row className="mb-2">
                <Form className="override-form">
                    {/*<Form.Label>Date</Form.Label>*/}
                    <Col xs={12}>
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
                            onChange={(date) => handleOverrideFormInputChange(date, "fromDate")}
                        />

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
                            onChange={(date) => handleOverrideFormInputChange(date, "toDate")}
                        />
                        <div>
                            {overrideData.dateErrorMessage ?
                                <p className="error-message">
                                    {overrideData.dateErrorMessage}</p> : ''}
                        </div>
                    </Col>

                    <Col xs={12}>
                        <div className="time-picker">
                            <CTimePicker
                                id={"startTime-override"}
                                name={"startTime"}
                                label="Start Time"
                                onChange={(val) => handleOverrideFormInputChange(val, 'startTime')}
                                selected={overrideData.startTime}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={15}
                                timeCaption="Start Time"
                                dateFormat="h:mm aa"
                                disabled={overrideData.dayOffStatus === 'Y'}
                                inputType="hybrid"
                            />
                        </div>
                        <div className="time-picker">
                            <CTimePicker
                                id={"endTime-override"}
                                name={"endTime"}
                                label="End Time"
                                onChange={(val) => handleOverrideFormInputChange(val, 'endTime')}
                                selected={overrideData.endTime}
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                timeIntervals={15}
                                timeCaption="End Time"
                                dateFormat="h:mm aa"
                                disabled={overrideData.dayOffStatus === 'Y'}
                                inputType="hybrid"
                            />
                        </div>
                        <div>
                            {overrideData.timeErrorMessage ?
                                <p className="error-message">
                                    {overrideData.timeErrorMessage}</p> : ''}
                        </div>
                    </Col>
                    <Col xs={12}>
                        <CCheckbox
                            id="day-off-status-override"
                            label="Days Off"
                            name="dayOffStatus"
                            className=" check-all"
                            checked={overrideData.dayOffStatus === 'Y'}
                            onChange={(e) => handleOverrideFormInputChange(e, '')}
                        />
                    </Col>
                    <Col xs={12}>
                        <CHybridTextArea
                            id="remarks"
                            name="remarks"
                            onChange={(e) => handleOverrideFormInputChange(e, '')}
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            placeholder="Remarks"
                            value={overrideData.remarks}
                            max={200}
                            required={true}
                        />
                    </Col>
                </Form>
            </Row>
        </Container>
    </>;

    const footer = <>
        <Container fluid="true">
            <Row>
                <div className="col-sm-12">
                    {overrideUpdateErrorMessage ?
                        <p className="modal-error"><i
                            className="fa fa-exclamation-triangle"/> &nbsp;  {overrideUpdateErrorMessage}
                        </p> : ''}
                </div>
            </Row>
            <Row>
                {
                    isModifyOverride ?
                        <div className="col-md-12">
                            <CButton
                                id="submit-update-button"
                                disabled={!overrideData.remarks}
                                name="Modify"
                                size="lg"
                                className="btn-action  float-right"
                                onClickHandler={() => addOverride(false, true)}/>
                        </div> :
                        <div className="col-md-12">
                            <CButton
                                id="submit-update-button"
                                disabled={!overrideData.remarks}
                                name="Add"
                                size="lg"
                                className="btn-action  float-right"
                                onClickHandler={() => addOverride(false, false)}/>
                            <CButton id="submit-update-button"
                                     variant="outline-primary"
                                     disabled={!overrideData.remarks}
                                     size="lg"
                                     className="btn-action  float-right mr-2"
                                     name="Add and Create Another"
                                     onClickHandler={() => addOverride(true, false)}
                            />

                        </div>
                }
            </Row>
        </Container>
    </>;

    return <>
        <CModal show={showAddOverrideModal}
                modalHeading={isModifyOverride ? "Modify Override" : "Add Override"}
                size="md"
                bodyChildren={body}
                onHide={setShowAddOverrideModal}
                dialogClassName="preview-modal"
                footerChildren={footer}
        />
    </>;
};

export default AddOverrideModal;
