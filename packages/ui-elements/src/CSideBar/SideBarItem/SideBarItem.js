import React, { PureComponent } from 'react'
import { Nav, Accordion } from 'react-bootstrap'
import SideBarHeading from './SideBarHeading'
import SubMenuChildren from './SubMenuChildren'

class SideBarItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: [],
      active: '',
      activeKey: []
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
      this.setState({
        collapsed: alreadyClickedId,
        activeKey: alreadyActive
      })
    }
  }

  emptyCollapsedAndActiveKeyState = () => {
    this.setState({
      collapsed: [],
      activeKey: []
    })
  }

  

  render () {
    let trees =[];
    if(this.props.trees.length){
      trees = JSON.parse(this.props.trees);
    }

    return (
      <Nav className='flex-column'>
        <SideBarHeading heading={this.props.heading} />
        <Accordion activeKey='1'>
          {trees.length ?
            trees.map((tree, index) => {
              return (
                <SubMenuChildren
                  parent={tree}
                  children={Object.values(tree.childMenus)}
                  childKey={index}
                  collapsed={this.state.collapsed}
                  active={this.state.active}
                  activeNavBar={this.setActiveNavBar}
                  toggleNavbar={this.toggleNavbar}
                  key={'submenu-child' + tree.id}
                  id={'submenu-child' + tree.id}
                  isOpen={this.props.isOpen}
                  activeKey={this.state.activeKey}
                  isHover={this.props.isHover}
                  className="level-one"
                />
              )
            }):''}
        </Accordion>
      </Nav>
    )
  }
}

export default SideBarItem
