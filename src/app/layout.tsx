
import { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import AppProviders from "@/components/Providers/Providers";
import { verifyToken } from "@/features/auth/Server/AuthServer";
import { CartState } from '../features/cart/store/CartSlice';
import { getLoggedUserCart } from "@/features/cart/Server/CartServerAction";
import { WishlistState, WishlistReducer } from "@/features/Wishlist/Store/WishlistSlice";
import { getLoggedUserWishlist } from "@/features/Wishlist/Server/WishlistServerAction";
import { UiState, uiReducer } from "@/store/uiSlice";


let cartState: CartState = {
  numOfCartItems: 0,
  cartId: "",
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
}


const initialUiState = uiReducer(undefined, { type: '@@INIT' } as any);

export default async function RootLayout({ children }: { children: ReactNode }) {
  const AuthResponse = await verifyToken();
  let initialWishlistState = WishlistReducer(undefined, { type: '@@INIT' } as any);

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
      };

    } catch (error) {
    }

    try {
      const wishlistResponse = await getLoggedUserWishlist();
      initialWishlistState = {
        numOfItems: wishlistResponse.count,
        products: wishlistResponse.data,
        isLoading: false,
        error: null
      };
    } catch (error) {
    }
  }
  return (
    <>
      <html>
        <body>


          <AppProviders preloadedState={{ Auth: AuthResponse, Cart: cartState, Wishlist: initialWishlistState, ui: initialUiState }}>

            <Navbar />
            {children}
            <Footer />

          </AppProviders>









        </body>
      </html>




    </>
  )
}

