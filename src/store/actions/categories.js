import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../../api";

const categories_read = createAsyncThunk('categories_read', async () => {
    try {

        let res = await axios(apiUrl+'categories')
        return {categories:res.data.categories}

    } catch (error) {
        console.log(error)
        return {
            categories:[]
            }}})

const actions={categories_read}
export default  actions
