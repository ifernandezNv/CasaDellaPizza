import { Product, Address, Promotion, ProductsCartType } from '../../__generated__/types';

export type Payments = "efectivo" | "tcd-entrega" | "tcd-ahora"

export enum PaymentsText {
    "efectivo" = "Efectivo",
    "tdc-entrega" = "Tarjeta de Crédito al entregar el pedido",
    "tdc-ahora" = "Pago en la plataforma"
}

export type Quantity = {
    quantity: number
}

export type UpdatedProduct = {
    product: Product,
    quantity: number
}
export type UpdatedPromotion = {
    promotion: Promotion,
    quantity: number
}
export type DateCardType = {
    month: string,
    year: string
}

export type CardInfoType = {
    name: string,
    ccv: string,
    date: DateCardType,
    ccNumber: string
}
export type CartType = {
    cart: ProductsCartType;
    paymentMethod: Payments,
    address: Address,
    deliveryDate: DateCardType, 
    total: number,
    cardInfo: CardInfoType,
    assistantResult: unknown,
    setAssistantResult: (object: unknown)=>void;
    addProductToCart: (product: UpdatedProduct)=>void;
    addPromotionToCart: (promotion: UpdatedPromotion)=>void;
    removeProductFromCart: (id: string)=>void;
    removePromotionFromCart: (id: string)=>void;
    clearCart: ()=>void; 
    setCart: (newCart: ProductsCartType)=>void;
    setCardInfo: (newInfo: CardInfoType)=>void;
    addProductQuantity: (product: UpdatedProduct)=>void;
    addPromotionQuantity: (promotion: UpdatedPromotion)=>void;
    reduceProductQuantity: (product: UpdatedProduct)=>void;
    reducePromotionQuantity: (promotion: UpdatedPromotion)=>void;
    setAddress: (newAddress: Address)=>void;
    setPaymentMethod: (method: Payments) => void;
    setDeliveryDate: (method: DateCardType) => void;
    setTotal: (newTotal: number)=>void;
}