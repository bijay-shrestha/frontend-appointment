import React from 'react'

const NoRoleTabComponentHoc = (ComposedComponent, props) => {
  class NoRoleTabComponent extends React.PureComponent {
    render () {
      return <ComposedComponent {...props} />
    }
  }
  return <NoRoleTabComponent/>;
}
export default NoRoleTabComponentHoc;
