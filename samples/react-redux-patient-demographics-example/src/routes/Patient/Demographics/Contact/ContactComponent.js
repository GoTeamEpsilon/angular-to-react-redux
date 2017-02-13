import React, {Component} from 'react'

class Contact extends Component {
  constructor() {
    super()
  }

  render () {
    if (this.props.contact) {
      return (
        <table className="table">
          <tr>
            <td><strong>Name:</strong> {this.props.contact.name}</td>
            <td><strong>Relation:</strong> {this.props.contact.relation}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong> {this.props.contact.address}</td>
            <td><strong>Phone:</strong> {this.props.contact.phone}</td>
          </tr>
          <tr>
            <td><strong>City:</strong> {this.props.contact.city}</td>
            <td><strong>Postal:</strong> {this.props.contact.postal}</td>
          </tr>
          <tr>
            <td><strong>State:</strong> {this.props.contact.state}</td>
            <td><strong>Country:</strong> {this.props.contact.country}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong> {this.props.contact.email}</td>
            <td></td>
          </tr>
        </table>
      )
    } else {
      return null;
    }
  }
}

export default Contact
