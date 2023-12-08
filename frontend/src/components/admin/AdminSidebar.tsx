
import { Link, useLocation } from 'react-router-dom'
import logo from "/logo.png"

const AdminSidebar = () => {
    const location = useLocation();

  return (
    <aside className='min-h-screen py-24 px-12 shadow w-1/5'>
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center gap-1'>
                <img 
                    src={logo}
                    alt="Logo" 
                    className='h-20 w-20'
                />
                <Link to="/" className='text-mobile-3xl md:text-3xl font-bold'>
                    Casa Della Pizza
                </Link>
            </div>
            <nav className='mt-16'>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/pedidos" className="text-mobile-xl md:text-xl font-medium">Pedidos</Link>
                    <div className={`${location.pathname.includes("pedidos") ? "bg-yellow-main" : "bg-white"} p-1 rounded-3xl`}></div>
                </div>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/promociones" className="text-mobile-xl md:text-xl font-medium">Promociones</Link>
                    <div className={`${location.pathname.includes("promociones") ? "bg-yellow-main" : "bg-white"} p-1 rounded-3xl`}></div>
                </div>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/productos" className="text-mobile-xl md:text-xl font-medium">Productos</Link>
                    <div className={`${location.pathname.includes("productos") ? "bg-yellow-main" : "bg-white"} p-1 rounded-3xl`}></div>
                </div>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/ingredientes" className="text-mobile-xl md:text-xl font-medium">Ingredientes</Link>
                    <div className={`${location.pathname.includes("ingredientes") ? "bg-yellow-main" : "bg-white"} px-1 py-2 rounded-3xl`}></div>
                </div>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/usuarios" className="text-mobile-xl md:text-xl font-medium">Usuarios</Link>
                    <div className={`${location.pathname.includes("usuarios") ? "bg-yellow-main" : "bg-white"} px-1 py-2 rounded-3xl`}></div>
                </div>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/imagenes" className="text-mobile-xl md:text-xl font-medium">Imágenes</Link>
                    <div className={`${location.pathname.includes("imagenes") ? "bg-yellow-main" : "bg-white"} px-1 py-2 rounded-3xl`}></div>
                </div>
                <div className='flex flex-col pb-2'>
                    <Link to="/admin/categorias" className="text-mobile-xl md:text-xl font-medium">Categorias</Link>
                    <div className={`${location.pathname.includes("categorias") ? "bg-yellow-main" : "bg-white"} px-1 py-2 rounded-3xl`}></div>
                </div>
            </nav>
        </div>
    </aside>
  )
}

export default AdminSidebar