import React from 'react'

class Basic extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      name: ''
    }
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit () {
    this.setState({ showForm: true})
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name
  }

  render() {
    if (this.props.info && this.state.showForm === false) {
      return (
        <div>
          <table className="table">
            <tr>
              <td><strong>Name:</strong> {this.props.info.name}</td>
              <td><strong>DOB:</strong> {this.props.info.dob}</td>
            </tr>
            <tr>
              <td><strong>S.S.:</strong> {this.props.info.ss}</td>
              <td><strong>Martial Status:</strong> {this.props.info.martialStatus}</td>
            </tr>
            <tr>
              <td><strong>Gender:</strong> {this.props.info.gender}</td>
              <td><strong>Address:</strong> {this.props.info.address}</td>
            </tr>
            <tr>
              <td><strong>City:</strong> {this.props.info.address}</td>
              <td><strong>Postal:</strong> {this.props.info.postal}</td>
            </tr>
            <tr>
              <td><strong>State:</strong> {this.props.info.state}</td>
              <td><strong>Country:</strong> {this.props.info.country}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong> {this.props.info.phone}</td>
              <td><strong>Email:</strong> {this.props.info.email}</td>
            </tr>
            <tr>
              <td><strong>Billing Note:</strong> {this.props.info.billingNote}</td>
              <td><strong>Other Note:</strong> {this.props.info.otherNote}</td>
            </tr>
          </table>

          <button type="button" className="btn btn-default btn-sm" onClick={this.handleEdit}>EDIT</button>
        </div>
      )
    } else if (this.props.info && this.state.showForm === true) {
      return (
        <form name="basicInfoForm" className="basic-info-form" onSubmit={this.handleSubmit}>
          <table className="table">
            <tr>
              <td>
                <strong>Name:</strong>
                <input type="text" value={this.props.info.name} onChange={this.handleInputChange.bind(this)} name="name" />
              </td>
            </tr>
          </table>

          <button className="btn btn-default btn-sm" type="submit">SAVE</button>
        </form>
      )
    } else {
      return null
    }
  }
}

export default Basic
