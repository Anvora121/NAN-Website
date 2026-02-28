import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import CustomerReviews from '../components/CustomerReviews'
import NewsletterModal from '../components/NewsletterModal'
import TrustBadges from '../components/TrustBadges'

const CATEGORY_CARDS = [
  {
    name: 'Kurtis',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    link: '/collections/kurtis'
  },
  {
    name: 'Anarkalis',
    image: 'https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg',
    link: '/collections/anarkalis'
  },
  {
    name: 'Western Wear',
    image: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg',
    link: '/collections/western-wear'
  },
  {
    name: 'Crop Tops',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    link: '/collections/crop-tops'
  }
]


function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [showNewsletter, setShowNewsletter] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  // Newsletter auto-popup after 10 seconds
  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletter')
    if (!hasSeenNewsletter) {
      const timer = setTimeout(() => {
        setShowNewsletter(true)
        localStorage.setItem('hasSeenNewsletter', 'true')
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || featuredProducts.length === 0) return

    let scrollInterval
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollContainer.scrollBy({ left: 300, behavior: 'smooth' })
        }
      }, 3000)
    }


    startAutoScroll()

    return () => {
      if (scrollInterval) clearInterval(scrollInterval)
    }
  }, [featuredProducts])

  async function fetchFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setFeaturedProducts(data)
    }
  }

  const categoryScrollRef = useRef(null)
  useEffect(() => {
    const el = categoryScrollRef.current
    if (!el) return

    let paused = false
    let rafId

    const animate = () => {
      if (!paused) {
        el.scrollLeft += 0.5
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    el.addEventListener('mouseenter', () => (paused = true))
    el.addEventListener('mouseleave', () => (paused = false))

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="min-h-screen">
      {/* ENHANCED HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6f2eb] via-[#f1e7dd] to-[#FAEDCD]" />

        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.1)',
            mixBlendMode: 'multiply'
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#D4A373]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#CCD5AE]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-[fade-in_1200ms_ease-out]">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#D4A373]" />
                <p className="text-xs tracking-[0.3em] text-[#6B705C]/80 uppercase">
                  Maison / New Season 2026
                </p>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-[0.08em] leading-[1.1] text-[#6B705C]">
                Quiet
                <span className="block mt-2 text-[#D4A373]">Luxury</span>
                <span className="block mt-2 text-[#6B705C]/90">Dressing</span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-[#6B705C]/80 max-w-lg leading-relaxed">
                A considered edit of silhouettes, textures and tones – crafted for
                evenings that linger and days that move slowly.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/collections"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#6B705C] text-white text-xs tracking-[0.25em] uppercase overflow-hidden transition-all duration-300 hover:bg-[#5a5d4d] hover:shadow-xl"
                >
                  <span className="relative z-10">Explore Collections</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#6B705C] uppercase hover:text-[#D4A373] transition-colors group"
                >
                  <span className="relative">
                    View Lookbook
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4A373] transition-all group-hover:w-full" />
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-6 border-t border-[#CCD5AE]/30">
                <div>
                  <p className="text-2xl font-serif text-[#D4A373]">500+</p>
                  <p className="text-xs tracking-wider text-[#6B705C]/60 uppercase">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-[#D4A373]">100%</p>
                  <p className="text-xs tracking-wider text-[#6B705C]/60 uppercase">Handcrafted</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-[#D4A373]">5★</p>
                  <p className="text-xs tracking-wider text-[#6B705C]/60 uppercase">Rated</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[380px] xl:h-[420px] animate-[fade-in_1400ms_ease-out_200ms] opacity-0 [animation-fill-mode:forwards]">
              {/* Main Image */}
              <div className="relative h-full rounded-sm overflow-hidden shadow-2xl group">
                <img
                  src="https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Maison Collection"
                  className="w-full h-full object-cover transition-transform duration-[8000ms] group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-md p-6 rounded-sm shadow-xl">
                    <p className="text-xs tracking-[0.24em] text-[#6B705C]/70 uppercase mb-2">
                      Featured Collection
                    </p>
                    <h3 className="text-xl font-serif tracking-[0.12em] text-[#6B705C] mb-1">
                      Spring Essentials
                    </h3>
                    <p className="text-sm text-[#6B705C]/80">
                      Discover our curated selection
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-[#D4A373]/30 rounded-tr-lg" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-[#D4A373]/30 rounded-bl-lg" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-[10px] tracking-[0.3em] text-[#6B705C]/60 uppercase">Scroll</p>
          <svg className="w-5 h-5 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-20 bg-[#f6f2eb]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[11px] tracking-[0.28em] text-gray-500 uppercase mb-2">
                  Maison Edit
                </p>
                <h2 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-[0.16em]">
                  Featured Pieces
                </h2>
              </div>
              <p className="hidden md:block text-xs text-gray-500 max-w-xs text-right">
                A rotating selection of silhouettes that capture the season&apos;s mood – from quiet tailoring to fluid movement.
              </p>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-none w-[280px] md:w-72">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white overflow-hidden">
        <div
          ref={categoryScrollRef}
          className="flex gap-8 overflow-x-scroll px-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {[...CATEGORY_CARDS, ...CATEGORY_CARDS].map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="group relative flex-none w-[260px] h-[340px] rounded-sm overflow-hidden 
                   transition-transform duration-500 hover:-translate-y-2"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-700 
                     group-hover:scale-110 group-hover:brightness-110"
              />

              {/* DARK OVERLAY */}
              <div
                className="absolute inset-0 bg-black/30 opacity-0 
                     group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* CATEGORY NAME */}
              <div
                className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <span
                  className="text-white text-sm tracking-[0.35em] uppercase
                       px-6 py-2 border border-white/70 backdrop-blur-sm"
                >
                  {item.name}
                </span>
              </div>

              {/* GLOW */}
              <div
                className="absolute inset-0 pointer-events-none
                     group-hover:shadow-[0_0_40px_10px_rgba(212,163,115,0.35)]
                     transition-shadow duration-500"
              />
            </Link>
          ))}
        </div>
      </section>




      {/* STORY SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Craftsmanship"
                className="w-full h-[460px] md:h-[520px] object-cover rounded-sm shadow-[0_24px_60px_rgba(15,23,42,0.15)]"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <p className="text-[11px] tracking-[0.28em] text-gray-500 uppercase">
                Maison Studio
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-[0.16em]">
                Crafted in Quiet Detail
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Each Maison piece is cut in small batches, finished by hand and pressed with care.
                We lean into soft structure, fluid movement and palettes that feel like late
                afternoon light.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the first sketch to the final stitch, our studio obsesses over how a garment
                feels on the body – the drape on the shoulder, the fall at the hem, the way a cuff
                catches the light.
              </p>
              <button className="mt-4 px-8 py-3 border border-gray-900/70 text-gray-900 text-xs tracking-[0.25em] hover:bg-gray-900 hover:text-white transition-colors rounded-none">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <TrustBadges />

      {/* CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* NEWSLETTER MODAL */}
      <NewsletterModal
        isOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
      />
    </div>
  )
}

export default Home

