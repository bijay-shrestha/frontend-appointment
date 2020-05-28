import React from 'react';
import DepartmentDutyRosterSearchFilter from "./DepartmentDutyRosterSearchFilter";
import DepartmentDutyRosterDataTable from "./DepartmentDutyRosterDataTable";
import DepartmentDutyRosterHOC from "../DepartmentDutyRosterHOC";
import "../department-duty-roster.scss";
import {ConfirmDelete} from "@frontend-appointment/ui-components";
import EditDepartmentDutyRoster from "./EditDepartmentDutyRoster";
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import {Container, Row} from "react-bootstrap";

function DepartmentDutyRosterManage(props) {
    const DoctorDutyRosterManage = DepartmentDutyRosterHOC(
        ({
             searchFilterProps,
             dataTableProps,
             deleteProps,

             hospitalList,
             specializationDropdownError,
             doctorList,
             doctorDropdownErrorMessage,
             isSaveRosterLoading,
             isEditRosterPending,


             remarksHandler,
             remarks,

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
             activeSpecializationListByHospital,
             dateErrorMessage,
             overrideFormValid,

         }) => {
            const footerContent =
                <Container fluid="true">
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
                <DepartmentDutyRosterSearchFilter searchFilterProps={searchFilterProps}
                />
                <DepartmentDutyRosterDataTable dataTableProps={dataTableProps}/>

                {deleteProps.showDeleteModal ? (
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete this Department Duty Roster? If yes please provide remarks."
                        modalHeader="Delete Department Duty Roster"
                        showModal={deleteProps.showDeleteModal}
                        setShowModal={deleteProps.setShowModal}
                        onDeleteRemarksChangeHandler={deleteProps.remarksHandler}
                        remarks={deleteProps.remarks}
                        onSubmitDelete={deleteProps.deleteDepartmentDutyRoster}
                        deleteErrorMessage={deleteProps.deleteErrorMessage}
                        isLoading={deleteProps.isDeleteRosterLoading}
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
                                <EditDepartmentDutyRoster
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
                                    hospitalList={hospitalList}
                                    specializationList={activeSpecializationListByHospital}
                                    specializationDropdownError={specializationDropdownError}
                                    doctorList={doctorList}
                                    doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                                    dateErrorMessage={dateErrorMessage}
                                    overrideFormValid={overrideFormValid}
                                />
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

export default DepartmentDutyRosterManage
