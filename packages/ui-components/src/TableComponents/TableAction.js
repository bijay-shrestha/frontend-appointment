import React, {PureComponent} from 'react'
import {Dropdown} from 'react-bootstrap'
// import {MdDeleteForever} from 'react-icons/md'
// import {MdContentCopy} from 'react-icons/md'
// import {MdRefresh} from 'react-icons/md'
// import {MdEdit} from 'react-icons/md'
// import {FiMoreHorizontal} from 'react-icons/fi'
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
                    <span class="material-icons">
    more_horiz
    </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.checkRoleExistAndSaveAction(3) ? (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 3)}>
                               <span class="material-icons">
                                edit
                                </span> Edit{' '}
                            </Dropdown.Item>
                        ) : (
                            ''
                        )}
                        {this.checkRoleExistAndSaveAction(5) ? (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 5)}>
                               <span class="material-icons">
                                delete_forever
                                </span> Delete
                            </Dropdown.Item>
                        ) : (
                            ''
                        )}
                        {this.checkRoleExistAndSaveAction(8) ? (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 8)}>
                                <span class="material-icons">
                                content_copy
                                </span>
                                &nbsp; Clone and Add New
                            </Dropdown.Item>
                        ) : (
                            ''
                        )}
                        {this.checkRoleExistAndSaveAction(7) && (
                            <Dropdown.Item onClick={e => this.saveActionInSession(e, 7)}>
                                <span class="material-icons">
                                refresh
                                </span>Reset Password
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    }
}

export default TableAction
