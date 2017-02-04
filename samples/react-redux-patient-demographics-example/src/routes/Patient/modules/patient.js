export const setTestData = (dispatch) => {
  console.info(`setting test data`)

  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: 'SET_TEST_PATIENT_DATA',
        payload: {
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
      })
      resolve()
    }, 800)
  })
}

export const setPatientInContext = (patientId) => {
  console.info(`attempting to set patient context to patient ${patientId}`)

  return (dispatch, getState) => {
    setTestData(dispatch).then(() => {
      const res = getState().patient.patientData[patientId]
      if (!res) {
        dispatch({
          type: 'SET_PATIENT_IN_CONTEXT_ERROR',
          payload: `Patient ${patientId} doesn't exist`
        })
      } else {
        dispatch({
          type: 'SET_PATIENT_IN_CONTEXT',
          payload: patientId
        })
      }
    })
  }
}

export const actions = {
  setPatientInContext
}

let initialState = { isFetching: true }
export default function patientReducer(state = initialState, action) {
  var response

  switch(action.type) {
    case 'SET_PATIENT_IN_CONTEXT':
      response = { ...state, patientInContext: action.payload }
      break
    case 'SET_TEST_PATIENT_DATA':
      response = { ...state, patientData: action.payload, isFetching: false }
      break
    case 'SET_PATIENT_IN_CONTEXT_ERROR':
      response = { ...state, error: action.payload }
      break
    default:
      response = state
      break
  }

  return response
}
