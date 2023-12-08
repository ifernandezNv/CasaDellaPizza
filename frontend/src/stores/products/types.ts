import { Product, IngredientQuantity } from "../../__generated__/types";

export type IngredientXQuantity = {
    name: string;
    quantity: number;
}
export type ProductsType = {
    product: Product;
    modalProduct: boolean;
    products: Product[];
    ingredients: IngredientQuantity[];
    complements: Product[];
    setProduct: (newProduct: Product)=>void;
    switchModalProduct: ()=>void;
    setProducts: (newProducts: Product[])=>void;
    addIngredient: (ingredient: IngredientQuantity)=>void;
    removeIngredient: (name: string)=>void;
    setComplements: (newComplements: Product[])=>void;
    setIngredients: (newIngredients: IngredientQuantity[])=>void;
}
