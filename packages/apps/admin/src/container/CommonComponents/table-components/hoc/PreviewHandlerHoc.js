import React, {memo} from 'react'

const PreviewHandlerHoc = (
  ComposedComponent,
  checkIfRoleExists,
  filteredActions,
  roleId,
  onPreviewHandler
) => {
  const PreviewHandler = props => {
    const {node} = props;
  
    const previewClickHandler = (e)=>{
        const data = node.data ? (node.data.id ? node.data.id : node.data) : null
        if (!checkIfRoleExists) {
          
          onPreviewHandler(data)
        } else {
          if (checkIfRoleExists(filteredActions, roleId)) {
            onPreviewHandler(data)
          }
        }
        sessionStorage.setItem('actionType',4);
    }
    return (ComposedComponent ? (
      <div
        onClick={e => previewClickHandler(e)}
        
      >
        <ComposedComponent {...props} />
      </div>
    ) : null
    )
  }
  return PreviewHandler
}
export default PreviewHandlerHoc
