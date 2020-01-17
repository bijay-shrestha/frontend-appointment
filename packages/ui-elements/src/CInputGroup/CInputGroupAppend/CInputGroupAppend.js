import React, {memo} from 'react';
import {InputGroup} from 'react-bootstrap';

const CInputGroupAppend = ({id, classes, append}) => {
    return (
        <InputGroup.Append
            id={id}
            className={classes}>
            {append && append.map((ap, index) => ap)}
        </InputGroup.Append>

    );
};
export default memo(CInputGroupAppend);