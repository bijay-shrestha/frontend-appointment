import React from 'react';
import {CFControl, CPagination, CTable, CLoading, CSelect} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";

const QualificationAliasDataTable = ({tableData}) => {
    const {
        qualificationAliasList,
        isSearchQualificationAliasLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        aliasData,
        handleInputChange,
        handleCancel,
        handleEdit,
        handleSave,
        handleUpdate
    } = tableData;
    return <>
        <div className="manage-details">
            <h5 className="title">Qualification Alias Setup</h5>
            {!isSearchQualificationAliasLoading && !searchErrorMessage && qualificationAliasList.length ?
                (
                    <>
                        <CTable
                            id="qualification-alias"
                            columnDefinition={[
                                {
                                    headerName: 'Name',
                                    field: 'name',
                                    editComponent: prop => <CFControl
                                        id="name"
                                        name='name'
                                        onChange={handleInputChange}
                                        value={aliasData.name}
                                    />,
                                },
                                {
                                    headerName: 'Status',
                                    field: 'status',
                                    editComponent: prop => <CSelect
                                        {...prop}
                                        id="status"
                                        name='status'
                                        options={[
                                            {
                                                label: 'Active', value: 'Y'
                                            },
                                            {
                                                label: 'Inactive', value: 'N'
                                            },
                                        ]}
                                        onChange={handleInputChange}
                                        value={aliasData.status}
                                    />,
                                    displayComponent: prop => <StatusRenderer {...prop}/>
                                },
                            ]}
                            rowData={qualificationAliasList}
                            headerBordered={true}
                            headerClassName="table-header"
                            bodyClassName="table-body"
                            footerClassName="table-footer"
                            onCancel={handleCancel}
                            onEdit={handleEdit}
                            onSave={handleSave}
                            onUpdate={handleUpdate}
                            // onDelete={}
                            // onPreview={}
                        />

                        <CPagination
                            totalItems={totalItems}
                            maxSize={maxSize}
                            currentPage={currentPage}
                            onPageChanged={handlePageChange}
                        />
                    </>
                )
                : !isSearchQualificationAliasLoading && searchErrorMessage ? (
                    <div className="filter-message">
                        <div className="no-data">
                            <i className="fa fa-file-text-o"/>
                        </div>
                        <div className="message"> {searchErrorMessage}</div>
                    </div>
                ) : (
                    <CLoading/>
                )}
        </div>
    </>;
};

export default QualificationAliasDataTable;
