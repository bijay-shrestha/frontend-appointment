import React from 'react'
import roless from './roles.json'
import {Redirect} from 'react-router-dom'
import {CNavTabs} from '@frontend-appointment/ui-elements'

const ComponentHoc = (ComposedComponent, userMenus, path,props) => {
  return class CheckTabs extends React.PureComponent {
    state = {
      isLoading: true,
      filteredAction: [],
      filteredRolesTab: [],
      pathFound: false,
      currentActiveTab: 0
    }

    getAction = (childMenus, newPath) => {
      let filteredActions = []
      let filteredTabs = []
      const {roles, path} = childMenus
      const newP = newPath.split('/')
      if (newPath.includes(path)) {
        roless.map((role, id) => {
          roles.map((rol, ind) => {
            if (Number(rol) === Number(role.id)) {
              if (role.role_type === 'action') {
                filteredActions.push({
                  id: role.id,
                  name: role.name,
                  parent: role.parent_role_id
                })
              }
            }
          })
        })
      }
      if (filteredActions.length) return filteredActions
      else {
        return [{id: '', name: '', parent: ''}]
      }
    }

    getUniquesElement = data => {
      let result = []
      let flag = false
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < i; j++) {
          if (data[i].id == result[j].id) {
            flag = true
            break
          }
        }
        if (!flag) result.push(data[i])
      }
      return result
    }

    getFilterTabs = (filteredAction, newPath) => {
      let filteredTabs = []
      console.log('getFilterTabs new path', newPath)
      console.log('path', path)
      let newBase = path.split('/')
      if (newBase.length > 3) newBase = newBase.splice(0, newBase.length - 1)

      newBase = newBase.join('/')
      console.log(newBase)
      roless.map(role => {
        filteredAction.map(actions => {
          if (Number(actions.parent) === Number(role.id))
            filteredTabs.push({
              id: role.id,
              url: `${newBase}${role.path}`,
              name: role.name
            })
        })
      })
      let newSet = this.getUniquesElement(filteredTabs)
      return newSet
    }

    checkRoles = () => {
      let filteredRolesTab = [],
        filteredAction = []
      const splittedPath = path.split('/')
      console.log(splittedPath)
      let newPath = splittedPath.filter((sp, id) => id > 1)
      newPath = newPath.join('/')
      newPath = '/'.concat(newPath)
      let newUserMenus = []
      if (userMenus.length) newUserMenus = JSON.parse(userMenus)

      newUserMenus &&
        newUserMenus.map(userMenu => {
          const {childMenus} = userMenu
          if (userMenu.childMenus.length) {
            childMenus.map((child, idx) => {
              filteredAction = [
                ...filteredAction,
                ...this.getAction(child, newPath)
              ]
            })
          } else {
            filteredAction = [
              ...filteredAction,
              ...this.getAction(userMenu, newPath)
            ]
          }
        })
      filteredRolesTab = [...this.getFilterTabs(filteredAction, newPath)]
      this.setState({
        filteredAction: [...filteredAction],
        filteredRolesTab: [...this.state.filteredRolesTab, ...filteredRolesTab]
      })
      console.log('hello',filteredRolesTab);
      return filteredRolesTab;
    }

    checkIfPathIsTabPath = (filteredRolesTab) => {
      //const {filteredRolesTab} = this.state
      let isTab = false,
        loading = true,
        currentActiveTab;
      if (filteredRolesTab.length) {
        for (let filteredRole of filteredRolesTab) {
          if (filteredRole.url === path) {
            isTab = true;
            loading = false;
            currentActiveTab = filteredRole.id;
            break;
          }
        }
        if (isTab) {
          this.setState({
            pathFound: true,filteredRolesTab,
            isLoading: loading,
            currentActiveTab: currentActiveTab
          })
        } else {
          console.log('fitlered roles',filteredRolesTab);
          props.history.push(filteredRolesTab[0].url)
        }
      } else {
        this.setState({
          pathFound: false,
          isLoading: true
        })
      }
    }
    async componentDidMount () {

     const filteredRolesTab = await this.checkRoles();
     console.log('newfilters',filteredRolesTab);
      this.checkIfPathIsTabPath(filteredRolesTab);
    }

    render () {
      const {
        filteredAction,
        filteredRolesTab,
        isLoading,
        pathFound,
        currentActiveTab
      } = this.state
      return !isLoading &&
        filteredAction.length &&
        filteredRolesTab.length &&
        pathFound ? (
        <>
        <CNavTabs filteredAction={filteredAction} 
                  roles={filteredRolesTab} 
                  currentActiveTab={currentActiveTab}
                  customClass="page-tabs" /> 
        <ComposedComponent
          {...this.props}
          filteredAction={filteredAction}
          roles={filteredRolesTab}
          hasTabs={true}
        />
        </>
      ) : isLoading? (
        <div>loading</div>
      ) : (
        <Redirect to="/unauthorized" />
      )
    }
  }
}

export default ComponentHoc
