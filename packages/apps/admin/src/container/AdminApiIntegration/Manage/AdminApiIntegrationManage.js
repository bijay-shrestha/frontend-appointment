import React, {memo} from 'react'
import AdminApiIntegrationSearchFilter from './AdminApiIntegrationSearchFilter'
import AdminApiIntegrationDetailsTable from './AdminApiIntegrationDetailsTable'
import AdminApiIntegrationForm from './AdminApiIntegrationEditModal'
import AdminApiIntegrationHoc from '../AdminApiIntegrationHoc'

const AdminIntegrationApiManage = props => {
    const IntegrationApiManage = AdminApiIntegrationHoc(
        ({commonHandler, searchHandler, tableHandler, editHandler}) => (
            <>
                <div className="">
                    <AdminApiIntegrationSearchFilter
                        {...searchHandler}
                        {...commonHandler}
                    />
                </div>
                <div className=" mb-2">
                    <AdminApiIntegrationDetailsTable
                        filteredActions={props.filteredAction}
                        {...commonHandler}
                        {...tableHandler}
                    />
                </div>
                {editHandler.showEditModal && (
                    <AdminApiIntegrationForm {...commonHandler} {...editHandler} />
                )}
            </>
        ),
        props,
        'M'
    )
    return <IntegrationApiManage/>
}

export default memo(AdminIntegrationApiManage)
