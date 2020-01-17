import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { TryCatchHandler } from "../../../commons";

class CTabs extends PureComponent {

    state = {
        activeTabKey: ''
    };


    setActiveTabKey = value => this.setState({ activeTabKey: value });

    getCurrentUrlAndSetActiveTab = () => {
        this.setActiveTabKey(this.props.location.pathname);
    };

    handleTabSelect = async path => {
        await this.setActiveTabKey(path);
        this.props.history.push(path);
    };

    componentDidMount() {
        this.getCurrentUrlAndSetActiveTab();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.history) {
            const newPath = prevProps.history.location.pathname;
            const oldPath = prevProps.location.pathname;
            if (newPath !== oldPath) {
                this.setActiveTabKey(newPath);
            } else {
                return false
            }
        } else {
            return false
        }

    }

    getTabElements = (tab) => {
        const { tabpanelClass } = this.props;
        let title = <> <i className={tab.icon} aria-hidden="true"></i> {tab.name}</>;

        return (<Tab
            className={tab.tabpanelClass ? tab.tabpanelClass : ''}
            id={"tab_" + tab.id}
            key={"tab_" + tab.id}
            title={title}
            eventKey={tab.eventKey}
        >
            {tab.component}
        </Tab>)
    };

    render() {
        const
            {
                id,
                mountOnEnter,
                transition,
                unmountOnExit,
                variant,
                data
            } = this.props;

        return (
            <Tabs
                id={id}
                activeKey={this.state.activeTabKey}
                mountOnEnter={mountOnEnter}
                transition={transition}
                unmountOnExit={unmountOnExit}
                variant={variant}
                onSelect={path => TryCatchHandler.genericTryCatch(this.handleTabSelect(path))}
            >
                {data.map(tab =>
                    this.getTabElements(tab)
                )}
            </Tabs>);
    }
}

CTabs.defaultProps = {
    location: { pathname: '/' },
    history: { location: { pathname: '/' } }
};

React.propTypes = {
    data: Proptypes.array.isRequired,
    id: Proptypes.string, // HTML id attribute E.g:// id="controlled-tab-example" or "uncontrolled-tab-example"
    // or "noanim-tab-example" or "left-tabs-example"
    mountOnEnter: Proptypes.bool,
    transition: Proptypes.bool,
    unmountOnExit: Proptypes.bool,
    variant: Proptypes.string, // variant = tabs or pills
};

export default withRouter(CTabs);