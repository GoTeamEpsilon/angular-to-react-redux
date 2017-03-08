import clone from 'clone'

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
      ss: '999999999',
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
          dispatch({
            type    : 'SET_PATIENT_IN_CONTEXT',
            payload : patientId
          })
          reject(message);
        } else {
          console.warn(`Setting patient ${patientId} as patient in context`);
          dispatch({
            type    : 'SET_PATIENT_IN_CONTEXT',
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
      dispatch({
        type    : 'UPDATE_PATIENT_DATA',
        payload : [getState().patient.patientInContext, data]
      })
      resolve()
    })
  }
}

export const actions = {
  setPatientInContext
};

/**
 * Reducer
 */
const initialState = testData
export default function patientReducer (state = initialState, action) {
  let result
  switch (action.type) {
    case 'SET_PATIENT_IN_CONTEXT':
      result = { ...state, patientInContext: action.payload }
      break
    case 'UPDATE_PATIENT_DATA':
      let copy = clone(state)
      copy[action.payload[0]].basic = action.payload[1]
      result = copy
      break
    default:
      result = state
  }

  return result
}
