import React, {memo} from 'react'
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

const CButton = props => {
    const {
        id,
        name,
        children,
        variant,
        active,
        className,
        disabled,
        as,
        onClickHandler,
        href,
        size,
        type,
        block,
        bsPrefix,
        isLoading
    } = props;
    const checkVowelsCondition = splitName => {
        const vowels = ['a', 'e', 'i', 'o', 'u']
        if (vowels.includes(splitName[splitName.length - 1])) {
            return splitName.slice(0, splitName.length - 1).join('') + "ing"
        } else {
            return splitName.join('') + "ing"
        }


    }
    const checkAndRenameNameForLoading = () => {

        const splitNameCheck = name.split(' ');
        const splitName = splitNameCheck[0].split('')
        const newName = checkVowelsCondition(splitName)
        // if (splitNameCheck.length > 1)
        //     return newName + ' ' + splitNameCheck[1]
        return newName;
    }
    return (
        <>
            <Button
                id={id}
                variant={variant}
                active={active}
                className={className}
                disabled={disabled || isLoading}
                as={as}
                onClick={onClickHandler}
                href={href}
                size={size}
                type={type}
                block={block}
                bsPrefix={bsPrefix}
            >
                {isLoading ? <span className="saving">{checkAndRenameNameForLoading()} <img
                    src={require("./three-dots.svg")}/></span> : name}
                {children}
            </Button>
        </>
    )
};


CButton.defaultProps = {
    name: 'Save',
    type: 'button',
    onClickHandler: () => {
    }
};

CButton.propTypes = {
    id: PropTypes.string.isRequired || PropTypes.number.isRequired,
    children: PropTypes.element,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    variant: PropTypes.string,
    active: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    bsPrefix: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool
};

export default memo(CButton);
