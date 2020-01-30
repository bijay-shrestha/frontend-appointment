import React,{memo} from 'react';
import DefaultPic from '../Add/picture.png';

const HospitalPicture = props => {
    return (
        <>
            {props.node.data.fileUri ? <div className="data-image"><img alt="PIC" src={props.node.data.fileUri}/> </div>:
                <div className="data-image">
                    <img alt="PIC" src={DefaultPic}/>
                </div>}

        </>

    );
};

export default memo(HospitalPicture);
