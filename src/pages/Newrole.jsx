import React from 'react';
import { Link as Anchor } from 'react-router-dom'

export default function NewRole() {
    return (
        <div className="flex h-[92vh] w-full  text-black">
            <div className="bg-white w-full bg-[url(/src/assets/image/calidad5.webp)] bg-no-repeat bg-center  bg-cover flex items-center flex-col gap-4">
                <p className='font-montserrat mt-12 font-normal text-8xl text-white'>CHANGE ROLE TO</p>
                <Anchor to="/authorregister" className='w-[70%] flex justify-center'>
                    <label htmlFor="author" className="w-2/5 mt-16 cursor-pointer bg-[#2d5379] text-center border-2 border-gray-200 rounded-lg | md:flex md:justify-center | lg:justify-between lg:text-start hover:bg-[#1965b1b0] hover:border-blue-400 active:border-3 active:border-blue-400">
                        <div className="flex">
                            <img src="./src/assets/image/need.jpg" className="lg:inline-block w-40 h-20 self-center m-2" />
                            <div className="m-2 flex items-center">
                                <h1 className="font-bold text-white text-xl">Join as a Seller!</h1>
                            </div>
                        </div>
                    </label>
                </Anchor>
                <Anchor to="/company-form" className='w-[70%] flex justify-center mt-8'>
                    <label htmlFor="company" className="w-2/5 cursor-pointer text-center border-2 border-gray-200 rounded-lg | md:flex md:justify-center | lg:justify-between lg:text-start bg-[#2d5379] hover:bg-[#1965b1b0] hover:border-blue-400 active:border-3 active:border-blue-400">
                        <div className="flex">
                            <img src="./src/assets/image/need2.jpg" className="lg:inline-block w-40 h-20 self-center m-2" />
                            <div className="m-2 flex items-center">
                                <h1 className="font-bold text-white text-xl">Join as a Company!</h1>
                            </div>
                        </div>
                    </label>
                </Anchor>
            </div>
        </div>
    )
}