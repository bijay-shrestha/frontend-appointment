import React from 'react';
import {Col} from "react-bootstrap";
import {
    CButton,
    CCheckbox,
    CFControl,
    CFeedback,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridTextArea, CLoading,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {Row} from "reactstrap";
import * as DefaultProfileImage from '../Add/picture.png';
import {CImageUploadAndCropModal} from "@frontend-appointment/ui-components";

const AdminEditForm = ({
                           adminInfoObj,
                           onEnterKeyPress,
                           onInputChange,
                           onMacIdChange,
                           onAddMoreMacId,
                           onRemoveMacId,
                           hospitalList,
                           departmentList,
                           profileList,
                           errorMessageForAdminName,
                           errorMessageForAdminMobileNumber,
                           onImageUpload,
                           adminImage,
                           adminCroppedImage,
                           onImageSelect,
                           onImageCrop,
                           showImageUploadModal,
                           setImageShowModal,
                           viewProfileDetails,
                           isAdminEditLoading
                       }) => {
    const images = [{
        src: adminInfoObj.adminAvatarUrlNew ? adminInfoObj.adminAvatarUrlNew
            : (adminInfoObj.adminAvatarUrl ? adminInfoObj.adminAvatarUrl : DefaultProfileImage),
        width: 4,
        height: 3,
        alt: 'ADMIN'
    }];
    return (
        isAdminEditLoading ?
            <CLoading/> :
            <>
                <h5 className="title">Admin Setup</h5>
                <CForm
                    id="admin-info"
                    className="mt-2 add-info">
                    <Row>
                        <Col sm={12} md={12} lg={3} className="order-lg-last order-md-first">

                            <div className="image-upload-container">
                                <div className="image-box">
                                    <img alt="ADMIN IMAGE"
                                         src={adminInfoObj.adminAvatarUrlNew ? adminInfoObj.adminAvatarUrlNew
                                             : (adminInfoObj.adminAvatarUrl ? adminInfoObj.adminAvatarUrl : DefaultProfileImage)}
                                    />
                                    <CButton id="uploadAdminImage"
                                             name="Upload"
                                             size="lg"
                                             className="upload-button my-1"
                                             onClickHandler={setImageShowModal}/>
                                    <CImageUploadAndCropModal
                                        showModal={showImageUploadModal}
                                        ruleOfThirds={true}
                                        setShowModal={setImageShowModal}
                                        handleImageUpload={(data) => onImageUpload(data)}
                                        imageSrc={adminImage}
                                        croppedImageSrc={adminCroppedImage}
                                        circularCrop={true}
                                        onImageSelect={(e) => onImageSelect(e)}
                                        onImageCrop={data => onImageCrop(data)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={9}>
                            <Row>
                                <Col sm={12} md={12} lg={6}>
                                    <CHybridSelect
                                        id="hospital"
                                        label="Hospital"
                                        name="hospital"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                        options={hospitalList}
                                        value={adminInfoObj.hospital}
                                        placeholder="Select hospital."
                                    />
                                </Col>
                                <Col sm={12} md={12} lg={6}></Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridSelect
                                        id="admin-department"
                                        label="Department"
                                        name="department"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                        options={departmentList}
                                        value={adminInfoObj.department}
                                        isDisabled={!adminInfoObj.hospital}
                                        placeholder={adminInfoObj.hospital ? "Select department." : "Select hospital first."}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                <div className="profile-list">
                                    <CHybridSelect
                                        id="admin-profile"
                                        label="Profile"
                                        name="profile"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                        options={profileList}
                                        value={adminInfoObj.profile}
                                        isDisabled={!adminInfoObj.department}
                                        placeholder={adminInfoObj.hospital ? "Select department." : "Select hospital first."}
                                    />
                                    
                                    {adminInfoObj.profile &&
                                 
                                    <CButton
                                        id={"profile-details".concat(adminInfoObj.profile.value)}
                                        variant=""
                                        name=""
                                        className="profile-info"
                                        onClickHandler={() => viewProfileDetails(adminInfoObj.profile.value)}>
                                        <i className="fa fa-info-circle"/>
                                    </CButton>
                                    }
                                    </div>
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="admin-name"
                                        name="fullName"
                                        type="text"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event, validity) => onInputChange(event, validity)}
                                        placeholder="Name"
                                        value={adminInfoObj.fullName}
                                        required={true}
                                        hasValidation={true}
                                        fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                        errorMessagePassed={errorMessageForAdminName}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="admin-username"
                                        name="username"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event, validity) => onInputChange(event, validity)}
                                        placeholder="Username"
                                        value={adminInfoObj.username}
                                        disabled={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="admin-email"
                                        name="email"
                                        type='email'
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event, validity) => onInputChange(event, validity)}
                                        placeholder="Email"
                                        value={adminInfoObj.email}
                                        required={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="admin-mobileNumber"
                                        name="mobileNumber"
                                        type="number"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event, validity) => onInputChange(event, validity)}
                                        placeholder="Mobile Number"
                                        value={adminInfoObj.mobileNumber}
                                        required={true}
                                        hasValidation={true}
                                        fieldValuePattern={/^\d{10}$/}
                                        errorMessagePassed={errorMessageForAdminMobileNumber}
                                    />
                                </Col>

                              

                                <Col sm={12} md={12} lg={6}>
                                    <CFLabel labelName="Gender" id="gender"/>
                                    <div>
                                    <CRadioButton
                                        checked={adminInfoObj.genderCode === "F"}
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                        id="female"
                                        label="Female"
                                        type="radio"
                                        name="genderCode"
                                        value="F"
                                    />
                                    <CRadioButton
                                        checked={adminInfoObj.genderCode === "M"}
                                        id="male"
                                        label="Male"
                                        type="radio"
                                        name="genderCode"
                                        value="M"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                    />

                                    <CRadioButton
                                        checked={adminInfoObj.genderCode === "O"}
                                        id="other"
                                        label="Other"
                                        type="radio"
                                        name="genderCode"
                                        value="O"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                    </div>
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CFLabel labelName="Status" id="status"/>
                                    <CRadioButton
                                        checked={adminInfoObj.status === "Y"}
                                        id="radio1"
                                        label="Active"
                                        type="radio"
                                        name="status"
                                        value="Y"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                    <CRadioButton
                                        checked={adminInfoObj.status === "N"}
                                        id="radio2"
                                        label="Inactive"
                                        type="radio"
                                        name="status"
                                        value="N"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                </Col>

                              
                               
                                <Col sm={12} md={12} lg={6} className="mt-4">
                                    <Row>
                                        <Col lg={12} className="px-4">
                                            <Row>
                                                <Col>
                                                    <CCheckbox id="hasMacBinding"
                                                               label="Device Filter"
                                                               name="hasMacBinding"
                                                               className=""
                                                               checked={adminInfoObj.hasMacBinding}
                                                               onChange={(event) => onInputChange(event)}
                                                               onKeyDown={(event) => onEnterKeyPress(event)}
                                                    />
                                                </Col>
                                                {
                                                    adminInfoObj.hasMacBinding &&
                                                    <Col>
                                                        <CButton
                                                            id="macBinding"
                                                            name=""
                                                            size="lg"
                                                            variant="outline-secondary"
                                                            className="float-right mb-2"
                                                            onClickHandler={onAddMoreMacId}>
                                                            <i className="fa fa-plus"/> Add
                                                        </CButton>
                                                    </Col>

                                                }

                                                <Col lg={12}>
                                                    {adminInfoObj.hasMacBinding ?
                                                        <>
                                                            {adminInfoObj.macIdList && adminInfoObj.macIdList.map(
                                                                (macId, index) => (
                                                                    <>
                                                                        <div className="mac-box mb-2">
                                                                            <CFControl
                                                                                id="macId"
                                                                                key={"macId" + index}
                                                                                value={macId.macId}
                                                                                placeholder="Enter MAC Address"
                                                                                isInvalid={Boolean(macId.errorMessage)}
                                                                                onChange={(event) => onMacIdChange(event, index)}/>
                                                                            {macId.errorMessage &&
                                                                            <CFeedback
                                                                                id={macId.id}
                                                                                key={"msg" + macId.id}
                                                                                type="invalid"
                                                                                message={macId.errorMessage}/>}
                                                                            {adminInfoObj.macIdList.length > 1 &&
                                                                            <CButton
                                                                                id="macBinding"
                                                                                key={"macRemove" + index}
                                                                                name=""
                                                                                variant="outline-danger"
                                                                                className="float-right remove-mac "
                                                                                onClickHandler={() => onRemoveMacId(macId, index)}>
                                                                                <i className="fa fa-close"/>
                                                                            </CButton>
                                                                            }
                                                                        </div>
                                                                    </>
                                                                ))}

                                                        </> : ''
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            
                                

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridTextArea
                                    className="mt-4"
                                        id="remarks"
                                        name="remarks"
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event, validity) => onInputChange(event, validity)}
                                        placeholder="Remarks"
                                        value={adminInfoObj.remarks}
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
};

export default AdminEditForm;
