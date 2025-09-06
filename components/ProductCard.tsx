import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-e-gray-dark border border-e-gray-dark hover:border-e-gold transition-colors duration-300 group">
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-48">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                    <span className="text-e-gold text-xs font-bold uppercase tracking-widest mb-2 block">{product.category}</span>
                    <h3 className="text-lg font-medium text-e-white truncate" title={product.title}>{product.title}</h3>
                    <p className="text-xl font-bold text-e-gold mt-2">Rs {product.price.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;