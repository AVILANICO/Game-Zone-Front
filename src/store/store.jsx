import { configureStore } from "@reduxjs/toolkit";
import reducer_one_game from './reducers/one_game.js'
import inputs_reducer from './reducers/inputs_filter'
import companies from './reducers/companies'
import authors from './reducers/authors'
import categories_read from "./reducers/categories"
import game_read from "./reducers/game.js"
import cartReducer from './reducers/carts.js'
import priceReducer from './reducers/change_price.js'


const store = configureStore({
  reducer: {
    one_game: reducer_one_game,
    inputs: inputs_reducer,
    companies: companies,
    authors: authors,
    categories: categories_read,
    game: game_read,
    cart: cartReducer,
    price: priceReducer
  }
})
export default store;



