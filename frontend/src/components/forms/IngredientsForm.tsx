import {ChangeEvent, useState, useEffect} from 'react'

import { toast } from 'react-toastify';
import { 
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    Checkbox
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ClockLoader} from "react-spinners";

import { ZIndex, useCreateIngredientMutation, useGetIngredientsQuery } from '../../__generated__/types';
import useIngredientsStore from '../../stores/ingredients/useIngredients';
import MainButton from '../../reusable/MainButton';
import { fileToBase64 } from '../../utils';

const IngredientsForm = () => {
    const [createIngredient, {data, loading}] = useCreateIngredientMutation();
    const {refetch} = useGetIngredientsQuery()

    const [image, setImage] = useState<File | undefined>(undefined)
    const [ppp, setPPP] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [avaliable, setAvaliable] = useState<boolean>(false)
    const [zIndex, setZIndex] = useState<ZIndex>("one")
    const modalIngredient = useIngredientsStore(store => store.modalIngredient)
    const {switchModalIngredient} = useIngredientsStore()

    const handleAvaliable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAvaliable(event.target.checked);
    };

    const handleChangeZIndex = (value: string)=>{
        setZIndex(value as ZIndex)
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          setImage(files[0]);
        }
    };

    const handleSubmit = async ()=>{
        if(Object.values([name, zIndex]).includes("")){
            toast.error("Todos los campos son obligatorios")
            return
        }
        if(ppp && ppp <= 0){
            toast.error("El precio por porción debe de ser mayor a 0")
            return
        }
        if(image?.size && image?.size/ 1048576 >= 5){
            toast.error("La imagen es demasiado pesada")
            return
        }
        const url = await fileToBase64(image as File)
        createIngredient({
            variables: {
                ingredientInput: {
                    name: name,
                    pricePerPortion: ppp ?? 0,
                    avaliable: avaliable,
                    zIndex: zIndex ?? "one",
                    image: url as string
                }
            }
        })
    }
    useEffect(()=>{
        if(!loading){
            if(data?.createIngredient.status !== 200){
                toast.error(data?.createIngredient.message)
            }else{
                toast.success(data?.createIngredient.message)
                refetch()
                setName("")
                setPPP(0)
                setAvaliable(false)
                setZIndex("one")
                setImage(undefined)
                if(modalIngredient){
                    switchModalIngredient()
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, loading])

  return (
    <Modal
        open={modalIngredient}
        onClose={switchModalIngredient}
    >
        <form className='absolute top-[25%] right-[35%] bg-white rounded py-4 px-8'>
            {loading && 
                <div className='w-full p-2 flex items-center justify-center'>
                    <ClockLoader 
                      loading={loading} 
                        color="#E4A400" 
                    />
                </div>
            }
            <h3 className='text-center text-xl font-bold mb-5'>Crea un nuevo ingrediente</h3>
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
                <label className='font-light text-lg' htmlFor="pricePerPortion">Precio por porción: </label>
                <input
                    className='p-2 border border-black border-opacity-50'
                    type="number"
                    value={ppp.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setPPP(Number(e.target.value))} 
                    name="pricePerPortion" 
                    id="pricePerPortion" 
                    placeholder='Ej: 0, 53, 26'
                />
            </div>
            <div className='flex flex-col gap mb-3'>
                <label className='font-light text-lg' htmlFor="zIndex">Orden en el motor de personalización</label>
                <Select
                    className='p-2 border border-black border-opacity-50'
                    name="zIndex"
                    value={zIndex}
                    onChange={(e: SelectChangeEvent)=>handleChangeZIndex(e.target.value)} 
                >
                    <MenuItem value="one">1</MenuItem>
                    <MenuItem value="two">2</MenuItem>
                    <MenuItem value="three">3</MenuItem>
                </Select>
            </div>
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
            <div className='flex flex-row items-center gap-2 mb-3'>
                <label className='font-light text-lg' htmlFor="avaliable">Disponible: </label>
                <Checkbox
                    checked={avaliable}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={handleAvaliable}
                />
            </div>
            <div className='w-full text-center'>
                <MainButton 
                    content='Crear Ingrediente'
                    action={handleSubmit}
                    classes='text-md w-fit mx-auto'
                />
            </div>
            <div 
                className='absolute top-2 right-1 cursor-pointer'
                onClick={switchModalIngredient}
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

export default IngredientsForm