import React from 'react';
import {Button} from 'react-bootstrap';

const CButton = (props) => { 
    return( <div> 
             <button onClick={(id)=>{console.log(props.node.data)}}>Edit</button>
             <button onClick={(id)=>{console.log(props.node.data)}}>Delete</button>
             <button onClick={(id)=>{console.log(props.node.data)}}>CSV</button>
           </div>
           )
}
export default CButton;