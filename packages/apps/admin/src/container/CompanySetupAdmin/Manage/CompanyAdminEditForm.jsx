import React from 'react'
import {Col} from 'react-bootstrap'
import {
  CButton,
  CCheckbox,
  CFControl,
  CFeedback,
  CFLabel,
  CForm,
  CHybridInput,
  CHybridSelect,
  CHybridTextArea,
  CLoading,
  CRadioButton
} from '@frontend-appointment/ui-elements'
import {Row} from 'reactstrap'
import * as DefaultProfileImage from '../Add/picture.png'
import {CImageUploadAndCropModal} from '@frontend-appointment/ui-components'

const CompanyAdminEditForm = ({
  adminInfoObj,
  onEnterKeyPress,
  onInputChange,
  onMacIdChange,
  onAddMoreMacId,
  onRemoveMacId,
  companyList,
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
  isAdminEditLoading,
  onChangeDashBoardRole
}) => {
  const images = [
    {
      src: adminInfoObj.adminAvatarUrlNew
        ? adminInfoObj.adminAvatarUrlNew
        : adminInfoObj.adminAvatarUrl
        ? adminInfoObj.adminAvatarUrl
        : DefaultProfileImage,
      width: 4,
      height: 3,
      alt: 'ADMIN'
    }
  ]
  return isAdminEditLoading ? (
    <CLoading />
  ) : (
    <>
      <h5 className="title">Company Admin Setup</h5>
      <CForm id="admin-info" className="mt-2 add-info">
        <Row>
          <Col sm={12} md={12} lg={3} className="order-lg-last order-md-first">
            <div className="image-upload-container">
              <div className="image-box">
                <img
                  alt="ADMIN IMAGE"
                  src={
                    adminInfoObj.adminAvatarUrlNew
                      ? adminInfoObj.adminAvatarUrlNew
                      : adminInfoObj.adminAvatarUrl
                      ? adminInfoObj.adminAvatarUrl
                      : DefaultProfileImage
                  }
                />
                <CButton
                  id="uploadAdminImage"
                  name=""
                  size="lg"
                  className="upload-button my-1"
                  onClickHandler={setImageShowModal}
                > <i className="fa fa-upload"></i>&nbsp;Upload
                </CButton>
                <CImageUploadAndCropModal
                  showModal={showImageUploadModal}
                  ruleOfThirds={true}
                  setShowModal={setImageShowModal}
                  handleImageUpload={data => onImageUpload(data)}
                  imageSrc={adminImage}
                  croppedImageSrc={adminCroppedImage}
                  circularCrop={true}
                  onImageSelect={e => onImageSelect(e)}
                  onImageCrop={data => onImageCrop(data)}
                />
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={9}>
            <Row>
              <Col sm={12} md={12} lg={6}>
                <CHybridSelect
                  id="company"
                  label="Company"
                  name="company"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={event => onInputChange(event)}
                  options={companyList}
                  value={adminInfoObj.company}
                  placeholder="Select Company."
                  isDisabled={true}
                />
              </Col>
              <Col sm={12} md={12} lg={6}></Col>

              <Col sm={12} md={12} lg={6}>
                <div className="profile-list">
                  <CHybridSelect
                    id="admin-profile"
                    label="Profile"
                    name="profile"
                    onKeyDown={event => onEnterKeyPress(event)}
                    onChange={event => onInputChange(event)}
                    options={profileList}
                    value={adminInfoObj.profile}
                    isDisabled={!adminInfoObj.company}
                    placeholder={
                      adminInfoObj.company
                        ? 'Select Company.'
                        : 'Select Profile.'
                    }
                  />

                  {adminInfoObj.profile && (
                    <CButton
                      id={'profile-details'.concat(adminInfoObj.profile.value)}
                      variant=""
                      name=""
                      className="profile-info"
                      onClickHandler={() =>
                        viewProfileDetails(adminInfoObj.profile.value)
                      }
                    >
                      <i className="fa fa-info-circle" />
                    </CButton>
                  )}
                </div>
              </Col>

              <Col sm={12} md={12} lg={6}>
                <CHybridInput
                  id="admin-name"
                  name="fullName"
                  type="text"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={(event, validity) => onInputChange(event, validity)}
                  placeholder="Name"
                  value={adminInfoObj.fullName}
                  required={true}
                  hasValidation={true}
                  fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                  errorMessagePassed={errorMessageForAdminName}
                />
              </Col>

              {/* <Col sm={12} md={12} lg={6}>
                <CHybridInput
                  id="admin-username"
                  name="username"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={(event, validity) => onInputChange(event, validity)}
                  placeholder="Username"
                  value={adminInfoObj.username}
                  disabled={true}
                />
              </Col> */}

              <Col sm={12} md={12} lg={6}>
                <CHybridInput
                  id="admin-email"
                  name="email"
                  type="email"
                  onKeyDown={event => onEnterKeyPress(event)}
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
                  onKeyDown={event => onEnterKeyPress(event)}
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
                <CFLabel labelName="Gender" id="gender" />
                <div>
                  <CRadioButton
                    checked={adminInfoObj.genderCode === 'F'}
                    onKeyDown={event => onEnterKeyPress(event)}
                    onChange={event => onInputChange(event)}
                    id="female"
                    label="Female"
                    type="radio"
                    name="genderCode"
                    value="F"
                  />
                  <CRadioButton
                    checked={adminInfoObj.genderCode === 'M'}
                    id="male"
                    label="Male"
                    type="radio"
                    name="genderCode"
                    value="M"
                    onKeyDown={event => onEnterKeyPress(event)}
                    onChange={event => onInputChange(event)}
                  />

                  <CRadioButton
                    checked={adminInfoObj.genderCode === 'O'}
                    id="other"
                    label="Other"
                    type="radio"
                    name="genderCode"
                    value="O"
                    onKeyDown={event => onEnterKeyPress(event)}
                    onChange={event => onInputChange(event)}
                  />
                </div>
              </Col>

              <Col sm={12} md={12} lg={6}>
                <CFLabel labelName="Status" id="status" />
                <CRadioButton
                  checked={adminInfoObj.status === 'Y'}
                  id="radio1"
                  label="Active"
                  type="radio"
                  name="status"
                  value="Y"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={event => onInputChange(event)}
                />
                <CRadioButton
                  checked={adminInfoObj.status === 'N'}
                  id="radio2"
                  label="Inactive"
                  type="radio"
                  name="status"
                  value="N"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={event => onInputChange(event)}
                />
              </Col>

              <Col sm={12} md={12} lg={6} className="py-4 dash-roles-container">
                {adminInfoObj.adminDashboardRequestDTOS.length ? (
                  <CFLabel labelName="Dashboard Roles" id="dash-role-edit" />
                ) : null}
                {adminInfoObj && adminInfoObj.adminDashboardRequestDTOS.length
                  ? adminInfoObj.adminDashboardRequestDTOS.map(
                      (adminDash, index) => {
                        return (
                          <div>
                            <CCheckbox
                              checked={adminDash.status === 'Y'}
                              id={'checkbox-edit' + adminDash + index}
                              label={adminDash.name}
                              type="radio"
                              name="adminDashboardRequestDTOS"
                              value={adminDash.code}
                              onChange={event =>
                                onChangeDashBoardRole(event, adminDash)
                              }
                              className="module"
                            />
                          </div>
                        )
                      }
                    )
                  : null}
              </Col>

              <Col sm={12} md={12} lg={6} className="mt-4">
                <Row>
                  <Col lg={12} className="px-4">
                    <Row>
                      <Col>
                        {console.log(adminInfoObj.hasMacBinding)}
                        <CCheckbox
                          id="hasMacBinding"
                          label="Device Filter"
                          name="hasMacBinding"
                          className="fw-500"
                          checked={adminInfoObj.hasMacBinding}
                          onChange={event => onInputChange(event)}
                          onKeyDown={event => onEnterKeyPress(event)}
                        />
                      </Col>
                      {adminInfoObj.hasMacBinding && (
                        <Col>
                          <CButton
                            id="macBinding"
                            name=""
                            size="md"
                            variant="outline-secondary"
                            className="float-right mb-2"
                            onClickHandler={onAddMoreMacId}
                          >
                            <i className="fa fa-plus" /> Add
                          </CButton>
                        </Col>
                      )}

                      <Col lg={12}>
                        {adminInfoObj.hasMacBinding ? (
                          <>
                            {adminInfoObj.macIdList &&
                              adminInfoObj.macIdList.map((macId, index) => (
                                <>
                                  <div className="mac-box mb-2">
                                    <CFControl
                                      id="macId"
                                      key={'macId' + index}
                                      value={macId.macId}
                                      placeholder="Enter MAC Address"
                                      isInvalid={Boolean(macId.errorMessage)}
                                      onChange={event =>
                                        onMacIdChange(event, index)
                                      }
                                    />
                                    {macId.errorMessage && (
                                      <CFeedback
                                        id={macId.id}
                                        key={'msg' + macId.id}
                                        type="invalid"
                                        message={macId.errorMessage}
                                      />
                                    )}
                                    {adminInfoObj.macIdList.length > 1 && (
                                      <CButton
                                        id="macBinding"
                                        key={'macRemove' + index}
                                        name=""
                                        variant="outline-danger"
                                        className="float-right remove-mac "
                                        onClickHandler={() =>
                                          onRemoveMacId(macId, index)
                                        }
                                      >
                                        <i className="fa fa-close" />
                                      </CButton>
                                    )}
                                  </div>
                                </>
                              ))}
                          </>
                        ) : (
                          ''
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col sm={12} md={12} lg={6}>
                <CHybridTextArea
                  id="remarks"
                  name="remarks"
                  onKeyDown={event => onEnterKeyPress(event)}
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
  )
}

export default CompanyAdminEditForm
