import React, {Component} from 'react';

class Contact extends Component {
  
  
  render () {
    return (
      <div>
        <h3> TEMPORARY CONTACT COMPONENT PAGE</h3>
        <table className="table">
          <tr>
            <td><strong>Name:</strong> Jane Doe</td>
            <td><strong>Relation:</strong>Mother</td>
          </tr>
          <tr>
            <td><strong>Address:</strong>123 Foobar Ln</td>
            <td><strong>Phone:</strong>CoolCity</td>
          </tr>
          <tr>
            <td><strong>City:</strong>CoolCity</td>
            <td><strong>Postal:</strong>12345</td>
          </tr>
          <tr>
            <td><strong>State:</strong>Texas</td>
            <td><strong>Country:</strong>US</td>
          </tr>
          <tr>
            <td><strong>Email:</strong>bar@foo.com</td>
            <td></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Contact;


