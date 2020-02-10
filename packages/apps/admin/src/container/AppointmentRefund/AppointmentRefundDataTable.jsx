import React, {PureComponent} from 'react'

import {Col, Container, Row, Badge} from 'react-bootstrap'
import {CButton, CDataTable} from '@frontend-appointment/ui-elements'
import './appointment-log.scss'
import TableRefundStatus from '../CommonComponents/table-components/TableRefundStatus'
const AppointmentLogDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    appointmentRefundList,
    searchErrorMessage
  } = tableHandler

  return (
    <>
      <div className="manage-details">
        <Container fluid>
          <Row>
            <Col className="p-0">
              <h5 className="title">Appointment Log Details</h5>
            </Col>
            {/* <Col>
              <CButton
                id="downloadExcel"
                name="DownloadExcel"
                onClickHandler={props.exportExcel}
                className="float-right"
                variant="outline-secondary"
              >
                {' '}
                <i className="fa fa-download" />
              </CButton>
            </Col> */}
          </Row>

          {/* <Row>
            <Col >
            <div className="appointment-badge float-right">
            <span><Badge variant="primary">PA</Badge> : Pending Approval</span>
            <span><Badge variant="success">A</Badge> : Approved</span>
            <span><Badge variant="danger">C</Badge> : Canceled</span>
            <span><Badge variant="warning">RE</Badge> : Rejected</span>
            <span><Badge variant="dark">R</Badge> : Refunded</span>
            </div>
            </Col>
        
            </Row> */}
          <Row>
            <div>
              {!isSearchLoading &&
               !appointmentRefundList &&
               appointmentRefundList.length ? (
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
                        headerName: 'Hospital Name',
                        field: 'name',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Appointment Date',
                        field: 'appointmentDate',
                        // headerClass: "fi",
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true,
                      },
                      {
                        headerName: 'Appointment Number',
                        field: 'appointmentNumber',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Registration Number',
                        field: 'registrationNumber',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      ,
                      {
                        headerName: 'Patient Name',
                        field: 'patientName',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Doctor Name',
                        field: 'doctorName',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Esewa Id',
                        field: 'esewaId',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Transaction Number',
                        field: 'transactionNumber',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Canceled Date',
                        field: 'cancelledDate',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
                      },
                      {
                        headerName: 'Refund Amount',
                        field: 'refundAmount',
                        resizable: true,
                        sortable: true,
                        sizeColumnsToFit: true
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
                              ? // ? props.filteredActions.find(action => action.id === 5) &&
                                props.onDeleteHandler(id)
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
                      childActionRenderer: TableRefundStatus
                    }}
                    defaultColDef={{resizable: true}}
                    // getSelectedRows={
                      
                    //   props.onPreviewHandler
                    // }
                    // rowSelection={'single'}
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
            </div>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AppointmentLogDataTable
