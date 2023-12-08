import { toast } from 'react-toastify';

import { Product } from '../../__generated__/types'
import MainButton from '../../reusable/MainButton'
import { formatAmount } from '../../utils/index';
import useCartStore from '../../stores/cart/cart-store';
import useGeneralStore from '../../stores/generalStore/useGeneralStore';
import useProductsStore from '../../stores/products/products-store';
type ProductType = {
    product: Product
}

const MainProductCard = ({product}: ProductType) => {
    const {addProductToCart} = useCartStore()
    const {switchPersonalizationEngineModal} = useGeneralStore()
    const {setProduct} = useProductsStore()
    const addProduct = ()=>{
        console.log("aldjnawodhawjbdaoiwbwaldhijw")
        addProductToCart({product: product, quantity: 1})
        toast.success("Agregamos el producto a tu carrito")
    }
  return (
    <div className='card-shadow w-full'>
        <div>
            <img 
                src={product.image}
                alt={`${product?.name}`}
                className='rounded-t-lg w-full h-40'
            />
        </div>
        <div className='flex flex-col px-3 pb-5'>
            <h3 className='text-mobile-xl md:text-xl font-semibold'>{product?.name}</h3>
            <p className='font-light mt-2 text-md line-clamp-4'>{product?.description}</p>
            <p className='text-md '>Por sólo: <span className='text-yellow-main font-bold'>{formatAmount(product.price)}</span></p>
            <div className='w-full text-center'>
                <MainButton 
                    content='Comprar Ahora'
                    action={()=>{
                        if(product.category !== "Pizzas"){
                            addProduct()
                        }else{
                            setProduct(product)
                            switchPersonalizationEngineModal()
                        }
                    }}
                    classes="font-medium text-lg mt-2"
                />
            </div>
        </div>
    </div>
  )
}

export default MainProductCard