import React, {memo} from 'react'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import {ConfirmDelete} from "@frontend-appointment/ui-components";
import HospitalDepartmentPreviewModal from "./HospitalDepartmentPreviewModal";
import TableAction from "../CTableComponents/TableAction";
import {StatusLabel} from "../CTableComponents";

const {checkIfRoleExists} = ActionFilterUtils;

const HospitalDepartmentSetupDataTable = ({tableData}) => {
    const {
        filteredActions,
        isSearchHospitalDepartmentLoading,
        hospitalDepartmentList,
        searchErrorMessage,
        totalItems,
        maxSize,
        currentPage,
        handlePageChange,
        closeModal,
        departmentPreviewData,
        onPreviewHandler,
        onEditHandler,
        showDeleteModal,
        onDeleteHandler,
        remarksHandler,
        remarks,
        onSubmitDelete,
        deleteErrorMsg,
        isDeleteHospitalDepartmentLoading
    } = tableData;

    return (
        <div className="manage-details">
            <h5 className="title">Department Details</h5>
            {!isSearchHospitalDepartmentLoading && !searchErrorMessage && hospitalDepartmentList.length ? (
                <>
                    <CDataTable
                        classes="ag-theme-balham"
                        id="roles-table"
                        width="100%"
                        height="460px"
                        enableSorting
                        editType
                        columnDefs={[
                            {
                                headerName: 'SN',
                                field: 'sN',
                                headerClass: 'resizable-header header-first-class',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true,
                                cellClass: 'first-class'
                            },
                            {
                                headerName: 'Department Name',
                                field: 'name',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true
                            },
                            {
                                headerName: 'Room Number(s)',
                                field: 'roomList',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true
                            },
                            {
                                headerName: 'Appointment Charge',
                                field: 'appointmentCharge',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true
                            },
                            {
                                headerName: 'Follow up Charge',
                                field: 'followUpCharge',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true
                            },
                            {
                                headerName: 'Status',
                                field: 'status',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true,
                                cellRenderer: 'childLabelRenderer'
                            },
                            {
                                headerName: '',
                                action: 'action',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true,
                                cellRenderer: 'childActionRenderer',
                                cellClass: 'actions-button-cell',
                                cellRendererParams: {
                                    onClick: function (e, id, type) {
                                        type === 'D'
                                            ? onDeleteHandler(id)
                                            : type === 'E'
                                            ? onEditHandler(id)
                                            : onPreviewHandler(id)
                                    },
                                    filteredAction: filteredActions
                                },
                                cellStyle: {overflow: 'visible', 'z-index': '99'}
                            }
                        ]}
                        frameworkComponents={{
                            childActionRenderer: TableAction,
                            childLabelRenderer: StatusLabel
                        }}
                        defaultColDef={{resizable: true}}
                        getSelectedRows={checkIfRoleExists(filteredActions, 4) && onPreviewHandler}
                        rowSelection={'single'}
                        rowData={hospitalDepartmentList}
                    />
                    <CPagination
                        totalItems={totalItems}
                        maxSize={maxSize}
                        currentPage={currentPage}
                        onPageChanged={handlePageChange}
                    />
                </>
            ) : !isSearchHospitalDepartmentLoading && searchErrorMessage ? (
                <div className="filter-message">
                    <div className="no-data">
                        <i className="fa fa-file-text-o"/>
                    </div>
                    <div className="message"> {searchErrorMessage}</div>
                </div>
            ) : (
                <CLoading/>
            )}
            {showDeleteModal ? (
                <ConfirmDelete
                    confirmationMessage="Are you sure you want to delete the Department? If yes please provide remarks."
                    modalHeader="Delete Department"
                    showModal={showDeleteModal}
                    setShowModal={closeModal}
                    onDeleteRemarksChangeHandler={(event) => remarksHandler(event, null, "deleteRequestDTO")}
                    remarks={remarks}
                    onSubmitDelete={onSubmitDelete}
                    deleteErrorMessage={deleteErrorMsg}
                    isLoading={isDeleteHospitalDepartmentLoading}
                />
            ) : (
                ''
            )}
            {departmentPreviewData.showPreviewModal ? (
                <HospitalDepartmentPreviewModal
                    departmentPreviewData={{
                        ...departmentPreviewData,
                        type: "MANAGE"
                    }}
                />
            ) : (
                ''
            )}
        </div>
    )
};
export default memo(HospitalDepartmentSetupDataTable)
