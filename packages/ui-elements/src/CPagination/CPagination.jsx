import React, {PureComponent} from 'react';
import {Pagination, Container, Row, Col} from "react-bootstrap";

class CPagination extends PureComponent {

    state = {
        paginationItems: [],
        totalPages: '',
        firstDisabled: false,
        prevDisabled: false,
        nextDisabled: false,
        lastDisabled: false,
    };

    setTotalPages = async () => {
        let numbers = (this.props.totalItems % this.props.maxSize);
        let totalPageNumbers = numbers === 0 ? (this.props.totalItems / this.props.maxSize)
            : Math.floor(this.props.totalItems / this.props.maxSize) + 1;
        await this.setState({
            totalPages: totalPageNumbers
        })
    };

    addPaginationItemsBasedOnCurrentPage = async () => {
        let paginationItemsToAdd = [];
        let pages = [];
        if (this.state.totalPages) {
            for (let i = 1; i <= this.state.totalPages; i++) {
                pages.push(i);
            }
        }
        if (this.state.totalPages && this.props.currentPage) {
            this.props.currentPage - 2 > 0 && pages.includes(this.props.currentPage - 2) &&
            paginationItemsToAdd.push(this.props.currentPage - 2);
            this.props.currentPage - 1 > 0 && pages.includes(this.props.currentPage - 1)
            && paginationItemsToAdd.push(this.props.currentPage - 1);
            paginationItemsToAdd.push(this.props.currentPage);
            this.props.currentPage + 1 <= this.state.totalPages && pages.includes(this.props.currentPage + 1)
            && paginationItemsToAdd.push(this.props.currentPage + 1);
            this.props.currentPage + 2 <= this.state.totalPages && pages.includes(this.props.currentPage + 2)
            && paginationItemsToAdd.push(this.props.currentPage + 2);

            await this.setState({
                paginationItems: [...paginationItemsToAdd]
            })
        }
    };


    handleFirstClick = () => {
        let newPage = 1;
        this.props.onPageChanged(newPage);
    };

    handlePrevClick = () => {
        let currentPage = this.props.currentPage;
        let newPage = currentPage - 1;
        this.props.onPageChanged(newPage);
    };

    handlePaginationItemClick = (newPage) => {
        this.props.onPageChanged(newPage);
    };

    handleNextClick = () => {
        let currentPage = this.props.currentPage;
        let newPage = currentPage + 1;
        this.props.onPageChanged(newPage);
    };

    handleLastClick = () => {
        let newPage = this.state.totalPages;
        this.props.onPageChanged(newPage);
    };

    componentDidMount() {
        this.setTotalPages().then(
            () => this.addPaginationItemsBasedOnCurrentPage(),
            () => {
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        (prevProps.currentPage !== this.props.currentPage || prevProps.totalItems !== this.props.totalItems) &&
        this.setTotalPages().then(
            () => this.addPaginationItemsBasedOnCurrentPage(),
            () => {
            }
        )
    }

    render() {
        return <>
            <Container className="table-footer" fluid="true">
                <Row>

                    <Col sm="4"><h6>Total Records:&nbsp;{this.props.totalItems}</h6></Col>

                    <Col sm="4" className="text-center ">
                        Page <span>{this.props.currentPage}</span> of {" "} <span>{this.state.totalPages}</span>
                    </Col>
                    <Col sm="4">
                        <Pagination size="sm" className="pull-right">
                            <Pagination.First
                                onClick={this.handleFirstClick}
                                disabled={this.state.paginationItems[0] === 1}
                            >
                                First
                            </Pagination.First>
                            <Pagination.Prev
                                onClick={this.handlePrevClick}
                                disabled={this.state.paginationItems[0] - 1 <= 0}
                            />
                            {this.state.paginationItems.map(item =>
                                <Pagination.Item
                                    key={"item".concat(item)}
                                    onClick={() => this.handlePaginationItemClick(item)}
                                    activeLabel={this.props.currentPage}
                                    active={item === this.props.currentPage}>
                                    {item}
                                </Pagination.Item>
                            )}
                            <Pagination.Next
                                onClick={this.handleNextClick}
                                disabled={this.state.paginationItems[this.state.totalPages - 1] + 1 > this.state.totalPages}/>
                            <Pagination.Last
                                onClick={this.handleLastClick}
                                disabled={this.state.paginationItems[this.state.totalPages - 1] === this.state.totalPages}>
                                Last</Pagination.Last>
                        </Pagination>
                    </Col>

                </Row>
            </Container>
        </>;
    }
}

CPagination.defaultProps = {
    totalItems: 0,
    maxSize: 10,
    currentPage: 1,
};

export default CPagination;
