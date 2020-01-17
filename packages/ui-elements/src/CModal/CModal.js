import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const CModal = props => {
    const {
        animation,
        asBody,
        asTitle,
        autoFocus,
        backdrop,
        backdropClassName,
        bodyChildren,
        bsPrefix,
        bsPrefixBody,
        bsPrefixFooter,
        bsPrefixHeader,
        bsPrefixTitle,
        centered,
        closeButton,
        closeLabel,
        container,
        dialogAs,
        dialogClassName,
        enforceFocus,
        footerAs,
        footerChildren,
        keyboard,
        manager,
        modalHeading,
        onEnter,
        onEntered,
        onEntering,
        onEscapeKeyDown,
        onExit,
        onExited,
        onExiting,
        onHide,
        onShow,
        restoreFocus,
        scrollable,
        show,
        size
    } = props;
    return (
        <Modal
            animation={animation}
            autoFocus={autoFocus}
            backdrop={backdrop}
            backdropClassName={backdropClassName}
            bsPrefix={bsPrefix}
            centered={centered}
            container={container}
            dialogAs={dialogAs}
            dialogClassName={dialogClassName}
            enforceFocus={enforceFocus}
            id="modal"
            keyboard={keyboard}
            manager={manager}
            onEnter={onEnter}
            onEntered={onEntered}
            onEntering={onEntering}
            onEscapeKeyDown={onEscapeKeyDown}
            onExit={onExit}
            onExited={onExited}
            onExiting={onExiting}
            onHide={onHide}
            onShow={onShow}
            restoreFocus={restoreFocus}
            scrollable={scrollable}
            show={show}
            size={size}>

            <Modal.Header
                id="modal-header"
                closeButton={closeButton}
                closeLabel={closeLabel}
                bsPrefix={bsPrefixHeader}>
                <Modal.Title
                    id="title"
                    as={asTitle}
                    bsPrefix={bsPrefixTitle}>
                    {modalHeading}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body
                id="modal-body"
                as={asBody}
                bsPrefix={bsPrefixBody}
                children={bodyChildren}
            >
            </Modal.Body>
            {footerChildren ? (
                <Modal.Footer
                    id="modal-footer"
                    as={footerAs}
                    bsPrefix={bsPrefixFooter}
                    children={footerChildren}/>) : null}
        </Modal>
    );
};

CModal.defaultProps = {
    centered: true,
    closeButton: true,
    onHide: () => {
    }
};

CModal.propTypes = {
    animation: PropTypes.bool,
    asBody: PropTypes.elementType, // as
    asTitle: PropTypes.elementType, // as
    autoFocus: PropTypes.bool,
    backdrop: PropTypes.bool || PropTypes.string,
    backdropClassName: PropTypes.string,
    bsPrefix: PropTypes.string,
    bsPrefixBody: PropTypes.string,
    bsPrefixFooter: PropTypes.string,
    bsPrefixHeader: PropTypes.string,
    bsPrefixTitle: PropTypes.string,
    centered: PropTypes.bool,
    closeButton: PropTypes.bool,
    closeLabel: PropTypes.string,
    container: PropTypes.any,
    dialogAs: PropTypes.elementType,
    dialogClassName: PropTypes.string,
    enforceFocus: PropTypes.bool,
    footerAs: PropTypes.elementType,
    id: PropTypes.string,
    keyboard: PropTypes.bool,
    manager: PropTypes.object,
    modalHeading: PropTypes.string.isRequired,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onEntering: PropTypes.func,
    onEscapeKeyDown: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    onExiting: PropTypes.func,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func,
    restoreFocus: PropTypes.bool,
    scrollable: PropTypes.bool,
    show: PropTypes.bool,
    size: PropTypes.string,//sm lg xl
};

export default CModal;
