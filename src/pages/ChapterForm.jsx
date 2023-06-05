import React, { useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import apiUrl from "../../api"
import Index from "./Index"
import Swal from "sweetalert2"

const ChapterForm = () => {
    let id = useParams()
    // console.log(id.id_manga);
    let title = useRef()
    let order = useRef()
    let pages = useRef()
    let navigate = useNavigate()


    function handleForm(e) {

        e.preventDefault()
        let array = pages.current.value
        let listpage = array.split(",")
        let data = {
            manga_id: id.id_manga,
            title: title.current.value,
            order: order.current.value,
            pages: listpage
        }
        // console.log(listpage);


        axios.post(apiUrl + 'chapters', data, headers)
            .then(res => {
                console.log(res)
                navigate('/')
                Swal.fire({
                    icon: 'success',
                    title: 'Chapter successfully!',
                })
            })
            .catch(error => {
                const err = error.response.data.message

                Swal.fire({
                    icon: 'error',
                    title: err,
                })
            })
    }

    // let role = JSON.parse(localStorage.getItem('user'))?.role;
    let role = localStorage.getItem('role')
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    return (
        <>

            {role == 1 || role == 2 ? (
                <>
                    <section className="grid h-[80vh] mb-[11rem] place-content-center text-slate-300">
                        <div className="mb-10 text-center text-black">
                            <h1 className="text-3xl -tracking-tight font-sans">New Chapter</h1>

                        </div>
                        <form onSubmit={(e) => handleForm(e)} className="flex flex-col items-center justify-center space-y-6 pt-14">
                            <input type="text" id="title" name="title" placeholder="Insert title" className="w-80 appearance-none  border-0  p-2 px-4 text-black border-b border-gray-500 bg-transparent focus:outline-none focus:ring-0" ref={title} />
                            <div>
                                <input type="text" id="Insert order" name="Insert order" placeholder="Insert order" className="w-80 appearance-none text-black border-0  p-2 px-4  border-b border-gray-500 bg-transparent focus:outline-none focus:ring-0" ref={order} />
                            </div>
                            <div>
                                <input type="text" id="Insert order" name="Insert order" placeholder="Insert pages" className="w-80 appearance-none  border-0  p-2 px-4 text-black border-b border-gray-500 bg-transparent focus:outline-none focus:ring-0 mb-20" ref={pages} />
                            </div>
                            <button className="rounded-full bg-pink-500 p-2 px-36 py-4 text-white t-10 font-bold text-lg"> Send</button>
                        </form>
                    </section>
                    <div className="mt-32">
                    </div>
                </>
            ) : (
                <Index />
            )}
        </>
    )
}

export default ChapterForm
