import ImaEntity from '@/entity/imaEntity.model'


// Crea la clase que se extiende de lo que hay en ImagoEntity
export default class User extends ImaEntity {
	//Tiene un constructor, una suerte de molde del que van a salir todos los objetos que se creen con esa clase
	// user va a ser el parametro que necesita para poder construir
  constructor (user) {
	  	// El constructor trae las propiedades de la clase ImaEntity
    super()
	// Object.assign crea un objeto vacio que va a ser llenado con lo que contiene user, de manera a que nunca haya un undefined o un null
    const userClone = Object.assign({}, user)
	//se asignan los diferentes valores que tendran los objetos
    this.id = userClone.id || null
    this.firstName = userClone.firstName || ''
    this.lastName = userClone.lastName || ''
    this.email = userClone.email || ''
    this.type = userClone.type || null
  }

  static buildFromApi (user) { // por qué no usar "user = {}"? Porque no maneja los nulls. 
	  		       // Si recibe un objeto undefined, el objeto seguirà siendo vacio, 
	  		       // pero si recibe null, el objeto vacio sera reemplazado por null, 
	  		       // por eso es mejor reemplazarlo por object.assign en una variable interna, como sigue:
    const apiEntity = Object.assign({}, user)
    return new User({
      id: apiEntity.id,
      firstName: apiEntity.prenom,
      lastName: apiEntity.nom,
      email: apiEntity.email,
      type: apiEntity.typeUtilisateur
    })
  }
}
