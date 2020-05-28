import {ActionFilterUtils, menuRoles as rolesFromJson} from '@frontend-appointment/helpers'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import React, {memo} from 'react'
import Statuslabel from '../../CommonComponents/table-components/StatusLabel'
import TableAction from '../../CommonComponents/table-components/TableAction'
import {ConfirmDelete, PreviewClientProfileRoles} from "@frontend-appointment/ui-components";

const {checkIfRoleExists} = ActionFilterUtils;

const ProfileDetails = props => (
    <div className="manage-details">
        <h5 className="title">Client Profile Details</h5>
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
                            headerName: 'Client',
                            field: 'hospitalName',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Unit Name',
                            field: 'departmentName',
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
                                },
                                filteredAction: props.filteredActions
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
                        checkIfRoleExists(props.filteredActions, 4) &&
                        props.onPreviewHandler}
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
        {props.deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete this Profile? If yes please provide remarks."
                modalHeader="Delete Profile"
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
        {props.showProfileModal ? (
            <PreviewClientProfileRoles
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
