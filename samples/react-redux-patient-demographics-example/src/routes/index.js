import CoreLayout from '../layouts/CoreLayout'
import Patient from './Patient'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Patient
})

export default createRoutes
