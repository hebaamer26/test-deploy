'use server'
import axios, { Axios, AxiosRequestConfig } from "axios"
import {  categoriesResponse } from "../types/CategoriesTypes"


export default async function CategoriesAction():Promise<categoriesResponse> {

    try {
        
        const options:AxiosRequestConfig={

            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET"
        }
        const {data}= await axios.request(options)
        return data
        
    } catch (error) {
        throw error
        
    }






  
}
