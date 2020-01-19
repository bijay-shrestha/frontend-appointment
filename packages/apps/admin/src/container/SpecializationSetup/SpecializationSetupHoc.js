import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {SpecializationSetupMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {CAlert, CButton} from '@frontend-aappointment/ui-elements'
import {
  EnterKeyPressUtils,
  FileExportUtils,
  AdminInfoUtils
} from '@frontend-appointment/helpers'
import {Axios} from '@frontend-appointment/core'
import './specialization.css'

const SpecializationHOC = ComposedComponent => {
    const {
      ACTIVE_DROPDOWN_SPECIALIZATION,
      CREATE_SPECIALIZATION,
      DELETE_SPECIALIZATION,
      DROPDOWN_SPECIALIZATION,
      EDIT_SPECIALIZATION,
      EXPORT_SPECIALIZATION_EXCEL,
      FETCH_SPECIALIZATION_DETAILS,
      SEARCH_SPECIALIZATION,
      SPECIFIC_DROPDOWN_SPECIALIZATION
    }=AdminModuleAPIConstants.specializationSetupAPIConstants
  return class SpecializationSetup extends React.PureComponent {
    render () {
      return (
        <ComposedComponent
          {...this.props}
          enterKeyPress={EnterKeyPressUtils}
          fileExportUtils={FileExportUtils}
          adminInfoUtils={AdminInfoUtils}
        >
        </ComposedComponent>
      )
    }
  }
}
export default ConnectHoc(SpecializationHOC)
