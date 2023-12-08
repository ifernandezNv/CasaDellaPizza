import {create} from "zustand";
import { IngredientsType } from './types';
import { Ingredient, IngredientQuantity } from "../../__generated__/types";
const useIngredientsStore = create<IngredientsType>((set)=> ({
    ingredient: {
        name: "",
        image: "",
        pricePerPortion: 0,
        zIndex: "one",
        avaliable: false,
    },
    ingredients: [],
    modalIngredient: false,
    setIngredient: (newIngredient: Ingredient | IngredientQuantity)=> set(()=> ({ingredient: newIngredient})),
    setIngredients: (newIngredients: (Ingredient | IngredientQuantity)[])=> set(()=> ({ingredients: newIngredients})),
    switchModalIngredient: ()=>set((store)=>({modalIngredient: !store.modalIngredient}))
}))

export default useIngredientsStore