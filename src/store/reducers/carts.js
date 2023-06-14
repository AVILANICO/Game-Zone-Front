import { createReducer } from "@reduxjs/toolkit"
import actions from '../actions/carts'

const { carts } = actions
const initialstate = {
    cart:[]
}

const reducer = createReducer(initialstate,
    (builder)=>builder
    .addCase(
        carts.fulfilled,
        (state,action)=>{
            let newState={
                ...state,
                cart:action.payload.cart
            }
            return newState
        }
    )
)
export default reducer  
