import PatientRoute from 'routes/Patient';

describe('(Route) Patient', () => {
  let _component;

  beforeEach(() => {
    _component = PatientRoute.component();
  });

  it('Should return a route configuration object', () => {
    expect(typeof PatientRoute).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(_component.type).to.equal('div');
  });
});
