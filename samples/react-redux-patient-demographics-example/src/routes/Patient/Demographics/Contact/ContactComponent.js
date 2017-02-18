import React, {Component} from 'react'

class Contact extends Component {
  constructor() {
    super()
  }

  render () {
    if (this.props.contact) {
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
          

          <hr/>

          
        </div>
      )
    } else {
      return (
        <div>
          <p>THE COMMENTED OUT SECTION BELOW WOULD HERE?????????????????????</p>
        </div>
      )
    }
  }
}

export default Contact


/*
 <form name="contactInfoForm" className="contact-info-form">
 <table className="table2">
 <tr>
 <td><strong>Name:</strong> <input type="text" name="fullname" required/>
 <div><p className="help-block">A name is required</p></div></td>
 <td><strong>Relation:</strong> <input type="text"  required/></td>
 </tr>
 <tr>
 <td><strong>Address:</strong> <input type="text" required/></td>
 <td><strong>Phone:</strong> <input type="text" name="phone" required/>
 <div><p className="help-block">A valid phone number is required</p></div></td>
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
 
 <button className="btn btn-default btn-sm"
 type="submit"
 >SAVE</button>
 <button type="button"
 className="btn btn-default btn-sm"
 >CANCEL</button>
 </form>
 
 <button type="button"
 className="btn btn-default btn-sm"
 >DELETE</button>
 <button type="button"
 className="btn btn-default btn-sm"
 >EDIT</button>
 */
