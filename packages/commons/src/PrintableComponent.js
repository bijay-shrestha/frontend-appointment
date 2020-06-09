import React, {createRef} from 'react'
import ReactToPrint,{PrintContextConsumer} from 'react-to-print'
import {CButton} from '@frontend-appointment/ui-elements'
const PrintableComponentHoc = (ComponentToPrint, data, pastProps) => {
  class PrintableComponent extends React.PureComponent {
    componentRef = createRef()
    state = {show: false}
    render () {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef.current}
          >
           <PrintContextConsumer>
            {({ handlePrint }) => (
             <CButton
             variant="success"
             size="sm"
             className="float-right btn-action ml-1"
             name="Print"
             onClickHandler={handlePrint}
             />
            )}
          </PrintContextConsumer>
          </ReactToPrint>
          <div style={{display: this.state.show ? '' : 'none'}}>
            {' '}
            <ComponentToPrint
              {...this.props}
              show={this.state.show}
              data={data}
              ref={this.componentRef}
              {...pastProps}
            />
          </div>
        </div>
      )
    }
  }
  return PrintableComponent
}
export default PrintableComponentHoc
