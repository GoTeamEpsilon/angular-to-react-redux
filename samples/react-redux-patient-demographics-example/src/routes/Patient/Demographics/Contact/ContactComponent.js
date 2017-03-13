import React, {Component} from 'react'
import MaskedInput from 'react-text-mask' // Delete?
import Formsy from 'formsy-react'
import { FormsyInput } from '../../../../common/FormsyInput'
import { FormsyDatePicker } from '../../../../common/FormsyDatePicker'
import { FormsyMaskedInput } from '../../../../common/FormsyMaskedInput'
import { wireUpCustomFormsyValidators } from '../../../../common/CustomValidators'
import {telephoneFormat} from '../../../../common/Formatters'


class Contact extends Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      cachedForm: {}
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    wireUpCustomFormsyValidators()
  }

  handleCancel() {
    console.log('handleCancel')
    this.setState(this.state.cachedForm)
    //this.setState({ cachedForm: {} })
    this.setState({showForm: false})
  }

  handleDelete() {
    console.log('handleDelete')
  }

  handleEdit() {
    console.log('handleEdit')
    this.setPropsToLocalState()
    this.setState({showForm: true})
    //this.setState({ cachedForm: this.props.contact })
  }

  handleInputChange(event) {
    console.log('handleInputChange')
    let value
    if(event.target.name === 'phone') {
      value = this.sanitizeToJustNumbers(event.target.value.toString())
    } else {
      value = event.target.value
    }
    this.setState({
      [event.target.name]: value
    })
  }

  handleSubmit(formValues) {
    console.log('handleSubmit')

    console.log(formValues);
    this.props.updateContactData(formValues)
    this.setState({ showForm: false })
  }
  
  sanitizeToJustNumbers(value) {
    if (!value) {
      return value
    }

    return value.replace(/[^0-9.]/g, '')
  }
  
  setPropsToLocalState() {
    const keys = ['id','name', 'relation', 'address', 'phone', 'city', 'postal', 'state', 'country', 'email']

    keys.forEach((keyName) => {
      let value
      // Make switch statement
      if (keyName === 'phone') {
        value = this.sanitizeToJustNumbers(this.props.contact[keyName].toString())
      } else if (keyName === 'id'){
        value = this.props.contact[keyName]
      } else {
        value = this.props.contact[keyName]
      }
      
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
        
          <Formsy.Form onValidSubmit={this.handleSubmit.bind(this)}
                       name='contactInfoForm'
                       className='container contact-info-form'
                       noValidate>
            <table className='table'>
              <tr>
                <td>
                  <FormsyInput value={this.state.name}
                               onChange={this.handleInputChange}
                               name='name'
                               label='Name'
                               validations={{
                                 maxLength: 30,
                                 minLength: 2
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid name is required',
                                 maxLength: 'You must not enter more than 30 characters',
                                 minLength: 'You must enter at least 2 characters'
                               }}
                               required />
                </td>
                <td>
                  <FormsyInput value={this.state.relation}
                               onChange={this.handleInputChange}
                               name='relationship'
                               label='Relationship'
                               validations={{
                                 maxLength: 25,
                                 minLength: 1
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid relationship is required',
                                 maxLength: 'You must not enter more than 25 characters',
                                 minLength: 'You must enter at least 1 character'
                               }}
                               required />
                </td>
              </tr>
              <tr>
                <td>
                  <FormsyInput value={this.state.address}
                               onChange={this.handleInputChange}
                               name='address'
                               label='Address'
                               validations={{
                                 maxLength: 20,
                                 minLength: 2
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid address is required',
                                 maxLength: 'You must not enter more than 20 characters',
                                 minLength: 'You must enter at least 2 characters'
                               }}
                               required /></td>
                <td>
                  <FormsyMaskedInput mask={['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                                     value={this.state.phone}
                                     onChange={this.handleInputChange}
                                     validations={{
                                       isLength: 10
                                     }}
                                     sanitizationFunction={this.sanitizeToJustNumbers}
                                     validationErrors={{
                                       isDefaultRequiredValue: 'Valid phone is required',
                                       isLength: 'Valid phone is required'
                                     }}
                                     name='phone'
                                     label='Phone'
                                     required /></td>
              </tr>
              <tr>
                <td>
                  <FormsyInput value={this.state.city}
                               onChange={this.handleInputChange}
                               name='city'
                               label='City'
                               validations={{
                                 maxLength: 30,
                                 minLength: 2
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid city is required',
                                 maxLength: 'You must not enter more than 30 characters',
                                 minLength: 'You must enter at least 2 characters'
                               }}
                               required />
                </td>
              </tr>
              <tr>
                <td>
                  <FormsyInput value={this.state.state}
                               onChange={this.handleInputChange}
                               name='state'
                               label='State'
                               validations={{
                                 maxLength: 20,
                                 minLength: 2
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid state is required',
                                 maxLength: 'You must not enter more than 20 characters',
                                 minLength: 'You must enter at least 2 characters'
                               }}
                               required />
                </td>

                <td>
                  <FormsyInput
                              value={this.state.postal}
                               onChange={this.handleInputChange}
                               name='postal'
                               label='Postal'
                               validations={{
                                 maxLength: 10,
                                 minLength: 4
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid postal is required',
                                 maxLength: 'You must not enter more than 10 characters',
                                 minLength: 'You must enter at least 4 characters'
                               }}
                               required />
                </td>
              </tr>
              <tr>
                <td>
                  <FormsyInput value={this.state.country}
                               onChange={this.handleInputChange}
                               name='country'
                               label='Country'
                               validations={{
                                 maxLength: 30,
                                 minLength: 2
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid country is required',
                                 maxLength: 'You must not enter more than 30 characters',
                                 minLength: 'You must enter at least 2 characters'
                               }}
                               required />
                </td>
              </tr>
              <tr>
                <td>
                  <FormsyInput value={this.state.email}
                               onChange={this.handleInputChange}
                               name='email'
                               label='Email'
                               validations={{
                                 maxLength: 20,
                                 isEmail: true
                               }}
                               validationErrors={{
                                 isDefaultRequiredValue: 'Valid email is required',
                                 isEmail: 'Valid email is required',
                                 maxLength: 'You must not enter more than 20 characters'
                               }}
                               required />
                </td>
              </tr>
            <tr>
              <td>
                <FormsyInput type='hidden'
                             value={this.state.id}
                             onChange={this.handleInputChange}
                             name='id'
                             label='ID'

                             required />
              </td>
            </tr>
            </table>

            <button className='btn btn-default btn-sm' type='submit'>SAVE</button>
            <button type='button' className='btn btn-default btn-sm' onClick={this.handleCancel}>CANCEL</button>

          </Formsy.Form>
        
      )
    }
  }
}

export default Contact
