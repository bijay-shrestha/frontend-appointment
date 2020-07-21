import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {MdEdit} from 'react-icons/md';
import {MdDeleteForever} from 'react-icons/md';
import {FiMoreHorizontal} from 'react-icons/fi';


const OverrideActions = props => {
    return (
        <>
            <Dropdown className="table-action">
                <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <FiMoreHorizontal/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        <Dropdown.Item
                            onClick={(e) => props.onClick(e, props.node.data, props.node.rowIndex, 'M')}>
                            <MdEdit/> Modify</Dropdown.Item>}
                    {
                        <Dropdown.Item
                            onClick={(e) => props.onClick(e, props.node.data, props.node.rowIndex, 'R')}>
                            <MdDeleteForever/> Remove</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default OverrideActions;
