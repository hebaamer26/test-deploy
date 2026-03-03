"use server";

import axios, { AxiosRequestConfig } from "axios";
import { BrandsResponse } from "../types/BrandsTypes";

export default async function BrandsServerAction(): Promise<BrandsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
