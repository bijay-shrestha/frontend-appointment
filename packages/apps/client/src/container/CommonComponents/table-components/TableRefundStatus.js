import React, {PureComponent} from 'react'
import {Dropdown} from 'react-bootstrap'
import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils
const RefundTableAction = props => {
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
              <Material.MdEdit /> Refund{' '}
            </Dropdown.Item>
          }
          {
            // checkIfRoleExists(this.props.filteredAction, 5) &&
            <Dropdown.Item
              onClick={e => this.props.onClick(e, this.props.node.data.id, 'D')}
            >
              <Material.MdDeleteForever /> Reject
            </Dropdown.Item>
          }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default RefundTableAction
