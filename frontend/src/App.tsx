import {useEffect, useState} from 'react';
import { useJwt } from 'react-jwt';
import {get} from 'idb-keyval';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Layouts
import Layout from './components/layouts/Layout'
import AdminLayout from "./components/layouts/AdminLayout";

// User pages imports
import Home from "./pages/Home";
import Promociones from "./pages/Promociones";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Pedido from "./pages/Pedido";

// AdminPage imports 
import Pedidos from "./pages/admin/Pedidos";
import Productos from "./pages/admin/Productos";
import Usuarios from "./pages/admin/Usuarios";
import PromocionesAdmin from "./pages/admin/Promociones";
import Ingredientes from "./pages/admin/Ingredientes";
import Categorias from "./pages/admin/Categorias";
import Imagenes from "./pages/admin/Imagenes";
import Tracker from "./pages/Tracker";
import CreateUser from './pages/CreateUser';

import usePromotionsStore from './stores/promotions/promotions-store';
import useGeneralStore from './stores/generalStore/useGeneralStore';
import { Promotion } from './__generated__/types';
import { UserType } from './stores/generalStore/types';
function App() {
  const [token, setToken] = useState<string>("");
  const {isExpired} = useJwt(token)
  const {setUser} = useGeneralStore();
  const {setMainPromotionHomePage} = usePromotionsStore()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: "menu",
          element: <Menu />,
        },
        {
          path: "promociones",
          element: <Promociones />,
        },
        {
          path: "pedido",
          element: <Pedido />,
        },
        {
          path: "tracker/:id",
          element: <Tracker />,
        },
      ],
    },
    {
      path: "/admin/*",
      element: <AdminLayout/>,
      children: [
        {
          index: true,
          path: "pedidos",
          element: <Pedidos/>
        },
        {
          path: "promociones",
          element: <PromocionesAdmin/>
        },
        {
          path: "productos",
          element: <Productos/>
        },
        {
          path: "ingredientes",
          element: <Ingredientes/>
        },
        {
          path: "usuarios",
          element: <Usuarios/>
        },
        {
          path: "imagenes",
          element: <Imagenes/>
        },
        {
          path: "categorias",
          element: <Categorias/>
        },
        
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/create",
      element: <CreateUser/>
    },
  ]);

  useEffect(()=>{
    get<Promotion>("mainPromotion")
      .then((result: Promotion) => {
        if(result){
          setMainPromotionHomePage(result)
        }
    })
    get<string>("sessionToken")
      .then((result: string) => {
        if(result){
          setToken(result)
        }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    if(!isExpired){
      get<UserType>("user")
        .then(user => {
          if(user){
            setUser(user)  
          }
        }
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isExpired, token])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
