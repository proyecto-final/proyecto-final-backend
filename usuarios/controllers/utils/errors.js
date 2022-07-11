const errorMsg = {
  not_unique: (field) => `El campo '${field}' debe ser unico`,
  is_null:  (field) => `El campo '${field}' debe tener datos`
  //TODO add more validatorKey from sequelize
} 
const handleError = (resp, error) => {
  if (error?.code >= 400 && error?.code < 500) {
    //CUSTOM ERROR HANDLING
    return resp.status(error.code).json({msg: [error.msg] })
  }
  if (error?.errors){
    //DATABASE ERROR HANDLING
    return resp.status(400).json({msg: error.errors.map(error => errorMsg[error.validatorKey](error.path) || error.message)})
  }
  //DEFAULT ERROR HANDLING
  return resp.status(500).json({msg: [`Internal server error ${error?.message}`] })
}


module.exports = {handleError}