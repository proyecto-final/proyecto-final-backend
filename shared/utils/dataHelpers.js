
const getBooleanValue = (value) => {
  if (value === 'true' || value === true) {
    return true
  }
  if (value === 'false' || value === false) {
    return false
  }
  return null
}

const getIntValue = (value) => {
  try {
    return parseInt(value)
  } catch {
    return null
  }
}

const getDateValue = (value) => {
  try {
    return isNaN(new Date(value)) ? null : new Date(value)
  } catch {
    return null
  }
}

const getExtension = (file) => {
  return file.name.split('.').pop()
}


module.exports = {getBooleanValue, getIntValue, getDateValue, getExtension}
