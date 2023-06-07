import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import VITE_API from "../../../api";
import Swal from "sweetalert2";

const game_read = createAsyncThunk('game_read', async () => {
  try {
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let res = await axios(VITE_API + 'games/me', headers)
    return {
      game: res.data.response
    }
  } 
  catch (error) {
    next(error)
  }
})

const game_delete = createAsyncThunk('game_delete', async ({id}) => {

  try {
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    await axios.delete(VITE_API + 'games/' + id, headers)
    return{
      id_game_sacado: id
    }
  } catch (error) {
    return {
      game: []
    }
  }
})

const game_update = createAsyncThunk('game_update', async ({id, data}) => {

  try {
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let response = await axios.put(VITE_API + 'games/' + id, data, headers)

    return{
      data: response.data.update
    }
  } catch (error) {
      Swal.fire({
      icon: 'error',
      title: error.response.data.message
      })
    }
  }
)

const actions={ game_read, game_delete, game_update }
export default actions

