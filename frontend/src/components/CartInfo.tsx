import { useNavigate } from 'react-router-dom';

import MainButton from '../reusable/MainButton'
import CartComplement from './products/CartComplement'
import CartProduct from './products/CartProduct';
import CartPromotion from './products/CartPromotion';
import { formatAmount } from '../utils/index';
import useCartStore from '../stores/cart/cart-store';
import { Product, useGetComplementsQuery } from '../__generated__/types';


const CartInfo = () => {
    const cart = useCartStore(store=>store.cart)
    const total = useCartStore(store=>store.total)
    const address = useCartStore(store=>store.address)
    const {data: complements} = useGetComplementsQuery({
        variables: {
            categoryInput: "Complementos",
        }
    })
    const navigate = useNavigate()
    
    const goToCartPage = ()=>{
        navigate("/pedido")
    }
  return (
    <div className='flex flex-col items-center justify-center card-shadow border py-5 px-3'>
        <div className='px-3'>
            <h4 className='font-normal text-mobile-xl md:text-xl text-center mb-5'>Hora de Entrega</h4>
            <div className='w-full flex md:flex-col flex-row gap-2 '>
                <select className='border text-mobile-md md:text-md rounded py-3 px-3' name="day" id="day">
                    <option value="today">Hoy</option>
                    <option value="oct-31">31 de Octubre</option>
                    <option value="nov-01">01 de Noviembre</option>
                </select>
                <select className='border text-mobile-md md:text-md rounded py-3 px-3' name="time" id="time">
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                </select>
            </div>
        </div>
        {
            address.street && (
                <div className='flex flex-col gap-2 my-2'>
                    <h4 className='text-md'>Dirección</h4>
                    <p className='text-md'>Calle: <span className='font-bold'>{address?.street}</span> #{address?.houseNumber}</p>
                    <p className='text-md'>Colonia: <span className='font-bold'>{address?.block}</span></p>
                </div>
            )
        }
        <div className='mt-5'>
            <h4 className='font-normal text-mobile-xl md:text-xl text-center mb-3'>Carrito</h4>
            <div className='w-full max-h-48 overflow-y-scroll flex flex-col gap-4'>
                {cart?.product?.length === 0 && cart?.promotion?.length === 0 && (
                    <div className='flex flex-col items-center jsutify-center gap-1 text-lg'>
                        <p>El carrito está vacío</p>
                    </div>
                )}
                {cart?.product?.length && cart?.product?.length > 0 && cart.product?.map(product => 
                    <CartProduct 
                        key={product?.product?.id ?? ''}
                        product={product}
                    />    
                )}
                {cart?.promotion?.length && cart?.promotion?.length > 0 && cart.promotion?.map(promotion => 
                    <CartPromotion 
                        key={promotion?.promotion?.id ?? ''}
                        promotion={promotion}
                    />    
                )}
            </div>
        </div>
        <div>
            <h4 className='font-normal text-mobile-xl md:text-xl text-center mt-5 mb-3'>Complementos</h4>
            <div className='flex flex-col gap-3'>
                {complements?.getComplements?.length  && complements?.getComplements?.length > 0 ? complements?.getComplements?.map(complement => (
                    <CartComplement
                        key={complement?.id}
                        complement={complement as Product}
                    />
                )) : (
                    <div className='flex flex-col items-center jsutify-center gap-1 text-lg'>
                        <p>No tenemos complementos registrados</p>
                    </div>
                )}
            </div>
        </div>
        <p className='text-mobile-xl md:text-xl mt-8'>Total: <span className='font-bold text-yellow-main'>{formatAmount(total)}</span></p>
        <MainButton 
            content="Pagar Ahora"
            action={goToCartPage}
            classes="font-bold text-mobile-xl md:text-xl mt-5"
        />
    </div>
  )
}

export default CartInfo