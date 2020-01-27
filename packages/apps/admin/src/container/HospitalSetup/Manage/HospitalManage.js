import React, {memo} from 'react'
import HospitalSetupSearchFilter from './HospitalSetupSearchFilter'
import SpecializationDetailsTable from './HospitalDetailsTable'
import SubDepartmentEditForm from './SpecializationEditModal'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import HospitalHoc from '../HospitalHoc'
const SpecializationManage = props => {
  const SPManage = HospitalHoc(
    ({
      searchParameters,
      handleSearchFormChange,
      searchHospital,
      resetSearch,
      handleEnter,
      showHospitalModal,
      isSearchLoading,
      hospitalList,
      searchErrorMessage,
      deleteModalShow,
      onEditHandler,
      setShowModal,
      onDeleteHandler,
      handlePageChange,
      onSubmitDeleteHandler,
      queryParams,
      totalRecords,
      errorMessageForHospitalCode,
      errorMessageForHospitalName,
      alertMessageInfo,
      handleInputChange,
      editHospital,
      downloadEXCEL,
      deleteRemarksHandler,
      hospitalPreviewErrorMessage,
      deleteErrorMessage,
      hospitalEditErrorMessage,
      isPreviewLoading,
      hospitalPreviewData,
      onPreviewHandler,
      showEditModal,
      formValid,
      deleteRequestDTO,
      showAlert,
      closeAlert,
      hospitalData
    }) => (
      <>
        <div className="">
          <HospitalSetupSearchFilter
            searchParameters={searchParameters}
            onInputChange={handleSearchFormChange}
            onSearchClick={()=>searcHospital(1)}
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
