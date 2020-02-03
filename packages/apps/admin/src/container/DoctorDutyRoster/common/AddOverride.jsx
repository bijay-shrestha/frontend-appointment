import React from 'react';
import {CButton, CCheckbox, CHybridTextArea, CModal} from "@frontend-appointment/ui-elements";
import {Container, Form, Row} from "react-bootstrap";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";

const AddOverrideModal = ({
                              isModifyOverride,
                              showAddOverrideModal,
                              setShowAddOverrideModal,
                              overrideData,
                              handleOverrideFormInputChange,
                              onEnterKeyPress,
                              addOverride
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
                            onChange={(date) => handleOverrideFormInputChange(date, "fromDate")}
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
                            onChange={(date) => handleOverrideFormInputChange(date, "toDate")}
                        />
                    </div>

                    <div className="d-flex">
                        <div className="time-picker">
                            <CEnglishDatePicker
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
                            />
                        </div>
                        <div className="time-picker">
                            <CEnglishDatePicker
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
                            />
                        </div>
                    </div>
                    <CCheckbox
                        id="day-off-status-override"
                        label="Days Off"
                        name="dayOffStatus"
                        className="select-all check-all"
                        checked={overrideData.dayOffStatus === 'Y'}
                        onChange={(e) => handleOverrideFormInputChange(e, '')}
                    />
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
                </Form>
            </Row>
        </Container>
    </>;

    const footer = <>
        <Container fluid="true">
            <Row>
                {/*<div className="col-md-6">*/}
                {/*    {errorMessage ?*/}
                {/*        <p className="modal-error"><i class="fa fa-exclamation-triangle"></i> &nbsp;  {errorMessage}*/}
                {/*        </p> : ''}*/}
                {/*</div>*/}
                {
                    isModifyOverride ?
                        <div className="col-md-6">
                            <CButton
                                id="submit-update-button"
                                disabled={!overrideData.remarks}
                                name="Modify"
                                size="lg"
                                className="btn-action  float-right"
                                onClickHandler={() => addOverride(false, true)}/>
                        </div> :
                        <div className="col-md-6">
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
                size="xl"
                bodyChildren={body}
                onHide={setShowAddOverrideModal}
                dialogClassName="preview-modal"
                footerChildren={footer}
        />
    </>;
};

export default AddOverrideModal;
