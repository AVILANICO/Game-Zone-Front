import React from 'react'
import { useState } from 'react'
import Register from './Register'
import SignIn from './SignIn'

export default function Authform() {

  const [show, setShow] = useState(true);
  return (
    <>
      {show ? <SignIn setShow={setShow} /> : <Register setShow={setShow} />}

    </>

  )
}
