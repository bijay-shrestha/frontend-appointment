import React, {PureComponent} from 'react';
import {Table} from "react-bootstrap";
import {Scrollbars} from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

class CTable extends PureComponent {

    getFooterContent = (footerData) => {
        let columnData = [];
        for (let i = 0; i < Object.keys(footerData).length; i++) {
            let colData = footerData["col" + (i + 1)];
            columnData.push(
                <td colSpan={colData.colSpan && colData.colSpan}>
                    {colData.value}
                </td>
            )
        }
        return columnData;
    };

    render() {
        const {
            id,
            columnDefinition,
            rowData,
            footerData,
            headerBordered,
            headerBorderless,
            headerHover,
            headerResponsive,
            headerStriped,
            headerVariant,
            headerBsPrefix,
            bordered,
            borderless,
            hover,
            responsive,
            size,
            striped,
            variant,
            bsPrefix
        } = this.props;
        return <>
            <div id={id}>
                <Table
                    id={id}
                    bordered={headerBordered}
                    borderless={headerBorderless}
                    hover={headerHover}
                    responsive={headerResponsive}
                    size={size}
                    striped={headerStriped}
                    variant={headerVariant}
                    bsPrefix={headerBsPrefix}
                >
                    <thead>
                    <tr>
                        {columnDefinition.map(column => (
                            <td>
                                {column.headerName}
                            </td>
                        ))}
                    </tr>
                    </thead>
                </Table>
                <Scrollbars
                    id="menus"
                    autoHide={true}
                    style={{height: 400}}>
                    <Table
                        id={id}
                        bordered={bordered}
                        borderless={borderless}
                        hover={hover}
                        responsive={responsive}
                        size={size}
                        striped={striped}
                        variant={variant}
                        bsPrefix={bsPrefix}
                    >
                        <tbody>
                        {
                            rowData.map((row, rowIndex) => (
                                <tr key={"row" + rowIndex}>
                                    {
                                        columnDefinition.map((column, colIndex) => (
                                            <td key={column.field + "-" + colIndex}>
                                                {
                                                    (row.isRowEditable && Object.keys(column).includes('editComponent')) ?
                                                        <column.editComponent
                                                            {...this.props}
                                                            node={{data: row}}/> :
                                                        Object.keys(column).includes('displayComponent') ?
                                                            <column.displayComponent
                                                                {...this.props}
                                                                node={{data: row}}/> : row[column.field]

                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Scrollbars>
                {
                    footerData ?
                        <Table
                            id={id}
                            bordered={true}
                            borderless={borderless}
                            hover={hover}
                            responsive={responsive}
                            size={size}
                            striped={striped}
                            variant={variant}
                            bsPrefix={bsPrefix}>
                            <tbody>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            </tbody>
                            <tfoot>
                            {
                                footerData.map(footer =>
                                    <tr>
                                        {
                                            this.getFooterContent(footer)
                                        }
                                    </tr>)
                            }
                            </tfoot>
                        </Table>
                        : ''
                }
            </div>
        </>;
    }
}

CTable.propTypes = {
    columnDefinition: PropTypes.arrayOf(PropTypes.shape({
        headerName: PropTypes.string.isRequired,
        field: PropTypes.string,
        displayComponent: PropTypes.element,
        editComponent: PropTypes.element
    })).isRequired,
    id: PropTypes.string.isRequired,
    rowData: PropTypes.arrayOf(PropTypes.object),
    footerData: PropTypes.arrayOf(PropTypes.shape({
        footerRowData: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any.isRequired,
            colSpan: PropTypes.string
        }))
    })),
    bordered: PropTypes.bool,
    borderless: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    size: PropTypes.string,
    striped: PropTypes.bool,
    variant: PropTypes.string,
    bsPrefix: PropTypes.string
};


export default CTable;
