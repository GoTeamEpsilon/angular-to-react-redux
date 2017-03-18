import React from 'react'
import Formsy from 'formsy-react';
import DatePicker from 'react-datepicker'

export const FormsyDatePicker = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(data) {
    this.props.onChange(data)
    this.setValue(data);
  },

  render() {
    const className = this.showRequired() || this.showError() ? 'help-block' : null;

    return (
      <div>
        <DatePicker selected={this.getValue()}
                    onChange={this.changeValue}
                    name={this.props.name} />

        <br />
        <span className={className}>{this.getErrorMessage()}</span>
      </div>
    )
  }
})
