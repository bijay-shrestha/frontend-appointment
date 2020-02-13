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
        registeredPatientsData &&
        !registeredPatientsErrorMessage ? (
          <>
            {' '}
            <p>{registeredPatientsData}</p>
            <div className="title">Overall Registered Patients</div>
          </>
        ) : !isRegisteredPatientLoading && registeredPatientsErrorMessage ? (
          <span>
            <p>{registeredPatientsErrorMessage}</p>
          </span>
        ) : (
          <CLoading />
        )}
      </div>
    </>
  )
}
export default memo(PatientStatistics)
