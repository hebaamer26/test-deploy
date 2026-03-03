import { AuthReducers, authState } from '@/features/auth/store/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { CartReducers, CartState } from '@/features/cart/store/CartSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { WishlistReducer, WishlistState } from '@/features/Wishlist/Store/WishlistSlice'
import { uiReducer } from './uiSlice'




export type preloadedStateType = {
  Auth: authState,
  Cart: CartState,
  Wishlist: WishlistState,
  ui: any
}

export function createStore(preloadedState: preloadedStateType) {
  const AppStore = configureStore({
    reducer: {
      Auth: AuthReducers,
      Cart: CartReducers,
      Wishlist: WishlistReducer,
      ui: uiReducer
    },
    preloadedState
  })
  return AppStore
}

export type AppStoreType = ReturnType<typeof createStore>
export type appStateType = ReturnType<AppStoreType['getState']>
export type appDispatch = AppStoreType['dispatch']

