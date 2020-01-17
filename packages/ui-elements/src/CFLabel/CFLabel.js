import React, {PureComponent} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";

class CFLabel extends PureComponent {

    addGridPropsIfColumnSetToTrue = column => {
        const {sm, md, lg, xl} = this.props;
        let colProps = {};
        if (column) {
            colProps = sm ? {...colProps, 'sm': sm} : colProps;
            colProps = md ? {...colProps, 'md': md} : colProps;
            colProps = lg ? {...colProps, 'lg': lg} : colProps;
            colProps = xl ? {...colProps, 'xl': xl} : colProps;
        }
        return colProps;
    };

    getPropsForLabel = () => {
        const {_ref, as, bsPrefix,className, column, htmlFor, id, srOnly} = this.props;
        return (
            {
                '_ref': _ref,
                'as': as,
                'bsPrefix': bsPrefix,
                'className':className,
                'column': column,
                'htmlFor': htmlFor,
                'id': "label_".concat(id),
                'srOnly': srOnly,
                ...this.addGridPropsIfColumnSetToTrue(column)
            }
        );
    };

    render() {
        const {labelName} = this.props;
        return (
            <Form.Label
                {...this.getPropsForLabel()}
            >
                {labelName}
            </Form.Label>
        )
    }
}


CFLabel.propTypes = {
    _ref: PropTypes.oneOfType([
        PropTypes.func, // for legacy refs
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    as: PropTypes.elementType,
    bsPrefix: PropTypes.string,
    className: PropTypes.string,
    column: PropTypes.bool,
    htmlFor: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelName: PropTypes.string.isRequired,
    srOnly: PropTypes.bool,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
};

export default CFLabel;