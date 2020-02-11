import React, {PureComponent} from 'react';
import {Form} from "react-bootstrap";
import './search.scss';


class CMenuSearch extends PureComponent {
//    state={
//        isSearchButtonClicked:false,
//        keyPressCount:[]
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
        const {id, value, setRef, handleOnBlur,handleOnFocus} = this.props;
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
                        placeholder='Search user menus'
                        value={value}/>
                </div>
            </>
        );
    }
}

export default CMenuSearch;
