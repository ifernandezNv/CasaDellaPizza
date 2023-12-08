import {useEffect, useState} from "react"
import useSWR from "swr"
import {ClockLoader} from "react-spinners";

import { Order, useGetOrdersQuery } from "../../__generated__/types"
import OrderCard from "../../components/orders/OrderCard";
const Pedidos = () => {
  // const [getOrder, {data, loading: isLoading}] = useGetOrdersLazyQuery()
  // const {data, isLoading} = useSWR(getOrder)
  const {data, loading: isLoading} = useGetOrdersQuery()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(()=>{
    if(data?.getOrders){
      setOrders(data?.getOrders as Order[])
    }
  }, [data])
  return (
    <>
      {!isLoading && (
        <>
          <h2 className="font-bold text-mobile-2xl lg:text-2xl">Pedidos</h2>
          <p className="text-mobile-md lg:text-md mt-5">Administra los pedidos y actualiza su estado</p>
          <div className="border border-black border-opacity-20 rounded h-1"></div>
          <main className="flex flex-col mt-7">
            {isLoading && !data ? (
              <div className='w-full p-2 flex items-center justify-center'>
                <ClockLoader 
                    loading={isLoading}
                    color="#E4A400" 
                />
              </div>
            ): (
              <div className="flex flex-col gap-3 mb-5">
                {orders.length && orders.length > 0 ? orders?.map(order => (
                  <OrderCard
                    key={order?.id}
                    order={order}
                  />
                )):
                  <p className='uppercase text-lg font-extraligh'>No hay pedidos</p>
                }
              </div>
            )}
          </main>
        </>
      ) }
      
    </>
  )
}

export default Pedidos