import React from 'react';
import {Col, Row} from "react-bootstrap";
import {
    CButton,
    CCheckbox,
    CFControl,
    CFeedback,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CRadioButton
} from "@cogent/ui-elements";
import * as DefaultProfileImage from './picture.png';
import {CImageUploadAndCropModal} from "@cogent/ui-components";

const AdminInfoForm = ({
                           adminInfoObj,
                           onEnterKeyPress,
                           onInputChange,
                           onMacIdChange,
                           onAddMoreMacId,
                           onRemoveMacId,
                           onModuleChange,
                           onProfileChange,
                           adminCategoryList,
                           hospitalList,
                           moduleList,
                           errorMessageForAdminName,
                           errorMessageForAdminMobileNumber,
                           onImageUpload,
                           showModal,
                           setShowModal,
                           adminImage,
                           adminCroppedImage,
                           onImageSelect,
                           onImageCrop,
                           viewProfileDetails
                       }) => {
    return (
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
                                     src={adminInfoObj.adminAvatarUrl ? adminInfoObj.adminAvatarUrl : DefaultProfileImage}/>
                                <CButton id="uploadAdminImage"
                                         name="Upload"
                                         size="lg"
                                         variant="primary"
                                         className=" mt-1 mb-4  upload-button"
                                         onClickHandler={setShowModal}/>
                                <CImageUploadAndCropModal
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    ruleOfThirds={true}
                                    handleImageUpload={onImageUpload}
                                    imageSrc={adminImage}
                                    croppedImageSrc={adminCroppedImage}
                                    onImageSelect={onImageSelect}
                                    onImageCrop={data => onImageCrop(data)}/>

                            </div>
                        </div>
                    </Col>

                    <Col md={12} lg={9} className="">
                        <Row className="p-0">
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

                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="admin-name"
                                    name="fullName"
                                    type="text"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Admin Name"
                                    value={adminInfoObj.fullName}
                                    required={true}
                                    hasValidation={true}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    errorMessagePassed={errorMessageForAdminName}
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
                                    id="admin-username"
                                    name="username"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Username"
                                    value={adminInfoObj.username}
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
                                <CHybridSelect
                                    id="adminCategory"
                                    label="Admin Category"
                                    name="adminCategory"
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event) => onInputChange(event)}
                                    options={adminCategoryList}
                                    value={adminInfoObj.adminCategory}
                                    placeholder="Select admin category."
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CFLabel labelName="Status" id="status"></CFLabel>
                                <CRadioButton
                                    checked={adminInfoObj.status === "Y"}
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    disabled={true}
                                    onChange={(event) => onInputChange(event)}
                                    readOnly={true}
                                />
                                <CRadioButton
                                    checked={adminInfoObj.status === "N"}
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onChange={(event) => onInputChange(event)}
                                    className="sr-only"
                                    disabled={true}
                                    readOnly={true}
                                />

                            </Col>

                            {/* mac binding inputs */}
                            <Col sm={12} md={12} lg={12} className="py-4">
                                <Row>
                                    <Col lg={12}>
                                        <Row>
                                            <Col>
                                            {/* <label>Device Filter</label> */}
                                                <CCheckbox id="hasMacBinding"
                                                           label="Device Filter"
                                                           name="hasMacBinding"
                                                           className="module"
                                                           checked={adminInfoObj.hasMacBinding}
                                                           onChange={(event) => onInputChange(event)}
                                                           onKeyDown={(event) => onEnterKeyPress(event)}
                                                />
                                            </Col>
                                            {adminInfoObj.hasMacBinding ?
                                                <Col>
                                                    <CButton
                                                        id="macBinding"
                                                        name=""
                                                        size="sm"
                                                        variant="outline-secondary"
                                                        className="float-right mb-2"
                                                        onClickHandler={onAddMoreMacId}>
                                                        <i className="fa fa-plus"></i>&nbsp;Add
                                                    </CButton>
                                                </Col> : ''
                                            }
                                        </Row>
                                    </Col>


                                    <Col lg={{span: 6, offset: 6}}>
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

                            {/* Select modules    */}
                            <Col sm={12} md={12} lg={12}>
                                <CFLabel labelName="Modules" id="modules" className=""/>
                                {moduleList.map((module, index) => (
                                    <Row key={module.id}>
                                        <Col>
                                            <CCheckbox id={"modules" + module.id}
                                                       label={module.name}
                                                       name={module.name}
                                                       className="module"
                                                       checked={module.isChecked}
                                                       onChange={() => onModuleChange(module.subDepartmentId, index)}
                                                       onKeyDown={(event) => onEnterKeyPress(event)}
                                            />
                                        </Col>
                                        {/*{*/}
                                        {/*    module.isChecked && module.profileList &&*/}
                                        <Col>
                                            <div className="module-profile">
                                                <CHybridSelect
                                                    id={"profiles" + module.id}
                                                    label={"Profiles"}
                                                    name={module.name + "Profiles"}
                                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                                    onChange={(event) => onProfileChange(event, index)}
                                                    options={module.profileList}
                                                    value={module.profileSelected}
                                                    isDisabled={!module.isChecked}
                                                    placeholder={module.isChecked ? "Select Profile." : "Select module."}
                                                />
                                                {module.profileSelected ?
                                                    <CButton
                                                        id={"profile-details".concat(module.profileSelected.value)}
                                                        variant=""
                                                        name=""
                                                        className="profile-info"
                                                        onClickHandler={() => viewProfileDetails(module.profileSelected.value)}>
                                                        <i className="fa fa-info-circle"/>
                                                    </CButton>
                                                    : ''}
                                            </div>
                                        </Col>
                                        {/*}*/}
                                    </Row>
                                ))}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CForm>
        </>
    );
};

export default AdminInfoForm;
