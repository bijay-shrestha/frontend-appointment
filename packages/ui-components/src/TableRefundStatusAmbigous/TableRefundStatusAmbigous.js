import React from 'react'
import {Dropdown} from 'react-bootstrap'
import {MdVerifiedUser} from 'react-icons/md'
import {MdMoreHoriz} from 'react-icons/md'
//import {ActionFilterUtils} from '@frontend-appointment/helpers'

const RefundTableAmbigousAction = props => {
  const saveActionInSession = (e, actionId, actionName) => {
  props.onClick(e, props.node.data.id || props.node.data, actionName)
  sessionStorage.setItem('actionType', actionId) 
 }
  return (
    <>
      <Dropdown className="table-action">
        <Dropdown.Toggle variant="default" id="dropdown-basic">
          <MdMoreHoriz/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            // checkIfRoleExists(this.props.filteredAction, 3) &&
            <Dropdown.Item onClick={e => saveActionInSession(e, 37, 'E')}>
              <MdVerifiedUser /> Re-initiate{' '}
            </Dropdown.Item>
          }
        
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default RefundTableAmbigousAction
