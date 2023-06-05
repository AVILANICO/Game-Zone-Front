import { createReducer } from "@reduxjs/toolkit";
import inputs_actions from '../actions/inputs_filters.js'
const { inputs_filter } = inputs_actions

let initial_state = {
    title: '',
    categories: [],
}

const reducer = createReducer(
    initial_state,
    (builder) => builder
        .addCase(
            inputs_filter,
            (state,action) => {
                const new_state = {
                    ...state,
                    title: action.payload.title,
                    categories: action.payload.categories
                }
                return new_state
            }
        )
)

export default reducer
