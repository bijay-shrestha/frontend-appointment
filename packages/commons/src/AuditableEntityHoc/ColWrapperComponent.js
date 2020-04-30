import React from 'react'
import {Col} from 'react-bootstrap'
export const ColWrapperComponent = props => {
const {colSize,Component} =props
return (
    <Col sm={12} md={12} lg={colSize||6}>
        {Component}
    </Col>
)
}