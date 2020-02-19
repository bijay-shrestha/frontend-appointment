import React from 'react';
import CSelect from './CSelect';

 class DropDownSelector extends React.PureComponent {
   render(){
    // console.log(this.props.node);
      return (
        <React.Fragment>
             <CSelect
               name={this.props.name}
               options={this.props.options}
              // onChange={(e) => this.props.onChange(e)}
               defaultValue={this.props.data.country.value?this.props.data.country:''}
             //  value={this.props.data.country.value?this.props.data.country:''} 
              />
        </React.Fragment>
    )
    }
}
export default DropDownSelector;