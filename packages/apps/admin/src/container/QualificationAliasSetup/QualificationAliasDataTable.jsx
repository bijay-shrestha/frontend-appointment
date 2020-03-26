import React from 'react';
import {CFControl, CPagination, CTable, CLoading, CSelect} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import {ConfirmDelete, CRemarksModal} from "@frontend-appointment/ui-components";

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
        handleUpdate,
        handleUpdateConfirm,
        handleDelete,
        handleDeleteSubmit,
        showEditRemarksModal,
        onRemarksModalClose,
        editErrorMessage,
        formValid,
        deleteErrorMessage,
        showDeleteModal
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
                            rowValid={formValid}
                            rowData={qualificationAliasList}
                            headerBordered={true}
                            headerClassName="table-header"
                            bodyClassName="table-body"
                            footerClassName="table-footer"
                            onCancel={handleCancel}
                            onEdit={handleEdit}
                            onSave={handleSave}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
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

        {showEditRemarksModal ?
            <CRemarksModal
                confirmationMessage="Provide remarks for edit."
                modalHeader="Edit Qualification"
                showModal={showEditRemarksModal}
                onCancel={onRemarksModalClose}
                onRemarksChangeHandler={handleInputChange}
                remarks={aliasData.remarks}
                onPrimaryAction={handleUpdateConfirm}
                primaryActionName={"Confirm"}
                errorMessage={editErrorMessage}
            />
            : ''
        }
        {showDeleteModal ?
            <ConfirmDelete
                confirmationMessage="Are you sure you want to delete the Qualification Alias? If yes please provide remarks."
                modalHeader="Delete Qualification Alias"
                showModal={showDeleteModal}
                setShowModal={onRemarksModalClose}
                onDeleteRemarksChangeHandler={handleInputChange}
                remarks={aliasData.remarks}
                onSubmitDelete={handleDeleteSubmit}
                deleteErrorMessage={deleteErrorMessage}
            />
            : ''
        }
    </>;
};

export default QualificationAliasDataTable;
