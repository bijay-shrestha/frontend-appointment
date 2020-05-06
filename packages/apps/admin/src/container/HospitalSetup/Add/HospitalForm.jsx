import React, { memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import {
    CFLabel,
    CForm,
    CHybridInput,
    CRadioButton,
    CHybridTextArea,
    CButton,
    CFControl
} from '@frontend-appointment/ui-elements'
import * as DefaultLogo from '../img/default-logo.png'
import { CImageUploadAndCropModal } from '@frontend-appointment/ui-components'


const HospitalForm = ({
    hospitalInfoObj,
    errorMessageForHospitalName,
    errorMessageForHospitalCode,
    onEnterKeyPress,
    onInputChange,
    addContactNumber,
    removeContactNumber,
    editContactNumber,
    contactLength,
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
    setShowBannerUploadModal
}) => {
    return (
        <>
            <Container-fluid>
                <Row sm="12 p-0">
                    <h5 className="title">Client Info</h5>
                </Row>
                <CForm id="hospital-info" className="mt-2 add-info">
                    <Container-fluid>
                        <Row>
                            <Col lg={12}
                            // className=" order-md-first order-lg-last"
                            >
                                <Row>
                                    <Col sm={12} md={12} lg={12}>

                                        <div className="hospital-banner-container">

                                            <div className="">
                                                {
                                                    hospitalInfoObj.hospitalBannerUrl ?
                                                        <img
                                                            className="hospital-banner"
                                                            alt="CLIENT BANNER"
                                                            src={hospitalInfoObj.hospitalBannerUrl}
                                                        /> : ''
                                                }


                                                <div className="image-upload-container">
                                                    {/* <CFLabel id='logo' labelName="Hospital Logo" /> */}

                                                    <div className="image-box">
                                                        <img
                                                            alt="CLIENT IMAGE"
                                                            src={hospitalInfoObj.hospitalLogo ? hospitalInfoObj.hospitalLogoUrl : DefaultLogo}
                                                        />
                                                        <CButton
                                                            id="uploadAdminImage"
                                                            name=""
                                                            size="lg"
                                                            variant="primary"
                                                            className=" mt-1 mb-4  upload-button"
                                                            onClickHandler={setImageShow}
                                                        > <i className="fa fa-upload"></i>&nbsp;Upload
                                                        </CButton>
                                                        <CImageUploadAndCropModal
                                                            id='hospital-logo'
                                                            showModal={showImageUploadModal}
                                                            setShowModal={setImageShow}
                                                            ruleOfThirds={true}
                                                            handleImageUpload={handleImageUpload}
                                                            imageSrc={hospitalImage}
                                                            croppedImageSrc={hospitalImageCroppedUrl}
                                                            circularCrop={false}
                                                            onImageSelect={onImageSelect}
                                                            onImageCrop={data => handleCropImage(data)}
                                                        />
                                                    </div>
                                                </div>

                                                <CButton
                                                    id="uploadBanner"
                                                    name=""
                                                    size="lg"
                                                    variant="primary"
                                                    className=" mt-1 mb-4 banner-upload-button"
                                                    onClickHandler={setShowBannerUploadModal}
                                                > <i className="fa fa-upload"></i>&nbsp;Upload Banner
                                                </CButton>
                                                <CImageUploadAndCropModal
                                                    id='hospital-banner'
                                                    ruleOfThirds={true}
                                                    circularCrop={false}
                                                    showModal={showBannerUploadModal}
                                                    setShowModal={setShowBannerUploadModal}
                                                    imageSrc={hospitalBannerImage}
                                                    croppedImageSrc={hospitalBannerImageCroppedUrl}
                                                    handleImageUpload={handleBannerImageUpload}
                                                    onImageSelect={onBannerImageSelect}
                                                    onImageCrop={data => handleCropBannerImage(data)}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className=" order-md-first"
                                    >
                                    </Col>
                                </Row>

                            </Col>

                            <Col lg={12}>
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="hospital-name"
                                            name="name"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) => onInputChange(event, validity)}
                                            placeholder="Client Name"
                                            value={hospitalInfoObj.name}
                                            required={true}
                                            hasValidation={true}
                                            max={100}
                                            min={3}
                                            fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                            errorMessagePassed={errorMessageForHospitalName}
                                            errorMsg={hospitalInfoObj.nameLengthErrorMsg}
                                            isInvalid={hospitalInfoObj.nameLengthErrorMsg}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="hospital-code"
                                            name="hospitalCode"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) => onInputChange(event, validity)}
                                            placeholder="Merchant Code"
                                            value={hospitalInfoObj.hospitalCode}
                                            required={true}
                                            errorMessagePassed={errorMessageForHospitalCode}
                                            max={10}
                                            min={2}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="alias"
                                            name="alias"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) => onInputChange(event, validity)}
                                            placeholder="Alias"
                                            value={hospitalInfoObj.alias}
                                            required={true}
                                            max={10}
                                            min={2}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="hospital-panNumber"
                                            name="panNumber"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) => onInputChange(event, validity)}
                                            placeholder="Client PAN Number"
                                            value={hospitalInfoObj.panNumber}
                                            fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                            hasValidation={true}
                                            max={9}
                                            errorMessagePassed={'Pan number should only be alpha-number and of 9 max characters'}
                                            required={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridTextArea
                                            id="hospital-address"
                                            name="address"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) => onInputChange(event, validity)}
                                            placeholder="Client Address"
                                            value={hospitalInfoObj.address}
                                            max={200}
                                            min={1}
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
                                            value={hospitalInfoObj.numberOfAdmins}
                                            required={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6} className="mb-4">
                                        <CFLabel
                                            labelName="Contact Number"
                                            id="contactNumber"
                                        />
                                        {contactLength != hospitalInfoObj.contactNumber.length && (
                                            <CButton
                                                id={'add-contact-numbers'}
                                                variant="outline-secondary"
                                                onClickHandler={() => addContactNumber('contactNumber', '')}
                                                name=""
                                                size="sm"
                                                className="pull-right"
                                            ><i className="fa fa-plus" /> Add
                                            </CButton>
                                        )}
                                        <Row key={'contactForm'}>
                                            {hospitalInfoObj.contactNumber.map((contNumber, idx) => {
                                                return (
                                                    <Col md={12} lg={12} key={"contInputs" + idx}
                                                        className="contact-box my-1">
                                                        <CFControl
                                                            key={'contactInput' + idx}
                                                            id={'contactInput' + idx}
                                                            name="contactNumber"
                                                            onKeyDown={event => onEnterKeyPress(event)}
                                                            onChange={e =>
                                                                editContactNumber(
                                                                    'contactNumber',
                                                                    e.target.value,
                                                                    idx
                                                                )
                                                            }
                                                            placeholder="Client Contact Number"
                                                            value={contNumber}
                                                            required={true}
                                                            max={10}


                                                        // errorMessagePassed={errorMessageForHospitalCode}
                                                        />
                                                        {hospitalInfoObj.contactNumber.length !== 1 ? <CButton
                                                            key={'removecontact' + idx}
                                                            id={'removecontact' + idx}
                                                            variant="outline-danger"
                                                            onClickHandler={() =>
                                                                removeContactNumber('contactNumber', idx)
                                                            }
                                                            name=""
                                                            size="sm"
                                                            className="remove-contact "
                                                        > <i className="fa fa-close" /></CButton> : ''}
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CFLabel labelName="Status" id="status" />
                                        <div>
                                            <CRadioButton
                                                checked={Boolean(hospitalInfoObj.status)}
                                                disabled={true}
                                                id="radio1"
                                                label="Active"
                                                type="radio"
                                                readOnly
                                            />
                                        </div>
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="admin-refund-percentage"
                                            name="refundPercentage"
                                            type="number"
                                            onKeyDown={(event) => onEnterKeyPress(event)}
                                            onChange={(event, validity) => onInputChange(event, validity)}
                                            placeholder="Refund Percentage"
                                            max={3}
                                            value={hospitalInfoObj.refundPercentage}
                                            required={true}
                                        />
                                    </Col>

                                    {/*<Col sm={12} md={6} lg={6}>*/}
                                    {/*    <CCheckbox id="cogent-admin"*/}
                                    {/*        name="isCompany"*/}
                                    {/*        label="F1soft Group of Companies"*/}
                                    {/*        className="module"*/}
                                    {/*        checked={hospitalInfoObj.isCompany === 'Y'}*/}
                                    {/*        onChange={(event) => onInputChange(event)}*/}
                                    {/*        onKeyDown={(event) => onEnterKeyPress(event)}*/}
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
                                            value={hospitalInfoObj.numberOfFollowUps}
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
                                            value={hospitalInfoObj.followUpIntervalDays}
                                            required={true}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
};

export default memo(HospitalForm)
