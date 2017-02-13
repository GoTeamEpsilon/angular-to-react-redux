import CoreLayout from '../layouts/CoreLayout'
import PatientRoute from './Patient'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,

  // Note: not a good idea to make a route with variables an index,
  // just using this for the sample so that /patient/1337 is routed
  // to.
  indexRoute  : PatientRoute(store),

  childRoutes : [
    PatientRoute(store)
  ]
})

export default createRoutes
