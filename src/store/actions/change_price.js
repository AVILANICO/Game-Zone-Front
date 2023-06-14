import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let changePrice = createAsyncThunk(
    "changePrice",
    async() => {
        let token = localStorage.getItem("token");
        let headers = { headers: { Authorization: `Bearer ${token}` } };
        let url = 'http://localhost:8000/carrito'
        try {
            if(token){
                let res = await axios.get(url, headers);
                let subtotal = res.data.games.map((each)=>{
                    return (each.cantidad * each.product_id.price)/1.19
                })
                let tax = subtotal.reduce((a, b) => a + b, 0) * 0.19
                let total = Math.round(subtotal.reduce((a, b) => a + b, 0)) + Math.round(tax)
                return {
                    subtotal: subtotal.reduce((a, b) => a + b, 0).toFixed(2),
                    tax: tax.toFixed(2),
                    total: total
                }
            }else{
                return  {
                    subtotal: 0,
                    tax: 0,
                    total: 0
                }
             }
            
        } catch (error) {
            
        }
    }
)
const actions = {changePrice};
export default actions