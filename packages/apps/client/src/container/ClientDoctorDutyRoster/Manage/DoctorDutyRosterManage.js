import React from 'react';
import DoctorDutyRosterSearchFilter from "./DoctorDutyRosterSearchFilter";
import DoctorDutyRosterDataTable from "./DoctorDutyRosterDataTable";
import DoctorDutyRosterHOC from "../DoctorDutyRosterHOC";
import "./../doctor-duty-roster.scss";
import {ConfirmDelete} from "@frontend-appointment/ui-components";
import EditDoctorDutyRoster from "./EditDoctorDutyRoster";
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import {Container, Row} from "react-bootstrap";

function DoctorDutyRosterManage(props) {
    const DoctorDutyRosterManage = DoctorDutyRosterHOC(
        ({
             searchParameters,
             resetSearchForm,
             onSearchInputChange,
             searchDoctorDutyRoster,
             doctorList,
             specializationList,
             specializationDropdownError,
             activeDoctorList,
             doctorDropdownErrorMessage,
             isSearchRosterLoading,
             isSaveRosterLoading,
             isEditRosterPending,
             searchErrorMessage,
             doctorDutyRosterList,
             filteredAction,
             paginationData,
             handlePageChange,
             onPreviewHandler,
             onDeleteHandler,
             onEditHandler,
             onCloneAndAddNew,
             showDeleteModal,
             setShowDeleteModal,
             remarksHandler,
             remarks,
             deleteDoctorDutyRoster,
             deleteErrorMessage,
             showEditModal,
             updateDoctorDutyRosterData,
             editErrorMessage,
             editDoctorDutyRoster,
             overrideData,
             handleEnter,
             handleInputChange,
             handleDoctorAvailabilityFormChange,
             handleOverrideDutyRoster,
             handleOverrideFormInputChange,
             showAddOverrideModal,
             cancelCloseEditModal,
             setShowAddOverrideModal,
             addOverride,
             overrideUpdateErrorMessage,
             onModifyOverride,
             isModifyOverride,
             setShowDeleteOverrideModal,
             showDeleteOverrideModal,
             deleteOverrideErrorMessage,
             deleteOverride,
             onRemoveOverride,
             saveDoctorDutyRoster,
             activeDoctorsByHospitalForDropdown,
             activeSpecializationListByHospital,
             dateErrorMessage,
             overrideFormValid,
             isDeleteRosterLoading
         }) => {
            const footerContent =
                <Container fluid={true}>
                    <Row>
                        <div className="col-sm-12  col-md-6">
                            {editErrorMessage ?
                                <p className="modal-error"><i
                                    className="fa fa-exclamation-triangle"/> &nbsp;  {editErrorMessage}
                                </p> : ''}
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <CButton
                                id="submit-update-button"
                                disabled={!updateDoctorDutyRosterData.formValid || isSaveRosterLoading || isEditRosterPending}
                                isLoading={isSaveRosterLoading || isEditRosterPending}
                                name={updateDoctorDutyRosterData.isCloneAndAdd ? "Save" : "Update"}
                                size="lg"
                                className="btn-action  float-right"
                                onClickHandler={() => updateDoctorDutyRosterData.isCloneAndAdd ? saveDoctorDutyRoster(false, true)
                                    : editDoctorDutyRoster()}/>
                            <CButton id="cancel-update-profile"
                                     variant="light"
                                     size="lg"
                                     className="btn-action  float-right mr-2"
                                     name="Cancel"
                                     onClickHandler={cancelCloseEditModal}
                                     disabled={isSaveRosterLoading || isEditRosterPending}
                            />
                        </div>
                    </Row>
                </Container>;
            return <>
                <DoctorDutyRosterSearchFilter
                    searchParameters={searchParameters}
                    onSearchInputChange={onSearchInputChange}
                    resetSearchForm={resetSearchForm}
                    onSearchClick={() => searchDoctorDutyRoster(1)}
                    specializationList={activeSpecializationListByHospital}
                    specializationDropdownError={specializationDropdownError}
                    doctorList={activeDoctorList}
                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                />
                <DoctorDutyRosterDataTable
                    isSearchRosterLoading={isSearchRosterLoading}
                    searchErrorMessage={searchErrorMessage}
                    doctorDutyRosterList={doctorDutyRosterList}
                    filteredAction={filteredAction}
                    totalItems={paginationData.totalRecords}
                    maxSize={paginationData.size}
                    currentPage={paginationData.page}
                    handlePageChange={handlePageChange}
                    onPreviewHandler={onPreviewHandler}
                    onDeleteHandler={onDeleteHandler}
                    onEditHandler={onEditHandler}
                    onCloneAndAddNew={onCloneAndAddNew}
                />

                {showDeleteModal ? (
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete this Doctor Duty Roster? If yes please provide remarks."
                        modalHeader="Delete Doctor Duty Roster"
                        showModal={showDeleteModal}
                        setShowModal={setShowDeleteModal}
                        onDeleteRemarksChangeHandler={remarksHandler}
                        remarks={remarks}
                        onSubmitDelete={deleteDoctorDutyRoster}
                        deleteErrorMessage={deleteErrorMessage}
                        isLoading={isDeleteRosterLoading}
                    />
                ) : (
                    ''
                )}
                {
                    showEditModal ? (
                        <CModal
                            show={showEditModal}
                            modalHeading={updateDoctorDutyRosterData.isCloneAndAdd ? "Clone and Add Doctor Roster"
                                : "Edit Doctor Roster"}
                            size="xl"
                            bodyChildren={
                                <EditDoctorDutyRoster
                                    updateDoctorDutyRosterData={updateDoctorDutyRosterData}
                                    onInputChange={handleInputChange}
                                    onEnterKeyPress={handleEnter}
                                    overrideData={overrideData}
                                    handleDoctorAvailabilityFormChange={handleDoctorAvailabilityFormChange}
                                    handleOverrideDutyRoster={handleOverrideDutyRoster}
                                    showAddOverrideModal={showAddOverrideModal}
                                    setShowAddOverrideModal={setShowAddOverrideModal}
                                    handleOverrideFormInputChange={handleOverrideFormInputChange}
                                    addOverride={addOverride}
                                    overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                                    onModifyOverride={onModifyOverride}
                                    isModifyOverride={isModifyOverride}
                                    setShowDeleteOverrideModal={setShowDeleteOverrideModal}
                                    showDeleteOverrideModal={showDeleteOverrideModal}
                                    remarksHandler={remarksHandler}
                                    remarks={remarks}
                                    deleteOverrideErrorMessage={deleteOverrideErrorMessage}
                                    deleteOverride={deleteOverride}
                                    onRemoveOverride={onRemoveOverride}
                                    specializationList={activeSpecializationListByHospital}
                                    specializationDropdownError={specializationDropdownError}
                                    doctorList={doctorList}
                                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                                    dateErrorMessage={dateErrorMessage}
                                    overrideFormValid={overrideFormValid}/>
                            }
                            onHide={cancelCloseEditModal}
                            centered={false}
                            dialogClassName="preview-modal edit-doctordutyroster"
                            footerChildren={footerContent}
                            closeButton={true}/>
                    ) : ''
                }
            </>
        }
        , props, 'MANAGE');
    return <DoctorDutyRosterManage/>;

}

export default DoctorDutyRosterManage
