
import { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import AppProviders from "@/components/Providers/Providers";
import { verifyToken } from "@/features/auth/Server/AuthServer";
import {  CartState } from '../features/cart/store/CartSlice';
import { getLoggedUserCart } from "@/features/cart/Server/CartServerAction";


let cartState:CartState={
      numOfCartItems: 0,
      cartId: "",
      products: [],
      totalCartPrice: 0,
      isLoading: false,
      error: null,
    }


export default async function RootLayout({children}:{children:ReactNode}) {
  const AuthResponse = await verifyToken()
  if (AuthResponse.isAuthentication) {
  try {
    const cartResponse = await getLoggedUserCart();
    cartState = {
      cartId: cartResponse.cartId,
      totalCartPrice: cartResponse.data.totalCartPrice,
      products: cartResponse.data.products,
      numOfCartItems: cartResponse.numOfCartItems,
      isLoading: false,
      error: null
    }

  } catch (error) {
  }
}
  return (
   <>
   <html>
    <body>
      

      <AppProviders preloadedState={{Auth: AuthResponse, Cart:cartState}}>

        <Navbar/>
        {children}
        <Footer/>

      </AppProviders>

      

 





    </body>
   </html>
   
   
   
   
   </>
  )
}

