import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/game";

const { game_read, game_delete, game_update } = actions 

let inicialState={
    game:[]
}

const reducer = createReducer(
    inicialState,
    (builder)=>builder
    .addCase(
      game_read.fulfilled,
      (state, action) => {
        let newState = {
              ...state,
              game:action.payload.game
            }
        return newState
    }
  )
  .addCase(
    game_delete.fulfilled,
    (state, action) => {
      let newState = {
        ...state,
        game: state.game.filter(each => each._id !== action.payload.id_game_sacado)
      }
      return newState
    }
  )
  .addCase(
    game_update.fulfilled,
    (state, action) => {
      let newState = {
        ...state,
        game: state.game.map(each =>{
          if(each._id === action.payload.data._id){
            return action.payload.data;
          }
          else{
            return each;
          }
        })
      }
      return newState
    }
  )
)
export default reducer


