import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminSwitch from '../components/AdminSwitch.jsx';
import authors_action from '../store/actions/authors.js'
import companies_action from '../store/actions/companies.js'
import joy from '../assets/image/joy.png'
import { Link as Anchor } from 'react-router-dom';


const { get_authors, update_authors } = authors_action
const { get_companies, update_companies } = companies_action

export default function AdminPanel() {

    const [view, setView] = useState(false)
    const [boton, setBoton] = useState(false)
    const dispatch = useDispatch()

    let store = useSelector(store => store);
    /* //console.log(store)
    let getAuthors = store.authors.getAuthors
    //console.log(getAuthors)
    let getCompanies = store.companies.getCompanies
    //console.log(getCompanies) */

    let activeAuthors = store.authors.active
    let inactiveAuthors = store.authors.inactive
    let authors = (inactiveAuthors ?? []).concat(activeAuthors ?? [])

    let activeCompanies = store.companies.active
    let inactiveCompanies = store.companies.inactive
    let companies = (inactiveCompanies ?? []).concat(activeCompanies ?? [])

    useEffect(() => {
        dispatch(get_authors())
        dispatch(get_companies())
    }, [])


    function handleClick() {
        setView(!view)

        console.log(view)
    }
    function handleOptions() {
        setBoton(!boton)
    }

    return (
        <>
            <div className="w-[100%]  bg-[#EAEAEA] ">
                <div className='flex h-12 ' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }} >
                    <p className='text-3xl font-mono rounded  flex items-center px-2 '>ADMIN PANEL</p>
                </div>
                <div className='flex mt-9 xsm:flex-col xxsm:flex-col'>
                    <div className='h-[3rem] w-[10%] bg-white rounded-xl xsm:flex xsm:justify-center xsm:w-full xsm:mb-2   xxsm:flex xxsm:justify-center xxsm:w-full xxsm:mb-2'>
                        <div className={`rounded-t border border-black  ${boton ? ' bg-gray-100  font-bold cursor-pointer' : 'bg-[#636363] text-white font-bold cursor-pointer pointer-events-none'} `}>
                            <label htmlFor="" className="w-[100%]  flex" onClick={handleOptions}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-5 fill-black">
                                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                </svg>
                                View Users
                                <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola" />

                            </label>
                        </div>
                        <div className={` border  border-black ${boton ? ' bg-[#636363] text-white font-bold cursor-pointer pointer-events-none' : ' bg-gray-100 justify-center text-black font-bold cursor-pointer'} `}>
                            <Anchor to={'/games/:pages'} htmlFor="" className="flex" onClick={handleOptions}>
                                <img className='h-5 w-5 mr-1' src={joy} />
                                View Games
                                <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola" />

                            </Anchor>
                        </div>
                        <div className={`rounded-b border  border-black ${boton ? ' bg-[#636363] text-white font-bold cursor-pointer pointer-events-none' : ' bg-gray-100 justify-center text-black font-bold cursor-pointer'} `}>
                            <Anchor to={'/game-form'} htmlFor="" className="flex" onClick={handleOptions}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                New game
                                <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola" />

                            </Anchor>
                        </div>

                    </div>
                    {boton === false ?
                        (
                            <div className="flex flex-col  items-center  w-screen">



                                <div className=" w-[90%] h-auto  bg-gray-100 border-2  border-gray-200 shadow-sm rounded-[5px_5px_5px_5px] mb-8">
                                    <div className="w-full border-b-2  rounded-[10px_10px_5px_5px]">
                                        <button className={`${view ? 'w-1/2 bg-white justify-center text-black font-bold cursor-pointer' : ' w-1/2 bg-[#636363] rounded-[10px_0px_0px_0px] text-white font-bold cursor-pointer pointer-events-none'} `}>
                                            <label htmlFor="" className="flex flex-row justify-center w-full " onClick={handleClick}>
                                                Companies
                                                <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola" />

                                            </label>
                                        </button>
                                        <button className={`${view ? 'h-[vh] w-1/2 bg-[#636363] rounded-[0px_10px_0px_0px] text-white font-bold cursor-pointer pointer-events-none' : 'w-1/2 bg-gray-100 justify-center text-black font-bold cursor-pointer'} `}>
                                            <label htmlFor="" className="flex flex-row justify-center w-full" onClick={handleClick}>
                                                Sellers
                                                <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola" />

                                            </label>
                                        </button>
                                    </div>
                                    {view === false ?
                                        (
                                            <div className="flex flex-col h-auto w-full">
                                                {companies?.map((company) => (

                                                    <div key={company.name} className="h-auto w-full flex flex-wrap justify-center items-center sm:flex sm:justify-between sm:items-center p-2 border-gray-200 border-b-2 bg-[#636363]">
                                                        <div className="w-full flex flex-row justify-center">
                                                            <div className="w-full">
                                                                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 w-full sm:flex-row sm:justify-between text-white font-medium">
                                                                    <div className="col-span-2 flex  items-center gap-x-1 ">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-6 fill-black">
                                                                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                                                        </svg>
                                                                        <p>{company.name}</p>
                                                                    </div>
                                                                    <div className="col-span-2 justify-center items-center">
                                                                        <p className="w-[90%] text-center xsm:text-sm xxsm:text-sm">{company.website}</p>
                                                                    </div>
                                                                    <div className="col-span-2 flex justify-center items-center gap-x-1 sm:gap-x-4">
                                                                        <img className="w-6 h-6 rounded-full mr-2 sm:mr-0" src={company.logo} alt="" />
                                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                                            <AdminSwitch company={company} url={"http://localhost:8000/auth/role/company/"} params={company._id} action={update_companies} />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="flex flex-col h-auto w-full">
                                                {authors?.map((author) => (
                                                    <div key={author.name} className="h-auto w-full flex flex-wrap justify-center items-center sm:flex sm:justify-between sm:items-center p-2 bg-[#636363] border-gray-200 border-b-2">
                                                        <div className="w-full flex flex-row justify-center">
                                                            <div className="w-full">
                                                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 w-full sm:flex-row sm:justify-between text-white font-medium">
                                                                    <div className="col-span-2 flex justify-center items-centergap-x-1 sm:justify-start">
                                                                        <svg className="h-6 w-6 text-black fill-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        <p>{author.name}</p>
                                                                    </div>
                                                                    <div className="col-span-2 flex justify-center items-center">
                                                                        <p>{author.createdAt}</p>
                                                                    </div>
                                                                    <div className="col-span-2 flex justify-center items-center">
                                                                        <p>{author.city}</p>
                                                                    </div>
                                                                    <div className="col-span-2 flex justify-center items-center gap-x-1 sm:gap-x-4">
                                                                        <img className="w-6 h-6 rounded-full mr-2 sm:mr-0" src={author.photo} alt="" />
                                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                                            <AdminSwitch author={author} url={"http://localhost:8000/auth/role/author/"} params={author._id} action={update_authors} />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        )}
                                </div>
                            </div>
                        ) : <></>}

                </div>













            </div>
        </>
    )
}
