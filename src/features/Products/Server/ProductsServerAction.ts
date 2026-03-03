'use server'
import axios, { Axios, AxiosRequestConfig } from "axios";
import { ProductDetailsResponse, ProductsResponse, ProductsTypes } from "../Types/AllProductsTypes";
export default async function AllProductsServerAction():Promise<ProductsResponse> {

    try {
       const options:AxiosRequestConfig={
        url:"https://ecommerce.routemisr.com/api/v1/products",
        method:"GET"
       }
       const {data}= await axios.request(options)
       return data
    
   } catch (error) {
    throw error
    
   }
 
}



export async function ProductDetailsServerAction({id}:{id:string}):Promise<ProductDetailsResponse> {

    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method:"GET"
        }
       const{data} = await axios.request(options)
       return data

    } catch (error) {
        throw error
    }
 
}

/** Fetches products filtered by brand (uses API param when supported, otherwise filters in code). */
export async function ProductsByBrandServerAction(brandId: string): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
      params: { brand: brandId },
    };
    const { data } = await axios.request(options);
    const list = Array.isArray(data?.data) ? data.data : data?.data ?? [];
    const filtered = list.filter((p: { brand?: { _id?: string } }) => p?.brand?._id === brandId);
    return {
      ...data,
      data: filtered,
      results: filtered.length,
    };
  } catch (error) {
    throw error;
  }
}

/** Fetches products filtered by category (uses API param when supported, otherwise filters in code). */
export async function ProductsByCategoryServerAction(categoryId: string): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
      params: { category: categoryId },
    };
    const { data } = await axios.request(options);
    const list = Array.isArray(data?.data) ? data.data : data?.data ?? [];
    const filtered = list.filter((p: { category?: { _id?: string } }) => p?.category?._id === categoryId);
    return {
      ...data,
      data: filtered,
      results: filtered.length,
    };
  } catch (error) {
    throw error;
  }
}
