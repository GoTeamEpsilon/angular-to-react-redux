import { connect } from 'react-redux'
import { setPatientInContext } from '../modules/patient'
import { browserHistory } from 'react-router'
import Patient from '../components/Patient'

const mapDispatchToProps = {
  setPatientInContext
}

const mapStateToProps = (state) => ({
  patientInContext: state.patient.patientInContext
})

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
