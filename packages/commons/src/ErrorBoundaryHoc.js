import React from 'react'

class ErrorBoundary extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
      info: ''
    }
  }

  componentDidCatch (error, info) {
    if (error) {
      this.setState({
        hasError: true,
        info: info
      })
    }
  }

  render () {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'block',
            width: '200px',
            float: 'left',
            height: '200px',
            border: '2px solid lightblue',
            padding: '10px',
            margin: '10px'
          }}
        >
          <div
            style={{
              width: '200px',
              wordBreak: 'break-word'
            }}
          >
            Something went wrong!!!
          </div>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
