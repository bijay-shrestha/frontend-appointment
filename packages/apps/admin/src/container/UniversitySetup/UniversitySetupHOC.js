import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {UniversitySetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';

const {
    clearSuccessErrorMessageFormStore,
    deleteUniversity,
    editUniversity,
    fetchActiveUniversityForDropdown,
    saveUniversity,
    searchUniversity
} = UniversitySetupMiddleware;

const {
    FETCH_UNIVERSITY_FOR_DROPDOWN,
    DELETE_UNIVERSITY,
    EDIT_UNIVERSITY,
    FETCH_UNIVERSITY_DETAILS_BY_ID,
    SAVE_UNIVERSITY,
    SEARCH_UNIVERSITY
} = AdminModuleAPIConstants.universitySetupApiConstants;

const UniversitySetupHOC = (ComposedComponent, props) => {
    class UniversitySetupHOC extends PureComponent {

        state = {};

        searchUniversities= ()=>{

        }

        render() {
            return <>
                <ComposedComponent
                    {...props}
                />
            </>
        }
    }

    return ConnectHoc(UniversitySetupHOC,
        [
            'UniversitySaveReducer',
            'UniversityEditReducer',
            'UniversityDeleteReducer',
            'UniversitySearchReducer',
            'UniversityPreviewReducer',
            'UniversityDropdownReducer'],
        {
            clearSuccessErrorMessageFormStore,
            deleteUniversity,
            editUniversity,
            fetchActiveUniversityForDropdown,
            saveUniversity,
            searchUniversity
        });
};

export default UniversitySetupHOC;
