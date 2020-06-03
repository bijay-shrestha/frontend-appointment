import React, {memo} from 'react'
import ClientApiIntegrationSearchFilter from './ClientApiIntegrationSearchFilter'
import ClientApiIntegrationDetailsTable from './ClientApiIntegrationDetailsTable'
import ClientApiIntegrationForm from './ClientApiIntegrationEditModal'
import ClientApiIntegrationHoc from '../ClientApiIntegrationHoc'

const HospitalIntegrationApiManage = props => {
  const IntegrationApiManage = ClientApiIntegrationHoc(
    ({commonHandler, searchHandler, tableHandler,editHandler}) => (
      <>
        <div className="">
          <ClientApiIntegrationSearchFilter
            {...searchHandler}
            {...commonHandler}
          />
        </div>
        <div className=" mb-2">
          <ClientApiIntegrationDetailsTable
            filteredActions={props.filteredAction}
            {...commonHandler}
            {...tableHandler}
          />
        </div>
        {editHandler.showEditModal && (
                    <ClientApiIntegrationForm
                      {...commonHandler}
                      {...editHandler}
                    />
                )}
      </>
    ),
    props,
    'M'
  )
  return <IntegrationApiManage />
}

export default memo(HospitalIntegrationApiManage)
