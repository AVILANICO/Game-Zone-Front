import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routers from './router/router.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>,
)
//el enrutador tiene que ser hijo del almacenamiento de estados globlales
//para que cada interfaz del enrutador pueda acceder a los estados globales de redux

