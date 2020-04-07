import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {CountryMiddleware, UniversitySetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";

const {
    clearSuccessErrorMessageFormStore,
    deleteUniversity,
    editUniversity,
    fetchActiveUniversityForDropdown,
    saveUniversity,
    searchUniversity
} = UniversitySetupMiddleware;

const {fetchCountryForDropdown} = CountryMiddleware;

const {
    FETCH_UNIVERSITY_FOR_DROPDOWN,
    DELETE_UNIVERSITY,
    EDIT_UNIVERSITY,
    FETCH_UNIVERSITY_DETAILS_BY_ID,
    SAVE_UNIVERSITY,
    SEARCH_UNIVERSITY
} = AdminModuleAPIConstants.universitySetupApiConstants;

const {FETCH_COUNTRY_FOR_DROPDOWN} = AdminModuleAPIConstants.countryApiConstants;

const UniversitySetupHOC = (ComposedComponent, props) => {
    class UniversitySetupHOC extends PureComponent {

        state = {
            address: "",
            country: null,
            name: "",
            status: "Y",
            remarks: "",
            formValid: false,
            searchParameters: {
                country: null,
                university: null,
                status: {value: 'A', label: 'All'},
            },
            queryParams: {
                page: 0,
                size: 10
            },
            totalRecords: 0,
            showAlert: false,
            alertMessageInfo: {
                variant: "",
                message: ""
            },
        };

        alertTimer = '';

        checkFormValidity = () => {
            const {name, address, country, status} = this.state;
            let formValid = name && status && address && country && country.value;
            this.setState({
                formValid: Boolean(formValid)
            })
        };

        fetchUniversityListForDropDown = async () => {
            await this.props.fetchActiveUniversityForDropdown(FETCH_UNIVERSITY_FOR_DROPDOWN);
        };

        fetchCountryListForDropDown = async () => {
            await this.props.fetchCountryForDropdown(FETCH_COUNTRY_FOR_DROPDOWN);
        };

        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event);
        };

        handleInputChange = async (event, fType) => {
            let key = event.target.name;
            let value = event.target.value;
            let label = event.target.label;

            if (fType === 'SEARCH') {
                label ? value ?
                    this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: {value, label}
                        }
                    })
                    : this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: null
                        }
                    })
                    : this.setState({
                        searchParameters: {
                            ...this.state.searchParameters,
                            [key]: value
                            // , [key + "Valid"]: fieldValid
                        }
                    })
            } else {
                label ? (
                        value ?
                            await this.setState({
                                [key]: {value, label}
                            })
                            : await this.setState({
                                [key]: null
                            })
                    )
                    : await this.setState({
                        [key]: value
                        // , [key + "Valid"]: fieldValid
                    });

                this.checkFormValidity();
            }
        };

        handleResetSearchForm = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    country: null,
                    university: null,
                    status: {value: 'A', label: 'All'},
                }
            });
            this.searchUniversities(1);
        };

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            });
            await this.searchUniversities();
        };

        initialApiCalls = async () => {
            await this.fetchUniversityListForDropDown();
            await this.fetchCountryListForDropDown();
        };

        searchUniversities = async (page) => {
            const {searchParameters, queryParams} = this.state;
            const {country, university, status} = searchParameters;
            let requestDTO = {
                countryId: country ? country.value : '',
                universityId: university ? university.value : '',
                status: status && status.value !== 'A' ? status.value : ''
            };

            let updatedPage =
                queryParams.page === 0 ? 1 : (page ? page : queryParams.page);

            try {
                await this.props.searchUniversity(
                    SEARCH_UNIVERSITY,
                    requestDTO,
                    {
                        page: updatedPage,
                        size: queryParams.size
                    });
                await this.setState({
                    totalRecords: this.props.UniversitySearchReducer.universityList.length
                        ? this.props.UniversitySearchReducer.universityList[0].totalItems
                        : 0,
                    queryParams: {
                        ...queryParams,
                        page: updatedPage
                    },
                })
            } catch (e) {

            }

        };

        componentDidMount() {
            this.initialApiCalls();
        }

        render() {

            const {searchParameters} = this.state;

            const {
                isCountryDropdownPending,
                countryList,
                countryDropdownMessage
            } = this.props.CountryDropdownReducer;

            const {isFetchUniversityLoading, activeUniversityForDropdown, dropdownErrorMessage}
                = this.props.UniversityDropdownReducer;

            return <>
                <ComposedComponent
                    {...props}
                    searchParams={{
                        countryList,
                        countryDropdownErrorMessage: countryDropdownMessage,
                        searchParameters,
                        universityList: activeUniversityForDropdown,
                        universityDropdownErrorMessage: dropdownErrorMessage,
                        isCountryDropdownPending,
                        isFetchUniversityLoading,
                        onInputChange: this.handleInputChange,
                        resetSearchForm: this.handleResetSearchForm,
                        handleEnter: this.handleEnter,
                        onSearchClick: this.searchUniversities
                    }}
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
            'UniversityDropdownReducer',
            'CountryDropdownReducer'
        ],
        {
            clearSuccessErrorMessageFormStore,
            deleteUniversity,
            editUniversity,
            fetchActiveUniversityForDropdown,
            saveUniversity,
            searchUniversity,
            fetchCountryForDropdown
        });
};

export default UniversitySetupHOC;
