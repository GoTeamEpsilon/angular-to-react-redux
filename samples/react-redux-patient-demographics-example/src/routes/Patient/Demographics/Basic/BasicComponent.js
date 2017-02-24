import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { telephoneFormat, socialSecurityFormat } from '../../../../common/Formatters'
import MaskedInput from 'react-text-mask'

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
    this.setLocalStateToStoreValues()
    this.setState({ showForm: true})
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  sanitizeSsn(ssn) {
    if (!ssn) {
      return ssn
    }

    return ssn.replace('-')
  }

  handleInputChange(event) {
    if (event && event.target && event.target.name) {
      let value
      switch (event.target.name) {
        case 'ss':
          value = event.target.value.replace('-')
          break;
        default:
          value = event.target.value
      }
      this.setState({
        [event.target.name]: value
      })
    } else {
      // Assuming it is the date timer picker
      this.setState({
        dob: event
      })
    }
  }

  setLocalStateToStoreValues() {
    const keys = ['name', 'dob', 'ss', 'martialStatus', 'gender',
                  'address', 'postal', 'city', 'state', 'country', 'phone',
                  'email', 'billingNote', 'otherNote']

    keys.forEach((keyName) => {
      let value

      switch (keyName) {
        case 'dob':
          value = moment(this.props.info[keyName])
          break;
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
                <input type="text"
                       value={this.state.name}
                       onChange={this.handleInputChange}
                       name="name" />
              </td>
              <td>
                <strong>DOB:</strong>
                <DatePicker selected={this.state.dob}
                            onChange={this.handleInputChange}
                            name="dob" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>SSN:</strong>
                <MaskedInput mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                             type="text"
                             value={this.state.ss}
                             onChange={this.handleInputChange}
                             name="ss" />
              </td>
              <td>
                <strong>Martial Status:</strong>
                <input type="text"
                       value={this.state.martialStatus}
                       onChange={this.handleInputChange}
                       name="martialStatus" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
                <select onChange={this.handleInputChange}
                        name="gender"
                        value={this.state.gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </td>
              <td>
                <strong>Address:</strong>
                <input type="text"
                       onChange={this.handleInputChange}
                       name="address"
                       value={this.state.address} />
              </td>
            </tr>
            <tr>
              <td>
                <strong>City:</strong>
                <input type="text"
                       onChange={this.handleInputChange}
                       name="city"
                       value={this.state.city}/>
              </td>
              <td>
                <strong>Postal:</strong>
                <input type="text"
                       onChange={this.handleInputChange}
                       name="postal"
                       value={this.state.postal} />
              </td>
            </tr>
            <tr>
              <td>
                <strong>State:</strong>
                <input type="text"
                       onChange={this.handleInputChange}
                       name="state"
                       value={this.state.state} />
              </td>
              <td>
                <strong>Country:</strong>
                <input type="text"
                       onChange={this.handleInputChange}
                       name="country"
                       value={this.state.country} />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
                <MaskedInput mask={['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                             type="text"
                             value={this.state.phone}
                             onChange={this.handleInputChange}
                             name="phone" />
              </td>
              <td>
                <strong>Email:</strong>
                {/* Unfortunately text-mask doesn't handle emails very well */}
                <input type="text"
                       onChange={this.handleInputChange}
                       value={this.state.email}
                       name="email" />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Billing Note:</strong>
                <input type="text"
                       value={this.state.billingNote}
                       onChange={this.handleInputChange}
                       name="billingNote" />
              </td>
              <td>
                <strong>Other Note</strong>
                <input type="text"
                       value={this.state.otherNote}
                       onChange={this.handleInputChange}
                       name="otherNote" />
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
