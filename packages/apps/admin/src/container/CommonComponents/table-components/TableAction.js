import React, {PureComponent} from 'react';
import {Dropdown} from 'react-bootstrap';

import * as Material from 'react-icons/md';
import * as Feather from 'react-icons/fi';
import {ActionFilterUtils} from "@frontend-appointment/helpers";

const {checkIfRoleExists} = ActionFilterUtils;

class TableAction extends PureComponent {
    checkRoleExists = (actionId) => {
        if(checkIfRoleExists(this.props.filteredAction, actionId) || (this.props.byPass && this.props.onlyEdit)){
          sessionStorage.setItem('action',actionId)
         return true
        }
        return false;
    }
    render() {
        return (
            <>
                <Dropdown className="table-action">
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                        <Feather.FiMoreHorizontal/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                           this.checkRoleExists(3)?
                                <Dropdown.Item
                                    onClick={(e) => this.props.onClick(e, this.props.node.data.id, 'E', this.props.node.data)}>
                                    <Material.MdEdit/> Edit </Dropdown.Item> : ''}
                        {   this.checkRoleExists(5)?
                                <Dropdown.Item
                                    onClick={(e) => this.props.onClick(e, this.props.node.data.id, 'D', this.props.node.data)}>
                                    <Material.MdDeleteForever/> Delete</Dropdown.Item> : ''}
                        {
                             this.checkRoleExists(8) ?
                                <Dropdown.Item
                                    onClick={(e) => this.props.onClick(e, this.props.node.data.id, 'C', this.props.node.data)}>
                                    <Material.MdContentCopy/>&nbsp;
                                    Clone and Add New
                                </Dropdown.Item> : ''}
                    </Dropdown.Menu>
                </Dropdown>
            </>
        );
    };
}

export default TableAction;
