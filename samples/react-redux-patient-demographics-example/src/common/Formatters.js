export const telephoneFormat = (input) => {
  if (!input) {
    return
  }

  if (input.toString().length === 10) {
    let outputTempString = input.toString()
    let outputString = outputTempString.substr(0,3) + '-' + outputTempString.substr(3,3) + '-' +
                       outputTempString.substr(6,4)
    return outputString
  } else {
    return input.toString()
  }
}

export const socialSecurityFormat = (input) => {
  if (!input) {
    return
  }

  var outputString

  if (input.length < 9) {
    return input
  } else {
    let outputTempString = input.toString()
    outputString = outputTempString.substr(0,3) + '-' + outputTempString.substr(3,2) + '-' +
                   outputTempString.substr(5,4)
  }

  return outputString;
}
