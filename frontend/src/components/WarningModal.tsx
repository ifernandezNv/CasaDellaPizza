import { useEffect } from 'react'

import { toast } from 'react-toastify'
import { Modal } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {ClockLoader} from "react-spinners"

import useGeneralStore from '../stores/generalStore/useGeneralStore'

const WarningModal = () => {
    const {switchModalDelete} = useGeneralStore()
    const modalDelete = useGeneralStore(store => store.modalDelete)
    const nameToDelete = useGeneralStore(store => store.nameToDelete)
    const response = useGeneralStore(store => store.response)
    const loadingDeleteResponse = useGeneralStore(store => store.loadingDeleteResponse)
    const refetchFunction = useGeneralStore(store => store.refetchFunction)
    const action = useGeneralStore(store => store.action)

    const callDeleteFunction = ()=>{
        action()
    }
    useEffect(()=>{
        if(!loadingDeleteResponse && response.status > 0 ){
            if(response.status !== 200){
                toast.warning(response.message)
            }else{
                refetchFunction()
                switchModalDelete()
                toast.success(response.message)
            }
        }
    },[loadingDeleteResponse])
  return (
    <Modal 
        open={modalDelete}
        onClose={switchModalDelete}
        sx={{
            position: "absolute"
        }}
    >  
        <div className='absolute top-[35%] right-[35%] bg-white rounded py-4 px-8 border-none flex flex-col items-center w-[35%]'>
            {loadingDeleteResponse && 
                <div className='w-full p-2 flex items-center justify-center'>
                    <ClockLoader 
                      loading={loadingDeleteResponse} 
                        color="#E4A400" 
                    />
                </div>
            }
            <WarningIcon 
                sx={{
                    color: "#FFB800",
                    fontSize: "90px"
                }}
            />
            <p className="text-mobile-lg lg:text-md">¿Estás seguro de eliminar este registro?</p>
            <p className="text-mobile-lg lg:text-md font-bold mt-3">{nameToDelete}</p>
            <p className="text-mobile-lg lg:text-md">Recuerda que al eliminar un registro, no se podrá recuperar</p>
            <div className='flex w-full items-center justify-between my-5'>
                <button 
                    className='p-2 rounded font-bold text-lg border text-center border-yellow-main'
                    onClick={switchModalDelete}
                >
                    No, cancelar
                </button>
                <button 
                    className='p-2 rounded font-bold text-lg text-white text-center bg-red bg-opacity-80'
                    onClick={callDeleteFunction}
                >
                    Si, eliminar
                </button>
            </div>
            <div 
                className='absolute top-2 right-1 cursor-pointer'
                onClick={switchModalDelete}
            >
                <HighlightOffIcon
                    sx={{
                        color: "#FFB800",
                        fontSize: "40px"
                    }}
                />
            </div>
        </div>
    </Modal>
  )
}

export default WarningModal