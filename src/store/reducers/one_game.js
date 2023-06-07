import { createReducer } from "@reduxjs/toolkit";
//importo las acciones
import actions from "../actions/one_game.js";

//desestructuro la accion para poder utilizarla
const {one_game} = actions

//defino estado inicial
let initial_state = {
  title: '',
  cover_photo: ''
}

const reducer = createReducer (
  initial_state,
  (builder) => builder
  //.addCase define la logica necesaria para modificar los estados
  .addCase(
    one_game,
    (state, action) => {
      const new_state = {
        ...state, 
        title: action.payload.title,
        cover_photo: action.payload.cover_photo
      }
      return new_state
    }
  )
)

export default reducer