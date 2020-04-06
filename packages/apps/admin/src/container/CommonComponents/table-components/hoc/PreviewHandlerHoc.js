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
    //  if(checkIfRoleExists(filteredActions,roleId)){
        const data = node.data?node.data.id?node.data.id:node.data:null;
         onPreviewHandler(data)
     //}
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
