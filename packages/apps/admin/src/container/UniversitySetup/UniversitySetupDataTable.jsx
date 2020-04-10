import React from 'react';
import {CFControl, CLoading, CPagination, CSelect, CTable} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import {ActionFilterUtils} from "@frontend-appointment/helpers";

const {checkIfRoleExists} = ActionFilterUtils;

const UniversitySetupDataTable = ({tableData, filteredAction}) => {
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
        handleSave,
        handleEdit,
        handleUpdate,
        handleDelete,
        handlePreview,
        formValid,
    } = tableData;
    return <>
        <div className="manage-details">
            <h5 className="title">University Details</h5>
            <CTable
                id="university-setup"
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
                onSave={checkIfRoleExists(filteredAction, 10) ? handleSave : ''}
                onCancel={handleCancel}
                onEdit={handleEdit}
                onUpdate={checkIfRoleExists(filteredAction, 11) ? handleUpdate : ''}
                onDelete={checkIfRoleExists(filteredAction, 13) ? handleDelete : ''}
                onPreview={checkIfRoleExists(filteredAction, 12) ? handlePreview : ''}
                isLoading={isSearchUniversityLoading}
                errorMessage={searchErrorMessage}
            />
            {!isSearchUniversityLoading && !searchErrorMessage && universityList.length ?
                <CPagination
                    totalItems={totalItems}
                    maxSize={maxSize}
                    currentPage={currentPage}
                    onPageChanged={handlePageChange}
                />
                : ''}

        </div>
    </>;
};

export default UniversitySetupDataTable;
