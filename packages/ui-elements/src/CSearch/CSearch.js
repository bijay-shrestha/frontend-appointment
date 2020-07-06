import React, {PureComponent} from 'react';
import {Form} from "react-bootstrap";
import './search.scss';


class CSearch extends PureComponent {


    handleSearchValueChange = (event) => {
        this.props.onChange(event);
    };

    render() {
        const {id, value} = this.props;
        return (

            <>
                
                <div id="expandible-search">
                    <Form.Control
                        id={id}
                        type="search"
                        ref={this.formControl}
                        onChange={(e) => this.handleSearchValueChange(e)}
                        onBlur={this.handleSearchUnFocus}
                        placeholder='Search'
                        value={value}/>
                </div>
            </>
        );
    }
}

export default CSearch;
