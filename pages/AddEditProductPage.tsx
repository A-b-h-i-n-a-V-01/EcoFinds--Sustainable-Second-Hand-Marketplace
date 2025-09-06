import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Category, Product } from '../types';
import { generateDescription } from '../services/geminiService';
import UiverseButton from '../components/UiverseButton';
import LoadingSpinner from '../components/LoadingSpinner';

const MaterialInput: React.FC<(React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement> | React.SelectHTMLAttributes<HTMLSelectElement>) & { label: string; as?: 'input' | 'textarea' | 'select' }> = ({ label, id, as = 'input', children, ...props }) => (
    <div className="relative">
        {as === 'textarea' ? (
            <textarea id={id} className="block px-3 pb-2.5 pt-4 w-full text-sm text-e-white bg-transparent border border-e-gray-dark appearance-none focus:outline-none focus:ring-0 focus:border-e-gold peer" placeholder=" " {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}></textarea>
        ) : as === 'select' ? (
             <select id={id} className="block px-3 pb-2.5 pt-4 w-full text-sm text-e-white bg-e-gray-dark border border-e-gray-dark appearance-none focus:outline-none focus:ring-0 focus:border-e-gold peer" {...props as React.SelectHTMLAttributes<HTMLSelectElement>}>{children}</select>
        ) : (
            <input id={id} className="block px-3 pb-2.5 pt-4 w-full text-sm text-e-white bg-transparent border border-e-gray-dark appearance-none focus:outline-none focus:ring-0 focus:border-e-gold peer" placeholder=" " {...props as React.InputHTMLAttributes<HTMLInputElement>} />
        )}
        <label htmlFor={id} className="absolute text-sm text-e-gray duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-e-gray-dark px-2 peer-focus:px-2 peer-focus:text-e-gold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
            {label}
        </label>
    </div>
);


const AddEditProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { getProductById, addProduct, updateProduct } = useProducts();
    const { currentUser } = useAuth();

    const isEditMode = Boolean(productId);
    const [product, setProduct] = useState<Omit<Product, 'id' | 'createdAt' | 'seller'>>({
        title: '',
        description: '',
        category: Category.Other,
        price: 0,
        imageUrl: '',
    });
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (isEditMode && productId) {
            const existingProduct = getProductById(productId);
            if (existingProduct && currentUser && existingProduct.seller.id === currentUser.id) {
                setProduct(existingProduct);
            } else {
                navigate('/my-listings');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, isEditMode, getProductById, navigate, currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleGenerateDescription = async () => {
        if (!product.title || !product.category) {
            alert('Please provide a title and category first.');
            return;
        }
        setIsGenerating(true);
        const description = await generateDescription(product.title, product.category);
        setProduct(prev => ({ ...prev, description }));
        setIsGenerating(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        if (isEditMode && productId) {
            const existingProduct = getProductById(productId);
            if (existingProduct) {
                 updateProduct({ ...existingProduct, ...product });
            }
        } else {
            addProduct({ ...product, seller: currentUser });
        }
        navigate('/my-listings');
    };

    return (
        <div className="max-w-2xl mx-auto bg-e-gray-dark border border-e-gray-dark p-8">
            <h1 className="text-3xl font-bold font-serif text-e-white mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <MaterialInput label="Title" name="title" id="title" value={product.title} onChange={handleChange} required />
                <MaterialInput label="Category" as="select" name="category" id="category" value={product.category} onChange={handleChange} required>
                    {Object.values(Category).map(cat => (
                        <option key={cat} value={cat} className="bg-e-gray-darker text-e-white">{cat}</option>
                    ))}
                </MaterialInput>
                <div>
                    <MaterialInput as="textarea" label="Description" name="description" id="description" rows={4} value={product.description} onChange={handleChange} required />
                    <div className="text-right mt-1">
                        <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="text-sm text-e-gold font-medium hover:text-e-white disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider flex items-center justify-end gap-2 h-6">
                            {isGenerating ? (
                                <>
                                    <LoadingSpinner className="uib-override" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                '✨ Generate with AI'
                            )}
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MaterialInput label="Price (Rs)" type="number" name="price" id="price" value={product.price} onChange={handleChange} required min="0" step="0.01" />
                    <MaterialInput label="Image URL" type="text" name="imageUrl" id="imageUrl" value={product.imageUrl} onChange={handleChange} required placeholder="https://picsum.photos/..." />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                     <UiverseButton type="button" onClick={() => navigate(-1)} variant="secondary">Cancel</UiverseButton>
                    <UiverseButton type="submit" variant="primary">
                        {isEditMode ? 'Save Changes' : 'Submit Listing'}
                    </UiverseButton>
                </div>
            </form>
        </div>
    );
};

export default AddEditProductPage;