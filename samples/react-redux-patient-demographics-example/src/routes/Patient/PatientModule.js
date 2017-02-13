/**
 * Stub data that will be used as the initial state in the store.
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
      id: 1,
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
      id: 2,
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
          // setTimeout(() => {
          //   dispatch({
          //     type    : 'UPDATE_PATIENT_CONTACT',
          //     payload : 1
          //   })

          // }, 2000)
        }
      }, 800)
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
  switch (action.type) {
    case 'SET_PATIENT_IN_CONTEXT':
      return { ...state, patientInContext: action.payload }
      break
    case 'UPDATE_PATIENT_CONTACT':
      let clone = Object.assign({}, state)
      clone[1337].contacts[0].name = 'it works'
      return clone
      break
    default:
      return state
  }
}
