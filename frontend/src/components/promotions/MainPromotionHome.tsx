
import { Promotion } from '../../__generated__/types'
import MainButton from '../../reusable/MainButton'
import { formatAmount } from '../../utils/index';

type MainPromotionType = {
  promotion: Promotion
}
const MainPromotionHome = ({promotion}: MainPromotionType) => {
  return (
    <div className='flex gap-3'>
      <div className='w-4/5 flex flex-col pl-5 pt-2 lg:pl-0 lg:w-1/2 my-3'>
        <h2 className='text-mobile-2xl lg:text-2xl font-extralight'>{promotion?.name}</h2>
        <p className='text-mobile-6xl lg:text-6xl text-yellow-main font-bold'>{promotion?.importantDetail ?? formatAmount(promotion?.price)}</p>
        <p className='text-mobile-3xl lg:text-3xl font-bold'>{promotion?.description}</p>
        <MainButton
          content='Ver Promoción'
          action={()=>{console.log("dando click al botón reutilizable")}}
          classes="mt-5 text-mobile-2xl lg:text-2xl"
        />
      </div>
      <img
        src={promotion?.image ?? ''}
        alt={promotion?.name}
        className=''
      />
    </div>
  )
}

export default MainPromotionHome