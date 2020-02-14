import React from 'react'
import {connect} from 'react-redux'

//This is generic connect to store
//If we want to acess to redux-store then wrap any component with this method
export default function (ComposedClass, statesToAccquire, ...args) {
  const mapStateToProps = state => {
    let statesToMap = {}
    statesToAccquire.map((st, i) => {
      statesToMap[st] = state[st]
    })
    console.log(statesToMap)
    return statesToMap
  }

  const mapDispatchToProps = () => {
    let dispatcherFunctions = {};
    args.map((arg, i) => {
      let name = arg.name;
     return dispatcherFunctions[name] = arg
    });
    return dispatcherFunctions;
  };

  class connectHOC extends React.PureComponent {
    render () {
      return <ComposedClass {...this.props} history={this.props.history} />
    }
  }

  return connect(mapStateToProps, mapDispatchToProps())(connectHOC)
}
