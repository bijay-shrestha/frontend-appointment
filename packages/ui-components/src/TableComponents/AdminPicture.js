import React from 'react';
import DefaultPic from '../img/amin-default-picture.png';

const AdminPicture = props => {
    return (
        <>
            {props.node.data.fileUri ? <div className="data-image"><img alt="PIC" src={props.node.data.fileUri}/> </div>:
                <div className="data-image">
                    <img alt="PIC" src={DefaultPic}/>
                </div>}

        </>

    );
};

export default AdminPicture;
