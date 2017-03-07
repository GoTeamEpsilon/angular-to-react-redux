import Formsy from 'formsy-react'
import moment from 'moment'

export const isDob = (value) => {
  if (value === null) {
    return false
  }

  return moment(value.format('MM/DD/YYYY')).isValid()
}

export const isSsn = (value) => {
  let cleaned = null

  if (value !== null) {
    cleaned = value.toString().replace(/[^0-9.]/g, '')
  }

  if (cleaned !== null && cleaned.length === 9) {
    return true
  }

  return false
}

export const wireUpCustomFormsyValidators = () => {
  Formsy.addValidationRule('isDob', function(values, value) {
    return isDob(value)
  })

  Formsy.addValidationRule('isSsn', function(values, value) {
    return isSsn(value)
  })
}
