import React from 'react';
import QualificationAliasSetupHOC from "./QualificationAliasSetupHOC";
import QualificationAliasDataTable from "./QualificationAliasDataTable";
import QualificationAliasSearchFilter from "./QualificationAliasSearchFilter";

const QualificationAlias = (props) => {
    const QualificationAlias = QualificationAliasSetupHOC(
        ({
             filteredAction,
             searchData,
             tableData,
         }) =>
            <>
                <QualificationAliasSearchFilter searchData={searchData}/>
                <QualificationAliasDataTable filteredAction={filteredAction} tableData={tableData}/>
            </>, props, '');
    return <QualificationAlias/>
};

export default QualificationAlias;
