import { createBrowserRouter } from "react-router-dom";
import Main from '../App.jsx'
import Layout from '../layouts/Main.jsx'
import Register from "../pages/Register.jsx";
import Signin from "../pages/SignIn.jsx";
import Authform from "../pages/Authform.jsx";
import GameForm from "../pages/GameForm.jsx"; //cambiar
import Games from "../pages/Games.jsx"; //cambiar
import Game from "../pages/Game.jsx";
import Adminpanel from "../pages/Adminpanel.jsx"
import Newrole from "../pages/Newrole.jsx"
import Companyform from "../pages/Companies-form.jsx"
import Authorform from "../pages/Author-form.jsx"
import Editgame from "../pages/EditGame.jsx";
import Mygames from "../pages/Mygames.jsx";

const routers = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/auth', element: <Authform /> },
      { path: '/register', element: <Register /> },
      { path: '/signin', element: <Signin /> },
      { path: '/games/:page', element: <Games /> },
      { path: '/game-form', element: <GameForm /> },
      { path: '/game/:id/:page', element: <Game /> },
      { path: '/mygames', element: <Mygames /> },
      { path: '/editgame', element: <Editgame /> },
      { path: '/admin', element: <Adminpanel /> },
      { path: '/new-role', element: <Newrole /> },
      { path: '/company-form', element: <Companyform /> },
      { path: '/authorregister', element: <Authorform /> },
    ]
  }
])

export default routers