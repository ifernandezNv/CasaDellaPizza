import { useState, ChangeEvent, useEffect } from 'react'

import { 
    Modal, 
    Checkbox
} from '@mui/material'
import { toast } from 'react-toastify'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ClockLoader} from "react-spinners";

import { 
    Product,
    useGetProductsQuery,
    useCreatePromotionMutation,
    useUpdatePromotionMutation,
    useGetPromotionQuery
} from '../../__generated__/types'
import { fileToBase64 } from '../../utils'
import usePromotionsStore from '../../stores/promotions/promotions-store';
import SelectProduct from '../products/SelectProduct';

const PromotionForm = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [importantDetail, setImportantDetail] = useState<string>("")
    const [avaliable, setAvaliable] = useState<boolean>(false)
    const [endDate, setEndDate] = useState<string>("")
    const [image, setImage] = useState<File>()
    const [url, setUrl] = useState<string>("")

    const {data, loading} = useGetProductsQuery()
    const {switchModalPromotion, setPromotion} = usePromotionsStore()
    const showPromotionModal = usePromotionsStore(store => store.showPromotionModal)
    const products = usePromotionsStore(store => store.products)
    const promotion = usePromotionsStore(store => store.promotion)
    const {refetch} = useGetPromotionQuery()
    const [createPromotion, {data: dataCreatePromotion, loading: loadingCreatePromotion}] = useCreatePromotionMutation()
    const [updatePromotion, {data: dataUpdatePromotion, loading: loadingUpdatePromotion}] = useUpdatePromotionMutation()

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const url = await fileToBase64(files[0]) as string
            setUrl(url)
            setImage(files[0]);
        }
    }

    const handleChangeAvaliable = (e: ChangeEvent<HTMLInputElement>)=>{
        setAvaliable(e.target.checked)
    }

    const handleSubmit = async ()=>{
        if(Object.values([name, description, endDate]).includes("")){
            toast.error("Todos los campos son obligatorios")
            return
        }
        if(price && price <= 0){
            toast.error("El precio por porción debe de ser mayor a 0")
            return
        }
        if(products.length === 0){
            toast.error("Una promoción debe de tener algún producto")
            return
        }
        if(!image){
            toast.error("Necesitamos una imagen para mostrarla en el sitio")
            return
        }
        if(promotion?.id?.length && promotion?.id?.length > 0){
            if(image){
                updateAPromotion(url)
            }else{
                updateAPromotion(promotion.image as string)
            }
            return
        }else{
            console.log("creando promoción");
            createAPromotion(url)
        }
        // if(image?.size && image?.size/ 1048576 >= 2){
        //     toast.error("La imagen es demasiado pesada")
        //     return
        // }
    }

    const createAPromotion = (url: string)=>{
        refetch()
        createPromotion({
            variables: {
                promotionInput: {
                    name,
                    description,
                    price,
                    avaliable: avaliable ?? false,
                    endDate,
                    image: url,
                    importantDetail,
                    product: products
                }
            }
        })
    }
    const updateAPromotion = (url: string = promotion?.image ?? '')=>{
        refetch()
        updatePromotion({
            variables: {
                promotionInput: {
                    name,
                    description,
                    price,
                    avaliable,
                    endDate,
                    image: url,
                    importantDetail,
                    products
                }
            }
        })
    }
    const resetForm = ()=>{
        refetch()
        setName("")
        setDescription("")
        setAvaliable(false)
        setImportantDetail("")
        setPrice(0)
        setEndDate("")
        setPromotion({
            description: "",
            name: "",
            price: 0,
            products: [],
            avaliable: false,
            endDate: "",
            image: "",
            importantDetail: ""
        })
        if(showPromotionModal){
            switchModalPromotion()
        }
    }

    useEffect(()=>{
        if(promotion?.id && promotion?.name?.length > 0){
            setName(promotion?.name)
            setDescription(promotion?.description)
            setAvaliable(promotion?.avaliable as boolean)
            setImportantDetail(promotion?.importantDetail as string)
            setPrice(Number(promotion?.price))
            setEndDate(promotion?.endDate as string)
        }
    },[promotion])

    useEffect(()=>{
        if(!loadingCreatePromotion && dataCreatePromotion?.createPromotion.status){
            if(dataCreatePromotion?.createPromotion.status !== 200){
                toast.error(dataCreatePromotion?.createPromotion.message)
            }else{
                toast.success(dataCreatePromotion?.createPromotion.message)
                resetForm()
            }
        }
        if(!loadingUpdatePromotion && dataUpdatePromotion?.updatePromotion.status){
            if(dataUpdatePromotion?.updatePromotion.status !== 200){
                toast.error(dataUpdatePromotion?.updatePromotion.message)
            }else{
                toast.success(dataUpdatePromotion?.updatePromotion.message)
                resetForm()
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loadingCreatePromotion, loadingUpdatePromotion, dataCreatePromotion, dataUpdatePromotion])
  return (
    <Modal
        open={showPromotionModal}
        onClose={switchModalPromotion}
    >
        <form className='absolute top-[10%] right-[25%] bg-white rounded py-4 px-8'>
            <div className='w-full p-2 flex items-center justify-center'>
                <ClockLoader 
                    loading={loading || loadingCreatePromotion || loadingUpdatePromotion}
                    color="#E4A400" 
                />
            </div>
            <h3 className='text-center text-xl font-bold mb-5'>{promotion?.id ? "Editar Promoción" : "Crea una Nueva Promoción"}</h3>
            <div className='flex flex-col gap mb-2'>
                <label className='font-light text-md' htmlFor="name">Nombre: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} 
                    type="text" 
                    value={name} 
                    name="name" 
                    id="name" 
                    placeholder='Ej: Pa´ compartir'
                />
            </div>
            <div className='flex flex-col gap mb-2'>
                <label className='font-light text-md' htmlFor="description">Descripción: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setDescription(e.target.value)} 
                    type="text" 
                    value={description} 
                    name="description" 
                    id="description" 
                    placeholder='Ej: ¿Te gusta pasar tiempo en familia? Asegurate de tener a todos contentos y con la barriga llena con dis pizzas y dos complementos'
                />
            </div>
            <div className='flex flex-col gap mb-2'>
                <label className='font-light text-md' htmlFor="importantDetail">Detalle Importante: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setImportantDetail(e.target.value)} 
                    type="text" 
                    value={importantDetail} 
                    name="importantDetail" 
                    id="importantDetail" 
                    placeholder='Ej: 2X1, Sólo por $435, 3X2, etc..'
                />
            </div>
            <div className='flex flex-col gap mb-2'>
                <label className='font-light text-md' htmlFor="endDate">Fecha de Vigencia: </label>
                <input 
                    className='p-2 border border-black border-opacity-50'
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setEndDate(e.target.value)} 
                    type="date" 
                    value={endDate} 
                    name="endDate" 
                    id="endDate" 
                />
            </div>
            <div className='flex flex-col gap mb-2'>
                <label className='font-light text-md' htmlFor="price">Precio: </label>
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
            <div className='max-h-36 overflow-y-scroll grid grid-cols-2 gap-2'>
            {
                data?.getProducts && data?.getProducts?.map((product: Product | null) => (
                    <SelectProduct
                        key={promotion?.id ?? product?.image}
                        product={product as Product}
                    />
                ))
            }
            </div>
            <div>
                <Checkbox 
                    checked={avaliable}
                    name="avaliable"
                    onChange={handleChangeAvaliable}
                    value="avaliable"
                    id="avaliable"
                    inputProps={{
                        'aria-label': 'avaliable',
                    }}
                />
                <label htmlFor="avaliable">Disponible</label>
            </div>
            
            <div className='flex flex-col gap mb-2'>
                <div>
                    <label className='font-light text-md' htmlFor="image">Imagen: </label>
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
            </div>
            <div className='w-full text-center'>
                <button
                    type='button'
                    onClick={()=>handleSubmit()}
                    className='bg-yellow-main text-center p-2 rounded hover:bg-yellow-dark font-bold w-fit mx-auto'
                >
                    {promotion?.id ? "Guardar Cambios" : "Crear Promoción"}
                </button>
            </div>
            <div 
                className='absolute top-2 right-1 cursor-pointer'
                onClick={switchModalPromotion}
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

export default PromotionForm