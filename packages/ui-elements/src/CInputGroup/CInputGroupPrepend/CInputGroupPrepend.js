import React, {memo} from 'react'
import {InputGroup} from 'react-bootstrap';

const CInputGroupPrepend = ({id, classes, prepend}) => {
    return (
        <InputGroup.Prepend
            id={id}
            className={classes}>
            {prepend && prepend.map((pp, index) => pp)}
        </InputGroup.Prepend>
    )
}
export default memo(CInputGroupPrepend);