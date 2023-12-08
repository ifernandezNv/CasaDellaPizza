import {useState, useEffect} from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import useProductsStore from '../../stores/products/products-store';

type IngredientType = {
    name: string;
    selectedQuantity?: number;
}
const IngredientSelect = ({name, selectedQuantity}: IngredientType) => {

    const [quantity, setQuantity] = useState<number>(0)
    const {addIngredient, removeIngredient} = useProductsStore()
    const ingredients = useProductsStore(store=> store.ingredients)

    const decrementQuantity = () => {
        setQuantity(prevValue => {
            const index = ingredients.findIndex(ingredient => ingredient.name === name)
            if(prevValue > 0){
                prevValue-=1
                if(index >= 0){
                    ingredients[index].quantity = prevValue
                }
            }
            return prevValue
        })
    }

    const incrementQuantity = ()=>{
        setQuantity((prevValue)=>{
            if(prevValue <= 4){
                prevValue += 1
            }
            const index = ingredients.findIndex(ingredient => ingredient.name === name)
            if(index >= 0){
                ingredients[index].quantity = prevValue
            }else{
                addIngredient({
                    name,
                    quantity: prevValue
                })
            }
            return prevValue
        })
    }
    useEffect(()=>{
        if(selectedQuantity && selectedQuantity > 0){
            addIngredient(({
                name, 
                quantity: selectedQuantity
            }))
            setQuantity(selectedQuantity)
        }else if(quantity === 0){
            removeIngredient(name)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedQuantity, quantity])

  return (
    <div className='flex gap-2 items-center'>
        <p className='text-lg'>{name}</p>
        <div className='flex gap-2 items-center'>
            <button 
                type="button"
                onClick={decrementQuantity}
            >
                <RemoveCircleOutlineIcon 
                    sx={{
                        color: "#FFB800",
                        fontSize: "22px"
                    }}
                />
            </button>
            <p className='font-bold text-lg'>{quantity}</p>
            <button 
                type="button"
                onClick={incrementQuantity}
            >
                <AddCircleOutlineIcon 
                    sx={{
                        color: "#FFB800",
                        fontSize: "22px"
                    }}
                />
            </button>
        </div>
    </div>
  )
}

export default IngredientSelect