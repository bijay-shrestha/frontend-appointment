import React, {memo} from 'react'
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CModal,
    CRadioButton,
    CHybridTextArea,
    CFControl, CCheckbox
} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'
import {CImageUploadAndCropModal} from '@frontend-appointment/ui-components'
import DefaulHospitalImage from '../img/default-logo.png'

const HospitalEditModal = ({
                               showModal,
                               setShowModal,
                               onEnterKeyPress,
                               onInputChange,
                               hospitalData,
                               errorMessageForHospitalName,
                               errorMessageForHospitalCode,
                               errorMessage,
                               editApiCall,
                               formValid,
                               addContactNumber,
                               removeContactNumber,
                               editContactNumber,
                               hospitalImage,
                               hospitalImageCroppedUrl,
                               showImageUploadModal,
                               onImageSelect,
                               handleCropImage,
                               handleImageUpload,
                               setImageShow,
                               hospitalBannerImage,
                               onBannerImageSelect,
                               hospitalBannerImageCroppedUrl,
                               showBannerUploadModal,
                               handleCropBannerImage,
                               handleBannerImageUpload,
                               setShowBannerUploadModal,
                               isHospitalEditLoading
                           }) => {
    const bodyContent = (
        <>
            {/* <h5 className="title">Edit Hospital Setup</h5> */}
            <CForm id="admin-info" className="mt-2 add-info">
                <Row>
                    <Col sm={12} md={12} lg={12} className="">
                    <div className="hospital-banner-container">
                    <div className="">
                                <img
                                    alt="CLIENT BANNER"
                                    className="hospital-banner"
                                    src={hospitalData.hospitalBannerUrl ? hospitalData.hospitalBannerUrl : DefaulHospitalImage}
                                />

                        <div className="image-upload-container">
                            <div className="image-box">
                                <img
                                    alt="CLIENT IMAGE"
                                    src={
                                        hospitalData.hospitalLogoUrl
                                            ? hospitalData.hospitalLogoUrl
                                            : DefaulHospitalImage
                                    }
                                />
                                <CButton
                                    id="uploadAdminImage"
                                    name="Upload"
                                    size="lg"
                                    className="upload-button my-1"
                                    onClickHandler={setImageShow}
                                />
                                <CImageUploadAndCropModal
                                    showModal={showImageUploadModal}
                                    ruleOfThirds={true}
                                    setShowModal={setImageShow}
                                    handleImageUpload={data => handleImageUpload(data)}
                                    imageSrc={hospitalImage}
                                    croppedImageSrc={hospitalImageCroppedUrl}
                                    onImageSelect={e => onImageSelect(e)}
                                    onImageCrop={data => handleCropImage(data)}
                                />
                            </div>
                        </div>




                                <CButton
                                    id="uploadBanner"
                                    name="Upload Banner"
                                    size="lg"
                                    variant="primary"
                                    className=" mt-1 mb-4 banner-upload-button"
                                    onClickHandler={setShowBannerUploadModal}
                                />
                                <CImageUploadAndCropModal
                                    id='hospital-baner'
                                    ruleOfThirds={true}
                                    circularCrop={false}
                                    showModal={showBannerUploadModal}
                                    setShowModal={setShowBannerUploadModal}
                                    imageSrc={hospitalBannerImage}
                                    croppedImageSrc={hospitalBannerImageCroppedUrl}
                                    handleImageUpload={handleBannerImageUpload}
                                    onImageSelect={onBannerImageSelect}
                                    onImageCrop={data => handleCropBannerImage(data)}
                                    className="mt-1 mb-4 banner-upload-button"

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
                                    placeholder="Client Name"
                                    value={hospitalData.name}
                                    required={true}
                                    hasValidation={true}
                                    max={100}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    errorMessagePassed={errorMessageForHospitalName}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="hospital-code"
                                    name="hospitalCode"
                                    type="email"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Access Key"
                                    value={hospitalData.hospitalCode}
                                    required={true}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="alias"
                                    name="alias"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity,'E')}
                                    placeholder="Alias"
                                    value={hospitalData.alias}
                                    required={true}
                                    max={10}
                                    min={2}
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
                                    placeholder="Client PAN Number"
                                    value={hospitalData.panNumber}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    hasValidation={true}
                                    max={9}
                                    errorMessagePassed={'Pan number should only be alpha-number and of 9 max characters'}
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
                                    placeholder="Client Address"
                                    value={hospitalData.address}
                                    max={200}
                                    required={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="number-of-admins"
                                    name="numberOfAdmins"
                                    type="number"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Number Of Admins"
                                    value={hospitalData.numberOfAdmins}
                                    required={true}
                                />
                            </Col>


                            <Col sm={12} md={12} lg={6} className="py-4">
                                <Row>
                                    <Col lg={12} className="px-4">
                                        <Row>
                                            <Col>
                                                <CFLabel id='contact-label' labelName="Contact Number"/>
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
                                                                hospitalContactNumberId: null,
                                                                contactNumber: '',
                                                                status: 'Y'
                                                            },
                                                            'E'
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-plus"></i> Add
                                                </CButton>
                                            </Col>

                                            <Col lg={12}>
                                                <>
                                                    {hospitalData.contactNumberUpdateRequestDTOS.map(
                                                        (phone, index) => (
                                                            <>

                                                                <div className="contact-box mb-2">

                                                                    <CFControl
                                                                        id="hospitalContactNumber"
                                                                        key={'phone' + index}
                                                                        value={phone.contactNumber}
                                                                        placeholder="Client Contact Number"
                                                                        // isInvalid={Boolean(macId.errorMessage)}
                                                                        onChange={event =>
                                                                            editContactNumber(
                                                                                'contactNumberUpdateRequestDTOS',
                                                                                {
                                                                                    hospitalContactNumberId: phone.id,
                                                                                    contactNumber: event.target.value,
                                                                                    status: 'Y'
                                                                                },
                                                                                index,
                                                                                'E'
                                                                            )
                                                                        }
                                                                    />
                                                                    {hospitalData.contactNumberUpdateRequestDTOS.length >= 1
                                                                    && (
                                                                        <CButton
                                                                            id="hospital-contact"
                                                                            key={'hospRemove' + index}
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
                                                                    )}
                                                                </div>
                                                            </>
                                                        )
                                                    )}
                                                </>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CFLabel labelName="Status" id="status"/>
                                <CRadioButton
                                    checked={hospitalData.status === 'Y'}
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    onChange={event => onInputChange(event, '', 'E')}
                                />
                                <CRadioButton
                                    checked={hospitalData.status === 'N'}
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onChange={event => onInputChange(event, '', 'E')}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="admin-refund-percentage"
                                    name="refundPercentage"
                                    type="number"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Refund Percentage"
                                    value={hospitalData.refundPercentage}
                                    required={true}
                                />
                            </Col>

                            {/*<Col sm={12} md={6} lg={6}>*/}
                            {/*    <CCheckbox id="cogent-admin"*/}
                            {/*               name="isCompany"*/}
                            {/*               label="F1soft Group of Companies"*/}
                            {/*               className="module"*/}
                            {/*               checked={hospitalData.isCompany === 'Y'}*/}
                            {/*               onChange={(event) => onInputChange(event)}*/}
                            {/*               onKeyDown={(event) => onEnterKeyPress(event)}*/}
                            {/*    />*/}
                            {/*</Col>*/}


                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="number-of-followUps"
                                    name="numberOfFollowUps"
                                    type="number"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Number Of Follow Ups"
                                    value={hospitalData.numberOfFollowUps}
                                    required={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="follow-up-interval-days"
                                    name="followUpIntervalDays"
                                    type="number"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Follow Up Interval Days"
                                    value={hospitalData.followUpIntervalDays}
                                    required={true}
                                />
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
                                    value={hospitalData.remarks}
                                    max={200}
                                    required={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CForm>
        </>
    );
    let footerChildren = (
        <>
            <Container fluid="true">
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
                            disabled={!formValid || isHospitalEditLoading}
                            name={isHospitalEditLoading? "Updating":"Update"}
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
    );
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Client Details"
                size="lg"
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

export default memo(HospitalEditModal)
