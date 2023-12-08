import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  block: Scalars['String']['output'];
  houseNumber?: Maybe<Scalars['String']['output']>;
  street: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Image = {
  __typename?: 'Image';
  format: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  reference?: Maybe<ImageRef>;
  url: Scalars['String']['output'];
};

export type ImageInput = {
  format?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ImageRef = Ingredient | Product | Promotion;

export type Ingredient = {
  __typename?: 'Ingredient';
  avaliable?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  pricePerPortion?: Maybe<Scalars['Float']['output']>;
  zIndex?: Maybe<ZIndex>;
};

export type IngredientInput = {
  avaliable: Scalars['Boolean']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  pricePerPortion: Scalars['Float']['input'];
  zIndex: ZIndex;
};

export type IngredientQuantity = {
  __typename?: 'IngredientQuantity';
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

export type IngredientQuantityInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type IngredientXQuantity = {
  __typename?: 'IngredientXQuantity';
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: StatusResponse;
  createImage: StatusResponse;
  createIngredient: StatusResponseIngredient;
  createOrder: StatusResponseOrder;
  createProduct: StatusResponseCreateProduct;
  createPromotion: StatusResponsePromotion;
  createUser: StatusResponseCreateUser;
  deleteCategory: StatusResponse;
  deleteImage: StatusResponse;
  deleteIngredient: StatusResponse;
  deleteProduct: StatusResponse;
  deletePromotion: StatusResponse;
  deleteUser: StatusResponse;
  updateCategory: StatusResponse;
  updateImage: StatusResponse;
  updateIngredient: StatusResponse;
  updateOrderStatus: StatusResponseOrderStatusUpdate;
  updateProduct: StatusResponseCreateProduct;
  updatePromotion: StatusResponse;
  updatePromotionStatus: StatusResponse;
  updateUser: StatusResponse;
  updateUserAddress: StatusResponse;
};


export type MutationCreateCategoryArgs = {
  categoryInput?: InputMaybe<CategoryInput>;
};


export type MutationCreateImageArgs = {
  imageInput?: InputMaybe<ImageInput>;
};


export type MutationCreateIngredientArgs = {
  ingredientInput?: InputMaybe<IngredientInput>;
};


export type MutationCreateOrderArgs = {
  orderInput?: InputMaybe<OrderInput>;
};


export type MutationCreateProductArgs = {
  productInput?: InputMaybe<ProductInput>;
};


export type MutationCreatePromotionArgs = {
  promotionInput?: InputMaybe<PromotionInput>;
};


export type MutationCreateUserArgs = {
  userInput?: InputMaybe<UserInput>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteIngredientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePromotionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  categoryInput?: InputMaybe<CategoryInput>;
};


export type MutationUpdateImageArgs = {
  imageInput?: InputMaybe<ImageInput>;
};


export type MutationUpdateIngredientArgs = {
  ingredientInput?: InputMaybe<IngredientInput>;
};


export type MutationUpdateOrderStatusArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatusEnum>;
};


export type MutationUpdateProductArgs = {
  productInput?: InputMaybe<UpdateProductInput>;
};


export type MutationUpdatePromotionArgs = {
  promotionInput?: InputMaybe<PromotionInput>;
};


export type MutationUpdatePromotionStatusArgs = {
  promotionId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  updateUserInput?: InputMaybe<UpdateUserInput>;
};


export type MutationUpdateUserAddressArgs = {
  id: Scalars['ID']['input'];
  userInputUpdateAddress?: InputMaybe<UserInputUpdateAddress>;
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Address>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  statusOrder?: Maybe<OrderStatusEnum>;
  total?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type OrderInput = {
  address?: InputMaybe<UserInputUpdateAddress>;
  date?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<ProductsCartType>;
  statusOrder?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderStatusEnum =
  | 'baking'
  | 'lastDetails'
  | 'onItsWay'
  | 'pending'
  | 'received';

export type Preferences = {
  __typename?: 'Preferences';
  alergies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  favoriteIngredients?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Maybe<IngredientQuantity>>>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  sizePiecesGrams?: Maybe<Scalars['String']['output']>;
};

export type ProductInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<InputMaybe<IngredientQuantityInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sizePiecesGrams?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsCartType = {
  product?: InputMaybe<Array<InputMaybe<UpdatedProduct>>>;
  promotion?: InputMaybe<Array<InputMaybe<UpdatedPromotion>>>;
};

export type Promotion = {
  __typename?: 'Promotion';
  avaliable?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  importantDetail?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Array<Maybe<Product>>>;
};

export type PromotionInput = {
  avaliable?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  importantDetail?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  product?: InputMaybe<Array<InputMaybe<ProductInput>>>;
};

export type Quantity = {
  __typename?: 'Quantity';
  quantity?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  authUser: StatusResponseUserAuth;
  getCategories?: Maybe<Array<Maybe<Category>>>;
  getComplements?: Maybe<Array<Maybe<Product>>>;
  getDoughTypes?: Maybe<Array<Maybe<Ingredient>>>;
  getImages?: Maybe<Array<Maybe<Image>>>;
  getIngredient?: Maybe<Ingredient>;
  getIngredients?: Maybe<Array<Maybe<Ingredient>>>;
  getOrder?: Maybe<Order>;
  getOrders?: Maybe<Array<Maybe<Order>>>;
  getPizzas?: Maybe<Array<Maybe<Product>>>;
  getProduct?: Maybe<Product>;
  getProducts?: Maybe<Array<Maybe<Product>>>;
  getPromotion?: Maybe<Promotion>;
  getPromotions?: Maybe<Array<Maybe<Promotion>>>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryAuthUserArgs = {
  userCredentialsInput?: InputMaybe<UserCredentialsInput>;
};


export type QueryGetComplementsArgs = {
  categoryInput?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetIngredientArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOrderArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProductArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPromotionArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ReferencesInput = {
  alergies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  favoriteIngredients?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StatusResponse = {
  __typename?: 'StatusResponse';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type StatusResponseCreateOrder = {
  __typename?: 'StatusResponseCreateOrder';
  address?: Maybe<Address>;
  id?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  status: Scalars['Float']['output'];
  statusOrder?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type StatusResponseCreateProduct = {
  __typename?: 'StatusResponseCreateProduct';
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Maybe<IngredientXQuantity>>>;
  message: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  sizePiecesGrams?: Maybe<Scalars['String']['output']>;
  status: Scalars['Float']['output'];
};

export type StatusResponseCreateUser = {
  __typename?: 'StatusResponseCreateUser';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status: Scalars['Float']['output'];
};

export type StatusResponseIngredient = {
  __typename?: 'StatusResponseIngredient';
  avaliable?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pricePerPortion?: Maybe<Scalars['Float']['output']>;
  status: Scalars['Float']['output'];
  zIndex?: Maybe<ZIndex>;
};

export type StatusResponseOrder = {
  __typename?: 'StatusResponseOrder';
  id?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type StatusResponseOrderStatusUpdate = {
  __typename?: 'StatusResponseOrderStatusUpdate';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type StatusResponsePromotion = {
  __typename?: 'StatusResponsePromotion';
  avaliable?: Maybe<Scalars['Boolean']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Array<Maybe<Product>>>;
  status: Scalars['Float']['output'];
};

export type StatusResponseUserAuth = {
  __typename?: 'StatusResponseUserAuth';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status: Scalars['Float']['output'];
  token?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<Scalars['String']['output']>;
};

export type UpdateProductInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<ProductInput>;
};

export type UpdateUserInput = {
  address?: InputMaybe<UserInputUpdateAddress>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatedProduct = {
  product?: InputMaybe<ProductInput>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatedPromotion = {
  promotion?: InputMaybe<PromotionInput>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  checkPassword?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  preferences?: Maybe<Preferences>;
  userType?: Maybe<UserTypeEnum>;
};


export type UserCheckPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserCredentials = {
  __typename?: 'UserCredentials';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UserCredentialsInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserInput = {
  address?: InputMaybe<UserInputUpdateAddress>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<ReferencesInput>;
  userType?: InputMaybe<Scalars['String']['input']>;
};

export type UserInputUpdateAddress = {
  block?: InputMaybe<Scalars['String']['input']>;
  houseNumber?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UserTypeEnum =
  | 'admin'
  | 'user';

export type ZIndex =
  | 'one'
  | 'three'
  | 'two';



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  ImageRef: ( Ingredient ) | ( Product ) | ( Promotion );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Omit<Image, 'reference'> & { reference?: Maybe<ResolversTypes['ImageRef']> }>;
  ImageInput: ImageInput;
  ImageRef: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ImageRef']>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  IngredientInput: IngredientInput;
  IngredientQuantity: ResolverTypeWrapper<IngredientQuantity>;
  IngredientQuantityInput: IngredientQuantityInput;
  IngredientXQuantity: ResolverTypeWrapper<IngredientXQuantity>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderInput: OrderInput;
  OrderStatusEnum: OrderStatusEnum;
  Preferences: ResolverTypeWrapper<Preferences>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  ProductsCartType: ProductsCartType;
  Promotion: ResolverTypeWrapper<Promotion>;
  PromotionInput: PromotionInput;
  Quantity: ResolverTypeWrapper<Quantity>;
  Query: ResolverTypeWrapper<{}>;
  ReferencesInput: ReferencesInput;
  StatusResponse: ResolverTypeWrapper<StatusResponse>;
  StatusResponseCreateOrder: ResolverTypeWrapper<StatusResponseCreateOrder>;
  StatusResponseCreateProduct: ResolverTypeWrapper<StatusResponseCreateProduct>;
  StatusResponseCreateUser: ResolverTypeWrapper<StatusResponseCreateUser>;
  StatusResponseIngredient: ResolverTypeWrapper<StatusResponseIngredient>;
  StatusResponseOrder: ResolverTypeWrapper<StatusResponseOrder>;
  StatusResponseOrderStatusUpdate: ResolverTypeWrapper<StatusResponseOrderStatusUpdate>;
  StatusResponsePromotion: ResolverTypeWrapper<StatusResponsePromotion>;
  StatusResponseUserAuth: ResolverTypeWrapper<StatusResponseUserAuth>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  UpdatedProduct: UpdatedProduct;
  UpdatedPromotion: UpdatedPromotion;
  User: ResolverTypeWrapper<User>;
  UserCredentials: ResolverTypeWrapper<UserCredentials>;
  UserCredentialsInput: UserCredentialsInput;
  UserInput: UserInput;
  UserInputUpdateAddress: UserInputUpdateAddress;
  UserTypeEnum: UserTypeEnum;
  ZIndex: ZIndex;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryInput: CategoryInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Image: Omit<Image, 'reference'> & { reference?: Maybe<ResolversParentTypes['ImageRef']> };
  ImageInput: ImageInput;
  ImageRef: ResolversUnionTypes<ResolversParentTypes>['ImageRef'];
  Ingredient: Ingredient;
  IngredientInput: IngredientInput;
  IngredientQuantity: IngredientQuantity;
  IngredientQuantityInput: IngredientQuantityInput;
  IngredientXQuantity: IngredientXQuantity;
  Mutation: {};
  Order: Order;
  OrderInput: OrderInput;
  Preferences: Preferences;
  Product: Product;
  ProductInput: ProductInput;
  ProductsCartType: ProductsCartType;
  Promotion: Promotion;
  PromotionInput: PromotionInput;
  Quantity: Quantity;
  Query: {};
  ReferencesInput: ReferencesInput;
  StatusResponse: StatusResponse;
  StatusResponseCreateOrder: StatusResponseCreateOrder;
  StatusResponseCreateProduct: StatusResponseCreateProduct;
  StatusResponseCreateUser: StatusResponseCreateUser;
  StatusResponseIngredient: StatusResponseIngredient;
  StatusResponseOrder: StatusResponseOrder;
  StatusResponseOrderStatusUpdate: StatusResponseOrderStatusUpdate;
  StatusResponsePromotion: StatusResponsePromotion;
  StatusResponseUserAuth: StatusResponseUserAuth;
  String: Scalars['String']['output'];
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  UpdatedProduct: UpdatedProduct;
  UpdatedPromotion: UpdatedPromotion;
  User: User;
  UserCredentials: UserCredentials;
  UserCredentialsInput: UserCredentialsInput;
  UserInput: UserInput;
  UserInputUpdateAddress: UserInputUpdateAddress;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  block?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  houseNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference?: Resolver<Maybe<ResolversTypes['ImageRef']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageRefResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageRef'] = ResolversParentTypes['ImageRef']> = {
  __resolveType: TypeResolveFn<'Ingredient' | 'Product' | 'Promotion', ParentType, ContextType>;
};

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  avaliable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricePerPortion?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  zIndex?: Resolver<Maybe<ResolversTypes['ZIndex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientQuantityResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientQuantity'] = ResolversParentTypes['IngredientQuantity']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientXQuantityResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientXQuantity'] = ResolversParentTypes['IngredientXQuantity']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationCreateCategoryArgs>>;
  createImage?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationCreateImageArgs>>;
  createIngredient?: Resolver<ResolversTypes['StatusResponseIngredient'], ParentType, ContextType, Partial<MutationCreateIngredientArgs>>;
  createOrder?: Resolver<ResolversTypes['StatusResponseOrder'], ParentType, ContextType, Partial<MutationCreateOrderArgs>>;
  createProduct?: Resolver<ResolversTypes['StatusResponseCreateProduct'], ParentType, ContextType, Partial<MutationCreateProductArgs>>;
  createPromotion?: Resolver<ResolversTypes['StatusResponsePromotion'], ParentType, ContextType, Partial<MutationCreatePromotionArgs>>;
  createUser?: Resolver<ResolversTypes['StatusResponseCreateUser'], ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteCategory?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteImage?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationDeleteImageArgs, 'id'>>;
  deleteIngredient?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationDeleteIngredientArgs, 'id'>>;
  deleteProduct?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deletePromotion?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationDeletePromotionArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateCategory?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationUpdateCategoryArgs>>;
  updateImage?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationUpdateImageArgs>>;
  updateIngredient?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationUpdateIngredientArgs>>;
  updateOrderStatus?: Resolver<ResolversTypes['StatusResponseOrderStatusUpdate'], ParentType, ContextType, Partial<MutationUpdateOrderStatusArgs>>;
  updateProduct?: Resolver<ResolversTypes['StatusResponseCreateProduct'], ParentType, ContextType, Partial<MutationUpdateProductArgs>>;
  updatePromotion?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationUpdatePromotionArgs>>;
  updatePromotionStatus?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, Partial<MutationUpdatePromotionStatusArgs>>;
  updateUser?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  updateUserAddress?: Resolver<ResolversTypes['StatusResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserAddressArgs, 'id'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  statusOrder?: Resolver<Maybe<ResolversTypes['OrderStatusEnum']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences']> = {
  alergies?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  favoriteIngredients?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ingredients?: Resolver<Maybe<Array<Maybe<ResolversTypes['IngredientQuantity']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sizePiecesGrams?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromotionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Promotion'] = ResolversParentTypes['Promotion']> = {
  avaliable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  importantDetail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  product?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quantity'] = ResolversParentTypes['Quantity']> = {
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authUser?: Resolver<ResolversTypes['StatusResponseUserAuth'], ParentType, ContextType, Partial<QueryAuthUserArgs>>;
  getCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  getComplements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, Partial<QueryGetComplementsArgs>>;
  getDoughTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ingredient']>>>, ParentType, ContextType>;
  getImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  getIngredient?: Resolver<Maybe<ResolversTypes['Ingredient']>, ParentType, ContextType, Partial<QueryGetIngredientArgs>>;
  getIngredients?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ingredient']>>>, ParentType, ContextType>;
  getOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, Partial<QueryGetOrderArgs>>;
  getOrders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  getPizzas?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  getProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryGetProductArgs>>;
  getProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  getPromotion?: Resolver<Maybe<ResolversTypes['Promotion']>, ParentType, ContextType, Partial<QueryGetPromotionArgs>>;
  getPromotions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Promotion']>>>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type StatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponse'] = ResolversParentTypes['StatusResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseCreateOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseCreateOrder'] = ResolversParentTypes['StatusResponseCreateOrder']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  statusOrder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseCreateProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseCreateProduct'] = ResolversParentTypes['StatusResponseCreateProduct']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ingredients?: Resolver<Maybe<Array<Maybe<ResolversTypes['IngredientXQuantity']>>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sizePiecesGrams?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseCreateUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseCreateUser'] = ResolversParentTypes['StatusResponseCreateUser']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseIngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseIngredient'] = ResolversParentTypes['StatusResponseIngredient']> = {
  avaliable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pricePerPortion?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  zIndex?: Resolver<Maybe<ResolversTypes['ZIndex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseOrder'] = ResolversParentTypes['StatusResponseOrder']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseOrderStatusUpdateResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseOrderStatusUpdate'] = ResolversParentTypes['StatusResponseOrderStatusUpdate']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponsePromotionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponsePromotion'] = ResolversParentTypes['StatusResponsePromotion']> = {
  avaliable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  product?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResponseUserAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusResponseUserAuth'] = ResolversParentTypes['StatusResponseUserAuth']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  checkPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<UserCheckPasswordArgs>>;
  confirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferences?: Resolver<Maybe<ResolversTypes['Preferences']>, ParentType, ContextType>;
  userType?: Resolver<Maybe<ResolversTypes['UserTypeEnum']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCredentialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCredentials'] = ResolversParentTypes['UserCredentials']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImageRef?: ImageRefResolvers<ContextType>;
  Ingredient?: IngredientResolvers<ContextType>;
  IngredientQuantity?: IngredientQuantityResolvers<ContextType>;
  IngredientXQuantity?: IngredientXQuantityResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Preferences?: PreferencesResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Promotion?: PromotionResolvers<ContextType>;
  Quantity?: QuantityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StatusResponse?: StatusResponseResolvers<ContextType>;
  StatusResponseCreateOrder?: StatusResponseCreateOrderResolvers<ContextType>;
  StatusResponseCreateProduct?: StatusResponseCreateProductResolvers<ContextType>;
  StatusResponseCreateUser?: StatusResponseCreateUserResolvers<ContextType>;
  StatusResponseIngredient?: StatusResponseIngredientResolvers<ContextType>;
  StatusResponseOrder?: StatusResponseOrderResolvers<ContextType>;
  StatusResponseOrderStatusUpdate?: StatusResponseOrderStatusUpdateResolvers<ContextType>;
  StatusResponsePromotion?: StatusResponsePromotionResolvers<ContextType>;
  StatusResponseUserAuth?: StatusResponseUserAuthResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserCredentials?: UserCredentialsResolvers<ContextType>;
};


export type GetIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIngredientsQuery = { __typename?: 'Query', getIngredients?: Array<{ __typename?: 'Ingredient', name: string, zIndex?: ZIndex | null, pricePerPortion?: number | null } | null> | null };


export const GetIngredientsDocument = gql`
    query GetIngredients {
  getIngredients {
    name
    zIndex
    pricePerPortion
  }
}
    `;

/**
 * __useGetIngredientsQuery__
 *
 * To run a query within a React component, call `useGetIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<GetIngredientsQuery, GetIngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIngredientsQuery, GetIngredientsQueryVariables>(GetIngredientsDocument, options);
      }
export function useGetIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIngredientsQuery, GetIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIngredientsQuery, GetIngredientsQueryVariables>(GetIngredientsDocument, options);
        }
export type GetIngredientsQueryHookResult = ReturnType<typeof useGetIngredientsQuery>;
export type GetIngredientsLazyQueryHookResult = ReturnType<typeof useGetIngredientsLazyQuery>;
export type GetIngredientsQueryResult = Apollo.QueryResult<GetIngredientsQuery, GetIngredientsQueryVariables>;