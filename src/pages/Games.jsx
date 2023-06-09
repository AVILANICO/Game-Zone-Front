import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import inputs_filter_actions from '../store/actions/inputs_filters'
import apiUrl from "../../api"
import { Link as Anchor, Link, useNavigate } from "react-router-dom";

let token = localStorage.getItem("token")
let headers = { headers: { "Authorization": `bearer ${token}` } }
console.log(token);

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
    const [idcompras, setIdcompras] = useState()
    

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

                <label className='mt-[-0.5rem] xsm:hidden flex flex-row items-center justify-center w-10 h-10 bg-[#999999] text-white p-[1rem] rounded-[26px] text-[12px]' >
                    All
                    <input name="category_id" onClick={capture} style={{ appearance: 'none' }} type="checkbox" />

                </label>

                {categor?.map(a => (

                    <div key={a._id}>
                        <label htmlFor={a._id} key={a._id} style={{ height: "5rem", backgroundColor: a.hover, color: a.color, padding: '1rem', borderRadius: '26px', fontSize: "12px", textAlign: "center", ...(categories.includes(a._id) ? { backgroundColor: a.color, color: "white" } : {}) }}>
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


    
    const handleComprar = async () => {
        try {
            await axios.post('http://localhost:8000/carrito/' + idcompras , headers );
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(idcompras);
    
    return (
        <>
            <div className=" w-full min-h-0 flex flex-col items-center  ">
                <div className=" w-full h-[100%] flex flex-col justify-center items-center bg-cover bg-top bg-[url(/src/assets/image/fondomanga.png)] xsm:h-[40vh]">
                    <h1 className="text-[5rem] xsm:text-4xl m-4  text-white font-bold xsm: mb-[12%] mt-10">Games</h1>
                    <form className="flex justify-center rounded-lg items-center bg-white w-[63%] h-16 xsm:w-[90%] xsm:rounded-full xsm:mb-8  mb-[10%]">
                        <label type="button" className="flex justify-center">
                            <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16.9584" cy="17.4584" r="10.7917" stroke="#F97316" strokeWidth="2" />
                                <path d="M30.8333 31.3333L26.2083 26.7083" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </label>
                        <input defaultValue={title} ref={buscador} onKeyUp={capture} type="text" placeholder=" Find your game here" className="h-full w-[90%] rounded-lg text-xl xsm:w-[70%] xsm:rounded-full" />
                    </form>
                </div>
                <div className="w-full min-h-0  bg-slate-300 flex justify-center xsm:pt-[7%]">
                    <div className="rounded-[2rem] w-[90%] min-h-[50%] m-[-5rem] bg-white xsm:w-full xsm:rounded-[4rem]">
                        <h2 className=' text-[1.5rem] font-bold mt-[10%] ml-5 w-[100%] md:hidden'>Explore</h2>
                        <div className='flex flex-col items-center min-h-[120vh] mt-4 xsm:mt-[10%] w-[100%]'>

                            <div className='flex flex-row justify-evenly w-full md:hidden'>
                                <div className='relative h-[7rem] w-[7rem] rounded-lg bg-cover text-white bg-[url(/src/assets/image/adventu.png)] flex flex-col justify-end items-center'>
                                    <div className='z-10'>Adventure</div>
                                    <div className='absolute inset-0 bg-black opacity-50 rounded-lg'></div>
                                </div>
                                <div className='relative h-[7rem] w-[7rem] rounded-lg bg-cover text-white bg-[url(/src/assets/image/nostalgic.png)] flex flex-col justify-end items-center'>
                                    <div className='z-10'>Nostalgic</div>
                                    <div className='absolute inset-0 bg-black opacity-50 rounded-lg'></div>
                                </div>
                                <div className='relative h-[7rem] w-[7rem] rounded-lg bg-cover text-white bg-[url(/src/assets/image/popular.png)] flex flex-col justify-end items-center'>
                                    <div className='z-10'>Popular</div>
                                    <div className='absolute inset-0 bg-black opacity-50 rounded-lg'></div>
                                </div>
                            </div>
                            <div className='flex flex-row md:w-full md:pl-[15%] md:mt-[2%] md:mb-5 md:gap-5  xsm:mt-3 xsm:gap-3'>

                                <form className='flex flex-row w-full h-[5vh] xsm:pt-5 xsm:pb-[2rem]' ref={category_id}>
                                    {options()}
                                </form>


                            </div>

                            <div className='pb-[20vh] flex xsm:flex-col h-[500%] pb-50 xsm:items-center md:flex-wrap w-[70%] gap-[10%] xsm:w-full '>
                                {games && games.length > 0 ? (

                                    games?.map((each =>

                                        <div key={each._id} className='shadow-lg h-[12vw] mt-4 flex flex-row items-center w-[45%] xsm:w-[80%] xsm:h-[40%] bg-white rounded-lg'>
                                            <div className='h-[15vh] w-2 xsm:w-2 xsm:h-[10vh]' style={{ background: each.category_id.color }}>

                                            </div>
                                            <div className='flex flex-col p-5 w-[60%] font-bold'>
                                                <h1 className='md:text-[1.5rem]'> {each.title} </h1>
                                                <p style={{ color: each.category_id.color }}> {each.category_id.name}</p>
                                                {/* <button className="xsm:hidden mt-10 w-[40%] bg-green-200 hover:bg-green-700 text-green-500 font-bold py-2 px-4 rounded-full">
                                                    <Anchor to={`/game/${each._id}/1`}>Read</Anchor>
                                                </button> */}
                                                <button 
                                                    id={each._id}  
                                                    onClick={handleComprar}
                                                    onClickCapture={(e) => {setIdcompras(e.target.id)}}
                                                    on
                                                    className="xsm:hidden mt-10 w-[40%] bg-green-200 hover:bg-green-700 text-green-500 font-bold py-2 px-4 rounded-full">
                                                    comprar
                                                </button>
                                            </div>
                                            <img className="h-[100%] w-[40%] xsm:h-[20vh] xsm:w-[40%] object-cover rounded-[40px_8px_8px_40px/84px_8px_8px_64px;]" src={each.cover_photo} alt="" />

                                        </div>
                                    ))) : (
                                    <div className='flex flex-row justify-center'>
                                        <h1 className='text-[2rem]'>No matches found in the search</h1>
                                    </div>
                                )}
                                <div className='w-[100%] flex justify-around pt-5'>

                                    {pagAct == 1 ? null : (<input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[15%]" type="button" value="prev" onClick={prev} />)}
                                    {pagAct > count ? null : (<input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[15%] " type="button" value="next" onClick={next} />)}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
