import { Order } from "../types/OrdersTypes";

export default function OrderCard({ order }: { order: Order }) {
    const getStatusColor = (isDelivered: boolean) => {
        return isDelivered
            ? "bg-green-100 text-green-700 border-green-200"
            : "bg-blue-100 text-blue-700 border-blue-200";
    };

    const getStatusText = (isDelivered: boolean) => {
        return isDelivered ? "Delivered" : "Processing";
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="bg-gray-50 border-b border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Order ID
                    </p>
                    <p className="font-mono font-medium text-gray-900">#{order.id}</p>
                </div>

                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Date
                        </p>
                        <p className="text-gray-900 font-medium">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(order.isDelivered)}`}>
                            {getStatusText(order.isDelivered)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Details */}
            <div className="p-6">
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Shipping Information</h4>
                        <div className="text-gray-700 text-sm">
                            {order.shippingAddress ? (
                                <>
                                    <p className="font-medium text-gray-900 mb-1">{order.user.name}</p>
                                    <p>{order.shippingAddress.details}</p>
                                    <p>{order.shippingAddress.city}</p>
                                    <p>Phone: {order.shippingAddress.phone}</p>
                                </>
                            ) : (
                                <p>No shipping address provided</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Payment Details</h4>
                        <div className="text-gray-700 text-sm">
                            <p className="flex justify-between mb-1">
                                <span>Method:</span>
                                <span className="font-medium uppercase">{order.paymentMethodType}</span>
                            </p>
                            <p className="flex justify-between mb-1">
                                <span>Items Price:</span>
                                <span>EGP {order.totalOrderPrice - order.taxPrice - order.shippingPrice}</span>
                            </p>
                            <p className="flex justify-between mb-1">
                                <span>Shipping:</span>
                                <span>EGP {order.shippingPrice}</span>
                            </p>
                            <p className="flex justify-between border-t border-gray-100 mt-2 pt-2 font-bold text-gray-900 text-base">
                                <span>Total:</span>
                                <span className="text-orange-500">EGP {order.totalOrderPrice}</span>
                            </p>
                            <div className="mt-2">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {order.isPaid ? "Paid" : "Unpaid"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2">Items</h4>
                    <div className="divide-y divide-gray-100">
                        {order.cartItems.map((item) => (
                            <div key={item._id} className="py-4 flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.product?.imageCover}
                                        alt={item.product?.title || 'Product'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.product?.title || 'Unknown Product'}
                                    </p>
                                    <div className="mt-1 flex items-center text-sm text-gray-500 gap-4">
                                        <span>Qty: {item.count}</span>
                                        <span>EGP {item.price}</span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-right font-medium text-gray-900">
                                    EGP {item.count * item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
