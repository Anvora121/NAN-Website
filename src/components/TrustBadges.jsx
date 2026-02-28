function TrustBadges() {
    const badges = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: 'Secure Payment',
            description: '100% secure transactions'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            ),
            title: 'Free Shipping',
            description: 'On orders over ₹2,000'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: 'Easy Returns',
            description: '30-day return policy'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Authentic Products',
            description: 'Handcrafted quality'
        }
    ]

    return (
        <section className="py-16 bg-[#FAEDCD] border-y border-[#E9EDC9]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-3 text-[#D4A373]">
                                {badge.icon}
                            </div>
                            <h3 className="text-sm font-medium tracking-[0.12em] text-[#6B705C] uppercase mb-1">
                                {badge.title}
                            </h3>
                            <p className="text-xs text-[#6B705C]/70">
                                {badge.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustBadges
