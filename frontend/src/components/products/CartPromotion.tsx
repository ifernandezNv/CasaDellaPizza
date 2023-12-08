
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';

import { formatAmount } from '../../utils/index';
import { UpdatedPromotion } from '../../stores/cart/types';
import useCartStore from '../../stores/cart/cart-store';
type CartPromotionType={
  promotion: UpdatedPromotion
}
const CartPromotion = ({promotion}: CartPromotionType) => {
  const {removePromotionFromCart} = useCartStore()
  
  const removeProduct = ()=>{
    removePromotionFromCart(promotion?.promotion?.id as string)
    toast.success("Eliminamos el producto de tu carrito")
  }
  return (
    <div className='relative w-full rounded border px-1 py-4 flex'>
      <div className='w-full mx-2 flex gap-1 items-center justify-between'>
        <p className='font-light text-md'>{promotion?.quantity} - {promotion?.promotion?.name} </p>
        <p className='font-bold text-md'>{formatAmount(promotion?.promotion?.price)}</p>
      </div>
      <div 
        className='absolute -top-3 right-0 text-2xl'
        onClick={removeProduct}
      >
        <HighlightOffIcon
          sx={{
            width: "16px",
            height: "16px",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  )
}

export default CartPromotion