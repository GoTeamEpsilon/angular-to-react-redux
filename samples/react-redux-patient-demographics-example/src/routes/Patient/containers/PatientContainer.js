import { connect } from 'react-redux';
import { setPatientInContext } from '../modules/patient';
import { browserHistory } from 'react-router';
import Patient from '../components/Patient';

const _setPatientInContext = (pid) => {
  setPatientInContext(pid);
};

const _determineIfRouteIsValid = (pid) => {
  return !!(pid);
};

const _redirectToSamplePatient = () => {
  browserHistory.push('/patient/1337');
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setPatientInContext: _setPatientInContext,
    determineIfRouteIsValid: _determineIfRouteIsValid,
    redirectToSamplePatient: _redirectToSamplePatient
  };
};

const mapStateToProps = (state, props) => ({
  pid: props.routeParams.pid
});

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
