import { useDispatch, useSelector } from "react-redux"
import actions from "../store/actions/chapter_bar"
import { useState, useEffect } from "react"
import apiUrl from '../../api'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function Pages() {
	let [reload, setReload] = useState(true)
	let [id_prev, setPrev] = useState()
	let [id_next, setNext] = useState()
	let chapterStates = useSelector(store => store.title_order)
	// console.log(chapterStates);
	let { chapter_bar } = actions
	let { id, page } = useParams()
	// console.log(typeof page);
	let dispatch = useDispatch()
	let navigate = useNavigate()
	let [order, setOrder] = useState(chapterStates.order)
	let [title, setTitle] = useState(chapterStates.title)
	let [manga_id, setManga] = useState(chapterStates.manga_id)
	let [allPages, setAllPages] = useState([])
	let [imgPages, setImgPages] = useState('')
	let [counter, setCounter] = useState(parseInt(page))
	let token = localStorage.getItem('token')
	let headers = { headers: { 'Authorization': `Bearer ${token}` } }

	// console.log(chapter_bar);
	useEffect(
		() => {
			axios(apiUrl + 'chapters/' + id, headers)
				.then(res => {
					setAllPages(res.data.response.pages);
					setTitle(res.data.response.title);
					setOrder(res.data.response.order)
					setManga(res.data.response.manga_id) //
					setImgPages(res.data.response.pages[parseInt(page)])
					setNext(res.data.id_next)
					setPrev(res.data.id_prev)
					dispatch(chapter_bar({
						title: res.data.response.title,
						order: res.data.response.order,
						manga_id: res.data.response.manga_id,
					}))
				})

				.catch(err => console.log(err))
		},
		[reload]
	)



	let next = () => {
		let newCounter = counter + 1;
		if (newCounter >= allPages.length - 1) {
			newCounter = 0;
			setCounter(newCounter)
			navigate(`/chapters/chapter/${id_next}/${newCounter}`);
			console.log(id_next);
			setReload(!reload)
		} else {
			setCounter(newCounter);
			dispatch(chapter_bar({
				title: title,
				order: order,
				manga_id: manga_id,
			}))
			navigate(`/chapters/chapter/${id}/${newCounter}`);
		}
	}

	let previous = () => {
		let newCounter = counter - 1;
		if (counter === 0) {
			newCounter = allPages.length - 1
			if (id_prev) {
				navigate(`/chapters/chapter/${id_prev}/0`);
				setReload(!reload)
				return   // el return se lo agregamos para evitar de que el codigo se nos siga ejecutando despues de cada navegacion/ejecucion!!
			} else {
				navigate(`/manga/${manga_id}/${page}`)
				return
			}
		}
		setCounter(newCounter);
		navigate(`/chapters/chapter/${id}/${newCounter}`);
	}


	useEffect(() => {
		setImgPages(allPages[counter])
	}, [counter])



	return (
		<>

			<div className="max-w-screen-2xl pt-24 mx-auto xsm:py-2 xsm:pt-24  bg-[#EBEBEB]">
				<div id="default-carousel" className="relative" data-carousel="static">
					<div className="flex justify-center items-center rounded-md ">
						<div>
							<img src={imgPages} className="w-auto my-2 h-[83vh] " />
						</div>
						<button onClick={previous} type="button" className="flex absolute h-[30%] w-[50%] left-0 z-30  items-center px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
							<span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-gray-800/30 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
								<svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
								<span className="hidden">Previous</span>
							</span>
						</button>
						<button onClick={next} type="button" className="flex absolute h-[30%] w-[50%] right-0 z-30 justify-end items-center px-4 cursor-pointer group focus:outline-none" data-carousel-next>
							<span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10  dark:bg-gray-800/30 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
								<svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
								<span className="hidden">Next</span>
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className=' flex justify-center bg-[#EBEBEB] pb-2'>
				<svg xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor" className="w-6 h-6 bg-white rounded-md">
					<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
				</svg>
				<p className="px-3">42</p>
			</div>
		</>
	)
}
