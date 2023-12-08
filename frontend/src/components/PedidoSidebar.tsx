import {useState, ChangeEvent, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import {ClockLoader} from "react-spinners"
import {get} from "idb-keyval"

import { useCreateOrderMutation, OrderStatusEnum } from '../__generated__/types'
import MainButton from '../reusable/MainButton';
import { formatAmount } from '../utils'
import useCartStore from '../stores/cart/cart-store'
type Payments = "efectivo" | "tcd-entrega" | "tcd-ahora"
const PedidoSidebar = () => {
    const navigate = useNavigate()
    const total = useCartStore(store => store.total)
    const paymentMethod = useCartStore(store => store.paymentMethod)
    const address = useCartStore(store => store.address)
    const cart = useCartStore(store => store.cart)
    const {setPaymentMethod} = useCartStore()
    const [paymentMethodState, setPaymentMethodState] = useState<Payments | undefined>(undefined);
    const [status, setStatus] = useState<OrderStatusEnum>("pending")
    const [id, setId] = useState<string>("")
    const [day, setDay] = useState<string>("")
    const [hour, setHour] = useState<string>("")
    const [asap, setAsap] = useState<boolean>(false)
    const [createOrder, {data, loading}] = useCreateOrderMutation()
    const selectPaymentMethod = (payment: Payments)=>{
        if(payment === "tcd-ahora"){
            setStatus("pending")
        }else{
            setStatus("received")
        }
        setPaymentMethod(payment)
        setPaymentMethodState(payment)
    }

    const handleChangeAsap = ()=>{
        setAsap(true)
        toast.success("Te enviaremos tu pedido lo más pronto posible")
    }
    const cancelAsapSelection = ()=>{
        setAsap(false)
        toast.success("Recuerda que nos debes de indicar cuándo quieres recibir tu pedido")
    }

    const handleCreateOrder = ()=>{
        if(cart?.product?.length === 0 && cart?.promotion?.length === 0){
            toast.error("Debes de agregar productos a tu carrito")
            return
        }
        if(paymentMethod.length === 0){
            toast.error("Necesitamos que nos indiques el método de pago")
            return
        }
        if((day.length === 0 || hour.length === 0) && !asap){
            toast.error("Necesitas indicarnos cuándo quieres recibir tu pedido")
            return
        }
        
        createOrder({
            variables: {
                orderInput: {
                    product: cart,
                    statusOrder: status,
                    userId: id.toString(),
                    total,
                    date: asap ? "Lo más pronto posible" : `${day} - ${hour}`,
                    address
                }
            }
        })
    }

    useEffect(()=>{
        get("user")
            .then(res => setId(res?.id ?? ''))
    },[])
    useEffect(()=>{
        if(paymentMethod){
            setPaymentMethodState(paymentMethod)
        }
    },[paymentMethod])
    useEffect(()=>{
        if(!loading){
            if(data?.createOrder?.status !== 200){
                toast.error(data?.createOrder?.message)
            }else{
                toast.success(data?.createOrder?.message)
                navigate(`/tracker/${data.createOrder.id}`)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, loading])
  return (
    <aside className='sticky flex flex-col items-center justify-center card-shadow border py-5 px-3'>
        <div className='px-3'>
            <div className='w-full p-2 flex items-center justify-center'>
                <ClockLoader 
                    loading={loading}
                    color="#E4A400" 
                />
            </div>
            <h4 className='font-normal text-mobile-xl md:text-xl text-center mb-5'>Hora de Entrega</h4>
            <div className='w-full flex md:flex-col flex-row gap-2'>
                <select className='border text-mobile-md md:text-md rounded py-3 px-3' name="day" id="day">
                    <option value="today">Hoy</option>
                    <option value="oct-31">31 de Octubre</option>
                    <option value="nov-01">01 de Noviembre</option>
                </select>
                <select className='border text-mobile-md md:text-md rounded py-3 px-3' name="time" id="time">
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                </select>
                {!asap && (
                    <MainButton 
                        content="Lo quiero lo más pronto posible"
                        action={()=>handleChangeAsap()}
                        classes='mt-2'
                    />
                )}
                {asap && (
                    <button
                        type='button' 
                        className='text-white bg-strong-gray p-2 rounded'   
                        onClick={cancelAsapSelection}
                    >
                        Quiero recibirlo en una fecha en específico
                    </button>
                )}
            </div>
        </div>
        <div>
            <p className='text-mobile-xl md:text-xl my-8'>Total: <span className='font-bold text-yellow-main'>{formatAmount(total)}</span></p>
        </div>
        <div>
            <p className='text-mobile-xl md:text-xl mb-3'>Seleccionar método de pago: </p>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <input 
                        onChange={((e: ChangeEvent<HTMLInputElement>) => selectPaymentMethod(e.target.value as Payments))} 
                        className='appearance-none w-5 h-5 rounded-full mr-2 checked:bg-yellow-main border' 
                        type="radio" 
                        name="paymentMethod" 
                        value="efectivo"
                        checked={paymentMethodState === "efectivo"}
                    />
                    <label className='font-light text-mobile-3xl'>
                        Efectivo
                    </label>
                </div>
                
                <div className='flex items-center'>
                    <label className='font-light text-mobile-3xl'>
                        <input 
                            onChange={((e: ChangeEvent<HTMLInputElement>) => selectPaymentMethod(e.target.value as Payments))} className='appearance-none w-5 h-5 rounded-full mr-2 checked:bg-yellow-main border' 
                            type="radio" name="paymentMethod" 
                            value="tcd-entrega" 
                            checked={paymentMethodState === "tcd-entrega"}
                        />
                        Tarjeta de Crédito o Débito en la entrega
                    </label>
                </div>

                <div className='flex gap-2 items-center'>
                    <label className='font-light text-mobile-3xl'>
                        <input 
                            onChange={((e: ChangeEvent<HTMLInputElement>) => selectPaymentMethod(e.target.value as Payments))} 
                            className='appearance-none w-5 h-5 rounded-full mr-2 checked:bg-yellow-main border' 
                            type="radio"
                            name="paymentMethod"
                            value="tcd-ahora"
                            checked={paymentMethodState === "tcd-ahora"}
                        />
                        Pagar ahora con Tarjeta de Crédito o Débito
                    </label>
                </div>
            </div>
            <div className='w-full text-center'>
                <MainButton 
                    content="Hacer Pedido"
                    action={()=>handleCreateOrder()}
                    classes='font-bold text-md mt-3'
                />
            </div>
        </div>
    </aside>
  )
}

export default PedidoSidebar