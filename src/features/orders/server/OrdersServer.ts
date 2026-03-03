'use server'
import axios, { AxiosError } from "axios"
import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode";
import { Order } from "../types/OrdersTypes";

interface JwtPayload {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}

export async function GetUserOrdersServerAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return {
                success: false,
                message: "No authentication token found",
            }
        }

        const decodedToken = jwtDecode<JwtPayload>(token);
        const userId = decodedToken.id;

        if (!userId) {
            return {
                success: false,
                message: "Invalid token structure",
            }
        }

        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            headers: {
                token: token
            }
        })

        return {
            success: true,
            data: data as Order[]
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to fetch orders";
            return {
                success: false,
                message: errorMessage,
            }
        }
        return {
            success: false,
            message: "Failed to fetch orders. Please try again later."
        }
    }
}
