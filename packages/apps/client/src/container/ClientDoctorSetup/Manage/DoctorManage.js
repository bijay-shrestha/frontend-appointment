import React, {memo} from 'react'
import DoctorSetupSearchFilter from './DoctorSearchFilter'
import DoctorDetailsTable from './DoctorDetailsTable'
import DoctorEditForm from './DoctorEditModal'
import {CAlert} from '@frontend-appointment/ui-elements'
import DoctorHoc from '../DoctorHoc'

const DoctorManage = props => {
    const DocManage = DoctorHoc(
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
             doctorPreviewErrorMessage,
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
             qualificationDropdown,
             isConsultantEditLoading,
             salutationList
         }) => (
            <>
                <div className="">
                    <DoctorSetupSearchFilter
                        searchParameters={searchParameters}
                        onInputChange={handleSearchFormChange}
                        onSearchClick={() => searchDoctor(1)}
                        resetSearchForm={resetSearch}
                        handleEnter={handleEnter}
                        hospitalsForDropdown={hospitalsForDropdown}
                        doctorsForDropdown={doctorsForDropdown}
                        activeSpecializationList={activeSpecializationList}
                    />
                </div>
                <div className=" mb-2">
                    <DoctorDetailsTable
                        filteredActions={props.filteredAction}
                        showDoctorModal={showDoctorModal}
                        isSearchLoading={isSearchLoading}
                        searchData={doctorList}
                        searchErrorMessage={searchErrorMessage}
                        setShowModal={setShowModal}
                        onDeleteHandler={onDeleteHandler}
                        onEditHandler={onEditHandler}
                        isPreviewLoading={isPreviewLoading}
                        onPreviewHandler={onPreviewHandler}
                        doctorData={doctorPreviewData}
                        doctorPreviewErrorMessage={doctorPreviewErrorMessage}
                        totalItems={totalRecords}
                        maxSize={queryParams.size}
                        currentPage={queryParams.page}
                        handlePageChange={handlePageChange}
                        deleteModalShow={deleteModalShow}
                        onSubmitDelete={onSubmitDeleteHandler}
                        remarksHandler={deleteRemarksHandler}
                        remarks={deleteRequestDTO.remarks}
                        deleteErrorMsg={deleteErrorMessage}
                    />
                </div>
                {showEditModal && (
                    <DoctorEditForm
                        salutationList={salutationList}
                        showModal={showEditModal}
                        setShowModal={setShowModal}
                        onEnterKeyPress={handleEnter}
                        doctorData={doctorData}
                        onInputChange={handleInputChange}
                        editApiCall={editDoctor}
                        formValid={formValid}
                        errorMessageForAppointmentCharge={errorMessageForAppointmentCharge}
                        errorMessageForDoctorContact={errorMessageForDoctorContact}
                        errorMessageForDoctorName={errorMessageForDoctorName}
                        errorMessage={doctorEditErrorMessage}
                        doctorImage={doctorImage}
                        doctorImageCroppedUrl={doctorImageCroppedUrl}
                        doctorFileCropped={doctorFileCropped}
                        showImageUploadModal={showImageUploadModal}
                        onImageSelect={onImageSelect}
                        handleCropImage={handleCropImage}
                        handleImageUpload={handleImageUpload}
                        setImageShow={setImageShow}
                        qualificationDropdown={qualificationDropdown}
                        hospitalsForDropdown={hospitalsForDropdown}
                        activeSpecializationList={activeSpecializationList}
                        isConsultantEditLoading={isConsultantEditLoading}
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
        props, "M"
    )
    return <DocManage/>
}
export default memo(DoctorManage)
