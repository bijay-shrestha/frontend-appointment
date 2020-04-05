import React, {memo} from 'react'
import CompanyAdminSetupSearchFilter from './CompanyAdminSetupSearchFilter'
import CompanyAdminDetailsDataTable from './CompanyAdminDetailsDataTable'
import CompanyAdminEditModal from './CompanyAdminEditModal'
import CompanyAdminSetupHOC from '../CompanyAdminSetupHoc'

function CompanyAdminManage (props) {
  const CompanyAdminManageSetup = CompanyAdminSetupHOC(
    ({
      searchFilter,
      commonInfo,
      tableData,
      deleteInfo,
      previewInfo,
      editInfo
    }) => (
      <>
        <div className="">
          <CompanyAdminSetupSearchFilter {...searchFilter} />
        </div>

        <div className=" mb-2">
          <CompanyAdminDetailsDataTable
            {...props}
            {...commonInfo}
            {...deleteInfo}
            {...tableData}
            {...previewInfo}
            {...editInfo}
          />
        </div>
        {editInfo.showModal && (
          <CompanyAdminEditModal {...commonInfo} {...editInfo} />
        )}
      </>
    ),
    props,
    'E'
  )
  return <CompanyAdminManageSetup />
}

export default memo(CompanyAdminManage)
