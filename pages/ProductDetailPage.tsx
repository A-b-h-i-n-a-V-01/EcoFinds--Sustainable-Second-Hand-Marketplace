import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import UiverseButton from '../components/UiverseButton';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { getProductById } = useProducts();
    const { addToCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const product = productId ? getProductById(productId) : undefined;

    if (!product) {
        return (
            <div className="text-center py-20 border border-e-gray-dark">
                <h2 className="text-3xl font-bold">Product not found</h2>
                <UiverseButton as="link" to="/" variant="primary" className="mt-6">Go Home</UiverseButton>
            </div>
        );
    }
    
    const handleAddToCart = () => {
        if (!currentUser) {
            navigate('/login');
        } else {
            addToCart(product);
        }
    }

    return (
        <div className="bg-e-gray-dark p-6 sm:p-8 border border-e-gray-dark">
            <Link to="/" className="text-e-gold hover:underline mb-6 inline-block font-medium">&larr; Back to all products</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                    <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover border border-e-gray-dark" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-e-gray uppercase tracking-wider">{product.category}</span>
                    <h1 className="text-4xl font-bold font-serif text-e-white my-2">{product.title}</h1>
                    <p className="text-4xl font-bold text-e-gold mb-4">Rs {product.price.toFixed(2)}</p>
                    <div className="prose max-w-none text-e-gray mb-6 leading-relaxed">
                       <p>{product.description}</p>
                    </div>
                    <div className="border-t border-e-gray-dark mt-auto pt-4 text-sm text-e-gray">
                        <p>Sold by: <span className="font-medium text-e-white">{product.seller.username}</span></p>
                        <p>Listed on: <span className="font-medium text-e-white">{new Date(product.createdAt).toLocaleDateString()}</span></p>
                    </div>
                    <div className="mt-6">
                        <UiverseButton
                            onClick={handleAddToCart}
                            variant="primary"
                            className="w-full"
                        >
                            Add to Cart
                        </UiverseButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;