import React from 'react'
import Formsy from 'formsy-react'
import MaskedInput from 'react-text-mask'

export const FormsyMaskedInput = React.createClass({
  mixins: [Formsy.Mixin],

  sanitize(value) {
    if (this.props.sanitizationFunction) {
      return this.props.sanitizationFunction(value)
    }

    return value
  },

  applyLimitWorkaround(value) {
    let limit = this.props.validations.isLength | this.props.validations.maxLength
    value = value.slice(0, limit)
    return value
  },

  changeValue(event) {
    let value = ''

    if (event && event.currentTarget && event.currentTarget.value) {
      value = event.currentTarget.value
      value = this.sanitize(value)
      value = this.applyLimitWorkaround(value)
      event.currentTarget.value = value
    }

    this.props.onChange(event)
    this.setValue(value)
  },

  render() {
    const className = this.showRequired() || this.showError() ? 'help-block' : null

    return (
      <div>
        <strong>{this.props.label}: </strong>
        <MaskedInput mask={this.props.mask}
                     type='text'
                     onChange={this.changeValue}
                     value={this.getValue()}
                     name={this.props.name} />

        <br />
        <span className={className}>{this.getErrorMessage()}</span>
      </div>
    )
  }
});
