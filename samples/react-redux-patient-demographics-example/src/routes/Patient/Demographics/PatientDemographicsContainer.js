import { connect } from 'react-redux'
import { setPatientInContext, updateBasicLocalState } from '../PatientModule'
import { browserHistory } from 'react-router'
import PatientDemographics from './PatientDemographicsComponent'

const mapDispatchToProps = {
  setPatientInContext,
  updateBasicLocalState
}

const extractBasicInfo = (state) => {
  const patient = state.patient[state.patient.patientInContext]
  if (patient) {
    return patient.basic
  }

  return null
}

const extractContactsInfo = (state) => {
  const patient = state.patient[state.patient.patientInContext]
  if (patient) {
    return patient.contacts
  }

  return null
}

const mapStateToProps = (state) => ({
  patientInContext: state.patient.patientInContext,
  info: extractBasicInfo(state),
  contacts: extractContactsInfo(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientDemographics)
