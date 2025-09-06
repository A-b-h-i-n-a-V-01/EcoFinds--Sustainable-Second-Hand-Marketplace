import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddEditProductPage from './pages/AddEditProductPage';
import MyListingsPage from './pages/MyListingsPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import FullScreenLoader from './components/FullScreenLoader';
import GlobalBackground from './components/GlobalBackground';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <FullScreenLoader />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { loading: productsLoading } = useProducts();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (authLoading || productsLoading) {
    return <FullScreenLoader />;
  }
  
  // Show header on homepage only if logged in
  const showHeader = !isHomePage || (isHomePage && !!currentUser);
  // Add padding to homepage only if logged in
  const addPadding = !isHomePage || (isHomePage && !!currentUser);

  return (
    <div className="bg-e-black min-h-screen font-sans text-e-white">
      <GlobalBackground />
      {showHeader && <Header />}
      <main className={addPadding ? "relative z-10 container mx-auto p-4 md:p-6" : "relative z-10"}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/add" element={<ProtectedRoute><AddEditProductPage /></ProtectedRoute>} />
          <Route path="/edit/:productId" element={<ProtectedRoute><AddEditProductPage /></ProtectedRoute>} />
          <Route path="/my-listings" element={<ProtectedRoute><MyListingsPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;