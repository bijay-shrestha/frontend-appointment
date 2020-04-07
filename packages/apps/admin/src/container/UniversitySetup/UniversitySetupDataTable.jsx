import React from 'react';
import {CFControl, CLoading, CPagination, CSelect, CTable} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import {ActionFilterUtils} from "@frontend-appointment/helpers";

const {checkIfRoleExists} = ActionFilterUtils;

const UniversitySetupDataTable = ({tableData,filteredAction}) => {
    const {
        universityList,
        isSearchUniversityLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        universityData,
        countryList,
        handleCancel,
        handleEdit,
        handleSave,
        handleUpdate,
        handleDelete,
        formValid,
    } = tableData;
    return <>
        <div className="manage-details">
            <h5 className="title">University Details</h5>
            {!isSearchUniversityLoading && !searchErrorMessage && universityList.length ?
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
                                        type="text"
                                        reference={prop.reff}
                                        defaultValue={universityData.name}
                                    />,
                                },
                                {
                                    headerName: 'Address',
                                    field: 'address',
                                    editComponent: prop => <CFControl
                                        id="address"
                                        name='address'
                                        type="text"
                                        reference={prop.reff}
                                        defaultValue={universityData.address}
                                    />,
                                },
                                {
                                    headerName: 'Country',
                                    field: 'countryName',
                                    editComponent: prop => <CSelect
                                        id="countryName"
                                        name='countryName'
                                        innerRef={prop.reff}
                                        options={countryList}
                                        defaultValue={universityData.countryName}
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
                                        defaultValue={universityData.status}
                                    />,
                                    displayComponent: prop => <StatusRenderer {...prop}/>
                                }
                            ]}
                            rowValid={formValid}
                            rowData={universityList}
                            headerBordered={true}
                            headerClassName="table-header"
                            bodyClassName="table-body"
                            footerClassName="table-footer"
                            // onCancel={handleCancel}
                            // onEdit={handleEdit}
                            // onSave={checkIfRoleExists(filteredAction, 10) ? handleSave : ''}
                            // onUpdate={checkIfRoleExists(filteredAction, 11) ? handleUpdate : ''}
                            // onDelete={checkIfRoleExists(filteredAction, 13) ? handleDelete : ''}
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
                : !isSearchUniversityLoading && searchErrorMessage ? (
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

export default UniversitySetupDataTable;
