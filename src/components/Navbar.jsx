import logo from "../assets/image/logo-minga.png"
import { useParams } from "react-router-dom";
import VITE_API from "../../api";
import axios from "axios";
import { Link as Anchor, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline"
// import Carts from "./Carts";


export default function Navbar() {

  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen]  = useState(false);
  const navigate = useNavigate()
  let { order, title } = useSelector(store => store.title_order)

  const products = [
    {
      id: 1,
      name: "Raft",
      href: "#",
      color: "Survival",
      price: "$10.00",
      quantity: 1,
      imageSrc:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg?t=1655744208",
      imageAlt:
        "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
      id: 2,
      name: "Grounded",
      href: "#",
      color: "Survival",
      price: "$35.00",
      quantity: 1,
      imageSrc:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/962130/header.jpg?t=1684963474",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    // More products...
  ];

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
  }

  return (
    <nav className="xsm:hidden w-full h-24 absolute flex justify-between items-center">
    <button onClick={() => setOpen(!open)} className="bg-yellow-500">Carts</button>
      <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
              <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                  >
                      <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-[#1D1D1D] shadow-xl">
                          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                              <button
                                  type="button"
                                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                  onClick={() => setOpen(false)}
                              >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                              </div>
                          </div>

                          <div className="mt-8">
                              <div className="flow-root">
                              <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                              >
                                  {products.map((product) => (
                                  <li key={product.id} className="flex py-6">
                                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                          src={product.imageSrc}
                                          alt={product.imageAlt}
                                          className="h-full w-full object-cover object-center"
                                      />
                                      </div>

                                      <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                          <div className="flex justify-between text-base font-medium text-white">
                                          <h3>
                                              <a href={product.href}>
                                              {product.name}
                                              </a>
                                          </h3>
                                          <p className="ml-4">{product.price}</p>
                                          </div>
                                          <p className="mt-1 text-sm text-gray-500">
                                          {product.color}
                                          </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                          <p className="text-gray-500">
                                          Qty {product.quantity}
                                          </p>

                                          <div className="flex">
                                          <button
                                              type="button"
                                              className="font-medium text-[#044674] hover:text-indigo-500"
                                          >
                                              Remove
                                          </button>
                                          </div>
                                      </div>
                                      </div>
                                  </li>
                                  ))}
                              </ul>
                              </div>
                          </div>
                          </div>

                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-white">
                              <p>Subtotal</p>
                              <p>$262.00</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                              Shipping and taxes calculated at pay.
                          </p>
                          <div className="mt-6">
                              <a
                              href="#"
                              className="flex items-center justify-center rounded-md border border-transparent bg-[#044674] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
                              >
                              Process to pay
                              </a>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <p>
                              or
                              <button
                                  type="button"
                                  className="font-medium text-white hover:text-indigo-500"
                                  onClick={() => setOpen(false)}
                              >
                                  Continue Shopping
                                  <span aria-hidden="true"> &rarr;</span>
                              </button>
                              </p>
                          </div>
                          </div>
                      </div>
                      </Dialog.Panel>
                  </Transition.Child>
                  </div>
              </div>
              </div>
          </Dialog>
      </Transition.Root>
      <div>
        <button onClick={handleMenuClick} className="z-10 fixed left-10 top-7">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={url === 'chapter' ? '#fff' : '#F472B6'} className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute top-16 left-0 w-[30rem]  bg-[#F472B6]/95 rounded-md py-5 z-10 ">
            {token &&

              <div className="flex items-center justify-center gap-4">

                <img className="w-12 h-12 object-cover rounded-full" src={photo} alt="imgUsuario" />
                <p className="text-xl">{email}</p>
                <svg onClick={handleMenuClick} className="flex justify-end w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

              </div>}
            <ul onClick={handleMenuClick}>
              <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/">Home</Anchor></li>
              {role == 0 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/new-role">New Role</Anchor></li>
              </>) : ("")}
              {role == 3 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/admin">Panel</Anchor></li>
              </>) : ("")}
              {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/manga-form">New manga</Anchor></li>
              </>) : ("")}
              {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/mangas/:pages">Mangas</Anchor></li>}
              {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/mymangas">My Mangas</Anchor></li> </>) : ("")}
              {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="#">Favorites</Anchor></li>}
              {!token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/register">Register</Anchor></li>}
              {!token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/signin">Log In</Anchor></li>}
              {token && <li><a className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4 cursor-pointer" onClick={backHome}>Sign Out</a></li>}

            </ul>
            
          </div>
        )}
      </div>
      {url === 'chapter' ? (<p className='flex justify-center font-bold h-24 items-center text-white bg-pink-500/90 w-full absolute'>Chapter #{order} - {title}</p>) : ('')}
      <div className="absolute z-10 right-10 top-4">
        <img src={logo} className="w-[4rem] xsm:w-12" alt="Logo-Minga" />
      </div>
    </nav>
  )
}