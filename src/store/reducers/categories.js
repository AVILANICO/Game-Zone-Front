import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/categories";

const {categories_read}=actions 
let inicialState={
    categories:[]
}

const reducer =createReducer(
    inicialState,
    (builder)=>builder
    .addCase(
      categories_read.fulfilled,
      (state,action)=>{
        let newState={
              ...state,
              categories:action.payload.categories
            }
        return newState
    }
  )
)
export default reducer
