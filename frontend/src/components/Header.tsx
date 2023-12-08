import { Link, useLocation, useNavigate } from 'react-router-dom'
import {del} from 'idb-keyval';
import { toast } from 'react-toastify';

import useGeneralStore from '../stores/generalStore/useGeneralStore'

const Header = () => {
    const {setUser} = useGeneralStore()
    const user = useGeneralStore(store => store.user)

    const location = useLocation()
    const navigate = useNavigate()

    const logOut = ()=>{
        del("sessionToken")
        del("user")
        setUser({
            email: "",
            name: "",
            userType: "user",
        })
        toast.success("Cerramos tu sesión correctamente")
        navigate("/")
    }

  return (
    <header className='background-navbar p-5'>
        <div className="w-4/5 mx-auto">
            <div className='flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <Link to="/" className='flex gap-2 items-center'>
                        <img src="/logo.png" alt="Logo" />
                        <h1 className='text-mobile-3xl md:text-3xl font-medium'>Casa Della Pizza</h1>
                    </Link>
                </div>
                <nav className='flex gap-4 items-center'>
                    <div className='flex flex-col pt-2'>
                        <Link to="/menu" className="text-mobile-2xl lg:text-2xl font-medium">Menú</Link>
                        <div className={`${location.pathname.includes("menu") ? "bg-yellow-main" : "bg-white"}  px-1 py-2 rounded-3xl`}></div>
                    </div>
                    <div className='flex flex-col pt-2'>
                        <Link to="/promociones" className="text-mobile-2xl lg:text-2xl font-medium">Promociones</Link>
                        <div className={`${location.pathname.includes("promociones") ? "bg-yellow-main" : "bg-white"}  px-1 py-2 rounded-3xl`}></div>
                    </div>
                    <div className='flex flex-col pt-2'>
                        <Link to="/pedido" className="text-mobile-2xl lg:text-2xl font-medium">Mi Pedido</Link>
                        <div className={`${location.pathname.includes("pedido") ? "bg-yellow-main" : "bg-white"}  px-1 py-2 rounded-3xl`}></div>
                    </div>
                    <div className='flex flex-col pt-2'>
                        {user.email ? (
                            <div className='flex gap-2'>
                                <Link to={user.userType === "admin" ? "/admin" : "/perfil"} className="text-mobile-2xl lg:text-2xl font-medium">Hola: {user.name ? user.name : "Usuario"}</Link>
                                <button onClick={logOut} className="text-mobile-2xl lg:text-2xl font-medium" type="button">Cerrar Sesión</button>
                            </div>
                        ): (
                            <Link to="/login" className="text-mobile-2xl lg:text-2xl font-medium">Iniciar Sesión</Link>
                        )}
                        
                        <div className={`${location.pathname.includes("login") ? "bg-yellow-main" : "bg-white"}  px-1 py-2 rounded-3xl`}></div> 
                        
                    </div>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header