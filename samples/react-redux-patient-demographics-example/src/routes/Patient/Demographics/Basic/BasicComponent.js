import React from 'react'
import moment from 'moment'
import { telephoneFormat, socialSecurityFormat } from '../../../../common/Formatters'
import Formsy from 'formsy-react'
import { wireUpCustomFormsyValidators } from '../../../../common/CustomValidators'
import { FormsyInput } from '../../../../common/FormsyInput'
import { FormsySelect } from '../../../../common/FormsySelect'
import { FormsyDatePicker } from '../../../../common/FormsyDatePicker'
import { FormsyMaskedInput } from '../../../../common/FormsyMaskedInput'

require('react-datepicker/dist/react-datepicker.css')

class Basic extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      dob: moment(),
      cachedForm: {}
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    wireUpCustomFormsyValidators()
  }

  handleEdit() {
    console.debug('Basic component in edit mode')
    this.setLocalStateToStoreValues()
    this.setState({ showForm: true })
    this.setState({ cachedForm: this.props.basic })
  }

  componentDidMount() {
  }

  handleSubmit(formValues) {
    console.debug('Submitting basic info updates')
    // Convert dob back to date string
    formValues.dob = formValues.dob.format('YYYY-MM-DD')
    this.props.updatePatientData(formValues)
    this.setState({ showForm: false })
  }

  handleCancel() {
    console.debug('Basic component in read mode')
    this.setState({ cachedForm: {} })
    this.setState({ showForm: false })
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
        case 'ssn':
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
    const keys = ['name', 'dob', 'ssn', 'martialStatus', 'gender', 'address', 'postal', 'city', 'state',
                  'country', 'phone', 'email', 'billingNote', 'otherNote']

    keys.forEach((keyName) => {
      let value

      switch (keyName) {
        case 'dob':
          value = moment(this.props.basic[keyName])
          break
        case 'phone':
        case 'ssn':
          value = this.sanitizeToJustNumbers(this.props.basic[keyName].toString())
          break
        default:
          value = this.props.basic[keyName]
      }

      this.setState({
        [keyName]: value
      })
    })
  }

  render() {
    if (this.props.basic && this.state.showForm === false) {
      return (
        <div>
          <table className='table'>
            <tbody>
              <tr>
                <td><strong>Name:</strong> {this.props.basic.name}</td>
                <td><strong>DOB:</strong> {this.props.basic.dob}</td>
              </tr>
              <tr>
                <td><strong>SSN:</strong> {socialSecurityFormat(this.props.basic.ssn)}</td>
                <td><strong>Martial Status:</strong> {this.props.basic.martialStatus}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong> {this.props.basic.gender}</td>
                <td><strong>Address:</strong> {this.props.basic.address}</td>
              </tr>
              <tr>
                <td><strong>City:</strong> {this.props.basic.address}</td>
                <td><strong>Postal:</strong> {this.props.basic.postal}</td>
              </tr>
              <tr>
                <td><strong>State:</strong> {this.props.basic.state}</td>
                <td><strong>Country:</strong> {this.props.basic.country}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong> {telephoneFormat(this.props.basic.phone)}</td>
                <td><strong>Email:</strong> {this.props.basic.email}</td>
              </tr>
              <tr>
                <td><strong>Billing Note:</strong> {this.props.basic.billingNote}</td>
                <td><strong>Other Note:</strong> {this.props.basic.otherNote}</td>
              </tr>
            </tbody>
          </table>

          <button type='button' className='btn btn-default btn-sm' onClick={this.handleEdit}>EDIT</button>
        </div>
      )
    } else if (this.props.basic && this.state.showForm === true) {
      return (
         <Formsy.Form onValidSubmit={this.handleSubmit.bind(this)}
                      name='basicInfoForm'
                      className='container basic-info-form'
                      noValidate>
          <table className='table'>
            <tbody>
              <tr>
                <td>
                  <FormsyInput value={this.state.name}
                               onChange={this.handleInputChange}
                               name='name'
                               label='Name'
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
                                    label='Dob'
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
                  <FormsyMaskedInput mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                                     value={this.state.ssn}
                                     onChange={this.handleInputChange}
                                     validations={{
                                       isLength: 9
                                     }}
                                     sanitizationFunction={this.sanitizeToJustNumbers}
                                     validationErrors={{
                                       isDefaultRequiredValue: 'Valid SSN is required',
                                       isLength: 'Valid SSN is required'
                                     }}
                                     name='ssn'
                                     label='SSN'
                                     required />
                </td>
                <td>
                  <FormsyInput value={this.state.martialStatus}
                               onChange={this.handleInputChange}
                               name='martialStatus'
                               label='Martial Status'
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
                  <FormsySelect value={this.state.gender}
                               onChange={this.handleInputChange}
                               name='gender'
                               label='Gender'
                               options={[{option: 'male', title: 'Male'},
                                         {option: 'female', title: 'Female'},
                                         {option: 'other', title: 'Other'}]}
                               required />
                </td>
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
                               required />
                </td>
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
                <td>
                  <FormsyInput value={this.state.postal}
                               onChange={this.handleInputChange}
                               name='postal'
                               label='Postal'
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
                  <FormsyInput value={this.state.country}
                               onChange={this.handleInputChange}
                               name='country'
                               label='Country'
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
                                     required />
                </td>
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
                  <FormsyInput value={this.state.billingNote}
                               onChange={this.handleInputChange}
                               name='billingNote'
                               label='Billing Note'
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
                  <FormsyInput value={this.state.otherNote}
                               onChange={this.handleInputChange}
                               name='otherNote'
                               label='Other Note'
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
            </tbody>
          </table>

          <button className='btn btn-default btn-sm' type='submit'>SAVE</button>
          <button className='btn btn-default btn-sm'
                  type='button'
                  onClick={this.handleCancel.bind(this)}>CANCEL</button>
        </Formsy.Form>
      )
    } else {
      return null
    }
  }
}

export default Basic
