import { useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'

import MainButton from '../../reusable/MainButton'
import { Order, useUpdateOrderStatusMutation, OrderStatusEnum, useGetOrdersQuery } from '../../__generated__/types'
import { formatAmount, formatDate } from '../../utils/index'
import useCartStore from '../../stores/cart/cart-store'
import { PaymentsText } from '../../stores/cart/types'
import useGeneralStore from '../../stores/generalStore/useGeneralStore'
type OrderType = {
    order: Order
}

const OrderCard = ({order}: OrderType) => {
    const {refetch} = useGetOrdersQuery()
    const stepsProgress = useGeneralStore(store => store.stepsProgress)
    const [updateOrderStatus, {data, loading}] = useUpdateOrderStatusMutation()
    const deliveryDate = useCartStore(store => store.deliveryDate)
    const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false)
    const [stepTitle, setStepTitle] = useState<string>("")
    const address = useCartStore(store => store.address)
    const paymentMethod = useCartStore(store => store.paymentMethod)

    const setActiveStep = ()=>{
        const activeStepValue = stepsProgress.find(step => step.id === order.statusOrder)
        console.log(activeStepValue)
        if(activeStepValue){
            setStepTitle(activeStepValue.name)
        }
    }
    const switchOptionsComponent = ()=>{
        setShowStatusOptions(!showStatusOptions)
    }

    const handleUpdateStatus = (status: OrderStatusEnum)=>{
        console.log(status, order.id)
        updateOrderStatus({
            variables: {
                status,
                updateOrderStatusId: order.id
            }
        })
        refetch()
    }

    useEffect(()=>{
        if(!loading){
            if(data?.updateOrderStatus.status !== 200){
                toast.error(data?.updateOrderStatus?.message)
            }else{
                toast.success(data?.updateOrderStatus?.message)
                setActiveStep()
            }
        }
    },[data, loading])
  return (
    <div className='flex card-shadow h-fit transition-all relative'>
        <div className='flex gap-6'>
            <div className='h-full flex flex-col justify-center font-bold items-center bg-yellow-main text-center'>
                <p >Pedido:</p>
                <p className=''>{order.id}</p>
            </div>
        
            <div className=''>
                <p className='font-bold text-mobile-lg lg:text-lg'>Productos</p>
                {order.products && order?.products?.map((product, index) => (
                    <div key={product?.id}>
                        <p>{index}. {product?.name}</p>
                        <p>Ingredientes: </p>
                        {product?.ingredients && product?.ingredients?.map(ingredient => (
                            <p key={ingredient?.name}>{ingredient?.name}</p>
                        ))}
                    </div>
                ))}

                <p className='font-bold text-mobile-lg lg:text-lg'>Método de pago: <span className='text-yellow-main'>{PaymentsText[paymentMethod]}</span></p>
                <p className='font-bold text-mobile-lg lg:text-lg'>Fecha de Entrega: <span className='text-yellow-main'>{order?.date}</span></p>
                <p className='font-bold text-mobile-lg lg:text-lg'>Dirección de entrega: </p>
                <p className='font-extraligh text-mobile-lg lg:text-lg'>Calle:  {address.street} #{address.houseNumber}</p>
                <p className='font-extraligh text-mobile-lg lg:text-lg'>Colonia:  {address.block}</p>

            </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <MainButton 
                content='Actualizar Estatus'
                action={()=>switchOptionsComponent()}
                classes="text-md"
                />
                <button type="button" className='rounded bg-green p-2 cursor-pointer text-white text-mobile-md lg:text-md'>Marcar Pedido Como Entregado</button>
                <p className='text-lg'>Estatus: <span className='font-bold text-yellow-main'></span>{stepTitle ?? order.statusOrder}</p>
                <p className='text-yellow-main font-bold text-mobile-2xl lg:text-2xl'>Total: {formatAmount(order.total ?? 0)}</p>
            </div>
            {showStatusOptions && (
                <div className='absolute z-20 -top-[10%] right-[20%] p-3 flex flex-col gap-2 card-shadow h-fit '>
                    <div className='flex items-center gap-2 cursor-pointer hover:bg-mid-gray transition-all p-2'
                        onClick={()=>handleUpdateStatus("pending")}
                    >
                        <Icon width={30} height={40} icon="ph:clock-bold" color="#ffb800" />
                        <p className='text-lg'>Esperando pago</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer hover:bg-mid-gray transition-all p-2'
                        onClick={()=>handleUpdateStatus("received")}
                    >
                        <Icon width={30} height={40} icon="charm:circle-tick" color="#ffb800" />
                        <p className='text-lg'>Orden Recibida</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer hover:bg-mid-gray transition-all p-2'
                        onClick={()=>handleUpdateStatus("baking")}
                    >
                        <Icon width={30} height={40} icon="fluent:oven-24-regular" color="#ffb800" />
                        <p className='text-lg'>En el horno</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer hover:bg-mid-gray transition-all p-2'
                        onClick={()=>handleUpdateStatus("lastDetails")}
                    >
                        <Icon width={30} height={40} icon="fluent:food-pizza-24-regular" color="#ffb800" /> 
                        <p className='text-lg'>Últimos Detalles</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer hover:bg-mid-gray transition-all p-2'
                        onClick={()=>handleUpdateStatus("onItsWay")}
                    >
                        <Icon width={30} height={40} icon="mingcute:road-fill" color="#ffb800" />
                        <p className='text-lg'>En camino</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default OrderCard