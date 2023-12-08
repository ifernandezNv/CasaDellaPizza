import { useState, ChangeEvent, useEffect } from 'react'

import { 
    Modal, 
    Select, 
    MenuItem, 
    SelectChangeEvent,
    Checkbox
} from '@mui/material'
import { toast } from 'react-toastify'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ClockLoader} from "react-spinners";

import { 
    useCreateProductMutation, 
    useUpdateProductMutation,
    useGetCategoriesQuery, 
    useGetIngredientsQuery,
    useGetProductsQuery,
    Category, 
    Ingredient,
    IngredientQuantity,
} from '../../__generated__/types'
import { fileToBase64, uniqueIngredients } from '../../utils'
import useProductsStore from '../../stores/products/products-store'
import IngredientSelect from '../ingredients/IngredientSelect'

type Sizes = "extragrande" | "grande" | "mediana" | "individual" | ""
const ProductForm = () => {
    const {switchModalProduct, setProduct} = useProductsStore()
    const modalProduct = useProductsStore(store => store.modalProduct)
    const ingredients = useProductsStore(store => store.ingredients)
    const product = useProductsStore(store => store.product)

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [category, setCategory] = useState<string>("")
    const [pizzaSize, setPizzaSize] = useState<Sizes>("")
    const [value, setValue] = useState<string>("")
    const [updatedIngredients, setUpdatedIngredients] = useState<IngredientQuantity[]>([])
    const [pieces, setPieces] = useState<number>(0)
    const [grams, setGrams] = useState<number>(0)
    const [image, setImage] = useState<File>()
    const [url, setUrl] = useState<string>("")

    const {data: categoriesData} = useGetCategoriesQuery()
    const {data: ingredientsData} = useGetIngredientsQuery()
    const {refetch} = useGetProductsQuery()
    
    const [createProduct, {data: createProductData, loading: createProductLoading}] = useCreateProductMutation()
    const [updateProduct, {data: updateProductData, loading: updateProductLoading}] = useUpdateProductMutation()

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const urlString = await fileToBase64(files[0]) as string
            setUrl(urlString)
            setImage(files[0]);
        }
    };

    const handleChangeCategory = (event: SelectChangeEvent<string>) => {
        const { target: { value } } = event;
        if(value){
          setCategory(value);
        }
    };

    const handleChangePieces = (value: string)=>{
        setPieces(Number(value))
        setValue(value.toString())
    }

    const handleChangeGrams = (value: string)=>{
        setGrams(Number(value))
        setValue(value.toString())
    }

    const handleChangeSize = (e: ChangeEvent<HTMLInputElement>)=>{
        setPizzaSize(e.target.name as Sizes)
        setValue(e.target.name)
    }

    const handleSubmit = async ()=>{
        if(Object.values([name, description, category]).includes("")){
            toast.error("Todos los campos son obligatorios")
            return
        }
        if(price && price <= 0){
            toast.error("El precio por porción debe de ser mayor a 0")
            return
        }
        if(category === "Complementos" && Number(pieces) === 0){
            toast.error("Es necesario especificar las piezas de este complemento")
            return
        }
        if(category === "Pizzas"){
            if(ingredients?.length === 0){
                toast.error("Debes de especificar los ingredientes del producto a crear")
                return
            }
            if(pizzaSize.length === 0){
                toast.error("Necesitamos que especifiques el tamaño de la pizza a crear")
                return
            }
        }
        if(category === "Dips" && Number(grams) === 0){
            toast.error("Necesitamos que especifiques el gramage del dip a agregar")
            return
        }
        if(image?.size && image?.size/ 1048576 >= 2){
            toast.error("La imagen es demasiado pesada")
            return
        }
        const uniqueIngredients = ingredients.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
        )
        if(product.id){
            updateProductFunction(url ?? product.image, uniqueIngredients)
        }else{
            createProductFunction(url, uniqueIngredients)  
        }
        
    }
    const resetForm = ()=>{
        refetch()
        setName("")
        setPrice(0)
        setCategory("")
        setImage(undefined)
        setDescription("")
        setUpdatedIngredients([])
        setProduct({
            category: "",
            description: "",
            image: "",
            ingredients: [],
            name: "",
            price: 0,
            sizePiecesGrams: ""
        })
        setPizzaSize("")
        if(modalProduct){
            switchModalProduct()
        }
    }
    const createProductFunction = (url: string, uniqueIngredients: IngredientQuantity[])=>{
        createProduct({
            variables: {
                productInput: {
                    name,
                    category,
                    description,
                    price,
                    image: url,
                    sizePiecesGrams: value,
                    ingredients: category === "Pizzas" ? uniqueIngredients : []
                }
            }
        })
    }
    const updateProductFunction = (url: string, uniqueIngredients: IngredientQuantity[])=>{
        updateProduct({
            variables: {
                productInput: {
                    id: product.id,
                    product: {
                        name,
                        category,
                        description,
                        price,
                        image: product.image ?? url,
                        sizePiecesGrams: value,
                        ingredients: category === "Pizzas" ? uniqueIngredients : []
                    }
                }
            }
        })
    }

    useEffect(()=>{
        if(product.name.length > 0){
            if(ingredientsData?.getIngredients){
                if(product.ingredients.length > 0){
                    const updatedIngredients: IngredientQuantity[] = ingredientsData?.getIngredients.flatMap(ingredient=> {
                        const filteredData = product.ingredients.filter(ingredientState => {
                            if(ingredientState?.name === ingredient?.name && ingredientState?.quantity){
                                return {name: ingredientState?.name, quantity: ingredientState?.quantity} as IngredientQuantity
                            }
                        })
                        return filteredData as IngredientQuantity[]
                    })
                    if(ingredientsData?.getIngredients){
                        setUpdatedIngredients(uniqueIngredients(updatedIngredients, ingredientsData?.getIngredients as Ingredient[]) as IngredientQuantity[])
                    }
                }

                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setDescription(product.description)
                if(product.category === "Pizzas"){
                    setPizzaSize(product?.sizePiecesGrams as Sizes)
                }
                setValue(product?.sizePiecesGrams as string)
                setPieces(Number(product?.sizePiecesGrams ?? 0))
                setGrams(Number(product?.sizePiecesGrams ?? 0))
        }
        
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, ingredientsData])

    useEffect(()=>{
        if(!createProductLoading && name?.length > 0){
            if(createProductData?.createProduct?.status !== 200){
                toast.error(createProductData?.createProduct?.message)
            }else{
                toast.success(createProductData?.createProduct?.message)
                resetForm()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[createProductData, createProductLoading])
    useEffect(()=>{
        if(!updateProductLoading && name?.length > 0){
            if(updateProductData?.updateProduct?.status !== 200){
                toast.error(updateProductData?.updateProduct?.message)
            }else{
                toast.success(updateProductData?.updateProduct?.message)
                resetForm()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[updateProductData, updateProductLoading])

  return (
    <Modal
        open={modalProduct}
        onClose={switchModalProduct}
    >
        <form className='absolute top-[10%] right-[25%] bg-white rounded py-4 px-8'>
            <div className='w-full p-2 flex items-center justify-center'>
                <ClockLoader 
                    loading={createProductLoading || updateProductLoading}
                    color="#E4A400" 
                />
            </div>
            <h3 className='text-center text-xl font-bold mb-5'>{product.id ? `Editar ${product?.name}` : "Crea un Nuevo Producto"}</h3>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="name">Nombre: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} 
                    type="text" 
                    value={name} 
                    name="name" 
                    id="name" 
                    placeholder='Ej: Pepperoni, Salami, Tocino, Pollo'
                />
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="description">Descripción: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setDescription(e.target.value)} 
                    type="text" 
                    value={description} 
                    name="description" 
                    id="description" 
                    placeholder='Ej: Pepperoni, Salami, Tocino, Pollo'
                />
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="price">Precio: </label>
                <input
                    className='p-2 border border-black border-opacity-50'
                    type="number"
                    value={price.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setPrice(Number(e.target.value))} 
                    name="price" 
                    id="price" 
                    placeholder='Ej: 0, 53, 26'
                />
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="category">Categoría</label>
                <Select
                    className='p-2 border border-black border-opacity-50'
                    name="category"
                    value={category}
                    onChange={handleChangeCategory} 
                >
                    <MenuItem
                        value=""
                    >
                        -- Selecciona una categoría --
                    </MenuItem>
                    {categoriesData?.getCategories && categoriesData?.getCategories?.length>0 && categoriesData?.getCategories?.map((category: Category | null)=>(
                        <MenuItem 
                            key={category?.id} 
                            value={category?.name as string}
                        >
                            {category?.name as string}
                        </MenuItem>
                    ))}
                    
                </Select>
            </div>
            {category === "Pizzas" && (
                <>
                    <div className='flex flex-col gap mb-3'>
                        <label className='font-light text-lg' htmlFor="ingredients">Ingredientes</label>
                        <div className='grid gap-2 grid-cols-3'>
                            {product.id && updatedIngredients.length > 0 ? updatedIngredients?.map((ingredient: IngredientQuantity)=>(
                                <IngredientSelect 
                                    key={ingredient?.name} 
                                    name={ingredient?.name ?? ''}
                                    selectedQuantity={ingredient?.quantity ?? 0}
                                />
                            )):
                            ingredientsData?.getIngredients?.length && ingredientsData?.getIngredients?.length>0 && ingredientsData?.getIngredients?.map((ingredient: Ingredient | null)=>(
                                <IngredientSelect 
                                    key={ingredient?.id} 
                                    name={ingredient?.name as string}
                                />
                            ))}
                            
                        </div>
                    </div>
                    <div className='flex gap-2 mb-3'>
                        <div>
                            <Checkbox 
                                checked={pizzaSize === "extragrande"}
                                name="extragrande"
                                onChange={handleChangeSize}
                                value="extragrande"
                                id="extragrande"
                                inputProps={{
                                    'aria-label': 'extragrande',
                                }}
                            />
                            <label htmlFor="extragrande">Extragrande</label>
                        </div>
                        <div>
                            <Checkbox 
                                checked={pizzaSize === "grande"}
                                name="grande"
                                onChange={handleChangeSize}
                                value="grande"
                                id="grande"
                                inputProps={{
                                    'aria-label': 'grande',
                                }}
                            />
                            <label htmlFor="grande">Grande</label>
                        </div>
                        <div>
                            <Checkbox 
                                checked={pizzaSize === "mediana"}
                                name="mediana"
                                onChange={handleChangeSize}
                                value="mediana"
                                id="mediana"
                                inputProps={{
                                    'aria-label': 'mediana',
                                }}
                            />
                            <label htmlFor="mediana">Mediana</label>
                        </div>
                        <div>
                            <Checkbox 
                                checked={pizzaSize === "individual"}
                                name="individual"
                                onChange={handleChangeSize}
                                value="individual"
                                id="individual"
                                inputProps={{
                                    'aria-label': 'individual',
                                }}
                            />
                            <label htmlFor="individual">Individual</label>
                        </div>
                    </div>
                </>
            )}
            {category === "Complementos" && (
                <div className='flex flex-col gap mb-3'>
                    <label className='font-light text-lg' htmlFor="piezas">Piezas: </label>
                    <input 
                        className='p-2 border border-black border-opacity-50'
                        onChange={(e: ChangeEvent<HTMLInputElement>)=>handleChangePieces(e.target.value)} 
                        type="number" 
                        value={pieces} 
                        name="piezas" 
                        id="piezas" 
                        placeholder='Ej: 8, 17, 26'
                    />
                </div>
            )}
            {category === "Dips" && (
                <div className='flex flex-col gap mb-3'>
                    <label className='font-light text-lg' htmlFor="grams">Gramos: </label>
                    <input 
                        className='p-2 border border-black border-opacity-50'
                        onChange={(e: ChangeEvent<HTMLInputElement>)=>handleChangeGrams(e.target.value)} 
                        type="number" 
                        value={grams} 
                        name="grams" 
                        id="grams" 
                        placeholder='Ej: 8, 17, 26'
                    />
                </div>
            )}
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="image">Imagen: </label>
                <input 
                    type="file" 
                    accept='image/*' 
                    onChange={handleFileChange} 
                    name="image" 
                    id="image"
                />
            </div>
            {url && (
                <div className='rounded w-28 h-28'>
                    <img className='w-28 h-28' src={url} alt={`Image of ${name}`}/>
                </div>
            )}
            <div className='w-full text-center'>
                <button
                    type='button'
                    onClick={()=>handleSubmit()}
                    className='bg-yellow-main text-center p-2 rounded hover:bg-yellow-dark font-bold w-fit mx-auto'
                >
                    {product.id ? "Guardar Cambios" : "Crear Producto"}
                </button>
            </div>
            <div 
                className='absolute top-2 right-1 cursor-pointer'
                onClick={switchModalProduct}
            >
                <HighlightOffIcon
                    sx={{
                        color: "#FFB800",
                        fontSize: "40px"
                    }}
                />
            </div>
        </form>
    </Modal>
  )
}

export default ProductForm