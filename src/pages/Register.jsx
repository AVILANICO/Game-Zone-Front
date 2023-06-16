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
      <div className='flex bg-black'>
        <div className="xsm:w-full xxsm:w-full  flex justify-center w-1/2 h-[auto] xsm:h-screen xxsm:h-screen">
          <div className="flex justify-center  items-center w-[30vw] xsm:w-[100%] xsm:h-screen xxsm:w-[100%] xxsm:h-screen">
            <div className='xsm:w-[80%] xxsm:w-[80%] h-auto xsm:items-center  xxsm:items-center flex flex-col xsm:h-[90%] xxsm:h-[70%] items-center w-full bg-[#343434]/90 rounded-2xl xsm:rounded xxsm:rounded'>
              <form className='w-[100%] flex flex-col items-center xsm:mr-4 xsm:w-full  xxsm:mr-4 xxsm:w-full gap-4' onSubmit={(e) => handleForm(e)} encType='multipart/form-data'>
                <div className='flex flex-col items-center w-[100%]'>
                  <span className="text-6xl mt-4 w-full font-semibold text-center font-mono text-slate-300">GAME ZONE</span>
                </div>
                <div className="mt-2 w-full">
                  <fieldset className='flex text-center justify-center'>
                    <input ref={email} className="border-b-4 px-4 w-4/5 h-12 py-2 text-xl rounded-md  outline-none bg-slate-600 text-white " type="email" name="Email" placeholder="Email" />
                  </fieldset>
                </div>
                <div className="mt-2 w-4/5 flex">
                  <fieldset className='flex w-full '>
                    <input ref={photo} className="w-full py-2 rounded-md outline-none file:bg-cyan-800 file:border-none file:rounded-full file:h-12 file:text-white file:cursor-pointer file:shadow-lg file:hover:shadow-yellow-200/50 file:hover:bg-cyan-700 file:font-semibold text-white file:transition-all" type="file" name="photo" placeholder="Image" />
                  </fieldset>
                </div>
                <div className="mt-2 w-full">
                  <fieldset className='flex text-center justify-center'>
                    <input ref={password} className="border-b-4 px-4 w-4/5 h-12 py-2 text-xl rounded-md outline-none bg-slate-600 text-white" type="password" name="Password" placeholder="Password" />
                  </fieldset>
                </div>
                <div className=" w-full flex justify-center mt-4">
                  <input className="w-4/5 bg-cyan-950 text-slate-300 shadow-lg hover:shadow-yellow-200/50 py-2 rounded-xl font-bold text-xl h-12 cursor-pointer hover:bg-cyan-800 transition-all" type='submit' value="Create Account" />
                </div>
              </form>
              <div className='flex justify-center w-full mt-8'>
                <GoogleLogin
                  className="flex space-x-2 justify-center items-end hover:scale-105 border-2 border-gray-300 text-gray-600 py-2 rounded-xl transition duration-100 w-4/5"
                  clientId={clientID}
                  buttonText="Sign up with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_policy"}
                />
              </div>
              <div className='flex flex-col items-center'>
                {props.setShow ? (
                  <span className="my-4 text-lg text-white"> Already have an account? <span className="cursor-pointer text-lg text-cyan-600 font-bold hover:text-teal-700 " onClick={() => props.setShow(true)}>Log in</span></span>
                ) : (
                  <Anchor to="/signin" className="mt-4 xsm:my-2 xsm:text-base xxsm:my-2 xxsm:text-base md:text-base text-white text-lg">Already have an account? <span className="cursor-pointer text-lg text-white font-bold hover:text-teal-700">Sign in</span></Anchor>
                )}
              </div>
            </div>
          </div>
        </div >
        <div className='xsm:hidden xxsm:hidden h-[92vh] w-1/2 flex justify-center items-center bg-center bg-cover bg-[url(/src/assets/image/imagen-gamer2.jpg)]'></div>
      </div>
    </>
  )
}

export default Register;
