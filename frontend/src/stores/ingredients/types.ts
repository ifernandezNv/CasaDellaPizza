import { Ingredient, IngredientQuantity } from "../../__generated__/types";
export type IngredientsType = {
    ingredient: Ingredient | IngredientQuantity;
    modalIngredient: boolean;
    ingredients: (Ingredient | IngredientQuantity)[];
    setIngredient: (newIngredient: Ingredient | IngredientQuantity) =>void;
    setIngredients: (newIngredients: (Ingredient | IngredientQuantity)[]) =>void;
    switchModalIngredient: ()=>void;
}