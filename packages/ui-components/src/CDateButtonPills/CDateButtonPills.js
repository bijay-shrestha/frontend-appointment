import React, {memo} from 'react'
import {ButtonGroup,Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'

const DateButtonPills = props => {
  const {onPillsClickHandler,type} = props

  return (
    <Col>
    <ButtonGroup aria-label="Basic example" size="sm" className="mb-3">
      <CButton id="day" className="outline-secondary" onClickHandler={()=>onPillsClickHandler('D',type)} name="Daily"/>
      <CButton id="week" className="outline-secondary" onClickHandler={()=>onPillsClickHandler('W',type)} name="Weekly"/>
      <CButton id="month" className="outline-secondary" onClickHandler={()=>onPillsClickHandler('M',type)} name="Monthly"/>
      <CButton id= "yearly"className="outline-secondary" onClickHandler={()=>onPillsClickHandler('Y',type)} name="Yearly"/>
    </ButtonGroup>
    </Col>
  )
}
export default memo(DateButtonPills);
