import React from 'react'
import {Dropdown} from 'react-bootstrap'
// import {CButton} from '@frontend-appointment/ui-elements'
// import * as Material from 'react-icons/md'
import { MdMoreHoriz} from 'react-icons/md'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils
const DoctorApproveTableAction = props => {
  const saveActionInSession = (e, actionId, actionName) => {
    props.onClick(e, props.node.data.id || props.node.data, actionName)
    sessionStorage.setItem('actionType', actionId)
  }
  return (
    <>
      {/* <CButton
     name=""
     variant="success"
              onClickHandler={e => props.onClick(e, props.node.data.id||props.node.data, 'E')}
            >
              <i className="fa fa-sign-in"></i>&nbsp;Check-in {' '}
              </CButton> */}
      <Dropdown className="table-action">
        <Dropdown.Toggle variant="default" id="dropdown-basic">
          < MdMoreHoriz />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {checkIfRoleExists(props.filteredAction, 20) && (
            <Dropdown.Item onClick={e => saveActionInSession(e, 20, 'E')}>
              <i className="fa fa-sign-in"></i>&nbsp; Check-In{' '}
            </Dropdown.Item>
          )}
          {checkIfRoleExists(props.filteredAction, 21) && (
            <Dropdown.Item onClick={e => saveActionInSession(e, 21, 'P')}>
              <i className="fa fa-exchange"></i>&nbsp; Transfer{' '}
            </Dropdown.Item>
          )}
    
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default DoctorApproveTableAction
