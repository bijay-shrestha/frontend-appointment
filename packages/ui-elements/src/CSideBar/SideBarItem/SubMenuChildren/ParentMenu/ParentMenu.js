import React,{memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, Nav, DropdownButton, Dropdown } from 'react-bootstrap'
import {
    faCaretDown,
    faCaretUp
} from '@fortawesome/free-solid-svg-icons'
import NavLink from 'react-bootstrap/NavLink'
import classNames from 'classnames'

const ParentMenu = props => {
    const baseDepartment = process.env.REACT_APP_SIDE_BAR_CODE;
    const sideBase = baseDepartment ? baseDepartment : '';
    return props.childrenSize > 0 ? (
        <Accordion.Toggle
            as={Nav.Link}
            variant='link'
            eventKey={`${props.parent.id}`}
            onClick={id =>
                props.toggleNavbar('nav-item' + props.parent.id, props.parent.root)
            }
            key={'accordion-toogle' + props.parent.id}
            id={'accordion-toogle' + props.parent.id}
        >
            <div className='sidebar-item'>

                <div>
                    <i className={props.parent.icon} />
                </div>

                <div className='sidebar-item-name'>
                    <span className={props.isOpen || props.isHover ? 'text' : 'collapse'}>
                        {props.parent.name}
                    </span>
                </div>
                <div className="">
                    {/* {props.isOpen || props.isHover ? ( */}
                    <FontAwesomeIcon
                        icon={
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
                activeKey={
                    props.parent.path + 'true' === props.active ? props.parent.path : ''
                }
            >
                <Nav.Item className="" key={'nav-item-parent' + props.parent.id} onClick={id => props.activeNavBar(props.parent.path)}>
                    <Nav.Link
                        as={NavLink}
                        key={'nav-link' + props.parent.id}
                        href={'#'+sideBase + props.parent.path}
                        to={'#'+sideBase + props.parent.path}
                        exact="true"
                    >

                        <label
                            className={classNames(
                                { "text": props.isOpen || props.isHover },
                                { "closemenutext": !props.isOpen && !props.isHover },
                                { "active": String(props.active) === String(props.parent.path + 'true') }
                            )}
                      
                        >
                            {props.parent.name}
                        </label>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
};
export default memo(ParentMenu)
