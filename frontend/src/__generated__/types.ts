import { GraphQLResolveInfo } from 'graphql';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
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
  status?: InputMaybe<Scalars['String']['input']>;
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


export type CreateCategoryMutationVariables = Exact<{
  categoryInput?: InputMaybe<CategoryInput>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'StatusResponse', status: number, message: string } };

export type CreateIngredientMutationVariables = Exact<{
  ingredientInput?: InputMaybe<IngredientInput>;
}>;


export type CreateIngredientMutation = { __typename?: 'Mutation', createIngredient: { __typename?: 'StatusResponseIngredient', status: number, id?: string | null, message: string, name?: string | null, image?: string | null, avaliable?: boolean | null, pricePerPortion?: number | null, zIndex?: ZIndex | null } };

export type CreateOrderMutationVariables = Exact<{
  orderInput?: InputMaybe<OrderInput>;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'StatusResponseOrder', status: number, message: string, id?: string | null } };

export type CreateProductMutationVariables = Exact<{
  productInput?: InputMaybe<ProductInput>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'StatusResponseCreateProduct', status: number, message: string, id?: string | null, name?: string | null, description?: string | null, category?: string | null, sizePiecesGrams?: string | null, image?: string | null, price?: number | null, ingredients?: Array<{ __typename?: 'IngredientXQuantity', name?: string | null, quantity?: number | null } | null> | null } };

export type CreatePromotionMutationVariables = Exact<{
  promotionInput?: InputMaybe<PromotionInput>;
}>;


export type CreatePromotionMutation = { __typename?: 'Mutation', createPromotion: { __typename?: 'StatusResponsePromotion', status: number, message: string, id?: string | null, name?: string | null, price?: number | null, image?: string | null, avaliable?: boolean | null, endDate?: string | null, product?: Array<{ __typename?: 'Product', name?: string | null, sizePiecesGrams?: string | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', name?: string | null, quantity?: number | null } | null> | null } | null> | null } };

export type CreateUserMutationVariables = Exact<{
  userInput?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'StatusResponseCreateUser', status: number, message: string, id?: string | null, name?: string | null, email?: string | null } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'StatusResponse', status: number, message: string } };

export type DeleteIngredientMutationVariables = Exact<{
  deleteIngredientId: Scalars['ID']['input'];
}>;


export type DeleteIngredientMutation = { __typename?: 'Mutation', deleteIngredient: { __typename?: 'StatusResponse', status: number, message: string } };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'StatusResponse', status: number, message: string } };

export type DeletePromotionMutationVariables = Exact<{
  deletePromotionId: Scalars['ID']['input'];
}>;


export type DeletePromotionMutation = { __typename?: 'Mutation', deletePromotion: { __typename?: 'StatusResponse', status: number, message: string } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'StatusResponse', status: number, message: string } };

export type UpdateIngredientMutationVariables = Exact<{
  ingredientInput?: InputMaybe<IngredientInput>;
}>;


export type UpdateIngredientMutation = { __typename?: 'Mutation', updateIngredient: { __typename?: 'StatusResponse', status: number, message: string } };

export type UpdateOrderStatusMutationVariables = Exact<{
  updateOrderStatusId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatusEnum>;
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus: { __typename?: 'StatusResponseOrderStatusUpdate', status: number, message: string } };

export type UpdateProductMutationVariables = Exact<{
  productInput?: InputMaybe<UpdateProductInput>;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'StatusResponseCreateProduct', status: number, message: string, id?: string | null, name?: string | null, description?: string | null, category?: string | null, sizePiecesGrams?: string | null, image?: string | null, price?: number | null, ingredients?: Array<{ __typename?: 'IngredientXQuantity', name?: string | null, quantity?: number | null } | null> | null } };

export type UpdatePromotionMutationVariables = Exact<{
  promotionInput?: InputMaybe<PromotionInput>;
}>;


export type UpdatePromotionMutation = { __typename?: 'Mutation', updatePromotion: { __typename?: 'StatusResponse', status: number, message: string } };

export type UpdatePromotionStatusMutationVariables = Exact<{
  promotionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdatePromotionStatusMutation = { __typename?: 'Mutation', updatePromotionStatus: { __typename?: 'StatusResponse', status: number, message: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateUserInput?: InputMaybe<UpdateUserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'StatusResponse', status: number, message: string } };

export type UpdateUserAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateUserAddressInput?: InputMaybe<UserInputUpdateAddress>;
}>;


