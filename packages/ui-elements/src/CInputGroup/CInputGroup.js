import React, {memo} from 'react';
import {InputGroup} from 'react-bootstrap';
import CInputGroupAppend from './CInputGroupAppend';
import CInputGroupPrepend from './CInputGroupPrepend';

const CInputGroup = (props) => {
    const {classes, id, as, bsPrefix, size, append, prepend, appendClassName, prependClassName} = props;
    return (
        <>
            <InputGroup
                className={classes}
                id={id}
                as={as}
                bsPrefix={bsPrefix}
                size={size}>
                {prepend ?
                    <CInputGroupPrepend
                        id={"prepend" + props.id}
                        className={appendClassName}
                        prepend={prepend}/>
                    : null}
                {append ?
                    <CInputGroupAppend
                        id={"append" + props.id}
                        className={prependClassName}
                        append={append}/>
                    : null}
            </InputGroup>
        </>
    )
};
export default memo(CInputGroup);