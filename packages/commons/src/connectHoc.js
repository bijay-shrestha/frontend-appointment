import React from 'react'
import {connect} from 'react-redux'

//This is generic connect to store
//If we want to acess to redux-store then wrap any component with this method
//let mapDispatchToProps,mapStateToProps;

const hocConnector = (ComposedClass,statesToAccquire, dispatchToAccquire,extraProps) => {
  
  
  class connectHOC extends React.PureComponent {
    render () {
      return <ComposedClass {...this.props} {...extraProps}  />
    }
  }
  const mapStateToProps = state => {
    let statesToMap = {}
    if (state) {
      statesToAccquire.length && statesToAccquire.map((st, i) => {
        statesToMap[st] = state[st]
        return st;
      })
    }
     return statesToMap
  }

  
 const ConnectedComponent = connect(mapStateToProps,dispatchToAccquire)(connectHOC); 
 return ConnectedComponent;
 
}
export default hocConnector;
