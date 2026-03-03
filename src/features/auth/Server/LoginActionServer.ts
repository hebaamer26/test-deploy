'use server'
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { LoginSchema, LoginTypes } from "../schemas/LoginSchema"

export async function LoginServerAction(userData :LoginTypes){

    //server validation

    const validationResult=LoginSchema.safeParse(userData)
    if(!validationResult.success){
        const errors:Record<string,string> ={}
        validationResult.error.issues.forEach((issue)=>{

            const field=issue.path[0] as string
            const message=issue.message
            if(!errors[field]){
               errors[field]=message
            }
        })
 
        return {
          success:false,
          message:"validation errors",
          errors
        }
        
    }
      

// pass server validation ✅

try {
      const {rememberUser , ...requestData}= userData


    const options:AxiosRequestConfig={
        url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
        method:"post",
        data:requestData
    }
   const {data}= await axios.request(options)
    if(data.message =='success'){

                return {
                    success:true,
                    message:'Welcome Back!',
                    data
                }
            }
            return{
                success:false,
                message: data.message || 'Login failed'

            }
    
  } catch (error) {
    if(error instanceof AxiosError){
                    const errorMessage = error.response?.data.message
                    if(errorMessage== "Incorrect email or password"){
                        return{
                            success:false,
                            message:"wrong credentials",
                            errors:{
                                password:"Incorrect email or password"
                            }
                        }
                    }
                }
                return{
                    success:false,
                    message:"Login failed"
                }
                

}

}