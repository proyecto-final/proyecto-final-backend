
const getBooleanValue = (value) => {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
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
    return new Date(value)
  } catch {
    return null
  }
}


module.exports = {getBooleanValue, getIntValue, getDateValue}
