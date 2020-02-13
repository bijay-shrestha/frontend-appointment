import React, {PureComponent} from 'react';
import {Form} from "react-bootstrap";
import './search.scss';



class CMenuSearch extends PureComponent {


    handleSearchValueChange = (event) => {
        this.props.onChange(event);
    };


    render() {
        const {id, value, setRef, handleOnBlur, handleOnFocus, handleOnKeyDown} = this.props;
        return (

            <>
                <div id="menu-search">
                    <Form.Control
                        id={id}
                        type="search"
                        ref={setRef}
                        onChange={(e) => this.handleSearchValueChange(e)}
                        onBlur={handleOnBlur}
                        onFocus={handleOnFocus}
                        onKeyDown={handleOnKeyDown}
                        placeholder='Search Menus'
                        value={value}
                        autoComplete="off"/>
                </div>
            </>
        );
    }
}

export default CMenuSearch;
