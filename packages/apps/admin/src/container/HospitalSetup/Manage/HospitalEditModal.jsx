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
import DefaulHospitalImage from '../Add/picture.png'

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
  setImageShow
}) => {
  const bodyContent = (
    <>
      <h5 className="title">Edit Hospital Setup</h5>
      <CForm id="admin-info" className="mt-2 add-info">
        <Row>
          <Col sm={12} md={12} lg={3} className="order-lg-last order-md-first">
            <div className="image-upload-container">
              <div className="image-box">
                <img
                  alt="HOSPITAL IMAGE"
                  src={
                    hospitalData.fileUri
                      ? hospitalData.fileUri
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
                  placeholder="Hospital Name"
                  value={hospitalData.name}
                  required={true}
                  hasValidation={true}
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
                  placeholder="Hospital Code"
                  value={hospitalData.hospitalCode}
                  required={true}
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
                  value={hospitalData.panNumber}
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
                  placeholder="Hospital Address"
                  value={hospitalData.address}
                  max={200}
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

              <Col sm={12} md={12} lg={6}>
                <CFLabel labelName="Status" id="status"></CFLabel>
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

              <Col sm={12} md={12} lg={12} className="py-4">
                <Row>
                  <Col lg={12} className="px-4">
                    <Row>
                      <Col>
                        <CButton
                          id="macBinding"
                          name=""
                          size="lg"
                          variant="success"
                          className="float-right mb-2"
                          onClickHandler={(event) =>
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
                          <i className="fa fa-plus"></i>
                        </CButton>
                      </Col>

                      <Col lg={{span: 6, offset: 6}}>
                        <>
                          {hospitalData.contactNumberUpdateRequestDTOS.map(
                            (phone, index) => (
                              <>
                                <div className="mac-box mb-2">
                                  <CFControl
                                    id="hospitalContactNumber"
                                    key={'phone' + index}
                                    value={phone.contactNumber}
                                    placeholder="Enter Contact Number"
                                    // isInvalid={Boolean(macId.errorMessage)}
                                    onChange={event =>
                                      editContactNumber(
                                        'contactNumberUpdateRequestDTOS',
                                        {
                                          hospitalContactNumberId: phone.id,
                                          contactNumber: event.target.value,
                                          status: phone.status
                                        },
                                        index
                                      )
                                    }
                                  />
                                  {/* {macId.errorMessage && (
                                    <CFeedback
                                      id={macId.id}
                                      key={'msg' + macId.id}
                                      type="invalid"
                                      message={macId.errorMessage}
                                    />
                                  )} */}
                                  {hospitalData.contactNumberUpdateRequestDTOS
                                    .length >= 1 && (
                                    <CButton
                                      id="hospital-contact"
                                      key={'hospRemove' + index}
                                      name=""
                                      variant="danger"
                                      className="float-right remove-mac "
                                      onClickHandler={e =>
                                        removeContactNumber('contactNumberUpdateRequestDTOS', index,'E')
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
            </Row>
          </Col>
        </Row>
      </CForm>
    </>
  )
  let footerChildren = (
    <>
      <Container fluid="true">
        <Row>
          <div className="col-md-6">
            {errorMessage ? (
              <p className="modal-error">
                <i class="fa fa-exclamation-triangle" /> &nbsp; {errorMessage}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="col-md-6">
            <CButton
              id="submit-update-button"
              disabled={!formValid}
              name="Update Hospital"
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
        modalHeading="Hospital Details"
        size="lg"
        bodyChildren={bodyContent}
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-roles-modal"
        footerChildren={footerChildren}
        closeButton={true}
      />
    </>
  )
}

export default memo(HospitalEditModal)
