import {CDataTable, CPagination,CButton} from '@cogent/ui-elements';
import React, {memo} from 'react';
import {CLoading, ConfirmDelete} from '@cogent/ui-components';
import {ActionFilterUtils} from "@cogent/helpers";
import TableAction from "./tableComponents/TableAction";
import StatusLabel from "./tableComponents/StatusLabel";
import PreviewDetails from "../commons/PreviewDetails";

const {checkIfRoleExists} = ActionFilterUtils;

const SubDepartmentDetailsDataTable = props => (
    <div className="profile-details">
        <h5 className="title">Sub Department Details</h5>
        <CButton
                    id="downloadExcel"
                    name="DownloadExcel"
                    onClickHandler={props.exportExcel}
                    disabled={!props.isSearchLoading && !props.searchErrorMessage && props.searchData.length?false:true}
                    className="float-right p-2"
                    variant='info'
                    />
        {!props.isSearchLoading && !props.searchErrorMessage && props.searchData.length ? (
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
                            headerName: 'Specialization Name',
                            field: 'name',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Specialization Code',
                            field: 'code',
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
                                        ? props.filteredActions.find(action => action.id === 5) && props.onDeleteHandler(id)
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
                    getSelectedRows={checkIfRoleExists(props.filteredActions, 4) && props.onPreviewHandler}
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
                    <i class="fa fa-file-text-o"></i>
                </div>
                <div className="message"> {props.searchErrorMessage}</div>
            </div>
        ) : (
            <CLoading/>
        )}
        {/* {console.log('DepartMentModal',props.showDepartmentModal)}; */}
        {props.showSpecializationModal && !props.isPreviewLoading ? (
            <PreviewDetails
                showModal={props.showSpecializationModal}
                setShowModal={props.setShowModal}
                specializatin={props.subDepartmentPreviewData}
                specializationPreviewErrorMessage={props.specializationPreviewErrorMessage}
            />
        ) : (
            ''
        )}
        {props.deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Specialization?If yes please provide remarks."
                modalHeader="Delete Specialization"
                showModal={props.deleteModalShow}
                setShowModal={props.setShowModal}
                onDeleteRemarksChangeHandler={props.remarksHandler}
                remarks={props.remarks}
                onSubmitDelete={props.onSubmitDelete}
                deleteErrorMessage={props.deleteErrorMsg}
            />
        ) : (
            ''
        )}
    </div>
);
export default memo(SubDepartmentDetailsDataTable);
