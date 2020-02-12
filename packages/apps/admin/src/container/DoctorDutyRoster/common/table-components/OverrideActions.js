import React from 'react';
import {Dropdown} from 'react-bootstrap';

import * as Material from 'react-icons/md';
import * as Feather from 'react-icons/fi';


const OverrideActions = props => {
    return (
        <>
            <Dropdown className="table-action">
                <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <Feather.FiMoreHorizontal/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        <Dropdown.Item
                            onClick={(e) => props.onClick(e, props.node.data, props.node.rowIndex, 'M')}>
                            <Material.MdEdit/> Modify</Dropdown.Item>}
                    {
                        <Dropdown.Item
                            onClick={(e) => props.onClick(e, props.node.data, props.node.rowIndex, 'R')}>
                            <Material.MdDeleteForever/> Remove</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default OverrideActions;
