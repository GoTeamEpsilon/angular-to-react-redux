import React, {Component} from 'react'
import MaskedInput from 'react-text-mask'
import {telephoneFormat} from '../../../../common/Formatters'

/***
 * @TODO console.log statements
 * @TODO change the name of Matt's function to setPropsToLocalState
 * @TODO change Matt's function to use 'event' instead of 'e'
 * @TODO test email masking with HTML5 and test :)
 */
class Contact extends Component {
  constructor() {
    super()
    this.state = {showForm: false}

    this.handleCancel = this.handleCancel.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleCancel() {
    console.log('handleCancel')
    this.setState({showForm: false})
  }

  handleDelete() {
    console.log('handleDelete')
  }

  handleEdit() {
    console.log('handleEdit')
    console.log(this.state)
    this.setPropsToLocalState()
    this.setState({showForm: true})
  }

  handleInputChange(event) {
    console.log('handleInputChange')
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log('handleSubmit')
    event.preventDefault()
  }

  setPropsToLocalState() {
    const keys = ['name', 'relation', 'address', 'phone', 'city', 'postal', 'state', 'country', 'email']

    keys.forEach((keyName) => {
      let value = this.props.contact[keyName]
      this.setState({
        [keyName]: value
      })
    })
  }

  render() {
    if (this.props.contact && this.state.showForm === false) {
      return (
        <div>
          <br/>
          <table className='table'>
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
            </tr>
          </table>

          <button type='button' className='btn btn-default btn-sm' onClick={this.handleDelete}>DELETE</button>
          <button type='button' className='btn btn-default btn-sm' onClick={this.handleEdit}>EDIT</button>

          <hr/>

        </div>
      )
    } else if (this.props.contact && this.state.showForm === true) {
      return (
        <div>
          <form name='edit-contact-info' className='contact-info-form' onSubmit={this.handleSubmit}>
            <table className='table'>
              <tr>
                <td><strong>Name:</strong> <input
                  type='text'
                  name='name'
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required/>
                </td>
                <td><strong>Relation:</strong> <input
                  type='text'
                  name='relation'
                  value={this.state.relation}
                  onChange={this.handleInputChange}
                  required/></td>
              </tr>
              <tr>
                <td><strong>Address:</strong> <input
                  type='text'
                  name='address'
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  required/></td>
                <td><strong>Phone:</strong> <MaskedInput
                  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  type='text'
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                  name='phone'/></td>
              </tr>
              <tr>
                <td><strong>City:</strong> <input
                  type='text'
                  name='city'
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  required/></td>
                <td><strong>Postal:</strong> <input
                  type='text'
                  name='postal'
                  value={this.state.postal}
                  onChange={this.handleInputChange}
                  required/></td>
              </tr>
              <tr>
                <td><strong>State:</strong> <input
                  type='text'
                  name='state'
                  value={this.state.state}
                  onChange={this.handleInputChange}
                  required/></td>
                <td><strong>Country:</strong> <input
                  type='text'
                  name='country'
                  value={this.state.country}
                  onChange={this.handleInputChange}
                  required/></td>
              </tr>
              <tr>
                <td><strong>Email:</strong> <input
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required/></td>
              </tr>
            </table>

            <button className='btn btn-default btn-sm' type='submit'>SAVE</button>
            <button type='button' className='btn btn-default btn-sm' onClick={this.handleCancel}>CANCEL</button>

          </form>
        </div>
      )
    }
  }
}

export default Contact
