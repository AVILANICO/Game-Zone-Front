import React from 'react'
import VITE_API from '../../api'
import { useRef } from 'react'
import axios from 'axios'
import { Link as Anchor, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { gapi } from 'gapi-script'
import { GoogleLogin } from 'react-google-login'
import { useEffect } from 'react'

const Register = (props) => {
  let name = useRef()
  let email = useRef()
  let password = useRef()
  let photo = useRef()
  let navigate = useNavigate();

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
    const { givenName, email, imageUrl, googleId } = response.profileObj;
    let data = {
      name: givenName,
      email: email,
      photo: imageUrl,
      password: googleId,
    }
    axios.post(VITE_API + "auth/register", data)
      .then(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'check your email to verify your account',
          confirmButtonText: 'Ok!'
        })
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
        })
      })

  }
  const onFailure = () => {
    console.log("something went wrong");
  }


  function handleForm(e) {
    e.preventDefault()

    const formData = new FormData();
    formData.append('name', name.current.value);
    formData.append('email', email.current.value);
    formData.append('photo', photo.current.files[0]);
    formData.append('password', password.current.value);

    axios.post(VITE_API + "auth/register", formData)
      .then(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          background: '#343434',
          color: '#FFFFFF',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Check your email to verify your account!',
        })

        navigate('/signin')
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
      <div className='xsm:w-full h-screen w-full flex justify-center items-center bg-center bg-cover bg-[url(/src/assets/image/imagen-gamer2.jpg)]'>
        <div className="xsm:w-full xsm:mt-40 flex justify-center w-full">
          <div className="min-h-screen flex justify-center items-center w-[50vw]">
            <div className='xsm:w-screen  xsm:items-center flex flex-col items-center w-full bg-[#343434]/80 rounded-3xl'>
              <form className='xxsm:w-[16rem]  w-4/5 flex flex-col items-center xxsm:mr-4 xsm:w-full' onSubmit={(e) => handleForm(e)} encType='multipart/form-data'>
                <div className='flex flex-col items-center w-full'>
                  <span className="text-6xl mt-4 font-semibold text-center gamer-title text-slate-300 shadow-lg shadow-yellow-200/50">GAME ZONE</span>
                </div>
                <div className="mt-6 w-full">
                  <fieldset className='flex text-center justify-center'>
                    <legend className='text-xl ml-2 text-slate-300 font-mono'>Full Name</legend>
                    <input ref={name} className="px-4 w-4/5 h-12 py-2 rounded-md text-sm outline-none bg-slate-600 text-white" type="text" name="Name" placeholder="Krowl Bell" />
                  </fieldset>
                </div>
                <div className="mt-6 w-full">
                  <fieldset className='flex text-center justify-center'>
                    <legend className='text-xl ml-2 text-slate-300 font-mono'>Email</legend>
                    <input ref={email} className="px-4 w-4/5 h-12 py-2 rounded-md text-sm outline-none bg-slate-600 text-white " type="email" name="Email" placeholder="DragonballZ@Krowl.com" />
                  </fieldset>
                </div>
                <div className="mt-4 w-4/5 flex">
                  <fieldset className='flex text-center w-full '>
                    <legend className='text-xl text-slate-300 font-mono'>Photo</legend>
                    <input ref={photo} className="px-4 w-full  py-2 rounded-md text-sm outline-none file:bg-cyan-800 file:border-none file:rounded-full file:h-12 file:text-white file:cursor-pointer file:shadow-lg file:hover:shadow-yellow-200/50 file:hover:bg-cyan-700 file:font-semibold text-white file:transition-all" type="file" name="photo" placeholder="Image" />
                  </fieldset>
                </div>
                <div className="mt-2 w-full">
                  <fieldset className='flex text-center justify-center'>
                    <legend className='text-xl ml-2 text-slate-300 font-mono'>Password</legend>
                    <input ref={password} className="px-4 w-4/5 h-12 py-2 rounded-md text-sm outline-none bg-slate-600 text-white" type="password" name="Password" placeholder="************" />
                  </fieldset>
                </div>
                <div className=" w-full flex justify-center">
                  <input className="mt-10 mb-3 w-4/5 bg-cyan-950 text-slate-300 py-2 rounded-xl font-mono font-bold text-xl h-12 cursor-pointer hover:bg-cyan-800 transition-all" type='submit' value="Create Account" />
                </div>
              </form>
              <div>
                <GoogleLogin
                  className="w-full google-login-button hover:scale-105 transition-all"
                  clientId={clientID}
                  buttonText="Sign up with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_policy"}
                />
              </div>
              <div className='flex flex-col items-center'>
                {props.setShow ? (
                  <span className="my-4 text-lg text-white font-mono"> Already have an account? <span className="cursor-pointer text-lg text-cyan-600 font-bold font-mono hover:text-teal-700 " onClick={() => props.setShow(true)}>Log in</span></span>
                ) : (
                  <Anchor to="/signin" className="my-4 text-white text-lg font-mono">Already have an account? <span className="cursor-pointer text-lg text-white font-bold font-mono hover:text-teal-700">Sign in</span></Anchor>
                )}
              </div>
            </div>
          </div>
        </div >
      </div>
    </>
  )
}

export default Register;
