import React, {memo} from 'react'
import {Row} from 'react-bootstrap'
import * as Material from 'react-icons/md'

const RevenueStatistics = props=> {
  return (
    <>
      <Row>
        <h5 className="title">Revenue Statistics</h5>
      </Row>
      <Row>
        <div className="revenue-box">
          <p>Rs. 5,00,000</p>
          <div className="total">
            {/* Total Revenue  */}
            <span className="up">
              <Material.MdExpandLess /> +5% from last year
            </span>
          </div>
        </div>

        <div className="revenue-box">
          <p>Rs. 1,00,000</p>
          <div className="up">
            <Material.MdExpandLess /> +5% from last month
          </div>
        </div>

        <div className="revenue-box">
          <p>Rs. 50,000</p>
          <div className="up">
            <Material.MdExpandLess /> +5% from last week
          </div>
        </div>

        <div className="revenue-box">
          <p>Rs. 9,000</p>
          <div className="down">
            <Material.MdExpandMore /> -3% from last day
          </div>
        </div>
      </Row>
    </>
  )
}

export default memo(RevenueStatistics)
