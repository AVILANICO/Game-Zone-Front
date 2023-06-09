import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import inputs_filter_actions from '../store/actions/inputs_filters'
import apiUrl from "../../api"
import { Link as Anchor, Link, useNavigate } from "react-router-dom";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" />

let token = localStorage.getItem("token")
let headers = { headers: { "Authorization": `bearer ${token}` } }

const { inputs_filter } = inputs_filter_actions

export default function Games() {

    const { title, categories } = useSelector(store => store.inputs)
    /* console.log(title)
    console.log(categories) */
    const dispatch = useDispatch()
    const [games, setGames] = useState()
    const buscador = useRef()
    const category_id = useRef()
    const [reload, setReload] = useState(false)
    const [count, setCount] = useState()
    const [pagAct, setNextPag] = useState(1)

    // console.log(count)
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
        [reload, pagAct]
    )
    useEffect(
        () => {
            axios(apiUrl + 'categories')
                .then(res => categorie(res.data.categories))
                .catch(err => console.error(err))
        },
        []
    )
    let [categor, categorie] = useState([])

    const options = () => {
        return (
            <div className='flex flex-row gap-5 w-[100%] h-[40%]'>

                <label className='mt-[-0.5rem] xsm:hidden flex flex-row items-center justify-center w-10 h-10 bg-black text-white p-[22px] rounded-[10px] text-[15px] font-bold cursor-pointer' >
                    All
                    <input name="category_id" onClick={capture} style={{ appearance: 'none' }} type="checkbox" />

                </label>

                {categor?.map(a => (

                    <div key={a._id}>
                        <label className='cursor-pointer font-bold' htmlFor={a._id} key={a._id} style={{ height: "5rem", backgroundColor: a.hover, color: a.color, padding: '1rem', borderRadius: '10px', fontSize: "12px", textAlign: "center", ...(categories.includes(a._id) ? { backgroundColor: a.color, color: "white" } : {}) }}>
                            {a.name.charAt(0).toUpperCase() + a.name.slice(1)}
                            <input name="category_id" onClick={capture} style={{ appearance: 'none' }} type="checkbox" value={a._id} id={a._id} />

                        </label>


                    </div>
                ))}
            </div>
        );
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

    return (
        <>
            <div className=" w-full  flex flex-col items-center bg-[#343434]">
                <div className=" w-full h-auto flex flex-col justify-center items-center  xsm:h-[40vh] ">
                    <div className='my-10'>
                        <div className='rounded-2xl bg-black '>
                            <iframe className='h-[15rem] w-[30rem] cursor-none' src="https://giphy.com/embed/UctoTPBIjNQaIryi6l" ></iframe>
                            {/* <iframe className='' src="https://giphy.com/embed/VcASvyhKDRDguQ0bHX"></iframe> */}
                        </div>

                        {/* <h1 className='text-center mt-6 text-[4rem] font-bold text-[#14532d]' style={{ fontFamily: 'Dancing Script, cursive' }}>Games</h1> */}

                    </div>

                    <form className="flex justify-center rounded-lg items-center  bg-white w-[63%] h-10 xsm:w-[90%] xsm:rounded-full xsm:mb-8 ">
                        <label type="button" className="flex justify-center" htmlFor='search'>
                            <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#4ade80" strokeWidth="2" />
                                <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </label>
                        <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find your game here" id='search' className="h-full w-[90%] rounded-lg text-xl xsm:w-[70%] xsm:rounded-full outline-none" autoComplete='off' />
                    </form>

                    <div className="rounded-[2rem] w-[90%]  bg-[#343434] xsm:w-full xsm:rounded-[4rem]">
                        <div className='flex flex-col items-center min-h-[120vh] mt-4 xsm:mt-[10%] w-[100%]'>
                            <div className='flex flex-row md:w-full md:pl-[15%] md:mt-[2%] md:mb-5 md:gap-5  xsm:mt-3 xsm:gap-3'>

                                <form className='flex flex-row w-full h-[5vh] xsm:pt-5 xsm:pb-[2rem] justify-center' ref={category_id}>
                                    {options()}
                                </form>


                            </div>

                            <div className='pb-[20vh] flex xsm:flex-col h-[500%] pb-50 xsm:items-center md:flex-wrap w-[70%] gap-[10%] xsm:w-full '>
                                {games && games.length > 0 ? (

                                    games?.map((each =>
                                        <div key={each._id} className='h-[auto] w-[45%] mt-4 b flex flex-col items-center rounded-xl bg-[#d4d4d4]' >
                                            <img className='w-[100vw] h-[12rem] ' style={{ borderRadius: '10px 10px 0 0' }} src={each.cover_photo} />

                                            <p className='md:text-[1rem] font-bold xsm:text-center'> {each.title} </p>
                                            <p style={{ color: each.category_id.color }}> {each.category_id.name}</p>
                                            <div className='flex justify-between w-[90%] mt-3 flex-wrap '>
                                                <Anchor className='bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:shadow-sm rounded-md py-2 px-2 mb-4 font-bold flex items-center md:justify-center ' to={`/game/${each._id}/1`}>
                                                    Details
                                                </Anchor>

                                                <div className=" rounded-md py-2 px-2 mb-4 font-bold flex bg-black flex-wrap">
                                                    <p className='text-white mr-3'>USD$ {each.price}</p>  <p className='bg-green-600 hover:bg-green-700 rounded-md px-1 cursor-pointer flex'>Add to <svg xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="" viewBox="0 0 16 16">
                                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                                    </svg> </p>
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

        </>

    )
}
