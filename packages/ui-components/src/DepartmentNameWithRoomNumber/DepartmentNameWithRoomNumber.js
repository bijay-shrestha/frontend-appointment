import React, { memo } from 'react'
const DepartmentNameWithRoomNumber = props => {
  return (
    <>
      <ul className="patient-column">
        <li>
          {props.node.data.hospitalDepartmentName||''}
        </li>
        <li>
          Room Number-{props.node.data.roomNumber||''}
        </li>
       
      </ul>
    </>
  )
}
export default memo(DepartmentNameWithRoomNumber)
