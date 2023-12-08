import { Promotion, Product } from "../../__generated__/types";

export type PromotionsType = {
    showPromotionModal: boolean;
    mainPromotionHomePage: Promotion;
    mainPromotionPromotionsPage: Promotion;
    promotions: Promotion[];
    promotion: Promotion;
    products: Product[];
    switchModalPromotion: ()=>void;
    setMainPromotionHomePage: (newMainPromotionHomePage: Promotion) => void;
    setPromotions: (newPromotions: Promotion[]) => void;
    setPromotion: (newPromotion: Promotion) => void;
    setMainPromotionPromotionsPage: (newMainPromotionHomePage: Promotion) => void;
    addProduct: (product: Product)=>void;
    removeProduct: (product: Product)=>void;
}
