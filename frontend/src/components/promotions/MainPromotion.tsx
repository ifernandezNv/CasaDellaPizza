import { toast } from 'react-toastify';

import { Promotion } from '../../__generated__/types'
import { formatAmount } from '../../utils/index';
import MainButton from '../../reusable/MainButton';
import useCartStore from '../../stores/cart/cart-store';

type PromotionType = {
    promotion: Promotion
}
const MainPromotion = ({promotion}: PromotionType) => {
    const {addPromotionToCart} = useCartStore()

    const addPromotionToCard = ()=>{
        addPromotionToCart({
            promotion,
            quantity: 1
        })
        toast.success("Promoción agregada al carrito")
    }
  return (
    <div className='promotion-shadow flex gap-5 '>
        <img 
            src={promotion.image ?? ''} 
            alt={`Image of ${promotion.name}`} 
            className='rounded-tl-xl rounded-bl-xl'
        />
        <div className='py-3'>
            <h3 className='font-bold text-mobile-3xl lg:text-3xl'>{promotion.name}</h3>
            <p className='font-light text-mobile-lg lg:text-lg'>{promotion.description}</p>
            <p className='font-bold text-mobile-6xl lg:text-6xl text-yellow-main'>{formatAmount(promotion.price ?? 0)}</p>
            <MainButton 
                content='Agregar al Carrito'
                classes='font-semibold text-mobile-md lg:text-md'
                action={()=>addPromotionToCard()}
            />
        </div>
    </div>
  )
}

export default MainPromotion