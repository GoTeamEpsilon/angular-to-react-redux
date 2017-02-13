import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'patient/:pid',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const patientDemographicsContainer = require(
        './Demographics/PatientDemographicsContainer').default
      const reducer = require('./PatientModule').default
      injectReducer(store, { key: 'patient', reducer })
      cb(null, patientDemographicsContainer)
    }, 'patient')
  }
});
