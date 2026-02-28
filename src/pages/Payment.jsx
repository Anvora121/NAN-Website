import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Payment() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [success, setSuccess] = useState(false)

  const handlePayment = (e) => {
    e.preventDefault()
    // Dummy payment success
    setSuccess(true)
    clearCart()
    setTimeout(() => {
      navigate("/")
    }, 3000) // redirect after 3 seconds
  }

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-[140px] py-16 text-center text-[#6B705C]">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty!</h2>
        <p>Add items to cart before proceeding to payment.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-[140px] py-16 text-[#6B705C]">
      {success ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Payment Successful! 🎉</h2>
          <p>You will be redirected to the homepage shortly.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

          {/* Cart Summary */}
          <div className="mb-8 border border-black/10 p-4 rounded-md bg-[#FAEDCD]">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-2 border-t pt-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-3 border rounded focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full py-4 bg-[#D4A373] text-white text-xs tracking-[0.3em] uppercase"
            >
              Pay ₹{subtotal}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Payment
