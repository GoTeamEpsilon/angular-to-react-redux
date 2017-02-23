import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { telephoneFormat, socialSecurityFormat } from '../../../../common/Formatters'

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
    if (event.hasOwnProperty('target') && event.target.hasOwnProperty('name')) {
      this.setState({
        [event.target.name]: event.target.value
      })
    } else {
      // Assuming it is the date timer picker
      this.setState({
        dob: event
      })
    }

    console.log(this.state)
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
                <input type="text" onChange={this.handleInputChange} name="name" />
              </td>
              <td>
                <strong>DOB:</strong>
                <DatePicker selected={this.state.dob} onChange={this.handleInputChange} name="dob" />;
              </td>
            </tr>
            <tr>
              <td>
                <strong>SSN:</strong>
                <input type="text" onChange={this.handleInputChange} name="ssn" />
              </td>
              <td>
                <strong>Martial Status:</strong>
                <input type="text" onChange={this.handleInputChange} name="martialStatus" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
                <select onChange={this.handleInputChange} name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </td>
              <td>
                <strong>Address:</strong>
                <input type="text" onChange={this.handleInputChange} name="address" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>City:</strong>
                <input type="text" onChange={this.handleInputChange} name="city" />
              </td>
              <td>
                <strong>Postal:</strong>
                <input type="text" onChange={this.handleInputChange} name="city" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>State:</strong>
                <input type="text" onChange={this.handleInputChange} name="state" />
              </td>
              <td>
                <strong>Country:</strong>
                <input type="text" onChange={this.handleInputChange} name="country" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
                <input type="text" onChange={this.handleInputChange} name="phone" />
              </td>
              <td>
                <strong>Email:</strong>
                <input type="text" onChange={this.handleInputChange} name="email" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Billing Note:</strong>
                <input type="text" onChange={this.handleInputChange} name="billingNote" />
              </td>
              <td>
                <strong>Other Note</strong>
                <input type="text" onChange={this.handleInputChange} name="otherNote" />
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
