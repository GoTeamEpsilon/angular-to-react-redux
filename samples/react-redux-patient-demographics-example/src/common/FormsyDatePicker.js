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
    const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null

    const errorMessage = this.getErrorMessage()

    return (
      <div className={className}>
        <DatePicker selected={this.getValue()}
                    onChange={this.changeValue}
                    name={this.props.name} />

        <span>{errorMessage}</span>
      </div>
    );
  }
});
