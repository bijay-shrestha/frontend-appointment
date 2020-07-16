import React from 'react'
import {Dropdown} from 'react-bootstrap'
import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
//import {ActionFilterUtils} from '@frontend-appointment/helpers'

//const {checkIfRoleExists} = ActionFilterUtils
const RefundTableAmbigousAction = props => {
  const saveActionInSession = (e, actionId, actionName) => {
  props.onClick(e, props.node.data.id || props.node.data, actionName)
  sessionStorage.setItem('actionType', actionId) 
 }
  return (
    <>
      <Dropdown className="table-action">
        <Dropdown.Toggle variant="default" id="dropdown-basic">
          <Feather.FiMoreHorizontal />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            // checkIfRoleExists(this.props.filteredAction, 3) &&
            <Dropdown.Item onClick={e => saveActionInSession(e, 37, 'E')}>
              <Material.MdVerifiedUser /> Check{' '}
            </Dropdown.Item>
          }
        
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default RefundTableAmbigousAction
