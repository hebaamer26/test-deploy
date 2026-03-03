import { user } from '@heroui/react';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type user={
    id?:string,
    name:string,
    email?:string,
    role:string

}

export type authState ={
  isAuthentication:boolean,
  userInfo:user|null
}

const initialState:authState= {
  isAuthentication:false,
  userInfo:null
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    SetAuthInfo:function(state,action: PayloadAction<authState>){
        state.isAuthentication=action.payload.isAuthentication;
        state.userInfo=action.payload.userInfo;


    }
    
  },
})


export const { SetAuthInfo } = AuthSlice.actions
export const AuthReducers = AuthSlice.reducer
