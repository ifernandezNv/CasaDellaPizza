import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useSWR from "swr"

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import ProgressBar from '../components/Steps'
import { useGetOrderLazyQuery } from '../__generated__/types'
import useGeneralStore from '../stores/generalStore/useGeneralStore'
const Tracker = () => {
    const params = useParams()
    const {setBuyProgress} = useGeneralStore()
    const stepsProgress = useGeneralStore(store => store.stepsProgress)
    const [getOrder, {data: orderData, loading: loadingOrder}] = useGetOrderLazyQuery()

    useEffect(()=>{
        if(params.id){
            getOrder({
                variables: {
                    getOrderId: params.id
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])
    useEffect(()=>{
        if(orderData?.getOrder){
            const activeStep = stepsProgress.find(step => step.id === orderData?.getOrder?.statusOrder)
            if(activeStep){
                setBuyProgress(activeStep)
            }else{
                setBuyProgress(stepsProgress[1])
            }
            console.log(orderData?.getOrder)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[orderData])

  return (
    <div className='w-4/5 mx-auto flex flex-col items-center justify-center'>
        {!loadingOrder && orderData?.getOrder ? (
            <>
                <div className='w-full flex items-center justify-between mt-10'>
                    <div className='flex items-center gap-2'>
                        <ArrowBackIcon />
                        <Link className='text-mobile-lg lg:text-lg font-bold' to="/pedido">Ver mi Pedido</Link>
                    </div>
                    <Link className='text-mobile-lg lg:text-lg font-normal' to="/">Ir al Inicio</Link>
                </div>
                <div className='flex flex-col items-center gap-7'>
                <CheckCircleIcon 
                    sx={{
                        color: "#219653",
                        fontSize: "120px"
                    }}
                />
                <p className='font-extralight text-mobile-xl lg:text-xl'>Muchas gracias por confiar en nosotros y esperamos proporcionarte una gran experiencia.</p>
                </div>
                <main className='flex flex-col gap-8'>
                    <h1 className='font-bold text-mobile-3xl lg:text-3xl'>Pizza Tracker</h1>
                    <p className='text-mobile-xl lg:text-xl font-thin'>Monitorea el progreso en tiempo real de tu pedido utilizando el Pizza Tracker</p>
                    <ProgressBar 
                        step={orderData.getOrder.statusOrder}
                    />
                </main>
            </>
        ): (
            <div className='flex flex-col items-center gap-3 mt-5'>
                <img 
                    className='w-[20%] h-[20%]'
                    src="https://res.cloudinary.com/ds6v7rbvr/image/upload/v1699655089/Firefly_Animated_pizza_thats_lost_and_confused_in_a_road_166_xi502t.jpg" 
                    alt="Imagen pedido no existente" 
                />
                <h1 className='text-center text-6xl text-yellow-main font-bold'>Lo Sentimos</h1>
                <p className='text-xl'>No tenemos registrado este pedido</p>
                <p className='text-xl'>Puedes crear un pedido ingresando en el siguiente enlace.</p>
                <Link
                    className='bg-yellow-main hover:bg-yellow-dark transition-all py-2 px-4 rounded text-center font-bold text-xl' 
                    to="/menu">Crear un Pedido</Link>
            </div>

        )}
    </div>
  )
}

export default Tracker