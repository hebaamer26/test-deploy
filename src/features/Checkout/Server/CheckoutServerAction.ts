'use server'
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CheckoutTypes } from "../Schema/CheckoutSchema";

type shippingAddress = {
  details: string;
  phone: string;
  city: string;
};
export async function createCashOrder({
  cartId,
  shippingAddress,

}: {
  cartId: string;
  shippingAddress: CheckoutTypes;

}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        shippingAddress,
      },
    };

    const {data}=await axios.request(options)
    return data
  } catch (error) {
    throw error
  }
}

export async function createOnlineOrder({
  cartId,
  shippingAddress,
  url
}: {
  cartId: string;
  shippingAddress: CheckoutTypes;
  url:string
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        shippingAddress,
      },
    };

    const {data}=await axios.request(options)
    return data
  } catch (error) {
    throw error
  }
}
