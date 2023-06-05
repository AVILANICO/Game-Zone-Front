import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import apiUrl from '../../api'
import { useNavigate } from 'react-router-dom';

export default function AuthorForm() {
    let user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();

    const [$currentDate, setCurrentDate] = useState('');
    const [$photo, setProfileImageUrl] = useState('');
    const name = useRef();
    const last_name = useRef();
    const cityCountry = useRef();
    const date = useRef();
    const photo = useRef();
    useEffect(() => {
        const inputDate = document.querySelector('#date-input');
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString('en-GB', options));
        inputDate.value = $currentDate;
    }, []);

    const handleProfileImageChange = (event) => {
        setProfileImageUrl(event.target.value);
    };

    function handleForm(e) {
        e.preventDefault();
        const cityCountryValue = cityCountry.current.value;
        const [city, country] = cityCountryValue.includes(",") ? cityCountryValue.split(",").map(value => value.trim()) : ["", ""];
        let data = {
            name: name.current.value,
            last_name: last_name.current.value,
            city: city.trim(),
            country: country.trim(),
            photo: photo.current.value,
            /* user_id: user.id, */
        };
        let token = localStorage.getItem("token")
        let headers = { headers: { "Authorization": `Bearer ${token}` } }
        axios.post(`${apiUrl}authors`, data, headers)
            .then((res) => {
                console.log(res.data)
                Swal.fire({
                    title: 'Author successfully created',
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
        <form onSubmit={handleForm} className='h-screen bg-white flex flex-col items-center justify-center'>
            <h1 className='flex justify-center text-[2.5rem]'>New Author</h1>
            <img
                className="rounded-full object-cover object-center h-16 w-16"
                src="./src/assets/image/companies.png"
                alt="user avatar"
            />
            <div className='mt-5 flex flex-col items-center justify-center w-[60%]  text-black font-montserrat font-normal	text-base'>
                <input className='w-full border-b-gray-300 bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="Insert name" ref={name} />
                <input className='w-full border-b-gray-300 bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="Insert last name" ref={last_name} />
                <input className='w-full border-b-gray-300 bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="City, country" ref={cityCountry} />
                <input className='w-full border-b-gray-300 bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder={$currentDate} readOnly id="date-input" ref={date} />
                <input className='w-full border-b-gray-300 bg-transparent border-b-2 border-white my-4 px-2' type="url" placeholder="URL profile image" onChange={handleProfileImageChange} ref={photo} />
                <button className="text-white not-italic font-medium text-2xl leading-[95.19%] bg-gradient-to-r from-btn1 from-(-13.10%) to-btn2 to-58.69% rounded-full flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4 mt-5" type="submit">Send</button>
            </div>
        </form>
    );

}
