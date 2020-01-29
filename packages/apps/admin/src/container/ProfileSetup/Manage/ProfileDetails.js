import {rolesFromJson} from '@frontend-appointment/commons'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import React, {memo} from 'react'
import PreviewRoles from '../commons/PreviewRoles'
import ConfirmDelete from './comp/ConfirmDelete'
import Statuslabel from './comp/StatusLabel'
import TableAction from './comp/TableAction'

const ProfileDetails = props => (
    <div className="manage-details">
        <h5 className="title">Profile Details</h5>
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
                            headerName: 'Profile Name',
                            field: 'name',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Sub Department',
                            field: 'subDepartmentName',
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
                                        ? props.onDeleteHandler(id)
                                        : type === 'E'
                                        ? props.onEditHandler(id)
                                        : props.onPreviewHandler(id)
                                }
                            },
                            cellStyle: {overflow: 'visible', 'z-index': '99'}
                        }
                    ]}
                    frameworkComponents={{
                        childActionRenderer: TableAction,
                        childLabelRenderer: Statuslabel
                    }}
                    defaultColDef={{resizable: true}}
                    getSelectedRows={props.onPreviewHandler}
                    rowSelection={'single'}
                    setShowModal={props.setShowModal} // {this.showModal}
                    rowData={props.searchData}
                />
                {console.log(props.totalItems)}
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
        {props.deleteModalShow ? (
            <ConfirmDelete
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
        {props.showProfileModal ? (
            <PreviewRoles
                showModal={props.showProfileModal}
                setShowModal={props.setShowModal}
                profileData={props.profileData}
                profilePreviewErrorMessage={props.profilePreviewErrorMessage}
                profilePreviewLoading={props.profilePreviewLoading}
                rolesJson={rolesFromJson}
            />
        ) : (
            ''
        )}
    </div>
);
export default memo(ProfileDetails)
