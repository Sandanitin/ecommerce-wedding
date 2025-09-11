import React from 'react'

const Newsletter = () => {
  return (
    <section className="bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-black/5 shadow-sm">
          {/* Decorative gradient edge */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600" />

          <div className="px-6 sm:px-10 py-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-rose-700 px-3 py-1 text-xs font-semibold ring-1 ring-rose-200">
                Bridal Insider
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                <span className="text-black">Stay in the loop</span>
              </h2>
              <p className="mt-2 text-gray-600">Get exclusive offers, new arrivals, and more for your big day.</p>
              <ul className="mt-4 flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-600">
                <li className="inline-flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-rose-50 text-rose-700 inline-flex items-center justify-center">✓</span>No spam</li>
                <li className="inline-flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-rose-50 text-rose-700 inline-flex items-center justify-center">✓</span>Unsubscribe anytime</li>
                <li className="inline-flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-rose-50 text-rose-700 inline-flex items-center justify-center">✓</span>Exclusive bridal perks</li>
              </ul>
            </div>

            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Enter your email</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  id="email"
                  type="email" 
                  required 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white shadow-sm" 
                  aria-label="Email address"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-sm hover:from-rose-600 hover:to-pink-600 transition-all"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-500 text-center sm:text-left">
                By subscribing, you agree to our <a href="#" className="underline decoration-rose-400/60 hover:decoration-rose-500">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter


