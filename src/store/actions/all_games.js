import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import VITE_API from "../../../api";


const game_all = createAsyncThunk ('game_all', async()=>{
    try {
          let token = localStorage.getItem('token')
          let headers = { headers: { 'Authorization': `Bearer ${token}` } }
          let res = await axios.get(VITE_API + 'games', headers)
        
        return{
          games:res.data.response
        }
    } catch (error) {
      return{
        games:[]
      }
    
    }
  })

  const actions={game_all}
  export default actions