export type UpdateUserAddressMutation = { __typename?: 'Mutation', updateUserAddress: { __typename?: 'StatusResponse', status: number, message: string } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', id?: string | null, name: string } | null> | null };

export type GetComplementsQueryVariables = Exact<{
  categoryInput?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetComplementsQuery = { __typename?: 'Query', getComplements?: Array<{ __typename?: 'Product', id?: string | null, name?: string | null, description?: string | null, price?: number | null, category?: string | null, sizePiecesGrams?: string | null, image?: string | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', name?: string | null, quantity?: number | null } | null> | null } | null> | null };

export type GetDoughTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDoughTypesQuery = { __typename?: 'Query', getDoughTypes?: Array<{ __typename?: 'Ingredient', id?: string | null, name: string, zIndex?: ZIndex | null, image?: string | null, pricePerPortion?: number | null, avaliable?: boolean | null } | null> | null };

export type GetImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetImagesQuery = { __typename?: 'Query', getImages?: Array<{ __typename?: 'Image', id?: string | null, name: string, format: string, url: string, reference?: { __typename?: 'Ingredient', id?: string | null } | { __typename?: 'Product', id?: string | null } | { __typename?: 'Promotion', id?: string | null } | null } | null> | null };

export type GetIngredientQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetIngredientQuery = { __typename?: 'Query', getIngredient?: { __typename?: 'Ingredient', id?: string | null, name: string, zIndex?: ZIndex | null, image?: string | null, avaliable?: boolean | null, pricePerPortion?: number | null } | null };

export type GetIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIngredientsQuery = { __typename?: 'Query', getIngredients?: Array<{ __typename?: 'Ingredient', id?: string | null, name: string, zIndex?: ZIndex | null, image?: string | null, pricePerPortion?: number | null, avaliable?: boolean | null } | null> | null };

export type GetOrderQueryVariables = Exact<{
  getOrderId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder?: { __typename?: 'Order', id?: string | null, userId?: string | null, statusOrder?: OrderStatusEnum | null, date?: string | null, total?: number | null, address?: { __typename?: 'Address', street: string, block: string, houseNumber?: string | null } | null } | null };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', getOrders?: Array<{ __typename?: 'Order', id?: string | null, userId?: string | null, statusOrder?: OrderStatusEnum | null, date?: string | null, total?: number | null, address?: { __typename?: 'Address', street: string, block: string, houseNumber?: string | null } | null } | null> | null };

export type GetPizzasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPizzasQuery = { __typename?: 'Query', getPizzas?: Array<{ __typename?: 'Product', id?: string | null, name?: string | null, description?: string | null, price?: number | null, category?: string | null, sizePiecesGrams?: string | null, image?: string | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', name?: string | null, quantity?: number | null } | null> | null } | null> | null };

export type GetProductQueryVariables = Exact<{
  getProductId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: string | null, category?: string | null, image?: string | null, price?: number | null, name?: string | null, description?: string | null, sizePiecesGrams?: string | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', quantity?: number | null, name?: string | null } | null> | null } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts?: Array<{ __typename?: 'Product', image?: string | null, category?: string | null, sizePiecesGrams?: string | null, price?: number | null, description?: string | null, name?: string | null, id?: string | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', quantity?: number | null, name?: string | null } | null> | null } | null> | null };

export type GetPromotionQueryVariables = Exact<{
  getPromotionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPromotionQuery = { __typename?: 'Query', getPromotion?: { __typename?: 'Promotion', id?: string | null, name?: string | null, description?: string | null, endDate?: string | null, avaliable?: boolean | null, price?: number | null, importantDetail?: string | null, image?: string | null, product?: Array<{ __typename?: 'Product', name?: string | null, id?: string | null } | null> | null } | null };

export type GetPromotionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPromotionsQuery = { __typename?: 'Query', getPromotions?: Array<{ __typename?: 'Promotion', id?: string | null, name?: string | null, description?: string | null, endDate?: string | null, avaliable?: boolean | null, price?: number | null, importantDetail?: string | null, image?: string | null, product?: Array<{ __typename?: 'Product', category?: string | null, description?: string | null, image?: string | null, price?: number | null, sizePiecesGrams?: string | null, name?: string | null, id?: string | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', quantity?: number | null, name?: string | null } | null> | null } | null> | null } | null> | null };

export type GetUserQueryVariables = Exact<{
  getUserId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, userType?: UserTypeEnum | null } | null };

export type AuthUserQueryVariables = Exact<{
  userCredentialsInput?: InputMaybe<UserCredentialsInput>;
}>;


export type AuthUserQuery = { __typename?: 'Query', authUser: { __typename?: 'StatusResponseUserAuth', status: number, message: string, id?: string | null, name?: string | null, email?: string | null, token?: string | null, userType?: string | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, orders?: Array<{ __typename?: 'Order', userId?: string | null, total?: number | null, products?: Array<{ __typename?: 'Product', name?: string | null, price?: number | null, ingredients?: Array<{ __typename?: 'IngredientQuantity', name?: string | null, quantity?: number | null } | null> | null } | null> | null } | null> | null } | null> | null };

export type AddressKeySpecifier = ('block' | 'houseNumber' | 'street' | AddressKeySpecifier)[];
export type AddressFieldPolicy = {
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	houseNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryKeySpecifier = ('id' | 'name' | CategoryKeySpecifier)[];
export type CategoryFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageKeySpecifier = ('format' | 'id' | 'name' | 'reference' | 'url' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	format?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	reference?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IngredientKeySpecifier = ('avaliable' | 'id' | 'image' | 'name' | 'pricePerPortion' | 'zIndex' | IngredientKeySpecifier)[];
export type IngredientFieldPolicy = {
	avaliable?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pricePerPortion?: FieldPolicy<any> | FieldReadFunction<any>,
	zIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IngredientQuantityKeySpecifier = ('name' | 'quantity' | IngredientQuantityKeySpecifier)[];
export type IngredientQuantityFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IngredientXQuantityKeySpecifier = ('name' | 'quantity' | IngredientXQuantityKeySpecifier)[];
export type IngredientXQuantityFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createCategory' | 'createImage' | 'createIngredient' | 'createOrder' | 'createProduct' | 'createPromotion' | 'createUser' | 'deleteCategory' | 'deleteImage' | 'deleteIngredient' | 'deleteProduct' | 'deletePromotion' | 'deleteUser' | 'updateCategory' | 'updateImage' | 'updateIngredient' | 'updateOrderStatus' | 'updateProduct' | 'updatePromotion' | 'updatePromotionStatus' | 'updateUser' | 'updateUserAddress' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	createImage?: FieldPolicy<any> | FieldReadFunction<any>,
	createIngredient?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	createProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	createPromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteImage?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteIngredient?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	updateImage?: FieldPolicy<any> | FieldReadFunction<any>,
	updateIngredient?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOrderStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePromotionStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserAddress?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('address' | 'date' | 'id' | 'products' | 'statusOrder' | 'total' | 'userId' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	statusOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PreferencesKeySpecifier = ('alergies' | 'favoriteIngredients' | PreferencesKeySpecifier)[];
export type PreferencesFieldPolicy = {
	alergies?: FieldPolicy<any> | FieldReadFunction<any>,
	favoriteIngredients?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('category' | 'description' | 'id' | 'image' | 'ingredients' | 'name' | 'price' | 'sizePiecesGrams' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	ingredients?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	sizePiecesGrams?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PromotionKeySpecifier = ('avaliable' | 'description' | 'endDate' | 'id' | 'image' | 'importantDetail' | 'name' | 'price' | 'product' | PromotionKeySpecifier)[];
export type PromotionFieldPolicy = {
	avaliable?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	importantDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuantityKeySpecifier = ('quantity' | QuantityKeySpecifier)[];
export type QuantityFieldPolicy = {
	quantity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('authUser' | 'getCategories' | 'getComplements' | 'getDoughTypes' | 'getImages' | 'getIngredient' | 'getIngredients' | 'getOrder' | 'getOrders' | 'getPizzas' | 'getProduct' | 'getProducts' | 'getPromotion' | 'getPromotions' | 'getUser' | 'getUsers' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	authUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getCategories?: FieldPolicy<any> | FieldReadFunction<any>,
	getComplements?: FieldPolicy<any> | FieldReadFunction<any>,
	getDoughTypes?: FieldPolicy<any> | FieldReadFunction<any>,
	getImages?: FieldPolicy<any> | FieldReadFunction<any>,
	getIngredient?: FieldPolicy<any> | FieldReadFunction<any>,
	getIngredients?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrders?: FieldPolicy<any> | FieldReadFunction<any>,
	getPizzas?: FieldPolicy<any> | FieldReadFunction<any>,
	getProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	getProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	getPromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	getPromotions?: FieldPolicy<any> | FieldReadFunction<any>,
	getUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getUsers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseKeySpecifier = ('message' | 'status' | StatusResponseKeySpecifier)[];
export type StatusResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseCreateOrderKeySpecifier = ('address' | 'id' | 'message' | 'products' | 'status' | 'statusOrder' | 'total' | 'userId' | StatusResponseCreateOrderKeySpecifier)[];
export type StatusResponseCreateOrderFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	statusOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseCreateProductKeySpecifier = ('category' | 'description' | 'id' | 'image' | 'ingredients' | 'message' | 'name' | 'price' | 'sizePiecesGrams' | 'status' | StatusResponseCreateProductKeySpecifier)[];
export type StatusResponseCreateProductFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	ingredients?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	sizePiecesGrams?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseCreateUserKeySpecifier = ('email' | 'id' | 'message' | 'name' | 'status' | StatusResponseCreateUserKeySpecifier)[];
export type StatusResponseCreateUserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseIngredientKeySpecifier = ('avaliable' | 'id' | 'image' | 'message' | 'name' | 'pricePerPortion' | 'status' | 'zIndex' | StatusResponseIngredientKeySpecifier)[];
export type StatusResponseIngredientFieldPolicy = {
	avaliable?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pricePerPortion?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	zIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseOrderKeySpecifier = ('id' | 'message' | 'status' | StatusResponseOrderKeySpecifier)[];
export type StatusResponseOrderFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseOrderStatusUpdateKeySpecifier = ('message' | 'status' | StatusResponseOrderStatusUpdateKeySpecifier)[];
export type StatusResponseOrderStatusUpdateFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponsePromotionKeySpecifier = ('avaliable' | 'endDate' | 'id' | 'image' | 'message' | 'name' | 'price' | 'product' | 'status' | StatusResponsePromotionKeySpecifier)[];
export type StatusResponsePromotionFieldPolicy = {
	avaliable?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatusResponseUserAuthKeySpecifier = ('email' | 'id' | 'message' | 'name' | 'status' | 'token' | 'userType' | StatusResponseUserAuthKeySpecifier)[];
export type StatusResponseUserAuthFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	userType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('address' | 'checkPassword' | 'confirmed' | 'createdAt' | 'email' | 'id' | 'name' | 'orders' | 'password' | 'phoneNumber' | 'preferences' | 'userType' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	checkPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	preferences?: FieldPolicy<any> | FieldReadFunction<any>,
	userType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserCredentialsKeySpecifier = ('_id' | 'email' | 'name' | 'token' | UserCredentialsKeySpecifier)[];
export type UserCredentialsFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Address?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressKeySpecifier | (() => undefined | AddressKeySpecifier),
		fields?: AddressFieldPolicy,
	},
	Category?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryKeySpecifier | (() => undefined | CategoryKeySpecifier),
		fields?: CategoryFieldPolicy,
	},
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	Ingredient?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IngredientKeySpecifier | (() => undefined | IngredientKeySpecifier),
		fields?: IngredientFieldPolicy,
	},
	IngredientQuantity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IngredientQuantityKeySpecifier | (() => undefined | IngredientQuantityKeySpecifier),
		fields?: IngredientQuantityFieldPolicy,
	},
	IngredientXQuantity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IngredientXQuantityKeySpecifier | (() => undefined | IngredientXQuantityKeySpecifier),
		fields?: IngredientXQuantityFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	Preferences?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PreferencesKeySpecifier | (() => undefined | PreferencesKeySpecifier),
		fields?: PreferencesFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	Promotion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PromotionKeySpecifier | (() => undefined | PromotionKeySpecifier),
		fields?: PromotionFieldPolicy,
	},
	Quantity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuantityKeySpecifier | (() => undefined | QuantityKeySpecifier),
		fields?: QuantityFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	StatusResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseKeySpecifier | (() => undefined | StatusResponseKeySpecifier),
		fields?: StatusResponseFieldPolicy,
	},
	StatusResponseCreateOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseCreateOrderKeySpecifier | (() => undefined | StatusResponseCreateOrderKeySpecifier),
		fields?: StatusResponseCreateOrderFieldPolicy,
	},
	StatusResponseCreateProduct?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseCreateProductKeySpecifier | (() => undefined | StatusResponseCreateProductKeySpecifier),
		fields?: StatusResponseCreateProductFieldPolicy,
	},
	StatusResponseCreateUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseCreateUserKeySpecifier | (() => undefined | StatusResponseCreateUserKeySpecifier),
		fields?: StatusResponseCreateUserFieldPolicy,
	},
	StatusResponseIngredient?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseIngredientKeySpecifier | (() => undefined | StatusResponseIngredientKeySpecifier),
		fields?: StatusResponseIngredientFieldPolicy,
	},
	StatusResponseOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseOrderKeySpecifier | (() => undefined | StatusResponseOrderKeySpecifier),
		fields?: StatusResponseOrderFieldPolicy,
	},
	StatusResponseOrderStatusUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseOrderStatusUpdateKeySpecifier | (() => undefined | StatusResponseOrderStatusUpdateKeySpecifier),
		fields?: StatusResponseOrderStatusUpdateFieldPolicy,
	},
	StatusResponsePromotion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponsePromotionKeySpecifier | (() => undefined | StatusResponsePromotionKeySpecifier),
		fields?: StatusResponsePromotionFieldPolicy,
	},
	StatusResponseUserAuth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatusResponseUserAuthKeySpecifier | (() => undefined | StatusResponseUserAuthKeySpecifier),
		fields?: StatusResponseUserAuthFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserCredentialsKeySpecifier | (() => undefined | UserCredentialsKeySpecifier),
		fields?: UserCredentialsFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

export const CreateCategoryDocument = gql`
    mutation CreateCategory($categoryInput: CategoryInput) {
  createCategory(categoryInput: $categoryInput) {
    status
    message
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      categoryInput: // value for 'categoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateIngredientDocument = gql`
    mutation CreateIngredient($ingredientInput: IngredientInput) {
  createIngredient(ingredientInput: $ingredientInput) {
    status
    id
    message
    name
    image
    avaliable
    pricePerPortion
    zIndex
  }
}
    `;
export type CreateIngredientMutationFn = Apollo.MutationFunction<CreateIngredientMutation, CreateIngredientMutationVariables>;

/**
 * __useCreateIngredientMutation__
 *
 * To run a mutation, you first call `useCreateIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIngredientMutation, { data, loading, error }] = useCreateIngredientMutation({
 *   variables: {
 *      ingredientInput: // value for 'ingredientInput'
 *   },
 * });
 */
export function useCreateIngredientMutation(baseOptions?: Apollo.MutationHookOptions<CreateIngredientMutation, CreateIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIngredientMutation, CreateIngredientMutationVariables>(CreateIngredientDocument, options);
      }
export type CreateIngredientMutationHookResult = ReturnType<typeof useCreateIngredientMutation>;
export type CreateIngredientMutationResult = Apollo.MutationResult<CreateIngredientMutation>;
export type CreateIngredientMutationOptions = Apollo.BaseMutationOptions<CreateIngredientMutation, CreateIngredientMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($orderInput: OrderInput) {
  createOrder(orderInput: $orderInput) {
    status
    message
    id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      orderInput: // value for 'orderInput'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($productInput: ProductInput) {
  createProduct(productInput: $productInput) {
    status
    message
    id
    name
    description
    category
    sizePiecesGrams
    image
    price
    ingredients {
      name
      quantity
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreatePromotionDocument = gql`
    mutation CreatePromotion($promotionInput: PromotionInput) {
  createPromotion(promotionInput: $promotionInput) {
    status
    message
    id
    name
    price
    image
    avaliable
    endDate
    product {
      name
      ingredients {
        name
        quantity
      }
      sizePiecesGrams
    }
  }
}
    `;
export type CreatePromotionMutationFn = Apollo.MutationFunction<CreatePromotionMutation, CreatePromotionMutationVariables>;

/**
 * __useCreatePromotionMutation__
 *
 * To run a mutation, you first call `useCreatePromotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePromotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPromotionMutation, { data, loading, error }] = useCreatePromotionMutation({
 *   variables: {
 *      promotionInput: // value for 'promotionInput'
 *   },
 * });
 */
export function useCreatePromotionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePromotionMutation, CreatePromotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePromotionMutation, CreatePromotionMutationVariables>(CreatePromotionDocument, options);
      }
export type CreatePromotionMutationHookResult = ReturnType<typeof useCreatePromotionMutation>;
export type CreatePromotionMutationResult = Apollo.MutationResult<CreatePromotionMutation>;
export type CreatePromotionMutationOptions = Apollo.BaseMutationOptions<CreatePromotionMutation, CreatePromotionMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($userInput: UserInput) {
  createUser(userInput: $userInput) {
    status
    message
    id
    name
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: ID!) {
  deleteCategory(id: $deleteCategoryId) {
    status
    message
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      deleteCategoryId: // value for 'deleteCategoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteIngredientDocument = gql`
    mutation DeleteIngredient($deleteIngredientId: ID!) {
  deleteIngredient(id: $deleteIngredientId) {
    status
    message
  }
}
    `;
export type DeleteIngredientMutationFn = Apollo.MutationFunction<DeleteIngredientMutation, DeleteIngredientMutationVariables>;

/**
 * __useDeleteIngredientMutation__
 *
 * To run a mutation, you first call `useDeleteIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIngredientMutation, { data, loading, error }] = useDeleteIngredientMutation({
 *   variables: {
 *      deleteIngredientId: // value for 'deleteIngredientId'
 *   },
 * });
 */
export function useDeleteIngredientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIngredientMutation, DeleteIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIngredientMutation, DeleteIngredientMutationVariables>(DeleteIngredientDocument, options);
      }
export type DeleteIngredientMutationHookResult = ReturnType<typeof useDeleteIngredientMutation>;
export type DeleteIngredientMutationResult = Apollo.MutationResult<DeleteIngredientMutation>;
export type DeleteIngredientMutationOptions = Apollo.BaseMutationOptions<DeleteIngredientMutation, DeleteIngredientMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId) {
    status
    message
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeletePromotionDocument = gql`
    mutation DeletePromotion($deletePromotionId: ID!) {
  deletePromotion(id: $deletePromotionId) {
    status
    message
  }
}
    `;
export type DeletePromotionMutationFn = Apollo.MutationFunction<DeletePromotionMutation, DeletePromotionMutationVariables>;

/**
 * __useDeletePromotionMutation__
 *
 * To run a mutation, you first call `useDeletePromotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePromotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePromotionMutation, { data, loading, error }] = useDeletePromotionMutation({
 *   variables: {
 *      deletePromotionId: // value for 'deletePromotionId'
 *   },
 * });
 */
export function useDeletePromotionMutation(baseOptions?: Apollo.MutationHookOptions<DeletePromotionMutation, DeletePromotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePromotionMutation, DeletePromotionMutationVariables>(DeletePromotionDocument, options);
      }
export type DeletePromotionMutationHookResult = ReturnType<typeof useDeletePromotionMutation>;
export type DeletePromotionMutationResult = Apollo.MutationResult<DeletePromotionMutation>;
export type DeletePromotionMutationOptions = Apollo.BaseMutationOptions<DeletePromotionMutation, DeletePromotionMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    status
    message
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateIngredientDocument = gql`
    mutation UpdateIngredient($ingredientInput: IngredientInput) {
  updateIngredient(ingredientInput: $ingredientInput) {
    status
    message
  }
}
    `;
export type UpdateIngredientMutationFn = Apollo.MutationFunction<UpdateIngredientMutation, UpdateIngredientMutationVariables>;

/**
 * __useUpdateIngredientMutation__
 *
 * To run a mutation, you first call `useUpdateIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIngredientMutation, { data, loading, error }] = useUpdateIngredientMutation({
 *   variables: {
 *      ingredientInput: // value for 'ingredientInput'
 *   },
 * });
 */
export function useUpdateIngredientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIngredientMutation, UpdateIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIngredientMutation, UpdateIngredientMutationVariables>(UpdateIngredientDocument, options);
      }
export type UpdateIngredientMutationHookResult = ReturnType<typeof useUpdateIngredientMutation>;
export type UpdateIngredientMutationResult = Apollo.MutationResult<UpdateIngredientMutation>;
export type UpdateIngredientMutationOptions = Apollo.BaseMutationOptions<UpdateIngredientMutation, UpdateIngredientMutationVariables>;
export const UpdateOrderStatusDocument = gql`
    mutation UpdateOrderStatus($updateOrderStatusId: String, $status: OrderStatusEnum) {
  updateOrderStatus(id: $updateOrderStatusId, status: $status) {
    status
    message
  }
}
    `;
export type UpdateOrderStatusMutationFn = Apollo.MutationFunction<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      updateOrderStatusId: // value for 'updateOrderStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument, options);
      }
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = Apollo.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($productInput: UpdateProductInput) {
  updateProduct(productInput: $productInput) {
    status
    message
    id
    name
    description
    category
    sizePiecesGrams
    ingredients {
      name
      quantity
    }
    image
    price
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdatePromotionDocument = gql`
    mutation UpdatePromotion($promotionInput: PromotionInput) {
  updatePromotion(promotionInput: $promotionInput) {
    status
    message
  }
}
    `;
export type UpdatePromotionMutationFn = Apollo.MutationFunction<UpdatePromotionMutation, UpdatePromotionMutationVariables>;

/**
 * __useUpdatePromotionMutation__
 *
 * To run a mutation, you first call `useUpdatePromotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePromotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePromotionMutation, { data, loading, error }] = useUpdatePromotionMutation({
 *   variables: {
 *      promotionInput: // value for 'promotionInput'
 *   },
 * });
 */
export function useUpdatePromotionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePromotionMutation, UpdatePromotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePromotionMutation, UpdatePromotionMutationVariables>(UpdatePromotionDocument, options);
      }
export type UpdatePromotionMutationHookResult = ReturnType<typeof useUpdatePromotionMutation>;
export type UpdatePromotionMutationResult = Apollo.MutationResult<UpdatePromotionMutation>;
export type UpdatePromotionMutationOptions = Apollo.BaseMutationOptions<UpdatePromotionMutation, UpdatePromotionMutationVariables>;
export const UpdatePromotionStatusDocument = gql`
    mutation UpdatePromotionStatus($promotionId: String) {
  updatePromotionStatus(promotionId: $promotionId) {
    status
    message
  }
}
    `;
export type UpdatePromotionStatusMutationFn = Apollo.MutationFunction<UpdatePromotionStatusMutation, UpdatePromotionStatusMutationVariables>;

/**
 * __useUpdatePromotionStatusMutation__
 *
 * To run a mutation, you first call `useUpdatePromotionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePromotionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePromotionStatusMutation, { data, loading, error }] = useUpdatePromotionStatusMutation({
 *   variables: {
 *      promotionId: // value for 'promotionId'
 *   },
 * });
 */
export function useUpdatePromotionStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePromotionStatusMutation, UpdatePromotionStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePromotionStatusMutation, UpdatePromotionStatusMutationVariables>(UpdatePromotionStatusDocument, options);
      }
export type UpdatePromotionStatusMutationHookResult = ReturnType<typeof useUpdatePromotionStatusMutation>;
export type UpdatePromotionStatusMutationResult = Apollo.MutationResult<UpdatePromotionStatusMutation>;
export type UpdatePromotionStatusMutationOptions = Apollo.BaseMutationOptions<UpdatePromotionStatusMutation, UpdatePromotionStatusMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $updateUserInput: UpdateUserInput) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
    status
    message
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserAddressDocument = gql`
    mutation UpdateUserAddress($id: ID!, $updateUserAddressInput: UserInputUpdateAddress) {
  updateUserAddress(id: $id, userInputUpdateAddress: $updateUserAddressInput) {
    status
    message
  }
}
    `;
export type UpdateUserAddressMutationFn = Apollo.MutationFunction<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;

/**
 * __useUpdateUserAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddressMutation, { data, loading, error }] = useUpdateUserAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateUserAddressInput: // value for 'updateUserAddressInput'
 *   },
 * });
 */
export function useUpdateUserAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>(UpdateUserAddressDocument, options);
      }
export type UpdateUserAddressMutationHookResult = ReturnType<typeof useUpdateUserAddressMutation>;
export type UpdateUserAddressMutationResult = Apollo.MutationResult<UpdateUserAddressMutation>;
export type UpdateUserAddressMutationOptions = Apollo.BaseMutationOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetComplementsDocument = gql`
    query GetComplements($categoryInput: String) {
  getComplements(categoryInput: $categoryInput) {
    id
    name
    description
    price
    category
    sizePiecesGrams
    image
    ingredients {
      name
      quantity
    }
  }
}
    `;

/**
 * __useGetComplementsQuery__
 *
 * To run a query within a React component, call `useGetComplementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComplementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComplementsQuery({
 *   variables: {
 *      categoryInput: // value for 'categoryInput'
 *   },
 * });
 */
export function useGetComplementsQuery(baseOptions?: Apollo.QueryHookOptions<GetComplementsQuery, GetComplementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComplementsQuery, GetComplementsQueryVariables>(GetComplementsDocument, options);
      }
export function useGetComplementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComplementsQuery, GetComplementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComplementsQuery, GetComplementsQueryVariables>(GetComplementsDocument, options);
        }
export function useGetComplementsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetComplementsQuery, GetComplementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetComplementsQuery, GetComplementsQueryVariables>(GetComplementsDocument, options);
        }
export type GetComplementsQueryHookResult = ReturnType<typeof useGetComplementsQuery>;
export type GetComplementsLazyQueryHookResult = ReturnType<typeof useGetComplementsLazyQuery>;
export type GetComplementsSuspenseQueryHookResult = ReturnType<typeof useGetComplementsSuspenseQuery>;
export type GetComplementsQueryResult = Apollo.QueryResult<GetComplementsQuery, GetComplementsQueryVariables>;
export const GetDoughTypesDocument = gql`
    query GetDoughTypes {
  getDoughTypes {
    id
    name
    zIndex
    image
    pricePerPortion
    avaliable
  }
}
    `;

/**
 * __useGetDoughTypesQuery__
 *
 * To run a query within a React component, call `useGetDoughTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoughTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoughTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDoughTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetDoughTypesQuery, GetDoughTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoughTypesQuery, GetDoughTypesQueryVariables>(GetDoughTypesDocument, options);
      }
export function useGetDoughTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoughTypesQuery, GetDoughTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoughTypesQuery, GetDoughTypesQueryVariables>(GetDoughTypesDocument, options);
        }
export function useGetDoughTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDoughTypesQuery, GetDoughTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDoughTypesQuery, GetDoughTypesQueryVariables>(GetDoughTypesDocument, options);
        }
export type GetDoughTypesQueryHookResult = ReturnType<typeof useGetDoughTypesQuery>;
export type GetDoughTypesLazyQueryHookResult = ReturnType<typeof useGetDoughTypesLazyQuery>;
export type GetDoughTypesSuspenseQueryHookResult = ReturnType<typeof useGetDoughTypesSuspenseQuery>;
export type GetDoughTypesQueryResult = Apollo.QueryResult<GetDoughTypesQuery, GetDoughTypesQueryVariables>;
export const GetImagesDocument = gql`
    query GetImages {
  getImages {
    id
    name
    format
    reference {
      ... on Product {
        id
      }
      ... on Promotion {
        id
      }
      ... on Ingredient {
        id
      }
    }
    url
  }
}
    `;

/**
 * __useGetImagesQuery__
 *
 * To run a query within a React component, call `useGetImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImagesQuery(baseOptions?: Apollo.QueryHookOptions<GetImagesQuery, GetImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImagesQuery, GetImagesQueryVariables>(GetImagesDocument, options);
      }
export function useGetImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImagesQuery, GetImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImagesQuery, GetImagesQueryVariables>(GetImagesDocument, options);
        }
export function useGetImagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetImagesQuery, GetImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetImagesQuery, GetImagesQueryVariables>(GetImagesDocument, options);
        }
export type GetImagesQueryHookResult = ReturnType<typeof useGetImagesQuery>;
export type GetImagesLazyQueryHookResult = ReturnType<typeof useGetImagesLazyQuery>;
export type GetImagesSuspenseQueryHookResult = ReturnType<typeof useGetImagesSuspenseQuery>;
export type GetImagesQueryResult = Apollo.QueryResult<GetImagesQuery, GetImagesQueryVariables>;
export const GetIngredientDocument = gql`
    query GetIngredient($name: String) {
  getIngredient(name: $name) {
    id
    name
    zIndex
    image
    avaliable
    pricePerPortion
  }
}
    `;

/**
 * __useGetIngredientQuery__
 *
 * To run a query within a React component, call `useGetIngredientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIngredientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIngredientQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetIngredientQuery(baseOptions?: Apollo.QueryHookOptions<GetIngredientQuery, GetIngredientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIngredientQuery, GetIngredientQueryVariables>(GetIngredientDocument, options);
      }
export function useGetIngredientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIngredientQuery, GetIngredientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIngredientQuery, GetIngredientQueryVariables>(GetIngredientDocument, options);
        }
export function useGetIngredientSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIngredientQuery, GetIngredientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIngredientQuery, GetIngredientQueryVariables>(GetIngredientDocument, options);
        }
export type GetIngredientQueryHookResult = ReturnType<typeof useGetIngredientQuery>;
export type GetIngredientLazyQueryHookResult = ReturnType<typeof useGetIngredientLazyQuery>;
export type GetIngredientSuspenseQueryHookResult = ReturnType<typeof useGetIngredientSuspenseQuery>;
export type GetIngredientQueryResult = Apollo.QueryResult<GetIngredientQuery, GetIngredientQueryVariables>;
export const GetIngredientsDocument = gql`
    query getIngredients {
  getIngredients {
    id
    name
    zIndex
    image
    pricePerPortion
    avaliable
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
export function useGetIngredientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIngredientsQuery, GetIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIngredientsQuery, GetIngredientsQueryVariables>(GetIngredientsDocument, options);
        }
export type GetIngredientsQueryHookResult = ReturnType<typeof useGetIngredientsQuery>;
export type GetIngredientsLazyQueryHookResult = ReturnType<typeof useGetIngredientsLazyQuery>;
export type GetIngredientsSuspenseQueryHookResult = ReturnType<typeof useGetIngredientsSuspenseQuery>;
export type GetIngredientsQueryResult = Apollo.QueryResult<GetIngredientsQuery, GetIngredientsQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($getOrderId: String) {
  getOrder(id: $getOrderId) {
    id
    userId
    address {
      street
      block
      houseNumber
    }
    statusOrder
    date
    total
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      getOrderId: // value for 'getOrderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions?: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderSuspenseQueryHookResult = ReturnType<typeof useGetOrderSuspenseQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  getOrders {
    id
    userId
    statusOrder
    address {
      street
      block
      houseNumber
    }
    date
    total
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetPizzasDocument = gql`
    query GetPizzas {
  getPizzas {
    id
    name
    description
    price
    category
    sizePiecesGrams
    image
    ingredients {
      name
      quantity
    }
  }
}
    `;

/**
 * __useGetPizzasQuery__
 *
 * To run a query within a React component, call `useGetPizzasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPizzasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPizzasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPizzasQuery(baseOptions?: Apollo.QueryHookOptions<GetPizzasQuery, GetPizzasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPizzasQuery, GetPizzasQueryVariables>(GetPizzasDocument, options);
      }
export function useGetPizzasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPizzasQuery, GetPizzasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPizzasQuery, GetPizzasQueryVariables>(GetPizzasDocument, options);
        }
export function useGetPizzasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPizzasQuery, GetPizzasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPizzasQuery, GetPizzasQueryVariables>(GetPizzasDocument, options);
        }
export type GetPizzasQueryHookResult = ReturnType<typeof useGetPizzasQuery>;
export type GetPizzasLazyQueryHookResult = ReturnType<typeof useGetPizzasLazyQuery>;
export type GetPizzasSuspenseQueryHookResult = ReturnType<typeof useGetPizzasSuspenseQuery>;
export type GetPizzasQueryResult = Apollo.QueryResult<GetPizzasQuery, GetPizzasQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($getProductId: String) {
  getProduct(id: $getProductId) {
    id
    category
    image
    ingredients {
      quantity
      name
    }
    price
    name
    description
    sizePiecesGrams
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      getProductId: // value for 'getProductId'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions?: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  getProducts {
    ingredients {
      quantity
      name
    }
    image
    category
    sizePiecesGrams
    price
    description
    name
    id
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetPromotionDocument = gql`
    query GetPromotion($getPromotionId: String) {
  getPromotion(id: $getPromotionId) {
    id
    name
    description
    endDate
    avaliable
    price
    importantDetail
    product {
      name
      id
    }
    image
  }
}
    `;

/**
 * __useGetPromotionQuery__
 *
 * To run a query within a React component, call `useGetPromotionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromotionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromotionQuery({
 *   variables: {
 *      getPromotionId: // value for 'getPromotionId'
 *   },
 * });
 */
export function useGetPromotionQuery(baseOptions?: Apollo.QueryHookOptions<GetPromotionQuery, GetPromotionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPromotionQuery, GetPromotionQueryVariables>(GetPromotionDocument, options);
      }
export function useGetPromotionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPromotionQuery, GetPromotionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPromotionQuery, GetPromotionQueryVariables>(GetPromotionDocument, options);
        }
export function useGetPromotionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPromotionQuery, GetPromotionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPromotionQuery, GetPromotionQueryVariables>(GetPromotionDocument, options);
        }
export type GetPromotionQueryHookResult = ReturnType<typeof useGetPromotionQuery>;
export type GetPromotionLazyQueryHookResult = ReturnType<typeof useGetPromotionLazyQuery>;
export type GetPromotionSuspenseQueryHookResult = ReturnType<typeof useGetPromotionSuspenseQuery>;
export type GetPromotionQueryResult = Apollo.QueryResult<GetPromotionQuery, GetPromotionQueryVariables>;
export const GetPromotionsDocument = gql`
    query GetPromotions {
  getPromotions {
    id
    name
    description
    endDate
    avaliable
    price
    importantDetail
    image
    product {
      category
      description
      image
      price
      sizePiecesGrams
      name
      id
      ingredients {
        quantity
        name
      }
    }
  }
}
    `;

/**
 * __useGetPromotionsQuery__
 *
 * To run a query within a React component, call `useGetPromotionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromotionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromotionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPromotionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPromotionsQuery, GetPromotionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPromotionsQuery, GetPromotionsQueryVariables>(GetPromotionsDocument, options);
      }
export function useGetPromotionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPromotionsQuery, GetPromotionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPromotionsQuery, GetPromotionsQueryVariables>(GetPromotionsDocument, options);
        }
export function useGetPromotionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPromotionsQuery, GetPromotionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPromotionsQuery, GetPromotionsQueryVariables>(GetPromotionsDocument, options);
        }
export type GetPromotionsQueryHookResult = ReturnType<typeof useGetPromotionsQuery>;
export type GetPromotionsLazyQueryHookResult = ReturnType<typeof useGetPromotionsLazyQuery>;
export type GetPromotionsSuspenseQueryHookResult = ReturnType<typeof useGetPromotionsSuspenseQuery>;
export type GetPromotionsQueryResult = Apollo.QueryResult<GetPromotionsQuery, GetPromotionsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($getUserId: String) {
  getUser(id: $getUserId) {
    id
    name
    email
    userType
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUserId: // value for 'getUserId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const AuthUserDocument = gql`
    query AuthUser($userCredentialsInput: UserCredentialsInput) {
  authUser(userCredentialsInput: $userCredentialsInput) {
    status
    message
    id
    name
    email
    token
    userType
  }
}
    `;

/**
 * __useAuthUserQuery__
 *
 * To run a query within a React component, call `useAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserQuery({
 *   variables: {
 *      userCredentialsInput: // value for 'userCredentialsInput'
 *   },
 * });
 */
export function useAuthUserQuery(baseOptions?: Apollo.QueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
      }
export function useAuthUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
        }
export function useAuthUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
        }
export type AuthUserQueryHookResult = ReturnType<typeof useAuthUserQuery>;
export type AuthUserLazyQueryHookResult = ReturnType<typeof useAuthUserLazyQuery>;
export type AuthUserSuspenseQueryHookResult = ReturnType<typeof useAuthUserSuspenseQuery>;
export type AuthUserQueryResult = Apollo.QueryResult<AuthUserQuery, AuthUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    email
    orders {
      userId
      products {
        name
        price
        ingredients {
          name
          quantity
        }
      }
      total
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;