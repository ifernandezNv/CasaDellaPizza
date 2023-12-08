import axios from "axios";
import { Ingredient, IngredientQuantity } from "../__generated__/types";

export const uploadImage = async (image: File) => {
    try {
        const base64 = await fileToBase64(image)
        const formData: FormData = new FormData()
        const file = DataURIToBlob(base64 as string)
        formData.append("image", file)
        formData.append("upload_preset", "aureos")
        const {data} = await axios.post(`https://${import.meta.env.VITE_CLOUDINARY_API_KEY}:${import.meta.env.VITE_CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/aureos`, file)
        return {publicId: data?.public_id}
    } catch (error) {
        console.log(error)
    }
  
};

export const uniqueIngredients = (ingredients: IngredientQuantity[], ingredientsData: Ingredient[])=>{
    const totalIngredients: (Ingredient | IngredientQuantity)[] = [...ingredients, ...ingredientsData]
    const unique = totalIngredients?.filter((value, index, self) =>
    index === self.findIndex((t) => (
        t?.name === value?.name
    )))
    return unique
}
export const uniqueIngredientsWithQuantity = (ingredients: IngredientQuantity[], ingredientsData: Ingredient[])=>{
    const updatedIngredients = ingredientsData.map( ingredient => {return {...ingredient, quantity: 0}})
    const totalIngredients: (Ingredient | IngredientQuantity)[] = [...ingredients, ...updatedIngredients]
    const unique = totalIngredients?.filter((value, index, self) =>
    index === self.findIndex((t) => (
        t?.name === value?.name
    )))
    return unique
}

export const formatAmount = (amount: number)=>{
    return amount?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}

export const formatDate = (date: string | Date)=>{
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    })
}
export const regex = /.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

export const regexPhone = /[0-9]{3}-[0-9]{3}-[0-9]{4}$/

export const regexCCNumber = /[0-9]{4}-[0-9]{4}-[0-9]{4}$/
export const fileToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
});

export const  DataURIToBlob = (dataURI: string) => {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
}