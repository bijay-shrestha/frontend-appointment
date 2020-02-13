import React, {memo} from 'react'

const PatientStatistics = () => {
  return (
    <>
      <h5 className="title">Patient Statistics</h5>
      <div className="overall-box">
        <p>1,00,000</p>
        <div className="title">Overall Registered Patients</div>
      </div>
    </>
  )
}
export default memo(PatientStatistics);
