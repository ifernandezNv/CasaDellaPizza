import { 
    IngredientInput, 
    UserInput,
    UserCredentialsInput, 
    ProductInput, 
    UserInputUpdateAddress, 
    UpdateUserInput,
    CategoryInput,
    ImageInput,
    PromotionInput,
    OrderInput,
    UpdateProductInput,
    OrderStatusEnum,
} from '../__generated__/types'

//User Types
export type CreateUserType = {
    userInput: UserInput
}
export type UpdateUserType = {
    id: string,
    updateUserInput: UpdateUserInput
}
export type DeleteUserType = {
    id: string,
}

export type GetUserInfo = {
    id: string
}
//Product Types
export type GetComplements = {
    categoryInput: string
}
export type GetProduct = {
    id: string
}

export type CreateProductType = {
    productInput: ProductInput
}

export type UpdateProductType = {
    productInput: UpdateProductInput
}


// Ingredients
export type GetIngredientInfo = {
    name: string
}
export type CreateIngredientType = {
    ingredientInput: IngredientInput
}

export type UpdateIngredientType = {
    id: string,
    ingredientInput: IngredientInput
}
export type DeleteIngredientType = {
    id: string,
}

// Address
export type CreateAddressType = {
    id: string,
    userInputUpdateAddress: UserInputUpdateAddress
}
//Login validation type
export type UserCredentialsType = {
    userCredentialsInput: UserCredentialsInput
}


//Category Types
export type CreateCategoryType = {
    categoryInput: CategoryInput
}
export type UpdateCategoryType = {
    id: string,
    categoryInput: CategoryInput
}

//Image Types
export type CreateImageType = {
    name: string
    url: Promise<string | undefined>
    format: string
    reference: string
    imageInput: ImageInput
}
export type UpdateImageType = {
    id: string,
    imageInput: ImageInput
}

//Promotions Types
export type CreatePromotionType = {
    promotionInput: PromotionInput
}
export type UpdatePromotionStatusType = {
    promotionId: string
}
export type GetPromotion = {
    id: string
}


//Order Type
export type CreateOrderType = {
    orderInput: OrderInput
}
export type UpdateOrderStatus = {
    id: string,
    status: OrderStatusEnum
}
export type GetOrderInfo = {
    id: string
}
