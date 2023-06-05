import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminSwitch from '../components/AdminSwitch.jsx';
import authors_action from '../store/actions/authors.js'
import companies_action from '../store/actions/companies.js'


const { get_authors, update_authors } = authors_action
const { get_companies, update_companies } = companies_action

export default function AdminPanel(){
    
    const [view, setView] = useState(false)
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

    return(
        <>
            <div className="w-full h-auto flex flex-col items-center">
                <div className="w-full h-[50vh] flex flex-col justify-center items-center bg-[url(/src/assets/image/panel.png)] bg-cover bg-top sm:h-[60vh]">
                    <h1 className="text-white text-3xl sm:text-4xl mb-8 sm:text-white font-bold">Panel</h1>
                </div>
                <div className="w-full h-auto sm:h-1/3 md:w-11/12 bg-gray-200 flex justify-center mb-16">
                    <div className="h-auto gap-y-4 rounded-[80px_80px_2px_27px/64px_64px_0px_1px;] m-[-6rem] sm:rounded-[20px_20px_0px_1px;] w-full sm:m-[-4rem] bg-white p-4 sm:p-8 pb-12 sm:pb-10 sm:flex sm:flex-wrap sm:justify-evenly">
                        <div className="flex flex-col justify-center items-center w-full pt-8">
                            <p className="text-3xl font-extrabold text-pink-400">Entities</p>
                            <div className="bg-pink-300 h-2 w-28 mr-4 mb-16"></div>
                            
                            <div className="lg:w-[65%] w-full h-auto bg-gray-100 border-2 border-gray-200 shadow-sm rounded-[10px_10px_5px_5px] mb-8">
                                <div className="w-full border-b-2 border-pink-400 rounded-[10px_10px_5px_5px]">
                                    <button className={`${view ? 'w-1/2 bg-gray-100 justify-center text-pink-400 font-bold cursor-pointer' : 'h-[6vh] w-1/2 bg-gradient-to-b from-[#F9A8D4] to-[#F472B6] rounded-[10px_0px_0px_0px] text-white font-bold cursor-pointer pointer-events-none' } `}>
                                    <label htmlFor="" className="flex flex-row justify-center w-full" onClick={handleClick}>
                                        Companies
                                        <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola"/>
                                        
                                    </label>
                                    </button>
                                    <button className={`${view ? 'h-[6vh] w-1/2 bg-gradient-to-b from-[#F9A8D4] to-[#F472B6] rounded-[0px_10px_0px_0px] text-white font-bold cursor-pointer pointer-events-none' : 'w-1/2 bg-gray-100 justify-center text-pink-400 font-bold cursor-pointer'} `}>
                                    <label htmlFor="" className="flex flex-row justify-center w-full" onClick={handleClick}>
                                        Authors
                                        <input type="checkbox" className="" style={{ appearance: 'none' }} value="hola" name="hola"/>
                                        
                                    </label>
                                    </button>
                                </div>
                                {view === false ?
                                    (
                                        <div className="flex flex-col h-auto w-full">
                                            {companies?.map((company) => (
                                                <div key={company.name} className="h-auto w-full flex flex-wrap justify-center items-center sm:flex sm:justify-between sm:items-center p-2 border-gray-200 border-b-2">
                                                    <div className="w-full flex flex-row justify-center">
                                                        <div className="w-full">
                                                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 w-full sm:flex-row sm:justify-between text-[#484964] font-medium">
                                                                <div className="col-span-2 flex justify-center items-center gap-x-1 ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="w-6 h-6 fill-pink-400">
                                                                        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                                                    </svg>
                                                                    <p>{company.name}</p>
                                                                </div>
                                                                <div className="col-span-2 justify-center items-center">
                                                                    <p className="w-full sm:w-auto sm:inline-block text-center">{company.website}</p>
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
                                                <div key={author.name} className="h-auto w-full flex flex-wrap justify-center items-center sm:flex sm:justify-between sm:items-center p-2 border-gray-200 border-b-2">
                                                    <div className="w-full flex flex-row justify-center">
                                                        <div className="w-full">
                                                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 w-full sm:flex-row sm:justify-between text-[#484964] font-medium">
                                                                <div className="col-span-2 flex justify-center items-centergap-x-1 sm:justify-start">
                                                                    <svg className="h-6 w-6 text-pink-400 fill-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                    ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
