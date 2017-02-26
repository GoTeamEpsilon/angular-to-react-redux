import React, {Component} from 'react'
import MaskedInput from 'react-text-mask'
import moment from 'moment'
import { telephoneFormat } from '../../../../common/Formatters'

/***
 * @TODO handleInputChange
 * @TODO setLocalStateToStoreValues
 * @TODO bring local state into form values
 * @TODO remove moment.js and console.log statements
 * @TODO test email masking with HTML5 and test :)
 */
class Contact extends Component {
  constructor() {
    super()
    this.state = { showForm: false }
    
    this.handleCancel = this.handleCancel.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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

  handleInputChange(e) {
    console.log("handleInputChange")
    e.preventDefault()
  }
  
  handleSubmit() {
    console.log("handleSubmit")
  }
  
  setLocalStateToStoreValues() {
    const keys = ['name', 'relation', 'address', 'phone', 'city', 'postal', 'state', 'country', 'email']
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
              <td><strong>Phone:</strong> {telephoneFormat(this.props.contact.phone)}</td>
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
          <form name="edit-contact-info" className="contact-info-form" onSubmit={this.handleSubmit}>
            <table className="table">
              <tr>
                <td><strong>Name:</strong> <input type="text" name="fullname" required/></td>
                <td><strong>Relation:</strong> <input type="text"  required/></td>
              </tr>
              <tr>
                <td><strong>Address:</strong> <input type="text" required/></td>
                <td><strong>Phone:</strong> <MaskedInput mask={['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                                                         type="text"
                                                         value='2816368899'
                                                         onChange={this.handleInputChange}
                                                         name="phone" /></td>
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
