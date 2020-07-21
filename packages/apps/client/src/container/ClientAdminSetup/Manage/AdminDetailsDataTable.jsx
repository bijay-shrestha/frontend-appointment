import React, {memo} from 'react';
import {ConfirmDelete, StatusLabel, TableAction} from '@frontend-appointment/ui-components';
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import {ActionFilterUtils} from "@frontend-appointment/helpers";
import PreviewAdminDetails from "./PreviewAdminDetails";
import AdminPicture from "./tableComponents/AdminPicture";
import PreviewHandlerHoc from "../../CommonComponents/table-components/hoc/PreviewHandlerHoc"

const {checkIfRoleExists} = ActionFilterUtils;

const AdminDetailsDataTable = ({
                                   isSearchLoading,
                                   searchErrorMessage,
                                   searchData,
                                   setShowModal,
                                   filteredActions,
                                   onEditHandler,
                                   onPreviewHandler,
                                   onDeleteHandler,
                                   totalItems,
                                   maxSize,
                                   currentPage,
                                   handlePageChange,
                                   showAdminModal,
                                   adminPreviewData,
                                   deleteModalShow,
                                   remarksHandler,
                                   remarks,
                                   onSubmitDelete,
                                   deleteErrorMsg,
                                   onPasswordReset
                               }) => (
    <div className="manage-details">
        <h5 className="title">Admin Details</h5>
        {!isSearchLoading && !searchErrorMessage && searchData.length ? (
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
                            editable: true,
                            sizeColumnsToFit: true,
                            cellClass: 'first-class'
                            //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
                        },
                        {
                            headerName: 'Admin Avatar',
                            field: 'fileUri',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'imageRenderer'
                        },
                        {
                            headerName: 'Name',
                            field: 'fullName',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Email',
                            field: 'email',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                        },
                        {
                            headerName: 'Mobile Number',
                            field: 'mobileNumber',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Gender',
                            field: 'gender',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Profile',
                            field: 'profileName',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
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
                                onClick: function (e, id, type, data) {
                                    type === 'D'
                                        ?
                                        onDeleteHandler(id)
                                        : type === 'E'
                                        ? onEditHandler(id)
                                        : type === 'R' ? onPasswordReset(id, data)
                                            : onPreviewHandler(id)
                                },
                                filteredAction: filteredActions
                            },
                            cellStyle: {overflow: 'visible', 'z-index': '99'}
                        }
                    ]}
                    frameworkComponents={{
                        childActionRenderer: TableAction,
                        childLabelRenderer: PreviewHandlerHoc(StatusLabel, checkIfRoleExists, filteredActions, 4, onPreviewHandler),
                        imageRenderer: PreviewHandlerHoc(AdminPicture, checkIfRoleExists, filteredActions, 4, onPreviewHandler)
                    }}
                    defaultColDef={{resizable: true}}
                    getSelectedRows={
                        checkIfRoleExists(filteredActions, 4) &&
                        onPreviewHandler}
                    rowSelection={'single'}
                    setShowModal={setShowModal} // {this.showModal}
                    rowData={searchData}
                />
                <CPagination
                    totalItems={totalItems}
                    maxSize={maxSize}
                    currentPage={currentPage}
                    onPageChanged={handlePageChange}
                />
            </>
        ) : !isSearchLoading && searchErrorMessage ? (
            <div className="filter-message">
                <div className="no-data">
                    <i class="fa fa-file-text-o"></i>
                </div>
                <div className="message"> {searchErrorMessage}</div>
            </div>
        ) : (
            <CLoading/>
        )}
        {showAdminModal ? (
            <PreviewAdminDetails
                showModal={showAdminModal}
                setShowModal={setShowModal}
                adminInfoObj={adminPreviewData}
                adminImage={adminPreviewData.adminAvatarUrl}
            />
        ) : (
            ''
        )}
        {deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Admin?If yes please provide remarks."
                modalHeader="Delete Admin"
                showModal={deleteModalShow}
                setShowModal={setShowModal}
                onDeleteRemarksChangeHandler={remarksHandler}
                remarks={remarks}
                onSubmitDelete={onSubmitDelete}
                deleteErrorMessage={deleteErrorMsg}
            />
        ) : (
            ''
        )}
    </div>
);
export default memo(AdminDetailsDataTable);
