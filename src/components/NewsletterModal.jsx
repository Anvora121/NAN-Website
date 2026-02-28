import { useState } from 'react'

function NewsletterModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setIsSuccess(true)

        // Reset after 2 seconds
        setTimeout(() => {
            setEmail('')
            setIsSuccess(false)
            onClose()
        }, 2000)
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-[#FEFAE0] rounded-sm max-w-md w-full p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-[#CCD5AE]/30 flex items-center justify-center transition-colors"
                    aria-label="Close newsletter"
                >
                    <svg className="w-5 h-5 text-[#6B705C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {!isSuccess ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-serif tracking-[0.16em] text-[#6B705C] mb-2">
                                Join Our Community
                            </h2>
                            <p className="text-sm text-[#6B705C]/70 leading-relaxed">
                                Subscribe to receive exclusive updates, styling tips, and early access to new collections.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-[#CCD5AE] text-[#6B705C] placeholder-[#6B705C]/40 focus:outline-none focus:border-[#D4A373] transition-colors rounded-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-[#6B705C] text-white text-xs tracking-[0.28em] uppercase hover:bg-[#5a5d4d] transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                            </button>

                            <p className="text-[10px] text-[#6B705C]/50 text-center">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates.
                            </p>
                        </form>

                        {/* Perks */}
                        <div className="mt-6 pt-6 border-t border-[#CCD5AE]/50 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-[#6B705C]/70">
                                <svg className="w-4 h-4 text-[#D4A373]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>10% off your first order</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#6B705C]/70">
                                <svg className="w-4 h-4 text-[#D4A373]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Early access to sales</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#6B705C]/70">
                                <svg className="w-4 h-4 text-[#D4A373]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Exclusive styling tips</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-serif tracking-[0.14em] text-[#6B705C] mb-2">
                            Welcome to Maison!
                        </h3>
                        <p className="text-sm text-[#6B705C]/70">
                            Check your inbox for your exclusive discount code.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewsletterModal
