import React from 'react'
import {Dropdown} from 'react-bootstrap'
// import {CButton} from '@frontend-appointment/ui-elements'
// import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
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
          <Feather.FiMoreHorizontal />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {checkIfRoleExists(props.filteredAction, 23) && (
            <Dropdown.Item onClick={e => saveActionInSession(e, 23, 'E')}>
              <i className="fa fa-sign-in"></i>&nbsp; Check-In{' '}
            </Dropdown.Item>
          )}
          {checkIfRoleExists(props.filteredAction, 24) && (
            <Dropdown.Item onClick={e => saveActionInSession(e, 24, 'P')}>
              <i className="fa fa-exchange"></i>&nbsp; Transfer{' '}
            </Dropdown.Item>
          )}
          {/* {
            // checkIfRoleExists(this.props.filteredAction, 5) &&
            <Dropdown.Item
              onClick={e => props.onClick(e, props.node.data.id||props.node.data, 'D')}
            >
              <Material.MdBlock /> Reject
            </Dropdown.Item>
          } */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default DoctorApproveTableAction
