import { createAction } from "@reduxjs/toolkit";

const one_game = createAction(
  'one_game', 
  (objeto) => {    
    return {
      payload: {
        title: objeto.title,
        description: objeto.title,
        cover_photo: objeto.cover_photo,
        price: objeto.price,
        stock: objeto.stock
      }
    }               
  } 
)
const actions = {one_game}

export default actions