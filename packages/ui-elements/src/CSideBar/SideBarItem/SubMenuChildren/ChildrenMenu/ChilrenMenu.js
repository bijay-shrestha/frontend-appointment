import React from 'react';
import { Accordion, } from 'react-bootstrap'
import SubMenuChildren from '..';

const ChildrenMenus = (props) => {
    const {children,parent} = props;
    return (
         <Accordion.Collapse  key={'accordion-collapse'+parent.id} eventKey={`${props.parent.id}`}>
          <>
            {children.map( child => {
             return <SubMenuChildren key={'submenu'+child.id} 
                                     parent={child} 
                                     toggleNavbar={props.toggleNavbar} 
                                     children={child.childMenus} 
                                     collapsed={props.collapsed} 
                                     active={props.active}
                                     activeNavBar={props.activeNavBar}
                                     isOpen={props.isOpen}
                                     activeKey={props.activeKey}
                                     isHover={props.isHover}
                                     className={props.parent.parentId?"level-three":"level-two"}
                                     />
            })}
          </>
        </Accordion.Collapse>
    )
} 
export default ChildrenMenus;