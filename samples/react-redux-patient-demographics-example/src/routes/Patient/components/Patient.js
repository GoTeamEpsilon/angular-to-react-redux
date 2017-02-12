import React from 'react'
import { browserHistory } from 'react-router'
import Basic from '../../Basic/components/Basic'

class Patient extends React.Component {
  constructor() {
    super()

    this.TABS = {
      BASIC: 'basic',
      CONTACTS: 'contacts'
    }

    this.state = {
      tab: this.TABS.BASIC
    }
  }

  setPatientInContext() {
    this.props.setPatientInContext(this.props.routeParams.pid)
  }

  determineIfRouteIsValid() {
    return this.props.routeParams.pid
  }

  componentDidMount() {
    if (!this.determineIfRouteIsValid()) {
      browserHistory.push('/patient/1337')
    }

    this.setPatientInContext()
  }

  mockedTab() {
    alert('This tab is just here for completeness. The real tabs are basic and contacts')
  }

  changeTab(newTab) {
    console.debug(`Setting tab to ${newTab}`)
    this.setState({ tab: newTab })
  }

  render() {
    return (
      <div>
        <h3 className={this.props.isLoading ? '' : 'hidden'}>Loading...</h3>

        <div className={this.props.isLoading ? 'hidden' : ''}>
          <div>
            <ul className="nav nav-tabs">
              <li className={this.state.tab == this.TABS.BASIC ? 'active' : ''}>
                <a onClick={() => this.changeTab(this.TABS.BASIC)}>Basic</a>
              </li>
              <li className={this.state.tab == this.TABS.CONTACTS ? 'active' : ''}>
                <a onClick={() => this.changeTab(this.TABS.CONTACTS)}>Contacts</a>
              </li>
              <li><a onClick={this.mockedTab}>Choices</a></li>
              <li><a onClick={this.mockedTab}>Employer</a></li>
              <li><a onClick={this.mockedTab}>Stats</a></li>
              <li><a onClick={this.mockedTab}>Misc</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Patient
