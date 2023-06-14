import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import inputs_filter_actions from '../store/actions/inputs_filters'
import apiUrl from "../../api"
import { Link as Anchor, Link, useNavigate } from "react-router-dom";
import game_action from '../store/actions/game'
import Swal from 'sweetalert2'

const { game_delete } = game_action


let token = localStorage.getItem("token")
let headers = { headers: { "Authorization": `bearer ${token}` } }

const { inputs_filter } = inputs_filter_actions

export default function Games() {
    const games_all = useSelector(store => store.game.game)


    const { title, categories } = useSelector(store => store.inputs)

    const dispatch = useDispatch()
    const [games, setGames] = useState()
    const buscador = useRef()
    const category_id = useRef()
    const [reload, setReload] = useState(false)
    const [count, setCount] = useState()
    const [pagAct, setNextPag] = useState(1)
    const [idcompras, setIdcompras] = useState()
    const [open, setOpen] = useState(false);
    const role = localStorage.getItem('role')







    useEffect(
        () => {
            axios(apiUrl + `games?title=${buscador.current?.value}&category_id=${categories?.join(',')}&page=${pagAct}`, headers)
                .then(res => {
                    setGames(res.data.response)
                    setCount(res.data.count)
                }

                )
                .catch(err => console.error(err))
        },
        [categories, pagAct]
    )
    useEffect(
        () => {
            axios(apiUrl + 'categories')
                .then(res => categorie(res.data.categories))
                .catch(err => console.error(err))
        },
        [categories]
    )
    let [categor, categorie] = useState([])

    const options = () => {
        return (
            <div className='flex flex-row gap-2 items-center justify-center'>

                <label className='mt-[-0.5rem] hidden xsm:hidden  flex-row items-center justify-center w-10 h-10 bg-black text-white p-[12px] rounded-[10px] text-[12px] font-bold cursor-pointer' >
                    All
                    <input name="category_id" onClick={capture} style={{ appearance: 'none' }} type="checkbox" />

                </label>

                {categor?.map(a => (

                    <div key={a._id}>
                        <label className='cursor-pointer font-bold' htmlFor={a._id} key={a._id} style={{ height: "5rem", backgroundColor: a.hover, color: a.color, padding: '12px', borderRadius: '5px', fontSize: "11px", textAlign: "center", ...(categories.includes(a._id) ? { backgroundColor: '#155E75', color: "white", border: '1px solid black' } : {}) }}>
                            {a.name.charAt(0).toUpperCase() + a.name.slice(1)}
                            <input name="category_id" onClick={capture} style={{ appearance: 'none' }} type="checkbox" value={a._id} id={a._id} />

                        </label>


                    </div>
                ))}
            </div>
        );
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

    function capture() {
        dispatch(inputs_filter({
            title: buscador.current?.value,
            categories: Object.values(category_id.current)?.filter(each => each.checked)?.map(each => each.value)

        }
        ))
        setReload(!reload)
    }

    function next() {
        setNextPag(pagAct + 1)
    }

    function prev() {
        if (games)
            setNextPag(pagAct - 1)

    }



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
    // console.log(idcompras);

    return (
        <>
            {role == 3 ? (
                <div className=" w-full  flex flex-col items-center bg-[#EAEAEA]">
                    <div className=" w-full h-auto flex flex-col justify-center items-center  xsm:h-[40vh] ">
                        <div className='flex h-12 w-full' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }} >
                            <p className='text-3xl  font-mono rounded flex items-center px-2 '>ADMIN PANEL</p>
                        </div>



                        <div className="rounded-[2rem] w-[90%] mt-2  bg-white xsm:w-full xsm:rounded-[4rem]">
                            <div className='flex flex-col items-center min-h-[100vh]  xsm:mt-[10%] w-[100%]'>
                                <div className='flex flex-row md:pl-[15%] md:mt-[2%] md:mb-0 md:gap-5    xsm:mt-3 xsm:gap-3 justify-between w-[90%] '>

                                    <form className='flex flex-row  h-[5vh] xsm:pt-5 xsm:pb-[2rem] ' ref={category_id}>
                                        <div className='flex w-[100%]'>
                                            <Anchor to={'/admin'} className='relative right-10 cursor-pointer bg-[#e2504b]  rounded-xl p-[8px] transition hover:-translate-y-1 hover:scale-110 duration-300 flex items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                                </svg>
                                            </Anchor>
                                            <div className='flex gap-20   '>
                                                <div className='flex'>
                                                    {options()}
                                                </div>






                                                <div className='flex border items-center border-[#EAEAEA] ' style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                                                    <label type="button" className="flex justify-center  " htmlFor='search'>
                                                        <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#4ade80" strokeWidth="2" />
                                                            <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                    </label>
                                                    <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find the game here" id='search' className="h-full  w-[90%] rounded-lg text-xl xsm:w-[70%] xsm:rounded-full outline-none" autoComplete='off' />
                                                </div>
                                            </div>


                                        </div>




                                    </form>


                                </div>

                                <div className='pb-[20vh] flex xsm:flex-col h-[500%] pb-50 xsm:items-center md:flex-wrap w-[70%] gap-[10%] xsm:w-full justify-center'>
                                    {games && games.length > 0 ? (

                                        games?.map((each =>
                                            <div key={each._id} className='h-[auto] w-[20rem] mt-[6px] b flex flex-col items-center rounded-md bg-[#103861d1]' >
                                                <img className='w-[90%] mt-2 h-[10rem] ' style={{ borderRadius: '0px 0px 0 0' }} src={each.cover_photo} />

                                                <p className='md:text-[1rem] font-bold xsm:text-center'> {each.title} </p>
                                                <p style={{ color: each.category_id.color }}> {each.category_id.name}</p>
                                                <div className='flex justify-between w-[90%]  flex-wrap  items-center'>



                                                    <Anchor className='bg-black hover:from-green-600 hover:to-green-800 hover:shadow-sm rounded-md py-1 px-2 mb-4 font-bold flex items-center md:justify-center text-[#ffffff] ' to={`/game/${each._id}/1`}>
                                                        Details
                                                    </Anchor>

                                                    <button onClick={() => alertDelete(() => dispatch(game_delete({ id: each?._id })))} className="    mb-4 w-20 bg-[#e2504b] text-[#ffffff] hover:bg-[#991010] hover:text-white cursor-pointer font-bold py-1 px-2 rounded-lg hover:scale-110 transition-all">
                                                        Delete
                                                    </button>







                                                </div>







                                            </div>

                                        ))) : (
                                        <div className='flex flex-row justify-center'>
                                            <h1 className='text-[2rem]'>No matches found in the search</h1>
                                        </div>
                                    )}
                                    <div className='w-[100%] flex justify-around pt-5'>

                                        {pagAct == 1 ? null : (<input className="bg-black hover:bg-[#18181b] text-white font-bold py-2 px-4 rounded-full w-[15%]" type="button" value="prev" onClick={prev} />)}
                                        {pagAct > count ? null : (<input className="bg-black hover:bg-[#18181b] text-white font-bold py-2 px-4 rounded-full w-[15%] " type="button" value="next" onClick={next} />)}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>

            ) : (
                <div className=" w-full  flex flex-col items-center bg-black">
                    <div className=" w-full h-auto flex flex-col justify-center items-center  xsm:h-[40vh] ">
                        <div className='my-10'>
                            <div className='rounded-2xl bg-black '>
                                <iframe className='h-[15rem] w-[30rem] cursor-none' src="https://giphy.com/embed/UctoTPBIjNQaIryi6l" ></iframe>
                                {/* <iframe className='' src="https://giphy.com/embed/VcASvyhKDRDguQ0bHX"></iframe> */}
                            </div>

                            {/* <h1 className='text-center mt-6 text-[4rem] font-bold text-[#14532d]' style={{ fontFamily: 'Dancing Script, cursive' }}>Games</h1> */}

                        </div>

                        {/* <form className="flex justify-center rounded-lg items-center  bg-white w-[63%] h-10 xsm:w-[90%] xsm:rounded-full xsm:mb-8 ">
                            <label type="button" className="flex justify-center" htmlFor='search'>
                                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#4ade80" strokeWidth="2" />
                                    <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </label>
                            <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find your game here" id='search' className="h-full w-[90%] rounded-lg text-xl xsm:w-[70%] xsm:rounded-full outline-none" autoComplete='off' />
                        </form> */}

                        <div className="rounded-[2rem] w-[90%]  bg-[#343434]  xsm:w-full xsm:rounded-[4rem]">
                            <div className='flex flex-col items-center min-h-[120vh] mt-4 xsm:mt-[10%] w-[100%]'>
                                <div className='flex flex-row w-[85%] md:pl-[15%] md:mt-[2%] md:mb-5 md:gap-5  xsm:mt-3 xsm:gap-3 justify-start'>

                                    <form className='flex flex-row  h-[5vh] xsm:pt-5 xsm:pb-[2rem]  ' ref={category_id}>
                                        <div className='flex gap-20'>
                                            <div className='flex'>
                                                {options()}
                                            </div>

                                            <div className='flex border items-center border-[#EAEAEA] ' style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                                                <label type="button" className="flex justify-center  " htmlFor='search'>
                                                    <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#4ade80" strokeWidth="2" />
                                                        <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                </label>
                                                <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find your the game here" id='search' className="h-full bg-[#343434]  w-[90%] rounded-lg text-xl xsm:w-[70%] xsm:rounded-full outline-none" autoComplete='off' />
                                            </div>
                                        </div>

                                    </form>


                                </div>

                                <div className='pb-[20vh] flex xsm:flex-col h-[500%] pb-50 xsm:items-center md:flex-wrap w-[70%] gap-[10%] xsm:w-full justify-center '>
                                    {games && games.length > 0 ? (

                                        games?.map((each =>
                                            <div key={each._id} className='h-[auto] w-[20rem] mt-4 b flex flex-col items-center rounded-md bg-[#16487a7f]' >
                                                <img className='w-[90%] mt-2 h-[12rem] ' style={{ borderRadius: '0px 0px 0 0' }} src={each.cover_photo} />

                                                <p className='md:text-[1rem] font-bold xsm:text-center'> {each.title} </p>
                                                <p style={{ color: each.category_id.color }}> {each.category_id.name}</p>
                                                <div className='flex justify-between w-[90%] mt-3 flex-wrap items-center'>



                                                    <Anchor className='bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:shadow-sm rounded-md py-2 px-2 mb-4 font-bold flex items-center md:justify-center ' to={`/game/${each._id}/1`}>
                                                        Details
                                                    </Anchor>

                                                    <div className=" rounded-md py-2 px-2 mb-4 font-bold flex bg-black flex-wrap">
                                                        <p className='text-white mr-3'>USD$ {each.price}</p>  <button id={each._id}
                                                            onClick={handleComprar}
                                                            onClickCapture={(e) => { setIdcompras(e.target.id) }} className='bg-green-600 hover:bg-green-700 rounded-md px-1 cursor-pointer flex'>Add to <svg xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="" viewBox="0 0 16 16">
                                                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                                            </svg> </button>
                                                    </div>
                                                </div>

                                            </div>

                                        ))) : (
                                        <div className='flex flex-row justify-center'>
                                            <h1 className='text-[2rem]'>No matches found in the search</h1>
                                        </div>
                                    )}
                                    <div className='w-[100%] flex justify-around pt-5'>

                                        {pagAct == 1 ? null : (<input className="bg-black hover:bg-[#18181b] text-white font-bold py-2 px-4 rounded-full w-[15%]" type="button" value="prev" onClick={prev} />)}
                                        {pagAct > count ? null : (<input className="bg-black hover:bg-[#18181b] text-white font-bold py-2 px-4 rounded-full w-[15%] " type="button" value="next" onClick={next} />)}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            )}


        </>

    )
}
