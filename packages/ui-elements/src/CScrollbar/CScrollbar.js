import React, {PureComponent} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import './style.css';

class CScrollbar extends PureComponent {
    render() {
        const {
            autoHeight,
            autoHeightMax,
            autoHeightMin,
            autoHide,
            autoHideDuration,
            autoHideTimeout,
            children,
            className,
            hideTracksWhenNotNeeded,
            id,
            onScroll,
            onScrollFrame,
            onScrollStart,
            onScrollStop,
            onUpdate,
            _ref,
            renderThumbHorizontal,
            renderThumbVertical,
            renderTrackHorizontal,
            renderTrackVertical,
            renderView,
            style,
            thumbMinSize,
            thumbSize,
            universal,
        } = this.props;

        return (
            <Scrollbars
                autoHeight={autoHeight}
                autoHeightMax={autoHeightMax}
                autoHeightMin={autoHeightMin}
                autoHide={autoHide}
                autoHideDuration={autoHideDuration}
                autoHideTimeout={autoHideTimeout}
                children={children}
                className={className}
                hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}
                id={"scrollbar_".concat(id)}
                onScroll={onScroll}
                onScrollFrame={onScrollFrame}
                onScrollStart={onScrollStart}
                onScrollStop={onScrollStop}
                onUpdate={onUpdate}
                ref={_ref}
                renderThumbHorizontal={renderThumbHorizontal}
                renderThumbVertical={renderThumbVertical}
                renderTrackHorizontal={renderTrackHorizontal}
                renderTrackVertical={renderTrackVertical}
                renderView={renderView}
                style={style}
                thumbMinSize={thumbMinSize}
                thumbSize={thumbSize}
                universal={universal}
            />
        );
    }
}

CScrollbar.defaultProps = {
    renderTrackVertical: props => <div {...props} className="track-vertical"/>,
    renderThumbVertical: props => <div {...props} className="thumb-vertical"/>,
    renderTrackHorizontal: props => <div {...props} className="track-horizontal"/>,
    renderThumbHorizontal: props => <div {...props} className="thumb-horizontal"/>,
    renderView: props => <div {...props} className="view"/>,
    thumbSize: 30,
};

CScrollbar.propTypes = {
    autoHeight: PropTypes.bool,
    autoHeightMax: PropTypes.number,
    autoHeightMin: PropTypes.number,
    autoHide: PropTypes.bool,
    autoHideDuration: PropTypes.number,
    autoHideTimeout: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string,
    hideTracksWhenNotNeeded: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onScroll: PropTypes.func,
    onScrollFrame: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollStop: PropTypes.func,
    onUpdate: PropTypes.func,
    ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    renderThumbHorizontal: PropTypes.func,
    renderThumbVertical: PropTypes.func,
    renderTrackHorizontal: PropTypes.func,
    renderTrackVertical: PropTypes.func,
    renderView: PropTypes.func,
    style: PropTypes.object,
    thumbMinSize: PropTypes.number,
    thumbSize: PropTypes.number,
    universal: PropTypes.bool,
};

export default CScrollbar;