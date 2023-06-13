import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link as Anchor } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import actionsGame from '../store/actions/one_game';
import axios from "axios";
import VITE_API from '../../api'
import React from 'react'
import Swal from 'sweetalert2';
import ReactPlayer from "react-player";

const { one_game } = actionsGame;

export default function Game() {

  const storeGame = useSelector(store => store.one_game)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [games, setGames] = useState([]);
  const [idcompras, setIdcompras] = useState()
  console.log(games.gameplay);
  useEffect(() => {
    axios.get(VITE_API + `games/${id}`)
      .then(res => {
        setGames(res.data.response)
        dispatch(one_game({
          title: res.data.response.title,
          cover_photo: res.data.response.cover_photo
        }))
      })
      .catch(err =>
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
        })
      )
  }, [id])

  const handleComprar = async () => {
    // let token = localStorage.getItem("token")
    // console.log(token);
    // let headers = { headers: { "Authorization": `bearer ${token}` } }
    try {
      await axios.post('http://localhost:8000/carrito/' + idcompras, null, headers);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-[92vh] flex bg-black justify-center">
      <div className=" w-1/2 flex flex-col items-start px-8 mt-4">
        <img className="rounded-lg object-cover h-[55vh]" src={storeGame.cover_photo} alt="fotito" />
        <p className="mt-8 xsm:w-4/5 w-full text-white">{games.description}</p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-evenly">
        <ReactPlayer url={games.gameplay} width="80%" height="40%" controls playing loop muted />
        <div className="flex flex-col bg-[#343434]/40 w-4/5 h-1/2 justify-center items-center rounded-lg gap-4">
          <div className="flex flex-col items-center justify-center gap-4 h-[50%]">
            <h2 className="text-3xl text-center text-white mt-4">{String(storeGame.title)}</h2>
            <img src={games.company_id?.logo} className="w-[80%] h-[70%]" alt="" />
          </div>
          <div className="flex flex-col justify-center gap-2 h-[50%]">
            <p className="text-white text-lg ml-4">{games.company_id?.name}</p>
            <p className='text-white text-lg ml-4'>USD ${games.price}</p>
            <div className="rounded-md font-bold flex gap-4 flex-wrap items-center justify-center mt-2">
              <button id={games._id}
                onClick={handleComprar}
                onClickCapture={(e) => { setIdcompras(e.target.id) }} className='border-2 w-48 h-12 rounded-md px-1 cursor-pointer flex justify-center items-center shadow-lg hover:shadow-green-200/50 text-white gap-2 hover:bg-green-800 hover:scale-105'>Add to Cart <svg xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="white" className="" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </button>
              <button className='border-2 text-white font-bold w-48 h-12 rounded-md px-1 cursor-pointer flex justify-center items-center shadow-lg hover:shadow-red-200/50 gap-2 hover:bg-red-700 hover:scale-105'>
                Add to Favorites <svg xmlns=" http:www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
