import ImaEntity from '@/entity/imaEntity.model'
import Address from '@/entity/address.model'
import User from '@/entity/user.model'
import { CONTRACTANT_TYPE, CONTRACTANT_TYPE_FROM_API } from '@/entity/contractant-type.model'


//crea la clase Contactant que se extiende de la clase ImagoEntity, como user
export default class Contractant extends ImaEntity {
		//Tiene un constructor, una suerte de molde del que van a salir todos los objetos que se creen con esa clase
  constructor (contractant) {
	  	  	// El constructor trae las propiedades de la clase ImagoEntity, hereda todo
    super()
		// Object.assign crea un objeto vacio que va a ser llenado con lo que contiene user, de manera a que nunca haya un undefined
    const contractantClone = Object.assign({}, contractant)
		//se asignan los diferentes valores que tendran los objetos
    this.id = contractantClone.id || null
    this.name = contractantClone.name || ''
    this.address = contractantClone.address || new Address()
    this.users = contractantClone.users || []
    this.type = contractantClone.type || CONTRACTANT_TYPE.UNKNOWN
  }

  
  // Funcion que va a transformar lo que se recive desde la API en el objeto Contractant, se usa en el fichier contractant.api
  static buildFromApi (contractant) {
    const apiEntity = Object.assign({}, contractant)
    const address = Address.buildFromApi(apiEntity.adresse) //lo trae del modelo address
    let users = []
    if (apiEntity.utilisateursRattaches) {
      users = apiEntity.utilisateursRattaches.map(user => User.buildFromApi(user)) //recibe del back el array utilisateursRattaches y lo transforma en un objeto front
    }
    return new Contractant({
      id: apiEntity.id,
      name: apiEntity.nom,
      address: address,
      users: users,
      type: CONTRACTANT_TYPE_FROM_API[apiEntity.type]
    })
  }
}
