import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link as Anchor } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import actionsGame from '../store/actions/one_game';
import axios from "axios";
import VITE_API from '../../api'
import React from 'react'
import Swal from 'sweetalert2';

const { one_game } = actionsGame;

export default function Game() {

  const storeGame = useSelector(store => store.one_game)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [games, setGames] = useState([]);

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


  return (
    <div className="min-h-screen xsm:pt-20 flex flex-col items-center">
      <img className="xsm:w-72 object-cover xsm:pt-0 xsm:mt-0 mt-20 xsm:h-80 w-80" src={storeGame.cover_photo} alt="fotito" />
      <h2 className="text-3xl mt-4">{String(storeGame.title)}</h2>
      <div className="flex justify-evenly xsm:gap-40 xsm:w-4/5 w-3/5 mt-4">
        <h2 className="bg-[#FFE0DF] rounded-3xl xsm:w-16 xsm:h-8 flex items-center justify-center text-[#EF8481] w-20 h-10" >{String(games.category_id?.name)}</h2>
      </div>
      <div>
        <p>ACA VAN LOS BOTONES DE COMPRA Y/O DESCARGA DEL JUEGO</p>
      </div>
      <p className="mt-8 xsm:w-4/5 w-3/5 text-center">{games.description}</p>
    </div>
  )
}
