import React from 'react';
import DoctorDutyRosterSearchFilter from "./DoctorDutyRosterSearchFilter";
import DoctorDutyRosterDataTable from "./DoctorDutyRosterDataTable";
import DoctorDutyRosterHOC from "../DoctorDutyRosterHOC";
import "./../doctor-duty-roster.scss";
import {CModal} from "@frontend-appointment/ui-elements";
import DoctorDutyRosterPreviewModal from "../common/DoctorDutyRosterPreviewModal";

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
             onEditHandler
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

                {/*<CModal*/}
                {/*    show={showConfirmModal}*/}
                {/*    modalHeading="Doctor Duty Roster Details"*/}
                {/*    size="lg"*/}
                {/*    bodyChildren={*/}
                {/*        <DoctorDutyRosterPreviewModal*/}
                {/*            doctorInfoData={doctorInfoData}*/}
                {/*            doctorAvailabilityData={doctorAvailabilityData}*/}
                {/*            hasOverrideDutyRoster={hasOverrideDutyRoster}*/}
                {/*            doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}/>*/}
                {/*    }*/}
                {/*    onHide={setShowConfirmModal}*/}
                {/*    centered={false}*/}
                {/*    dialogClassName="preview-modal"*/}
                {/*    closeButton={true}*/}
                {/*/>*/}
            </>
        , props, 'M');
    return <DoctorDutyRosterManage/>;

}

export default DoctorDutyRosterManage
