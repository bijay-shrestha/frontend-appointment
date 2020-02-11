import React, {memo} from 'react'
import AppointmentApprovalSearchFilter from './AppointmentApprovalSearchFilter'
import AppointmentApprovalDataTable from './AppointmentApproval'
import AppointmentApprovalHoc from './AppointmentApprovalHoc'

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
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AppoinmentApproval/>
}

export default memo(AppointmentApprovalLog)
