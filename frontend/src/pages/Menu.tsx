
import MainProductCard from '../components/products/MainProductCard'
import CartInfo from '../components/CartInfo'
import { useGetComplementsQuery, Product } from '../__generated__/types'

const Menu = () => {
    
    const {data: complements} = useGetComplementsQuery({
        variables: {
            categoryInput: "Complementos"
        }
    });
    const {data} = useGetComplementsQuery({
        variables: {
            categoryInput: "Pizzas"
        }
    });

  return (
    <main className='w-4/5 mx-auto mt-12 flex gap-5'>
        <div className='w-full md:w-4/5'>
            <section className=''>
                <h2 className='font-bold text-mobile-3xl md:text-3xl mb-7'>Pizzas</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-2 items-center md:gap-5'>
                    {data?.getComplements?.map((product)=>(
                        <MainProductCard
                            key={product?.id}
                            product={product as Product}
                        />
                    ))}
                </div>
            </section>
            
            <section className='mt-5 pb-10 w-full'>
                <h2 className='font-bold text-mobile-3xl md:text-3xl my-7'>Complementos</h2>
                <div className='w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2 items-center md:gap-5'>
                    {complements?.getComplements?.length && complements?.getComplements?.length > 0 ? complements?.getComplements?.map((product)=>(
                        <MainProductCard
                            key={product?.id}
                            product={product as Product}
                        />
                    )) : (
                        <p>No hay complementos registrados</p>
                    )}
                </div>
            </section>
        </div>
        <div className='hidden md:block md:w-[25%]'>
            <CartInfo/>
        </div>
    </main>
  )
}

export default Menu