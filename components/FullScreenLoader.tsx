import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const FullScreenLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-e-black flex flex-col items-center justify-center z-[100]">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-e-white font-medium">Loading EcoFinds...</p>
        </div>
    );
};

export default FullScreenLoader;