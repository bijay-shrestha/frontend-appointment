import React from 'react';
import {CButton, CForm, CHybridInput, CModal} from "@cogent/ui-elements";
import {Container, Row} from "react-bootstrap";
import {CPasswordSaveForm} from "@cogent/ui-components";

const PasswordResetModal = ({
                                showPasswordResetModal,
                                setShowModal,
                                resetPassword,
                                errorMessage,
                                passwordResetData
                            }) => {

    let bodyContent = <>
        <Row>
            <CForm
                id="save-password"
                className="">
                <CHybridInput
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={passwordResetData.username}
                    disabled={true}
                />
                <CPasswordSaveForm
                    onSubmitHandler={(userPasswordObject) => resetPassword(userPasswordObject)}
                    showRemarksField={true}/>
            </CForm>
        </Row>
    </>;

    let footerChildren = <>
        <Container fluid="true">
            <Row>
                <div className="col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i className="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                {/*<div className="col-md-6">*/}
                {/*    /!*<CButton*!/*/}
                {/*    /!*    id="submit-update-button"*!/*/}
                {/*    /!*    // disabled={!adminUpdateData.formValid}*!/*/}
                {/*    /!*    name="Update"*!/*/}
                {/*    /!*    size="lg"*!/*/}
                {/*    /!*    className="btn-action  float-right"*!/*/}
                {/*    /!*    onClickHandler={resetPassword}/>*!/*/}
                {/*    <CButton id="cancel-update-profile"*/}
                {/*             variant="light"*/}
                {/*             size="lg"*/}
                {/*             className="btn-action  float-right mr-2"*/}
                {/*             name="Cancel"*/}
                {/*             onClickHandler={setShowModal}*/}
                {/*    />*/}
                {/*</div>*/}
            </Row>
        </Container>
    </>;
    return (
        <>
            <CModal show={showPasswordResetModal}
                    modalHeading="Reset Password"
                    size="xl"
                    bodyChildren={bodyContent}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    footerChildren={footerChildren}
                    closeButton={true}
            />
        </>
    );
};

export default PasswordResetModal;
