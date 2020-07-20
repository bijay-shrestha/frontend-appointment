import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {CompanySetupMiddleware, MinioMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {EnterKeyPressUtils, FileUploadLocationUtils} from '@frontend-appointment/helpers'
import './companyHoc.scss'

const {
    companyDelete,
    companyDropdown,
    previewCompany,
    saveCompany,
    searchCompany,
    updateCompany,
    clearMessages
} = CompanySetupMiddleware

const {uploadImageInMinioServer} = MinioMiddleware

const {
    DELETE_COMPANY,
    DROPDOWN_COMPANY,
    PREVIEW_COMPANY,
    SAVE_COMPANY,
    SEARCH_COMPANY,
    UPDATE_COMPANY
} = AdminModuleAPIConstants.CompanyApiConstant

const CompanyHOC = (ComposedComponent, props, type) => {
    class CompanySetup extends React.PureComponent {
        state = {
            companyData: {
                id: '',
                name: '',
                address: '',
                panNumber: '',
                status: 'Y',
                companyCode: '',
                companyLogo: null,
                companyLogoUrl: '',
                companyLogoUrlNew: '',
                companyBanner: null,
                companyBannerUrl: '',
                contactNumber: [''],
                isCompany: '',
                alias: '',
                contactNumberUpdateRequestDTOS: [],
                editContactNumberRequestDTOS: []
            },
            formValid: false,
            nameValid: false,
            codeValid: false,
            logoValid: false,
            contactLength: 5,
            showConfirmModal: false,
            errorMessageForCompanyName:
                'Company Name should not contain special characters',
            errorMessageForCompanyCode:
                'Company Code should not contain special characters',
            showAlert: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
            showCompanyModal: false,
            showEditModal: false,
            deleteModalShow: false,
            searchParameters: {
                name: '',
                companyCode: '',
                status: {value: '', label: 'All'}
            },
            queryParams: {
                page: 0,
                size: 10
            },
            deleteRequestDTO: {
                id: 0,
                remarks: '',
                status: 'D'
            },
            totalRecords: 0,
            companyImage: '',
            companyImageCroppedUrl: '',
            companyFileCropped: '',
            companyBannerImage: '',
            companyBannerImageCroppedUrl: '',
            companyBannerFileCropped: '',
            showImageUploadModal: false,
            showBannerUploadModal: false,
            isImageUploading: false,
            errorMessage: ''
        }

        resetCompanyStateValues = () => {
            this.setState({
                companyData: {
                    id: '',
                    name: '',
                    address: '',
                    panNumber: '',
                    status: 'Y',
                    companyCode: '',
                    companyLogo: null,
                    companyLogoUrl: '',
                    contactNumber: [''],
                    contactNumberUpdateRequestDTOS: [],
                    editContactNumberRequestDTOS: [],
                    alias: ''
                },
                companyImage: '',
                companyImageCroppedUrl: '',
                companyFileCropped: '',
                formValid: false,
                nameValid: false,
                codeValid: false,
                showEditModal: false,
                errorMessage: ''
            })
        }

        setShowModal = () => {
            this.setState({
                showCompanyModal: false,
                deleteModalShow: false,
                showEditModal: false
            })
        }

        setTheState = async (fieldName, valueToChange, valid, eventName, value) => {
            await this.setState(
                this.checkInputValidity(
                    fieldName,
                    valueToChange,
                    valid,
                    eventName,
                    value
                )
            )
        }

        setShowConfirmModal = () => {
            this.setState({showConfirmModal: !this.state.showConfirmModal})
        }

        setImageShowModal = () =>
            this.setState({showImageUploadModal: !this.state.showImageUploadModal})

        setShowBannerModal = () =>
            this.setState({showBannerUploadModal: !this.state.showBannerUploadModal})

        setStateValuesForSearch = searchParams => {
            this.setState({
                searchParameters: searchParams
            })
        }

        setFormValidManage = () => {
            this.setState({
                formValid: true
            })
        }

        setImageLoading = (value) => {
            this.setState({
                isImageUploading: value
            })
        }

        checkInputValidity = (
            fieldName,
            valueToChange,
            valid,
            eventName,
            value
        ) => {
            let stateObj = {[fieldName]: valueToChange}
            if (eventName === 'companyCode') stateObj[fieldName]['alias'] = value
            if (eventName)
                if (eventName === 'name') stateObj = {...stateObj, nameValid: valid}
            return {...stateObj}
        }

        closeAlert = () => {
            this.props.clearMessages()
            this.setState({
                showAlert: !this.state.showAlert,
                alertMessageInfo: ''
            })
        }

        checkFormValidity = eventType => {
            const {companyData} = this.state
            const {name, status, companyCode, address, panNumber} = companyData
            let formValidity =
                // nameValid &&
                name && status && companyCode && address && panNumber

            if (eventType === 'E')
                formValidity =
                    formValidity &&
                    companyData.remarks &&
                    companyData.contactNumberUpdateRequestDTOS &&
                    companyData.contactNumberUpdateRequestDTOS.length
            else
                formValidity =
                    formValidity &&
                    companyData.contactNumber &&
                    companyData.contactNumber[0]

            this.setState({
                formValid: formValidity
            })
        }

        addContactNumber = (fieldName, value, eventType) => {
            let companyData = {...this.state.companyData}
            companyData[fieldName].push(value)
            //ompanyData['editContactNumberRequestDTOS'].push(value)
            this.setTheState('companyData', companyData)
            this.checkFormValidity(eventType)
        }

        removeContactNumber = (fieldName, idx, eventType) => {
            let companyData = {...this.state.companyData}
            companyData[fieldName].splice(idx, 1)
            //   if (eventType === 'E')
            //     companyData['editContactNumberRequestDTOS'][idx]['status'] = 'N'
            this.setTheState('companyData', companyData)
            this.checkFormValidity(eventType)
        }

        editContactNumber = (fieldName, value, idx, eventType) => {
            let companyData = {...this.state.companyData}
            companyData[fieldName][idx] = value
            // companyData['editContactNumberRequestDTOS'][idx] = value
            this.setTheState('companyData', companyData)
            this.checkFormValidity(eventType)
        }

        previewApiCall = async id => {
            await this.props.previewCompany(PREVIEW_COMPANY, id)
        }

        onPreviewHandler = async id => {
            try {
                await this.previewApiCall(id)
                this.setState({
                    showCompanyModal: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.companyPreviewReducer.companyPreviewErrorMessage
                    }
                })
            }
        }

        onEditHandler = async idSelected => {
            this.props.clearMessages()
            try {
                await this.previewApiCall(idSelected)
                const {
                    id,
                    name,
                    status,
                    // remarks,
                    panNumber,
                    address,
                    contactNumberResponseDTOS,
                    companyCode,
                    companyLogo,
                    alias
                } = this.props.companyPreviewReducer.companyPreviewData
                // let formValid = this.state.formValid
                // if (remarks) formValid = true
                this.setState({
                    showEditModal: true,
                    companyData: {
                        id: id,
                        name: name,
                        status: status,
                        panNumber: panNumber,
                        address: address,
                        companyCode: companyCode,
                        remarks: '',
                        alias: alias,
                        contactNumberUpdateRequestDTOS: [...contactNumberResponseDTOS],
                        editContactNumberRequestDTOS: [...contactNumberResponseDTOS],
                        companyLogoUrl: companyLogo,
                        companyLogoUrlNew: '',
                        companyLogo: new File([5120], companyLogo),
                        companyImage: new File([5120], companyLogo),
                        companyImageCroppedUrl: companyLogo
                    },
                    formValid: false,
                    nameValid: true
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.companyPreviewReducer.companyPreviewErrorMessage
                    }
                })
            }
        }

        filterOutContactNumber = contactNumber => {
            let filteredContactNumber = []

            const newContactNumber = [
                ...this.state.companyData.editContactNumberRequestDTOS
            ]
            newContactNumber.map(contactEdit => {
                let flag = false
                for (let i = 0; i < contactNumber.length; i++) {
                    if (
                        Number(contactEdit.companyContactNumberId) ===
                        Number(contactNumber[i].companyContactNumberId)
                    ) {
                        filteredContactNumber.push(contactEdit)
                        flag = true
                        break
                    }
                }
                if (!flag) {
                    filteredContactNumber.push({...contactEdit, status: 'N'})
                }
                return contactEdit
            })
            contactNumber.map(cont => {
                if (!cont.companyContactNumberId && cont.contactNumber.length)
                    filteredContactNumber.push(cont)
                return cont
            })
            return filteredContactNumber
        }

        editCompany = async () => {
            const {
                name,
                status,
                companyLogo,
                address,
                panNumber,
                companyCode,
                contactNumberUpdateRequestDTOS,
                //editContactNumberRequestDTOS,
                remarks,
                alias,
                id,
                companyLogoUrlNew
            } = this.state.companyData
            let companyData = {
                id,
                name,
                status,
                contactNumberUpdateRequestDTOS: this.filterOutContactNumber(
                    contactNumberUpdateRequestDTOS
                ),
                remarks,
                address,
                panNumber,
                companyCode,
                alias,
                isLogoUpdate: companyLogoUrlNew ? 'Y' : 'N'
            }

            // let formData = new FormData()
            // companyLogoUrlNew &&
            // formData.append(
            //     'logo',
            //     new File([companyLogo], name.concat('-picture.jpeg'))
            // )

            let imagePathLogo = ''
            try {
                if (companyLogoUrlNew) {
                    this.setImageLoading(true)
                    imagePathLogo = await this.uploadImageToServer(companyLogo, "logo");
                    this.setImageLoading(false)
                }
                await this.props.updateCompany(UPDATE_COMPANY, {...companyData, companyLogo: imagePathLogo})
                this.resetCompanyStateValues()
                this.setState({
                    errorMessage: '',
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.companyUpdateReducer.companyEditSuccessMessage
                    }
                })
                await this.searchCompany()
            } catch (e) {
                this.setState({
                    errorMessage: e.errorMessage ? e.errorMessage : "Error updating Company.",
                    isImageUploading: false
                })
            }
        }

        searchCompany = async page => {
            const {companyCode, name, status} = this.state.searchParameters
            let searchData = {
                companyId: name ? name.value : '',
                companyCode: companyCode,
                status: status.value === 'A' ? '' : status.value
            }

            let updatedPage =
                this.state.queryParams.page === 0
                    ? 1
                    : page
                    ? page
                    : this.state.queryParams.page
            try {
                await this.props.searchCompany(
                    SEARCH_COMPANY,
                    {
                        page: updatedPage,
                        size: this.state.queryParams.size
                    },
                    searchData
                )
                await this.setState({
                    totalRecords: this.props.companySearchReducer.companySearchData.length
                        ? this.props.companySearchReducer.companySearchData[0].totalItems
                        : 0,
                    queryParams: {
                        ...this.state.queryParams,
                        page: updatedPage
                    }
                })
            } catch (e) {

            }
        }

        appendSNToTable = companyList => {
            const companyLists =
                companyList.length &&
                companyList.map((spec, index) => ({
                    ...spec,
                    sN: index + 1
                }))
            return companyLists
        }

        onDeleteHandler = async id => {
            this.props.clearMessages()
            let deleteRequestDTO = {...this.state.deleteRequestDTO}
            deleteRequestDTO['id'] = id
            await this.setState({
                deleteRequestDTO: deleteRequestDTO,
                deleteModalShow: true
            })
        }

        deleteRemarksHandler = event => {
            const {name, value} = event.target
            let deleteRequest = {...this.state.deleteRequestDTO}
            deleteRequest[name] = value
            this.setState({
                deleteRequestDTO: deleteRequest
            })
        }

        onSubmitDeleteHandler = async () => {
            try {
                await this.props.companyDelete(
                    DELETE_COMPANY,
                    this.state.deleteRequestDTO
                )
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.companyDeleteReducer.companyDeleteSuccessMessage
                    },
                    showAlert: true
                })
                await this.searchCompany()
            } catch (e) {
                this.setState({
                    deleteModalShow: true
                })
            }
        }

        handleEnterPress = event => {
            EnterKeyPressUtils.handleEnter(event)
        }

        handleSearchFormChange = async event => {
            if (event) {
                let fieldName = event.target.name
                let value = event.target.value
                let label = event.target.label
                let searchParams = {...this.state.searchParameters}
                searchParams[fieldName] = label ? (value ? {value, label} : '') : value
                await this.setStateValuesForSearch(searchParams)
            }
        }

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    hospitalCode: '',
                    status: {value: '', label: 'All'},
                    name: ''
                }
            })
            this.searchCompany()
        }

        handlePageChange = async newPage => {
            await this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: newPage
                }
            })
            this.searchCompany()
        }

        handleImageSelect = imageUrl => {
            imageUrl && this.setState({companyImage: imageUrl})
        }

        handleCropImage = croppedImageUrl => {
            croppedImageUrl &&
            this.setState({
                companyImageCroppedUrl: croppedImageUrl
            })
        }

        handleImageUpload = async croppedImageFile => {
            let croppedImage = this.state.companyImageCroppedUrl
            let companyImage = {...this.state.companyData}
            companyImage.companyLogo = new File(
                [croppedImageFile],
                'hospitalAvatar.jpeg'
            )
            if (type === 'M') {
                companyImage.companyLogoUrlNew = croppedImage
            } else {
                companyImage.companyLogoUrl = croppedImage
            }

            await this.setState({
                companyData: {...companyImage},
                showImageUploadModal: false
            })
        }

        // handleBannerSelect = imageUrl => {
        //   imageUrl && this.setState({hospitalBannerImage: imageUrl})
        // }

        // handleCropBannerImage = croppedImageUrl => {
        //   croppedImageUrl &&
        //     this.setState({
        //       hospitalBannerImageCroppedUrl: croppedImageUrl
        //     })
        // }

        // handleBannerImageUpload = async croppedImageFile => {
        //   let croppedImage = this.state.hospitalBannerImageCroppedUrl
        //   let hospitalImage = {...this.state.hospitalData}
        //   hospitalImage.hospitalBanner = new File(
        //     [croppedImageFile],
        //     'hospitalBanner.jpeg'
        //   )
        //   hospitalImage.hospitalBannerUrl = croppedImage
        //   await this.setState({
        //     hospitalData: {...hospitalImage},
        //     showBannerUploadModal: false
        //   })
        // }

        handleConfirmClick = async () => {
            const {
                name,
                status,
                contactNumber,
                address,
                panNumber,
                companyCode,
                alias,
                companyLogo
            } = this.state.companyData

            let companyData = {
                name,
                status,
                contactNumber,
                address,
                panNumber,
                companyCode,
                alias
            }

            let imagePathLogo = ''
            try {
                if (companyLogo) {
                    this.setImageLoading(true)
                    imagePathLogo = await this.uploadImageToServer(companyLogo, "logo");
                    this.setImageLoading(false)
                }
                await this.props.saveCompany(SAVE_COMPANY, {...companyData, companyLogo: imagePathLogo})

                await this.setShowConfirmModal()
                this.resetCompanyStateValues()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.companySaveReducer.companySaveSuccessMessage
                    }
                })
            } catch (e) {
                await this.setShowConfirmModal()
                this.setState({
                    isImageUploading: false,
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage ? e.errorMessage : e.message
                    }
                })
            }
        }

        handleOnChange = async (event, fieldValid, eventType) => {
            let company = {...this.state.companyData}
            let {name, value, label, type} = event.target

            value =
                name === 'companyCode'
                    ? value.toUpperCase()
                    : type === 'checkbox'
                    ? event.target.checked
                        ? 'Y'
                        : 'N'
                    : value

            company[name] = !label
                ? value
                : value
                    ? {value: value, label: label}
                    : {value: null}
            await this.setTheState('companyData', company, fieldValid, name, value)

            this.checkFormValidity(eventType)
        }

        fetchCompanyForDropdown = async () => {
            await this.props.companyDropdown(DROPDOWN_COMPANY)
        }

        uploadImageToServer = async (imageToUpload, imageType) => {
            const {
                companyCode,
                name
            } = this.state.companyData;

            let fileToUpload = new File([imageToUpload], (name + new Date().getTime()).concat('.jpeg'))
            let fileLocation = FileUploadLocationUtils.getLocationPathForCompanyImageUpload(companyCode, imageType)

            return await uploadImageInMinioServer(fileToUpload, fileLocation)
        }

        async componentDidMount() {
            if (type === 'M') {
                this.fetchCompanyForDropdown()
                await this.searchCompany()
                //await this.searchHospitalForDropDown()
            }
        }

        render() {
            const {
                companyData,
                showAlert,
                showConfirmModal,
                formValid,
                codeValid,
                nameValid,
                errorMessageForCompanyCode,
                errorMessageForCompanyName,
                alertMessageInfo,
                showCompanyModal,
                showEditModal,
                deleteModalShow,
                searchParameters,
                queryParams,
                deleteRequestDTO,
                totalRecords,
                contactLength,
                companyImage,
                companyImageCroppedUrl,
                companyFileCropped,
                showImageUploadModal,
                errorMessage,
                isImageUploading
            } = this.state

            const {
                isCompanySearchLoading,
                companySearchData,
                companySearchErrorMessage
            } = this.props.companySearchReducer

            const {
                isCompanyPreviewLoading,
                companyPreviewData,
                companyPreviewErrorMessage
            } = this.props.companyPreviewReducer

            const {companyEditErrorMessage, isCompanyEditLoading} = this.props.companyUpdateReducer

            const {companyDeleteErrorMessage} = this.props.companyDeleteReducer
            const {
                isCompanyDropdownLoading,
                companyDropdownData,
                companyDropdownErrorMessage
            } = this.props.companyDropdownReducer

            const {isCompanySaveLoading} = this.props.companySaveReducer;

            console.log("SEARCH ERROR", companySearchErrorMessage);

            //   const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

            return (
                <ComposedComponent
                    {...this.props}
                    {...props}
                    handleEnter={this.handleEnterPress}
                    companyData={companyData}
                    resetStateAddValues={this.resetCompanyStateValues}
                    closeAlert={this.closeAlert}
                    showConfirmModal={showConfirmModal}
                    formValid={formValid}
                    showAlert={showAlert}
                    codeValid={codeValid}
                    nameValid={nameValid}
                    errorMessageForHospitalCode={errorMessageForCompanyCode}
                    errorMessageForHospitalName={errorMessageForCompanyName}
                    alertMessageInfo={alertMessageInfo}
                    handleInputChange={this.handleOnChange}
                    submitAddChanges={this.handleConfirmClick}
                    setShowConfirmModal={this.setShowConfirmModal}
                    handleSearchFormChange={this.handleSearchFormChange}
                    deleteRemarksHandler={this.deleteRemarksHandler}
                    resetSearch={this.handleSearchFormReset}
                    searchCompany={this.searchCompany}
                    handlePageChange={this.handlePageChange}
                    onSubmitDeleteHandler={this.onSubmitDeleteHandler}
                    editCompany={this.editCompany}
                    onEditHandler={this.onEditHandler}
                    onDeleteHandler={this.onDeleteHandler}
                    onPreviewHandler={this.onPreviewHandler}
                    setShowModal={this.setShowModal}
                    showCompanyModal={showCompanyModal}
                    showEditModal={showEditModal}
                    deleteModalShow={deleteModalShow}
                    searchParameters={searchParameters}
                    queryParams={queryParams}
                    deleteRequestDTO={deleteRequestDTO}
                    totalRecords={totalRecords}
                    isSearchLoading={isCompanySearchLoading}
                    companyList={companySearchData}
                    searchErrorMessage={companySearchErrorMessage}
                    companyPreviewErrorMessage={companyPreviewErrorMessage}
                    deleteErrorMessage={companyDeleteErrorMessage}
                    companyEditErrorMessage={companyEditErrorMessage || errorMessage}
                    isPreviewLoading={isCompanyPreviewLoading}
                    companyPreviewData={companyPreviewData}
                    addContactNumber={this.addContactNumber}
                    removeContactNumber={this.removeContactNumber}
                    editContactNumber={this.editContactNumber}
                    contactLength={contactLength}
                    companyImage={companyImage}
                    onImageSelect={this.handleImageSelect}
                    companyImageCroppedUrl={companyImageCroppedUrl}
                    companyFileCropped={companyFileCropped}
                    showImageUploadModal={showImageUploadModal}
                    handleCropImage={this.handleCropImage}
                    handleImageUpload={this.handleImageUpload}
                    setImageShow={this.setImageShowModal}
                    isCompanyDropdownLoading={isCompanyDropdownLoading}
                    companyDropdownData={companyDropdownData}
                    companyDropdownErrorMessage={companyDropdownErrorMessage}
                    isImageUploading={isImageUploading}
                    isCompanySaveLoading={isCompanySaveLoading}
                    isCompanyEditLoading={isCompanyEditLoading}
                />
            )
        }
    }

    return ConnectHoc(
        CompanySetup,
        [
            'companyDeleteReducer',
            'companyDropdownReducer',
            'companyPreviewReducer',
            'companySaveReducer',
            'companySearchReducer',
            'companyUpdateReducer'
        ],
        {
            companyDelete,
            companyDropdown,
            previewCompany,
            saveCompany,
            searchCompany,
            updateCompany,
            clearMessages
        }
    )
}
export default CompanyHOC
