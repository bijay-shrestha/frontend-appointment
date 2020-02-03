import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {withRouter} from 'react-router-dom';
import {TryCatchHandler} from "@frontend-appointment/helpers";

class CBreadcrumb extends PureComponent {
    state = {
        routes: [],
        currentLocation: ""
    };

    setCurrentLocation = path => {
        this.setState({currentLocation: path});
    };

    setRoutes = routes => {
        this.setState({routes: routes});
    };

    /**
     * GETS ARRAY OF PATH(URL) UPTO CURRENT PAGE
     * @returns {string[]}
     */
    getPathsToInclude = () => {
        let currentLocation = !this.state.currentLocation ?
            this.props.location.pathname : this.state.currentLocation;

        // GET AVAILABLE PATHS IN CURRENT PAGE URL
        let pathsToInclude = ((currentLocation).split('/'));

        // REMOVE THE FIRST EMPTY ELEMENT FROM ARRAY
        pathsToInclude.shift();

        let baseOfModule = pathsToInclude[0];

        // REMOVE THE BASE OF ADMIN
        pathsToInclude.shift();

        // IF ROUTE IS NOT 'home/dashboard' ADD 'home/dashboard' AS FIRST PATH
        pathsToInclude[0] !== "dashboard" && pathsToInclude.unshift("dashboard");

        //INCLUDE '/' IN EACH PATHNAME
        for (let i = 0; i < pathsToInclude.length; i++) {
            i === 0 || i === 1 ? pathsToInclude[i] = "/".concat(baseOfModule).concat("/".concat(pathsToInclude[i]))
                : pathsToInclude[i] = pathsToInclude[i - 1] + "/".concat(pathsToInclude[i])
        }

        return pathsToInclude;
    };

    /**
     *
     * @param pathsToInclude
     * @returns {Array}
     */
    addRoutesByPathsToInclude = pathsToInclude => {
        let routes = [];
        pathsToInclude.forEach(value => {
            routes = routes.concat(
                this.props.breadcrumbData
                    .filter(breadCrumb =>
                        breadCrumb.path === value
                    ));
        });
        return routes;
    };

    filterAndSetRoutesUptoCurrentPage = () => {
        this.setRoutes(this.addRoutesByPathsToInclude(this.getPathsToInclude()));
    };

    setCurrentLocationAndFilterRoutes = async path => {
        !path ? await this.setCurrentLocation(this.props.location.pathname)
            : await this.setCurrentLocation(path);
        this.filterAndSetRoutesUptoCurrentPage();
    };

    componentDidMount() {
        TryCatchHandler.genericTryCatch(this.setCurrentLocationAndFilterRoutes());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * SINCE IT IS LIFECYCLE METHOD , IT RUNS WITH EVERY TEST.
         * IN TEST WE DON'T HAVE ACCESS TO 'withRouter' SO IT WILL HAVE TO
         * BE SET MANUALLY IN FEW REQUIRED TEST CASES ONLY.
         * SO FOR OTHER TESTS WHERE THE PROPS ARE NOT SET,
         * 'location' and 'history' OBJECT  WILL NOT BE AVAILABLE RESULTING IN WHOLE TEST SUITE FAILURE.
         */
        if (prevProps.history) {
            const newPath = prevProps.history.location.pathname;
            const oldPath = prevProps.location.pathname;
            if (newPath !== oldPath) {
                TryCatchHandler.genericTryCatch(this.setCurrentLocationAndFilterRoutes(newPath));
            } else {
                return false
            }
        } else {
            return false
        }
    }

    createBreadcrumbLink = (breadcrumb, index) =>
        index !== this.state.routes.length - 1 &&
        breadcrumb.isLink ?
            {'href': "#".concat(breadcrumb.path)} : {'active': true};

    getBreadcrumbItemProps = (breadcrumb, index) => {
        const {itemAs, title, target, itemBsPrefix, itemChildren} = this.props;
        return (
            {
                'key': "breadcrumb".concat(breadcrumb.id).concat("-" + index),
                'id': "breadcrumbItem" + breadcrumb.id,
                'as': itemAs,
                'title': title,
                'target': target,
                'bsPrefix': itemBsPrefix,
                'children': itemChildren,
                ...this.createBreadcrumbLink(breadcrumb, index)
            }
        );
    };

    getBreadcrumbItems = (breadcrumb, index) =>
        <Breadcrumb.Item
            {...this.getBreadcrumbItemProps(breadcrumb, index)}
        >
            {index === 0 ? <i className="fa fa-home"/> : ''} {breadcrumb.name}
        </Breadcrumb.Item>;

    render() {
        const {as, label, listProps, bsPrefix, children} = this.props;
        return (
            <Breadcrumb
                as={as}
                label={label}
                listProps={listProps}
                bsPrefix={bsPrefix}
                children={children}
            >
                {this.state.routes.map((breadcrumb, index) => (
                    this.getBreadcrumbItems(breadcrumb, index)
                ))}
            </Breadcrumb>);
    }
}

CBreadcrumb.defaultProps = {
    location: {pathname: '/'}
};

React.propTypes = {
    breadcrumbData: Proptypes.array.isRequired,
    as: Proptypes.elementType,
    label: Proptypes.string,
    bsPrefix: Proptypes.string,
    listProps: Proptypes.object,
    children: Proptypes.array,
    title: Proptypes.node,
    target: Proptypes.string,
    href: Proptypes.string,
    active: Proptypes.boolean,
    itemAs: Proptypes.elementType,
    itemBsPrefix: Proptypes.string,
    itemChildren: Proptypes.array
};

/**
 * 'withRouter' IS A HIGHER ORDER COMPONENT PROVIDED BY 'react-router-dom'.
 * 'withRouter' WILL PASS UPDATED 'match', 'location', and 'history' PROPS
 * TO THE WRAPPED COMPONENT WHENEVER IT RENDERS.
 * IN BREADCRUMB COMPONENT IT IS USED TO DETECT THE ROUTE CHANGE ALONG WITH 'componentDidUpdate' LIFECYCLE METHOD.
 */
export default withRouter(CBreadcrumb);
