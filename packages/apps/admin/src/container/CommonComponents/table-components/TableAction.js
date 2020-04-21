import React, {PureComponent} from 'react'
import {Dropdown} from 'react-bootstrap'

import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils

class TableAction extends PureComponent {
  checkRoleExistAndSaveAction = actionId => {
    if (
      checkIfRoleExists(this.props.filteredAction, actionId) ||
      (this.props.byPass && this.props.onlyEdit)
    ) {
      return true
    }
    return false
  }

  saveActionInSession = (e, actionId) => {
   
    const actionName =
      actionId === 3
        ? 'E'
        : actionId === 5
        ? 'D'
        : actionId === 8
        ? 'C'
        : actionId === 7
        ? 'R'
        : ''
    if (actionId !== 7) {
      this.props.onClick(
        e,
        this.props.node.data.id,
        actionName,
        this.props.node.data
      )
    } else {
      this.props.onClick(
        e,
        this.props.node.data.id,
        actionName,
        this.props.node.data.username
      )
    }
    sessionStorage.setItem('actionType', actionId)
  }

  render () {
    return (
      <>
        <Dropdown className="table-action">
          <Dropdown.Toggle variant="default" id="dropdown-basic">
            <Feather.FiMoreHorizontal />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.checkRoleExistAndSaveAction(3) ? (
              <Dropdown.Item onClick={e => this.saveActionInSession(e, 3)}>
                <Material.MdEdit /> Edit{' '}
              </Dropdown.Item>
            ) : (
              ''
            )}
            {this.checkRoleExistAndSaveAction(5) ? (
              <Dropdown.Item onClick={e => this.saveActionInSession(e, 5)}>
                <Material.MdDeleteForever /> Delete
              </Dropdown.Item>
            ) : (
              ''
            )}
            {this.checkRoleExistAndSaveAction(8) ? (
              <Dropdown.Item onClick={e => this.saveActionInSession(e, 8)}>
                <Material.MdContentCopy />
                &nbsp; Clone and Add New
              </Dropdown.Item>
            ) : (
              ''
            )}
            {this.checkRoleExistAndSaveAction(7) && (
              <Dropdown.Item onClick={e => this.saveActionInSession(e, 7)}>
                <Material.MdRefresh /> Reset Password
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </>
    )
  }
}

export default TableAction
