import { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react';
import React from 'react'
import game_action from '../store/actions/game'
import Swal from 'sweetalert2';

const { game_update } = game_action

export default function Editgame({ open, setOpen, games, categories }) {

  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch()

  const [titleValue, setTitleValue] = useState(games.title);
  const [descriptionValue, setDescriptionValue] = useState(games.description);
  const [coverPhotoValue, setCoverPhotoValue] = useState(games.cover_photo);
  const [categoryIdValue, setCategoryIdValue] = useState(games.category_id);
  const [priceValue, setPriceValue] = useState(games.price);
  const [stockValue, setStockValue] = useState(games.stock);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value)
  }

  const handleCoverPhotoChange = (event) => {
    setCoverPhotoValue(event.target.value)
  }

  const handleCategoryIdChange = (event) => {
    setCategoryIdValue(event.target.value)
  }

  const handlePriceChange = (event) => {
    setPriceValue(event.target.value)
  }

  const handleStockChange = (event) => {
    setStockValue(event.target.value)
  }

  const category = () => {
    return categories?.map(categoria => (
      <option key={categoria?._id} value={categoria?._id}>
        {categoria?.name}
      </option>
    ))
  }

  const editGame = (id) => {
    const data = {
      title: titleValue,
      description: descriptionValue,
      cover_photo: coverPhotoValue,
      category_id: categoryIdValue,
      price: priceValue,
      stock: stockValue
    }
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
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Toast.fire('Saved!', '', 'success')
        dispatch(game_update({ id, data }))
      } else if (result.isDenied) {
        Toast.fire('Changes are not saved', '', 'info')
      }
    })
    setOpen(false)
  }



  const cancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}>
          <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <div className="inline-block align-bottom bg-white text-left rounded-3xl overflow-hidden shadow-xl transform transition-all mb-32 max-w-lg w-full">
                <div className='flex justify-center bg-[#343434] py-8 '>
                  <div className='flex flex-col'>
                    <h1 className='text-4xl w-72 text-center text-white font-mono'>EDIT GAME</h1>

                    <form className='flex flex-col mt-12 w-40 gap-6' action="">

                      <label className='w-40' htmlFor="">
                        <input onChange={handleTitleChange} className='font-mono w-72 h-8 border-t rounded-md border-4 border-yellow-600' type="text" name="name" id="name" placeholder='Title of the game' />
                      </label>
                      <label htmlFor="">
                        <input onChange={handleDescriptionChange} className='font-mono w-72 h-8 border-t rounded-md border-4 border-yellow-600' type="text" name="name" id="name" placeholder='Description' />
                      </label>
                      <label htmlFor="">
                        <input onChange={handleCoverPhotoChange} className='font-mono w-72 h-8 border-t rounded-md border-4 border-yellow-600' type="text" name="name" id="name" placeholder='Photo URL...' />
                      </label>
                      <label htmlFor="">
                        <input onChange={handlePriceChange} className='font-mono w-72 h-8 border-t rounded-md border-4 border-yellow-600' type="text" name="name" id="name" placeholder='Price' />
                      </label>
                      <label htmlFor="">
                        <input onChange={handleStockChange} className='font-mono w-72 h-8 border-t rounded-md border-4 border-yellow-600' type="text" name="name" id="name" placeholder='Stock' />
                      </label>
                      <label htmlFor="">
                        <select onChange={handleCategoryIdChange} defaultValue={categoryIdValue} className='font-mono w-72 h-8 border-t rounded-md border-4 border-yellow-600' name="category" id="category"  >
                          <option>Category</option>
                          {category()}
                        </select>
                      </label>

                    </form>
                    <div className='flex flex-col items-center mt-12 gap-4'>
                      <button onClick={(e) => { e.preventDefault(); editGame(games._id) }} type='button' className="w-60 h-16 bg-[#098f5e] rounded-lg cursor-pointer text-white text-2xl font-bold hover:bg-green-500 hover:scale-110 transition-all">
                        Edit
                      </button>
                      <button onClick={(e) => { e.preventDefault(); cancel() }} type='button' className="w-60 h-16 bg-[#eb120b] rounded-lg cursor-pointer text-red-200 text-2xl font-bold hover:bg-red-400 hover:text-white hover:scale-110 transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}