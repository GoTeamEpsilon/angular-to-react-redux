import React from 'react'
import Formsy from 'formsy-react'

export const FormsySelect = React.createClass({
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
    const options = this.props.options.map((option, i) => (
      <option key={option.title + option.value} value={option.value}>
        {option.title}
      </option>
    ))

    return (
      <div>
        <strong>{this.props.label}: </strong>
        <select name={this.props.name} onChange={this.changeValue} value={this.getValue()}>
          {options}
        </select>
      </div>
    )
  }
})
