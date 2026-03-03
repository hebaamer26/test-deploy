import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../types/CartTypes";
import { CartResponse } from "../types/CartTypes";
import { PayloadAction } from "@reduxjs/toolkit";


 export interface CartState {
  numOfCartItems: number,
  cartId: string|null,
  products:CartProduct[],
  totalCartPrice:number,
  isLoading:boolean,
  error:string|null
}

const initialState:CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers:{
    setCartInfo: function(state, action: PayloadAction<CartResponse>) {
    state.cartId = action.payload.cartId;
    state.numOfCartItems = action.payload.numOfCartItems;
    state.products = action.payload.data.products;
    state.totalCartPrice = action.payload.data.totalCartPrice;
    },

removeProduct: function(state, action: PayloadAction<{id: string}>) {
  const productId = action.payload.id;
  const removedProduct = state.products.find((item) => item.product._id == productId);

  if (removedProduct) {
    state.products = state.products.filter((product) => product.product._id !== productId);
    state.numOfCartItems = state.products.length;
    state.totalCartPrice -= removedProduct.price * removedProduct.count;
  }
  },

  clearCart: function(state){
  state.cartId = null;
  state.numOfCartItems = 0;
  state.products = [];
  state.totalCartPrice = 0;
}
}
})



export const CartReducers = CartSlice.reducer
export const { setCartInfo,removeProduct,clearCart } = CartSlice.actions
