import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CButton, CCheckbox} from "@frontend-appointment/ui-elements";

const DoctorAvailabilityOverrides = ({}) => {
    return <>
        <Col>
            <div className="doctor-override bg-white mt-2">
                <Row>
                    <Col> <CCheckbox id="check--override"
                                     label="Override"
                                     className="select-all check-all"/>
                    </Col>
                    <Col>
                        <CButton
                            id="add-override"
                            variant='outline-secondary'
                            size='lg'
                            name='Add More'
                            className="pull-right"
                        >
                        </CButton>
                    </Col>
                </Row>
            </div>
        </Col>
    </>
};

export default DoctorAvailabilityOverrides;
