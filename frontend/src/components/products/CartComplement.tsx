import { toast } from 'react-toastify'

import { Product } from '../../__generated__/types'
import MainButton from '../../reusable/MainButton'
import { formatAmount } from '../../utils'
import useCartStore from '../../stores/cart/cart-store'
type ComplementProps = {
    complement: Product
}
const CartComplement = ({complement}: ComplementProps) => {
    const {addProductToCart} = useCartStore()

    const addProduct = ()=>{
        addProductToCart({product: complement, quantity: 1})
        toast.success("Agregamos el producto a tu carrito")
    }
  return (
    <div className='w-full flex gap-1 items-center justify-evenly'>
        <img 
            src={complement.image ?? ''} 
            alt={`Imagen ${complement.name}`} 
            className='w-20 h-16 rounded'
        />
        <div className='flex flex-col gap-2'>
            <p className='text-mobile-lg'>{complement.name}</p>
            <p className='text-mobile-lg'>{complement.sizePiecesGrams} piezas</p>
            <p className='text-mobile-lg'>{formatAmount(complement.price)}</p>
        </div>
        <MainButton 
            content='Agregar'
            action={addProduct}
            classes='font-normal p-1 text-mobile-md w-fit'
        />
    </div>
  )
}

export default CartComplement