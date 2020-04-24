import React, {memo} from 'react'

const BrowserIconComponent = props => {
  const {browser} = props.node.data
  return (
    <>
      <ul className="patient-column">
        {browser.includes('chrome') || browser.includes('Chrome') ? (
          <li>
           <img src={require('../../../images/chrome.svg')} /><span>Chrome</span>
          </li>

        ) :browser.includes('Firefox')|| 
          browser.includes('mozilla') ||
          browser.includes('Mozilla') ||
          browser.includes('firefox') 
           ? (
          <li>
           <img src={require('../../../images/mozilla.svg')} /><span>Mozilla</span>
          </li>
        ) : browser.includes('opera') || browser.includes('Opera') ? (
          <li>
            <img src={require('../../../images/opera.svg')} /><span>Opera</span>
          </li>
        ) : browser.includes('explorer') ||
          browser.includes('Explorer') ||
          browser.includes('internet') ||
          browser.includes('Internet') ||
          browser.includes('Edge') ||
          browser.includes('edge') ? (
          <li>
           <img src={require('../../../images/explorer.svg')} />
            <span>Internet Explorer</span>
          </li>
        ) : browser.includes('safari') || browser.includes('Safari') ? (
          <li>
            <img src={require('../../../images/safari.svg')} /><span>Safari</span>
          </li>
        ) : (
          'N/A'
        )}
      </ul>
    </>
  )
}

export default memo(BrowserIconComponent)
