// VALIDATIONS 
const checkColor = (color) => {
  const colorRegex = /^#([A-Fa-f0-9]{6})$/g
  if (color && !colorRegex.test(color)){
    throw {code: 400, msg: 'Invalid color'}
  }
}

module.exports = {checkColor}