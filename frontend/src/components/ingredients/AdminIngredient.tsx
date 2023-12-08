import {useEffect} from "react"

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'

import { Ingredient, useDeleteIngredientMutation, useGetIngredientsQuery } from '../../__generated__/types'
import { formatAmount } from '../../utils/index'
import useGeneralStore from '../../stores/generalStore/useGeneralStore'
import { StatusResponse } from "../../__generated__/types"

type IngredientType = {
    ingredient: Ingredient
}
const AdminIngredient = ({ingredient}: IngredientType) => {
    const {refetch} = useGetIngredientsQuery()
    const [deleteIngredient, {data, loading}] = useDeleteIngredientMutation()
    const {switchModalDelete, setNameToDelete, setAction, setLoadingDeleteResponse, setResponse, setRefetchFunction} = useGeneralStore()

    const handleDeleteIngredient = ()=>{
        switchModalDelete()
        setNameToDelete(ingredient?.name ?? '')
        setAction(() => deleteIngredient({
            variables: {
                deleteIngredientId: ingredient?.id as string
            }
        }))
        setRefetchFunction(()=>refetch())
        
    }

    useEffect(()=>{
        setLoadingDeleteResponse(loading)
        if(!loading){
            if(data?.deleteIngredient.status){
                setResponse(data?.deleteIngredient as StatusResponse)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading])
  return (
    <div className='flex items-center gap-3 card-shadow justify-between'>
        <div className="flex gap-3">
            <img 
                src={ingredient?.image ?? ''} 
                alt={`Image ${ingredient?.name}`} 
                className='rounded-tl rounded-bl w-44 h-full'
            />
            <div className='py-3 flex flex-col gap-2'>
                <h3 className='font-bold tet-mobile-lg lg:text-lg'>{ingredient?.name}</h3>
                <p className='text-mobile-lg lg:text-md'>Precio por porción: <span className='text-yellow-main font-bold'>{formatAmount(Number(ingredient?.pricePerPortion))}</span></p>
                <div className='flex items-center gap-2'>
                    <p className='text-mobile-lg lg:text-md'>Disponible: </p>
                    {ingredient?.avaliable ? (
                        <CheckCircleIcon 
                            sx={{
                                color: "#219653",
                                fontSize: "30px"
                            }}
                        />
                    ) : (
                        <CancelIcon 
                            sx={{
                                color: "#FF0505",
                                fontSize: "24px"
                            }}
                        />
                    )}
                </div>
                <p className='text-mobile-lg lg:text-md'>Capa que ocupa dentro del motor de personalización: <span className='capitalize font-bold text-yellow-main'>{ingredient?.zIndex}</span></p>
            </div>
        </div>
        <div className='flex flex-col gap-2 px-5 py-5'>
            <button 
                type="button" 
                onClick={handleDeleteIngredient}
                className='flex gap-2 bg-red px-2 py-1 font-bold bg-opacity-80 text-mobile-lg lg:text-md rounded text-white'
            >
                <DeleteIcon/>
                Eliminar
            </button>
            <button type="button" className='flex gap-2 bg-yellow-main px-2 py-1 font-bold text-mobile-lg lg:text-md rounded'>
                <BorderColorIcon/>
                Editar
            </button>
        </div>
    </div>
  )
}

export default AdminIngredient