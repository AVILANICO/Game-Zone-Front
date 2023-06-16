import React, { useState } from 'react'
import { Link as Anchor, useNavigate } from 'react-router-dom'
import VITE_API from '../../api'
import { useRef } from 'react'
import axios from 'axios'
import Index from './Index'
import Swal from 'sweetalert2'
import App from '../App'

import { gapi } from 'gapi-script'
import GoogleLogin from 'react-google-login'
import { useEffect } from 'react'

const Signin = (props) => {
  let email = useRef();
  let password = useRef();

  const clientID = '86369650977-7ajhqtv8ig3puak0ijsprf63ff1mtub0.apps.googleusercontent.com'

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID
      })
    }

    gapi.load("client:auth2", start)
  }, [])

  const onSuccess = (response) => {
    // console.log(response)
    const { email, googleId, imageUrl } = response.profileObj;

    let data = {
      email: email,
      password: googleId
    }
    axios.post(VITE_API + "auth/signin", data)
      .then(res => {
        const token = res.data.token;
        const role = res.data.user.role;
        const email = res.data.user.email;
        const photo = res.data.user.photo;

        //sweetAlert
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully!',
        })


        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email)
        localStorage.setItem('photo', imageUrl)

        setRedirect(true);
        //investigar useNavigate para cambiar el useState()

      })
      .catch(err => {
        // console.log(err)
        // alert(err.response.data.message)

        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
        })
      })

  }
  const onFailure = () => {
    console.log("something went wrong");
  }

  const [redirect, setRedirect] = useState(localStorage.getItem('redirect') === 'true');
  let navigate = useNavigate()


  function handleForm(e) {
    e.preventDefault()
    //usando el .current.value vemos lo que tiene adentro del name
    let data = {
      email: email.current.value,
      password: password.current.value
    }
    axios.post(VITE_API + "auth/signin", data)
      .then(res => {
        const token = res.data?.token;
        const role = res.data?.user?.role;
        const email = res.data?.user?.email;
        const photo = res.data?.user?.photo;

        console.log(photo);

        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          background: '#343434',
          color: '#FFFFFF',
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully!',
        })


        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email)
        localStorage.setItem('photo', photo)
        localStorage.setItem('redirect', 'true')

        setRedirect(true);

        useEffect(() => {
          if (redirect) {
            localStorage.removeItem('redirect'); // Eliminar el estado de localStorage
          }
        }, [redirect]);

        useEffect(() => {
          if (redirect) {
            navigate('/'); // Redirigir al usuario a la página de inicio
          }
        }, [redirect, navigate]);

      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
        })
      })
  }


  return (
    <>
      {redirect ? (
        <>
          <Index />
          <div className='md:hidden'>
            <App />
          </div>
        </>
      ) : (
        <>
          <div className='flex h-[92vh]'>
            <div className='flex justify-center xsm:hidden xxsm:hidden w-1/2 items-center bg-cover bg-[url(/src/assets/image/gamezone1.jpg)]'></div >
            <div className="xsm:w-full xxsm:w-full xsm:flex flex justify-center items-center w-1/2">
              <div className="xsm:w-full h-[92vh] w-full flex justify-center items-center bg-black">
                <div className='xsm:w-[80%] xsm:h-[90%] xsm:items-center w-3/5 h-4/5 flex bg-[#343434]/80 flex-col justify-center rounded-xl'>
                  <form className='xsm:w-3/5 flex flex-col gap-8' onSubmit={(e) => handleForm(e)}>
                    <div className='flex flex-col items-center w-full'>
                      <h1 className='text-5xl xsm:text-4xl xxsm:text-5xl font-semibold text-center text-slate-300'>WELCOME</h1>
                    </div>
                    <div className="mt-2 w-full ">
                      <fieldset className='flex text-center justify-center '>
                        <input ref={email} className="border-b-4  px-4 w-4/5 h-12 py-2 rounded-md text-lg outline-none bg-slate-600 text-white" type="email" name="Email" placeholder="Email" />
                      </fieldset>
                    </div>
                    <div className="mt-2 w-full">
                      <fieldset className='flex text-center justify-center'>
                        <input ref={password} className="border-b-4 px-4 w-4/5 h-12 py-2 rounded-md text-lg outline-none bg-slate-600 text-white" type="password" name="Password" placeholder="Password" />
                      </fieldset>
                    </div>
                    <div className='flex justify-center'>
                      <input className="mt-2 mb-3 w-4/5 bg-cyan-950 text-slate-300 py-2 rounded-xl font-bold text-xl h-12 cursor-pointer hover:bg-cyan-800 transition-all" type='submit' value="Login" />
                    </div>
                  </form>
                  <div className='flex justify-center'>
                    <GoogleLogin className="flex space-x-2 justify-center items-end w-4/5 hover:scale-105 mt-4 border-2 border-gray-300 text-gray-600 py-2 rounded-xl transition duration-100"
                      clientId={clientID}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_policy"}
                    />
                  </div>
                  <div className='xsm:w-3/5 xsm:text-center flex flex-col items-center'>
                    {props.setShow ? (
                      <span className="mt-6 text-white text-lg">New User? <span className="cursor-pointer text-slate-400 font-bold text-lg hover:text-cyan-700" onClick={() => props.setShow(false)}>Sign up</span></span>
                    ) : (
                      <Anchor to="/register" className="mt-6 text-white text-lg">New User? <span className="cursor-pointer text-slate-400 font-bold text-lg hover:text-cyan-700">Sign Up</span></Anchor>
                    )}
                  </div>
                </div>
              </div>
            </div >
          </div>
        </>
      )}
    </>
  )
}

export default Signin