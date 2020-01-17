import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';

 import * as Material from 'react-icons/md';
 import * as Feather from 'react-icons/fi';

class TableAction extends PureComponent {
    render() {

        return (

            <>

                <Dropdown className="table-action">
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                    {/* <Material.MdMoreVert /> */}
                    {/* <FontAwesome.FaEllipsisH /> */}
                    <Feather.FiMoreHorizontal />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => this.props.onClick(e,this.props.node.data.id,'E')}> <Material.MdEdit />  Edit </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => this.props.onClick(e,this.props.node.data.id,'D')}><Material.MdDeleteForever /> Delete</Dropdown.Item>
  
                    </Dropdown.Menu>
                </Dropdown>

            </>

        );
    };
};

export default TableAction;