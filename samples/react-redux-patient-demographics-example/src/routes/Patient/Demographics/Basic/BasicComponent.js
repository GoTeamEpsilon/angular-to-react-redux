import React from 'react'
import moment from 'moment'
import { telephoneFormat, socialSecurityFormat } from '../../../../common/Formatters'
import Formsy from 'formsy-react'
import { wireUpCustomFormsyValidators } from '../../../../common/CustomValidators'
import { FormsyInput } from '../../../../common/FormsyInput'
import { FormsyDatePicker } from '../../../../common/FormsyDatePicker'
import { FormsyMaskedInput } from '../../../../common/FormsyMaskedInput'

require('react-datepicker/dist/react-datepicker.css')

class Basic extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      dob: moment()
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    wireUpCustomFormsyValidators()
  }

  handleEdit () {
    this.setLocalStateToStoreValues()
    this.setState({ showForm: true })
  }

  componentDidMount() {
  }

  handleSubmit() {
  }

  sanitizeToJustNumbers(value) {
    if (!value) {
      return value
    }

    return value.replace(/[^0-9.]/g, '')
  }

  handleInputChange(event) {
    if (event && event.target && event.target.name) {
      let value
      switch (event.target.name) {
        case 'phone':
        case 'ss':
          value = this.sanitizeToJustNumbers(event.target.value.toString())
          break
        default:
          value = event.target.value
      }
      this.setState({
        [event.target.name]: value
      })
    } else {
      // Assuming it is the date time picker
      this.setState({
        dob: event
      })
    }
  }

  setLocalStateToStoreValues() {
    const keys = ['name', 'dob', 'ss', 'martialStatus', 'gender', 'address', 'postal', 'city', 'state',
                  'country', 'phone', 'email', 'billingNote', 'otherNote']

    keys.forEach((keyName) => {
      let value

      switch (keyName) {
        case 'dob':
          value = moment(this.props.info[keyName])
          break
        case 'phone':
        case 'ss':
          value = this.sanitizeToJustNumbers(this.props.info[keyName].toString())
          break
        default:
          value = this.props.info[keyName]
      }
      this.setState({
        [keyName]: value
      })
    })
  }

  render() {
    if (this.props.info && this.state.showForm === false) {
      return (
        <div>
          <table className='table'>
            <tr>
              <td><strong>Name:</strong> {this.props.info.name}</td>
              <td><strong>DOB:</strong> {this.props.info.dob}</td>
            </tr>
            <tr>
              <td><strong>S.S.:</strong> {socialSecurityFormat(this.props.info.ss)}</td>
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
              <td><strong>Phone:</strong> {telephoneFormat(this.props.info.phone)}</td>
              <td><strong>Email:</strong> {this.props.info.email}</td>
            </tr>
            <tr>
              <td><strong>Billing Note:</strong> {this.props.info.billingNote}</td>
              <td><strong>Other Note:</strong> {this.props.info.otherNote}</td>
            </tr>
          </table>

          <button type='button' className='btn btn-default btn-sm' onClick={this.handleEdit}>EDIT</button>
        </div>
      )
    } else if (this.props.info && this.state.showForm === true) {
      return (
         <Formsy.Form onValidSubmit={this.handleSubmit}
                      name='basicInfoForm'
                      className='basic-info-form'
                      noValidate>
          <table className='table'>
            <tr>
              <td>
                <strong>Name:</strong>
                <FormsyInput value={this.state.name}
                             onChange={this.handleInputChange}
                             name='name'
                             validations={{
                               maxLength: 20,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid name is required',
                               maxLength: 'You must not enter more than 20 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
              <td>
                <strong>DOB:</strong>
                <FormsyDatePicker value={this.state.dob}
                                  onChange={this.handleInputChange}
                                  name='dob'
                                  validations={{
                                    isDob: true
                                  }}
                                  validationErrors={{
                                    isDefaultRequiredValue: 'Valid dob is required',
                                    isDob: 'Valid dob is required'
                                  }}
                                  required />
              </td>
            </tr>
            <tr>
              <td>
                <strong>SSN:</strong>
                <FormsyMaskedInput mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                                   value={this.state.ss}
                                   onChange={this.handleInputChange}
                                   validations={{
                                     isLength: 9
                                   }}
                                   sanitizationFunction={this.sanitizeToJustNumbers}
                                   validationErrors={{
                                     isDefaultRequiredValue: 'Valid SSN is required',
                                     isLength: 'Valid SSN is required'
                                   }}
                                   name='ss'
                                   required />
              </td>
              <td>
                <strong>Martial Status:</strong>
                <FormsyInput value={this.state.martialStatus}
                             onChange={this.handleInputChange}
                             name='martialStatus'
                             validations={{
                               maxLength: 20,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid martial status is required',
                               maxLength: 'You must not enter more than 20 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
                <select onChange={this.handleInputChange}
                        name='gender'
                        value={this.state.gender}>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </td>
              <td>
                <strong>Address:</strong>
                <FormsyInput value={this.state.address}
                             onChange={this.handleInputChange}
                             name='address'
                             validations={{
                               maxLength: 20,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid address is required',
                               maxLength: 'You must not enter more than 20 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
            </tr>
            <tr>
              <td>
                <strong>City:</strong>
                <FormsyInput value={this.state.city}
                             onChange={this.handleInputChange}
                             name='city'
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
              <td>
                <strong>Postal:</strong>
                <FormsyInput value={this.state.postal}
                             onChange={this.handleInputChange}
                             name='postal'
                             validations={{
                               maxLength: 10,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid postal is required',
                               maxLength: 'You must not enter more than 10 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
            </tr>
            <tr>
              <td>
                <strong>State:</strong>
                <FormsyInput value={this.state.state}
                             onChange={this.handleInputChange}
                             name='state'
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
                <strong>Country:</strong>
                <FormsyInput value={this.state.country}
                             onChange={this.handleInputChange}
                             name='country'
                             validations={{
                               maxLength: 20,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid country is required',
                               maxLength: 'You must not enter more than 20 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
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
                                   required />
              </td>
              <td>
                <strong>Email:</strong>
                {/* Unfortunately text-mask doesn't handle emails very well */}
                <FormsyInput value={this.state.email}
                             onChange={this.handleInputChange}
                             name='email'
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
                <strong>Billing Note:</strong>
                <FormsyInput value={this.state.billingNote}
                             onChange={this.handleInputChange}
                             name='billingNote'
                             validations={{
                               maxLength: 20,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid billing note is required',
                               maxLength: 'You must not enter more than 20 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
              <td>
                <strong>Other Note</strong>
                <FormsyInput value={this.state.otherNote}
                             onChange={this.handleInputChange}
                             name='otherNote'
                             validations={{
                               maxLength: 20,
                               minLength: 2
                             }}
                             validationErrors={{
                               isDefaultRequiredValue: 'Valid other note is required',
                               maxLength: 'You must not enter more than 20 characters',
                               minLength: 'You must enter at least 2 characters'
                             }}
                             required />
              </td>
            </tr>
          </table>

          <button className='btn btn-default btn-sm' type='submit'>SAVE</button>
        </Formsy.Form>
      )
    } else {
      return null
    }
  }
}

export default Basic
