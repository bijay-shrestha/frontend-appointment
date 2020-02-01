import React, {memo} from 'react'
import QualificationSetupSearchFilter from './QualificationSetupSearchFilter'
import QualificationDetailsTable from './QualificationDetailsTable'
import QualificationEditForm from './QualificationEditModal'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import QualificationSetupHoc from '../QualificationSetupHoc'
import { qualificationAliasFetchForDropdownError } from '@frontend-appointment/action-module/src/admin-module/qualification-setup/qualificationSetupActions'
const QualificationManage = props => {
  const SPManage = QualificationSetupHoc(
    ({
      searchParameters,
      handleSearchFormChange,
      searchQualification,
      resetSearch,
      handleEnter,
      showQualificationModal,
      isSearchLoading,
      qualificationList,
      searchErrorMessage,
      deleteModalShow,
      onEditHandler,
      setShowModal,
      onDeleteHandler,
      handlePageChange,
      onSubmitDeleteHandler,
      queryParams,
      totalRecords,
      errorMessageForQualificationName,
      alertMessageInfo,
      handleInputChange,
      editQualification,
      deleteRemarksHandler,
      qualificationPreviewErrorMessage,
      deleteErrorMessage,
      qualificationEditErrorMessage,
      isPreviewLoading,
      qualificationPreviewData,
      onPreviewHandler,
      showEditModal,
      formValid,
      deleteRequestDTO,
      showAlert,
      closeAlert,
      qualificationData,
      qualificationsAliasForDropdown,
      qualificationsForDropdown,
      universitiesDropdown
    }) => (
      <>
        <div className="">
          <QualificationSetupSearchFilter
            searchParameters={searchParameters}
            onInputChange={handleSearchFormChange}
            onSearchClick={() => searchQualification(1)}
            resetSearchForm={resetSearch}
            handleEnter={handleEnter}
            qualificationsAliasForDropdown={qualificationsAliasForDropdown}
            qualificationsForDropdown={qualificationsForDropdown}
            universitiesDropdown={universitiesDropdown}
          />
        </div>
        <div className=" mb-2">
          <QualificationDetailsTable
            //filteredActions={props.filteredAction}
            showQualificationModal={showQualificationModal}
            isSearchLoading={isSearchLoading}
            searchData={qualificationList}
            searchErrorMessage={searchErrorMessage}
            setShowModal={setShowModal}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEditHandler}
            isPreviewLoading={isPreviewLoading}
            onPreviewHandler={onPreviewHandler}
            qualificationData={qualificationPreviewData}
            qualificaitonPreviewErrorMessage={qualificationPreviewErrorMessage}
            totalItems={totalRecords}
            maxSize={queryParams.size}
            currentPage={queryParams.page}
            handlePageChange={handlePageChange}
            deleteModalShow={deleteModalShow}
            onSubmitDelete={onSubmitDeleteHandler}
            remarksHandler={deleteRemarksHandler}
            remarks={deleteRequestDTO.remarks}
            deleteErrorMsg={deleteErrorMessage}
            qualificationsAliasForDropdown={qualificationsAliasForDropdown}
            qualificationsForDropdown={qualificationsForDropdown}
            universitiesDropdown={universitiesDropdown}
          />
        </div>
        {showEditModal && (
          <QualificationEditForm
            showModal={showEditModal}
            setShowModal={setShowModal}
            onEnterKeyPress={handleEnter}
            qualificationData={qualificationData}
            onInputChange={handleInputChange}
            editApiCall={editQualification}
            formValid={formValid}
            errorMessageForQualificationName={errorMessageForQualificationName}
            errorMessage={qualificationEditErrorMessage}
            qualificationsAliasForDropdown={qualificationsAliasForDropdown}
            universitiesDropdown={universitiesDropdown}
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
    props,
    'M'
  )
  return <SPManage />
}


export default memo(QualificationManage)
