import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import './excel-download.scss'

const CExcelDownload = props => {
    const handleDownload = event => {
        event.preventDefault();
        props.onClickHandler()
    }
    return (
        <>
            <OverlayTrigger
                trigger={'hover'}
                placement="top"
                overlay={<Tooltip id="tooltip-disabled"> Download Excel</Tooltip>}
            >
                <a
                    href="/"
                    id="downloadExcel"
                    name=""
                    onClick={handleDownload}
                    className="float-right excel-download"
                >
                    <img src={require('./xls-3.png')} alt="excel"/>
                </a>
            </OverlayTrigger>
        </>
    )
}

export default CExcelDownload
