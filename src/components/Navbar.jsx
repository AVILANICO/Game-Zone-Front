
import { useParams } from "react-router-dom";
import VITE_API from "../../api";
import axios from "axios";
import { useState,useEffect} from 'react';
import { Link as Anchor, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import logo2 from '../assets/image/fondo-verde.png'




export default function Navbar() {
  
    const [open, setOpen] = useState(true);
  
    const boton = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
  /* const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  let { order, title } = useSelector(store => store.title_order)

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }
  let { url } = useParams()
  const role = localStorage.getItem("role")
  let token = localStorage.getItem('token')
  let headers = { headers: { 'authorization': `Bearer ${token}` } }
  let email = localStorage.getItem('email')
  let photo = localStorage.getItem('photo')


  function backHome() {
    axios.post(VITE_API + 'auth/signout', null, headers)
      .then(res => {
        localStorage.clear();
        navigate('/')
      })
      .catch(err => alert(err))
  } */
  /* 
    <nav className="xsm:hidden w-full h-24 absolute flex justify-between items-center bg-black"> */
  return (
    <nav   class="bg-[#343434]">
      <div   class=" bg-[#343434] ">
        <div  class="relative flex h-16 items-center justify-between bg-[#343434]">
          <div  class="absolute inset-y-0 left-0 flex items-center sm:hidden bg-[#343434]">

            <button onClick={boton}  type="button" class="bg-[#343434] inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="bg-[#343434] sr-only">Open main menu</span>

              <svg class=" bg-[#343434] block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>


              <svg class=" bg-[#343434] hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path className="bg-[#343434]" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div  class=" bg-[#343434] flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class=" bg-[#343434] flex flex-shrink-0 items-center">
              <img class=" bg-[#343434] block h-10 w-auto lg:hidden" src={logo2} alt="Your Company" />
              <img class=" bg-[#343434] hidden h-10 w-auto lg:block" src={logo2} alt="Your Company" />
            </div>
            <div   class=" bg-[#343434]  hidden sm:ml-6 sm:block">
              <div class=" bg-[#343434]  flex space-x-4">

                <Anchor href="#" class="bg-[#454545] text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Games</Anchor>
                <Anchor href="#" class="bg-[#343434]  text-gray-300  hover:border-b border-white hover:text-white px-3 py-2 text-sm font-medium">Store</Anchor>
                <Anchor href="#" class="bg-[#343434] text-gray-300  hover:border-b border-white hover:text-white px-3 py-2 text-sm font-medium">Contact </Anchor>

              </div>
            </div>
          </div>
          
          <div class="bg-[#343434] absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 w-64 justify-around  content-center ">
            <div className=" bg-[#343434] flex justify-center items-center content-center ">
            <button type="button" class="bg-[#343434]  rounded-full p-1 text-gray-400 hover:text-[#14C18B] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">Favorites</button>
            <button  type="button" class="bg-[#343434]  rounded-full p-1 text-gray-400 hover:text-[#14C18B] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class= " bg-[#343434]  sr-only">View notifications</span>
              <svg   xmlns=" bg-[#343434] http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="  bg-[#343434] bi bi-heart" viewBox="0 0 16 16">
                <path className="bg-[#343434]" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>
            </div>
            <button type="button" class=" bg-[#343434] rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class=" bg-[#343434] bi bi-cart4" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </button>


            <div class="relative ml-3">
              <div className="bg-[#343434]">
                <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="bg-[#343434] sr-only">Open user menu</span>
                  <img class=" bg-[#343434]  h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
              </div>


             {/*  <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>


      {open && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
          </div>
        </div>
      )}
    </nav>
  )
}