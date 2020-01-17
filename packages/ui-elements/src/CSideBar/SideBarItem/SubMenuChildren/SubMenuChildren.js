import React, {memo} from 'react'
import {Accordion, Nav} from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
// import classNames from 'classnames'
import ParentMenu from './ParentMenu/ParentMenu'
import ChildrenMenu from './ChildrenMenu/ChilrenMenu'

const SubMenuChildren = props => {
  return (
    <>
      <Nav.Item
        key={'nav-item-parent' + props.parent.id}
        className={
          props.collapsed.includes('nav-item' + props.parent.id + 'true')
            ? 'open'
            : ''
        }
        id={'nav-item-parent' + props.parent.id}
      >
        <Accordion
          key={'accord' + props.parent.id}
          activeKey={
            props.activeKey.includes(props.parent.id) ? props.parent.id : ''
          }
          className={props.className}
        >
          {props.parent ? (
            <ParentMenu
              childrenSize={props.children.length}
              parent={props.parent}
              collapsed={props.collapsed}

              active={props.active}
              activeNavBar={props.activeNavBar}
              toggleNavbar={props.toggleNavbar}
              key={'parent-menu' + props.parent.id}
              isOpen={props.isOpen}
              isHover={props.isHover}
            />
          ) : null}
          {props.children && props.children.length > 0 ? (
            <ChildrenMenu
              key={'child-menu' + props.parent.id}
              children={props.children}
              toggleNavbar={props.toggleNavbar}
              parent={props.parent}
              collapsed={props.collapsed}
              active={props.active}
              activeNavBar={props.activeNavBar}
              isOpen={props.isOpen}
              activeKey={props.activeKey}
              isHover={props.isHover}
            />
          ) : null}
        </Accordion>
      </Nav.Item>
    </>
  )
}
export default memo(SubMenuChildren)
