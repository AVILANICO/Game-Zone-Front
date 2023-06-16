import VITE_API from "../../api";
import axios from "axios";
import { Link as Anchor, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux";
import cartActions from '../store/actions/carts'
import priceActions from '../store/actions/change_price'
import logo from '../assets/image/luis.png'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const { carts } = cartActions
const { changePrice } = priceActions

export default function Navbar() {

  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  let prueba = useSelector(store => store.cart.cart)
  console.log(prueba);
  let dispatch = useDispatch()
  const [carrito, setCarrito] = useState([]);
  let stockGames = useSelector(store => store.cart.cart)
  let stockArray = stockGames.map(product => product.stock);
  console.log(stockGames)
  console.log(stockArray);

  let resultArray = stockArray.map(cantidad => Array.from({ length: cantidad }, (_, index) => index + 1));
  console.log(resultArray);

  let arreglosInternos = [].concat(...resultArray);

  console.log(arreglosInternos);

  const [stockQuantities, setStockQuantities] = useState([]);

  useEffect(() => {
    const quantities = arreglosInternos;
    setStockQuantities(quantities);
  }, [stockGames]);

  // console.log(stockQuantities);


  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('TEST-9c80778e-f030-4735-bfc5-d79a31b041df');


  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }
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

  const [realQuantiti, setRealQuantiti] = useState(1)
  console.log(realQuantiti);

  async function handleQuantity(e) {
    e.target.disabled = true;
    setRealQuantiti(e.target.value)
    try {
      let quantity = e.target.value;
      let productId = e.target.id;
      let product = products.find((p) => p._id === productId);
      let totalPrice = quantity * product.price;
      console.log(totalPrice);

      let body = { cantidad: quantity, price: totalPrice };
      await axios.put(VITE_API + 'carrito/' + productId, body, headers);
      dispatch(changePrice());
    } catch (error) {
      console.log(error);
      e.target.disabled = false;
    }
  }

  const handleDeleteOne = async (e) => {
    try {
      await axios.delete(VITE_API + 'carrito/' + e.target.id, headers);

      dispatch(carts())
      dispatch(changePrice())

    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: error.response.data.message,
      })
    }
  }

  const hanldelOpenCarrito = async (e) => {
    setOpen(!open)
    dispatch(carts())
  }


  const createPreference = async () => {
    let data = {
      unit_price: totalPrice,
    }
    try {
      await axios.post(VITE_API + 'payment', data, headers)
        .then(response => setPreferenceId(response.data.preferenceId))

    } catch (error) {
      console.log(error);
    }
  }

  const products = prueba;


  const totalPrice = products.reduce((total, product) => total + (product.price * realQuantiti), 0);

  useEffect(
    () => {
      axios.get(VITE_API + 'carrito', headers)
        .then(res => setCarrito(res.data.games))
        .catch(err => console.log(err))
    }, []
  )

  return (
    <nav className="w-full h-[8vh] bg-[#343434] flex justify-between items-center ">
      <div>
        <button onClick={handleMenuClick} className="ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute left-16 top-1 h-12 flex items-center bg-none rounded-md py-5 z-10">
            <div className="flex justify-between">
              <ul onClick={handleMenuClick} className="flex gap-6 xsm:flex-col xsm:gap-0 xsm:relative top-20 left-1 xsm:bg-gray-700 rounded-md xsm:h-[13rem] xsm:items-center xsm:justify-evenly  xxsm:flex-col xxsm:gap-0 xxsm:relative xxsm:bg-gray-700 xxsm:h-[13rem] xxsm:items-center xxsm:justify-evenly">
                <li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl mb-4 xsm:mb-2 xsm:px-4 xxsm:mb-2 xxsm:px-4" to="/">Home</Anchor></li>
                {role == 0 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl  xsm:mb-2 xxsm:mb-2" to="/new-role">New Role</Anchor></li>
                </>) : ("")}
                {role == 3 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl xsm:mb-2 xxsm:mb-2" to="/admin">Panel</Anchor></li>
                </>) : ("")}
                {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl xsm:mb-2 xxsm:mb-2" to="/game-form">New game</Anchor></li>
                </>) : ("")}
                {role == 0 || role == 1 || role == 2 ? (<li><Anchor className="flex justify-center py-2 text-white hover:scale-105 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl xsm:mb-2 xxsm:mb-2" to="/games/:pages">Games</Anchor></li>) : ("")}
                {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center py-2 text-white hover:scale-105 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl xsm:mb-2 xxsm:mb-2" to="/mygames">My Games</Anchor></li> </>) : ("")}
                {!token && <li><Anchor className="flex justify-center py-2 text-white hover:scale-105 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl  mb-4 xsm:mb-2 xxsm:mb-2" to="/register">Register</Anchor></li>}
                {!token && <li><Anchor className="flex justify-center py-2 text-white hover:scale-105 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl  mb-4 xsm:mb-2 xxsm:mb-2" to="/signin">Log In</Anchor></li>}
                {token && <li><a className="flex justify-center py-2 text-white cursor-pointer hover:scale-110 transition-all shadow-xl hover:shadow-yellow-600/50 h-6 rounded-xl xsm:mb-2 xxsm:mb-2" onClick={backHome}>Sign Out</a></li>}
                {token &&
                  <div className="flex items-center gap-2">
                    <img className="w-8 h-8 object-cover rounded-full" src={photo} alt="imgUsuario" />
                    <p className="text-xl text-white">{email}</p>
                  </div>}
              </ul>
            </div>
          </div>
        )}
      </div>
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
                          <Dialog.Title className="text-lg font-medium text-white">
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
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.cover_photo}
                                      alt='foto'
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-white">
                                        <h3>
                                          <a href={product.href}>
                                            {product.title}
                                          </a>
                                        </h3>
                                        <p className="ml-4">$ {(product.price * realQuantiti).toFixed(1).toLocaleString('es-ES')}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        <select onChange={handleQuantity} id={product._id} className="py-1 px-2 border mr-6 focus:outline-none">
                                          {stockQuantities.map((quantity, index) => (
                                            <option key={index} value={quantity}>{quantity}</option>
                                          ))}
                                        </select>
                                      </p>
                                      <div className="flex">
                                        <button
                                          onClick={handleDeleteOne}
                                          id={product._id}
                                          type="button"
                                          className="font-medium text-white hover:text-[#044674]"
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
                      {/* <div className="mt-6 ">
                              <button
                              className="flex items-center justify-center rounded-md border border-transparent bg-[#044674] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
                              >
                              Delete All
                              </button>
                          </div> */}
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-white">
                          <p>Subtotal</p>
                          $ {totalPrice.toFixed(1)}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at pay.
                        </p>
                        <div className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-[#044674] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500">
                          <button
                            onClick={createPreference}
                          >
                            Process to pay
                          </button>
                        </div>
                        {preferenceId && <Wallet initialization={{ preferenceId }} />}
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
      <div className="flex">
        <svg onClick={hanldelOpenCarrito} xmlns="http:www.w3.org/2000/svg" width="36" height="auto" fill="white" className="bi bi-cart4 cursor-pointer hover:scale-95 mt-4" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
        <img className="h-20 w-20 mr-4 xsm:h-auto xsm:mr-0" src={logo} alt="Your Company " />
      </div>
    </nav>
  )
}