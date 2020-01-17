import React, {PureComponent} from 'react';
import {Form} from "react-bootstrap";
import './search.scss';


class CSearch extends PureComponent {
//    state={
//        isSearchButtonClicked:false
//    };
//     inputGroup = React.createRef();
//     formControl = React.createRef();

//     handleSearchIconClick = async() => {
//         await this.setState(prevState =>({
//             isSearchButtonClicked:true
//         }));
//         ReactDOM.findDOMNode(this.inputGroup.current).classList.toggle('open');
//         const inputGroupClass = ReactDOM.findDOMNode(this.inputGroup.current).className;
//         if (inputGroupClass.includes('open')) {
//             this.formControl.current.blur();
//         } else {
//             this.formControl.current.focus();
//         }

//     };

//     handleSearchHover = () => {
//         this.formControl.current.focus();
//         ReactDOM.findDOMNode(this.inputGroup.current).classList.remove('open');
//     };

//     handleSearchUnFocus = event => {
//         console.log(event);
//         const a =ReactDOM.findDOMNode(this.inputGroup.current).className;
//         console.log(a);

//         if (!event.target.value && this.state.isSearchButtonClicked ) {
//                 ReactDOM.findDOMNode(this.inputGroup.current).classList.add('open');
//         }
//         this.setState(({
//             isSearchButtonClicked:false
//             })
//         );


//     };

    handleSearchValueChange = (event) => {
        this.props.onChange(event);
    };

    render() {
        const {id, value} = this.props;
        return (

            <>
                {/* <Form className="search-form">
            <Form.Control
                ref={this.formControl}
                type='search'
                onChange={(e) => this.handleSearchValueChange(e)}
                onBlur={this.handleSearchUnFocus}
                placeholder='Search components'
                value={value}
                className="search"/>
                {/* <span className="search-btn"> </span>

                </Form> */}

                <div id="expandible-search">
                    <Form.Control
                        id={id}
                        type="search"
                        ref={this.formControl}
                        onChange={(e) => this.handleSearchValueChange(e)}
                        onBlur={this.handleSearchUnFocus}
                        placeholder='Search components'
                        value={value}/>
                </div>
            </>
        );
    }
}

export default CSearch;
