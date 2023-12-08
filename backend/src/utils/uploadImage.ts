import {v2 as cloudinary} from "cloudinary";

export type OptionsType = {
    fileName: string,
    overwrite: boolean,
}
export const uploadImage = async (imagePath: string, options: OptionsType) => {
    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result.url;
    } catch (error) {
      console.error(error);
    }
};