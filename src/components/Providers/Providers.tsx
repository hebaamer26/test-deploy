'use client'
import { ReactNode } from "react";
import { Provider } from 'react-redux'
import { AppStoreType, createStore, preloadedStateType } from '@/store/AppStore';
import { ToastContainer, Bounce } from 'react-toastify';
import { HeroUIProvider } from "@heroui/react";
import { useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import AuthModal from '@/components/shared/AuthModal';

type providerProps = {
  children: ReactNode,
  preloadedState: preloadedStateType
}


export default function AppProviders({ children, preloadedState }: providerProps) {
  const AppStore = createStore(preloadedState)
  const storeRef = useRef<null | AppStoreType>(null)
  if (!storeRef.current) {
    storeRef.current = AppStore
  }
  return (

    <Provider store={AppStore}>

      <HeroUIProvider>
        {children}
        <AuthModal />
        <ToastContainer
          position="top-right"
          autoClose={1900}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </HeroUIProvider>
    </Provider>


  )
}
