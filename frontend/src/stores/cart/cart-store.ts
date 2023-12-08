import {create} from "zustand";
import { persist } from 'zustand/middleware'

import { CartType, Payments, UpdatedProduct, DateCardType, CardInfoType, UpdatedPromotion } from './types';

import { Address, ProductsCartType, InputMaybe } from "../../__generated__/types";
const useCartStore = create(
    persist(
        (set): CartType => ({
            cart: {
                product: [],
                promotion: []
            },
            paymentMethod: "efectivo" as Payments,
            deliveryDate: {
                month: "",
                year: "",
            },
            address: {
                block: "",
                street: "",
                houseNumber: "",
            },
            total: 0,
            assistantResult: {},
            cardInfo: {
                ccNumber: "",
                ccv: "",
                name: "",
                date: {
                    month: "",
                    year: ""
                },
            },
            addProductToCart: (product: UpdatedProduct)=>set((state)=>{
                const index = state.cart.product?.findIndex(productCart => productCart?.product?.id === product.product.id)
                if(index && index >= 0){
                    if(state.cart?.product && state.cart?.product[index] && state.cart?.product[index]?.product && state.cart?.product[index]?.quantity){
                        const quantity = state.cart.product[index]?.quantity ?? 0
                        const obj = {...state.cart.product[index], quantity: quantity+1}
                        state.cart.product[index] = {...obj}
                    }
                    const filteredProducts = state.cart?.product?.filter(product => product?.product?.name?.length ) ?? []
                    return {
                        cart: {
                            promotion: [...state.cart.promotion ?? []],
                            product: [...filteredProducts]
                        }
                    } as ProductsCartType
                }else{
                    const filteredProducts = state.cart?.product?.filter(product => product?.product?.name?.length ) ?? []
                    return {
                        cart: {
                            promotion: state?.cart?.product?.length ? state.cart.promotion : [],
                            product: [...filteredProducts, {...product, quantity: 1}],
                        } as ProductsCartType
                    }
                }
            }),
            addPromotionToCart: (promotion: UpdatedPromotion)=>set((state)=>{
                if(promotion.promotion.id){
                    const index = state.cart.promotion?.findIndex(promotionCart => promotionCart?.promotion?.name === promotion.promotion.name)
                    if(index && index >= 0){
                        if(state.cart?.promotion && state.cart?.promotion[index] && state.cart?.promotion[index]?.promotion && state.cart?.promotion[index]?.quantity){
                            const quantity = state.cart.promotion[index]?.quantity ?? 0
                            const obj = {...state.cart.promotion[index], quantity: quantity+1}
                            state.cart.promotion[index] = {...obj}
                        }
                        const filteredPromo = state.cart?.promotion?.filter(promo => promo?.promotion?.name?.length ) ?? []
                        return {
                            cart: {
                                product: [...state.cart.product ?? []],
                                promotion: [...filteredPromo]
                            } as ProductsCartType
                        }
                    }else{
                        const filteredPromo = state.cart?.promotion?.filter(promo => promo?.promotion?.name?.length ) ?? []
                        return {
                            cart: {
                                product: state?.cart?.product?.length ? [...state.cart.product] : [],
                                promotion: [...filteredPromo, {...promotion, quantity: 1}],
                            }
                        }
                    }
                }
                return {
                    cart: {...state.cart} as ProductsCartType
                }
            }),
            removeProductFromCart: (id: string)=>set((state)=>{
                const filteredProducts = state.cart?.product?.filter((product: UpdatedProduct) => product?.product?.id !== id) ?? []
                return {
                    cart: {
                        product: [...filteredProducts],
                        promotion: {...state.cart.promotion}
                    }
                }
            }),
            removePromotionFromCart: (id: string)=>set((state)=>{
                const filteredProducts = state.cart?.promotion?.filter((promotion: InputMaybe<UpdatedPromotion>) => promotion?.promotion?.id !== id) ?? []
                return {
                    cart: {
                        promotion: [...filteredProducts],
                        product: {...state.cart.product}
                    } as ProductsCartType
                }
            }),
            addProductQuantity: (product: UpdatedProduct)=>set((state)=>{
                const index = state.cart?.product?.findIndex(cartProduct => cartProduct?.product?.id === product.product.id)
                if(index && index >= 0){
                    if(state.cart?.product && state.cart?.product[index]){
                        const quantity = state?.cart?.product[index]?.quantity ? state.cart.product[index]?.quantity : 1
                        const obj = {...state?.cart?.product[index], quantity: quantity} 
                        state.cart.product[index] = {...obj}
                    }
                    
                }
                return {
                    cart: {...state.cart} as ProductsCartType
                }
            }),
            addPromotionQuantity: (promotion: UpdatedPromotion)=>set((state)=>{
                const index = state.cart?.promotion?.findIndex(cartPromotion => cartPromotion?.promotion?.name === promotion.promotion.name)
                if(index && index >= 0){
                    if(state.cart?.promotion && state.cart?.promotion[index]){
                        const quantity = state?.cart?.promotion[index]?.quantity ? state.cart.promotion[index]?.quantity : 1
                        const obj = {...state?.cart?.promotion[index], quantity: quantity} 
                        state.cart.promotion[index] = {...obj}
                    }
                }
                return {
                    cart: {...state.cart} as ProductsCartType
                }
            }),
            reduceProductQuantity: (product: UpdatedProduct)=>set((state)=>{
                const index = state.cart?.product?.findIndex(cartProduct => cartProduct?.product?.id === product?.product?.id)
                if(index && index >= 0){
                    if(state.cart?.product && state.cart?.product[index]){
                        const quantity = state.cart?.product[index]?.quantity ?? 1;
                        const obj = {...state.cart?.product[index], quantity: quantity+1}
                        state.cart.product[index] = {...obj}
                        return {cart: {...state.cart}}
                        
                    }else if(state.cart?.product && state.cart?.product[index]?.quantity === 1){
                        const filteredProducts = state.cart?.product?.filter((cartProduct: InputMaybe<UpdatedProduct>) => cartProduct.product.id !== product?.product?.id) ?? []
                        return {cart: {
                            product: [...filteredProducts] as InputMaybe<UpdatedProduct>[],
                            promotion: state.cart?.promotion ? [...state.cart.promotion] : [] as InputMaybe<UpdatedPromotion>[]
                        }}
                    }
                }
                return {
                    cart: {...state.cart} as ProductsCartType
                }
            }),
            reducePromotionQuantity: (promotion: UpdatedPromotion)=>set((state)=>{
                const index = state.cart?.promotion?.findIndex(cartPromotion => cartPromotion?.promotion?.name === promotion?.promotion?.name)
                if(index && index >= 0){
                    if(state.cart?.product && state.cart?.product[index]){
                        const quantity = state.cart?.product[index]?.quantity ?? 1;
                        const obj = {...state.cart?.product[index], quantity: quantity+1}
                        state.cart.product[index] = {...obj}
                        return {cart: {...state.cart}}
                        
                    }else if(state.cart?.product && state.cart?.product[index]?.quantity === 1){
                        const filteredProducts = state.cart?.product?.filter((cartProduct: InputMaybe<UpdatedProduct>) => cartProduct.product.id !== product?.product?.id) ?? []
                        return {cart: {
                            product: [...filteredProducts],
                            promotion: state.cart?.promotion ? [...state.cart.promotion] : []
                        }}
                    }
                }
                return {
                    cart: {...state.cart} as ProductsCartType
                }
            }),
            clearCart: ()=>set(()=>({
                cart: {
                    product: [],
                    promotion: []
            }})),
            setAddress: (newAddress: Address)=>set(()=>({address: newAddress})),
            setCart: (newCart: ProductsCartType)=>set(()=>({cart: newCart})),
            setCardInfo: (newInfo: CardInfoType)=>set(()=>({cardInfo: newInfo})),
            setPaymentMethod: (payment: Payments)=>set(()=>({paymentMethod: payment})),
            setAssistantResult: (object: unknown)=>set(()=>({assistantResult: object})),
            setDeliveryDate: (newDeliveryDate: DateCardType)=>set(()=>({deliveryDate: newDeliveryDate})),
            setTotal: (newTotal: number)=>set(()=>({total: newTotal}))
    }),
    {
        name: "cart-storage",
        partialize: (state: CartType) => ({ 
            cart: state.cart,
            paymentMethod: state.paymentMethod,
            address: state.address,
            deliveryDate: state.deliveryDate,
        }),
    }

    )
)

export default useCartStore