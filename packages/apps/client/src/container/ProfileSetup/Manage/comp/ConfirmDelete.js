import React from 'react'
import {Row, Col, FormCheck, Alert} from 'react-bootstrap'
import {CModal, CButton, CHybridTextArea} from '@frontend-appointment/ui-elements'
import UpdateProfile from '../../Add/ProfileAdd'

const ConfirmDelete = props => {
  // let footerChildren = <CButton id="testModule-button" name="Footer Test button"/>;
  let body = (
    <>
      <div>
        <h5> Are you sure you want to delete the Profile?If yes please provide remarks.</h5>
        <CHybridTextArea
          onChange={props.onDeleteRemarksChangeHandler}
          id="remarks"
          name="remarks"
          placeholder="Remarks"
          value={props.remarks}
        />

        <CButton
        variant='outline-danger '
        size='lg'
        className="float-right btn-action ml-2"
        name='Delete'
        onClickHandler={props.onSubmitDelete}
        ></CButton>

         <CButton
        variant='outline-secondary '
        size='lg'
        className="float-right btn-action "
        name='Cancel'
        onClickHandler={props.onSubmitDelete}
        ></CButton>

      </div>
      <div>
        {props.deleteErrorMessage ?  <p className="error-message"><i class="fa fa-exclamation-triangle"></i>&nbsp;{props.deleteErrorMessage}</p>: ''}
      </div>
    </>
  )

  return (
    <>
      <CModal
        show={props.showModal}
        modalHeading="Delete Profile"
        size="lg"
        bodyChildren={body}
        onHide={props.setShowModal}
        dialogClassName="cogent-modal"
      />
    </>
  )
}

export default ConfirmDelete
