import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import QuickViewModal from './QuickViewModal'

function ProductCard({ product, collectionSlug }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [showQuickView, setShowQuickView] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url
    })
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    e.preventDefault()
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url
    })
  }

  const inWishlist = isInWishlist(product.id)

  const cardContent = (
    <div className="group cursor-pointer">
      <div
        className="
          relative overflow-hidden rounded-sm mb-4
          bg-[#CCD5AE]/60
          aspect-[3/4]
          shadow-[0_18px_40px_rgba(0,0,0,0.14)]
        "
      >
        {/* Product Image */}
        <img
          src={product.image_url}
          alt={product.name}
          className="
            w-full h-full object-cover
            transition-all duration-[1200ms]
            group-hover:scale-110
            group-hover:brightness-90
          "
        />

        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.is_new && (
            <span className="px-3 py-1 bg-[#D4A373] text-white text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm shadow-md">
              New
            </span>
          )}
          {product.is_sale && (
            <span className="px-3 py-1 bg-red-500 text-white text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm shadow-md">
              Sale
            </span>
          )}
          {product.is_limited && (
            <span className="px-3 py-1 bg-[#6B705C] text-white text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm shadow-md">
              Limited
            </span>
          )}
        </div>

        {/* Quick View Button - Shows on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setShowQuickView(true)
          }}
          className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            px-6 py-3
            bg-white/95 backdrop-blur-sm
            text-[#6B705C] text-xs tracking-[0.24em] uppercase
            rounded-sm shadow-xl
            hover:bg-white
            flex items-center gap-2
            z-20
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Quick View
        </button>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="
            absolute top-3 right-3
            w-9 h-9 rounded-full
            bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            transition-all duration-300
            hover:scale-110
            shadow-lg
            z-10
          "
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${inWishlist ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'
              }`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            absolute inset-x-4 bottom-4
            translate-y-6 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500
            backdrop-blur-md
            bg-[#FEFAE0]/90
            text-[#6B705C]
            text-[11px] tracking-[0.28em]
            py-2 flex items-center justify-center gap-2
            border border-[#D4A373]/40
            hover:bg-[#FAEDCD]
          "
        >
          <span className="text-xs">＋</span>
          ADD TO CART
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1 text-center">
        <h3 className="text-sm font-light tracking-[0.16em] uppercase text-[#6B705C]">
          {product.name}
        </h3>
        <p className="text-xs text-[#6B705C]/70">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  )

  if (!collectionSlug) return (
    <>
      {cardContent}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  )

  return (
    <>
      <Link
        to={`/collections/${collectionSlug}/${product.id}`}
        className="block"
      >
        {cardContent}
      </Link>
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  )
}

export default ProductCard
