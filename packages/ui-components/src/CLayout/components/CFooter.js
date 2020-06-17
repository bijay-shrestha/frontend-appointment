import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
class CFooter extends Component {
    render() {

        return (
            <React.Fragment>

                <footer className="container-fluid d-flex justify-content-between">
                  <Col>Copyright © 2019 Cogent Health. All rights reserved.</Col>
                  {/* <Col className="text-right">  Hospital Name.</Col> */}
                </footer>

            </React.Fragment>
        );

    }
}

export default CFooter;
