import { Link } from 'react-router-dom';

function Collections() {
  const collections = [
    {
      name: 'Kurtis',
      slug: 'kurtis',
      description: 'Elegant and versatile kurtis for every occasion',
      image: 'https://images.pexels.com/photos/6311572/pexels-photo-6311572.jpeg?auto=compress&cs=tinysrgb&w=1200',
      count: '50+ Styles'
    },
    {
      name: 'Anarkalis',
      slug: 'anarkalis',
      description: 'Flowing silhouettes with timeless grace',
      image: 'https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=1200',
      count: '30+ Styles'
    },
    {
      name: 'Crop Tops',
      slug: 'crop-tops',
      description: 'Modern designs with traditional touches',
      image: 'https://images.pexels.com/photos/7691088/pexels-photo-7691088.jpeg?auto=compress&cs=tinysrgb&w=1200',
      count: '40+ Styles'
    },
    {
      name: 'Western Wear',
      slug: 'western-wear',
      description: 'Contemporary fashion for the modern woman',
      image: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=1200',
      count: '35+ Styles'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f2eb]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#FAEDCD] to-[#f6f2eb]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Breadcrumb */}
          <p className="text-xs tracking-[0.3em] text-[#6B705C]/60 uppercase mb-4">
            Home / Collections
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.12em] text-[#6B705C] mb-6">
            Our Collections
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-[#6B705C]/80 max-w-2xl mx-auto leading-relaxed">
            Discover curated collections that blend timeless elegance with contemporary style.
            Each piece is thoughtfully crafted to celebrate your unique beauty.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {collections.map((collection, index) => (
              <Link
                key={collection.slug}
                to={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-sm bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Count Badge */}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full">
                    <span className="text-xs tracking-wider text-[#6B705C] font-medium">
                      {collection.count}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-3xl lg:text-4xl font-serif tracking-[0.12em] mb-3 group-hover:text-[#D4A373] transition-colors">
                    {collection.name}
                  </h2>
                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    {collection.description}
                  </p>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-medium group-hover:gap-4 transition-all">
                    <span>Explore Collection</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif tracking-[0.12em] text-[#6B705C] mb-6">
            Why Choose NAN?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: 'Handcrafted Quality',
                description: 'Every piece is carefully crafted with attention to detail'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Timeless Designs',
                description: 'Classic styles that never go out of fashion'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Made with Love',
                description: 'Passion and care in every stitch'
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-white/50 backdrop-blur-sm rounded-sm border border-[#E9EDC9] hover:border-[#D4A373] transition-all duration-300">
                <div className="flex justify-center mb-4 text-[#D4A373]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium tracking-wide text-[#6B705C] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B705C]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collections;
