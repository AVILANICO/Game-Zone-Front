import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/manga";

const { manga_read, manga_delete, manga_update } = actions 

let inicialState={
    manga:[]
}

const reducer = createReducer(
    inicialState,
    (builder)=>builder
    .addCase(
      manga_read.fulfilled,
      (state, action) => {
        let newState = {
              ...state,
              manga:action.payload.manga
            }
        return newState
    }
  )
  .addCase(
    manga_delete.fulfilled,
    (state, action) => {
      let newState = {
        ...state,
        manga: state.manga.filter(each => each._id !== action.payload.id_manga_sacado)
      }
      return newState
    }
  )
  .addCase(
    manga_update.fulfilled,
    (state, action) => {
      let newState = {
        ...state,
        manga: state.manga.map(each =>{
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


