import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function QuickViewModal({ product, isOpen, onClose }) {
    const { addItem } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const [selectedSize, setSelectedSize] = useState('M')

    if (!isOpen || !product) return null

    const sizes = ['XS', 'S', 'M', 'L', 'XL']
    const inWishlist = isInWishlist(product.id)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            size: selectedSize
        })
    }

    const handleWishlistToggle = () => {
        toggleWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url
        })
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    aria-label="Close quick view"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] bg-[#CCD5AE]/30 rounded-sm overflow-hidden">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />

                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlistToggle}
                            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <svg
                                className={`w-5 h-5 transition-all ${inWishlist ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'
                                    }`}
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Title & Price */}
                            <div>
                                <p className="text-xs tracking-[0.28em] text-[#6B705C]/70 uppercase mb-2">
                                    Maison Collection
                                </p>
                                <h2 className="text-2xl md:text-3xl font-serif tracking-[0.12em] text-[#6B705C] mb-3">
                                    {product.name}
                                </h2>
                                <p className="text-xl text-[#D4A373] font-medium">
                                    ₹{product.price?.toLocaleString()}
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-sm text-[#6B705C]/80 leading-relaxed">
                                    {product.description || 'Crafted with attention to detail, this piece embodies timeless elegance and contemporary style. Perfect for any occasion, it combines comfort with sophistication.'}
                                </p>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <label className="block text-xs tracking-[0.24em] text-[#6B705C] uppercase mb-3">
                                    Select Size
                                </label>
                                <div className="flex gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
                        w-12 h-12 border rounded-sm text-sm font-medium transition-all
                        ${selectedSize === size
                                                    ? 'border-[#D4A373] bg-[#D4A373] text-white'
                                                    : 'border-[#CCD5AE] text-[#6B705C] hover:border-[#D4A373]'
                                                }
                      `}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-[#6B705C]/70">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Free shipping on orders over ₹2,000</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#6B705C]/70">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Easy 30-day returns</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#6B705C]/70">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Handcrafted with care</span>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full mt-6 py-4 bg-[#6B705C] text-white text-sm tracking-[0.28em] uppercase hover:bg-[#5a5d4d] transition-colors rounded-sm"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickViewModal
