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

export const updateContactData = (data) => {
  console.log("hey I'm contact data and I'm running")
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type    : 'UPDATE_CONTACT_DATA',
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
  // maybe define "copy" here
  switch (action.type) {
    case 'SET_PATIENT_IN_CONTEXT':
      result = { ...state, patientInContext: action.payload }
      break
    case 'UPDATE_PATIENT_DATA':
      let copy1 = clone(state)
      copy1[action.payload[0]].basic = action.payload[1]
      result = copy1
      break
    case 'UPDATE_CONTACT_DATA':
      //console.log("I ran too in the store!!")
      // console.log([action.payload[0]].basic)
      // console.log(action.payload[1])
      let copy2 = clone(state)
      let id = action.payload[1].id - 1
      // console.log(copy2);
      // console.log(result);
      copy2[action.payload[0]].contacts[id] = action.payload[1]
      result = copy2
      break
    default:
      result = state
  }

  return result
}
