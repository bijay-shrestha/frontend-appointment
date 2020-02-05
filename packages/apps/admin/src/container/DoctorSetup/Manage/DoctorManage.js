import React, {memo} from 'react'
import DoctorSetupSearchFilter from './DoctorSearchFilter'
import DoctorDetailsTable from './DoctorDetailsTable'
import DoctorEditForm from './DoctorEditModal'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import DoctorHoc from '../DoctorHoc'
const DoctorManage = props => {
  const DocManage = HospitalHoc(
    ({
      searchParameters,
      handleSearchFormChange,
      searchDoctor,
      resetSearch,
      handleEnter,
      showDoctorModal,
      isSearchLoading,
      doctorList,
      searchErrorMessage,
      deleteModalShow,
      onEditHandler,
      setShowModal,
      onDeleteHandler,
      handlePageChange,
      onSubmitDeleteHandler,
      queryParams,
      totalRecords,
      errorMessageForAppointmentCharge,
      errorMessageForDoctorContact,
      errorMessageForDoctorName,
      alertMessageInfo,
      handleInputChange,
      editDoctor,
      downloadEXCEL,
      deleteRemarksHandler,
      editPreviewErrorMessage,
      deleteErrorMessage,
      doctorEditErrorMessage,
      isPreviewLoading,
      doctorPreviewData,
      onPreviewHandler,
      showEditModal,
      formValid,
      deleteRequestDTO,
      showAlert,
      closeAlert,
      doctorData,
      doctorImage,
      doctorImageCroppedUrl,
      doctorFileCropped,
      showImageUploadModal,
      onImageSelect,
      handleCropImage,
      handleImageUpload,
      setImageShow,
      doctorsForDropdown,
      hospitalsForDropdown,
      activeSpecializationList,
      
    }) => (
      <>
        <div className="">
          <DoctorSetupSearchFilter
            searchParameters={searchParameters}
            onInputChange={handleSearchFormChange}
            onSearchClick={()=>searchDoctor(1)}
            resetSearchForm={resetSearch}
            handleEnter={handleEnter}
            hospitalsForDropdown={hospitalsForDropdown}
            doctorsForDropdown={doctorsForDropdown}
            activeSpecializationList={activeSpecializationList}
          />
        </div>
        <div className=" mb-2">
          <HospitalDetailsTable
            filteredActions={props.filteredAction}
            showHospitalModal={showHospitalModal}
            isSearchLoading={isSearchLoading}
            searchData={hospitalList}
            searchErrorMessage={searchErrorMessage}
            setShowModal={setShowModal}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEditHandler}
            isPreviewLoading={isPreviewLoading}
            onPreviewHandler={onPreviewHandler}
            hospitalData={hospitalPreviewData}
            hospitalPreviewErrorMessage={hospitalPreviewErrorMessage}
            totalItems={totalRecords}
            maxSize={queryParams.size}
            currentPage={queryParams.page}
            handlePageChange={handlePageChange}
            deleteModalShow={deleteModalShow}
            onSubmitDelete={onSubmitDeleteHandler}
            remarksHandler={deleteRemarksHandler}
            remarks={deleteRequestDTO.remarks}
            deleteErrorMsg={deleteErrorMessage}
            // exportExcel={downloadEXCEL}
          
          />
        </div>
        {/* {showEditModal && (
          <HospitalEditForm
            showModal={showEditModal}
            setShowModal={setShowModal}
            onEnterKeyPress={handleEnter}
            hospitalData={hospitalData}
            onInputChange={handleInputChange}
            editApiCall={editHospital}
            formValid={formValid}
            errorMessageForHospitalCode={
              errorMessageForHospitalCode
            }
            errorMessageForSpecializationName={
              errorMessageForHospitalName
            }
            errorMessage={hospitalEditErrorMessage}
            addContactNumber={addContactNumber}
            removeContactNumber={removeContactNumber}
            editContactNumber={editContactNumber}
            hospitalImage={hospitalImage}
            hospitalImageCroppedUrl={hospitalImageCroppedUrl}
            hospitalFileCropped={hospitalFileCropped}
            showImageUploadModal={showImageUploadModal}
            onImageSelect={onImageSelect}
            handleCropImage={handleCropImage}
            handleImageUpload={handleImageUpload}
            setImageShow={setImageShow}   
          />
        )} */}
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
export default memo(HospitalManage)
