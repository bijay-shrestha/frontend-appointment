import React from 'react'
import {Dropdown} from 'react-bootstrap'
// import {FiMoreHorizontal} from 'react-icons/fi'

const ApproveTableAction = props => {
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

                    {/* // checkIfRoleExists(this.props.filteredAction, 3) && */}
                    <Dropdown.Item onClick={e => saveActionInSession(e, 14, 'E')}>
                        <i className="fa fa-sign-in"></i>&nbsp; Check-In{' '}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={e => saveActionInSession(e, 17, 'P')}>
                        <i className="fa fa-exchange"></i>&nbsp; Transfer{' '}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ApproveTableAction
