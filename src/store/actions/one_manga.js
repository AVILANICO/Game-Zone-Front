import { createAction } from "@reduxjs/toolkit";

//la accion es un intermediario entre la vista y las operaciones de reduccion!
//es la que DISPARA/EJECUTA la modificacion/reduccion de los estados globales
const one_manga = createAction(

  'one_manga', //nombre de la accion
  (objeto) => {    //funcion que va a enviar datos al reductor 
                  //el objeto debe tener todas las propiedades a guardarse en el estado global
    return {
      payload: {
        title: objeto.title,
        description: objeto.title,
        cover_photo: objeto.cover_photo
      }
    }               
  } 
)

//la accion no tiene demasiada logica xq su unico objetivo es enviar informacion al reductor. 
//Y en este mismo se realiza TODA la logica necesaria para modificar/reducir los estados globales.
const actions = {one_manga}
//construyo un objeto con la accion (mas adelante se van a agregar mas acciones)
export default actions