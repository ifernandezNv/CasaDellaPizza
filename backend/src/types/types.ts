export const typeDefs = `#graphql
#Generic Types
type Preferences{
  alergies: [String],
  favoriteIngredients: [String]
}

type Address {
  street: String!
  block: String!
  houseNumber: String
}

type StatusResponse{
  status: Float
  message: String
}

type UserCredentials{
  _id: String!
  name: String!
  email: String!
  token: String!
}

enum ZIndex{
  one
  two
  three
}
enum Category{
  pizza
  postres
  pollo
  complementos
  dips
}

union ImageRef = Product | Promotion | Ingredient
#Collection types
type User {
  id: ID
  name: String!
  email: String!
  confirmed: Boolean
  password: String!
  preferences: Preferences
  orders: [Order]
  address: Address
  phoneNumber: String
  createdAt: String
  checkPassword(password: String): Boolean
}

type IngredientQuantity{
  name: String
  quantity: Float
}

type Product {
  id: ID
  name: String!
  description: String!
  price: Float!
  category: Category!
  ingredients: [IngredientQuantity]!
}

type Promotion {
  id: ID
  name: String!
  description: String!
  endDate: String
  avaliable: Boolean
  price: Float!
  importantDetail: String
  products: [Product]!
  image: String
}

type Order {
  userId: ID!
  products: [Product]!
  date: String!
  total: Float
}

type Ingredient{
  id: ID
  name: String!
  zIndex: ZIndex
  pricePerPortion: Float
  avaliable: Boolean
}

type Category{
  id: ID
  name: String!
}

type Image{
  id: ID
  name: String!
  format: String!
  reference: ImageRef
  url: String!
}
union AuthUserType = StatusResponse | UserCredentials
input UserCredentialsInput{
  email: String!
  password: String!
}
# Queries
type Query {
  getUsers: [User]
  authUser(userCredentialsInput: UserCredentialsInput): AuthUserType!
  getProducts: [Product]
  getIngredients: [Ingredient]
  getPromotions: [Promotion]
  getOrders: [Order]
  getCategories: [Category]
  getImages: [Image]
}

#Mutations
input UserInput{
  name: String
  email: String
  password: String
}

input UpdateUserInput{
  name: String
  email: String
  password: String
  address: UserInputUpdateAddress
}

input UserInputUpdateAddress{
  street: String!
  block: String!
  houseNumber: String
}

input ProductInput{
  name: String
  category: CategoryInput
  description: String
  price: Float
  ingredients: [IngredientQuantityInput]
  image: String
}

input IngredientInput{
  name: String
  zIndex: ZIndex
  pricePerPortion: Float
  avaliable: Boolean
}

input IngredientQuantityInput{
  name: String
  quantity: Float
}

input CategoryInput{
  name: String
}

input PromotionInput{
  name: String!
  description: String!
  price: Float!
  importantDetail: String
  endDate: String
  avaliable: Boolean
  products: [ProductInput]
  image: String
}

input ImageInput{
  name: String!
  format: String!
  reference: String
  url: String!
}
type Mutation{
  createUser(userInput: UserInput): User!
  createProduct(productInput: ProductInput): Product!
  createIngredient(ingredientInput: IngredientInput): Ingredient!
  createCategory(categoryInput: CategoryInput): StatusResponse!
  createPromotion(promotionInput: PromotionInput): StatusResponse!
  createImage(imageInput: ImageInput): StatusResponse!

  updateUserAddress(id: ID!, userInputUpdateAddress: UserInputUpdateAddress): StatusResponse!
  updateUser(id: ID!, updateUserInput: UpdateUserInput): StatusResponse!
  updateProduct(productInput: ProductInput): Product! 
  updateIngredient(ingredientInput: IngredientInput): StatusResponse!
  updateCategory(categoryInput: CategoryInput): StatusResponse!
  updatePromotion(promotionInput: PromotionInput): StatusResponse!
  updateImage(imageInput: ImageInput): StatusResponse!
  
  deleteUser(id: ID!): StatusResponse!
  deleteProduct(id: ID!): StatusResponse!
  deleteIngredient(id: ID!): StatusResponse!
  deleteCategory(id: ID!): StatusResponse!
  deletePromotion(id: ID!): StatusResponse!
  deleteImage(id: ID!): StatusResponse!
}
`