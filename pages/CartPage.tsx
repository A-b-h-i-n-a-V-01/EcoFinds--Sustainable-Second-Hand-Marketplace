import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import UiverseButton from '../components/UiverseButton';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        alert('Checkout successful! (This is a demo)');
        // In a real app, you would also create the order here.
        clearCart();
        navigate('/history');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-serif text-e-white mb-6">Your Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-e-gray-dark p-6 border border-e-gray-dark space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-e-gray-dark">
                                <div className="flex items-center gap-4">
                                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover flex-shrink-0"/>
                                    <div className="min-w-0">
                                        <h3 className="font-medium truncate text-e-white">{item.title}</h3>
                                        <p className="text-e-gray">Rs {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-e-gray hover:text-e-white p-2 transition-all" aria-label={`Remove ${item.title} from cart`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-e-gray-dark p-6 border border-e-gray-dark h-fit">
                        <h2 className="text-xl font-semibold mb-4 border-b border-e-gray-dark pb-3 text-e-white">Order Summary</h2>
                        <div className="space-y-2 text-e-gray">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Rs {cartTotal.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>
                        <div className="border-t border-e-gray-dark mt-4 pt-4 flex justify-between font-bold text-lg text-e-white">
                            <span>Total</span>
                            <span>Rs {cartTotal.toFixed(2)}</span>
                        </div>
                        <UiverseButton onClick={handleCheckout} variant="primary" className="mt-6 w-full">
                            Checkout
                        </UiverseButton>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 bg-e-gray-dark border border-e-gray-dark p-8">
                    <h2 className="text-xl text-e-white">Your cart is empty.</h2>
                    <Link to="/" className="mt-4 inline-block text-e-gold hover:underline font-medium">Start shopping</Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;