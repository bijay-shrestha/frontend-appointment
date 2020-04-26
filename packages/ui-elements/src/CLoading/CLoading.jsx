import React from 'react';
import {Image} from "react-bootstrap";

const CLoading = props => {
  return (
    <div className="filter-message c-loading">
      <div className="message-content">
        <Image src={require('./images/dot-loader-gray.svg')} className="loader" />
        <span>Loading</span>
      </div>
    </div>
    // <div className="filter-message">
            //     <div className="message-content">
            //         <Image
            //             src={require('../../../images/loader.svg')}
            //             className="loader"
            //         />
            //         <span>Loading....</span>
            //     </div>
            // </div>
  )
};

export default CLoading
