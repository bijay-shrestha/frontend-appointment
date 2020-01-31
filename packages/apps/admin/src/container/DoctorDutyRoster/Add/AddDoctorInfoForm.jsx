import React from 'react';
import {Col, Form} from "react-bootstrap";
import {CButton, CHybridInput, CHybridSelect} from "@frontend-appointment/ui-elements";

const AddDoctorInfoForm = ({
                               handleShowExistingRoster,
                               hospitalList,
                               specializationList,
                               doctorInfoData,
                               onInputChange,
                               onEnterKeyPress,
                               specializationDropdownError
                           }) => {
    return <>
        <Col md={12} lg={5} className="info-container">
            <div className="doctor-info bg-white p-4">
                <h5 className="title">Doctor Info</h5>
                <Form>
                    <Form.Label>Date</Form.Label>
                    <div className="d-flex">
                        <CHybridInput placeholder="From"/>
                        &nbsp;&nbsp;
                        <CHybridInput placeholder="To"/>
                    </div>

                    <CHybridSelect
                        id="hospital"
                        label="Hospital"
                        name="hospital"
                        options={hospitalList}
                        placeholder="Select hospital."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        value={doctorInfoData.hospital}
                    />

                    <CHybridSelect
                        id="specialization"
                        label="Specialization"
                        name="specialization"
                        options={specializationList}
                        placeholder={ "Select specialization."}
                        noOptionsMessage={specializationDropdownError}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        value={doctorInfoData.specialization}
                    />

                    <CHybridSelect
                        id="doctor"
                        label="Doctor"
                        name="doctor"
                        placeholder="Select doctor"
                    />

                    <CHybridInput
                        id="duration"
                        label="Duration"
                        type="number"
                        placeholder="Enter Duration In Minutes"
                    />
                </Form>

                <CButton
                    variant="link"
                    size="lg"
                    onClickHandler={handleShowExistingRoster}
                    name="*Existing Availability"/>
            </div>
        </Col>
    </>
};

export default AddDoctorInfoForm;
