import React, {memo} from 'react'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import Statuslabel from '../../CommonComponents/table-components/StatusLabel'
import TableAction from '../../CommonComponents/table-components/TableAction'
import CompanyProfilePreviewRoles from "../../CommonComponents/CompanyProfilePreviewRoles";
import {menuRoles as rolesFromJson} from "@frontend-appointment/helpers";
import {ConfirmDelete} from "@frontend-appointment/ui-components";

const {checkIfRoleExists} = ActionFilterUtils;

const CompanyProfileSetupDatTable = ({tableData}) => {
    const {
        filteredActions,
        searchCompanyProfileLoading,
        searchCompanyProfileErrorMessage,
        companyProfileList,
        totalItems,
        maxSize,
        currentPage,
        handlePageChange,
        showPreviewModal,
        closeModal,
        profilePreviewErrorMessage,
        previewData,
        profilePreviewLoading,
        onPreviewHandler,
        onEditHandler,
        showDeleteModal,
        onDeleteHandler,
        remarksHandler,
        remarks,
        onSubmitDelete,
        deleteErrorMsg
    } = tableData;
    console.log("roles",filteredActions);
    return (
        <div className="manage-details">
            <h5 className="title">Company Profile Details</h5>
            {!searchCompanyProfileLoading && !searchCompanyProfileErrorMessage && companyProfileList.length ? (
                <>
                    <CDataTable
                        classes="ag-theme-balham"
                        id="roles-table"
                        width="100%"
                        height="460px"
                        enableSorting
                        editType
                        columnDefs={[
                            // {
                            //     headerName: 'SN',
                            //     field: 'sN',
                            //     headerClass: 'resizable-header header-first-class',
                            //     resizable: true,
                            //     sortable: true,
                            //     editable: true,
                            //     sizeColumnsToFit: true,
                            //     cellClass: 'first-class'
                            //     //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
                            // },
                            {
                                headerName: 'Profile Name',
                                field: 'name',
                                resizable: true,
                                sortable: true,
                                sizeColumnsToFit: true
                            },
                            {
                                headerName: 'Company Name',
                                field: 'companyName',
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
                            childLabelRenderer: Statuslabel
                        }}
                        defaultColDef={{resizable: true}}
                        getSelectedRows={
                            checkIfRoleExists(filteredActions, 4) &&
                            onPreviewHandler}
                        rowSelection={'single'}
                        rowData={companyProfileList}
                    />
                    <CPagination
                        totalItems={totalItems}
                        maxSize={maxSize}
                        currentPage={currentPage}
                        onPageChanged={handlePageChange}
                    />
                </>
            ) : !searchCompanyProfileLoading && searchCompanyProfileErrorMessage ? (
                <div className="filter-message">
                    <div className="no-data">
                        <i className="fa fa-file-text-o"/>
                    </div>
                    <div className="message"> {searchCompanyProfileErrorMessage}</div>
                </div>
            ) : (
                <CLoading/>
            )}
            {showDeleteModal ? (
                <ConfirmDelete
                    confirmationMessage="Are you sure you want to delete the Company Profile? If yes please provide remarks."
                    modalHeader="Delete Company Profile"
                    showModal={showDeleteModal}
                    setShowModal={closeModal}
                    onDeleteRemarksChangeHandler={remarksHandler}
                    remarks={remarks}
                    onSubmitDelete={onSubmitDelete}
                    deleteErrorMessage={deleteErrorMsg}
                />
            ) : (
                ''
            )}
            {showPreviewModal ? (
                <CompanyProfilePreviewRoles
                    showModal={showPreviewModal}
                    setShowModal={closeModal}
                    profileData={previewData}
                    profilePreviewErrorMessage={profilePreviewErrorMessage}
                    profilePreviewLoading={profilePreviewLoading}
                    rolesJson={rolesFromJson}
                />
            ) : (
                ''
            )}
        </div>
    )
};
export default memo(CompanyProfileSetupDatTable)
