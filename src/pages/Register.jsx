import React from 'react'

import VITE_API from '../../api'
import { useRef } from 'react'
import axios from 'axios'
import { Link as Anchor, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { gapi } from 'gapi-script'
import GoogleLogin from 'react-google-login'
import { useEffect } from 'react'

const Register = (props) => {
  let name = useRef()
  let email = useRef()
  let photo = useRef()
  let password = useRef()
  let navigate = useNavigate();

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
    const { givenName, email, imageUrl, googleId } = response.profileObj;
    let data = {
      name: givenName,
      email: email,
      photo: imageUrl,
      password: googleId,
    }
    axios.post(VITE_API + "auth/register", data)
      .then(res => {
        Swal.fire({
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

    //El FormData es un objeto que se utiliza para construir y enviar datos en formato multipart/form-data
    //El formato multipart/form-data es un tipo de formato de codificación utilizado en la transferencia de datos. Se utiliza especialmente cuando se envían formularios que contienen archivos binarios, como imágenes o archivos multimedia.

    const formData = new FormData();
    formData.append('name', name.current.value);
    formData.append('email', email.current.value);
    formData.append('photo', photo.current.files[0]);
    formData.append('password', password.current.value);
    //Cada llamada al método append() agrega un par clave-valor al objeto formData, donde la clave es el nombre del campo y el valor es el valor del campo ingresado por el usuario.

    axios.post(VITE_API + "auth/register", formData)
      .then(res => {

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
          title: 'Account Created successfully!',
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
      <div className='xsm:w-full h-screen w-full flex justify-center items-center'>
        <div className="xsm:w-full xsm:mt-40 flex justify-center w-1/2">
          <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">

            <div className='xsm:w-screen xsm:items-center flex flex-col'>
              <form className='xxsm:w-[16rem] xxsm:mr-4 xsm:w-full' onSubmit={(e) => handleForm(e)} encType='multipart/form-data'>
                <div className='flex flex-col items-center'>
                  <span className="text-4xl text-center font-semibold text-gray-900">Welcome!</span>
                  <h1 className="text-sm text-center text-gray-600 mt-4">Discover game, manhua and manhwa, track your progress, have fun, read game.</h1>
                </div>
                <div className="mt-5">
                  <fieldset className='border-2 rounded-md flex'>
                    <legend className='text-sm ml-2 text-fuchsia-400 '>Name</legend>
                    <input ref={name} className="px-4 w-full  py-2 rounded-md text-sm outline-none" type="text" name="Name" placeholder="Krowl Bell" />
                    <img className='w-6 h-6  mr-2' src={profile} alt="profile" />
                  </fieldset>
                </div>
                <div className="mt-5">
                  <fieldset className='border-2 rounded-md flex items-center'>
                    <legend className='text-sm ml-2 text-fuchsia-400'>Email</legend>
                    <input ref={email} className="px-4 w-full  py-2 rounded-md text-sm outline-none" type="email" name="Email" placeholder="DragonballZ@Krowl.com" />
                    <img className='w-5 h-5 mr-2' src={arroba} alt="profile" />
                  </fieldset>
                </div>
                <div className="mt-5">
                  <fieldset className='border-2 rounded-md flex items-center'>
                    <legend className='text-sm ml-2 text-fuchsia-400'>Photo</legend>
                    <input ref={photo} className="px-4 w-full  py-2 rounded-md text-sm outline-none file:bg-fuchsia-400 file:border-none file:rounded-full file:h-12 file:text-white file:cursor-pointer file:shadow-lg file:hover:shadow-fuchsia-600/50 file:hover:bg-fuchsia-500 file:font-semibold" type="file" name="photo" placeholder="Image" />
                    <img className='w-6 h-6 mr-2' src={camara} alt="profile" />
                  </fieldset>
                </div>
                <div className="mt-5">
                  <fieldset className='border-2 rounded-md flex items-center'>
                    <legend className='text-sm ml-2 text-fuchsia-400'>Password</legend>
                    <input ref={password} className="px-4 w-full  py-2 rounded-md text-sm outline-none" type="password" name="Password" placeholder="************" />
                    <img className='w-6 h-6 mr-2' src={candado} alt="profile" />
                  </fieldset>
                </div>

                <div className="flex justify-between mt-2">
                  <div>
                    <input className="cursor-pointer m-1" type="checkbox" name="Notification" />
                    <span className="text-sm">Send notification to my email</span>
                  </div>
                </div>
                <div className="">
                  <input className="mt-4 mb-3 w-full bg-gradient-to-b from-[#F9A8D4] to-[#F472B6] text-white py-2 rounded-xl transition duration-100 shadow-cyan-600 font-bold text-md h-12 cursor-pointer" type='submit' value="Sign up" />
                </div>
              </form>
              <div>
                <GoogleLogin className="flex space-x-2 justify-center items-end w-[100%] border-2 border-gray-300 text-gray-600 py-2 rounded-xl transition duration-100"
                  clientId={clientID}
                  buttonText="Sign up with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_policy"}
                />
              </div>
              <div className='flex flex-col items-center'>
                {props.setShow ? (
                  <span className="mt-6 "> Already have an account? <span className="cursor-pointer text-sm text-fuchsia-400 font-bold" onClick={() => props.setShow(true)}>Log in</span></span>
                ) : (
                  <Anchor to="/signin" className="mt-6 ">Already have an account? <span className="cursor-pointer text-sm text-fuchsia-400 font-bold">Sign in</span></Anchor>
                )}
              </div>
              <div className='flex self-center'>
                <Anchor to="/" className="mt-2"> Go back to  <span className="cursor-pointer text-sm text-fuchsia-400 font-bold">Home page</span></Anchor>
              </div>
            </div>
          </div>
        </div >
        <div className='xsm:hidden w-1/2 p-4 flex justify-end h-screen bg-center bg-cover bg-[url(/src/assets/image/Rectangle81.png)]'>
        </div>
      </div>
    </>
  )
}

export default Register;
