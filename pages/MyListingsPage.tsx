import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import UiverseButton from '../components/UiverseButton';

const MyListingsPage: React.FC = () => {
    const { products, deleteProduct } = useProducts();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const myProducts = products.filter(p => p.seller.id === currentUser?.id);

    const handleDelete = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            deleteProduct(productId);
        }
    };
    
    return (
        <div className="bg-e-gray-dark p-8 border border-e-gray-dark">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-e-gray-dark">
                <h1 className="text-3xl font-bold font-serif text-e-white">My Listings</h1>
                <UiverseButton as="link" to="/add" variant="primary">
                    Add Product
                </UiverseButton>
            </div>

            {myProducts.length > 0 ? (
                <div className="space-y-4">
                    {myProducts.map(product => (
                        <div key={product.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-e-gray-dark">
                            <div className="flex items-center gap-4 flex-grow mb-4 md:mb-0 w-full md:w-auto">
                                <img src={product.imageUrl} alt={product.title} className="w-20 h-20 object-cover flex-shrink-0"/>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-medium truncate text-e-white">{product.title}</h3>
                                    <p className="text-e-gray font-medium">Rs {product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <UiverseButton onClick={() => navigate(`/edit/${product.id}`)} variant="dark">Edit</UiverseButton>
                                <UiverseButton onClick={() => handleDelete(product.id)} variant="danger">Delete</UiverseButton>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-xl text-e-white">You haven't listed any products yet.</h2>
                    <p className="text-e-gray mt-2">Click the button above to add your first product!</p>
                </div>
            )}
        </div>
    );
};

export default MyListingsPage;