import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import categories_action from '../store/actions/categories'
import game_action from '../store/actions/game'
import MyGamesCard from '../components/MyGamesCard'
import Mas7 from '../assets/image/Mas7.png'
import { Link as Anchor } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const { categories_read } = categories_action;
const { game_read } = game_action;

export default function Mygames() {

  const categories = useSelector(store => store.categories.categories)
  const games = useSelector(store => store.game.game)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authorName = games.find(each => each.author_id)?.author_id.name;
  const authorPhoto = games.find(each => each.author_id)?.author_id?.cover_photo
  const role = localStorage.getItem('role')

  const [newCategories, setNewCategories] = useState([]);

  useEffect(() => {
    dispatch(categories_read())
    dispatch(game_read())
  }, [])

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setNewCategories((element) => {
      if (checked) {
        return [...element, value];
      } else {
        return element.filter((category) => category !== value);
      }
    });
  };

  const filterGames = () => {
    let filteredGames = games;
    if (newCategories.length > 0) {
      filteredGames = filteredGames.filter((game) =>
        newCategories.includes(game.category_id._id)
      );
    }
    return filteredGames;
  };

  const resetFilters = (event) => {
    event.preventDefault();
    setNewCategories([]);
  };

  return (
    <>
      {role == 1 || role == 2 ? (

        <div className="w-full flex flex-col items-center bg-black">
          <div className="w-full h-[50vh] xsm:h-80 flex flex-col justify-center items-center" style={{ backgroundImage: `url(${authorPhoto})`, backgroundPosition: 'top', backgroundSize: 'cover' }}>
            <h1 style={{ textShadow: '8px 8px 8px rgb(0, 0, 0)' }} className="text-[5rem] m-4 text-white font-bold mt-10 rounded-2xl">
              {authorName ? authorName.charAt(0).toUpperCase() + authorName.slice(1) : ''}
            </h1>
          </div>
          <div className="min-h-screen bg-[#1D1D1D] w-[90%] flex flex-col items-center rounded-3xl xsm:w-full">
            <div className="flex gap-4 p-6 w-full justify-center items-center h-full">
              <form className="flex justify-center gap-2 h-full w-[50vw]">
                <div className="flex items-center justify-center xsm:gap-1 gap-6 w-full h-20 rounded-3xl">
                  <div className='xsm:h-16 xsm:w-full md:h-12 md:w-12'>
                    <Anchor to='/game-form'>
                      <img className='xsm:h-28 rounded-3xl xsm:w-28 md:w-40 md:h-40 lg:h-12 lg:w-12 hover:scale-110 transition-all cursor-pointer' src={Mas7} alt="New game" title="New game" />
                    </Anchor>
                  </div>
                  <button onClick={resetFilters} className="hover:scale-125 transition-all flex flex-row items-center justify-center w-10 h-10 bg-[#999999] text-white p-[1rem] rounded-full text-[12px] cursor-pointer" style={{ backgroundColor: newCategories.length === 0 ? 'green' : '' }}>
                    All
                    <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" checked={newCategories.length === 0} />
                  </button>
                  {categories?.map((each) => (
                    <div key={each._id} className=' hover:scale-110 transition-all xsm:w-20' >
                      <label className="cursor-pointer" htmlFor={each._id} key={each._id} style={{
                        height: "2rem",
                        backgroundColor: each.hover,
                        color: each.color,
                        padding: '1rem',
                        borderRadius: '26px',
                        fontSize: "18px",
                        textAlign: "center",
                        ...(newCategories.includes(each._id) ? { backgroundColor: each.color, color: "white" } : {})
                      }}>
                        {each.name.charAt(0).toUpperCase() + each.name.slice(1)}
                        <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" value={each._id} id={each._id} checked={newCategories.includes(each._id)} />
                      </label>
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div className="pb-28 flex justify-center xsm:flex-col xsm:items-center xsm:w-full xsm:gap-6 flex-wrap md:w-full md:h-full lg:w-full gap-8">
              {filterGames().length > 0 ? (
                filterGames().map((each) => (
                  <MyGamesCard key={each._id} each={each} categories={categories} />
                ))
              ) : (
                <div className="flex flex-row justify-center">
                  <h1 className="text-[2rem]">No matches found in the search</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        navigate('/')
      )}
    </>
  )
}
