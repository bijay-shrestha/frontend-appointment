import React, {memo} from 'react'
import RequestBodySearchFilter from './RequestBodySearchFilter'
import RequestBodyDetailsModal from './RequestBodyDetailsTable'
import RequestBodyEditModal from './RequestBodyEditModal'
import RequestBodyApiIntegrationHoc from '../RequestBodyApiIntegrationHOC'

const RequestBodyManage = props => {
    console.log("Props Specialization Manage", props);
    const RBManage = RequestBodyApiIntegrationHoc(
        ({
            commonHandler,
            editHandler,
            tableHandler,
            searchHandler
         }) => (
            <>
                <div className="">
                    <RequestBodySearchFilter
                      {...commonHandler}
                      {...searchHandler}
                    />
                </div>
                <div className=" mb-2">
                    <RequestBodyDetailsModal
                        filteredActions={props.filteredAction}
                        {...commonHandler}
                        {...tableHandler}
                    />
                </div>
                {editHandler.showEditModal && (
                    <RequestBodyEditModal
                        {...commonHandler}
                        {...tableHandler}
                    />
                )}
             
            </>
        ),
        props, "M"
    )
    return <RBManage/>
}

export default memo(RequestBodyManage)
