import React, {PureComponent} from 'react'
import CHeader from './components/CHeader'
import CFooter from './components/CFooter'
import {CSideBar} from '@frontend-appointment/ui-elements'
import classNames from 'classnames'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'

class CLayout extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: props.isOpen ? props.isOpen : props.isOpen,
            isMobile: true,
            hover: props.isHover ? props.isHover : props.isHover
        }
        this.previousWidth = -1
    }

    updateWidth() {
        const width = window.innerWidth
        const widthLimit = 576
        const isMobile = width <= widthLimit
        const wasMobile = this.previousWidth <= widthLimit
        if (isMobile !== wasMobile) {
            this.setState({
                isOpen: !isMobile
            })
        }
        this.previousWidth = width
    }

    /**
     * Add event listener
     */

    componentDidMount() {
        // console.log(this.props)
        //this.updateWidth()
        //window.addEventListener('resize', this.updateWidth.bind(this))
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.updateWidth.bind(this))
    }

    toggle = () => {
        let flag = false
        if (!this.state.isOpen) flag = true
        LocalStorageSecurity.localStorageEncoder('isOpen', flag)
        this.setState(prevState => ({isOpen: !prevState.isOpen}))
    };

    onHoverSideBar = () => {
        if (!this.state.isOpen) {
            LocalStorageSecurity.localStorageEncoder('isHover', true)
            this.setState({
                hover: true
            })
        }
    };

    onLeaveHoverSideBar = () => {
        if (!this.state.isOpen) {
            LocalStorageSecurity.localStorageEncoder('isHover', false)
            this.setState({
                hover: false
            })
        }
    };

    render() {
        const {mainViewComponent, hasTab} = this.props
        const MainViewComponent = mainViewComponent
        return (
            <>
                <div id="wrapper">
                    <CSideBar
                        toggle={this.toggle}
                        isOpen={this.state.isOpen}
                        isHover={this.state.hover}
                        onLeaveHover={this.onLeaveHoverSideBar}
                        onHoverSideBar={this.onHoverSideBar}
                        trees={this.props.userMenus}
                        localFunc={LocalStorageSecurity}
                        activeStateKey={this.props.activeStateKey}
                        hasTab={this.props.hasTab}
                    />

                    {/* Content Wrapper  */}
                    <div
                        id="content-wrapper"
                        className={classNames('d-flex flex-column content', {
                            'is-open': this.state.isOpen,
                            'is-close': !this.state.isOpen
                        })}
                    >
                        <div id="topbar-wrapper">
                            <CHeader {...this.props} />
                        </div>

                        {/*  <div id="breadcrumb">
                      <CBreadcrumb
                                id="cogent"
                                breadcrumbData={dataForBreadCrumb}/>
                        </div>*/}

                        {/* Main Content  */}
                        <div id="main-content">
                            {hasTab ? <MainViewComponent {...this.props}/> : MainViewComponent}
                            {/*{clonedContentView}*/}
                        </div>

                        {/*End Main Content  */}

                        <div id="footer-wrapper">
                            <CFooter/>
                        </div>
                    </div>
                    {/*End Main Content-wrapper  */}
                </div>
            </>
        )
    }
}

export default CLayout
