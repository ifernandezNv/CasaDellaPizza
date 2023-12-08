import {useMemo, useState, useEffect} from 'react'

import { Modal } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import useGeneralStore from '../stores/generalStore/useGeneralStore'
import useCartStore from '../stores/cart/cart-store';
import { useGetIngredientsLazyQuery, useGetDoughTypesQuery, Ingredient, IngredientQuantity } from '../__generated__/types';
import useProductsStore from '../stores/products/products-store'
import MainButton from '../reusable/MainButton'
import PEIngredient from './ingredients/PEIngredient';
import { formatAmount, uniqueIngredientsWithQuantity } from '../utils';
import { toast } from 'react-toastify';

type PizzaSizeEnum = 20 | 30 | 40 | 50 | 0

type PizzaTypeEnum = "Masa Tradicional" | "Masa Delgada" | "Masa Estilo Italiana" | ""

type IngredientsForm = (Ingredient | IngredientQuantity)
export type PizzaIngredientType = {
    id: string
    name: string,
    quantity: number,
    pricePerPortion: number,
}

const PersonalizationEngine = () => {
    const [quantity, setQuantity] = useState<number>(1)
    const [pizzaSize, setPizzaSize] = useState<PizzaSizeEnum>(0)
    const [total, setTotal] = useState<number>(0)
    const [pizzaType, setPizzaType] = useState<PizzaTypeEnum>("")
    const [getIngredients, {data, loading}] = useGetIngredientsLazyQuery()
    const [mappedIngredients, setMappedIngredients] = useState<IngredientsForm[]>([])
    const [pizzaIngredients, setPizzaIngredients] = useState<PizzaIngredientType[]>([])
    const {data: doughTypes, loading: loadingDoughTypes} = useGetDoughTypesQuery()
    const product = useProductsStore(store => store.product)
    const {addProductToCart} = useCartStore()

    const memoizedIngredients: Ingredient[] = useMemo(()=>{
        getIngredients()
        if(!loading && data?.getIngredients){
            return data?.getIngredients as Ingredient[]
        }else{
            return [] as Ingredient[]
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading])

    const {switchPersonalizationEngineModal} = useGeneralStore()
    const personalizationEngineModal = useGeneralStore(store => store.personalizationEngineModal)
    const updatePizzaSize = (value: PizzaSizeEnum)=>{
        setPizzaSize(value)
    }

    const updatePizzaType = (dough: Ingredient)=>{
        updatePizzaIngredients({
            id: dough.id as string,
            name: dough.name,
            quantity: 1,
            pricePerPortion: dough.pricePerPortion as number,
        })
        setPizzaType((prevValue) => {
            const index = product.ingredients.findIndex(ingredient => ingredient?.name?.includes(dough.name))
            if(dough?.name === prevValue || index >= 0){
                return prevValue
            }else{
                return dough?.name as PizzaTypeEnum
            }
        })
    }

    const decrementQuantity = () => {
        setQuantity(prevValue => {
            if(prevValue > 0){
                prevValue-=1
            }
            return prevValue
        })
    }

    const incrementQuantity = ()=>{
        setQuantity((prevValue)=>{
            if(prevValue <= 4){
                prevValue += 1
            }
            return prevValue
        })
    }

    const resetModal = ()=>{
        setQuantity(0)
        setPizzaType("")
        setPizzaSize(0)
        switchPersonalizationEngineModal()
    }

    const getPizzaType = ()=>{
        const index = product.ingredients.findIndex(ingredient => ingredient?.name === "Masa Tradicional")
        const indexItalianDough = product.ingredients.findIndex(ingredient => ingredient?.name === "Masa Italiana")
        const indexThinDough = product.ingredients.findIndex(ingredient => ingredient?.name === "Masa Delgada")
        if(index >= 0){
            setPizzaType("Masa Tradicional")
        }
        if(indexItalianDough >= 0){
            setPizzaType("Masa Estilo Italiana")
        }
        if(indexThinDough >= 0){
            setPizzaType("Masa Delgada")
        }
    }
    const getMappedIngredients = ()=>{
        const unique = uniqueIngredientsWithQuantity(product.ingredients as IngredientQuantity[], memoizedIngredients)
        setMappedIngredients(unique)
    }
    
    const updateCart = ()=>{
        addProductToCart({
            product: {
                ...product,
                ingredients: pizzaIngredients,
                price: total
            },
            quantity
        })
        toast.success("Producto agregado al carrito")
    }

    const updatePizzaIngredients = (ingredient: PizzaIngredientType)=>{
        if(ingredient.name && ingredient.id){
            if(ingredient.name.includes("Masa")){
                const filteredIngredients = pizzaIngredients.filter(ingredient => ingredient.name.includes("Masa"))
                setPizzaIngredients([...filteredIngredients, ingredient])
            }
            const ingredientIndex = pizzaIngredients.findIndex(pizzaIngredient => pizzaIngredient.id === ingredient.id)
            if(ingredient.quantity === 0){
                const filteredIngredients = pizzaIngredients.filter(pizzaIngredient => pizzaIngredient.id !== ingredient.id)
                setPizzaIngredients([...filteredIngredients])
                return
            }
            if(ingredientIndex >= 0){
                console.log("ingrediente ya agregado a la pizza", ingredient)
                setPizzaIngredients((prevValue) => {
                    prevValue[ingredientIndex] = {...ingredient}
                    return prevValue
                })
            }else{
                setPizzaIngredients((prevValue) => [...prevValue, ingredient])
            }
        }
    }
    useEffect(()=>{
        if(product.id){
            setTotal(product.price * quantity)
            if(product.sizePiecesGrams === "individual"){
                setPizzaSize(20)
            }else if(product.sizePiecesGrams === "mediana"){
                setPizzaSize(30)
            }else if(product.sizePiecesGrams === "grande"){
                setPizzaSize(40)
            }else{
                setPizzaSize(50)
            }
            getPizzaType()
            getMappedIngredients()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[product])
    
    useEffect(()=>{
        const subtotal = pizzaIngredients.reduce((total, ingredient)=> {
            const index = product.ingredients.findIndex(pizzaIngredient => pizzaIngredient?.name === ingredient.name)
            console.log(index)
            if(index >= 0){
                total += (ingredient.quantity - (product?.ingredients[index]?.quantity ?? 0)) * ingredient.pricePerPortion
                console.log(total)
            }else{
                total += ingredient.quantity * ingredient.pricePerPortion
            }
            return total
        }, 0)
        setTotal(()=>{
            return product.price + subtotal
        })
    },[pizzaIngredients, product])
  return (
    <Modal
        open={personalizationEngineModal}
        onClose={switchPersonalizationEngineModal}
    >  
        <div className='absolute top-[10%] right-[17%] bg-white rounded py-4 px-8 w-2/3'>
            <div className='flex items-center gap-5 mt-12'>
                <div className='flex flex-col items-center gap-6 w-1/3'>
                        <img 
                            src={product.image} 
                            alt={`Image of ${product.name}`} 
                            className='rounded-tl-lg rounded-tr-lg w-80 h-72'
                        />
                        <p className='text-lg font-light'>{product.description}</p>
                        <div className='flex items-center gap-3'>
                            <button 
                                type="button"
                                onClick={decrementQuantity}
                            >
                                <RemoveCircleOutlineIcon 
                                    sx={{
                                        color: "#FFB800",
                                        fontSize: "30px"
                                    }}
                                />
                            </button>
                            <p className='font-extralight text-xl'>{quantity}</p>
                            <button 
                                type="button"
                                onClick={incrementQuantity}
                            >
                                <AddCircleOutlineIcon 
                                    sx={{
                                        color: "#FFB800",
                                        fontSize: "30px"
                                    }}
                                />
                            </button>
                            <p className="text-3xl font-extralight">{quantity > 1 ? "Pizzas" : "Pizza"}</p>
                        </div>
                        <div>
                            <p className="text-3xl font-extralight">Subtotal: <span>{formatAmount(total)}</span></p>
                        </div>
                </div>
                <div className='flex flex-col w-5/6'>
                    <h3 className='font-bold text-center text-3xl'>Pizza {product.name}</h3>
                    <div className='w-fit mx-auto mt-3 bg-mid-gray rounded-md flex items-center gap-12 p-2'>
                        <button 
                            className={`${pizzaSize === 20 ? "bg-yellow-main" : "bg-opacity-0" } font-bold text-xl px-2 py-3 rounded-md transition-all`}
                            type="button"
                            onClick={()=>updatePizzaSize(20)}
                        >
                            20 centímetros
                        </button>
                        <button 
                            className={`${pizzaSize === 30 ? "bg-yellow-main" : "bg-opacity-0" } font-bold text-xl px-2 py-3 rounded-md transition-all`}
                            type="button"
                            onClick={()=>updatePizzaSize(30)}
                        >
                            30 centímetros
                        </button>
                        <button 
                            className={`${pizzaSize === 40 ? "bg-yellow-main" : "bg-opacity-0" } font-bold text-xl px-2 py-3 rounded-md transition-all`}
                            type="button"
                            onClick={()=>updatePizzaSize(40)}
                        >
                            40 centímetros
                        </button>
                        <button 
                            className={`${pizzaSize === 50 ? "bg-yellow-main" : "bg-opacity-0" } font-bold text-xl px-2 py-3 rounded-md transition-all`}
                            type="button"
                            onClick={()=>updatePizzaSize(50)}
                        >
                            50 centímetros
                        </button>
                    </div>
                    <div className='flex-start my-3'>
                        <h4 className='text-2xl'>Tipo de Masa</h4>
                        <div className='flex items-center gap-5 px-5'>
                            {!loadingDoughTypes && doughTypes?.getDoughTypes?.map(dough => (
                                <div key={dough?.id} className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className={`${pizzaType === dough?.name ? "bg-yellow-main" : "bg-mid-gray"} p-3 rounded-full transition-all`}
                                        onClick={()=>updatePizzaType(dough as Ingredient)}
                                    >
                                    </button>
                                    <p className="text-md">{dough?.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className='text-2xl mb-3'>Agregar o Eliminar Ingredientes</h4>
                        <div className='overflow-y-scroll h-56'>
                            {mappedIngredients.length > 0 && mappedIngredients?.map(ingredient => (
                                <PEIngredient 
                                    key={ingredient?.name}
                                    ingredient={ingredient}
                                    updatePizzaIngredients={updatePizzaIngredients}
                                    ingredientQuantity={ingredient?.quantity ?? 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between mt-9'>
                <button 
                    type="button"
                    onClick={resetModal}
                    className='text-xl text-light px-4 py-2 rounded border border-red'
                >
                    Cancelar
                </button>
                <MainButton 
                    content="Agregar al Carrito"
                    action={()=>updateCart()}
                    classes="font-bold text-xl"
                />
            </div>
            <div 
                className='absolute top-2 right-3 cursor-pointer'
                onClick={resetModal}
            >
                <HighlightOffIcon
                    sx={{
                        color: "#FFB800",
                        fontSize: "60px"
                    }}
                />
            </div>
        </div>
    </Modal>
  )
}

export default PersonalizationEngine