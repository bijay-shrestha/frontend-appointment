import React, {memo} from 'react'
const DepartmentNameWithRoomNumberAndBilling = props => {
  return (
    <>
      <ul className="patient-column">
        <li>
          {props.node.data.hospitalDepartmentName||''}
        </li>
        <li>
          {props.node.data.roomNumber||''} ({props.node.data.billingModeName||''})
        </li>
      </ul>
    </>
  )
}
export default memo(DepartmentNameWithRoomNumberAndBilling)
