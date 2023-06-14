import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/change_price";
const {changePrice} = actions

const initialState = {
    subtotal: 0,
    tax: 0,
    total: 0,
}

const reducer = createReducer(initialState, 
    (builder) =>
    builder.addCase(
        changePrice.fulfilled, 
        (state, action) =>{
            let newState = {
                ...state,
                subtotal : action.payload.subtotal,
                tax : action.payload.tax,
                total : action.payload.total
            };
            return newState
        })
    )

    export default reducer