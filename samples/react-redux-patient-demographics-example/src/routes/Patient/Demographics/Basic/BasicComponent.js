import React from 'react'

class Basic extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  render() {
    if (this.props.info) {
      return (
        <div>
          <h1>{this.props.info.name}</h1>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default Basic
