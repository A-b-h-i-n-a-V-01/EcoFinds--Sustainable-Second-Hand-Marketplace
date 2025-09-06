import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import UiverseButton from '../components/UiverseButton';
import { Link } from 'react-router-dom';
import { Category } from '../types';

// Floating Action Button Component
const FloatingActionButton: React.FC = () => (
  <Link 
    to="/add" 
    className="fixed bottom-6 right-6 bg-e-gold text-e-black w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-yellow-300 transition-colors z-40"
    aria-label="Add new product"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </Link>
);


// --- Landing Page Components (for logged-out users) ---

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isVisible;
};

const AnimatedSection: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLElement>> = ({ children, className = '', ...rest }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className={`scroll-animate ${isVisible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </section>
  );
};

const MinimalHeader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const { currentUser } = useAuth();
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'bg-e-black/80 backdrop-blur-sm border-b border-e-gray-dark' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-e-white">
          <span className="font-serif font-bold tracking-wide">EcoFinds</span>
        </Link>
        <div className="flex items-center gap-4">
          <UiverseButton as="link" to={currentUser ? '/my-listings' : '/login'} variant="primary">
            {currentUser ? 'My Account' : 'Sign In'}
          </UiverseButton>
        </div>
      </div>
    </header>
  );
};

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-16 h-16 border border-e-gold/30 bg-e-gold/10 flex items-center justify-center mb-4">
        {children}
    </div>
);
const ListingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-e-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const AuthIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-e-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>);
const CategoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-e-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>);

const LandingPage: React.FC = () => {
    const { products } = useProducts();
    const { currentUser } = useAuth();
    const featuredProducts = products.slice(0, 4);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHeaderVisible(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative">
            <MinimalHeader isVisible={headerVisible} />

            <section className="h-screen min-h-[700px] flex items-center justify-center text-center relative z-10 px-4">
                <div>
                    <h1 className="text-5xl md:text-8xl font-black font-serif text-e-white leading-tight">
                        Give Goods a Second Life.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-e-gray-light max-w-2xl mx-auto">
                        EcoFinds is the marketplace for pre-owned treasures, helping build a circular economy one discovery at a time.
                    </p>
                    <div className="mt-10">
                        <UiverseButton as="link" to="#fresh-finds" variant="primary" className="text-lg px-8 py-4">
                           Browse Listings
                        </UiverseButton>
                    </div>
                </div>
            </section>
            
            <div className="relative z-10 bg-e-black">
                <div className="container mx-auto px-6 space-y-32 md:space-y-48 py-24">
                    <AnimatedSection className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-e-white">Rethink 'New'.</h2>
                        <p className="mt-4 text-lg text-e-gray-light">
                            Consumer waste is a defining challenge of our generation. By choosing second-hand, you're not just finding unique items; you're making a conscious choice to reduce environmental impact and champion sustainability.
                        </p>
                    </AnimatedSection>
                    
                    <AnimatedSection>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-e-white">Welcome to EcoFinds.</h2>
                                <p className="mt-4 text-lg text-e-gray-light">
                                    We are the solution. A curated, community-driven marketplace where quality pre-owned goods find new homes. Our platform makes it simple and secure to buy and sell, empowering a movement of conscious consumption.
                                </p>
                            </div>
                            <div className="relative h-80">
                                <img src="https://picsum.photos/seed/solution1/400/300" alt="product collage 1" className="absolute top-0 left-0 w-2/3 border-2 border-e-gray-dark"/>
                                <img src="https://picsum.photos/seed/solution2/400/300" alt="product collage 2" className="absolute bottom-0 right-0 w-2/3 border-2 border-e-gray-dark"/>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-e-white">How It Works</h2>
                            <div className="grid md:grid-cols-3 gap-8 mt-12">
                                <div><FeatureIcon><ListingIcon /></FeatureIcon><h3 className="text-xl font-bold text-e-white">Simple & Fast Listing</h3><p className="mt-2 text-e-gray">Effortlessly list your items in minutes with our intuitive form and AI-powered description generator.</p></div>
                                <div><FeatureIcon><AuthIcon /></FeatureIcon><h3 className="text-xl font-bold text-e-white">Secure Authentication</h3><p className="mt-2 text-e-gray">Shop and sell with confidence. Our secure user system ensures a safe and trustworthy environment.</p></div>
                                <div><FeatureIcon><CategoryIcon /></FeatureIcon><h3 className="text-xl font-bold text-e-white">Filter by Category</h3><p className="mt-2 text-e-gray">Easily find what you're looking for, from vintage furniture to modern electronics, with smart filtering.</p></div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection id="fresh-finds" className="scroll-mt-20">
                        <div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-serif font-bold text-e-white">Fresh Finds</h2><p className="mt-3 text-lg text-e-gray">Discover the latest additions to our marketplace.</p></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{featuredProducts.map(product => (<ProductCard key={product.id} product={product} />))}</div>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-2xl mx-auto text-center py-16">
                         <h2 className="text-4xl md:text-5xl font-serif font-bold text-e-white">Ready to Make a Difference?</h2>
                         <p className="mt-4 text-lg text-e-gray-light">Join a community of forward-thinkers. Start buying, selling, and contributing to a more sustainable future today.</p>
                        <div className="mt-10"><UiverseButton as="link" to={currentUser ? "/add" : "/signup"} variant="primary" className="text-lg px-8 py-4">{currentUser ? "List an Item" : "Create an Account"}</UiverseButton></div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

// --- Product Feed Page (for logged-in users) ---

const ProductFeed: React.FC = () => {
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, searchTerm, selectedCategory]);

    const categories: (Category | 'All')[] = ['All', ...Object.values(Category)];

    return (
        <div>
            <FloatingActionButton />
            <div className="mb-8 p-6 bg-e-gray-dark border border-e-gray-dark">
                <h1 className="text-3xl font-bold text-e-white mb-2">Explore Products</h1>
                <p className="text-e-gray">Find your next treasure from our collection of second-hand goods.</p>
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-e-gray-darker border border-e-gray-dark text-e-white px-4 py-3 focus:border-e-gold transition-colors"
                    />
                </div>
            </div>
            
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm font-medium border transition-colors duration-200 ${
                                selectedCategory === category 
                                ? 'bg-e-gold text-e-black border-e-gold' 
                                : 'bg-transparent text-e-gray border-e-gray-dark hover:bg-e-gray-dark hover:text-e-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-e-gray-dark border border-e-gray-dark">
                    <h2 className="text-2xl font-bold text-e-white">No Products Found</h2>
                    <p className="text-e-gray mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

// --- Main Component ---

const HomePage: React.FC = () => {
    const { currentUser } = useAuth();
    
    // Render the product feed if logged in, otherwise render the landing page.
    return currentUser ? <ProductFeed /> : <LandingPage />;
};

export default HomePage;