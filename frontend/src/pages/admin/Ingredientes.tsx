import {useMemo} from 'react';

import { Ingredient, useGetIngredientsLazyQuery } from "../../__generated__/types";
import IngredientsForm from "../../components/forms/IngredientsForm";
import MainButton from "../../reusable/MainButton";
import useIngredientsStore from "../../stores/ingredients/useIngredients";
import AdminIngredient from '../../components/ingredients/AdminIngredient';
const Ingredientes = () => {
  const [getIngredients, {data}] = useGetIngredientsLazyQuery();
  const {switchModalIngredient} = useIngredientsStore()

  const memoizedIngredients = useMemo(()=>{
    getIngredients()
    if(data?.getIngredients){
      return data?.getIngredients; 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-mobile-2xl lg:text-2xl">Ingredientes</h2>
          <p className="text-mobile-md lg:text-md mt-5">Crea nuevos ingredientes y actualiza su estado</p>
        </div>
        <MainButton 
          content="Crear Ingrediente"
          classes="font-normal text-md"
          action={switchModalIngredient}
        />
      </div>
      <div className="border border-black border-opacity-20 rounded h-1"></div>
      <main className="flex flex-col gap-5 mt-7 pb-10">
        {memoizedIngredients?.length ? memoizedIngredients?.map(ingredient => (
          <AdminIngredient 
            key={ingredient?.id}
            ingredient={ingredient as Ingredient}
          />
        )): 
          <p className='uppercase text-lg font-extraligh'>No hay ingredientes</p>
        }
      </main>
      <IngredientsForm />
    </>
  )
}

export default Ingredientes