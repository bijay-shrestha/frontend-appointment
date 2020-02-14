import React, {memo} from 'react'
import {ButtonGroup,Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'

const DateButtonPills = props => {
  const {onPillsClickHandler,type,variant,data} = props

  return (
    <Col>
    <ButtonGroup aria-label="Basic example" size="sm" className="mb-3">
      <CButton id="day" variant={variant} active={data==='D'} onClickHandler={()=>onPillsClickHandler('D',type)} name="Daily"/>
      <CButton id="week" variant={variant} active={data==='W'}  onClickHandler={()=>onPillsClickHandler('W',type)} name="Weekly"/>
      <CButton id="month" variant={variant} active={data==='M'} onClickHandler={()=>onPillsClickHandler('M',type)} name="Monthly"/>
      <CButton id= "yearly" variant={variant} active={data==='Y'}  onClickHandler={()=>onPillsClickHandler('Y',type)} name="Yearly"/>
    </ButtonGroup>
    </Col>
  )
}
export default memo(DateButtonPills);
