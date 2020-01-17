import React, {memo} from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import PropTypes from 'prop-types';

const CToggle = props => {
    const {
        id, onLabel, offLabel,
        size, onStyle, offStyle,
        width, height, name,
        onChangeHandler, classes, required,
        checked, style
    } = props;
    return (
        <>
            <BootstrapSwitchButton
                id={id}
                onlabel={onLabel}
                offlabel={offLabel}
                size={size}
                onstyle={onStyle}
                offstyle={offStyle}
                style={style}
                width={width}
                height={height}
                className={classes}
                onChange={onChangeHandler}
                name={name}
                checked={checked}
                required={required}
            />
        </>
    )
}

export default memo(CToggle);

CToggle.defaultProps = {
    id: "c-toggle",
    name: "c-toggle",
    onChangeHandler: () => {
    },
    checked: false,
}

CToggle.propTypes = {
    id: PropTypes.string || PropTypes.number,
    name: PropTypes.string.isRequired,
    onLabel: PropTypes.string || PropTypes.element,
    offLabel: PropTypes.string || PropTypes.element,
    size: PropTypes.number,
    onStyle: PropTypes.string,
    offStyle: PropTypes.string,
    style: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}
