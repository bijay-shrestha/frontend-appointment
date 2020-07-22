import React, {PureComponent} from 'react'
import {Dropdown} from 'react-bootstrap'
import {MdDeleteForever} from 'react-icons/md'
import {MdContentCopy} from 'react-icons/md'
import {MdRefresh} from 'react-icons/md'
import {MdEdit} from 'react-icons/md'
import {MdMoreHoriz} from 'react-icons/md'
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
        this.props.onClick(
            e,
            this.props.node.data.id,
            actionName,
            this.props.node.data
        )
        sessionStorage.setItem('actionType', actionId)
    }

    render() {
        return (
            <>
                <Dropdown className="table-action">
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <MdMoreHoriz/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.checkRoleExistAndSaveAction(3) ? (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 3)}>
                              <MdEdit/> Edit{' '}
                            </Dropdown.Item>
                        ) : (
                            ''
                        )}
                        {this.checkRoleExistAndSaveAction(5) ? (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 5)}>
                                <MdDeleteForever/>Delete
                            </Dropdown.Item>
                        ) : (
                            ''
                        )}
                        {this.checkRoleExistAndSaveAction(8) ? (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 8)}>
                                        <MdContentCopy/>
                                 Clone and Add New
                            </Dropdown.Item>
                        ) : (
                            ''
                        )}
                        {this.checkRoleExistAndSaveAction(7) && (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 7)}>
                              <MdRefresh/> Reset Password
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    }
}

export default TableAction
