import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProduct, wishlistResponse } from "../Types/WishlistTypes";

export interface WishlistState {
  numOfItems: number;
  products: WishlistProduct[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  numOfItems: 0,
  products: [],
  isLoading: false,
  error: null,
};

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
   
    setWishlistInfo: function (state, action: PayloadAction<wishlistResponse>) {
      state.products = action.payload.data;
      state.numOfItems = action.payload.count;
    },


   removeProduct: function (
  state,
  action: PayloadAction<{ id: string }>
) {
  const productId = action.payload.id;
  const removedProduct = state.products.find(
    (item) => item._id === productId
  );

  if (removedProduct) {
    state.products = state.products.filter(
      (item) => item._id !== productId
    );
    state.numOfItems = state.products.length;

   
  }
}

   
  },
});

export const WishlistReducer = WishlistSlice.reducer;
export const { setWishlistInfo, removeProduct } = WishlistSlice.actions;