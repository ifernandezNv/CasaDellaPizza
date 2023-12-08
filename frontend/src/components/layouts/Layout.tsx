import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'

import Header from '../Header'
import VoiceAssistant from "../assistant/VoiceAssistant";
import PersonalizationEngine from '../PersonalizationEngine';
import useCartStore from '../../stores/cart/cart-store';
import { UpdatedProduct } from '../../stores/cart/types';
import { UpdatedPromotion } from '../../__generated__/types';
const Layout = () => {
  const {setTotal} = useCartStore()
  const cart = useCartStore(store => store.cart);
  const total = useCartStore(store => store.total);
  useEffect(()=>{
    if(cart.promotion?.length){
      const calculatedPromoTotal = cart?.promotion?.reduce((total: number, product: UpdatedPromotion) => total + (Number(product?.promotion?.price) * Number(product.quantity)), 0)
      setTotal(total + calculatedPromoTotal)
    }
    if(cart.product?.length && cart.product?.length > 0){
      const calculatedProductsTotal = cart.product?.reduce((total: number, product: UpdatedProduct) =>  total + (Number(product?.product?.price) * Number(product?.quantity ?? 0)), 0)
      setTotal(total + calculatedProductsTotal)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cart])
  return (
    <>
        <Header />
        <Outlet />
        <div className="fixed bottom-5 right-10">
          <VoiceAssistant />
        </div>
        <PersonalizationEngine/>
    </>
  )
}

export default Layout