const errorMsg = {
  not_unique: (field) => `El campo '${field}' debe ser unico`,
  is_null:  (field) => `El campo '${field}' debe tener datos`,
  len: (field, min, max) => `El campo '${field}' debe tener entre ${min} y ${max} caracteres`
  //TODO add more validatorKey from sequelize
} 
const handleError = (resp, error) => {
  console.error(error)
  if (error?.code >= 400 && error?.code < 500) {
    //CUSTOM ERROR HANDLING
    return resp.status(error.code).json({msg: [error.msg] })
  }
  if (error?.errors){
    //DATABASE ERROR HANDLING
    if (Array.isArray(error.errors)) {
      return resp.status(400).json({msg: error.errors.map(error =>{
        const errorTranslator = errorMsg[error.validatorKey]
        return errorTranslator ? errorTranslator(error.path, ...error.validatorArgs) : error.message
      })})
    } else {     
      return resp.status(400).json({msg: Object.entries(error.errors).map(([field, error]) => `${field}: ${error.message}`) })
    }
  }
  //DEFAULT ERROR HANDLING
  return resp.status(500).json({msg: [`Internal server error ${error?.message}`] })
}


module.exports = {handleError}