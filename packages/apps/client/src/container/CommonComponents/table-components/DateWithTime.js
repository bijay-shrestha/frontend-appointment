import React, {memo} from 'react'

const DateWithTime = (props) => {
    console.log("====",props.node.data);
    return (
        <>
            <ul className="doctor-column">
                <li>
                 {props.node.data.logDate}
                </li>
                <li>
                 {props.node.data.logTime}
                </li>
            </ul>
        </>
    )
};

export default memo(DateWithTime);
