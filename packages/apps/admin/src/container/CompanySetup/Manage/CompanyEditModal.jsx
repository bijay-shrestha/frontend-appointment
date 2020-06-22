import React, {memo} from 'react'
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CModal,
    CRadioButton,
    CHybridTextArea,
    CFControl
} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'
import {CImageUploadAndCropModal} from '@frontend-appointment/ui-components'
import DefaulCompanyImage from '../img/default-logo.png'

const CompanyEditModal = ({
                              showModal,
                              setShowModal,
                              onEnterKeyPress,
                              onInputChange,
                              companyData,
                              errorMessageForCompanyName,
                              //errorMessageForCompanyCode,
                              errorMessage,
                              editApiCall,
                              formValid,
                              addContactNumber,
                              removeContactNumber,
                              editContactNumber,
                              companyImage,
                              companyImageCroppedUrl,
                              showImageUploadModal,
                              onImageSelect,
                              handleCropImage,
                              handleImageUpload,
                              setImageShow,
                              contactLength
                              //    hospitalBannerImage,
                              //    onBannerImageSelect,
                              //    hospitalBannerImageCroppedUrl,
                              //    showBannerUploadModal,
                              //    handleCropBannerImage,
                              //    handleBannerImageUpload,
                              //    setShowBannerUploadModal
                          }) => {
    const bodyContent = (
        <>
            {/* <h5 className="title">Edit Hospital Setup</h5> */}
            <CForm id="admin-info" className="mt-2 add-info">
                <Row>
                    <Col sm={12} md={12} lg={3} className="order-lg-last order-md-first">
                        <div className="image-upload-container">
                            <div className="image-box">
                                <img
                                    alt="COMPANY"
                                    src={
                                        companyData.companyLogoUrlNew ? companyData.companyLogoUrlNew :
                                            (companyData.companyLogoUrl
                                                ? companyData.companyLogoUrl
                                                : DefaulCompanyImage)
                                    }
                                />
                                <CButton
                                    id="uploadAdminImage"
                                    name=""
                                    size="lg"
                                    className="upload-button my-1"
                                    onClickHandler={setImageShow}
                                ><i className="fa fa-upload"></i>&nbsp;Upload
                                </CButton>
                                <CImageUploadAndCropModal
                                    showModal={showImageUploadModal}
                                    ruleOfThirds={true}
                                    setShowModal={setImageShow}
                                    handleImageUpload={data => handleImageUpload(data)}
                                    imageSrc={companyImage}
                                    croppedImageSrc={companyImageCroppedUrl}
                                    onImageSelect={e => onImageSelect(e)}
                                    onImageCrop={data => handleCropImage(data)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={9}>
                        <Row>
                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="hospital-name"
                                    name="name"
                                    type="text"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Company Name"
                                    value={companyData.name}
                                    required={true}
                                    hasValidation={true}
                                    max={100}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    errorMessagePassed={errorMessageForCompanyName}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="company-code"
                                    name="companyCode"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Company Code"
                                    value={companyData.companyCode}
                                />
                            </Col>
                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="company-alias"
                                    name="alias"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    readOnly={true}
                                    disabled={true}
                                    placeholder="Company Alias"
                                    value={companyData.alias}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="hospital-panNumber"
                                    name="panNumber"
                                    type="text"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Pan Number"
                                    value={companyData.panNumber}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    hasValidation={true}
                                    max={9}
                                    errorMessagePassed={
                                        'Pan number should only be alphanumber and of 9 max characters'
                                    }
                                    required={true}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CHybridTextArea
                                    id="address"
                                    name="address"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Company Address"
                                    value={companyData.address}
                                    max={200}
                                    required={true}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CFLabel labelName="Status" id="status"></CFLabel>
                                <CRadioButton
                                    checked={companyData.status === 'Y'}
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    onChange={event => onInputChange(event, '', 'E')}
                                />
                                <CRadioButton
                                    checked={companyData.status === 'N'}
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onChange={event => onInputChange(event, '', 'E')}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6} className="">
                                <Row>
                                    <Col>
                                        <CFLabel id="contact-label" labelName="Contact Number"/>
                                        {companyData.contactNumberUpdateRequestDTOS.length !==
                                        contactLength && (
                                            <CButton
                                                id="macBinding"
                                                name=""
                                                size="lg"
                                                variant="outline-secondary"
                                                className="float-right mb-2"
                                                onClickHandler={event =>
                                                    addContactNumber(
                                                        'contactNumberUpdateRequestDTOS',
                                                        {
                                                            companyContactNumberId: null,
                                                            contactNumber: '',
                                                            status: 'Y'
                                                        },
                                                        'E'
                                                    )
                                                }
                                            >
                                                <i className="fa fa-plus"></i> Add
                                            </CButton>
                                        )}
                                    </Col>

                                    <Col lg={12}>
                                        <>
                                            {companyData.contactNumberUpdateRequestDTOS.map(
                                                (phone, index) => (
                                                    <>
                                                        <div className="contact-box mb-2">
                                                            <CFControl
                                                                id="companyContactNumber"
                                                                key={'phone' + index}
                                                                value={phone.contactNumber}
                                                                placeholder="Enter Contact Number"
                                                                // isInvalid={Boolean(macId.errorMessage)}
                                                                onChange={event =>
                                                                    editContactNumber(
                                                                        'contactNumberUpdateRequestDTOS',
                                                                        {
                                                                            companyContactNumberId: phone.id,
                                                                            contactNumber: event.target.value,
                                                                            status: 'Y'
                                                                        },
                                                                        index,
                                                                        'E'
                                                                    )
                                                                }
                                                            />
                                                            <CButton
                                                                id="company-contact"
                                                                key={'companyRemove' + index}
                                                                name=""
                                                                variant="outline-danger"
                                                                className="float-right remove-contact "
                                                                onClickHandler={e =>
                                                                    removeContactNumber(
                                                                        'contactNumberUpdateRequestDTOS',
                                                                        index,
                                                                        'E'
                                                                    )
                                                                }
                                                            >
                                                                <i className="fa fa-close"></i>
                                                            </CButton>
                                                        </div>
                                                    </>
                                                )
                                            )}
                                        </>
                                    </Col>
                                </Row>
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CHybridTextArea
                                    id="remarks"
                                    name="remarks"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Remarks"
                                    value={companyData.remarks}
                                    max={200}
                                    required={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CForm>
        </>
    )
    let footerChildren = (
        <>
            <Container fluid>
                <Row>
                    <div className="col-md-6">
                        {errorMessage ? (
                            <p className="modal-error">
                                <i class="fa fa-exclamation-triangle"/> &nbsp; {errorMessage}
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="col-md-6">
                        <CButton
                            id="submit-update-button"
                            disabled={!formValid}
                            name="Update"
                            variant="primary"
                            size="lg"
                            className="btn-action  float-right"
                            onClickHandler={editApiCall}
                        />
                        <CButton
                            id="cancel-update-profile"
                            variant="light"
                            size="lg"
                            className="btn-action  float-right mr-2"
                            name="Cancel"
                            onClickHandler={setShowModal}
                        />
                    </div>
                </Row>
            </Container>
        </>
    )
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Company Details"
                size="xl"
                bodyChildren={bodyContent}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={footerChildren}
                closeButton={true}
            />
        </>
    )
}

export default memo(CompanyEditModal)
