import React, {PureComponent} from 'react';
import ReactCrop from "react-image-crop";
import PropTypes from 'prop-types';
import 'react-image-crop/lib/ReactCrop.scss';

const CImageCrop = props => {
    const {
        src,
        crop,
        id,
        onCropChange,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        keepSelection,
        disabled,
        locked,
        className,
        style,
        imageStyle,
        onCropComplete,
        onImageLoaded,
        onImageError,
        onDragStart,
        onDragEnd,
        crossorigin,
        renderSelectionAddon,
        renderComponent,
        ruleOfThirds,
        circularCrop
    } = props;
    return <>
        <ReactCrop
            id={id}
            src={src}
            crop={crop}
            onChange={onCropChange}
            minWidth={minWidth}
            minHeight={minHeight}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            keepSelection={keepSelection}
            disabled={disabled}
            locked={locked}
            className={className}
            style={style}
            imageStyle={imageStyle}
            onComplete={onCropComplete}
            onImageLoaded={onImageLoaded}
            onImageError={onImageError}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            crossorigin={crossorigin}
            renderSelectionAddon={renderSelectionAddon}
            renderComponent={renderComponent}
            ruleOfThirds={ruleOfThirds}
            circularCrop={circularCrop}
        />
    </>
};

CImageCrop.defaultProps = {
    onChange: () => {
    },
};

CImageCrop.propTypes = {
    src: PropTypes.any.isRequired,
    crop: PropTypes.shape({
        unit: PropTypes.string, // default, can be 'px' or '%'
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        aspect: PropTypes.number
    }).isRequired,
    onChange: PropTypes.func.isRequired, // onChange(crop,percentCrop)
    minWidth: PropTypes.string, // IN PIXELS
    minHeight: PropTypes.string, // IN PIXELS
    maxWidth: PropTypes.string, // IN PIXELS
    maxHeight: PropTypes.string, // IN PIXELS
    keepSelection: PropTypes.bool, // If true is passed then selection can't be disabled if the user clicks outside the selection area.
    disabled: PropTypes.bool,
    locked: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object, // FOR INLINE STYLES OF IMAGE WRAPPER ELEMENT
    imageStyle: PropTypes.object, // INLINE STYLES FOR IMAGE ELEMENT
    onComplete: PropTypes.func, // onComplete(crop, percentCrop)
    onImageLoaded: PropTypes.func, // onImageLoaded(image)
    onImageError: PropTypes.func, // onImageError(event)
    onDragStart: PropTypes.func, // onDragStart(event)
    onDragEnd: PropTypes.func, // onDragEnd(event)
    crossorigin: PropTypes.bool, // Allows setting the crossorigin attribute on the image.
    renderSelectionAddon: PropTypes.func, // renderSelectionAddon(state),
    renderComponent: PropTypes.element, // Render a custom HTML element in place of an image. Useful if you want to support videos
    ruleOfThirds: PropTypes.bool, // DEFAULT:false
    circularCrop: PropTypes.bool, // DEFAULT:false
};

export default CImageCrop;
