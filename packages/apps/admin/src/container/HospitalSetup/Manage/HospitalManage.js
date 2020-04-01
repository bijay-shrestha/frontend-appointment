import React, {memo} from 'react'
import HospitalSetupSearchFilter from './HospitalSetupSearchFilter'
import HospitalDetailsTable from './HospitalDetailsTable'
import HospitalEditForm from './HospitalEditModal'
import {CAlert} from '@frontend-appointment/ui-elements'
import HospitalHoc from '../HospitalHoc';
const HospitalManage = props => {
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
             hospitalData,
             addContactNumber,
             removeContactNumber,
             editContactNumber,
             hospitalImage,
             hospitalImageCroppedUrl,
             hospitalFileCropped,
             showImageUploadModal,
             onImageSelect,
             handleCropImage,
             handleImageUpload,
             setImageShow,
             hospitalDropdown,
             hospitalBannerImage,
             onBannerImageSelect,
             hospitalBannerImageCroppedUrl,
             hospitalBannerFileCropped,
             showBannerUploadModal,
             handleCropBannerImage,
             handleBannerImageUpload,
             setShowBannerUploadModal,
             isHospitalEditLoading,
             isDeleteLoading
         }) => (
            <>
                <div className="">
                    <HospitalSetupSearchFilter
                        searchParameters={searchParameters}
                        onInputChange={handleSearchFormChange}
                        onSearchClick={() => searchHospital(1)}
                        resetSearchForm={resetSearch}
                        handleEnter={handleEnter}
                        hospitalDropdown={hospitalDropdown}
                        isSearchLoading={isSearchLoading}
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
                        isDeleteLoading={isDeleteLoading}
                        // exportExcel={downloadEXCEL}

                    />
                </div>
                {showEditModal && (
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
                        hospitalBannerImage={hospitalBannerImage}
                        hospitalBannerImageCroppedUrl={hospitalBannerImageCroppedUrl}
                        hospitalBannerFileCropped={hospitalBannerFileCropped}
                        showBannerUploadModal={showBannerUploadModal}
                        onBannerImageSelect={onBannerImageSelect}
                        handleCropBannerImage={handleCropBannerImage}
                        handleBannerImageUpload={handleBannerImageUpload}
                        setShowBannerUploadModal={setShowBannerUploadModal}
                        isHospitalEditLoading={isHospitalEditLoading}
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
    return <SPManage/>
}
export default memo(HospitalManage)
