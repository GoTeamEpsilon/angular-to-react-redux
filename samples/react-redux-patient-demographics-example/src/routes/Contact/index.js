import { injectReducer } from '../../store/reducers';

export default () => ({
  path : 'contact',
  
  // getComponent (nextState, cb) {
  //   require.ensure([], (require) => {
  //     const ContactComponent = require('./components/Contact').default;
  //     const Contact = require('./containers/ContactContainer').default;
  //     const reducer = require('./modules/contact').default;
  //     injectReducer(store, { key: 'contact', reducer });
  //     cb(null, ContactComponent);
  //   });
  
});
