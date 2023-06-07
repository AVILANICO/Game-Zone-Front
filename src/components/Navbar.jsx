import logo from "../assets/image/logo-minga.png"
import { useParams } from "react-router-dom";
import VITE_API from "../../api";
import axios from "axios";
import { useState } from 'react';
import { Link as Anchor, useNavigate } from "react-router-dom";

export default function Navbar() {

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()

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
              {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/game-form">New game</Anchor></li>
              </>) : ("")}
              {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/games/:pages">Games</Anchor></li>}
              {role == 1 || role == 2 ? (<><li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/mygames">My Games</Anchor></li> </>) : ("")}
              {token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="#">Favorites</Anchor></li>}
              {!token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/register">Register</Anchor></li>}
              {!token && <li><Anchor className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4" to="/signin">Log In</Anchor></li>}
              {token && <li><a className="flex justify-center px-4 py-2 text-black hover:bg-white hover:text-btn2 hover:rounded-md m-4 cursor-pointer" onClick={backHome}>Sign Out</a></li>}
            </ul>
          </div>
        )}
      </div>
      <div className="absolute z-10 right-10 top-4">
        <img src={logo} className="w-[4rem] xsm:w-12" alt="Logo-Minga" />
      </div>
    </nav>
  )
}