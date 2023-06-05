import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import VITE_API from "../../../api";
import Swal from "sweetalert2";

const manga_read = createAsyncThunk('manga_read', async () => {
  try {
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let res = await axios(VITE_API + 'mangas/me', headers)
    return {
      manga: res.data.response
    }
  } 
  catch (error) {
    next(error)
  }
})

const manga_delete = createAsyncThunk('manga_delete', async ({id}) => {
  //tiene que eliminar el manga de la base de datos y luego tiene 
  //que modificar el array de mangas del estado para SACAR de ese array el manga eliminado.
  try {
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    await axios.delete(VITE_API + 'mangas/' + id, headers)
    //mas allá de la respuesta de la peticion necesito enviar algun parametro hacia el reductor
    //para poder quitar con filter el objeto que se eliminó de la base de datos del array
    return{
      id_manga_sacado: id
    }
  } catch (error) {
    return {
      manga: []
    }
  }
})

const manga_update = createAsyncThunk('manga_update', async ({id, data}) => {
  //tiene que eliminar el manga de la base de datos y luego tiene 
  //que modificar el array de mangas del estado para SACAR de ese array el manga eliminado.
  try {
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let response = await axios.put(VITE_API + 'mangas/' + id, data, headers)
    //mas allá de la respuesta de la peticion necesito enviar algun parametro hacia el reductor
    //para poder quitar con filter el objeto que se eliminó de la base de datos del array
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

const actions={ manga_read, manga_delete, manga_update }
export default actions

