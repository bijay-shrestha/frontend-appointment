import React, {PureComponent} from 'react'
import {Nav, Accordion} from 'react-bootstrap'
import SideBarHeading from './SideBarHeading'
import SubMenuChildren from './SubMenuChildren'

class SideBarItem extends PureComponent {
  constructor (props) {
    super(props)
    let collapsed = [],
      active = '',
      activeKey = [],
      propsActiveKey =this.props.activeStateKey;
    if (this.props.activeStateKey && this.props.hasTab) {
      propsActiveKey = props.activeStateKey.split('/')
      let pathToBeAdded='';
      if(propsActiveKey.includes("admin")||propsActiveKey.includes("client")){
         propsActiveKey = propsActiveKey.slice(2)
         pathToBeAdded ='/'
      }   
      propsActiveKey.pop()
      propsActiveKey = pathToBeAdded + propsActiveKey.join('/') + true
    }
    else{
      propsActiveKey = propsActiveKey.replace("/admin","");
      propsActiveKey=propsActiveKey+true;
    }
    collapsed = this.props.localFunc.localStorageDecoder('collapsed') || []
    active = propsActiveKey || ''
    activeKey = this.props.localFunc.localStorageDecoder('activeStateKey') || []
    this.state = {
      collapsed: collapsed,
      active: active,
      activeKey: activeKey
    }
  }

  filterAndSetCollapsibleElements = (id, alreadyClickedId, root, forWhich) => {
    let activeId = ''
    activeId = forWhich ? id.replace('nav-item', '') : id + 'true'

    if (alreadyClickedId.includes(activeId)) {
      alreadyClickedId = alreadyClickedId.filter(item => item !== activeId)
    } else {
      if (!root) alreadyClickedId = []
      alreadyClickedId.push(activeId)
    }
    return alreadyClickedId
  }

  filterAndSetActiveElement = id => {
    return id + true
  }

  setActiveNavBar = id => {
    let activeStateId = this.state.active
    activeStateId = this.filterAndSetActiveElement(id)
    this.props.localFunc.localStorageEncoder('active', activeStateId)
    this.setState({
      active: activeStateId
    })
  }

  toggleNavbar = (id, root) => {
    if (this.props.isOpen || this.props.isHover) {
      let alreadyClickedId = [...this.state.collapsed]
      let alreadyActive = [...this.state.activeKey]
      alreadyClickedId = this.filterAndSetCollapsibleElements(
        id,
        alreadyClickedId,
        root,
        false
      )
      alreadyActive = this.filterAndSetCollapsibleElements(
        id,
        alreadyActive,
        root,
        true
      )
      this.props.localFunc.localStorageEncoder('activeStateKey', alreadyActive)
      this.props.localFunc.localStorageEncoder('collapsed', alreadyClickedId)
      this.setState({
        collapsed: alreadyClickedId,
        activeKey: alreadyActive
      })
    }
  }

  render () {
    let trees =this.props.trees
   const active = this.state.active
    const activeKey = this.state.activeKey
    return (
      <Nav className="flex-column">
        <SideBarHeading heading={this.props.heading} />
        <Accordion activeKey="1">
          {trees.length
            ? trees.map((tree, index) => {
                return (
                  <SubMenuChildren
                    parent={tree}
                    children={Object.values(tree.childMenus)}
                    childKey={index}
                    collapsed={this.state.collapsed}
                    active={active}
                    activeNavBar={this.setActiveNavBar}
                    toggleNavbar={this.toggleNavbar}
                    key={'submenu-child' + tree.id}
                    id={'submenu-child' + tree.id}
                    isOpen={this.props.isOpen}
                    activeKey={activeKey}
                    isHover={this.props.isHover}
                    className="level-one"
                  />
                )
              })
            : ''}
        </Accordion>
      </Nav>
    )
  }
}

export default SideBarItem
