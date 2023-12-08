import MainButton from '../../reusable/MainButton'
import { toast } from 'react-toastify'

import { Promotion } from '../../__generated__/types'
import useCartStore from '../../stores/cart/cart-store'
import { formatAmount } from '../../utils/index';

type PromotionType = {
    promotion: Promotion
}
const MainPromotionCard = ({promotion}: PromotionType) => {
    const {addPromotionToCart} = useCartStore();
    const addProduct = ()=>{
        addPromotionToCart({promotion, quantity: 1})
        toast.success("Agregamos el producto a tu carrito")
    }

  return (
    <div className='card-shadow w-full'>
        <div>
            <img 
                src={promotion.image as string}
                alt={`${promotion?.name}`}
                className='rounded-t-lg w-full h-full'
            />
        </div>
        <div className='flex flex-col px-3 pb-5'>
            <h3 className='text-mobile-xl md:text-xl font-semibold'>{promotion?.name}</h3>
            <p className='font-light mt-2 text-md line-clamp-4'>{promotion?.description}</p>
            <p className='text-md '>Por sólo: <span className='text-yellow-main font-bold'>{formatAmount(promotion?.price)}</span></p>
            <div className='w-full text-center'>
                <MainButton 
                    content='Comprar Ahora'
                    action={()=>{
                        addProduct()
                    }}
                    classes="font-medium text-lg mt-2"
                />
            </div>
        </div>
    </div>
  )
}

export default MainPromotionCard