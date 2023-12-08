import {useState, ChangeEvent, useEffect} from 'react';

import { Checkbox } from "@mui/material"

import { Product } from "../../__generated__/types"
import usePromotionsStore from '../../stores/promotions/promotions-store';
type ProductType = {
    product: Product
}
const SelectProduct = ({product}: ProductType) => {
    const [selected, setSelected] = useState<boolean>(false)
    const {addProduct, removeProduct} = usePromotionsStore()
    const handleChangeAvaliable = (e: ChangeEvent<HTMLInputElement>)=>{
        setSelected(e.target.checked)
    }

    useEffect(()=>{
        if(selected){
            addProduct(product)
        }else{
            removeProduct(product)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selected])
  return (
    <div className='w-full flex gap-1 items-center justify-evenly'>
        <img 
            src={product.image ?? ''} 
            alt={`Imagen ${product.name}`} 
            className='w-20 h-16 rounded'
        />
        <div className='flex flex-col gap-2'>
            <p className='text-mobile-lg'>{product.name}</p>
            <p className='text-mobile-lg'>{`${product.sizePiecesGrams} ${product.category === "Pizzas" ? "Pizza" : "Piezas"}`} </p>
        </div>
        <Checkbox 
            onChange={handleChangeAvaliable}
            checked={selected}
            name="selected"
            value="selected"
            id="selected"
            inputProps={{
                'aria-label': 'selected',
            }}
        />
    </div>
  )
}

export default SelectProduct