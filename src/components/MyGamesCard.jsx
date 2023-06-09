import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as Anchor } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Editgame from '../pages/EditGame'
import game_action from '../store/actions/game'

const { game_delete } = game_action

const MyGamesCard = ({ each, categories }) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const alertEdit = () => {
    setOpen(true);
  }

  function urlEdit() {
    navigate(`/edit/${each._id}`)
  }

  function urlDetail() {
    navigate(`/game/${each._id}/1`)
  }

  const alertDelete = (httpCb) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00BA88',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        httpCb()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        )
      }
      else {
        Swal.fire(
          'Cancelled',
          'Your game is safe :)',
          'error'
        )
      }
    })
  }
  return (
    <div key={each._id} className='shadow-xl xsm:h-56 xsm:w-full md:w-80 md:h-52 lg:h-96 lg:w-[24rem] mt-4 flex flex-col items-center bg-[#343434] text-white rounded-lg hover:scale-105 transition-all hover:shadow-yellow-200/50'>
      <img onClick={urlDetail} className="h-full w-full cursor-pointer xsm:h-full object-cover object-top" src={each?.cover_photo} />
      <div className='flex flex-col items-center md:h-40 p-5 w-full h-40 font-semibold'>
        <h1 onClick={urlDetail} className='md:text-xl xsm:text-xl xsm:w-full cursor-pointer text-center'> {each?.title} </h1>
        <h2 className='text-center bg-cyan-800 w-24 rounded-xl hover:scale-105 mt-2'>Price: ${each?.price}</h2>
        <div className='flex gap-4 justify-center'>
          <button onClick={() => alertEdit()} className="mt-4 w-20 bg-[#06832c] text-[#ffffff] hover:bg-[#00571d] hover:text-white cursor-pointer font-bold py-2 px-4 rounded-lg hover:scale-110 transition-all">
            Edit
          </button>
          <button onClick={() => alertDelete(() => dispatch(game_delete({ id: each?._id })))} className="mt-4 w-20 bg-[#e2504b] text-[#ffffff] hover:bg-[#991010] hover:text-white cursor-pointer font-bold py-2 px-4 rounded-lg hover:scale-110 transition-all">
            Delete
          </button>
        </div>
      </div>
      <Editgame games={each} categories={categories} open={open} setOpen={setOpen} />
    </div>
  )
}

export default MyGamesCard