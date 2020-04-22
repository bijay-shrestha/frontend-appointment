import React from 'react'
import {CFControl, CPagination, CSelect, CTable, CToggle} from '@frontend-appointment/ui-elements'
import StatusRenderer from '../CommonComponents/table-components/StatusRenderer'
import {ActionFilterUtils} from '@frontend-appointment/helpers'
import IsEditableRenderer from "./IsEditableRenderer";

const {checkIfRoleExists} = ActionFilterUtils;

const AppointmentModeDataTable = ({tableData, filteredAction}) => {
    const {
        appointmentModeList,
        isSearchAppointmentModeLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        appointmentModeData,
        handleCancel,
        handleSave,
        handleEdit,
        handleUpdate,
        handleDelete,
        handlePreview,
        formValid,
        isActionComplete,
        changeActionComplete
    } = tableData;
    return (
        <>
            <div className="manage-details editable-table-container">
                <h5 className="title">Appointment Mode Details</h5>
                <CTable
                    id="university-setup"
                    columnDefinition={[
                        {
                            headerName: 'Name',
                            field: 'name',
                            editComponent: prop => (
                                <CFControl
                                    id="name"
                                    name="name"
                                    type="text"
                                    reference={prop.reff}
                                    defaultValue={appointmentModeData.name}
                                />
                            )
                        },
                        {
                            headerName: 'Code',
                            field: 'code',
                            editComponent: prop => (
                                <CFControl
                                    id="code"
                                    name="code"
                                    type="text"
                                    reference={prop.reff}
                                    defaultValue={appointmentModeData.code}
                                />
                            )
                        },
                        {
                            headerName: 'Status',
                            field: 'status',
                            editComponent: prop => (
                                <CSelect
                                    {...prop}
                                    id="status"
                                    name="status"
                                    innerRef={prop.reff}
                                    options={[
                                        {
                                            label: 'Active',
                                            value: 'Y'
                                        },
                                        {
                                            label: 'Inactive',
                                            value: 'N'
                                        }
                                    ]}
                                    defaultValue={appointmentModeData.status}
                                />
                            ),
                            displayComponent: prop => <StatusRenderer {...prop} />
                        }
                    ]}
                    rowValid={formValid}
                    rowData={appointmentModeList}
                    headerBordered={true}
                    headerClassName="table-header"
                    bodyClassName="table-body"
                    footerClassName="table-footer"
                    saveAction={10}
                    updateAction={11}
                    deleteAction={13}
                    previewAction={12}
                    onSave={checkIfRoleExists(filteredAction, 10) ? handleSave : ''}
                    onCancel={handleCancel}
                    onEdit={handleEdit}
                    onUpdate={checkIfRoleExists(filteredAction, 11) ? handleUpdate : ''}
                    onDelete={checkIfRoleExists(filteredAction, 13) ? handleDelete : ''}
                    onPreview={checkIfRoleExists(filteredAction, 12) ? handlePreview : ''}
                    isLoading={isSearchAppointmentModeLoading}
                    errorMessage={searchErrorMessage}
                    isActionComplete={isActionComplete}
                    changeActionComplete={changeActionComplete}
                />
                {!isSearchAppointmentModeLoading &&
                !searchErrorMessage &&
                appointmentModeList.length ? (
                    <CPagination
                        totalItems={totalItems}
                        maxSize={maxSize}
                        currentPage={currentPage}
                        onPageChanged={handlePageChange}
                    />
                ) : (
                    ''
                )}
            </div>
        </>
    )
}

export default AppointmentModeDataTable
