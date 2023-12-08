import {create} from 'zustand';
import { PromotionsType } from './types';
import { Promotion, Product } from '../../__generated__/types';
const usePromotionsStore = create<PromotionsType>((set)=> ({
    showPromotionModal: false,
    mainPromotionHomePage: {
        description: "",
        name: "",
        price: 0,
        product: [] as Product[]
    },
    mainPromotionPromotionsPage: {
        description: "",
        name: "",
        price: 0,
        product: [] as Product[]
    },
    promotions: [] as Promotion[],
    promotion: {
        id: "",
        description: "",
        name: "",
        price: 0,
        product: [],
        avaliable: false,
        endDate: "",
        image: "",
        importantDetail: ""
    }, 
    products: [],
    switchModalPromotion: ()=>set((store)=>({showPromotionModal: !store.showPromotionModal})),
    setMainPromotionHomePage: (newMainPromotionHomePage: Promotion)=> set(()=>({mainPromotionHomePage: newMainPromotionHomePage})),
    setMainPromotionPromotionsPage: (newMainPromotionPromotionsPage: Promotion)=> set(()=>({mainPromotionPromotionsPage: newMainPromotionPromotionsPage})),
    setPromotions: (newPromotions: Promotion[])=>set(()=>({promotions: newPromotions})),
    setPromotion: (newPromotion: Promotion)=>set(()=>({promotion: newPromotion})),
    addProduct: (product: Product)=>set((store)=>({products: [...store.products, product]})),
    removeProduct: (product: Product)=>set((store)=>({products: store.products.filter(productState => productState.id !== product.id)}))
}))

export default usePromotionsStore