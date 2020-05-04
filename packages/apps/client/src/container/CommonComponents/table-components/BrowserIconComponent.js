import React, {memo} from 'react'

const BrowserIconComponent = props => {
  let {browser} = props.node.data
  browser = browser || ''
  console.log('=====', props.node.data.browser)
  return (
    <>
      <ul className="browser">
        {browser.includes('chrome') || browser.includes('Chrome') ? (
          <li>
            <img alt="chrome" src={require('../../../images/chrome.svg')} />{' '}
            <span>Chrome</span>
          </li>
        ) : browser.includes('Firefox') ||
          browser.includes('mozilla') ||
          browser.includes('Mozilla') ||
          browser.includes('firefox') ? (
          <li>
            <img alt="firefox" src={require('../../../images/mozilla.svg')} />
            <span>Mozilla</span>
          </li>
        ) : browser.includes('opera') || browser.includes('Opera') ? (
          <li>
            <img alt="opera" src={require('../../../images/opera.svg')} />
            <span>Opera</span>
          </li>
        ) : browser.includes('explorer') ||
          browser.includes('Explorer') ||
          browser.includes('internet') ||
          browser.includes('Internet') ? (
          <li>
            <img open="internet explorer" alt="explorer" src={require('../../../images/explorer.svg')} />
            <span>Internet Explorer</span>
          </li>
        ) : browser.includes('safari') || browser.includes('Safari') ? (
          <li>
            <img alt="safari" src={require('../../../images/safari.svg')} />
            <span>Safari</span>
          </li>
        ) : browser.includes('Edge') || browser.includes('edge') ? (
          <li>
            <img alt="edge" src={require('../../../images/microsoft-edge.svg')} />
            <span>Edge</span>
          </li>
        ) : browser.includes('Chromium') || browser.includes('chromium') ? (
          <li>
            <img alt="chromium" src={require('../../../images/chromium.svg')} />
            <span>Chromium</span>
          </li>
        ) : browser.includes('uc') || browser.includes('UC') ? (
          <li>
            <img alt="uc browser" src={require('../../../images/uc.svg')} />
            <span>UC Browser</span>
          </li>
        ) : (
          'Unknown'
        )}
      </ul>
    </>
  )
}

export default memo(BrowserIconComponent)
