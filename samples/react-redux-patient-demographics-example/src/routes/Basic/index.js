import { injectReducer } from '../../store/reducers';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Basic = require('./containers/BasicContainer').default
      const reducer = require('../Patient/modules/patient').default
      injectReducer(store, { key: 'patient', reducer })
      cb(null, Basic)
    }, 'basic')
  }
});
