import React, { PureComponent } from 'react';
import { Nav } from 'reactstrap';
import CTabsMenu from "./CTabsMenu";
class CNavTabs extends PureComponent {
  state = {
    currentActiveTab: this.props.currentActiveTab
    
  }
  onToggle= async(e,tab) => {
   e.preventDefault()
    console.log("===",tab);
    await this.setState({
      currentActiveTab:tab.id||tab.value
    })
    if(this.props.onClick) this.props.onClick(tab.id||tab.value,this.props.departmentInfoId,this.props.uniqueIdentifier,this.props.date)
  }
  render () {
    const {
      fill,
      vertical,
      horizontal,
      navbar,
      tag,
      justified,
      customClass,
      roles,
      currentActiveTab
    } = this.props
    return (
      <Nav
        tabs
        fill={fill}
        justified={justified}
        vertical={vertical}
        horizontal={horizontal}
        navbar={navbar}
        tag={tag}
        className={customClass}
      >
        <CTabsMenu tabs={roles} toggle={this.onToggle} currentTab = {currentActiveTab }/>
      </Nav>
    )
  }
}
// CNavTabs.propTypes = {
//   fill: PropTypes.bool,
//   vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   horizontal: PropTypes.string,
//   navbar: PropTypes.bool,
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   roles: PropTypes.array.isRequired,
//   className: PropTypes.string,
//   currentActiveTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
// }
export default CNavTabs
