import React, {PureComponent} from 'react';
import {Dropdown, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactDOM from "react-dom";

import './doubleShiftSearch.scss';
import {Scrollbars} from "react-custom-scrollbars";
import {LocalStorageSecurity, StringUtils} from "@frontend-appointment/helpers";

class CDoubleShiftSearch extends PureComponent {
    state = {
        searchKeyword: '',
        searchResult: [],
        showResults: false
    };

    formControl = React.createRef();
    searchDropdown = React.createRef();
    toggleDropdown = React.createRef();
    keyPressCount = 0;
    blur = 'none';

    resetState = () => {
        this.setState({
            searchKeyword: '',
            showResults: false
        })
    };

    setKeyPressCount = value => {
        this.keyPressCount = value
    };

    clearCount = async () => {
        this.setKeyPressCount(0)
    };

    clearKeyPressCount = () => {
        setTimeout(() => this.clearCount(), 300)
    };

    clearStateOnTimeout = () => {
        setTimeout(() => this.resetState(), 300);
    };

    blurSearchComponents = () => {
        this.formControl.current && this.formControl.current.blur();
        this.toggleDropdown.current && this.toggleDropdown.current.blur();
    };

    blurSearchOnMouseClick = (event) => {
        if (event.target.id.includes('search-dropdown')
            || event.target.id === 'searchMenu' || event.target.id === 'search-dropdown-toggler') {
            this.blur = 'none';
        } else {
            this.blur = 'blur';
            this.handleDropdownBlur();
        }
    };

    toggleSearchComponent = () => {
        let searchClass = ReactDOM.findDOMNode(this.formControl.current).className;
        if (!searchClass.includes('active')) {
            this.formControl.current && this.formControl.current.focus();
            this.toggleDropdown.current && this.toggleDropdown.current.click();
            this.blur = 'none';
        } else {
            this.blur = 'blur';
            this.formControl.current && this.blurSearchComponents()
        }
    };

    handleDropdownBlur = () => {
        if (this.blur !== 'none') {
            this.clearStateOnTimeout();
            this.blur = 'none';
            this.toggleDropdown.current && this.toggleDropdown.current.blur();
            this.formControl.current && ReactDOM.findDOMNode(this.formControl.current).classList.remove('active');
        }

    };

    handleKeyPress = event => {
        let keyCount = this.keyPressCount;
        if (event.keyCode === 16) {
            // ON SHIFT KEY PRESS
            if (!keyCount || keyCount === 2) {
                keyCount += 1;
                this.setKeyPressCount(keyCount);
                this.clearKeyPressCount()
            } else if (keyCount === 1) {
                keyCount += 1;
                this.setKeyPressCount(keyCount);
                this.toggleSearchComponent();
                this.clearKeyPressCount();
            } else if (keyCount === 3) {
                this.blur = 'blur';
                this.blurSearchComponents();
                this.clearCount()
            }
        } else if (event.keyCode === 40 || event.keyCode === 38) {
            // DOWN AND UP ARROW KEY PRESS
            this.blur = 'none';
        } else if (event.keyCode === 27) {
            // ESCAPE KEY PRESS
            this.blur = 'blur';
            this.handleDropdownBlur();
            this.formControl.current.blur();
        }
    };

    handleSearchOnBlur = () => {
        this.toggleDropdown.current.click();
    };

    handleSearchOnFocus = () => {
        ReactDOM.findDOMNode(this.formControl.current).classList.add('active');
        this.blur = 'none';
    };

    searchUserMenus = (event) => {
        let BASE_PATH = process.env.REACT_APP_BASE_PATH_CODE ? process.env.REACT_APP_BASE_PATH_CODE : '';
        let keyWord = event.target.value;
        let menusMatchingKeyWord = [];
        let menusFromStorage = LocalStorageSecurity.localStorageDecoder('userMenus');
        let userMenus = [...menusFromStorage];
        let count =0
        if (keyWord !== '') {
            keyWord = keyWord.toLowerCase();
            userMenus.map(
                (userMenu,index) => {
                  // console.log("index",index.toString()+""+count);
                    if (!userMenu.childMenus.length) {
                        if (StringUtils.compareStrings(keyWord, userMenu.name)) {

                            // IF PARENT MATCHES THE KEYWORD,ADD PARENT
                            let displayData = {
                                id: userMenu.id,
                                name: StringUtils.boldCharactersOfString(keyWord, userMenu.name,count<1?count:count++),
                                path: BASE_PATH.concat(userMenu.path),
                                breadcrumb: userMenu.name,
                                iCharacter: userMenu.name.charAt(0).toUpperCase()
                            };
                            menusMatchingKeyWord.push(displayData);
                            count++;
                        }
                    } else {
                        // IF PARENT DID NOT MATCH CHECK CHILDREN, IF ANY  CHILD MATCHED ADD  PARENT AND CHILD
                        let childrenMatchingKeyWord = userMenu.childMenus.filter(
                            child => StringUtils.compareStrings(keyWord, child.name))
                        if (childrenMatchingKeyWord.length > 0) {
                            childrenMatchingKeyWord.map((child,index) => {
                                let displayData = {
                                    id: child.id,
                                    name: StringUtils.boldCharactersOfString(keyWord, child.name,count===0?0:index++),
                                    path: BASE_PATH.concat(child.path),
                                    breadcrumb: userMenu.name.concat("/".concat(child.name)),
                                    iCharacter: child.name.charAt(0).toUpperCase()
                                };
                                menusMatchingKeyWord.push(displayData);
                                count++;
                                return child;
                            });
                        }
                    }
                    return userMenu
                }
            )
        } else {
            menusMatchingKeyWord = [];
        }

        this.setState({
            searchKeyword: event.target.value,
            searchResult: [...menusMatchingKeyWord],
            showResults: true
        });
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        document.addEventListener("click", this.blurSearchOnMouseClick);
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
        document.removeEventListener('click', this.blurSearchOnMouseClick);
        clearTimeout(this.clearKeyPressCount, this.clearStateOnTimeout);
    }


    render() {
        return <>
            <Dropdown
                id={"search-dropdown"}
                ref={this.searchDropdown}
                alignRight
                className="topbar-dropdown topbar-search"
                show={this.state.showResults}
                onBlur={this.handleDropdownBlur}
            >
                <Dropdown.Toggle variant="default"
                                 id="search-dropdown-toggler" //donot use this id else where
                                 className="search-button rounded-circle"
                                 ref={this.toggleDropdown}
                >
                    <div id="menu-search">

                        <Form.Control
                            id={"searchMenu"}
                            type="search"
                            ref={this.formControl}
                            onChange={this.searchUserMenus}
                            onFocus={this.handleSearchOnFocus}
                            placeholder='Search Menus'
                            value={this.state.searchKeyword}
                            autoComplete="off"/>
                        {/* <i className= "fa fa-search" > </i>
                         </Form.Control> */}

                        <span className="search-text"> Press Double Shift Key To Search Menu </span>
                    </div>

                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="drop-down-list"
                    show={this.state.showResults}
                >
                    <div className="menu-list-container">

                        {
                            this.state.searchResult.length > 0 ?
                                <Scrollbars style={{'height': '428px'}} autoHide={false}>
                                    {this.state.searchResult.map(value => (
                                        <Dropdown.Item
                                            id={"search-dropdown".concat(value.id)}
                                            key={'menu-li' + value.id}
                                            as={Link}
                                            to={value.path}
                                            className="menu-link">

                                            <div className="anchor-icon">
                                                {value.iCharacter}
                                            </div>
                                            <div className="menu-box">
                                                <div className="menu">{value.name}</div>
                                                <div className="sub-menu">{value.breadcrumb}</div>
                                            </div>
                                        </Dropdown.Item>

                                    ))
                                    }
                                </Scrollbars>
                                :
                                <Dropdown.Item>
                                    <div className="my-4">
                                        No result(s) found.
                                    </div>
                                </Dropdown.Item>

                        }

                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>;
    }
}

export default CDoubleShiftSearch;
