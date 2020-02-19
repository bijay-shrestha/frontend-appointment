import React, {PureComponent} from 'react'
import {Dropdown} from 'react-bootstrap'
import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils
const ApproveTableAction = props => {
  return (
    <>
      <Dropdown className="table-action">
        <Dropdown.Toggle variant="default" id="dropdown-basic">
          <Feather.FiMoreHorizontal />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            // checkIfRoleExists(this.props.filteredAction, 3) &&
            <Dropdown.Item
              onClick={e => this.props.onClick(e, this.props.node.data.id, 'E')}
            >
              <Material.MdVerifiedUser />  Approve{' '}
            </Dropdown.Item>
          }
          {
            // checkIfRoleExists(this.props.filteredAction, 5) &&
            <Dropdown.Item
              onClick={e => this.props.onClick(e, this.props.node.data.id, 'D')}
            >
              <Material.MdBlock /> Reject
            </Dropdown.Item>
          }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default ApproveTableAction;
