import {useEffect, useMemo} from 'react';

import { useGetProductsQuery, Product } from "../../__generated__/types"
import ProductForm from "../../components/forms/ProductForm"
import MainButton from "../../reusable/MainButton"
import useProductsStore from "../../stores/products/products-store"
import AdminProduct from '../../components/products/AdminProduct';

const Productos = () => {
  const {data: products} = useGetProductsQuery();

  const memoizedProducts: Product[] = useMemo(()=>{
    return products?.getProducts ?? [] as Product[]
  },[products?.getProducts])

  const {switchModalProduct, setProduct} = useProductsStore()

  const handleShowForm = ()=>{
    switchModalProduct()
    setProduct({
      category: "Pizzas",
      description: "", 
      image: "",
      ingredients: [],
      name: "",
      price: 0,
      id: "",
    })
  }

  useEffect(()=>{
    setProduct({
      category: "pizza",
      description: "", 
      image: "",
      ingredients: [],
      name: "",
      price: 0,
      id: "",
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-mobile-2xl lg:text-2xl">Productos</h2>
          <p className="text-mobile-md lg:text-md mt-5">Crea y actualiza tus productos</p>
        </div>
        <MainButton 
          content="Crear Producto"
          classes="font-normal text-md"
          action={handleShowForm}
        />
      </div>
      <div className="border border-black border-opacity-20 rounded h-1"></div>
      <main className="flex flex-col gap-5 mt-7">
        {memoizedProducts && memoizedProducts?.length ? memoizedProducts?.map((product: Product) => (
          <AdminProduct 
            key={product?.id}
            product={product}
          
          />
        )) : (
          <p className='uppercase text-lg font-extraligh'>No hay productos</p>

        )}
      </main>
      <ProductForm />
    </>
  )
}

export default Productos