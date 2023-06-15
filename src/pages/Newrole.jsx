import React from 'react';
import { Link as Anchor } from 'react-router-dom'

export default function NewRole() {
    return (
        <div className="flex h-[92vh] w-full  text-black">
            <div className="bg-white w-full bg-[url(/src/assets/image/need30.webp)] bg-no-repeat bg-center  bg-cover flex items-center flex-col gap-4">
                <p className='font-montserrat mt-12 font-normal text-8xl text-white'>CHANGE ROLE TO</p>
                <Anchor to="/authorregister" className='w-[70%] flex justify-center'>
                    <label htmlFor="author" className="w-3/5 cursor-pointer text-center border-2 border-gray-200 rounded-lg | md:flex md:justify-center | lg:justify-between lg:text-start hover:bg-blue-600 hover:border-blue-400 active:border-3 active:border-blue-400">
                        <div className="flex">
                            <img src="./src/assets/image/need.jpg" className="lg:inline-block w-20 h-9 self-center m-2" />
                            <div className="m-2">
                                <h1 className="font-bold text-white">Join as an Author!</h1>
                                <p className="text-sm text-white">I'm a reader writting a game</p>
                            </div>
                        </div>
                    </label>
                </Anchor>
                <Anchor to="/company-form" className='w-[70%] flex justify-center'>
                    <label htmlFor="company" className="w-3/5 cursor-pointer text-center border-2 border-gray-200 rounded-lg | md:flex md:justify-center | lg:justify-between lg:text-start hover:bg-blue-600 hover:border-blue-400 active:border-3 active:border-blue-400">
                        <div className="flex">
                            <img src="./src/assets/image/need2.jpg" className="lg:inline-block w-20 h-9 self-center m-2" />
                            <div className="m-2">
                                <h1 className="font-bold text-white">Join as an Company!</h1>
                                <p className="text-sm text-white">I'm a company and i want to publish my comics</p>
                            </div>
                        </div>
                    </label>
                </Anchor>
            </div>
        </div>
    )
}