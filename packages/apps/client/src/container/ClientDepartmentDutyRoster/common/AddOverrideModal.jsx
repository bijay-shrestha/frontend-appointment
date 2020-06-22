import React from 'react';
import {
    CButton,
    CCheckbox,
    CHybridTextArea,
    CHybridTimePicker,
    CModal,
    CHybridInput
} from "@frontend-appointment/ui-elements";
import {Form, Row, Col} from "react-bootstrap";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";

const AddOverrideModal = ({
                              isModifyOverride,
                              isUpdateOverrideLoading,
                              showAddOverrideModal,
                              setShowAddOverrideModal,
                              overrideData,
                              handleOverrideFormInputChange,
                              onEnterKeyPress,
                              addOverride,
                              overrideUpdateErrorMessage,
                              departmentInfoData,
                              overrideFormValid,
                              overrideErrorMessage,
                              type
                          }) => {
    const body = <>
        <div className="">
            <Row className="mb-2">
                <Form className="override-form">

                    <Col xs={12}>
                        <CHybridInput
                            id="duty-date"
                            placeholder="Department Duty Date"
                            disabled={true}
                            value={DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(departmentInfoData.fromDate)
                            + " - " + DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(departmentInfoData.toDate)}
                        />
                    </Col>
                    <Col xs={12}>
                        <CHybridInput
                            placeholder="Department"
                            disabled={true}
                            value={departmentInfoData.department ? departmentInfoData.department.label : "NOT SELECTED!"}
                        />
                        {
                            departmentInfoData.isRoomEnabled === 'Y' ?
                                <CHybridInput
                                    placeholder="Room"
                                    disabled={true}
                                    value={departmentInfoData.room ? departmentInfoData.room.label : "NOT SELECTED!"}
                                />
                                : ''
                        }
                    </Col>
                    <Col xs={12}>
                        <CEnglishDatePicker
                            id="from-date-override"
                            name="fromDate"
                            label="Override From Date"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={overrideData.fromDate}
                            peekNextMonth={true}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            dropdownMode="select"
                            invalid={!!overrideData.dateErrorMessage}
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date) => handleOverrideFormInputChange(date, "fromDate")}
                        />

                        <CEnglishDatePicker
                            id="to-date-override"
                            name="toDate"
                            label="Override To Date"
                            // dateFormat="yyyy-MM-dd"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={overrideData.toDate}
                            peekNextMonth={true}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            invalid={!!overrideData.dateErrorMessage}
                            dropdownMode="select"
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date) => handleOverrideFormInputChange(date, "toDate")}
                        />
                        <div>
                            {overrideData.dateErrorMessage ?
                                <p className="date-error">
                                    {overrideData.dateErrorMessage}</p> : ''}
                        </div>
                    </Col>

                    <Col xs={12}>
                        <div className="time-picker">
                            <CHybridTimePicker
                                id={"startTime-override"}
                                name={"startTime"}
                                label="Start Time"
                                onChange={(val) => handleOverrideFormInputChange(val)}
                                placeholder="00:00"
                                isDisabled={overrideData.dayOffStatus === 'Y'}
                                value={overrideData.startTime}
                                isClearable={true}
                                duration={15}
                            />
                        </div>
                        <div className="time-picker">
                            <CHybridTimePicker
                                id={"endTime-override"}
                                name={"endTime"}
                                label="End Time"
                                onChange={(val) => handleOverrideFormInputChange(val)}
                                placeholder="00:00"
                                isDisabled={overrideData.dayOffStatus === 'Y'}
                                value={overrideData.endTime}
                                isClearable={true}
                                duration={15}
                            />
                        </div>
                        <div>
                            {overrideData.timeErrorMessage ?
                                <p className="time-error">
                                    {overrideData.timeErrorMessage}</p> : ''}
                        </div>
                    </Col>
                    <Col xs={12}>
                        <CCheckbox
                            id="day-off-status-override"
                            label="Off"
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
                            placeholder="Remarks"
                            value={overrideData.remarks}
                            max={200}
                            required={true}
                        />
                    </Col>
                </Form>
            </Row>
        </div>
    </>;

    const footer = <>
        <div className="m-0">
            <Row>
                <div className="col-sm-12">
                    {type === "ADD" ?
                        overrideErrorMessage ?
                            <p className="modal-error"><i
                                className="fa fa-exclamation-triangle"/> &nbsp;  {overrideErrorMessage}
                            </p> : ''
                        :
                        overrideUpdateErrorMessage ?
                            <p className="modal-error"><i
                                className="fa fa-exclamation-triangle"/> &nbsp;  {overrideUpdateErrorMessage}
                            </p> : ''
                    }
                </div>
            </Row>
            <Row>
                {
                    isModifyOverride ?
                        <div className="col-md-12">
                            <CButton
                                id="submit-update-button"
                                disabled={!overrideData.remarks || isUpdateOverrideLoading}
                                name="Modify"
                                isLoading={isUpdateOverrideLoading}
                                size="lg"
                                className="btn-action  float-right"
                                onClickHandler={() => addOverride(false, true)}/>
                        </div> :
                        <div className="col-md-12">
                            <CButton
                                id="submit-update-button"
                                disabled={!overrideFormValid || isUpdateOverrideLoading}
                                name="Save And Exit"
                                isLoading={isUpdateOverrideLoading}
                                size="lg"
                                className="btn-action  float-right"
                                onClickHandler={() => addOverride(false, false)}/>
                            <CButton id="submit-update-button"
                                     variant="outline-primary"
                                     disabled={!overrideFormValid || isUpdateOverrideLoading}
                                     isLoading={isUpdateOverrideLoading}
                                     size="lg"
                                     className="btn-action  float-right mr-2"
                                     name="Save and Create Another"
                                     onClickHandler={() => addOverride(true, false)}
                            />

                        </div>
                }
            </Row>
        </div>
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
