import React, {PureComponent} from 'react'
const ClientApiIntegrationHoc = (ComposedComponent, props) => {
  class ClientApiIntegration extends PureComponent {
    state = {
      integrationData: {
        clientId: '',
        featureType: '',
        requestMethod: '',
        apiUrl: '',
        headers: [],
        queryParams: [],
        requestBody: ''
      },
      editQueryParams: [],
      editHeaders: [],
      searchQueryParams: {
        page: 0,
        size: 10
      },
      addObjectId: 0,
      previewModal: true,
      editShowModal: true,
      regexForCommaSeperation:/^(?!,)(,?[a-zA-Z]+)+$/
    }
    
    setTheStateForIntegrationData = objectToModify =>{
        this.setState({
            integrationData:{...objectToModify}
        })
    }

    onChangeHandler = e => {
      const {name, value, label} = e.target
      let integrationDatas = {...this.state.integrationData}
      integrationDatas[name] = label ? (value ? {value, label} : '') : value
      this.setTheStateForIntegrationData(integrationDatas);
    }

    onAddHeaderOrQueryParams = (index, fieldName) => {
      let objectToModify = {...this.state.integrationData}
      objectToModify[fieldName][index] = {
        key: '',
        value: '',
        description: ''
      }
     this.setTheStateForIntegrationData(objectToModify);
    }

    onChangeHandlerHeaderOrQueryParams =(e,index,fieldName) => {
      const {name,value} = e.target
      let objectToModify={...this.state.integrationData}
      objectToModify[fieldName][index][name] = value;
      this.setTheStateForIntegrationData(objectToModify)
    }
    
    onRemoveHandlerHeaderOrQueryParamas = (index,fieldName) => {
     let objectToModify={...this.state.integrationData}
     objectToModify[fieldName].splice(index,index);
     this.setTheStateForIntegrationData(objectToModify);
    }

    render () {
      return <ComposedComponent></ComposedComponent>
    }
  }
}
