import { configureStore } from "@reduxjs/toolkit";
import reducer_one_manga from './reducers/one_manga.js'
import reducer_one_chapter from './reducers/one_chapter.js'
import inputs_reducer from './reducers/inputs_filter'
import companies from './reducers/companies'
import authors from './reducers/authors'
import categories_read from "./reducers/categories"
import manga_read from "./reducers/manga.js"
import read_chapters from './reducers/chapters'
import chapters_reducer from './reducers/chapter_bar.js'

const store = configureStore({
  reducer: {
    one_manga: reducer_one_manga,
    one_chapter: reducer_one_chapter,
    inputs: inputs_reducer,
    title_order: chapters_reducer,
    companies: companies,
    authors: authors,
    categories: categories_read,
    manga: manga_read,
    chapters: read_chapters
  }
})
export default store;



