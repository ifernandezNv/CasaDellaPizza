
import { useGetCategoriesQuery } from '../../__generated__/types'

const Categorias = () => {
  const {data} = useGetCategoriesQuery()
  return (
    <>
      <h2 className="font-bold text-mobile-2xl lg:text-2xl">Categorias</h2>
      <p className="text-mobile-md lg:text-md mt-5">Administra las categorías</p>
      <div className="border border-black border-opacity-20 rounded h-1"></div>
      <main className="grid grid-cols-3 mt-7">
        {data?.getCategories?.length ? data?.getCategories.map(category => (
          <div key={category?.id} className='flex card-shadow w-1/3 p-3'>
            <p>{category?.name}</p>
          </div>
        )) : 
          <p>No hay</p>
        }
      </main>
    </>
  )
}

export default Categorias