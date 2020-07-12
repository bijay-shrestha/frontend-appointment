import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import {ConfirmDelete, RequestMethodStatus, StatusLabel} from '@frontend-appointment/ui-components'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
import TableAction from '../../CommonComponents/table-components/TableAction'
// import StatusLabel from '../../CommonComponents/table-components/StatusLabel'
import PreviewDetails from './ClientApiDetailsModal'

const {checkIfRoleExists} = ActionFilterUtils

const ClientApiIntegrationDetailsDataTable = ({
                                                  integrationList,
                                                  isSearchLoading,
                                                  searchErrorMessage,
                                                  searchQueryParams,
                                                  onPageChangehandler,
                                                  totalItems,
                                                  setCloseModal,
                                                  deleteApiIntegrationErrorMessage,
                                                  isDeleteApiIntegrationLoading,
                                                  deleteRemarksHandler,
                                                  deleteHandler,
                                                  deleteApiCall,
                                                  deleteRequestDTO,
                                                  deleteModalShow,
                                                  filteredActions,
                                                  previewApiIntegrationData,
                                                  previewModal,
                                                  previewHandler,
                                                  editHandler,
                                                  isRequestBodyByFeatureLoading,
                                                  requestBodyByFeatureErrorMessage
                                              }) => (
    <div className="manage-details">
        <h5 className="title">Client API Integration Details</h5>
        {!isSearchLoading && !searchErrorMessage && integrationList.length ? (
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
                            width: 50
                            //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
                        },
                        {
                            headerName: 'Client',
                            field: 'hospitalName',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            width: 80
                        },
                        {
                            headerName: 'Feature Name',
                            field: 'featureName',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            width: 90
                        },
                        {
                            headerName: 'Feature Code',
                            field: 'featureCode',
                            // headerClass: "fi",
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            width: 70
                        },
                        {
                            headerName: 'Request Method',
                            field: 'requestMethod',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            width: 80,
                            cellRenderer: 'requestMethodRenderer'
                        },
                        {
                            headerName: 'Url',
                            field: 'url',
                            resizable: true,
                            sortable: true,
                            width: 180,
                        },

                        {
                            headerName: 'Integration Channel',
                            field: 'integrationChannel',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'childLabelRenderer',
                            width: 120

                        },
                        {
                            headerName: 'Status',
                            field: 'status',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'statusRenderer',
                            width: 70
                        },
                        {
                            headerName: '',
                            action: 'action',
                            resizable: true,
                            sortable: true,
                            sizeColumnsToFit: true,
                            cellRenderer: 'childActionRenderer',
                            cellClass: 'actions-button-cell',
                            width: 60,
                            cellRendererParams: {
                                onClick: function (e, id, type) {
                                    return type === 'D' ? deleteHandler(id) : editHandler(id)
                                },
                                filteredAction: filteredActions
                            },
                            cellStyle: {overflow: 'visible', 'z-index': '99'}
                        }
                    ]}
                    frameworkComponents={{
                        childActionRenderer: TableAction,
                        requestMethodRenderer: RequestMethodStatus,
                        statusRenderer: StatusLabel
                    }}
                    defaultColDef={{resizable: true}}
                    getSelectedRows={
                        checkIfRoleExists(filteredActions, 4) && previewHandler
                    }
                    rowSelection={'single'}
                    rowData={integrationList}
                />
                <CPagination
                    totalItems={totalItems}
                    maxSize={searchQueryParams.size}
                    currentPage={searchQueryParams.page}
                    onPageChanged={onPageChangehandler}
                />
            </>
        ) : !isSearchLoading && searchErrorMessage ? (
            <div className="filter-message">
                <div className="no-data">
                    <i className="fa fa-file-text-o"></i>
                </div>
                <div className="message"> {searchErrorMessage}</div>
            </div>
        ) : (
            <CLoading/>
        )}
        {/* {console.log('DepartMentModal',props.showDepartmentModal)}; */}
        {previewModal ? (
            <PreviewDetails
                showModal={previewModal}
                setCloseModal={setCloseModal}
                integrationData={previewApiIntegrationData}
                isRequestBodyByFeatureLoading={isRequestBodyByFeatureLoading}
                requestBodyByFeatureErrorMessage={requestBodyByFeatureErrorMessage}
            />
        ) : (
            ''
        )}
        {deleteModalShow ? (
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Client API Integration?If yes please provide remarks."
                modalHeader="Delete Client API Interation"
                showModal={deleteModalShow}
                setShowModal={() => setCloseModal('D')}
                onDeleteRemarksChangeHandler={deleteRemarksHandler}
                remarks={deleteRequestDTO.remarks}
                onSubmitDelete={deleteApiCall}
                deleteErrorMessage={deleteApiIntegrationErrorMessage}
                isLoading={isDeleteApiIntegrationLoading}
                onDeleteHandler={deleteApiCall}
            />
        ) : null}
    </div>
)
export default memo(ClientApiIntegrationDetailsDataTable)
