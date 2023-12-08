import { Link } from 'react-router-dom'

import { Product, useGetPizzasQuery } from '../__generated__/types'
import MainPromotionHome from '../components/promotions/MainPromotionHome'
import MainProductCard from '../components/products/MainProductCard'
import usePromotionsStore from '../stores/promotions/promotions-store'
const Home = () => {
  const mainPromotionHomePage = usePromotionsStore(store => store.mainPromotionHomePage)
  const {data} = useGetPizzasQuery({
    variables: {
      limit: 5 as never
    }
  })

  return (
    <>  
        <div className='lg:ml-32'>
            <MainPromotionHome 
              promotion={mainPromotionHomePage}
            />
        </div>
        <div className='hidden md:flex md:flex-row card-shadow mb-11'>
            <div className='bg-yellow-main w-full md:w-1/4 py-10 lg:py-20 flex items-center justify-center font-bold text-mobile-2xl lg:text-2xl'>
              <Link to="/menu">Novedades</Link>
            </div>
            <div className='bg-white w-full md:w-1/4 py-10 lg:py-20 flex items-center justify-center font-bold text-mobile-2xl lg:text-2xl'>
              <Link to="/promociones">Promociones para Mi</Link>
            </div>
            <div className='bg-yellow-main w-full md:w-1/4 py-10 lg:py-20 flex items-center justify-center font-bold text-mobile-2xl lg:text-2xl'>
              <Link to="/menu">Proximas Promociones</Link>
            </div>
            <div className='bg-white w-full md:w-1/4 py-10 lg:py-20 flex items-center justify-center font-bold text-mobile-2xl lg:text-2xl'>
              <Link to="/menu">Mis Productos Favoritos</Link>
            </div>
        </div>
        <main className='container mx-auto'>
          <div className='flex items-center gap-5 lg:gap-10'>
            <h2 className='font-bold text-mobile-3xl lg:text-3xl'>¿Tienes hambre? Prueba nuestra deliciosa pizza estilo italiana </h2>
            <Link to="/menu" className='text-blue font-extraligh text-mobile-md lg:text-md'>Ver todo el menú</Link>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center pb-10 pt-5'>
            {data?.getPizzas?.map(product => (
              <MainProductCard
                key={product?.id}
                product={product ?? {} as Product}
              />
            ))}
          </div>
        </main>
    </>
  )
}

export default Home