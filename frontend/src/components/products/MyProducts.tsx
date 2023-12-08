import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { formatAmount } from '../../utils';
import { UpdatedProduct } from '../../stores/cart/types';
import useCartStore from '../../stores/cart/cart-store';
type ProductType = {
    product: UpdatedProduct,
}
const MyProducts = ({product}: ProductType) => {
    const {removeProductFromCart, addProductQuantity, reduceProductQuantity} = useCartStore()
    
    const removeProduct = ()=>{
        removeProductFromCart(product?.product?.id as string)
        toast.success("Eliminamos el producto de tu carrito")
    }

    const addQuantity = ()=>{
        addProductQuantity(product)
    }
    const reduceQuantity = ()=>{
        reduceProductQuantity(product)
    }
  return (
    <div className='card-shadow relative flex items-center'>
        <div className='flex gap-6'>
            <img 
                src={product.product.image ?? ''} 
                alt={`Image: ${product.product?.name}`} 
                className='w-60 h-44'
            />
            <div className='flex items-center gap-2 pr-5'>
                <div>
                    <h2 className='font-semibold text-mobile-xl md:text-xl'>{product.product?.name}</h2>
                    <p className='text-mobile-lg md:text-lg font-extraligh line-clamp-4'>{product.product?.description}</p>
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
                    <p className='font-light text-mobile-xl md:text-xl text-black'>{product.quantity ?? 0}</p>
                    <AddCircleOutlineIcon 
                        sx={{
                            color: "",
                            cursor: "pointer"
                        }}
                        onClick={addQuantity}
                    />
                </div>
                <p className='font-bold text-mobile-2xl md:text-2xl text-yellow-main'>{formatAmount(product.product?.price * product.quantity)}</p>
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
  )
}

export default MyProducts