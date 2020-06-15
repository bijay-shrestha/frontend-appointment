import React, {memo} from 'react'
//import classnames from 'classnames'
import {NavLink, NavItem} from 'reactstrap'
import {Link} from 'react-router-dom'
//import PropTypes from 'prop-types'

const CTabsMenu = props => {
  const {currentTab, tabs, toggle} = props
  const isActive = tabId => Number(currentTab) === Number(tabId)

  const tabResult = tabs.map((tab, index) => (
    <NavItem key={tab.id}>
      {tab.url ? (
        <NavLink
          key={tab.name + index}
          active={isActive(tab.id || tab.value)}
          onClick={(e) => toggle(e,tab)}
          tag={Link}
          to={tab.url}
        >
          {tab.name || tab.label}
        </NavLink>
      ) : (
        <NavLink
        id={tab.name + index}
        active={isActive(tab.id || tab.value)}
        onClick={(e) => toggle(e,tab)}
        href="#"
        >
        {tab.label}
        </NavLink>
      )}
    </NavItem>
  ))

  return tabResult
}
// CTabsMenu.propTypes = {
//     currentTab:PropTypes.string.isRequired(),
//     toggle:PropTypes.func.isRequired(),
//     tabs:PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string,
//         id: PropTypes.number,
//         url:PropTypes.string
//       }))
// }
export default memo(CTabsMenu)
