"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner3 } from "react-icons/im";
import { GetUserOrdersServerAction } from "../server/OrdersServer";
import { Order } from "../types/OrdersTypes";
import EmptyOrders from "./EmptyOrders";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { authState } from "@/features/auth/store/authSlice";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // We can use auth state to verify if the user is logged in, 
    // though the server action also checks the token.
    const auth = useSelector((state: { Auth: authState }) => state.Auth);

    useEffect(() => {
        async function fetchOrders() {
            setIsLoading(true);
            try {
                const response = await GetUserOrdersServerAction();
                if (response.success && response.data) {
                    setOrders(response.data);
                } else {
                    if (auth.isAuthentication) {
                        toast.error(response.message || "Failed to fetch orders");
                    }
                }
            } catch (error) {
                toast.error("An unexpected error occurred while fetching orders.");
            } finally {
                setIsLoading(false);
            }
        }

        if (auth.isAuthentication) {
            fetchOrders();
        } else {
            setIsLoading(false);
        }

    }, [auth.isAuthentication]);

    if (!auth.isAuthentication) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                <p className="text-gray-500">Please log in to view your orders.</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <ImSpinner3 className="animate-spin text-orange-400 text-4xl" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-orange-400 mb-2">My Orders</h1>
                <p className="text-gray-500">
                    View and track your previous orders
                </p>
            </div>

            {orders.length === 0 ? (
                <EmptyOrders />
            ) : (
                <div>
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}
