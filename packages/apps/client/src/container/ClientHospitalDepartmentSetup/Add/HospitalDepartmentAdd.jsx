import React from 'react';
import HospitalDepartmentSetupHOC from "../HospitalDepartmentSetupHOC";
import {HospitalDepartmentForm, HospitalDepartmentPreviewModal} from "@frontend-appointment/ui-components";
import {Col, Container, Row} from "react-bootstrap";
import {CButton} from "@frontend-appointment/ui-elements";

const HospitalDepartmentAdd = props => {
    const HospitalDepartmentAdd = HospitalDepartmentSetupHOC(
        ({
             hospitalDepartmentAddData,
             departmentPreviewData
         }) =>
            <>
                <div className="">
                    <Container className="bg-white add-container " fluid>
                        <CButton
                            id="resetDepartmentForm"
                            variant="outline-secondary"
                            size="sm"
                            name=""
                            className="mb-2  float-right"
                            onClickHandler={hospitalDepartmentAddData.resetDepartmentAddForm}
                        >
                            <>
                                <i className="fa fa-refresh"/> &nbsp;Reset
                            </>
                        </CButton>
                        <HospitalDepartmentForm hospitalDepartmentAddData={hospitalDepartmentAddData}/>
                        <Row className="mt-4">
                            <Col sm={12} md={{span: 3, offset: 9}}>
                                <CButton
                                    id="save-profile-add"
                                    variant="primary "
                                    className="float-right btn-action"
                                    disabled={!hospitalDepartmentAddData.formValid || hospitalDepartmentAddData.showConfirmModal}
                                    name={"Save"}
                                    isLoading={hospitalDepartmentAddData.showConfirmModal}
                                    onClickHandler={hospitalDepartmentAddData.handleAddDepartment}
                                />
                            </Col>
                            <HospitalDepartmentPreviewModal
                                departmentPreviewData={{
                                    ...departmentPreviewData,
                                    type: "ADD"
                                }}
                            />
                        </Row>
                    </Container>
                </div>
            </>,
        props, 'ADD');

    return <HospitalDepartmentAdd/>
};

export default HospitalDepartmentAdd;
