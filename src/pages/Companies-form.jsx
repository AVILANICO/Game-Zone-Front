import axios from 'axios';
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import apiUrl from '../../api'
import { useNavigate } from 'react-router-dom';

export default function CompanyForm() {
    let user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate();
    const name = useRef();
    const website = useRef();
    const logo = useRef();
    const description = useRef();

    function handleForm(e) {
        e.preventDefault();
        let data = {
            name: name.current.value,
            website: website.current.value,
            logo: logo.current.value,
            description: description.current.value,
            /* user_id: user.id, */
        };
        let token = localStorage.getItem("token")
        let headers = { headers: { "Authorization": `Bearer ${token}` } }
        axios.post(`${apiUrl}companies`, data, headers)
            .then((res) => {
                console.log(res.data)
                Swal.fire({
                    title: 'Company successfully created',
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'Go to homepage',
                    allowOutsideClick: false,
                }).then(() => {
                    navigate('/');
                });
            })
            .catch(err => {
                const joi = err.response.data.message
                console.log(err.response.data.message)
                Swal.fire(`${joi}`)
            })
        console.log(data);
    }

    return (
        <form onSubmit={handleForm} className='h-[92vh] bg-black flex flex-col items-center justify-center'>
            <h1 className='flex justify-center text-[2.5rem]'>New Company</h1>
            <img className="object-cover object-center h-48 w-48 rounded-full" src="https://img.jagranjosh.com/images/2022/February/222022/Top-10-most-valuable-companies-in-the-world.jpg" alt="user avatar" />
            <div className='mt-5 flex flex-col items-center justify-center w-[60%]  text-black font-montserrat font-normal	text-base'>
                <input className='w-2/5 text-white border-b-gray-400 bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="Name" ref={name} />
                <input className='w-2/5 text-white border-b-gray-400 bg-transparent border-b-2 border-white my-4 px-2' type="url" placeholder="Website" ref={website} />
                <input className='w-2/5 text-white border-b-gray-400 bg-transparent border-b-2 border-white my-4 px-2' type="url" placeholder="URL Profile Image" ref={logo} />
                <input className='w-2/5 text-white border-b-gray-400 bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="Description" ref={description} />
                <button className="text-white not-italic font-medium text-2xl leading-[95.19%] bg-[#0184D6] hover:bg-[#10387D] rounded-full flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4 mt-5" type="submit">Send</button>
            </div>
        </form>
    );

}