import React from 'react';


class Patient extends React.Component {
  componentDidMount () {
    const isValid = this.props.determineIfRouteIsValid(
      this.props.pid
    );

    if (isValid) {
      this.props.setPatientInContext(this.props.pid);
    } else {
      this.props.redirectToSamplePatient();
    }
  }

  render () {
    return (
      <div>
        <h4>Patient</h4>
        <hr/>
        

          
      </div>
    );
  }
}

export default Patient;
