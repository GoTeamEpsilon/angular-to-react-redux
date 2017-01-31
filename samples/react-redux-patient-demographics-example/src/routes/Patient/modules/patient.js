/**
 * Stub data
 */
const testData = {
  1337: {
    basic: {
      name: 'John Doe',
      dob: '1990-11-04',
      ss: 999999999,
      martialStatus: 'Single',
      gender: 'Male',
      billingNote: ' N/A',
      otherNote: ' N/A',
      address: '321 Bazbop Ln',
      city: 'CoolCity',
      postal: 54321,
      state: 'Texas',
      country: 'US',
      phone: 1234567899,
      email: 'foo@bar.com'
    },
    contacts: [{
      name: 'Jane Doe',
      relation: 'Mother',
      address: '123 Foobar Ln',
      city: 'CoolCity',
      postal: 12345,
      state: 'Texas',
      country: 'US',
      phone: 1234567899,
      email: 'bar@foo.com'
    }, {
      name: 'Sam Doe',
      relation: 'Father',
      address: '123 Foobar Ln',
      city: 'CoolCity',
      postal: 12345,
      state: 'Texas',
      country: 'US',
      phone: 9876543211,
      email: 'baz@bop.com'
    }]
  }
}

/**
 * Constants
 */
export const SET_PATIENT_IN_CONTEXT = 'SET_PATIENT_IN_CONTEXT'

/**
 * Actions
 */
export const setPatientInContext = (patientId) => {
  console.info(`attempting to set patient context to patient ${patientId}`)

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const res = testData[patientId]
      if (!res) {
        console.warn(`patient ${patientId} doesn't exist`)
        reject('patient doesn\'t exist')
      } else {
        dispatch({
          type    : SET_PATIENT_IN_CONTEXT,
          payload : patientId
        })

        console.log('NEED TO SET TESTDATA IN THE STORE')
        resolve()
      }
    })
  }
}

export const fetchPatientInformation = (patientId) => {
  console.debug('retrieving patient basic data');

  return (dispatch, getState) => {

    console.log(getState());
    return resolve(testData[patientIdInContext].basic);

  }
}

export const actions = {
  setPatientInContext,
  fetchPatientInformation
}

/**
 * Action handlers
 */
const ACTION_HANDLERS = {
  [SET_PATIENT_IN_CONTEXT] : (state, action) => state + action.payload
}

/**
 * Reducer
 */
const initialState = {}
export default function patientReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
