import React, {memo} from 'react'
import {
  CDataTable,
  CPagination,
  //CButton,
  CLoading
} from '@frontend-appointment/ui-elements'
// import {ConfirmDelete} from '@frontend-appointment/ui-components'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
// import TableAction from '../../CommonComponents/table-components/TableAction'
// import StatusLabel from '../../CommonComponents/table-components/StatusLabel'
// import PreviewDetails from '../commons/PreviewDetails'

const {checkIfRoleExists} = ActionFilterUtils

const ClientApiIntegrationDetailsDataTable = ({
  integrationList,
  isSearchLoading,
  searchErrorMessage,
  searchQueryParams,
  onPageChangehandler,
  totalItems
}) => (
  <div className="manage-details">
    <h5 className="title">Client Api Integration Details</h5>
    {!isSearchLoading &&
    !searchErrorMessage &&
    integrationList.length ? (
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
              headerName: 'Client Name',
              field: 'hospitalName',
              // headerClass: "fi",
              resizable: true,
              sortable: true,
              sizeColumnsToFit: true
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
            // {
            //   headerName: 'Status',
            //   field: 'status',
            //   resizable: true,
            //   sortable: true,
            //   sizeColumnsToFit: true,
            //   cellRenderer: 'childLabelRenderer'
            // },
            // {
            //   headerName: '',
            //   action: 'action',
            //   resizable: true,
            //   sortable: true,
            //   sizeColumnsToFit: true,
            //   cellRenderer: 'childActionRenderer',
            //   cellClass: 'actions-button-cell',
            //   cellRendererParams: {
            //     onClick: function (e, id, type) {
            //       type === 'D'
            //         ? // ? props.filteredActions.find(action => action.id === 5) &&
            //           props.onDeleteHandler(id)
            //         : type === 'E'
            //         ? props.onEditHandler(id)
            //         : props.onPreviewHandler(id)
            //     },
            //     filteredAction: props.filteredActions
            //   },
            //   cellStyle: {overflow: 'visible', 'z-index': '99'}
            // }
          ]}
        //   frameworkComponents={{
        //     childActionRenderer: TableAction,
        //     childLabelRenderer: StatusLabel
        //   }}
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
    {/* {props.showSpecializationModal && !props.isPreviewLoading ? (
      <PreviewDetails
        showModal={props.showSpecializationModal}
        setShowModal={props.setShowModal}
        specializationData={props.specializationData}
        specializationPreviewErrorMessage={
          props.specializationPreviewErrorMessage
        }
      />
    ) : (
      ''
    )} */}
    {/* {props.deleteModalShow ? (
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
      '' */}
   
  </div>
)
export default memo(ClientApiIntegrationDetailsDataTable)
