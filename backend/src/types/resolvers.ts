import { Secret } from 'jsonwebtoken'

import User from '../../models/Users.js'
import Product from '../../models/Products.js'
import Ingredient from '../../models/Ingredients.js'
import Promotion from '../../models/Promotions.js'
import Order from '../../models/Orders.js'
import Category from '../../models/Categories.js'
import Images from '../../models/Images.ts'

import regex from '../utils/regex.ts'
import { 
    CreateUserType,
    CreateProductType,
    CreateIngredientType,
    CreateAddressType,
    CreateCategoryType,
    CreateImageType,
    CreatePromotionType,
    CreateOrderType,

    UserCredentialsType,
    GetUserInfo,
    GetOrderInfo,
    GetComplements,
    GetProduct,
    GetPromotion,
    GetIngredientInfo,

    DeleteUserType,
    DeleteIngredientType,

    UpdateIngredientType,
    UpdateUserType,
    UpdateProductType,
    UpdateCategoryType,
    UpdateImageType,
    UpdatePromotionStatusType,
    UpdateOrderStatus
} from './resolversTypes.js'
import {uploadImage} from '../utils/uploadImage.ts'
import generateJWT from '../utils/generateJWT.ts'

const resolvers =  {
    Query: {
        async getUsers(){
            return await User.find()
        },
        async getUser(_: unknown, {id}: GetUserInfo){
            return await User.findById(id)
        },
        async authUser(_:unknown, {userCredentialsInput}:UserCredentialsType){
            const {email, password} = userCredentialsInput;
            // Comprobar si el usuario existe
            const queryUser = await User.findOne({ email });
            if(!queryUser){
                const error = new Error('El Usuario no existe');
                return {
                    status: 404,
                    message: error.message
                };
            }
            // check password
            if(await queryUser.checkPassword(password)){
                return {
                    status: 200,
                    message: "Consulta Exitosa",
                    id: queryUser._id,
                    name: queryUser.name,
                    email: queryUser.email,
                    token: generateJWT(queryUser._id as unknown as Secret),
                    userType: queryUser.userType
                }
            }else{
                const error = new Error('Password incorrecto');
                return {
                    status: 403,
                    message: error.message
                }
            }
        },
        async getProducts(){
            return await Product.find()
                .populate("ingredients")
                .populate("category")
        },
        async getProduct(_: unknown, {id}: GetProduct){
            return await Product.findById(id)
                .populate("ingredients")
                .populate("category")
        },
        async getPizzas(){
            return await Product.find({
                category: "Pizzas"
            })
        },
        async getComplements(_: unknown, {categoryInput}: GetComplements){
            return await Product.find({
                category: categoryInput
            })
        },
        async getIngredient(_: unknown, {name}: GetIngredientInfo){
            return await Ingredient.findOne({
                name
            })
        },
        async getIngredients(){
            return await Ingredient.find()
        },
        async getDoughTypes(){
            return await Ingredient.where({
                name: new RegExp("Masa")
            })
        },
        async getPromotions(){
            return await Promotion.find()
        },
        async getPromotion(_: unknown, {id}: GetPromotion){
            return await Promotion.findById(id)
        },
        async getOrders(){
            return await Order.find().populate("products", "-category -price -description")
        },
        async getOrder(_:unknown, {id}: GetOrderInfo){
            return await Order.findById(id).populate("products", "-category -price -description")
        },
        async getCategories(){
            return await Category.find()
        },
        async getImages(){
            return await Images.find()
                .populate("ingredientImage")
                .populate("promotionImage")
                .populate("productImage")
        }
        
    },
    Mutation: {
        // CRUD Users
        async createUser(_: unknown, {userInput}: CreateUserType){
            const {name, email, password, userType, phoneNumber, address, preferences} = userInput;
            const registeredUser = await User.findOne({
                email,
            });
            if(registeredUser){
                const error = new Error("El correo que ingresaste ya está registrado, intenta utilizar otro")
                return {status: 400, message: error.message}
            }
            if(! name || !email || !password ){
                const error = new Error("Necesitamos que ingreses tu nombre, email, y contraseña para poder registrarte")
                return {status: 400, message: error.message}
            }
            if(!regex.test(email)){
                const error = new Error("El correo debe de tener un formato similar al siguiente: correo@correo.com")
                return {status: 400, message: error.message}
            }else{
                const createdUser = new User({
                    name,
                    email,
                    password,
                    confirmed: false,
                    token: '',
                    userType: userType ?? "user",
                    preferences, 
                    phoneNumber,
                    address
                })
                const result = await createdUser.save()
                return {
                    status: 200,
                    message: "Usuario Creado Correctamente",
                    id: result.id,
                    name: result.name,
                    email: result.email,
                }
            }
        },
        async updateUser(_: unknown, {id, updateUserInput}: UpdateUserType){
            const {name, email, password} = updateUserInput;
            const registeredUser = await User.findOne({
                email,
            });
            if(!registeredUser){
                const error = new Error("El usuario que se intenta actualizar no existe")
                return {status: 404, message: error.message}
            }
            if(Object.values([name, email, password]).includes("")){
                const error = new Error("Necesitamos que ingreses tu nombre, email, y contraseña para poder registrarte")
                return {status: 400, message: error.message}
            }
            if(!regex.test(email as string)){
                const error = new Error("El correo debe de tener un formato similar al siguiente: correo@correo.com")
                return {status: 400, message: error.message}
            }else{
                const updatedName = updateUserInput.name !== registeredUser.name ? updateUserInput : registeredUser.name;
                const updatedEmail = updateUserInput.email !== registeredUser.email ? updateUserInput : registeredUser.email;
                const updatedPassword = updateUserInput.password !== registeredUser.password ? updateUserInput : registeredUser.password;
                const updatedAddress = updateUserInput.address !== registeredUser.address ? updateUserInput : registeredUser.address;
                const updatedIngredient = (await Ingredient.updateOne({
                    _id: id
                }, {
                    name: updatedName,
                    zIndex: updatedEmail,
                    password: updatedPassword,
                    address: updatedAddress,
                }))
                return updatedIngredient
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado el ingrediente correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar el ingrediente"
                    }
            }
        },
        async updateUserAddress(_: unknown, {id, userInputUpdateAddress}: CreateAddressType){
            const {street, block, houseNumber} = userInputUpdateAddress;
            const getUser = await User.findById(id)
            if(!getUser?.name){
                const error = new Error("El usuario no existe")
                return {status: 404, message: error.message}
            }
            if(Object.values([street, block, houseNumber]).includes("")){
                const error = new Error("Necesitamos que ")
                return {status: 404, message: error.message}
            }else{
                const updatedUser = (await User.updateOne({
                    _id: id
                }, {
                    address: {
                        street,
                        block,
                        houseNumber,
                    }
                })).modifiedCount
                return updatedUser === 1 
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado tu domicilio correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar tu domicilio, por favor, inténtalo más tarde. Vamos a resolver este problema lo más pronto posible."
                    }
            }
        },
        async deleteUser(_: unknown, {id}: DeleteUserType){
            const queryUser = await User.findById(id)
            if(!queryUser){
                const error = new Error("El usuario que intentas eliminar no existe")
                return {status: 404, message: error.message}
            }else{
                const result = await queryUser.deleteOne()
                return result._id ? 
                {
                    status: 200, 
                    message: "Eliminamos el usuario correctamente"} 
                : {
                    status: 401, 
                    message: "Tuvimos un problema al eliminar este usuario, inténtalo más tarde. Vamos a resolver este problema lo más pronto posible."
                }
            }
        },

        // CRUD Products
        async createProduct(_: unknown, {productInput}:CreateProductType){
            const {name, description, price, category, ingredients, image, sizePiecesGrams} = productInput;
            if(Object.values([name, description, category]).includes("") || !price || price <= 0 || !sizePiecesGrams){
                const error = new Error("Necesitamos que nos proporciones el nombre, descripción, precio y los ingredientes del producto para poder registrarlo")
                return {status: 400, message: error.message}
            }else{
                const updatedImage = await uploadImage(image as string, {
                    fileName: `image_${name}`,
                    overwrite: true
                })
                const createdProduct = new Product({
                    name: productInput.name,
                    description: productInput.description,
                    price: productInput.price,
                    category: productInput.category,
                    sizePiecesGrams: productInput.sizePiecesGrams ?? 'not included',
                    ingredients: productInput.ingredients,
                    image: updatedImage ?? ''
                })
                const result = await createdProduct.save()
                return {
                    status: 200,
                    message: "Producto Creado Correctamente",
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    category: result?.category,
                    sizePiecesGrams: result?.sizePiecesGrams,
                    image: result.image,
                    ingredients: result.ingredients,
                    price: result.price,
                }
            }
        },
        async updateProduct(_: unknown, {productInput}:UpdateProductType){
            const {id, product} = productInput
            const queryProduct = await Product.findById(id)
            if(!queryProduct){
                const error = new Error("El producto que se quiere editar no existe.")
                return {status: 404, message: error.message}
            }else{
                const updatedImage = await uploadImage(product?.image as string, {
                    fileName: `image_${product?.name}`,
                    overwrite: true
                })
                const updatedName = product?.name !== queryProduct?.name ? product?.name : queryProduct?.name;
                const updatedDescription = product?.description !== queryProduct?.description ? product?.description : queryProduct?.description;
                const updatedPrice = product?.price !== queryProduct?.price ? product?.price : queryProduct?.price;
                const updatedCategory = product?.category !== queryProduct?.category ? product?.category : queryProduct.category;
                const updatedSizePiecesGrams = product?.sizePiecesGrams !== queryProduct?.sizePiecesGrams ? product?.sizePiecesGrams : queryProduct.sizePiecesGrams;
                await Product.updateOne(
                {
                    _id: id, 
                },
                {
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice,
                    category: updatedCategory,
                    sizePiecesGrams: updatedSizePiecesGrams,
                    ingredients: product?.ingredients,
                    image: updatedImage,
                })
                return {
                    status: 200,
                    message: "Producto Actualizado Correctamente",
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice,
                    category: updatedCategory,
                    sizePiecesGrams: updatedSizePiecesGrams,
                    ingredients: product?.ingredients,
                    image: updatedImage,
                }
            }
        },

        async deleteProduct(_: unknown, id: string){
            const queryProduct = await Product.findById(id)
            if(!queryProduct?.name){
                const error = new Error("El producto que intentas eliminar no existe")
                return {status: 404, message: error.message}
            }else{
                const result = (await queryProduct?.deleteOne())
                return result ? 
                {
                    status: 200, 
                    message: "Eliminamos el producto correctamente"} 
                : {
                    status: 401, 
                    message: "Tuvimos un problema al eliminar este producto, inténtalo más tarde. Vamos a resolver este problema lo más pronto posible."
                }
            }
        },

        // CRUD Ingredients
        async createIngredient(_: unknown, {ingredientInput}: CreateIngredientType) { // Este si funciona
            const queryIngredient = await Ingredient.findOne({name: ingredientInput.name})
            if(queryIngredient?.name){
                const error = new Error("El ingrediente a crear ya se encuentra registrado")
                return {status: 400, message: error.message}
            }
            if(Object.values(ingredientInput).includes("") || (!ingredientInput.name || !ingredientInput.pricePerPortion || !ingredientInput.zIndex )){
                const error = new Error("Es necesario especificar el nombre, la prioridad y el precio por porción de cada ingrediente")
                return {status: 400, message: error.message}
            }else{
                const updatedIngredient = await uploadImage(ingredientInput.image, {
                    fileName: `image_${ingredientInput.name}`,
                    overwrite: true
                })
                const newIngredient = new Ingredient({
                    name: ingredientInput.name,
                    zIndex: ingredientInput.zIndex,
                    image: updatedIngredient,
                    pricePerPortion: ingredientInput.pricePerPortion,
                    avaliable: ingredientInput.avaliable,
                });
                const result = await newIngredient.save()
                return {
                    status: 200,
                    message: "Ingrediente Creado Correctamente",
                    id: result._id,
                    name: result.name,
                    zIndex: result.zIndex,
                    image: updatedIngredient,
                    pricePerPortion: result.pricePerPortion,
                    avaliable: result.avaliable,
                }
            }
        },
        async updateIngredient(_: unknown, {id, ingredientInput}: UpdateIngredientType) { // Este si funciona
            const queryIngredient = await Ingredient.findOne({id})
            if(!queryIngredient){
                const error = new Error("El ingrediente a por actualizar no existe")
                return {status: 404, message: error.message}
            }
            if(Object.values(ingredientInput).includes("") || (!ingredientInput.name || !ingredientInput.pricePerPortion || !ingredientInput.zIndex )){
                const error = new Error("Es necesario especificar el nombre, la prioridad y el precio por porción de cada ingrediente")
                return {status: 400, message: error.message}
            }else{
                const updatedImage = await uploadImage(ingredientInput.image, {
                    fileName: `image_${ingredientInput.name}`,
                    overwrite: true
                })
                const updatedName = ingredientInput.name !== queryIngredient.name ? ingredientInput : queryIngredient.name;
                const updatedPPP = ingredientInput.pricePerPortion !== queryIngredient.pricePerPortion ? ingredientInput : queryIngredient.pricePerPortion;
                const  updatedZIndex = ingredientInput.zIndex !== queryIngredient.zIndex ? ingredientInput : queryIngredient.zIndex;
                const updatedAvaliable = ingredientInput.avaliable !== queryIngredient.avaliable ? ingredientInput : queryIngredient.avaliable;
                const updatedIngredient = (await Ingredient.updateOne({
                    _id: id
                }, {
                    name: updatedName,
                    pricePerPortion: updatedPPP,
                    zIndex: updatedZIndex,
                    avaliable: updatedAvaliable,
                    image: updatedImage
                }))
                return updatedIngredient
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado el ingrediente correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar el ingrediente"
                    }
            }
        },
        async deleteIngredient(_: unknown, {id}: DeleteIngredientType){
            const queryIngredient = await Ingredient.findById(id)
            if(!queryIngredient){
                const error = new Error("El producto que intentas eliminar no existe")
                return {status: 404, message: error.message}
            }else{
                const result = (await queryIngredient?.deleteOne())
                return result ? 
                {
                    status: 200, 
                    message: "Eliminamos el ingrediente correctamente"} 
                : {
                    status: 401, 
                    message: "Tuvimos un problema al eliminar este ingrediente, inténtalo más tarde."
                }
            }
        },

        //CRUD Categories
        async createCategory(_: unknown, {categoryInput}: CreateCategoryType) { // Este si funciona
            const queryCategory = await Category.findOne({name: categoryInput.name})
            if(queryCategory){
                const error = new Error("El ingrediente a crear ya se encuentra registrado")
                return {status: 400, message: error.message}
            }
            if(!categoryInput.name || categoryInput.name.length === 0){
                const error = new Error("Es necesario especificar el nombre de la categoria a crear")
                return {status: 400, message: error.message}
            }else{
                const newCategory = new Category(categoryInput);
                const result = await newCategory.save()
                return result._id ? {
                    status: 200,
                    message: "Categoría Creada Correctamente",
                } : {
                    status: 401,
                    message: "Tuvimos un error al crear la categoría, inténtalo más tarde.",
                }
            }
        },

        async updateCategory(_: unknown, {id, categoryInput}: UpdateCategoryType) { // Este si funciona
            const queryCategory = await Category.findById(id)
            if(!queryCategory){
                const error = new Error("El ingrediente a actualizar no existe")
                return {status: 404, message: error.message}
            }
            if(!categoryInput.name || categoryInput.name.length === 0){
                const error = new Error("Es necesario especificar el nombre de la categoria a crear")
                return {status: 400, message: error.message}
            }else{
                const updatedName = categoryInput.name !== queryCategory.name ? categoryInput : queryCategory.name;
                const updatedIngredient = (await Category.updateOne({
                    _id: id
                }, {
                    name: updatedName
                }))
                return updatedIngredient
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado la categoría correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar la categoría"
                    }
            }
        },
        async deleteCategory(_: unknown, id: string){
            const queryCategory = await Category.findById(id)
            if(!queryCategory){
                const error = new Error("La categoría que intentas eliminar no existe")
                return {status: 404, message: error.message}
            }else{
                const result = (await queryCategory?.deleteOne())
                return result ? 
                {
                    status: 200, 
                    message: "Eliminamos la categoría correctamente"} 
                : {
                    status: 401, 
                    message: "Tuvimos un problema al eliminar esta categoría, inténtalo más tarde."
                }
            }
        },

        //CRUD Images
        async createImage(_: unknown, {imageInput}: CreateImageType) { // Este si funciona
            const queryImage = await Category.findOne({url: imageInput.url})
            if(queryImage){
                const error = new Error("La imagen a crear ya se encuentra registrado")
                return {status: 400, message: error.message}
            }
            if(!imageInput.name || imageInput.name.length === 0 || !imageInput.reference || !imageInput.url){
                const error = new Error("Es necesario especificar la referencia, la url y el nombre de la imagen")
                return {status: 400, message: error.message}
            }else{
                const url = uploadImage(imageInput.url, {
                    fileName: `image_${imageInput.name}`,
                    overwrite: true
                })

                const newImage = new Images({
                    name: imageInput.name,
                    url,
                    referece: imageInput.reference,
                    format: imageInput.format
                });
                const result = await newImage.save()
                return result._id ? {
                    status: 200,
                    message: "Imagen Creada Correctamente",
                } : {
                    status: 401,
                    message: "Tuvimos un error al crear la Imagen, inténtalo más tarde.",
                }
            }
        },

        async updateImage(_: unknown, {id, imageInput}: UpdateImageType) { // Este si funciona
            const queryImage = await Images.findById(id)
            if(!imageInput.name || imageInput.name.length === 0 || !imageInput.reference || !imageInput.url){
                const error = new Error("Es necesario especificar la referencia, la url y el nombre de la imagen")
                return {status: 400, message: error.message}
            }else{

                const url = uploadImage(imageInput.url, {
                    fileName: `image_${imageInput.name}`,
                    overwrite: true
                })
                const updatedName = imageInput.name !== queryImage?.name ? imageInput.name : queryImage?.name;
                const updatedUrl = await url !== queryImage?.url ? url : queryImage?.url;
                const updatedFormat = imageInput.format !== queryImage?.format ? imageInput.format : queryImage?.format;
                const updatedReference = imageInput.reference;
                const updatedImage = (await Images.updateOne({
                    _id: id
                }, {
                    name: updatedName,
                    url: updatedUrl,
                    format: updatedFormat,
                    reference: updatedReference,
                }))
                return updatedImage
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado la imagen correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar la imagen"
                    }
            }
        },

        async deleteImage(_: unknown, id: string){
            const queryImage = await Images.findById(id)
            if(!queryImage){
                const error = new Error("La imagen que intentas eliminar no existe")
                return {status: 404, message: error.message}
            }else{
                const result = (await queryImage?.deleteOne())
                return result ? 
                {
                    status: 200, 
                    message: "Eliminamos la imagen correctamente"} 
                : {
                    status: 401, 
                    message: "Tuvimos un problema al eliminar esta imagen, inténtalo más tarde."
                }
            }
        },

        //CRUD Promotions
        async createPromotion(_:unknown, {promotionInput}: CreatePromotionType){
            const {name, description, importantDetail, image, product, avaliable, endDate, price} = promotionInput
            if(!name || !description || !importantDetail || !image || !endDate){
                const error = new Error("Requerimos el nombre, descripción, algún detalle a destacar, la fecha de vigencia y la imagen para crear una promoción")
                return {status: 400, message: error.message}
            }
            if(!product || product.length === 0){
                const error = new Error("Neecesitas especificar los productos a incluir dentro de la promoción")
                return {status: 400, message: error.message}
            }
            if(!price || price <= 0){
                const error = new Error("El precio debe de ser mayor a 0")
                return {status: 400, message: error.message}
            }
            const updatedPromotion = await uploadImage(image, {
                fileName: `image_${name}`,
                overwrite: true
            })
            const newPromotion = new Promotion({
                name,
                description,
                image: updatedPromotion,
                price,
                avaliable,
                endDate,
                importantDetail,
                product: product
            });
            const result = await newPromotion.save()
            return {
                status: 200,
                message: "Promoción Creada Correctamente",
                id: result._id,
                name: result.name,
                price: result.price,
                image: updatedPromotion,
                endDate: result.endDate,
                avaliable: result.available,
                importantDetail: result.importantDetail,
                product: result.product,
            }
            
        },
        
        async updatePromotionStatus(_: unknown, {promotionId}: UpdatePromotionStatusType){
            const queryPromotion = await Promotion.findById(promotionId)
            if(!queryPromotion){
                const error = new Error("La promoción a modificar no existe")
                return {status: 400, message: error.message}
            }
            const updatedPromotion = (await Promotion.updateOne({
                _id: promotionId
            }, {
                avaliable: !queryPromotion.available,
            }))
            return updatedPromotion
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado el status de la promoción correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar el status"
                    }

        },
        //CRUD Order
        async createOrder(_: unknown, {orderInput}:CreateOrderType){
            // console.log(orderInput)
            const {address, product, date, total} = orderInput;
            if(!date || (!product?.product || !product?.promotion) || !total || total <= 0){
                const error = new Error("Requerimos que se ingrese la dirección de entrega, los productos y la fecha para poder registrar tu orden")
                return {status: 400, message: error.message}
            }else{
                console.log(orderInput)
                const createdOrder = new Order({
                    products: {
                        product: orderInput?.product?.product,
                        promotion: orderInput?.product?.promotion,
                    },
                    address: address,
                    date: orderInput.date,
                    statusOrder: orderInput.statusOrder,
                    total: orderInput.total,
                    userId: orderInput.userId ?? '',
                })
                await createdOrder.save()
                return {
                    status: 200,
                    message: "Orden Registrada correctamente, puedes utilizar el tracker para ver el proceso de preparación de ti pedido.",
                    id: createdOrder.id
                }
            }
        },
        async updateOrderStatus(_:unknown, {id, status}:UpdateOrderStatus){
            const foundOrder = await Order.findById(id)
            if(!foundOrder){
                const error = new Error("La orden que se intenta actualizar no existe")
                return {status: 404, message: error.message}
            }
            console.log(foundOrder)
            const updatedOrder = (await Order.updateOne({
                _id: id
            }, {
                statusOrder: status,
            }))
            console.log(updatedOrder)
            return updatedOrder
                ? 
                    {
                        status: 200, 
                        message: "Hemos actualizado el status de la orden correctamente"
                    } 
                : 
                    {  
                        status: 401, 
                        message: "Tuvimos un problema al actualizar el status"
                    }
        }
    }
}

export default resolvers