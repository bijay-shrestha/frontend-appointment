import React, { PureComponent } from 'react'
import classNames from 'classnames'
import SideBarHeader from './SideBarHeader'
import SideBarItem from './SideBarItem'

class CSideBar extends PureComponent {
  render () {
    return (
      <div
        id='sidebar-wrapper'
        className={classNames(
          'sidebar',
          { 'is-open': this.props.isOpen },
          { 'is-sidehover': this.props.isHover && !this.props.isOpen },
          { 'is-close': !this.props.isOpen && !this.props.isHover }
        )}
        style={
          this.props.isOpen || this.props.isHover
            ? {
              height: this.props.height,
              overflowY: this.props.overflow
            }
            : { height: this.props.height }
        }
        onMouseOver={this.props.onHoverSideBar}
        onMouseLeave={this.props.onLeaveHover}
      >
        <SideBarHeader
          header='cogentEMR'
          toggle={this.props.toggle}
          isOpen={this.props.isOpen}
          isHover={this.props.isHover}
        />

        <SideBarItem
          trees={this.props.trees}
          isOpen={this.props.isOpen}
          heading='heading'
          isHover={this.props.isHover}
        />
      </div>
    )
  }
}
CSideBar.defaultProps = {
  isOpen: true,
   height: 'calc(100% - 2rem);',
  overflow: 'auto'
}
export default CSideBar;
