import {companySetupConstants} from './companySetupConstants'

const {
  COMPANY_DROPDOWN_ERROR,
  COMPANY_DROPDOWN_PENDING,
  COMPANY_DROPDOWN_SUCCESS,
  COMPANY_PREVIEW_ERROR,
  COMPANY_PREVIEW_PENDING,
  COMPANY_PREVIEW_SUCCESS,
  SAVE_COMPANY_ERROR,
  SAVE_COMPANY_PENDING,
  SAVE_COMPANY_SUCCESS,
  SEARCH_COMPANY_ERROR,
  SEARCH_COMPANY_PENDING,
  SEARCH_COMPANY_SUCCESS,
  UPDATE_COMPANY_ERROR,
  UPDATE_COMPANY_PENDING,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY_ERROR,
  DELETE_COMPANY_PENDING,
  DELETE_COMPANY_SUCCESS
} = companySetupConstants

export const saveCompanyPending = () => ({
  type: SAVE_COMPANY_PENDING
})

export const saveCompanySuccess = message => ({
  type: SAVE_COMPANY_SUCCESS,
  payload: {message}
})

export const saveCompanyError = message => ({
  type: SAVE_COMPANY_ERROR,
  payload: {message}
})

export const previewCompanyPending = () => ({
  type: COMPANY_PREVIEW_PENDING
})

export const previewCompanySuccess = data => ({
  type: COMPANY_PREVIEW_SUCCESS,
  payload: {data}
})

export const previewCompanyError = message => ({
  type: COMPANY_PREVIEW_ERROR,
  payload: {message}
})

export const searchCompanyPending = () => ({
  type: SEARCH_COMPANY_PENDING
})

export const searchCompanySuccess = data => ({
  type: SEARCH_COMPANY_SUCCESS,
  payload: {data}
})

export const searchCompanyError = message => ({
  type: SEARCH_COMPANY_ERROR,
  payload: {message}
})

export const dropdownCompanyPending = () => ({
  type: COMPANY_DROPDOWN_PENDING
})

export const dropdownCompanySuccess = data => ({
  type: COMPANY_DROPDOWN_SUCCESS,
  payload: {data}
})

export const dropdownCompanyError = message => ({
  type: COMPANY_DROPDOWN_ERROR,
  payload: {message}
})

export const updateCompanyPending = () => ({
  type: UPDATE_COMPANY_PENDING
})

export const udpateCompanySuccess = message => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: {message}
})

export const updateCompanyError = message => ({
  type: UPDATE_COMPANY_ERROR,
  payload: {message}
})

export const deleteCompanyPending = () => ({
  type: DELETE_COMPANY_PENDING
})

export const deleteCompanySuccess = message => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: {message}
})

export const deleteCompanyError = message => ({
  type: DELETE_COMPANY_ERROR,
  payload: {message}
})
