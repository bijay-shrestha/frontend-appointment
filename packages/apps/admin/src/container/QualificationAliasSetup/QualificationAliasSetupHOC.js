import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";

const QualificationAliasSetupHOC = (ComposedComponent, props, type) => {
    class QualificationAliasSetup extends PureComponent {
        state = {
            aliasData: {
                id: '',
                name: '',
                status: {value: 'Y', label: 'Active'},
                isNew: true
            },
            qualificationAliasList: [],
            startEditing: false,
            editRowNumber: 0
        };

        handleAddNewRow = () => {
            let aliasList = [...this.state.qualificationAliasList];
            aliasList.unshift(this.state.aliasData);
            this.setState({
                qualificationAliasList: [...aliasList],
                startEditing: true,
                editRowNumber: 0
            });
        };

        searchQualificationAlias = () => {

        };

        render() {

            const {qualificationAliasList, startEditing, editRowNumber} = this.state;
            return <>
                <ComposedComponent
                    tableData={{
                        qualificationAliasList: qualificationAliasList,
                        addNewRow: this.handleAddNewRow,
                        startEditing: startEditing,
                        editRowNumber
                    }}
                />
            </>
        }
    }

    return ConnectHoc(
        QualificationAliasSetup, [], {}
    )
};

export default QualificationAliasSetupHOC;
