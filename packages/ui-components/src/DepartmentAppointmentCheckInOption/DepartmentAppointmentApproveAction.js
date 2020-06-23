import React from 'react'
import {Dropdown} from 'react-bootstrap'
// import {CButton} from '@frontend-appointment/ui-elements'
// import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils
const DepartmentApproveTableAction = props => {
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
          {checkIfRoleExists(props.filteredAction, 19) && (
            <Dropdown.Item onClick={e => saveActionInSession(e, 19, 'E')}>
              <i className="fa fa-sign-in"></i>&nbsp; Check-In{' '}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default DepartmentApproveTableAction