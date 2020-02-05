import React from 'react';
import DoctorDutyRosterSearchFilter from "./DoctorDutyRosterSearchFilter";
import DoctorDutyRosterDataTable from "./DoctorDutyRosterDataTable";
import DoctorDutyRosterHOC from "../DoctorDutyRosterHOC";
import "./../doctor-duty-roster.scss";
import {ConfirmDelete} from "@frontend-appointment/ui-components";

function DoctorDutyRosterManage(props) {
    const DoctorDutyRosterManage = DoctorDutyRosterHOC(
        ({
             searchParameters,
             resetSearchForm,
             onSearchInputChange,
             searchDoctorDutyRoster,
             hospitalList,
             specializationList,
             specializationDropdownError,
             activeDoctorList,
             doctorDropdownErrorMessage,
             isSearchRosterLoading,
             searchErrorMessage,
             doctorDutyRosterList,
             filteredAction,
             paginationData,
             handlePageChange,
             onPreviewHandler,
             onDeleteHandler,
             onEditHandler,
             showDeleteModal,
             setShowDeleteModal,
             remarksHandler,
             remarks,
             deleteDoctorDutyRoster,
             deleteErrorMessage
         }) =>
            <>
                <DoctorDutyRosterSearchFilter
                    searchParameters={searchParameters}
                    onSearchInputChange={onSearchInputChange}
                    resetSearchForm={resetSearchForm}
                    onSearchClick={() => searchDoctorDutyRoster(1)}
                    hospitalList={hospitalList}
                    specializationList={specializationList}
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
                    />
                ) : (
                    ''
                )}
            </>
        , props, 'M');
    return <DoctorDutyRosterManage/>;

}

export default DoctorDutyRosterManage
