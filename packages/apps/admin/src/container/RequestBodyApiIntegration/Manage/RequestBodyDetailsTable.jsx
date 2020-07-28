import React, {memo} from 'react'
import {
    CDataTable,
    CPagination,
    //CButton,
    CLoading
} from '@frontend-appointment/ui-elements'
import {ConfirmDelete, StatusLabel, TableAction} from '@frontend-appointment/ui-components'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
import PreviewDetails from '../commons/PreviewDetails'

const {checkIfRoleExists} = ActionFilterUtils

const RequestBodyDetailsTable = ({
                                     showRequestBodyModal,
                                     filteredActions,
                                     totalRecords,
                                     deleteModalShow,
                                     deleteRequestDTO,
                                     pageChangeHandler,
                                     isSearchRequestBodyLoading,
                                     searchRequestBodyData,
                                     searchRequestBodyMessageError,
                                     isPreviewRequestBodyIntegrationLoading,
                                     previewRequestBodyIntegrationData,
                                     previewRequestIntegrationErorrMessage,
                                     isDeleteRequestBodyIntegrationLoading,
                                     deleteRequestBodyIntegrationErrorMessage,
                                     onEditHandler,
                                     onPreviewHandler,
                                     onDeleteHandler,
                                     queryParams,
                                     setShowModal,
                                     submitDelete,
                                     remarksHandler
                                 }) => (
    <div className="manage-details">
        <h5 className="title">Request Body Details</h5>
        {/* <CButton
      id="downloadExcel"
      name="DownloadExcel"
      onClickHandler={props.exportExcel}
      disabled={
        !props.isSearchLoading &&
        !props.searchErrorMessage &&
        props.searchData.length
          ? false
          : true
      }
      className="float-right p-2"
      variant="info"
    /> */}
        {!isSearchRequestBodyLoading &&
        !searchRequestBodyMessageError &&
        searchRequestBodyData.length ? (
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
                            cellClass: 'first-class',
                            width: 90

                            //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
                        },
                        {
                            headerName: 'Feature Type',
                            field: 'featureName',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,

                        },
                        {
                            headerName: 'Request Body',
                            field: 'requestBody',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            width: 420,
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
                            width: 120,
                            cellRendererParams: {
                                onClick: function (e, id, type,data) {
                                    type === 'D'
                                        // ? props.filteredActions.find(action => action.id === 5) &&
                                        ? onDeleteHandler(id)
                                        : type === 'E'
                                        ? onEditHandler(data)
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
                    getSelectedRows={
                        checkIfRoleExists(filteredActions, 4) &&
                        onPreviewHandler
                    }
                    rowSelection={'single'}
                    setShowModal={setShowModal} // {this.showModal}
                    rowData={searchRequestBodyData}
                />
                <CPagination
                    totalItems={totalRecords}
                    maxSize={queryParams.size}
                    currentPage={queryParams.page}
                    onPageChanged={pageChangeHandler}
                />
            </>
        ) : !isSearchRequestBodyLoading && searchRequestBodyMessageError ? (
            <div className="filter-message">
                <div className="no-data">
                    <i className="fa fa-file-text-o"></i>
                </div>
                <div className="message"> {searchRequestBodyMessageError}</div>
            </div>
        ) : (
            <CLoading/>
        )}
        {/* {console.log('DepartMentModal',props.showDepartmentModal)}; */}
        {showRequestBodyModal && !isPreviewRequestBodyIntegrationLoading ? (
            <PreviewDetails
                showModal={showRequestBodyModal}
                setShowModal={setShowModal}
                requestBodyData={previewRequestBodyIntegrationData}
                requestBodyErrorMessage={
                    previewRequestIntegrationErorrMessage
                }
            />
        ) : (
            ''
        )}
        {deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Request Body?If yes please provide remarks."
                modalHeader="Delete Request Body"
                showModal={deleteModalShow}
                setShowModal={setShowModal}
                onDeleteRemarksChangeHandler={remarksHandler}
                remarks={deleteRequestDTO.remarks}
                onSubmitDelete={submitDelete}
                deleteErrorMessage={deleteRequestBodyIntegrationErrorMessage}
            />
        ) : (
            ''
        )}
    </div>
)
export default memo(RequestBodyDetailsTable)
