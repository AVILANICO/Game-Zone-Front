import { createBrowserRouter } from "react-router-dom";
import Main from '../App.jsx'
import Layout from '../layouts/Main.jsx'
import Register from "../pages/Register.jsx";
import Signin from "../pages/SignIn.jsx";
import Authform from "../pages/Authform.jsx";
import MangaForm from "../pages/MangaForm.jsx";
import ChapterForm from "../pages/ChapterForm.jsx";
import EditChapter from "../pages/EditChapter.jsx";
import Mangas from "../pages/Mangas.jsx";
import Pages from "../pages/Pages.jsx";
import Manga from "../pages/Manga.jsx";
import Adminpanel from "../pages/Adminpanel.jsx"
import Newrole from "../pages/Newrole.jsx"
import Companyform from "../pages/Companies-form.jsx"
import Authorform from "../pages/Author-form.jsx"
import Editmanga from "../pages/EditManga.jsx";
import Mymangas from "../pages/Mymangas.jsx";
import Video from "../components/video.jsx"

const routers = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/auth', element: <Authform /> },
      { path: '/register', element: <Register /> },
      { path: '/signin', element: <Signin /> },
      { path: '/mangas/:page', element: <Mangas /> },
      { path: '/manga-form', element: <MangaForm /> },
      { path: "/chapters-form/:id_manga", element: <ChapterForm /> },
      { path: '/manga/:id/:page', element: <Manga /> },
      { path: '/mymangas', element: <Mymangas /> },
      { path: '/editmanga', element: <Editmanga /> },
      { path: '/edit/:id_manga', element: <EditChapter /> },
      { path: "/chapters/:url/:id/:page", element: <Pages /> },
      { path: '/admin', element: <Adminpanel /> },
      { path: '/new-role', element: <Newrole /> },
      { path: '/company-form', element: <Companyform /> },
      { path: '/authorregister', element: <Authorform /> },
      { path: '/video', element: <Video/> },

    ]
  }
])

export default routers