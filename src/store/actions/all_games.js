import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import VITE_API from "../../../api";


const game_all = createAsyncThunk ('game_all', async()=>{
    try {
      let res = await axios.get(VITE_API + 'games')
        
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