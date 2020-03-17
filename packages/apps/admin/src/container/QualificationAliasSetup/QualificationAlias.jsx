import React from 'react';
import QualificationAliasSetupHOC from "./QualificationAliasSetupHOC";
import QualificationAliasDataTable from "./QualificationAliasDataTable";
import QualificationAliasSearchFilter from "./QualificationAliasSearchFilter";

const QualificationAlias = (props) => {
    const QualificationAlias = QualificationAliasSetupHOC(
        ({
             searchData,
             tableData,
         }) =>
            <>
                <QualificationAliasSearchFilter searchData={searchData}/>
                <QualificationAliasDataTable tableData={tableData}/>
            </>, props, '');
    return <QualificationAlias/>
};

export default QualificationAlias;
