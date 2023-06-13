import { createReducer } from "@reduxjs/toolkit";
import actions from '../actions/all_games'

const {game_all} = actions

let initialState = {
    games:[]
}
const reducer = createReducer(
    initialState,
    (builder)=>builder
    .addCase(
        game_all.fulfilled,
        (state, action) =>{
            let newState = {
                ... state,
                games:action.payload.games
            }
            return newState
        }
    )
)
export default reducer