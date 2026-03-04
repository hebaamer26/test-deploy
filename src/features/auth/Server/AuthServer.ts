'use server'

import { cookies } from 'next/headers'
import { authState } from '../store/authSlice'
import type { UserProfile } from '@/features/profile/types/ProfileTypes'
import axios, { AxiosRequestConfig } from 'axios'
 
export default async function SetToken(token:string,rememberUser:boolean):Promise<void> {
  const cookieStore = await cookies()
  if(rememberUser){
      cookieStore.set("token",token,{
        httpOnly:true,
        maxAge: 30*24*60*60
      })

  }else{
    cookieStore.set("token",token,{
        httpOnly:true,
        maxAge: 1*24*60*60,
        secure:true
      })
  }

}


export async function GetToken():Promise<string|null>{
    const cookieStore = await cookies()
    const token =  cookieStore.get('token')?.value ||null
    return token

}


export async function RemoveToken():Promise<void>{
    const cookieStore = await cookies()
     cookieStore.delete('token')
  
}

// verify token


export async function verifyToken():Promise<authState>{
    const cookieStore = await cookies()
    const token =  cookieStore.get('token')?.value ||null

    //check if not found
    if(!token){
        return{
            isAuthentication:false,
            userInfo:null
        }
    }

    try {
        const options:AxiosRequestConfig = {
            url:"https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
            method:'GET',
            headers:{
                token
            }

        }

        const {data}=await axios.request(options)

       const {id,name,role,}= data.decoded
        if(data.message=="verified"){
            return{
            isAuthentication:true,
            userInfo:{
                id,name,role
 
            }
        }

        }
        return {
            isAuthentication:false,
            userInfo:null
        }
    } catch {
        return {
            isAuthentication:false,
            userInfo:null
        }
        
    }

}

/** Fetches the logged-in user's profile (name, email, address, etc.) from the backend. */
export async function getLoggedUserProfile(): Promise<UserProfile | null> {
    const auth = await verifyToken()
    if (!auth.isAuthentication || !auth.userInfo) return null

    const { id, name, role } = auth.userInfo
    const fallbackId = id ?? ''
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null
    if (!token) return { id: fallbackId, name, role }

    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/users/getMe',
            method: 'GET',
            headers: { token },
        }
        const { data } = await axios.request(options)
        const user = data?.data?.user ?? data?.user ?? data?.data ?? data
        if (user && typeof user === 'object') {
            return {
                id: String(user._id ?? user.id ?? fallbackId),
                name: user.name ?? name,
                role: user.role ?? role,
                email: user.email ?? null,
                phone: user.phone ?? null,
                address: user.address ?? user.shippingAddress?.details ?? null,
                city: user.city ?? user.shippingAddress?.city ?? null,
                country: user.country ?? user.shippingAddress?.country ?? null,
            }
        }
    } catch {
        // API may not have getMe; use token payload only
    }
    return { id: fallbackId, name, role }
}