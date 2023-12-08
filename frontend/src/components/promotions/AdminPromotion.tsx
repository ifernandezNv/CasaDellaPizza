import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import {set, del} from "idb-keyval"

import { Promotion, useGetPromotionLazyQuery } from '../../__generated__/types'
import { formatAmount } from '../../utils'
import usePromotionsStore from '../../stores/promotions/promotions-store';

type PromotionType = {
    promotion: Promotion
}
const AdminPromotion = ({promotion}: PromotionType) => {
    const mainPromotionHomePage = usePromotionsStore(store => store.mainPromotionHomePage)
    const [getPromotion, {data, loading}] = useGetPromotionLazyQuery()
    const {setMainPromotionHomePage, setPromotion, switchModalPromotion} = usePromotionsStore()
    const handleMainPromotion = ()=>{
        setMainPromotionHomePage(promotion)
        toast.success("Actualizamos con éxito la promoción principal")
        set<Promotion>("mainPromotion", promotion)
    }

    const deleteAsMainPromotion = ()=>{
        setMainPromotionHomePage({} as Promotion)
        del("mainPromotion")
        toast.success("Listo, recuerda que ya no hay una promoción definida como principal.")
    }

    const showEditForm = ()=>{
        getPromotion({
            variables: {
                getPromotionId: promotion.id
            }
        })
        if(!loading && data?.getPromotion?.id){
            setPromotion(data?.getPromotion as Promotion)
            switchModalPromotion()
        }
    }
  return (
    <div className='card-shadow flex items-center gap-3'>
        <div className='flex items-center gap-4'>
            <img 
                src={promotion.image as string} 
                alt={`Image of ${promotion.name}`} 
                className='rounded-tl-lg rounded-lr-lg w-64 h-52'
            />
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-mobile-lg lg:text-lg'>{promotion.name}</h3>
                <p>{promotion.description}</p>
                <p className='text-lg font-bold'>Precio: <span className='text-yellow-main'>{formatAmount(promotion.price)}</span></p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-2 pr-5'>
            <button 
                type="button"
                className='w-fit flex items-center p-2 rounded text-center text-md font-bold bg-yellow-main'
                onClick={showEditForm}
            >
                <EditIcon />
                Editar
            </button>
            <button 
                type="button"
                className='w-fit flex items-center p-2 rounded text-center text-md font-bold bg-red text-white '
                onClick={()=>{}}
            >
                <DeleteIcon />
                Eliminar
            </button>
            {mainPromotionHomePage.id !== promotion.id ? (
                <button 
                    type="button"
                    className='w-fit flex items-center rounded text-center text-md font-bold bg-gray shadow-md'
                    onClick={handleMainPromotion}
                >
                    Marcar como promoción principal
                </button>
            ) : (
                <button 
                    type="button"
                    className='w-fit flex items-center rounded text-center text-md font-bold bg-strong-gray text-white'
                    onClick={deleteAsMainPromotion}
                >
                    Eliminar como promoción principal
                </button>
            )}
        </div>
    </div>
  )
}

export default AdminPromotion