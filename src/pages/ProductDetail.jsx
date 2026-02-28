import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FALLBACK_COLLECTIONS, FALLBACK_PRODUCTS } from '../lib/fallbackData'
import { useCart } from '../context/CartContext'

const SIZE_OFFSETS = {
  XS: -200,
  S: 0,
  M: 200,
  L: 400,
  XL: 600
}

const COLOR_OPTIONS = ['Ivory', 'Blush Pink', 'Emerald', 'Charcoal']

function ProductDetail() {
  const { slug, productId } = useParams()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)
  const [selectedSize, setSelectedSize] = useState('S')
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0])

  const fallbackCollection = useMemo(() => FALLBACK_COLLECTIONS[slug], [slug])

  useEffect(() => {
    let isMounted = true

    async function fetchProduct() {
      setLoading(true)
      setUseFallback(false)

      // If this is a demo (fb-*) product, skip Supabase and read from fallback data
      const isFallbackId = productId?.startsWith('fb-')
      if (isFallbackId) {
        const fromFallback = FALLBACK_PRODUCTS[slug]?.find((p) => p.id === productId)
        if (isMounted && fromFallback) {
          setProduct(fromFallback)
          setUseFallback(true)
          setLoading(false)
        }
        return
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .maybeSingle()

        if (!error && data) {
          if (isMounted) {
            setProduct(data)
          }
        } else {
          // Fallback to demo items if available
          const fromFallback = FALLBACK_PRODUCTS[slug]?.find((p) => p.id === productId)
          if (isMounted && fromFallback) {
            setProduct(fromFallback)
            setUseFallback(true)
          }
        }
      } catch {
        const fromFallback = FALLBACK_PRODUCTS[slug]?.find((p) => p.id === productId)
        if (isMounted && fromFallback) {
          setProduct(fromFallback)
          setUseFallback(true)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [slug, productId])

  const basePrice = product?.price ?? 0
  const sizeOptions = useMemo(
    () =>
      Object.entries(SIZE_OFFSETS).map(([size, offset]) => ({
        size,
        price: basePrice + offset
      })),
    [basePrice]
  )

  const selectedSizePrice =
    sizeOptions.find((opt) => opt.size === selectedSize)?.price ?? basePrice

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: `${product.name} (${selectedSize})`,
      baseId: product.id,
      size: selectedSize,
      color: selectedColor,
      price: selectedSizePrice,
      image_url: product.image_url
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    )
  }

  const collectionName = fallbackCollection?.name ?? 'Collection'

  return (
    <div className="min-h-screen bg-[#f6f2eb] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2">
        <div className="bg-[#e9dfd4]/80 rounded-sm overflow-hidden min-h-[420px] flex items-center justify-center shadow-[0_28px_70px_rgba(15,23,42,0.22)]">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover scale-105 animate-[slow-zoom_16s_ease-in-out_infinite_alternate]"
          />
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-[0.25em] text-gray-500 uppercase mb-2">
              {collectionName}
            </p>
            <h1 className="text-2xl md:text-3xl font-serif tracking-[0.16em] text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-800">
              ₹{selectedSizePrice.toLocaleString()}
            </p>
            {useFallback && (
              <p className="mt-1 text-[11px] text-gray-400">
                Demo product – connect Supabase to replace this with your catalogue.
              </p>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-gray-800">
              Size
            </h2>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((option) => (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`px-3 py-2 text-xs border rounded-sm ${
                    selectedSize === option.size
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 text-gray-800 hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span>{option.size}</span>
                    <span className="text-[10px] text-gray-500">
                      ₹{option.price.toLocaleString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-gray-800">
              Color
            </h2>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 text-xs border rounded-sm ${
                    selectedColor === color
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 text-gray-800 hover:border-gray-500'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full md:w-auto px-10 py-3 bg-gray-900 text-white text-xs tracking-[0.2em] rounded-none hover:bg-gray-800 transition-colors"
            >
              ADD TO CART
            </button>

            <div className="text-xs text-gray-500 space-y-1">
              <p>• 100% quality-checked fabrics, chosen for softness, drape and longevity.</p>
              <p>• Model is 5&apos;6&quot;, wearing size S. Fit is designed to skim the body, not cling.</p>
              <p>• We recommend dry-clean for the first wear, then cool hand-wash only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail


