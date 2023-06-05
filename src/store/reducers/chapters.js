import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/chapters.js";
const { read_chapters , read_manga, delete_chapter, update_chapter } = actions


let initialState = {
    chapters: [],
    mangas: []

}
const reducer = createReducer(
    initialState,
    (builder) => builder
    .addCase(
        read_chapters.fulfilled,
        (state,action)=> {
            let newState = {
                ...state,
                chapters: action.payload.chapters
            }
            return newState
        }
    )
    .addCase(
        read_manga.fulfilled,
        (state,action)=> {
            let newState = {
                ...state,
                mangas: action.payload.mangas
            }
            return newState
        }
    )
    .addCase(
        delete_chapter.fulfilled,
        (state,action)=> {
            let newState = {
                ...state,
                chapters: state.chapters.filter(each => each._id !== action.payload.id_delete)
            }
            return newState
        }
    )
    .addCase(
        update_chapter.fulfilled,
        (state,action)=> {
            let chapters = state.chapters.map(each => {
                    if(each._id === action.payload.data._id){
                        return action.payload.data
                    }else{
                        return each
                    }
                })
            let newState = {
                ...state,
                chapters
            }
            return newState
        }
    )
)

export default reducer
