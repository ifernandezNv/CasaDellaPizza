
import { useNavigate } from 'react-router-dom'
import MainButton from '../reusable/MainButton'
import MyProducts from '../components/products/MyProducts'
import MyPromotions from '../components/products/MyPromotions'
import MainProductCard from '../components/products/MainProductCard'
import PedidoSidebar from '../components/PedidoSidebar'
import AddressSidebar from '../components/AddressSidebar'
import CreditCard from '../components/CreditCard'

import useCartStore from '../stores/cart/cart-store'
import { Product, useGetComplementsQuery, UpdatedProduct, UpdatedPromotion, InputMaybe } from '../__generated__/types';


const Pedido = () => {
    const {data} = useGetComplementsQuery({
        variables: {
            categoryInput: "Complementos"
        }
    })
    
    const cart = useCartStore(store => store.cart)
    const paymentMethod = useCartStore(store => store.paymentMethod)
    const navigate = useNavigate()

    const getMoreProducts = ()=>{
        navigate("/menu")
    }
  return (
    <div className='w-4/5 mx-auto mt-12 flex gap-5'>
        <main className='w-full md:w-4/5'>
            <div className='w-full flex items-center justify-between'>
                <h1 className='font-bold text-mobile-3xl md:text-3xl mb-7'>Mi Pedido</h1>
                <MainButton 
                    content='Quiero Comprar Más Cosas'
                    action={getMoreProducts}
                    classes='font-semibold text-mobile-lg md:text-lg'
                />
            </div>
            <div className='flex flex-col gap-3 md:gap-8'>
                {cart?.promotion?.length === 0 && cart?.product?.length === 0 && (
                    <p>No tienes productos en tu carrito</p>
                )}
                {cart?.promotion?.length && cart?.promotion?.length > 0 && cart?.promotion?.map(promotion => (
                    <MyPromotions 
                        key={promotion?.promotion?.name}
                        promotion={promotion ?? {} as InputMaybe<UpdatedPromotion>}
                    />    
                ))}
                {cart?.product && cart?.product?.length > 0 && cart?.product?.map(product => (
                    <MyProducts 
                        key={product?.product?.id}
                        product={product ?? {} as InputMaybe<UpdatedProduct>}
                    /> 
                ))}
            </div>
            <section className='mt-11'>
                <h2 className='font-bold text-mobile-3xl md:text-3xl mb-7'>Agregar Complementos</h2>
                <div className='w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2 items-center md:gap-5'>
                    {data?.getComplements && data?.getComplements?.length ? data?.getComplements?.map(complement => (
                        <MainProductCard 
                            key={complement?.id}
                            product={complement as Product}
                        />
                    )): (
                        <p>No tenemos ningún complemento para tí</p>
                    )
                    }
                </div>
            </section>
        </main>
        <div className='hidden md:flex md:flex-col md:gap-3 md:w-1/5 '>
            <AddressSidebar />
            <PedidoSidebar/>
            {paymentMethod === "tcd-ahora" && (
                <CreditCard />
            )}
        </div>
    </div>
  )
}

export default Pedido