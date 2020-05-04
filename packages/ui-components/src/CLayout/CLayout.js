import React, {PureComponent} from 'react'
import CHeader from './components/CHeader'
import CFooter from './components/CFooter'
import {CSideBar} from '@frontend-appointment/ui-elements'
import classNames from 'classnames'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'

class CLayout extends PureComponent {
    constructor(props) {
        super(props)
        this.isOpen=props.isOpen;
        this.isMobile=true;
        this.hover=props.isHover
        // this.state = {
        //     isOpen: props.isOpen ? props.isOpen : props.isOpen,
        //     isMobile: true,
        //     hover: props.isHover ? props.isHover : props.isHover
        // }
        // this.state={
        //     reload:false
        // }
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

    // componentDidMount() {
    //     // console.log(this.props)
    //     //this.updateWidth()
    //     //window.addEventListener('resize', this.updateWidth.bind(this))
    // }

    // componentWillUnmount() {
    //     //window.removeEventListener('resize', this.updateWidth.bind(this))
    // }

    toggle = () => {
        let flag = false
        if (!this.isOpen) flag = true
        LocalStorageSecurity.localStorageEncoder('isOpen', flag)
        this.isOpen =!this.isOpen
        this.setState(prevState => ({reload: prevState?!prevState.reload:true}))
    };

    onHoverSideBar = () => {
        if (!this.isOpen) {
            LocalStorageSecurity.localStorageEncoder('isHover', true)
            this.hover=true;
            this.setState(prevState=>({
                reload: prevState?!prevState.reload:true
            }))
        }
    };

    onLeaveHoverSideBar = () => {
        if (!this.isOpen) {
            LocalStorageSecurity.localStorageEncoder('isHover', false)
            this.hover=false;
            this.setState(prevState =>({
                reload: prevState?!prevState.reload:true
            }))
        }
    };

    render() {
        const {MainViewComponent} = this.props
        // console.log("Layout",this.props);
        return (
            <>
                <div id="wrapper">
                    <CSideBar
                        toggle={this.toggle}
                        isOpen={this.isOpen}
                        isHover={this.hover}
                        onLeaveHover={this.onLeaveHoverSideBar}
                        onHoverSideBar={this.onHoverSideBar}
                        trees={this.props.userMenus}
                        localFunc={LocalStorageSecurity}
                        activeStateKey={this.props.activeStateKey}
                        hasTab={this.props.hasTab}
                        // history={{...this.props.layoutProps.history}}
                    />

                    {/* Content Wrapper  */}
                    <div
                        id="content-wrapper"
                        className={classNames('d-flex flex-column content', {
                            'is-open': this.isOpen,
                            'is-close': !this.isOpen
                        })}
                    >
                        <div id="topbar-wrapper">
                            <CHeader {...this.props}/>
                        </div>

                        {/*  <div id="breadcrumb">
                      <CBreadcrumb
                                id="cogent"
                                breadcrumbData={dataForBreadCrumb}/>
                        </div>*/}

                        {/* Main Content  */}
                        <div id="main-content">
                            {/* {hasTab ? <MainViewComponent {...this.props}/> : MainViewComponent} */}
                            <MainViewComponent/>
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
