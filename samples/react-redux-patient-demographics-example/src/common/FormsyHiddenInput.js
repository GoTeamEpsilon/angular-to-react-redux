import React from 'react'
import Formsy from 'formsy-react'

export const FormsyHiddenInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(event) {
    let value = ''

    if (event && event.currentTarget && event.currentTarget.value) {
      value = event.currentTarget.value
      event.currentTarget.value = value
    }

    this.props.onChange(event)
    this.setValue(value)
  },

  render() {
    return (
      <div className='hidden'>
        <input type='hidden'
               onChange={this.changeValue}
               value={this.getValue()}
               name={this.props.name} />
      </div>
    )
  }
})
