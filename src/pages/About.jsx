function About() {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Craftsmanship',
      description: 'Every piece is handcrafted with meticulous attention to detail, honoring traditional techniques while embracing modern design.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Sustainability',
      description: 'We believe in creating fashion that respects our planet, using eco-friendly materials and ethical production practices.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Empowerment',
      description: 'Fashion that celebrates individuality and empowers women to express their unique style with confidence.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'NAN Boutique was founded with a vision to blend tradition and modernity' },
    { year: '2021', event: 'Launched our first collection, receiving overwhelming response from customers' },
    { year: '2022', event: 'Expanded to 4 signature collections, each telling a unique story' },
    { year: '2023', event: 'Reached 500+ happy customers and introduced sustainable practices' },
    { year: '2024', event: 'Continuing to grow while staying true to our core values' }
  ];

  return (
    <div className="min-h-screen bg-[#f6f2eb]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#FAEDCD] to-[#f6f2eb]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-[#6B705C]/60 uppercase mb-4">
            Home / About Us
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.12em] text-[#6B705C] mb-8">
            Our Story
          </h1>
          <p className="text-lg text-[#6B705C]/80 leading-relaxed">
            NAN Boutique was born from a passion for timeless elegance and a belief that every woman deserves to feel beautiful in what she wears.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif tracking-[0.12em] text-[#6B705C]">
                Crafting Timeless Elegance
              </h2>
              <div className="space-y-4 text-[#6B705C]/80 leading-relaxed">
                <p>
                  Founded in 2020, NAN Boutique emerged from a simple yet powerful vision: to create clothing that transcends fleeting trends and celebrates the enduring beauty of thoughtful design.
                </p>
                <p>
                  Each piece in our collection is a testament to the art of slow fashion. We work closely with skilled artisans who bring decades of expertise to every stitch, every drape, and every detail. Our commitment to quality means that when you choose NAN, you're investing in pieces that will grace your wardrobe for years to come.
                </p>
                <p>
                  We believe that true style is personal, not prescribed. That's why our collections are designed to be versatile canvases for your individual expression, whether you're dressing for a special occasion or elevating your everyday.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Our Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-[0.12em] text-[#6B705C] mb-4">
              Our Values
            </h2>
            <p className="text-[#6B705C]/70 max-w-2xl mx-auto">
              The principles that guide everything we create
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 bg-white/60 backdrop-blur-sm rounded-sm border border-[#E9EDC9] hover:border-[#D4A373] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-6 text-[#D4A373]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium tracking-wide text-[#6B705C] mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-sm text-[#6B705C]/70 leading-relaxed text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-[0.12em] text-[#6B705C] mb-4">
              Our Journey
            </h2>
            <p className="text-[#6B705C]/70">
              Milestones that shaped our story
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#D4A373] flex items-center justify-center text-white font-serif text-sm group-hover:scale-110 transition-transform">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-px h-full bg-[#E9EDC9] mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-[#6B705C]/80 leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '4', label: 'Collections' },
              { number: '100%', label: 'Handcrafted' },
              { number: '5★', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif text-[#D4A373] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-wider text-[#6B705C]/70 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
