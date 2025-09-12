import React, { useEffect, useMemo, useRef, useState, memo, useCallback } from 'react'

const defaultSlides = [
  {
    id: 1,
    image: '/images/hero1.jpg',
    fallback: '/images/hero1.jpg',
    title: 'Dream Wedding Dresses',
    subtitle: 'Find your perfect gown for the big day',
  },
  {
    id: 2,
    image: '/images/hero2.jpg',
    fallback: '/images/hero2.jpg',
    title: 'Bridal Collection',
    subtitle: 'Elegant designs for your special moment',
  },
  {
    id: 3,
    image: '/images/hero3.jpg',
    fallback: '/images/hero3.jpg',
    title: 'Bridal Accessories',
    subtitle: 'Complete your look with our curated pieces',
  },
]

const HeroCarousel = memo(({ slides = defaultSlides, intervalMs = 5000 }) => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const touchStartXRef = useRef(null)
  const total = slides.length

  const goTo = useCallback((i) => setIndex((i + total) % total), [total])
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  const start = useCallback(() => {
    stop()
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, intervalMs)
  }, [total, intervalMs])
  
  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }, [])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  const slideStyle = useMemo(() => ({
    transform: `translateX(-${index * 100}%)`,
  }), [index])

  const handleImgError = useCallback((e) => {
    if (!e?.currentTarget) return
    const fb = e.currentTarget.getAttribute('data-fallback') || '/images/hero1.jpg'
    e.currentTarget.onerror = null
    e.currentTarget.src = fb
  }, [])

  const buildSrcSet = useCallback((url) => {
    try {
      if (url.startsWith('/')) return undefined
      const base = url.split('?')[0]
      const params = (url.split('?')[1] ?? 'auto=format&fit=crop&q=80')
      return [
        `${base}?${params}&w=800 800w`,
        `${base}?${params}&w=1200 1200w`,
        `${base}?${params}&w=1600 1600w`,
        `${base}?${params}&w=2000 2000w`,
      ].join(', ')
    } catch {
      return undefined
    }
  }, [])

  return (
    <div className="relative group" onMouseEnter={stop} onMouseLeave={start} onTouchStart={(e) => { touchStartXRef.current = e.changedTouches[0].clientX }} onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touchStartXRef.current ?? 0); if (dx > 40) prev(); if (dx < -40) next(); touchStartXRef.current = null }}>
      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-primary-600 via-pink-500 to-indigo-500">
        <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
          <div className="flex transition-transform duration-700 ease-out" style={slideStyle}>
          {slides.map((s) => (
            <div key={s.id} className="relative min-w-full aspect-[16/10] sm:aspect-[16/9] bg-gray-100">
              <img src={s.image} data-fallback={s.fallback} alt={s.title} loading={s.id === 1 ? 'eager' : 'lazy'} srcSet={buildSrcSet(s.image)} sizes="100vw" onError={handleImgError} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] brightness-110 contrast-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 text-white text-center">
                <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-5 py-4 shadow-lg">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/80">Featured</p>
                  <h3 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow">
                    <span className="bg-gradient-to-r from-primary-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent">{s.title}</span>
                  </h3>
                  <p className="mt-2 text-base sm:text-lg text-white/90">{s.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      <button aria-label="Previous" onClick={prev} className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg transition opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
      </button>
      <button aria-label="Next" onClick={next} className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg transition opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ring-1 ring-white/50 ${i === index ? 'w-6 bg-white shadow' : 'w-2.5 bg-white/70 hover:bg-white'}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
})

export default HeroCarousel


