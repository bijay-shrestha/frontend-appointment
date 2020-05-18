import React  from 'react'
import {Dropdown} from 'react-bootstrap'
// import {CButton} from '@frontend-appointment/ui-elements'
// import * as Material from 'react-icons/md'
import * as Feather from 'react-icons/fi'
//import {ActionFilterUtils} from '@frontend-appointment/helpers'

// const {checkIfRoleExists} = ActionFilterUtils
const ApproveTableAction = props => {
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
          
            {/* // checkIfRoleExists(this.props.filteredAction, 3) && */}
            <Dropdown.Item onClick={e => saveActionInSession(e, 14, 'E')}>
              <i className="fa fa-sign-in"></i>&nbsp; Check-In{' '}
            </Dropdown.Item>
            <Dropdown.Item onClick={e => saveActionInSession(e, 17, 'P')}>
              <i className="fa fa-exchange"></i>&nbsp; Transfer{' '}
            </Dropdown.Item>
              {/* <Dropdown.Item onClick={e => saveActionInSession(e, 17, 'P')}>
               <i className="fa fa-sign-in"></i>&nbsp; Transfer{' '}
             </Dropdown.Item> */}
          
          {/* {
            // checkIfRoleExists(this.props.filteredAction, 5) &&
            <Dropdown.Item
              onClick={e => props.onClick(e, props.node.data.id||props.node.data, 'D')}
            >
              <Material.MdBlock /> Reject
            </Dropdown.Item>
          } */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default ApproveTableAction
