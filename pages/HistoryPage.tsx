import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';
import { Order } from '../types';

const HistoryPage: React.FC = () => {
    const { currentUser } = useAuth();

    // Filter mock orders for the current user
    const userOrders: Order[] = currentUser ? mockOrders.filter(order => order.buyer.id === currentUser.id) : [];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-serif text-e-white mb-6">Previous Purchases</h1>
            
            {userOrders.length > 0 ? (
                <div className="space-y-6">
                    {userOrders.map(order => (
                        <div key={order.id} className="bg-e-gray-dark border border-e-gray-dark overflow-hidden">
                            <div className="bg-e-gray-darker flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-e-gray-dark">
                                <div>
                                    <h2 className="text-lg font-semibold text-e-white">Order #{order.id}</h2>
                                    <p className="text-sm text-e-gray">
                                        Purchased on: {new Date(order.purchaseDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-lg font-bold text-e-white mt-2 md:mt-0">
                                    Total: Rs {order.totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <div className="p-4 space-y-4">
                                {order.products.map(product => (
                                    <div key={product.id} className="flex items-center gap-4">
                                        <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover flex-shrink-0"/>
                                        <div className="min-w-0">
                                            <p className="font-medium truncate text-e-white">{product.title}</p>
                                            <p className="text-sm text-e-gray">Rs {product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <p className="text-center text-sm text-e-gray pt-4">Note: After checkout, new orders will appear here in a real application.</p>
                </div>
            ) : (
                <div className="text-center py-10 bg-e-gray-dark border border-e-gray-dark p-8">
                    <h2 className="text-xl text-e-white">You have no past orders.</h2>
                    <p className="text-e-gray mt-2">Your purchase history will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;