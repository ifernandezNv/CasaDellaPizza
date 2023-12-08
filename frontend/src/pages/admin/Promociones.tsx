import MainButton from "../../reusable/MainButton"
import PromotionForm from "../../components/forms/PromotionForm"
import usePromotionsStore from "../../stores/promotions/promotions-store"
import { Promotion, useGetPromotionsQuery } from "../../__generated__/types"
import AdminPromotion from "../../components/promotions/AdminPromotion"
const PromocionesAdmin = () => {
  const {data} = useGetPromotionsQuery()
  const {switchModalPromotion, setPromotion} = usePromotionsStore()

  const handleCreatePromotion = ()=>{
    setPromotion({
      description: "",
      name: "",
      price: 0,
      products: [],
      avaliable: false,
      endDate: "",
      image: "",
      importantDetail: "",
    })
    switchModalPromotion()
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-mobile-2xl lg:text-2xl">Promociones</h2>
          <p className="text-mobile-md lg:text-md mt-5">Crea, actualiza y elimina promociones</p>
        </div>
        <MainButton 
          content="Crear Promoción"
          classes="font-normal text-md"
          action={handleCreatePromotion}
        />
      </div>
      <div className="border border-black border-opacity-20 rounded h-1"></div>
      <main className="flex flex-col gap-5 mt-7">
        {data?.getPromotions && data?.getPromotions.length >0 ? data?.getPromotions?.map((promotion: Promotion | null | undefined) => (
          <AdminPromotion 
            key={promotion?.id}
            promotion={promotion ?? {} as Promotion}
          />
        )) : (
          <p className='uppercase text-lg font-extraligh'>No hay promociones</p>

        )}
      </main>

      <PromotionForm /> 
    </>
  )
}

export default PromocionesAdmin