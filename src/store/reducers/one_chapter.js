import { createReducer } from "@reduxjs/toolkit";
//importo las acciones
import actions from "../actions/one_chapter.js";

//desestructuro la accion para poder utilizarla
const {one_chapter} = actions

//defino estado inicial
let initial_state = {
  chapters: []
}

const reducer = createReducer (
  initial_state,
  (builder) => builder
  .addCase(
    one_chapter,
    (state, action) => {
      const new_state = {
        ...state, 
        chapters: action.payload.data
      }
      return new_state
    }
  )
)
export default reducer