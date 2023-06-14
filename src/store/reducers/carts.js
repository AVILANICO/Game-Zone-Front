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
<<<<<<< HEAD
export default reducer  
=======
export default reducer  
>>>>>>> 7a8bc62841b37a98e1ba6fd90771e711630e28d1
