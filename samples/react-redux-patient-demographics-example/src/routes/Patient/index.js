import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'patient/:pid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Patient = require('./containers/PatientContainer').default
      const reducer = require('./modules/patient').default
      injectReducer(store, { key: 'patient', reducer })
      cb(null, Patient)
    }, 'patient')
  }
})
