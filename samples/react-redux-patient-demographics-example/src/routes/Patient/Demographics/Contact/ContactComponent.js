import React, {Component} from 'react'

class Contact extends Component {
  constructor() {
    super()
    this.state = { showForm: false }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    console.log("handleCancel")
    this.setState({ showForm: false})
  }

  handleDelete() {
    console.log("handleDelete")
  }

  handleEdit() {
    console.log("handleEdit")
    console.log(this.state);
    this.setState({ showForm: true})
  }

  handleSubmit() {
    console.log("handleSubmit")
  }

  render () {
    if (this.props.contact && this.state.showForm === false) {
      return (
        <div>
          <br/>
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

          <button type="button" className="btn btn-default btn-sm" onClick={this.handleDelete}>DELETE</button>
          <button type="button" className="btn btn-default btn-sm" onClick={this.handleEdit}>EDIT</button>


          <hr/>


        </div>
      )
    } else if (this.props.contact && this.state.showForm === true){
      return (
        <div>
          <form name="edit-contact-info">
            <table className="table">
              <tr>
                <td><strong>Name:</strong> <input type="text" name="fullname" required/></td>
                <td><strong>Relation:</strong> <input type="text"  required/></td>
              </tr>
              <tr>
                <td><strong>Address:</strong> <input type="text" required/></td>
                <td><strong>Phone:</strong> <input type="text" name="phone" required/></td>
              </tr>
              <tr>
                <td><strong>City:</strong> <input type="text" required/></td>
                <td><strong>Postal:</strong> <input type="text" required/></td>
              </tr>
              <tr>
                <td><strong>State:</strong> <input type="text" required/></td>
                <td><strong>Country:</strong> <input type="text" /></td>
              </tr>
              <tr>
                <td><strong>Email:</strong> <input type="email" required/></td>
                <td></td>
              </tr>
            </table>

            <button className="btn btn-default btn-sm" type="submit">SAVE</button>
            <button type="button" className="btn btn-default btn-sm" onClick={this.handleCancel}>CANCEL</button>

          </form>
        </div>
      )
    }
  }
}

export default Contact
