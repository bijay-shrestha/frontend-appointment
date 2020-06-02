import React from 'react';
import {CFControl, CPagination, CSelect, CTable} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import {ActionFilterUtils} from "@frontend-appointment/helpers";

const {checkIfRoleExists} = ActionFilterUtils;

const RoomSetupDataTable = ({tableData, filteredAction}) => {
    const {
        billingModeList,
        isSearchRoomNumberLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        billingModeData,
        handleCancel,
        handleEdit,
        handleSave,
        handleUpdate,
        handleDelete,
        formValid,
        isActionComplete,
        changeActionComplete
    } = tableData;
    return <>
        <div className="manage-details editable-table-container">
            <h5 className="title">Billing Mode Setup</h5>
            <CTable
                id="room-setup"
                columnDefinition={[
                    {
                        headerName: 'Name',
                        field: 'name',
                        editComponent: prop => <CFControl
                            id="name"
                            name='name'
                            type="text"
                            reference={prop.reff}
                            defaultValue={billingModeData.name}
                        />,
                    },
                    {
                        headerName: 'Code',
                        field: 'code',
                        editComponent: prop => <CFControl
                            id="code"
                            name='code'
                            type="text"
                            reference={prop.reff}
                            defaultValue={billingModeData.code}
                        />,
                    },
                    {
                        headerName: 'Description',
                        field: 'description',
                        editComponent: prop => <CFControl
                            id="description"
                            name='description'
                            type="text"
                            reference={prop.reff}
                            defaultValue={billingModeData.description}
                        />,
                    },
                    {
                        headerName: 'Status',
                        field: 'status',
                        editComponent: prop => <CSelect
                            {...prop}
                            id="status"
                            name='status'
                            innerRef={prop.reff}
                            options={[
                                {
                                    label: 'Active', value: 'Y'
                                },
                                {
                                    label: 'Inactive', value: 'N'
                                },
                            ]}
                            defaultValue={billingModeData.status}
                        />,
                        displayComponent: prop => <StatusRenderer {...prop}/>
                    }
                ]}
                rowValid={formValid}
                rowData={billingModeList}
                headerBordered={true}
                headerClassName="table-header"
                bodyClassName="table-body"
                footerClassName="table-footer"
                onCancel={handleCancel}
                onEdit={handleEdit}
                saveAction={10}
                updateAction={11}
                deleteAction={13}
                previewAction=""
                onSave={checkIfRoleExists(filteredAction, 10) ? handleSave : ''}
                onUpdate={checkIfRoleExists(filteredAction, 11) ? handleUpdate : ''}
                onDelete={checkIfRoleExists(filteredAction, 13) ? handleDelete : ''}
                // onPreview={},
                isLoading={isSearchRoomNumberLoading}
                errorMessage={searchErrorMessage}
                isActionComplete={isActionComplete}
                changeActionComplete={changeActionComplete}
            />
            {!isSearchRoomNumberLoading && !searchErrorMessage && billingModeList.length ?
                (
                    <CPagination
                        totalItems={totalItems}
                        maxSize={maxSize}
                        currentPage={currentPage}
                        onPageChanged={handlePageChange}
                    />
                ) : ''}
        </div>
    </>;
};

export default RoomSetupDataTable;
