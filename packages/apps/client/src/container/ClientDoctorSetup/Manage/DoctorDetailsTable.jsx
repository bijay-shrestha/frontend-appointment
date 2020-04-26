import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import {CDoctorNameDisplayForTable, ConfirmDelete} from '@frontend-appointment/ui-components'
import TableAction from '../../CommonComponents/table-components/TableAction';
import StatusLabel from "../../CommonComponents/table-components/StatusLabel";
import PreviewDetails from '../commons/PreviewDetails'
import HospitalPicture from '../commons/HospitalPicture'
import PreviewHandlerHoc from '../../CommonComponents/table-components/hoc/PreviewHandlerHoc'
import {ActionFilterUtils} from '@frontend-appointment/helpers';

const {checkIfRoleExists} = ActionFilterUtils;
const DoctorDetailsDataTable = props => (
    <div className="manage-details">
        {console.log(props.searchData)}
        <h5 className="title">Doctor Details</h5>
        {!props.isSearchLoading &&
        !props.searchErrorMessage &&
        props.searchData.length ? (
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
                            headerName: 'Name',
                            field: 'doctorName',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'doctorNameRenderer'
                        },
                        {
                            headerName: 'Picture',
                            field: 'fileUri',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'imageRenderer'
                        },
                        {
                            headerName: 'Code',
                            field: 'code',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Phone Number',
                            field: 'mobileNumber',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true
                        },
                        {
                            headerName: 'Specialization',
                            field: 'specializationName',
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
                                onClick: function (e, id, type, data) {
                                    type === 'D'
                                        // ? props.filteredActions.find(action => action.id === 5) &&
                                        ? props.onDeleteHandler(id || data)
                                        : type === 'E'
                                        ? props.onEditHandler(id || data)
                                        : props.onPreviewHandler(id || data)
                                },
                                filteredAction: props.filteredActions
                            },
                            cellStyle: {overflow: 'visible', 'z-index': '99'}
                        }
                    ]}
                    frameworkComponents={{
                        childActionRenderer: TableAction,
                        childLabelRenderer: StatusLabel,
                        imageRenderer: PreviewHandlerHoc(HospitalPicture, checkIfRoleExists, props.filteredActions, 4, props.onPreviewHandler),
                        doctorNameRenderer: PreviewHandlerHoc(CDoctorNameDisplayForTable, checkIfRoleExists, props.filteredActions, 4, props.onPreviewHandler)
                    }}
                    defaultColDef={{resizable: true}}
                    getSelectedRows={
                        checkIfRoleExists(props.filteredActions, 4) &&
                        props.onPreviewHandler
                    }
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
                    <i className="fa fa-file-text-o"></i>
                </div>
                <div className="message"> {props.searchErrorMessage}</div>
            </div>
        ) : (
            <CLoading/>
        )}
        {/* {console.log('DepartMentModal',props.showDepartmentModal)}; */}
        {props.showDoctorModal && !props.isPreviewLoading ? (
            <PreviewDetails
                showModal={props.showDoctorModal}
                setShowModal={props.setShowModal}
                doctorData={props.doctorData}
                doctorPreviewErrorMessage={
                    props.doctorPreviewErrorMessage
                }
            />
        ) : (
            ''
        )}
        {props.deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Doctor?If yes please provide remarks."
                modalHeader="Delete Doctor"
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
)
export default memo(DoctorDetailsDataTable)
