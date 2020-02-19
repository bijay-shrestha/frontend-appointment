import React from 'react';
import {CForm, CHybridPassword, CModal} from "@frontend-appointment/ui-elements";
import {Col, Container, Row} from "react-bootstrap";
import {CPasswordSaveForm} from "@frontend-appointment/ui-components";

const CChangePasswordModal = ({
                                  showPasswordChangeModal,
                                  setShowModal,
                                  changePassword,
                                  oldPassword,
                                  oldPasswordError,
                                  errorMessage,
                                  onChangeHandler
                              }) => {

    let bodyContent = <>
        <Row>
            <Col md={12}>
                <CForm
                    id="save-password"
                    className="">
                    <CHybridPassword
                        id="oldPassword"
                        placeholder="Old Password"
                        type="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        isInvalid={Boolean(oldPasswordError)}
                        onChange={onChangeHandler}
                        errorMsg={oldPasswordError}
                        avoidDefaultValidation={true}
                    />
                    <CPasswordSaveForm
                        onSubmitHandler={(userPasswordObject) => changePassword(userPasswordObject)}
                        showRemarksField={true}
                        errorMessage={errorMessage}/>
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
    //         </Row>
    //     </Container>
    // </>;
    return (
        <>
            <CModal show={showPasswordChangeModal}
                    modalHeading="Change Password"
                    size="md"
                    bodyChildren={bodyContent}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal change-password"
                    // footerChildren={footerChildren}
                    closeButton={true}
            />
        </>
    );
};

export default CChangePasswordModal;
