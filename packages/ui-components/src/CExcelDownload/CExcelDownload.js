import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import './excel-download.scss'

class CExcelDownload extends React.PureComponent {
  render () {
    // const {favouritesList} = this.props.favouritesProp

    return (
      <>
        {/* <OverlayTrigger
          trigger={'hover'}
          placement="top"
          overlay={<Tooltip id="tooltip-disabled"> Download Excel</Tooltip>}
        > */}
          <a
            href="javascript:;"
            id="downloadExcel"
            name=""
            onClick={this.props.onClickHandler}
            className="float-right btn btn-light excel-download"
          >
            <img src={require('./xls-3.png')} alt="excel" />&nbsp;Download Excel
          </a>
        {/* </OverlayTrigger> */}
      </>
    )
  }
}

export default CExcelDownload
