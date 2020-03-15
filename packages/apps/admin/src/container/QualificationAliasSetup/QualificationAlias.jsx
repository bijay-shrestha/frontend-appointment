import React from 'react';
import QualificationAliasSetupHOC from "./QualificationAliasSetupHOC";
import QualificationAliasDataTable from "./QualificationAliasDataTable";

const QualificationAlias = (props) => {
    const QualificationAlias = QualificationAliasSetupHOC(
        ({tableData}) =>
            <>
                <QualificationAliasDataTable tableData={tableData}/>
            </>, props, '');
    return <QualificationAlias/>
};

export default QualificationAlias;
