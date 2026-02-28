import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      detail: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      detail: 'hello@nanboutique.com',
      link: 'mailto:hello@nanboutique.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      detail: 'MG Road, Bangalore, Karnataka 560001',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f2eb]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#FAEDCD] to-[#f6f2eb]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-[#6B705C]/60 uppercase mb-4">
            Home / Contact
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.12em] text-[#6B705C] mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-[#6B705C]/80 leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-lg border border-[#E9EDC9]">
              <h2 className="text-2xl md:text-3xl font-serif tracking-[0.12em] text-[#6B705C] mb-8">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="p-6 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0] rounded-sm border border-[#D4A373]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="text-lg font-medium text-[#6B705C]">Message Sent!</h3>
                  </div>
                  <p className="text-sm text-[#6B705C]/80">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm tracking-wider text-[#6B705C] mb-2 uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#FEFAE0]/50 border border-[#E9EDC9] rounded-sm text-[#6B705C] placeholder:text-[#6B705C]/40 focus:outline-none focus:border-[#D4A373] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm tracking-wider text-[#6B705C] mb-2 uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#FEFAE0]/50 border border-[#E9EDC9] rounded-sm text-[#6B705C] placeholder:text-[#6B705C]/40 focus:outline-none focus:border-[#D4A373] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm tracking-wider text-[#6B705C] mb-2 uppercase">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FEFAE0]/50 border border-[#E9EDC9] rounded-sm text-[#6B705C] placeholder:text-[#6B705C]/40 focus:outline-none focus:border-[#D4A373] transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm tracking-wider text-[#6B705C] mb-2 uppercase">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-[#FEFAE0]/50 border border-[#E9EDC9] rounded-sm text-[#6B705C] placeholder:text-[#6B705C]/40 focus:outline-none focus:border-[#D4A373] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#6B705C] text-white text-sm tracking-[0.15em] uppercase font-medium rounded-sm hover:bg-[#5a5d4d] hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif tracking-[0.12em] text-[#6B705C] mb-6">
                  Contact Information
                </h2>
                <p className="text-[#6B705C]/80 leading-relaxed mb-8">
                  Have a question or need assistance? We're here to help. Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-sm border border-[#E9EDC9] hover:border-[#D4A373] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0] rounded-full text-[#D4A373]">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-sm tracking-wider text-[#6B705C] uppercase mb-2 font-medium">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-[#6B705C]/80 hover:text-[#D4A373] transition-colors"
                          >
                            {info.detail}
                          </a>
                        ) : (
                          <p className="text-[#6B705C]/80">{info.detail}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="p-6 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0] rounded-sm border border-[#E9EDC9]">
                <h3 className="text-lg font-medium tracking-wide text-[#6B705C] mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm text-[#6B705C]/80">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-6 bg-white rounded-sm border border-[#E9EDC9]">
                <h3 className="text-lg font-medium tracking-wide text-[#6B705C] mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {['Instagram', 'Facebook', 'Pinterest'].map((platform) => (
                    <a
                      key={platform}
                      href={`https://${platform.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0] hover:from-[#D4A373] hover:to-[#D4A373] text-[#6B705C] hover:text-white rounded-full text-sm transition-all duration-300"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
