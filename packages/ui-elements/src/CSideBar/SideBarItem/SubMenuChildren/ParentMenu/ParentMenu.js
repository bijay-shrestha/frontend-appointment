import React, {memo} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Accordion, Nav, Dropdown} from 'react-bootstrap'
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
// import NavLink from 'react-bootstrap/NavLink'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

const ParentMenu = props => {
  const baseDepartment = process.env.REACT_APP_BASE_PATH_CODE
  const sideBase = baseDepartment ? baseDepartment : ''
  return props.childrenSize > 0 ? (
    <Accordion.Toggle
      as={Nav.Link}
      variant="link"
      eventKey={`${props.parent.id}`}
      onClick={id =>
        props.toggleNavbar('nav-item' + props.parent.id, props.parent.parentId)
      }
      key={'accordion-toogle' + props.parent.id}
      id={'accordion-toogle' + props.parent.id}
    >
      <div className="sidebar-item">
        <div>
          <i className={props.parent.icon} />
        </div>

        <div className="sidebar-item-name">
          <span className={props.isOpen || props.isHover ? 'text' : 'collapse'}>
            {props.parent.name}
          </span>
        </div>
        <div className="">
          <FontAwesomeIcon
            icon={
              (props.isHover || props.isOpen) &&
              props.collapsed.includes('nav-item' + props.parent.id + 'true')
                ? faCaretUp
                : faCaretDown
            }
            className={props.isOpen || props.isHover ? 'mr-2 ' : 'collapse'}
            key={'icon2' + props.parent.id}
          />
          {/* ) : (
        null
      )} */}
        </div>
      </div>
    </Accordion.Toggle>
  ) : (
    <Nav
      key={'nav-child-key' + props.parent.id}
      onClick={id => props.activeNavBar(props.parent.path)}
      //   activeKey={
      //     props.parent.path + 'true' === props.active ? props.parent.path : ''
      //   }
    >
      <Nav.Item
        className={
          String(props.active) === String(props.parent.path + 'true')
            ? 'active'
            : ''
        }
        key={'nav-item-parent' + props.parent.id}
        onClick={id => props.activeNavBar(props.parent.path)}
      >
        <Nav.Link
          as={Link}
          key={'nav-link' + props.parent.id}
          to={sideBase + props.parent.path}
          exact="true"
          className={!props.parent.parentId ? 'no-child' : ''}
        >
          <i className={props.parent.icon}/>
          <span
            className={classNames(
              {text: props.isOpen || props.isHover},
              {closemenutext: !props.isOpen && !props.isHover}
            )}
            onClick={
              props.parent.parentId
                ? () =>
                    props.toggleNavbar(
                      'nav-item' + props.parent.id,
                      props.parent.parentId
                    )
                : () => {}
            }
          >
            {/* <i className="fa fa-calendar-plus-o " /> */}
            {props.parent.name}
          </span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
export default memo(ParentMenu)
/*  */
