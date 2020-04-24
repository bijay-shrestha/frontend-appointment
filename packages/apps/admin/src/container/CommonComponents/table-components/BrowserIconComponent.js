import React, {memo} from 'react'

const BrowserIconComponent = props => {
  const {browser} = props.node.data
  return (
    <>
      <ul className="patient-column">
        {browser.includes('chrome') || browser.includes('Chrome') ? (
          <li>
            <i className="fa fa-chrome"></i>&nbsp; <span>Chrome</span>
          </li>

        ) :browser.includes('Firefox')|| 
          browser.includes('mozilla') ||
          browser.includes('Mozilla') ||
          browser.includes('firefox') 
           ? (
          <li>
            <i className="fa fa-firefox"></i>&nbsp;<span>Mozilla</span>
          </li>
        ) : browser.includes('opera') || browser.includes('Opera') ? (
          <li>
            <i className="fa fa-opera"></i>&nbsp;<span>Opera</span>
          </li>
        ) : browser.includes('explorer') ||
          browser.includes('Explorer') ||
          browser.includes('internet') ||
          browser.includes('Internet') ||
          browser.includes('Edge') ||
          browser.includes('edge') ? (
          <li>
            <i className="fa fa-internet-explorer"></i>&nbsp;
            <span>Internet Explorer</span>
          </li>
        ) : browser.includes('safari') || browser.includes('Safari') ? (
          <li>
            <i className="fa fa-safari"></i>&nbsp;<span>Safari</span>
          </li>
        ) : (
          'N/A'
        )}
      </ul>
    </>
  )
}

export default memo(BrowserIconComponent)
