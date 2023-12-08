import { useEffect } from 'react'

import { Product, useGetProductLazyQuery, useDeleteProductMutation, StatusResponse } from '../../__generated__/types'
import { formatAmount } from '../../utils'
import useProductsStore from '../../stores/products/products-store'
import useGeneralStore from '../../stores/generalStore/useGeneralStore'
type AdminProductType = {
    product: Product
}

const AdminProduct = ({product}: AdminProductType) => {

    const [getProduct, {data, loading, refetch}] = useGetProductLazyQuery()
    const {setProduct, switchModalProduct} = useProductsStore()
    const {setAction, switchModalDelete, setLoadingDeleteResponse, setRefetchFunction, setResponse} = useGeneralStore()
    const [deleteProduct, {loading: loadingDelete, data: dataDelete}] = useDeleteProductMutation()

    const setIdToSearch = async()=>{
        await getProduct({
            variables: {
                getProductId: product.id
            }
        })
        if(data?.getProduct?.id){
            setProduct(data.getProduct)
            if(!loading){
                switchModalProduct()
            }
        }

    }

    const showModal = ()=>{
        switchModalDelete()
        setAction(()=>deleteProduct(
            {variables: {
                deleteProductId: product.id as string
            }}
        ))
        setRefetchFunction(()=>refetch())
        
    }

    useEffect(()=>{
        setLoadingDeleteResponse(loadingDelete)
        if(!loadingDelete){
            if(dataDelete?.deleteProduct.status){
                setResponse(dataDelete?.deleteProduct as StatusResponse)
            }
        }
        if(dataDelete?.deleteProduct.status && dataDelete?.deleteProduct.status >= 0){
            setResponse({
                status: dataDelete?.deleteProduct.status,
                message: dataDelete?.deleteProduct.message
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loadingDelete])
  return (
    <div className='flex gap-3 card-shadow'>
        <div className='flex flex-row items-center gap-4'>
            <div className='flex gap-2'>
                <img 
                    src={product.image ?? ''}
                    alt={`Image of ${product.name}`} 
                    className='rounded-tl-lg rounded-bl-lg h-52 w-52 mr-4'
                />
                <div className='flex w-3/5 flex-col justify-center gap'>
                    <h3 className='font-bold text-mobile-lg lg:text-lg'>{product.name}</h3>
                    <p>{product.description}</p>
                    {product.ingredients.length > 0 && (
                        <div>
                            <p className='font-bold text-md'>Ingredientes: </p>
                            <div className='grid grid-cols-2 gap-1'>

                                {product.ingredients.map(ingredient => (
                                    <div 
                                        key={ingredient?.name}
                                        className='flex items-center gap-2 text-md'
                                    >
                                        <p className='font-semi-bold'>{ingredient?.name}</p>
                                        <p className='font-bold text-yellow-main'>X  {ingredient?.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                {product.category === "Pizzas" && (
                    <p className='text-lg font-bold'>Detalles: <span className='text-yellow-main'>Pizza {product.sizePiecesGrams}</span></p>
                )}
                {product.category === "Complementos" && (
                    <p className='text-lg font-bold'>Detalles: <span className='text-yellow-main'>{product.sizePiecesGrams} Piezas</span></p>
                )}
                {product.category === "Dips" && (
                    <p className='text-lg font-bold'>Detalles: <span className='text-yellow-main'>{product.sizePiecesGrams} Gramos</span></p>
                )}
                <p className='text-lg font-bold'>Precio: <span className='text-yellow-main'>{formatAmount(product.price)}</span></p>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center p-5'>
                <button 
                    className='bg-yellow-main px-2 py-1 text-black rounded font-bold text-md'
                    onClick={setIdToSearch}
                >
                    Editar
                </button>
                <button 
                    className='bg-red rounded px-2 py-1 font-bold text-white  text-md'
                    onClick={showModal}
                >   
                    Eliminar
                </button>
            </div>
        </div>
    </div>
  )
}

export default AdminProduct