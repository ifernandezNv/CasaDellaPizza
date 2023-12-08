

import CartInfo from '../components/CartInfo'
import { Promotion, useGetPromotionsQuery } from '../__generated__/types';
import usePromotionsStore from '../stores/promotions/promotions-store';
import MainPromotion from '../components/promotions/MainPromotion';
import MainPromotionCard from '../components/promotions/MainPromotionCard';

const Promociones = () => {
  const {data} = useGetPromotionsQuery()
  const mainPromotionHomePage = usePromotionsStore(store => store.mainPromotionHomePage)
  console.log(data?.getPromotions)
  return ( 
    <main className='w-4/5 mx-auto flex gap-4 mt-12'>
      <div className='w-4/5'>
        {mainPromotionHomePage.id ? (
          <MainPromotion 
            promotion={mainPromotionHomePage}
          />
        ): (
          <p>No tenemos una promoción destacada</p>
        )}
        <section className='w-full md:w-4/5 gap-5 my-12'>
          <h1 className='font-bold text-mobile-3xl md:text-3xl mb-7'>Promociones</h1>
          <div className='grid grid-cols-4 overflow-x-scroll pb-5'>
            {data?.getPromotions && data?.getPromotions.length > 0 ?  data.getPromotions.map(promotion => (
              <MainPromotionCard 
              key={promotion?.id}
              promotion={promotion as Promotion}
            />
            )) : (
              <h2>No tenemos promociones para mostrarte</h2>
            )}
          </div>
        </section>
      </div>
      
      <div className='hidden md:right-[5%] md:block md:w-[20%]'>
            <CartInfo/>
        </div>
    </main>
  )
}

export default Promociones