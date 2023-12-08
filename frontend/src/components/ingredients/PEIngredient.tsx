import {useEffect, useState, useMemo} from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import { IngredientQuantity, Ingredient, useGetIngredientLazyQuery } from '../../__generated__/types'
import { PizzaIngredientType } from '../PersonalizationEngine'

type PEIngredientType = {
    ingredient: IngredientQuantity | Ingredient
    ingredientQuantity: number,
    updatePizzaIngredients: (ingredient: PizzaIngredientType)=>void
}
const PEIngredient = ({ingredient, ingredientQuantity, updatePizzaIngredients}: PEIngredientType) => {
    const [getIngredient, {data, loading} ] = useGetIngredientLazyQuery()
    const memoizedIngredient = useMemo(()=>{
        getIngredient({
            variables: {
                name: ingredient.name
            }
        })
        if(!loading && data?.getIngredient?.id){
            return data?.getIngredient
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    const [quantity, setQuantity] = useState<number>(0)

    const decrementQuantity = () => {
        setQuantity(prevValue => {
            if(prevValue > 0){
                prevValue-=1
                updatePizzaIngredients({
                    id: memoizedIngredient?.id as string, 
                    name: memoizedIngredient?.name as string,
                    quantity: prevValue, 
                    pricePerPortion: memoizedIngredient?.pricePerPortion as number 
                })
            }
            return prevValue
        })
    }

    const incrementQuantity = ()=>{
        setQuantity((prevValue)=>{
            if(prevValue <= 4){
                prevValue += 1
            }
            updatePizzaIngredients({
                id: memoizedIngredient?.id as string, 
                name: memoizedIngredient?.name as string,
                quantity: prevValue, 
                pricePerPortion: memoizedIngredient?.pricePerPortion as number 
            })
            return prevValue
        })
    }

    useEffect(()=>{
        if(ingredientQuantity && ingredientQuantity > 0){
            updatePizzaIngredients({
                id: memoizedIngredient?.id as string, 
                name: ingredient?.name as string,
                quantity: ingredientQuantity, 
                pricePerPortion: memoizedIngredient?.pricePerPortion ?? 26 as number 
            })
            setQuantity(ingredientQuantity)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[memoizedIngredient])
  return (
    <>
    {!ingredient.name?.includes("Masa") && (
        <div className="flex items-center gap-1">
            <p className="text-xl font-extraligh">{ingredient.name}</p>
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
    )}
    </>
  )
}

export default PEIngredient