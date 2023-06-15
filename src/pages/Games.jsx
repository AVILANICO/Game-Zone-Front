import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { Link as Anchor } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import categories_action from '../store/actions/categories'
import all_games from '../store/actions/all_games'
import inputs_filter_actions from '../store/actions/inputs_filters'
import game_action from '../store/actions/game'
import axios from 'axios'
import Swal from 'sweetalert2'
import cartActions from '../store/actions/carts'
import priceActions from '../store/actions/change_price'
import gameon from '../assets/image/gameon.PNG'

const { game_delete } = game_action
const { categories_read } = categories_action;
const { game_all } = all_games
const { inputs_filter } = inputs_filter_actions
const { captureCart } = cartActions
const { changePrice } = priceActions


let token = localStorage.getItem("token")
let headers = { headers: { "Authorization": `bearer ${token}` } }


export default function Mygames() {

  const games_all = useSelector(store => store.game_all.games)
  const categorias = useSelector(store => store.categories.categories)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [idcompras, setIdcompras] = useState()
  const role = localStorage.getItem('role')
  const [newCategories, setNewCategories] = useState([]);
  const { title } = useSelector(store => store.inputs)
  const buscador = useRef()

  useEffect(() => {
    dispatch(categories_read())
    dispatch(game_all())
  }, [])

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setNewCategories((element) => {
      if (checked) {
        return [...element, value];
      } else {
        return element.filter((category) => category !== value);
      }
    });
  };

  const filterGames = () => {
    let filteredGames = games_all;
    if (newCategories.length > 0) {
      filteredGames = filteredGames.filter((game) =>
        newCategories.includes(game.category_id._id)
      );
    }
    if (title) {
      filteredGames = filteredGames.filter((game) =>
        game.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    return filteredGames;
  };


  const resetFilters = (event) => {
    event.preventDefault();
    setNewCategories([]);
  }

  function capture() {
    dispatch(inputs_filter({
      title: buscador.current?.value,
    }
    ))
  }

  const alertDelete = (httpCb) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00BA88',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        httpCb()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        )
      }
      else {
        Swal.fire(
          'Cancelled',
          'Your game is safe :)',
          'error'
        )
      }
    })
  }

  const handleComprar = async () => {
    try {
      await axios.post('http://localhost:8000/carrito/' + idcompras, null, headers);
      toast.success('Producto agregado al carrito')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      {role == 3 ? (
        <div className=" w-full  flex flex-col items-center bg-black">
          <div className=" w-full h-auto flex flex-col justify-center items-center  xsm:h-[40vh] ">
            <div className='flex justify-center h-20 w-full mt-12' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}>
              <p className='text-5xl  font-mono rounded flex items-center px-2 text-white border-b'>ADMIN PANEL</p>
            </div>
            <div className="rounded-[2rem] w-4/5 mt-2  bg-black xsm:w-full xsm:rounded-[4rem]">
              <div className='flex flex-col items-center min-h-[100vh]  xsm:mt-[10%] w-full'>
                <div className='flex w-full '>
                  <div className="flex gap-4 w-full h-full">
                    <form className="flex gap-4 h-full w-full mt-10">
                      <Anchor to={'/admin'} className='relative cursor-pointer bg-[#e2504b]  rounded-xl transition hover:-translate-y-1 hover:scale-110 duration-300 flex items-center w-10 h-10 justify-center top-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                      </Anchor>
                      <div className="flex items-center justify-center xsm:gap-1 gap-4 w-full h-20 rounded-3xl">
                        <button onClick={resetFilters} className="hover:scale-125 transition-all flex flex-row items-center justify-center w-10 h-10 bg-[#999999] text-white p-[1rem] rounded-full text-[12px] cursor-pointer" style={{ backgroundColor: newCategories.length === 0 ? 'green' : '' }}>
                          All
                          <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" checked={newCategories.length === 0} />
                        </button>
                        {categorias?.map((each) => (
                          <div key={each._id} className=' hover:scale-110 transition-all xsm:w-20' >
                            <label className="cursor-pointer" htmlFor={each._id} key={each._id} style={{
                              height: "2rem",
                              backgroundColor: each.hover,
                              color: each.color,
                              padding: '1rem',
                              borderRadius: '26px',
                              fontSize: "18px",
                              textAlign: "center",
                              ...(newCategories.includes(each._id) ? { backgroundColor: '#155E75', color: "white" } : {})
                            }}>

                              {each.name.charAt(0).toUpperCase() + each.name.slice(1)}

                              <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" value={each._id} id={each._id} checked={newCategories.includes(each._id)} />
                            </label>
                          </div>
                        ))}
                        <div className='flex border items-center border-[#EAEAEA] ml-5' style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                          <label type="button" className="flex justify-center  " htmlFor='search'>
                            <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#4ade80" strokeWidth="2" />
                              <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </label>
                          <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find your game here" id='search' className="h-full bg-black  w-[90%] rounded-lg text-xl text-white xsm:w-[70%] xsm:rounded-full outline-none" autoComplete='off' />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="my-10 flex justify-center xsm:flex-col xsm:items-center xsm:w-full xsm:gap-6 flex-wrap md:w-full md:h-full lg:w-full gap-8">
                  {filterGames().length > 0 ? (
                    filterGames().map((each) => (
                      <div key={each._id} className='h-[47vh] w-[25vw] mt-4  flex flex-col items-center justify-around rounded-md bg-[#2488ed30]' >
                        <img className='w-[100%] h-[60%] rounded-sm' src={each.cover_photo} />
                        <p className='md:text-[1rem] text-white font-bold xsm:text-center'> {each.title} </p>
                        <p style={{ color: '#0174DF' }}> {each.category_id.name}</p>
                        <div className='flex justify-between w-[90%] mt-3 flex-wrap items-center'>
                          <div className='flex justify-evenly w-[100%] mt-4  flex-wrap  items-center'>
                            <Anchor className='bg-black hover:bg-slate-700 hover:scale-110 transition-all rounded-md py-1 px-2 mb-4 font-bold flex items-center md:justify-center text-[#ffffff] ' to={`/game/${each._id}/1`}>
                              Details
                            </Anchor>
                            <button onClick={() => alertDelete(() => dispatch(game_delete({ id: each?._id })))} className="mb-4 w-20 bg-[#e2504b] text-[#ffffff] hover:bg-[#991010] hover:text-white cursor-pointer font-bold py-1 px-2 rounded-lg hover:scale-110 transition-all">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-row justify-center">
                      <h1 className="text-[2rem]">No matches found in the search</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <div className="w-full flex flex-col items-center bg-black">
          <div className=' bg-black w-full flex justify-center'>
            <img className='h-[25vh] w-[25vw]' src={gameon} ></img>
          </div>
          <div className="min-h-screen bg-black w-4/5 flex flex-col items-center  xsm:w-full">
            <div className="flex gap-4 p-6 w-full justify-center items-center h-full">
              <form className="flex justify-center gap-4 h-full w-[80vw]">
                <div className="flex items-center justify-center xsm:gap-1 gap-4 w-full h-20 rounded-3xl">
                  <button onClick={resetFilters} className="hover:scale-125 transition-all flex flex-row items-center justify-center w-10 h-10 bg-[#999999] text-white p-[1rem] rounded-full text-[12px] cursor-pointer" style={{ backgroundColor: newCategories.length === 0 ? 'green' : '' }}>
                    All
                    <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" checked={newCategories.length === 0} />
                  </button>
                  {categorias?.map((each) => (
                    <div key={each._id} className=' hover:scale-110 transition-all xsm:w-20' >
                      <label className="cursor-pointer" htmlFor={each._id} key={each._id} style={{
                        height: "2rem",
                        backgroundColor: each.hover,
                        color: each.color,
                        padding: '1rem',
                        borderRadius: '26px',
                        fontSize: "18px",
                        textAlign: "center",
                        ...(newCategories.includes(each._id) ? { backgroundColor: '#155E75', color: "white" } : {})
                      }}>

                        {each.name.charAt(0).toUpperCase() + each.name.slice(1)}

                        <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" value={each._id} id={each._id} checked={newCategories.includes(each._id)} />
                      </label>
                    </div>
                  ))}
                  <div className='flex border items-center border-[#EAEAEA] ml-5' style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                    <label type="button" className="flex justify-center  " htmlFor='search'>
                      <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#4ade80" strokeWidth="2" />
                        <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </label>
                    <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find your game here" id='search' className="h-full bg-black  w-[90%] rounded-lg text-xl text-white xsm:w-[70%] xsm:rounded-full outline-none" autoComplete='off' />
                  </div>
                </div>
              </form>
            </div>
            <div className="pb-28 flex justify-center xsm:flex-col xsm:items-center xsm:w-full xsm:gap-6 flex-wrap md:w-full md:h-full lg:w-full gap-8">
              {filterGames().length > 0 ? (
                filterGames().map((each) => (
                  <div key={each._id} className='h-[45vh] w-[23vw] mt-4  flex flex-col items-center justify-around rounded-md bg-[#2488ed30]' >
                    <img className='w-[100%] h-[60%] rounded-sm' src={each.cover_photo} />

                    <p className='md:text-[1rem] text-white font-bold xsm:text-center'> {each.title} </p>
                    <p style={{ color: '#0174DF' }}> {each.category_id.name}</p>
                    <div className='flex justify-between w-[90%] mt-3 flex-wrap items-center'>
                      <Anchor className='bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:shadow-sm rounded-md py-2 px-2 mb-4 font-bold flex items-center md:justify-center ' to={`/game/${each._id}/1`}>
                        Details
                      </Anchor>

                      <div className=" rounded-md py-2 px-2 mb-4 font-bold flex bg-black flex-wrap">
                        <p className='text-white mr-3'>USD$ {each.price}</p>  <button id={each._id}
                          onClick={handleComprar}
                          onClickCapture={(e) => { setIdcompras(e.target.id) }} className='bg-blue-500 hover:bg-blue-600 rounded-md px-1 cursor-pointer flex'>Add to <svg xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                          </svg> </button>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="flex flex-row justify-center">
                  <h1 className="text-[2rem]">No matches found in the search</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </>
  )
}
