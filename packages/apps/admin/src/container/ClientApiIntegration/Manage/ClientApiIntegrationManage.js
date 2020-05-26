import React, {memo} from 'react'
import ClientApiIntegrationSearchFilter from './ClientApiIntegrationSearchFilter'
import ClientApiIntegrationDetailsTable from './ClientApiIntegrationDetailsTable'
//import SubDepartmentEditForm from './SpecializationEditModal'
import ClientApiIntegrationHoc from '../ClientApiIntegrationHoc'

const HospitalIntegrationApiManage = props => {
  const IntegrationApiManage = ClientApiIntegrationHoc(
    ({commonHandler, searchHandler, tableHandler}) => (
      <>
        <div className="">
          <ClientApiIntegrationSearchFilter
            {...searchHandler}
          />
        </div>
        <div className=" mb-2">
          <ClientApiIntegrationDetailsTable
            filteredActions={props.filteredAction}
            {...commonHandler}
            {...tableHandler}
          />
        </div>
        {/* {showEditModal && (
                    <SubDepartmentEditForm
                        showModal={showEditModal}
                        setShowModal={setShowModal}
                        onEnterKeyPress={handleEnter}
                        specializationData={specializationData}
                        onInputChange={handleInputChange}
                        editApiCall={editSpecialization}
                        formValid={formValid}
                        hospitalList={hospitalList}
                        errorMessageForSpecializationCode={
                            errorMessageForSpecializationCode
                        }
                        errorMessageForSpecializationName={
                            errorMessageForSpecializationName
                        }
                        errorMessage={specializationEditErrorMessage}
                    />
                )} */}
      </>
    ),
    props,
    'M'
  )
  return <IntegrationApiManage />
}

export default memo(HospitalIntegrationApiManage)
