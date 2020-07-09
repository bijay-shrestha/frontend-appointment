import React from 'react'
import connectHoc from './connectHoc';
const NoRoleTabComponentHoc = (ComposedComponent, usermenus,activeKey, props) => {
  
  class NoRoleTabComponent extends React.PureComponent {
    componentDidMount(){
      this.props.dispatch({type:'LOCATION_CHANGE'})
    }
    render () {
      return <ComposedComponent {...this.props} usermenus={usermenus} active={activeKey}/>
    }
  }
  const NoRoleTabComponentsConnected = connectHoc(NoRoleTabComponent,[],null,props);
  return NoRoleTabComponentsConnected;
}
export default NoRoleTabComponentHoc;
