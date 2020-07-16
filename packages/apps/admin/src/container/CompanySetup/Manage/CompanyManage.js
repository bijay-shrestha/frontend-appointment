import React, {memo} from 'react'
import CompanySetupSearchFilter from './CompanySetupSearchFilter'
import CompanyDetailsTable from './CompanyDetailsTable'
import CompanyEditForm from './CompanyEditModal'
import {CAlert} from '@frontend-appointment/ui-elements'
import CompanyHoc from '../CompanyHoc';

const CompanyManage = props => {
    const CompManage = CompanyHoc(
        ({
             searchParameters,
             handleSearchFormChange,
             searchCompany,
             resetSearch,
             handleEnter,
             showCompanyModal,
             isSearchLoading,
             companyList,
             searchErrorMessage,
             deleteModalShow,
             onEditHandler,
             setShowModal,
             onDeleteHandler,
             handlePageChange,
             onSubmitDeleteHandler,
             queryParams,
             totalRecords,
             errorMessageForCompanyCode,
             errorMessageForCompanyName,
             alertMessageInfo,
             handleInputChange,
             editCompany,
             downloadEXCEL,
             deleteRemarksHandler,
             companyPreviewErrorMessage,
             deleteErrorMessage,
             companyEditErrorMessage,
             isPreviewLoading,
             companyPreviewData,
             onPreviewHandler,
             showEditModal,
             formValid,
             deleteRequestDTO,
             showAlert,
             closeAlert,
             companyData,
             addContactNumber,
             removeContactNumber,
             editContactNumber,
             companyImage,
             companyImageCroppedUrl,
             companyFileCropped,
             showImageUploadModal,
             onImageSelect,
             handleCropImage,
             handleImageUpload,
             contactLength,
             setImageShow,
             isCompanyDropdownLoading,
             companyDropdownData,
             companyDropdownErrorMessage,
             isImageUploading,
             isCompanyEditLoading
             //,

             //hospitalDropdown,
             //  hospitalBannerImage,
             //  onBannerImageSelect,
             //  hospitalBannerImageCroppedUrl,
             //  hospitalBannerFileCropped,
             //  showBannerUploadModal,
             //  handleCropBannerImage,
             //  handleBannerImageUpload,
             //  setShowBannerUploadModal
         }) => (
            <>
                <div className="">
                    <CompanySetupSearchFilter
                        searchParameters={searchParameters}
                        onInputChange={handleSearchFormChange}
                        onSearchClick={() => searchCompany(1)}
                        resetSearchForm={resetSearch}
                        handleEnter={handleEnter}
                        isCompanyDropdownLoading={isCompanyDropdownLoading}
                        companyDropdownData={companyDropdownData}
                        companyDropdownErrorMessage={companyDropdownErrorMessage}
                        // hospitalDropdown={hospitalDropdown}
                    />
                </div>
                <div className=" mb-2">
                    <CompanyDetailsTable
                        filteredActions={props.filteredAction}
                        showCompanyModal={showCompanyModal}
                        isSearchLoading={isSearchLoading}
                        searchData={companyList}
                        searchErrorMessage={searchErrorMessage}
                        setShowModal={setShowModal}
                        onDeleteHandler={onDeleteHandler}
                        onEditHandler={onEditHandler}
                        isPreviewLoading={isPreviewLoading}
                        onPreviewHandler={onPreviewHandler}
                        companyData={companyPreviewData}
                        companyPreviewErrorMessage={companyPreviewErrorMessage}
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
                {showEditModal && (
                    <CompanyEditForm

                        showModal={showEditModal}
                        setShowModal={setShowModal}
                        onEnterKeyPress={handleEnter}
                        companyData={companyData}
                        onInputChange={handleInputChange}
                        editApiCall={editCompany}
                        formValid={formValid}
                        errorMessageForCompanyCode={
                            errorMessageForCompanyCode
                        }
                        errorMessageForCompanyName={
                            errorMessageForCompanyName
                        }
                        errorMessage={companyEditErrorMessage}
                        addContactNumber={addContactNumber}
                        removeContactNumber={removeContactNumber}
                        editContactNumber={editContactNumber}
                        companyImage={companyImage}
                        companyImageCroppedUrl={companyImageCroppedUrl}
                        companyFileCropped={companyFileCropped}
                        showImageUploadModal={showImageUploadModal}
                        onImageSelect={onImageSelect}
                        handleCropImage={handleCropImage}
                        handleImageUpload={handleImageUpload}
                        setImageShow={setImageShow}
                        contactLength={contactLength}
                        isImageUploading={isImageUploading}
                        isCompanyEditLoading={isCompanyEditLoading}
                        // hospitalBannerImage={hospitalBannerImage}
                        // hospitalBannerImageCroppedUrl={hospitalBannerImageCroppedUrl}
                        // hospitalBannerFileCropped={hospitalBannerFileCropped}
                        // showBannerUploadModal={showBannerUploadModal}
                        // onBannerImageSelect={onBannerImageSelect}
                        // handleCropBannerImage={handleCropBannerImage}
                        // handleBannerImageUpload={handleBannerImageUpload}
                        // setShowBannerUploadModal={setShowBannerUploadModal}
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
    return <CompManage/>
}
export default memo(CompanyManage)
