import React, {memo} from 'react'
import {
  CForm,
  CButton,
  CHybridPassword
} from '@frontend-appointment/ui-elements'
import {Col, Row, Container, Image, Form} from 'react-bootstrap'
import logo from './images/400x400.png'
const CChangePasswordInForget = ({
  passwordChangeData,
  onChangeHandler,
  onSubmitFormHandler,
  isValid,
  errorMessage,
  status
}) => {
  return (
    <>
      <div className="header-login forgot-password">
        <div className="inner-header flex">
          <Container className="container-login">
            <Row>
              <Col md={{span: 6, offset: 3}} className="login-right">
                <div className="login-wrapper">
                  <div className="login-header">
                  <p className="login-page-title">Reset New Password</p>
                    {/* // <Image src={logo} className="logo-image" /> */}
                  </div>
                  <CForm id="save-password" className="login-form">
                 
                    <CHybridPassword
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={onChangeHandler}
                      value={passwordChangeData.password}
                    />
                    <CHybridPassword
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={onChangeHandler}
                      value={passwordChangeData.confirmPassword}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      className="err-message"
                    >
                      {errorMessage || ''}
                    </Form.Control.Feedback>

                    <CButton
                      variant="primary"
                      className="btn-action float-right"
                      type="button"
                      disabled={
                        !isValid || (status && status.toLowerCase() === 'pending'
                          ? true
                          : false)
                      }
                      onClickHandler={onSubmitFormHandler}
                      name={
                        status && status.toLowerCase() === 'pending'
                          ? 'Changing Password...'
                          : 'Change Password'
                      }
                    />
                  </CForm>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <div className="content-login flex">
        <p>Powered by Cogent Health (P) Ltd</p>
      </div>
    </>
  )
}

export default memo(CChangePasswordInForget)
