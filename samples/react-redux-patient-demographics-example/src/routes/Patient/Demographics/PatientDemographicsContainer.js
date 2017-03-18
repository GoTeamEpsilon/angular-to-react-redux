import { connect } from 'react-redux'
import { setPatientInContext, updatePatientData, updateContactData, deleteContact, startAddingNewContact }
  from '../PatientModule'
import PatientDemographics from './PatientDemographicsComponent'

const mapDispatchToProps = {
  setPatientInContext,
  updatePatientData,
  updateContactData,
  deleteContact,
  startAddingNewContact
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
  basic: extractBasicInfo(state),
  contacts: extractContactsInfo(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientDemographics)
