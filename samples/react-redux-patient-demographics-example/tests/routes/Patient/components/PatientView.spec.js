import React from 'react';
import { PatientView } from 'routes/Patient/components/PatientView';
import { render } from 'enzyme';

describe('(View) Patient', () => {
  let _component;

  beforeEach(() => {
    _component = render(<PatientView />);
  });

  it('Renders a welcome message', () => {
    const welcome = _component.find('h4');
    expect(welcome).to.exist;
    expect(welcome.text()).to.match(/Patient/);
  });
});
