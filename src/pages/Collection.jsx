import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

function Collection() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collectionInfo, setCollectionInfo] = useState(null);

    const collections = {
        'kurtis': {
            name: 'Kurtis',
            description: 'Elegant and versatile kurtis for every occasion',
            image: 'https://images.pexels.com/photos/6311572/pexels-photo-6311572.jpeg?auto=compress&cs=tinysrgb&w=1200'
        },
        'anarkalis': {
            name: 'Anarkalis',
            description: 'Flowing silhouettes with timeless grace',
            image: 'https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=1200'
        },
        'crop-tops': {
            name: 'Crop Tops',
            description: 'Modern designs with traditional touches',
            image: 'https://images.pexels.com/photos/7691088/pexels-photo-7691088.jpeg?auto=compress&cs=tinysrgb&w=1200'
        },
        'western-wear': {
            name: 'Western Wear',
            description: 'Contemporary fashion for the modern woman',
            image: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=1200'
        }
    };

    useEffect(() => {
        setCollectionInfo(collections[slug]);
        fetchProducts();
    }, [slug]);

    async function fetchProducts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', slug)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
        setLoading(false);
    }

    if (!collectionInfo) {
        return (
            <div className="min-h-screen bg-[#f6f2eb] pt-32 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-serif text-[#6B705C] mb-4">Collection Not Found</h1>
                    <Link to="/collections" className="text-[#D4A373] hover:underline">
                        Back to Collections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6f2eb]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#FAEDCD] to-[#f6f2eb]">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <p className="text-xs tracking-[0.3em] text-[#6B705C]/60 uppercase mb-6">
                        <Link to="/" className="hover:text-[#D4A373] transition-colors">Home</Link>
                        {' / '}
                        <Link to="/collections" className="hover:text-[#D4A373] transition-colors">Collections</Link>
                        {' / '}
                        {collectionInfo.name}
                    </p>

                    {/* Collection Header */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.12em] text-[#6B705C] mb-6">
                                {collectionInfo.name}
                            </h1>
                            <p className="text-lg text-[#6B705C]/80 leading-relaxed mb-8">
                                {collectionInfo.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-[#6B705C]/70">
                                <span>{products.length} Products</span>
                                <span>•</span>
                                <span>Handcrafted Quality</span>
                            </div>
                        </div>

                        {/* Collection Image */}
                        <div className="relative h-[300px] lg:h-[400px] rounded-sm overflow-hidden shadow-xl">
                            <img
                                src={collectionInfo.image}
                                alt={collectionInfo.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-12 h-12 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
                            <p className="mt-4 text-[#6B705C]/70">Loading products...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20">
                            <svg className="w-20 h-20 mx-auto text-[#6B705C]/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h2 className="text-2xl font-serif text-[#6B705C] mb-4">
                                No Products Available
                            </h2>
                            <p className="text-[#6B705C]/70 mb-8">
                                This collection is currently empty. Check back soon for new arrivals!
                            </p>
                            <Link
                                to="/collections"
                                className="inline-block px-6 py-3 bg-[#6B705C] text-white text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-[#5a5d4d] transition-colors"
                            >
                                Browse Other Collections
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Filter/Sort Bar */}
                            <div className="flex items-center justify-between mb-12 pb-6 border-b border-[#E9EDC9]">
                                <p className="text-sm text-[#6B705C]/70">
                                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                                </p>
                                {/* Add filter/sort options here later */}
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Collection;
