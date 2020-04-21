import React from 'react';
import {CFControl, CPagination, CSelect, CTable} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import {ActionFilterUtils} from "@frontend-appointment/helpers";

const {checkIfRoleExists} = ActionFilterUtils;

const QualificationAliasDataTable = ({tableData, filteredAction}) => {
    const {
        qualificationAliasList,
        isSearchQualificationAliasLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        aliasData,
        handleCancel,
        handleEdit,
        handleSave,
        handleUpdate,
        handleDelete,
        formValid,
    } = tableData;
    return <>
        <div className="manage-details">
            <h5 className="title">Qualification Alias Setup</h5>
            <CTable
                id="qualification-alias"
                columnDefinition={[
                    {
                        headerName: 'Name',
                        field: 'name',
                        editComponent: prop => <CFControl
                            id="name"
                            name='name'
                            type="text"
                            reference={prop.reff}
                            defaultValue={aliasData.name}
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
                            defaultValue={aliasData.status}
                        />,
                        displayComponent: prop => <StatusRenderer {...prop}/>
                    }
                ]}
                rowValid={formValid}
                rowData={qualificationAliasList}
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
                isLoading={isSearchQualificationAliasLoading}
                errorMessage={searchErrorMessage}
            />
            {!isSearchQualificationAliasLoading && !searchErrorMessage && qualificationAliasList.length ?
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

export default QualificationAliasDataTable;
