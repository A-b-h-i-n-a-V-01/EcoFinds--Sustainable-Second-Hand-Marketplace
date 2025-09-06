import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UiverseButton from '../components/UiverseButton';

const DashboardPage: React.FC = () => {
    const { currentUser } = useAuth();
    
    const [username, setUsername] = useState(currentUser?.username || '');
    const [email, setEmail] = useState(currentUser?.email || '');

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Profile saved for ${username}! (This is a demo)`);
    };

    return (
        <div className="max-w-2xl mx-auto bg-e-gray-dark p-8 border border-e-gray-dark">
            <h1 className="text-3xl font-bold font-serif text-e-white mb-6">User Dashboard</h1>
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-e-gray-dark">
                 <div className="w-20 h-20 border border-e-gray-dark flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-e-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                 <div>
                    <h2 className="text-2xl font-semibold text-e-white">{currentUser.username}</h2>
                    <p className="text-e-gray">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                 </div>
            </div>

            <form onSubmit={handleSaveChanges} className="space-y-6">
                 <div>
                    <label htmlFor="username" className="block text-sm font-medium text-e-gray mb-1">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-transparent block w-full px-3 py-3 border border-e-gray-dark text-e-white focus:border-e-gold" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-e-gray mb-1">Email Address</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent block w-full px-3 py-3 border border-e-gray-dark text-e-white focus:border-e-gold" />
                </div>
                 <div className="text-right pt-4">
                    <UiverseButton type="submit" variant="primary">
                        Save Changes
                    </UiverseButton>
                </div>
            </form>
        </div>
    );
};

export default DashboardPage;