'use server'
import {  SignupSchema, SignupTypes } from '../schemas/SignupSchema';
import axios, { AxiosError } from 'axios';




export async function SignupServerAction(userData :SignupTypes){

    //server validation

    const validationResult=SignupSchema.safeParse(userData)
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
   // create an account 
    
        try {
           const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",userData)
            if(data.message =='success'){

                return {
                    success:true,
                    message:'Account created successfully',
                    data
                }
            }
            return{
                success:false,
                message: data.message || 'Signup failed'

            }
        } catch (error) {
            if(error instanceof AxiosError){
                const errorMessage = error.response?.data.message
                if(errorMessage== "Account Already Exists"){
                    return{
                        success:false,
                        message:"Account exist",
                        errors:{
                            email:"an account with this email already exist"
                        }
                    }
                }
            }
            return{
                success:false,
                message:"Something went wrong ,please try again later"
            }
            
            
        }




}


