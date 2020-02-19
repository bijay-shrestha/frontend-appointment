import React, {memo} from 'react'
import {CLoading} from '@frontend-appointment/ui-elements'
const PatientStatistics = props => {
  const {
    isRegisteredPatientLoading,
    registeredPatientsData,
    registeredPatientsErrorMessage
  } = props.registeredPatients
  return (
    <>
      <h5 className="title">Patient Statistics</h5>
      <div className="overall-box">
        {!isRegisteredPatientLoading &&
        registeredPatientsData!==null &&
        !registeredPatientsErrorMessage ? (
          <>
            {' '}
            <p>{registeredPatientsData}</p>
            <div className="title">Overall Registered Patients</div>
          </>
        ) : !isRegisteredPatientLoading && !registeredPatientsErrorMessage ? (
          <CLoading />
         
        ) : (
          <span>
            <p>{registeredPatientsErrorMessage}</p>
          </span>
        )}
      </div>
    </>
  )
}
export default memo(PatientStatistics)
