import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let carts =createAsyncThunk("carts",
async()=>{
    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    let url = 'http://localhost:8000/carrito'
    try {
        if(token){
            let res = await axios.get(url, headers);
            return { cart: res.data.games }
        }else{return {cart:[]}}
        
    } catch (error) {
        return {cart:[]}
    }
}) 
const actions = { carts }

export default actions 
