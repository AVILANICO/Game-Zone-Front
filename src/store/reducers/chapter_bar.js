import { createReducer } from "@reduxjs/toolkit";
import chapter_actions from "../actions/chapter_bar"
// desestructuro la acciones que necesito configurar
const {chapter_bar} = chapter_actions;

let initial_state = {
    title: '',
    order: '',
    manga_id: '',
}

const reducer = createReducer(
    initial_state,
    (builder) => builder
    .addCase(
        chapter_bar,
        (state,actions) => {
            const new_state = {
                ...state,
                title: actions.payload.title,
                order: actions.payload.order,
                manga_id: actions.payload.manga_id
            }
            return new_state
        }
    )
)

export default reducer