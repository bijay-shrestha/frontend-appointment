import React, {memo} from 'react';
import DefaultPic from './picture.png';
const DoctorWithSpecializationAndImage = props => {
  return (
    <>
    
      {props.node.data.doctorAvatar ? (
        <div className="data-image">
          <img alt="PIC" src={props.node.data.doctorAvatar} />{' '}
        </div>
      ) : (
        <div className="data-image">
          <img alt="PIC" src={DefaultPic} />
        </div>
      )}
        
          Dr.{' '}
          {props.node.data.doctorName||''}
          ({props.node.data.specializationName||''})
        
      
    </>
  )
}

export default memo(DoctorWithSpecializationAndImage)
