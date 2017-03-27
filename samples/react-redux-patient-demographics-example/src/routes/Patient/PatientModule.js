import clone from 'clone'
import _ from 'underscore'

/**
 * Stub data that will be used as the initial state in the store.
 */
const testData = {
  // Bug with Formsy: https://github.com/christianalfoni/formsy-react/issues/340
  // For some reason, Formsy doesn't perform validations correctly against numbers.
  // E.g.: this.state.postal was throwing 'You must not enter more than 50 characters'
  // when the value was 54321. When I changed it to '54321', it didn't complain. :(.
  1337: {
    basic: {
      name: 'John Doe',
      dob: '1990-11-04',
      ssn: '999999999',
      martialStatus: 'Single',
      gender: 'Male',
      billingNote: 'N/A',
      otherNote: 'N/A',
      address: '321 Bazbop Ln',
      city: 'CoolCity',
      postal: '54321',
      state: 'Texas',
      country: 'US',
      phone: '1234567899',
      email: 'foo@bar.com'
    },
    contacts: [{
      id: 1,
      name: 'Jane Doe',
      relation: 'Mother',
      address: '123 Foobar Ln',
      city: 'CoolCity',
      postal: '12345',
      state: 'Texas',
      country: 'US',
      phone: '1234567899',
      email: 'bar@foo.com'
    }, {
      id: 2,
      name: 'Sam Doe',
      relation: 'Father',
      address: '123 Foobar Ln',
      city: 'CoolCity',
      postal: '12345',
      state: 'Texas',
      country: 'US',
      phone: '9876543211',
      email: 'baz@bop.com'
    }]
  }
}

/**
 * Actions
 */
export const setPatientInContext = (patientId) => {
  console.info(`attempting to set patient context to patient ${patientId}`)

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const res = testData[patientId]
        if (!res) {
          var message = `Patient ${patientId} doesn't exist`
          console.warn(message)
          reject(message);
        } else {
          console.debug(`Setting patient ${patientId} as patient in context`);
          dispatch({
            type    : 'UPDATE_PATIENT_IN_CONTEXT',
            payload : patientId
          })

          resolve()
        }
      }, 800)
    })
  }
}

export const updatePatientData = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.debug(`updating basic patient data for ${getState().patient.patientInContext}`)
      dispatch({
        type    : 'UPDATE_PATIENT_DATA',
        payload : data
      })
      resolve()
    })
  }
}

export const updateContactData = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.debug(`updating contact data for ${getState().patient.patientInContext}`)
      dispatch({
        type    : 'UPDATE_CONTACT_DATA',
        payload : data
      })
      resolve()
    })
  }
}

export const deleteContact = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.debug(`deleting contact data for ${getState().patient.patientInContext}`)
      dispatch({
        type    : 'DELETE_CONTACT',
        payload : data
      })
      resolve()
    })
  }
}

export const startAddingNewContact = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.debug(`starting to add contact data for ${getState().patient.patientInContext}`)
      dispatch({
        type    : 'INSERT_CONTACT',
        payload : data
      })
      resolve()
    })
  }
}

/**
 * Reducer
 */
const initialState = testData
export default function patientReducer (state = initialState, action) {
  let result
  let copy
  switch (action.type) {
    case 'UPDATE_PATIENT_IN_CONTEXT':
      copy = clone(state)
      copy.patientInContext = action.payload
      result = copy
      break
    case 'UPDATE_PATIENT_DATA':
      copy = clone(state)
      copy[copy.patientInContext].basic = action.payload
      result = copy
      break
    case 'UPDATE_CONTACT_DATA':
      copy = clone(state)
      const contactIndexForUpdation = _.findIndex(copy[copy.patientInContext].contacts, (c) => {
        if (c && c.hasOwnProperty('id')) {
          return c.id === action.payload.id
        }
      })
      copy[copy.patientInContext].contacts[contactIndexForUpdation] = action.payload
      result = copy
      break
    case 'INSERT_CONTACT':
      copy = clone(state)
      const lastContact = _.last(copy[copy.patientInContext].contacts)
      let newContactId = 0
      if (lastContact != null && lastContact.hasOwnProperty('id')) {
        newContactId = lastContact.id + 1
      }
      copy[copy.patientInContext].contacts.push({ isNewContact: true, id: newContactId })
      result = copy
      break
    case 'DELETE_CONTACT':
      copy = clone(state)
      const contactIndexForDeletion = _.findIndex(copy[copy.patientInContext].contacts, (c) => {
        if (c && c.hasOwnProperty('id')) {
          return c.id === action.payload
        }
      })
      delete copy[copy.patientInContext].contacts[contactIndexForDeletion]
      result = copy
      break
    default:
      result = state
  }

  return result
}
