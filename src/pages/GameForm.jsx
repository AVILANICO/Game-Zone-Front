import React from 'react'
import apiUrl from "../../api"
import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import VITE_API from '../../api'
import Swal from 'sweetalert2'
import Index from './Index'
import App from '../App'
import { useNavigate } from 'react-router-dom'

export default function GameForm() {
  useEffect(
    () => { axios(apiUrl + 'categories').then(res => categories(res.data.categories)).catch(err => console.error(err)) },
    []                                    //array de dependecias vacio ya que necesitamos fechar una unica vez al mostrarse el componente
  )
  let [categor, categories] = useState([])

  const options = () => {
    return categor.map(a => <option key={a._id} value={a._id}>{a.name}</option>);
  }
  const navigate = useNavigate()
  const title = useRef()
  const category = useRef()
  const description = useRef()
  const cover_photo = useRef()
  let role = localStorage.getItem("role")
  let token = localStorage.getItem("token")
  let headers = { headers: { "Authorization": `bearer ${token}` } }


  function handleForm(e) {
    e.preventDefault()

    const formData = new FormData();
    formData.append('title', title.current.value);
    formData.append('category_id', category.current.value);
    formData.append('cover_photo', cover_photo.current.files[0]);
    formData.append('description', description.current.value);

    axios.post(VITE_API + "games", formData, headers)
      .then(res => {
        navigate('/')
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          width: "400px",
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Your game was successfully created',
        })
      })
      .catch(error => {
        const err = error.response.data.message
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          width: "400px",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: err,
        })
      })
  }

  return (
    <>
      {role == 1 || role == 2 ? (
        <>
          <section className="grid h-screen place-content-center text-slate-300">
            <div className="mb-10 text-center text-black">
              <h1 className="text-3xl font-bold">New Game</h1>
            </div>
            <form onSubmit={(e) => handleForm(e)} method='post' encType='multipart/form-data'>
              <div className="flex flex-col items-center justify-center space-y-6 pt-14">
                <input ref={title} type="text" id="title" name="title" placeholder="Insert title" className="w-80 appearance-none  border-0  p-2 px-4  border-b border-gray-500  text-black focus:outline-none focus:ring-0" />
                <input ref={cover_photo} type="file" id="photo" name="photo" placeholder='hola' className="w-80 appearance-none  border-0  p-2 px-4  border-b border-gray-500  text-black focus:outline-none focus:ring-0 file:bg-fuchsia-400 file:border-none file:rounded-full file:h-12 file:text-white file:cursor-pointer file:shadow-lg file:hover:shadow-fuchsia-600/50 file:hover:bg-fuchsia-500 file:font-semibold" />
                <div>
                  <select ref={category} placeholder="Insert order" className="w-80 appearance-none  border-0  p-2 px-4  border-b border-gray-500  text-black" name="categories">
                    <option value="" key="rr">Insert Category</option>
                    {options()}
                  </select>
                </div>
                <div>
                  <input ref={description} type="text" id="Insert description" name="InsertDescription" placeholder="Insert description" className="w-80 appearance-none  border-0  p-2 px-4  border-b border-gray-500 bg-transparent  text-black focus:outline-none focus:ring-0" />
                </div>
                <button className="rounded-full bg-pink-500 p-2 px-16 py-4 text-white t-10 font-bold text-lg"> Send</button>
              </div>
            </form>
          </section>
        </>
      ) : (
        <>
          <Index />
          <div className='md:hidden'>
            <App />
          </div>
        </>
      )}
    </>
  )
}
