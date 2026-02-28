const REVIEWS = [
    {
        id: 1,
        name: 'Priya Sharma',
        rating: 5,
        text: 'Absolutely love the quality and fit! The fabric is so soft and the design is elegant. Perfect for both casual and festive occasions.',
        product: 'Silk Anarkali',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
        id: 2,
        name: 'Ananya Reddy',
        rating: 5,
        text: 'The attention to detail is incredible. I received so many compliments! The customer service was also exceptional.',
        product: 'Embroidered Kurti',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
        id: 3,
        name: 'Meera Patel',
        rating: 5,
        text: 'Beautiful craftsmanship and timeless design. This has become my go-to boutique for special occasions.',
        product: 'Designer Crop Top',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
        id: 4,
        name: 'Kavya Iyer',
        rating: 5,
        text: 'Fast shipping and beautiful packaging. The dress fits perfectly and the color is exactly as shown. Highly recommend!',
        product: 'Western Dress',
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
]

function CustomerReviews() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[11px] tracking-[0.28em] text-[#6B705C]/70 uppercase mb-2">
                        Customer Love
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif tracking-[0.16em] text-[#6B705C] mb-4">
                        What Our Community Says
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-[#D4A373]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-sm text-[#6B705C]/70">
                        Based on 500+ verified reviews
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="bg-[#FEFAE0] p-6 rounded-sm border border-[#E9EDC9] hover:shadow-lg transition-shadow"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-3">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-[#D4A373]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-sm text-[#6B705C] leading-relaxed mb-4">
                                "{review.text}"
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-3 pt-4 border-t border-[#E9EDC9]">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-medium text-[#6B705C]">{review.name}</p>
                                    <p className="text-xs text-[#6B705C]/60">Purchased: {review.product}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Reviews Button */}
                <div className="text-center mt-10">
                    <button className="px-8 py-3 border border-[#6B705C] text-[#6B705C] text-xs tracking-[0.28em] uppercase hover:bg-[#6B705C] hover:text-white transition-colors rounded-sm">
                        View All Reviews
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CustomerReviews
