import React from 'react';
import AppointmentApprovalSearchFilter from './AppointmentApprovalSearchFilter';
import AppointmentApprovalDataTable from './AppointmentApprovalDataTable';
import AppointmentApprovalHoc from './AppointmentApprovalHoc';

const AppointmentApprovalLog = props => {
  const AppoinmentApproval = AppointmentApprovalHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <AppointmentApprovalSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <AppointmentApprovalDataTable
            tableHandler={tableHandler}
            paginationProps={paginationProps}
            filteredActions={props.filteredAction}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AppoinmentApproval/>
}

export default AppointmentApprovalLog
