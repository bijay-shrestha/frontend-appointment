import React, {memo} from 'react';
import PatientDetailsSearchFilter from './ClientPatientSearchFilter';
import PatientDataTable from './ClientPatientDataTable';
import PatientHoc from './ClientPatientHoc';

const PatientInformationLog = props => {
  const PatientDetails= PatientHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <PatientDetailsSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <PatientDataTable
            tableHandler={tableHandler}
            paginationProps={paginationProps}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <PatientDetails/>
}

export default memo(PatientInformationLog)
