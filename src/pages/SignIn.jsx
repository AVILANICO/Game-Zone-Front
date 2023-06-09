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

  const clientID = '892361509691-n4pmsomkc10vrk2ghsggosstqg5v8pph.apps.googleusercontent.com'

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
    const { email, googleId } = response.profileObj;

    let data = {
      email: email,
      password: googleId,
    }
    axios.post(VITE_API + "auth/signin", data)
      .then(res => {
        const token = res.data.token;
        const role = res.data.user.role;
        const email = res.data.user.email;
        const photo = res.data.user.photo;
        // const name = res.data.user.name;


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
        localStorage.setItem('photo', photo)
        // localStorage.setItem('name', name)

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

          <div className='h-screen w-full flex justify-center items-center'>
            <div className='xsm:hidden w-1/2 p-4 flex justify-end h-full bg-center bg-cover bg-[url(/src/assets/image/Rectangle82.png)]'></div >
            <div className="xsm:w-full xsm:flex flex justify-center w-1/2">
              <div className="xsm:w-full bg-white min-h-screen w-1/2 flex justify-center items-center">

                <div className='xsm:w-full xsm:items-center flex flex-col'>
                  <form className='xsm:w-3/5' onSubmit={(e) => handleForm(e)}>
                    <div className='flex flex-col items-center'>
                      <p className="text-4xl text-center font-semibold text-gray-900">Welcome <span className='text-fuchsia-400'>back</span>!</p>
                      <h1 className="text-sm text-center text-gray-600 mt-4">Discover game, manhua and manhwa, track your progress, have fun, read game.</h1>
                    </div>
                    <div className="mt-5">
                      <fieldset className='border-2 rounded-md flex items-center'>
                        <legend className='text-sm ml-2 text-fuchsia-400'>Email</legend>
                        <input ref={email} className="px-4 w-full  py-2 rounded-md text-sm outline-none" type="email" name="Email" placeholder="DragonballZ@Krowl.com" />
                        <img className='w-4 h-4 mr-2' src={arroba} alt="profile" />
                      </fieldset>
                    </div>
                    <div className="mt-5">
                      <fieldset className='border-2 rounded-md flex items-center'>
                        <legend className='text-sm ml-2 text-fuchsia-400'>Password</legend>
                        <input ref={password} className="px-4 w-full  py-2 rounded-md text-sm outline-none" type="password" name="Password" placeholder="************" />
                        <img className='w-4 h-4 mr-2' src={candado} alt="profile" />
                      </fieldset>
                    </div>
                    <div>
                      <input className="mt-4 mb-3 w-full bg-gradient-to-b from-[#F9A8D4] to-[#F472B6] text-white py-2 rounded-xl transition duration-100 shadow-cyan-600 font-bold text-md h-12 cursor-pointer" type='submit' value="Sign in" />
                    </div>
                  </form>
                  <div>
                    <GoogleLogin className="flex space-x-2 justify-center items-end w-[100%] border-2 border-gray-300 text-gray-600 py-2 rounded-xl transition duration-100"
                      clientId={clientID}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_policy"}
                    />
                  </div>
                  <div className='xsm:w-3/5 xsm:text-center flex flex-col items-center'>
                    {props.setShow ? (
                      <span className="mt-6 ">You don't have an account yet? <span className="cursor-pointer text-sm text-fuchsia-400 font-bold" onClick={() => props.setShow(false)}>Sign up</span></span>
                    ) : (
                      <Anchor to="/register" className="mt-6 ">You don't have an account yet? <span className="cursor-pointer text-sm text-fuchsia-400 font-bold">Sign up</span></Anchor>
                    )}
                    <Anchor to="/" className="mt-2"> Go back to  <span className="cursor-pointer text-sm text-fuchsia-400 font-bold">Home page</span></Anchor>
                  </div>
                </div>
              </div>
            </div >
          </div >
        </>
      )}
    </>
  )
}

export default Signin