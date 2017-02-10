import CoreLayout from '../layouts/CoreLayout';
// Is this file even used???
import PatientRoute from './Patient';
import ContactRoute from './Contact';
import Contact from './Contact/components/Contact';


export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,

  // Note: not a good idea to make a route with variables an index,
  // just using this for the sample so that /patient/1337 is routed
  // to.
  indexRoute  : PatientRoute(store),

  childRoutes : [
    PatientRoute(store),
    { path: 'contact', component: Contact}
  ]
});

export default createRoutes;
