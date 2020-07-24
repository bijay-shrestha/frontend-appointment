import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import React, {memo} from 'react';
import {ConfirmDelete, StatusLabel, TableAction} from '@frontend-appointment/ui-components';
import {ActionFilterUtils} from "@frontend-appointment/helpers";
import PreviewDetails from "../commons/PreviewDetails";

const {checkIfRoleExists} = ActionFilterUtils;

const UnitDetailsDataTable = props => (
    <div className="manage-details">
        <h5 className="title">Unit Details</h5>
        {!props.isSearchLoading && !props.searchErrorMessage && props.searchData.length ? (
            <>
                {/*<CButton*/}
                {/*    id="downloadExcel"*/}
                {/*    name="DownloadExcel"*/}
                {/*    onClickHandler={props.exportExcel}*/}
                {/*    className="float-right"*/}
                {/*    variant='outline-secondary'*/}
                {/*> <i className='fa fa-download'/>*/}
                {/*</CButton>*/}
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
                            headerName: 'Client',
                            field: 'hospitalName',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Unit Name',
                            field: 'name',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Unit code',
                            field: 'departmentCode',
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
                                        // ? props.filteredActions.find(action => action.id === 5) &&
                                        ? props.onDeleteHandler(id)
                                        : type === 'E'
                                        ? props.onEditHandler(id)
                                        : props.onPreviewHandler(id)
                                },
                                filteredAction: props.filteredActions
                            },
                            cellStyle: {overflow: 'visible', 'z-index': '99'}
                        }
                    ]}
                    frameworkComponents={{
                        childActionRenderer: TableAction,
                        childLabelRenderer: StatusLabel
                    }}
                    defaultColDef={{resizable: true}}
                    getSelectedRows={checkIfRoleExists(props.filteredActions, 4) ? props.onPreviewHandler : () => {
                    }}
                    rowSelection={'single'}
                    setShowModal={props.setShowModal} // {this.showModal}
                    rowData={props.searchData}
                />
                <CPagination
                    totalItems={props.totalItems}
                    maxSize={props.maxSize}
                    currentPage={props.currentPage}
                    onPageChanged={props.handlePageChange}
                />
            </>
        ) : !props.isSearchLoading && props.searchErrorMessage ? (
            <div className="filter-message">
                <div className="no-data">
                    <i className="fa fa-file-text-o"/>
                </div>
                <div className="message"> {props.searchErrorMessage}</div>
            </div>
        ) : (
            <CLoading/>
        )}
        {props.showDepartmentModal ? (
            <PreviewDetails
                showModal={props.showDepartmentModal}
                setShowModal={props.setShowModal}
                departmentData={{
                    ...props.departmentPreviewData,
                    code: props.departmentPreviewData.departmentCode,
                    type: "MANAGE"
                }}
                profilePreviewErrorMessage={props.profilePreviewErrorMessage}
            />
        ) : (
            ''
        )}
        {props.deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Unit? If yes please provide remarks."
                modalHeader="Delete Unit"
                showModal={props.deleteModalShow}
                setShowModal={props.setShowModal}
                onDeleteRemarksChangeHandler={props.remarksHandler}
                remarks={props.remarks}
                onSubmitDelete={props.onSubmitDelete}
                deleteErrorMessage={props.deleteErrorMsg}
                isLoading={props.isDeleteLoading}
            />
        ) : (
            ''
        )}
    </div>
);
export default memo(UnitDetailsDataTable);
