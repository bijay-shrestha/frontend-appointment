import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const PatientWithAgeAndGender = props => {
  return (
    <>
     <ul className="patient-column">
       <li>
       {props.node.data.patientName.toUpperCase()} 
      </li>
       <li>
       ({props.node.data.patientAge}/{props.node.data.patientGender.split('')[0].toUpperCase()})
       </li>
     </ul>
       
       
   
    </>
  )
}

export default memo(PatientWithAgeAndGender)
