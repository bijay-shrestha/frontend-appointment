import React, {memo} from 'react'
import {
  CDataTable,
  CPagination,
  //CButton,
  CLoading
} from '@frontend-appointment/ui-elements'
import {ConfirmDelete} from '@frontend-appointment/ui-components'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
import TableAction from '../../CommonComponents/table-components/TableAction'
// import StatusLabel from '../../CommonComponents/table-components/StatusLabel'
// import PreviewDetails from '../commons/PreviewDetails'

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
  previewHandler
}) => (
  <div className="manage-details">
    <h5 className="title">Client Api Integration Details</h5>
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
              width: 30
              //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
            },
            {
              headerName: 'Feature Name',
              field: 'featureName',
              // headerClass: "fi",
              resizable: true,
              sortable: true,
              sizeColumnsToFit: true,
              width: 80
            },
            {
              headerName: 'Feature Code',
              field: 'featureCode',
              // headerClass: "fi",
              resizable: true,
              sortable: true,
              sizeColumnsToFit: true,
              width: 60
            },
            {
              headerName: 'Request Method',
              field: 'requestMethod',
              resizable: true,
              sortable: true,
              sizeColumnsToFit: true,
              width: 80
            },
            {
              headerName: 'Url',
              field: 'url',
              resizable: true,
              sortable: true,
              sizeColumnsToFit: true
            },
            // {
            //   headerName: 'Status',
            //   field: 'status',
            //   resizable: true,
            //   sortable: true,
            //   sizeColumnsToFit: true,
            //   cellRenderer: 'childLabelRenderer'
            // },
            {
              headerName: '',
              action: 'action',
              resizable: true,
              sortable: true,
              sizeColumnsToFit: true,
              cellRenderer: 'childActionRenderer',
              cellClass: 'actions-button-cell',
              width: 80,
              cellRendererParams: {
                onClick: function (e, id, type) {
                  return type === 'D'
                    ? deleteHandler(id)
                    : type === 'P'
                    ? previewHandler(id)
                    : ''
                  // //   \? props.onEditHandler(id)
                },
                filteredAction: filteredActions
              },
              cellStyle: {overflow: 'visible', 'z-index': '99'}
            }
          ]}
          frameworkComponents={{
            childActionRenderer: TableAction
            //childLabelRenderer: StatusLabel
          }}
          defaultColDef={{resizable: true}}
          //   getSelectedRows={
          //     checkIfRoleExists(props.filteredActions, 4) &&
          //     props.onPreviewHandler
          //   }
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
      <CLoading />
    )}
    {/* {console.log('DepartMentModal',props.showDepartmentModal)}; */}
    {/* {previewModal ? (
      <PreviewDetails
        showModal={previewModal}
        setShowModal={setCloseModal}
        previewData={previewApiIntegrationData}
      />
    ) : (
      ''
    )} */}
    {deleteModalShow ? (
      <ConfirmDelete
        confirmationMessage="Are you sure you want to delete the Api Integration?If yes please provide remarks."
        modalHeader="Delete Api Interation"
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
