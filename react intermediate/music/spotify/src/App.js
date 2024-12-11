import React from 'react';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import LeftNavbar from './components/LeftNavbar';
import RightNavbar from './components/RightNavbar';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import ArtistPlayList from './components/ArtistPlayList';
import { useSelector } from 'react-redux';
import Search from './components/Search';


const App = () => {
  const globalState = useSelector((state)=>state.login.isLogin);
  const router = createBrowserRouter([
    {
      path:"/",
      element:(globalState ? <><LeftNavbar /> <Dashboard /> <RightNavbar /> </>: <Navigate to="/login" />)
    },
    {
      path:"/login",
      element: (globalState ? <Navigate to="/" /> : <Login />)
    },
    {
      path:"/artist",
      element:(globalState ? <><LeftNavbar /> <ArtistPlayList /> <RightNavbar /> </>: <Navigate to="/login" />)
    },
    {
      path: "/search",
      element:(globalState ? <><LeftNavbar /> <Search /> <RightNavbar /> </>: <Navigate to="/login" />)
    }
  ])

  const scssClass = "parent_box " + (globalState ? "three_column":"");
  return (
    <React.Fragment>
      <section className={scssClass}>
        <RouterProvider router={router} />
      </section>
    </React.Fragment>
  )
}

export default App