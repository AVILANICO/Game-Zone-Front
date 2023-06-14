import React from 'react'
import apiUrl from "../../api"
import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import VITE_API from '../../api'
import Swal from 'sweetalert2'
import Index from './Index'
import App from '../App'
import { useNavigate } from 'react-router-dom'
import { Link as Anchor } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import companies_action from '../store/actions/companies.js'
import authors_action from '../store/actions/authors.js'

const { get_companies } = companies_action
const { get_authors } = authors_action

export default function GameForm() {

  let store = useSelector(store => store);
  const dispatch = useDispatch()

  let getCompanies = store.companies.active
  console.log(getCompanies)

  let getAuthors = store.authors.active
  console.log(getAuthors);

  useEffect(() => {
    dispatch(get_authors())
    dispatch(get_companies())
  }, [])

  useEffect(
    () => { axios(apiUrl + 'categories').then(res => categories(res.data.categories)).catch(err => console.error(err)) },
    []
  )
  let [categor, categories] = useState([])

  const options = () => {
    return categor.map(a => <option key={a._id} value={a._id}>{a.name}</option>);
  }

  const optionsCompanies = () => {
    return getCompanies.map(a => <option key={a._id} value={a._id}>{a.name}</option>);
  }

  const optionsAuthors = () => {
    return getAuthors.map(a => <option key={a._id} value={a._id}>{a.name}</option>);
  }

  const navigate = useNavigate()
  const title = useRef()
  const category = useRef()
  const description = useRef()
  const cover_photo = useRef()
  const price = useRef()
  const stock = useRef()
  const gameplay = useRef()
  const company = useRef()
  const author = useRef()


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
    formData.append('price', price.current.value);
    formData.append('stock', stock.current.value);
    formData.append('gameplay', gameplay.current.value);
    formData.append('company_id', company.current.value);
    formData.append('author_id', author.current.value);


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
          <div className="grid min-h-[92vh] place-content-center text-slate-300 bg-cover bg-center bg-[url('https://wallpaperset.com/w/full/b/0/a/417136.jpg')]">
            <div className='bg-[#343434] rounded-2xl w-[30vw] h-[85vh] flex flex-col'>
              <div className=" text-center  mt-4 text-white">
                <h1 className="text-5xl shadow-lg shadow-black font-bold font-mono">NEW GAME</h1>
              </div>
              <form onSubmit={(e) => handleForm(e)} method='post' encType='multipart/form-data'>
                <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                  <input ref={title} style={{ backgroundColor: "transparent" }} type="text" id="title" name="title" placeholder="Insert title" className="w-80 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500 text-white focus:outline-none focus:ring-0" />
                  <input ref={cover_photo} style={{ backgroundColor: "transparent" }} type="file" id="photo" name="photo" className="w-80 file:w-24 appearance-none  border-0  p-2 px-4  border-b border-gray-500  text-white bg-[#343434] focus:outline-none focus:ring-0 file:bg-cyan-800 file:border-none file:rounded-2xl file:h-8 file:text-white file:cursor-pointer file:shadow-xl file:hover:shadow-yellow-200/50 file:hover:bg-cyan-700 file:font-semibold" />
                  <div>
                    <select ref={category} style={{ backgroundColor: "#343434" }} placeholder="Insert order" className="w-80 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500  text-white" name="categories">
                      <option value="" key="rr">Insert Category</option>
                      {options()}
                    </select>
                  </div>
                  <div>
                    <input ref={description} type="text" id="Insert description" name="InsertDescription" placeholder="Insert description" className="w-80 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500 bg-transparent  text-white focus:outline-none focus:ring-0" />
                  </div>
                  <div>
                    <input ref={gameplay} type="text" id="Insert gameplay" name="InsertGameplay" placeholder="Insert Gameplay URL" className="w-80 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500 bg-transparent  text-white focus:outline-none focus:ring-0" />
                  </div>
                  <div className='flex flex-col'>
                    <select ref={company} style={{ backgroundColor: "#343434" }} placeholder="Insert order" className="w-80 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500  text-white" name="companies">
                      <option value="" key="rr">Insert Company</option>
                      {optionsCompanies()}
                    </select>
                    <Anchor className='text-sm self-end hover:border-b h-4' to="/company-form">New Company?</Anchor>
                  </div>
                  <div className='flex flex-col'>
                    <select ref={author} style={{ backgroundColor: "#343434" }} placeholder="Insert order" className="w-80 font-mono appearance-none  border-0 px-4  border-b border-gray-500  text-white" name="authors">
                      <option value="" key="rr">Insert Author</option>
                      {optionsAuthors()}
                    </select>
                  </div>
                  <div className='flex gap-4'>
                    <input ref={price} type="number" id="Insert price" name="InsertPrice" placeholder="Price" className="w-32 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500 bg-transparent  text-white focus:outline-none focus:ring-0" />
                    <input ref={stock} type="number" id="Insert stock" name="InsertStock" placeholder="Stock" className="w-32 font-mono appearance-none  border-0  p-2 px-4  border-b border-gray-500 bg-transparent  text-white focus:outline-none focus:ring-0" />
                  </div>
                  <button className="rounded-2xl bg-cyan-800 p-2 px-16 py-4 text-white shadow-xl hover:scale-95 hover:shadow-yellow-200/50 t-10 font-bold text-2xl font-mono">Send</button>
                </div>
              </form>
            </div>
          </div>
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
