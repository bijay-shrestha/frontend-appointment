import React, {memo} from 'react';
import PatientDetailsSearchFilter from './PatientSearchFilter';
import PatientDataTable from './PatientDataTable';
import PatientHoc from './PatientHoc';

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
