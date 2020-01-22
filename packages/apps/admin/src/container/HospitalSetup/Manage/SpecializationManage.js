import React, {memo} from 'react'
import SpecializationSetupSearchFilter from './SpecializationSetupSearchFilter'
import SpecializationDetailsTable from './SpecializationDetailsTable'
import SubDepartmentEditForm from './SpecializationEditModal'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import SpecializationSetupHoc from '../SpecializationSetupHoc'
const SpecializationManage = props => {
  const SPManage = SpecializationSetupHoc(
    ({
      searchParameters,
      handleSearchFormChange,
      searchSpecialization,
      resetSearch,
      handleEnter,
      showSpecializationModal,
      isSearchLoading,
      specializationList,
      searchErrorMessage,
      deleteModalShow,
      onEditHandler,
      setShowModal,
      onDeleteHandler,
      handlePageChange,
      onSubmitDeleteHandler,
      queryParams,
      totalRecords,
      errorMessageForSpecializationCode,
      errorMessageForSpecializationName,
      alertMessageInfo,
      handleInputChange,
      editSpecialization,
      downloadEXCEL,
      deleteRemarksHandler,
      specializationPreviewErrorMessage,
      deleteErrorMessage,
      specializationEditErrorMessage,
      isPreviewLoading,
      specializationPreviewData,
      onPreviewHandler,
      showEditModal,
      formValid,
      deleteRequestDTO,
      showAlert,
      closeAlert,
      specializationData
    }) => (
      <>
        <div className="">
          <SpecializationSetupSearchFilter
            searchParameters={searchParameters}
            onInputChange={handleSearchFormChange}
            onSearchClick={()=>searchSpecialization(1)}
            resetSearchForm={resetSearch}
            handleEnter={handleEnter}
          />
        </div>
        <div className=" mb-2">
          <SpecializationDetailsTable
            //filteredActions={props.filteredAction}
            showSpecializationModal={showSpecializationModal}
            isSearchLoading={isSearchLoading}
            searchData={specializationList}
            searchErrorMessage={searchErrorMessage}
            setShowModal={setShowModal}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEditHandler}
            isPreviewLoading={isPreviewLoading}
            onPreviewHandler={onPreviewHandler}
            specializationData={specializationPreviewData}
            specializationPreviewErrorMessage={specializationPreviewErrorMessage}
            totalItems={totalRecords}
            maxSize={queryParams.size}
            currentPage={queryParams.page}
            handlePageChange={handlePageChange}
            deleteModalShow={deleteModalShow}
            onSubmitDelete={onSubmitDeleteHandler}
            remarksHandler={deleteRemarksHandler}
            remarks={deleteRequestDTO.remarks}
            deleteErrorMsg={deleteErrorMessage}
            exportExcel={downloadEXCEL}
          
          />
        </div>
        {showEditModal && (
          <SubDepartmentEditForm
            showModal={showEditModal}
            setShowModal={setShowModal}
            onEnterKeyPress={handleEnter}
            specializationData={specializationData}
            onInputChange={handleInputChange}
            editApiCall={editSpecialization}
            formValid={formValid}
            errorMessageForSpecializationCode={
              errorMessageForSpecializationCode
            }
            errorMessageForSpecializationName={
              errorMessageForSpecializationName
            }
            errorMessage={specializationEditErrorMessage}
          />
        )}
        <CAlert
          id="profile-add"
          variant={alertMessageInfo.variant}
          show={showAlert}
          onClose={closeAlert}
          alertType={
            alertMessageInfo.variant === 'success' ? (
              <>
                <i className="fa fa-check-circle" aria-hidden="true">
                  {' '}
                </i>
              </>
            ) : (
              <>
                <i className="fa fa-exclamation-triangle" aria-hidden="true">
                  {' '}
                </i>
              </>
            )
          }
          message={alertMessageInfo.message}
        />
      </>
    ),
    props,"M"
  )
  return <SPManage />
}

// const {
//   isSearchLoading,
//   specializationList,
//   searchErrorMessage
// } = this.props.SpecializationSearchReducer

// const {
//   specializationPreviewData,
//   isPreviewLoading,
//   specializationPreviewErrorMessage
// } = this.props.SpecializationPreviewReducer

// const {
//   specializationEditErrorMessage
// } = this.props.SpecializationEditReducer

// const {deleteErrorMessage} = this.props.Specialization.Reducer

//   }
// }

export default memo(SpecializationManage)
