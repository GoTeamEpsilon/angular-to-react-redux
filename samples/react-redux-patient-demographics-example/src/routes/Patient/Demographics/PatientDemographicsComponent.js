import React from 'react'
import { browserHistory } from 'react-router'
import Basic from './Basic/BasicComponent'
import Contact from './Contact/ContactComponent'

class PatientDemographics extends React.Component {
  constructor() {
    super()

    this.TABS = {
      BASIC: 'basic',
      CONTACTS: 'contacts'
    }

    this.state = {
      tab: this.TABS.BASIC,
      isLoading: false
    }
  }

  setPatientInContext() {
    this.setState({ isLoading: true })
    this.props.setPatientInContext(this.props.routeParams.pid)
      .then(() => {
        this.setState({ isLoading: false })
      });
  }

  determineIfRouteIsValid() {
    return this.props.routeParams.pid
  }

  componentDidMount() {
    if (!this.determineIfRouteIsValid()) {
      browserHistory.push('/patient/1337')
      location.reload()
    } else {
      this.setPatientInContext()
    }
  }

  mockedTab() {
    alert('This tab is just here for completeness. The real tabs are basic and contacts')
  }

  changeTab(newTab) {
    console.debug(`Setting tab to ${newTab}`)
    this.setState({ tab: newTab })
  }

  render() {
    let children = null;

    switch (this.state.tab) {
      case this.TABS.BASIC:
        children = <Basic info={this.props.info} />
        break;
      case this.TABS.CONTACTS:
        if (this.props.contacts) {
          children = this.props.contacts.map(contact =>
            <Contact key={contact.id} contact={contact}/>
          )
        }
        break;
    }

    return (
      <div>
        <h3 className={this.state.isLoading ? '' : 'hidden'}>Loading...</h3>

        <div className={this.state.isLoading ? 'hidden' : ''}>
          <div>
            <ul className='nav nav-tabs'>
              <li className={this.state.tab === this.TABS.BASIC ? 'active' : ''}>
                <a onClick={() => this.changeTab(this.TABS.BASIC)}>Basic</a>
              </li>
              <li className={this.state.tab === this.TABS.CONTACTS ? 'active' : ''}>
                <a onClick={() => this.changeTab(this.TABS.CONTACTS)}>Contacts</a>
              </li>
              <li><a onClick={this.mockedTab}>Choices</a></li>
              <li><a onClick={this.mockedTab}>Employer</a></li>
              <li><a onClick={this.mockedTab}>Stats</a></li>
              <li><a onClick={this.mockedTab}>Misc</a></li>
            </ul>
          </div>

          {children}
        </div>
      </div>
    )
  }
}

export default PatientDemographics
