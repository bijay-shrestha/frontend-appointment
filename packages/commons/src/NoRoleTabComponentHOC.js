import React from 'react'
import connectHoc from './connectHoc';
const NoRoleTabComponentHoc = (ComposedComponent, props) => {
  
  class NoRoleTabComponent extends React.PureComponent {
    componentDidMount(){
      this.props.dispatch({type:'LOCATION_CHANGE'})
    }
    render () {
      return <ComposedComponent {...this.props} {...props} />
    }
  }
  return connectHoc(NoRoleTabComponent,[],null);
}
export default NoRoleTabComponentHoc;
