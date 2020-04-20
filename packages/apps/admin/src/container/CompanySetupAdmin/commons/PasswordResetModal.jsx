import React from 'react';
import {CForm, CHybridInput, CModal} from "@frontend-appointment/ui-elements";
import {Col, Row} from "react-bootstrap";
import {CPasswordSaveForm} from "@frontend-appointment/ui-components";

const PasswordResetModal = ({
                                showPasswordResetModal,
                                setShowModal,
                                resetPassword,
                                errorMessage,
                                passwordResetData,
                                isPasswordResetPending
                            }) => {

    let bodyContent = <>
        <Row className="reset-password">
            <Col sm="12">
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
                        onSubmitHandler={(userPasswordObject) =>
                            resetPassword(userPasswordObject)}
                        showRemarksField={true}
                        errorMessage={errorMessage}
                        isLoading={isPasswordResetPending}/>

                </CForm>
            </Col>
        </Row>
    </>;

    // let footerChildren = <>
    //     <Container fluid="true">
    //         <Row>
    //             <div className="col-md-12">
    //                 {errorMessage ?
    //                     <p className="modal-error"><i className="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
    //                     </p> : ''}
    //             </div>
    //
    //         </Row>
    //     </Container>
    // </>;
    return (
        <>
            <CModal show={showPasswordResetModal}
                    modalHeading="Reset Password"
                    size="md"
                    bodyChildren={bodyContent}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                // footerChildren={footerChildren}
                    closeButton={true}
            />
        </>
    );
};

export default PasswordResetModal;
