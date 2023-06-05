import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import categories_action from '../store/actions/categories'
import manga_action from '../store/actions/manga'
import MyMangasCard from '../components/MyMangasCard'
import Mas9 from '../assets/image/Mas9.avif'
import { Link as Anchor } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const { categories_read } = categories_action;
const { manga_read } = manga_action;

export default function Mymangas() {

  const categories = useSelector(store => store.categories.categories)
  const mangas = useSelector(store => store.manga.manga)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authorName = mangas.find(each => each.author_id)?.author_id.name;
  const role = localStorage.getItem('role')



  //El estado local/inicial newCategories se utiliza para almacenar las categorías seleccionadas por el usuario.
  const [newCategories, setNewCategories] = useState([]);

  //En el efecto useEffect, se despachan las acciones categories_read y manga_read 
  //cuando el componente se monta por primera vez. Esto asegura que los datos de categorías
  //y mangas se carguen antes de renderizar el componente.
  useEffect(() => {
    dispatch(categories_read())
    dispatch(manga_read())
  }, [])

  //El método handleCategoryChange se encarga de agregar o quitar las categorías seleccionadas
  //del estado newCategories cuando se marca o desmarca una casilla de verificación.
  //Recibe un evento como argumento y extrae el valor y el estado de verificación del elemento seleccionado. 
  //Luego, actualiza el estado newCategories utilizando la función setNewCategories y 
  //el operador de propagación (...) para agregar o eliminar el valor seleccionado del array.
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

  // Por último, se agrega una función filterMangas que filtra los mangas basándose en 
  //las categorías seleccionadas.Los mangas filtrados se muestran en el componente MyMangasCard.
  const filterMangas = () => {
    let filteredMangas = mangas;
    if (newCategories.length > 0) {
      filteredMangas = filteredMangas.filter((manga) =>
        newCategories.includes(manga.category_id._id)
      );
    }
    return filteredMangas;
  };

  const resetFilters = (event) => {
    event.preventDefault();
    setNewCategories([]);
  };

  return (
    <>
      {role == 1 || role == 2 ? (

        <div className="w-full flex flex-col items-center">
          <div className="w-full h-[60vh] xsm:h-80 flex flex-col justify-center items-center bg-contain bg-top bg-[url(/src/assets/image/companyAuthor.png)]">
            <h1 className="text-[5rem] m-4 text-white font-bold mt-10">
              {authorName ? authorName.charAt(0).toUpperCase() + authorName.slice(1) : ''}
            </h1>
          </div>
          <div className="min-h-screen bg-white w-[90%] flex flex-col items-center rounded-3xl m-[-5rem] xsm:w-full">
            <div className="flex gap-4 p-6 w-full justify-center items-center">
              <form className="flex gap-2">
                <div className="flex flex-row xsm:gap-1 gap-6 w-[100%] h-[40%]">
                  <button onClick={resetFilters} className="mt-[-0.5rem]  hover:scale-125 transition-all flex flex-row items-center justify-center w-10 h-10 bg-[#999999] text-white p-[1rem] rounded-[26px] text-[12px] cursor-pointer" style={{ backgroundColor: newCategories.length === 0 ? 'green' : '' }}>
                    All
                    <input name="category_id" onChange={handleCategoryChange} style={{ appearance: 'none' }} type="checkbox" checked={newCategories.length === 0} />
                  </button>
                  {categories?.map((each) => (
                    <div key={each._id} className=' hover:scale-125 transition-all xsm:w-20' >
                      <label className="cursor-pointer" htmlFor={each._id} key={each._id} style={{
                        height: "2rem",
                        backgroundColor: each.hover,
                        color: each.color,
                        padding: '1rem',
                        borderRadius: '26px',
                        fontSize: "12px",
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
            <div className="pb-28 flex justify-center xsm:flex-col xsm:items-center xsm:w-full xsm:gap-6 flex-wrap md:w-full md:h-full lg:w-full gap-4">
              <div className='mr-16 flex justify-center items-end xsm:h-40 xsm:w-full md:h-48 md:w-40'>
                <Anchor to='/manga-form'>
                  <img className='xsm:h-28 rounded-3xl xsm:w-28 md:w-40 md:h-40 lg:h-fit lg:w-fit hover:scale-110 transition-all cursor-pointer' src={Mas9} alt="New Manga" title="New Manga" />
                </Anchor>
              </div>
              {filterMangas().length > 0 ? (
                filterMangas().map((each) => (
                  <MyMangasCard key={each._id} each={each} categories={categories} />
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
