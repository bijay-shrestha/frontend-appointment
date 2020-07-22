import React from 'react'
import { Dropdown } from 'react-bootstrap'

const RefundTableAction = props => {
  const saveActionInSession = (e, actionId, actionName) => {
    props.onClick(e, props.node.data.id || props.node.data, actionName)
    sessionStorage.setItem('actionType', actionId)
  }
  return (
    <>
      <Dropdown className="table-action">
        <Dropdown.Toggle variant="default" id="dropdown-basic">
          <span className="material-icons">
            more_horiz
                    </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            // checkIfRoleExists(this.props.filteredAction, 3) &&
            <Dropdown.Item onClick={e => saveActionInSession(e, 16, 'E')}>
              <span class="material-icons">
                verified_user
</span> Refund{' '}
            </Dropdown.Item>
          }
          {
            // checkIfRoleExists(this.props.filteredAction, 5) &&
            <Dropdown.Item onClick={e => saveActionInSession(e, 15, 'D')}>
              <span class="material-icons">
                block
            </span> Reject
            </Dropdown.Item>
          }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default RefundTableAction
