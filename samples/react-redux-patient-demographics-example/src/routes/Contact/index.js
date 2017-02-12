import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Contact = require('./containers/ContactContainer').default
      const reducer = require('../Patient/modules/patient').default
      injectReducer(store, { key: 'patient', reducer })
      cb(null, Contact)
    }, 'contact')
  }
});
