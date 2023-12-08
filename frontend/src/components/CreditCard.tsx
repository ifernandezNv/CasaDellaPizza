import { ChangeEvent, useState, useEffect } from 'react'

import { toast } from 'react-toastify';

import MainButton from '../reusable/MainButton';
import { DateCardType } from '../stores/cart/types';
import useCartStore from '../stores/cart/cart-store';
const CreditCard = () => {
    const [ccNumber, setCCNumber] = useState<string>("")
    const [ccv, setCcv] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<DateCardType>({
        month: "",
        year: ""
    })

    const {setCardInfo} = useCartStore()
    const cardInfo = useCartStore(store => store.cardInfo)

    const updateDate = (attribute: string, value: string)=>{
        setDate((prevValue)=>{
            return {...prevValue,
            [attribute]: value
            }
        })
    }
    const updateCCV = (value: string)=>{
        if(value.length > 3){
            return
        }
        setCcv(value)
    }
    const updateCCNumber = (value: string)=>{
        if(value.length > 14){
            return
        }
        setCCNumber(value)
        setCCNumber((prevValue)=>{
            if(prevValue.length === 4){
                prevValue += "-"
            }
            if(prevValue.length === 9){
                prevValue += "-"
            }
            if(prevValue.length === 14){
                return prevValue
            }
            return prevValue
        })
    }

    const saveInformation = () => {
        if(Object.values([ccv, ccNumber, name]).includes("")){
            toast.error("Todos los datos de la tarjeta son obligatorios")
            return
        }
        if(ccv.length < 3){
            toast.error("El código de seguridad (CCV) debe de contener 3 dígitos")
            return
        }
        if(date.month.length === 0 || date.year.length === 0){
            toast.error("Necesitamos que proporciones la fecha de expiración completa")
            return
        }
        setCardInfo({
            name, 
            ccNumber,
            ccv,
            date
        })
        toast.success("Información registrada correctamente")

    }

  return (
    <div className='card-shadow rounded border py-5 px-3'>
        <div className='flex flex-col gap-2'>
            <label htmlFor="number">Nombre del dueño de la tarjeta</label>
            <input 
                className='p-1 border border-opacity-60 rounded'
                type="text" 
                placeholder='Ej: Juan García' 
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>)=> setName(e.target.value)}
            />
        </div>
        <div className='flex flex-col gap-2 mt-2'>
            <label htmlFor="number">Número de tarjeta</label>
            <input 
                className='p-1 border border-opacity-60 rounded'
                type="text" 
                placeholder='Ej: XXXX-XXXX-XXXX-XXXX' 
                value={ccNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>)=> updateCCNumber(e.target.value)}
            />
        </div>
        <div className='flex items-center gap-3 mt-2'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="number">Fecha de expiración</label>
                <div className='flex items-center gap-2'>
                    <select 
                        onChange={(e: ChangeEvent<HTMLSelectElement>)=>updateDate(e.target.name, e.target.value)} 
                        name="month" 
                        id="month"
                        value={date.month}
                    >
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <p>/</p>
                    <select 
                        value={date.year}
                        onChange={(e: ChangeEvent<HTMLSelectElement>)=>updateDate(e.target.name, e.target.value)} 
                        name="year" 
                        id="year"
                    >
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-col gap-2 mt-2'>
                <label htmlFor="number">Código de Seguridad</label>
                <input 
                    className='p-1 border border-opacity-60 rounded w-24'
                    type="password" 
                    placeholder='Ej: 463' 
                    value={ccv}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=> updateCCV(e.target.value)}
                />
            </div>
        </div>
        <div className='text-center mt-2'>
            <MainButton 
                content="Guardar Información"
                action={()=>saveInformation()}
                classes="font-bold text-md text-center"
            />
        </div>
    </div>
  )
}

export default CreditCard