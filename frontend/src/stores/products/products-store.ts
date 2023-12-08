import {create} from 'zustand';
import { Product, IngredientQuantity } from '../../__generated__/types';
import { ProductsType } from './types';

const useProductsStore = create<ProductsType>((set)=> ({
    modalProduct: false,
    product: {
        name: "",
        category: "pizzas",
        description: "",
        image: "",
        sizePiecesGrams: "",
        ingredients: [],
        price: 0,
    },
    products: [] as Product[],
    ingredients: [] as IngredientQuantity[],
    complements: [] as Product[],
    switchModalProduct: ()=>set((store)=> ({modalProduct: !store.modalProduct})),
    setComplements: (newComplements: Product[])=>set(()=>({complements: newComplements})),
    setProducts: (newProducts: Product[])=>set(()=>({products: newProducts})),
    setProduct: (newProduct: Product)=>set(()=>({product: newProduct})),
    setIngredients: (newIngredients: IngredientQuantity[]) => set(()=>({ingredients: newIngredients})),
    addIngredient: (ingredient: IngredientQuantity)=>set((store)=>({ingredients: [...store.ingredients, ingredient]})),
    removeIngredient: (name: string)=>set((store)=>({ingredients: store.ingredients.filter(ingredientState => ingredientState.name !== name)}))
}))

export default useProductsStore