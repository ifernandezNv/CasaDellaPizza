import { useEffect, useState, ChangeEvent } from 'react'
import { toast } from 'react-toastify';

import useCartStore from '../stores/cart/cart-store'
import MainButton from '../reusable/MainButton';
const AddressSidebar = () => {
    const {setAddress} = useCartStore()
    const address = useCartStore(store => store.address)
    const [street, setStreet] = useState<string>("")
    const [block, setBlock] = useState<string>("")
    const [houseNumber, setHouseNumber] = useState<string>("")

    const handleAddress = ()=>{
        if(Object.values([street, block, houseNumber]).includes("")){
            toast.error("Necesitamos que proporciones la dirección completa")
            return
        }
        setAddress({
            street,
            block,
            houseNumber
        })
        toast.success("Registramos la dirección correctamente")

    }
    useEffect(()=>{
        if(!Object.values(address).includes("")){
            setStreet(address?.street)
            setBlock(address?.block)
            setHouseNumber(address?.houseNumber as string)
        }
    }, [address])
  return (
    <aside className='sticky flex flex-col items-center justify-center card-shadow border py-5 px-3'>
        <h4 className='font-normal text-mobile-xl md:text-xl text-center mb-5'>Domicilio</h4>
        <div className='flex flex-col items-center gap-2'>
            <input 
                type="text" 
                className='p-2 rounded border' 
                placeholder='Calle: Ej: Manzanas' 
                value={street}
                onChange={(e: ChangeEvent<HTMLInputElement>)=>setStreet(e.target.value)}
            />
            <input 
                type="text" 
                className='p-2 rounded border' 
                placeholder='Número: Ej: 65-B ' 
                value={houseNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>)=>setHouseNumber(e.target.value)}
            />
            <input 
                type="text" 
                className='p-2 rounded border' 
                placeholder='Colonia: Ej: Centro ' 
                value={block}
                onChange={(e: ChangeEvent<HTMLInputElement>)=>setBlock(e.target.value)}
            />
        </div>
        <MainButton 
            content='Registrar Dirección'
            action={()=>handleAddress()}
            classes="mt-2"
        />
    </aside>
  )
}

export default AddressSidebar