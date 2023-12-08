import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { formatAmount } from '../../utils';
import { UpdatedPromotion } from '../../stores/cart/types';
import useCartStore from '../../stores/cart/cart-store';
import { InputMaybe } from '../../__generated__/types';
type ProductType = {
    promotion: InputMaybe<UpdatedPromotion>,
}
const MyPromotions = ({promotion}: ProductType) => {
    const {removePromotionFromCart, addPromotionQuantity, reducePromotionQuantity} = useCartStore()
    
    const removeProduct = ()=>{
        console.log("eliminando")
        removePromotionFromCart(promotion?.promotion.id as string)
        toast.success("Eliminamos el producto de tu carrito")
    }

    const addQuantity = ()=>{
        addPromotionQuantity(promotion as UpdatedPromotion)
    }
    const reduceQuantity = ()=>{
        reducePromotionQuantity(promotion as UpdatedPromotion)
    }
  return (
    <>
    { promotion && (
        <div className='card-shadow relative flex items-center'>
            <div className='flex gap-6'>
                <img 
                    src={promotion?.promotion?.image ?? ''} 
                    alt={`Image: ${promotion?.promotion?.name}`} 
                    className='w-60 h-44'
                />
                <div className='flex items-center gap-2 pr-5'>
                    <div>
                        <h2 className='font-semibold text-mobile-xl md:text-xl'>{promotion?.promotion?.name}</h2>
                        <p className='text-mobile-lg md:text-lg font-extraligh line-clamp-4'>{promotion?.promotion?.description}</p>
                    </div>
                    <div className='flex items-center gap-3 text-strong-gray'>
                        <p className='font-light text-mobile-xl md:text-xl text-black'>Cantidad:</p>
                        <RemoveCircleOutlineIcon 
                            sx={{
                                color: "",
                                cursor: "pointer"
                            }}
                            onClick={reduceQuantity}
                        />
                        <p className='font-light text-mobile-xl md:text-xl text-black'>{promotion?.quantity ?? 0}</p>
                        <AddCircleOutlineIcon 
                            sx={{
                                color: "",
                                cursor: "pointer"
                            }}
                            onClick={addQuantity}
                        />
                    </div>
                    <p className='font-bold text-mobile-2xl md:text-2xl text-yellow-main'>{formatAmount((promotion?.promotion?.price * promotion?.quantity))}</p>
                    <div 
                        className='absolute top-3 right-4 cursor-pointer text-strong-gray'
                        onClick={removeProduct}
                    >
                        <HighlightOffIcon 
                            sx={{
                                fontSize: 30
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default MyPromotions