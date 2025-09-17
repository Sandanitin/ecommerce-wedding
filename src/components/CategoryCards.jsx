import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const categories = [
	{ id: 'wedding-dresses', title: 'Wedding Dresses', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=90&w=2400&dpr=2', icon: '👗', color: 'rose' },
	{ id: 'photo-shoot-outfits', title: 'Photo Shoot Outfits', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=90&w=2400&dpr=2', icon: '📸', color: 'rose' },
	{ id: 'sangeet-wear', title: 'Sangeet Wear', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=90&w=2400&dpr=2', icon: '💃', color: 'rose' },
	{ id: 'sherwanis-suits', title: 'Sherwanis & Suits', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=90&w=2400&dpr=2', icon: '👔', color: 'blue' },
	{ id: 'groom-photo-shoot', title: 'Groom Photo Shoot', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=90&w=2400&dpr=2', icon: '📸', color: 'blue' },
	{ id: 'pre-wedding-combos', title: 'Pre-Wedding Combos', image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&q=90&w=2400&dpr=2', icon: '💑', color: 'purple' },
]

const CategoryCards = memo(() => {
	const handleImgError = (e) => {
		if (!e?.currentTarget) return
		e.currentTarget.onerror = null
		e.currentTarget.src = 'https://dummyimage.com/600x400/e5e7eb/9ca3af.png&text=Image'
	}

	const buildSrcSet = (url) => {
		try {
			if (url.startsWith('/')) return undefined
			const base = url.split('?')[0]
			const params = (url.split('?')[1] ?? 'auto=format&fit=crop&q=85&dpr=2')
			return [
				`${base}?${params}&w=800 800w`,
				`${base}?${params}&w=1200 1200w`,
				`${base}?${params}&w=1600 1600w`,
				`${base}?${params}&w=2400 2400w`,
			].join(', ')
		} catch {
			return undefined
		}
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center mb-6">
				<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
					<span className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Bride & Groom Collections</span>
				</h2>
				<p className="mt-1 text-gray-600">Discover everything you need for your perfect wedding day</p>

			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
				{categories.map(c => (
					<Link key={c.id} to={`/products?category=${encodeURIComponent(c.id)}`} className="group">
						<div className="rounded-[1.25rem] p-[1px] bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 transition-transform group-hover:-translate-y-0.5">
							<div className="relative rounded-[1.2rem] overflow-hidden ring-1 ring-black/5 bg-gray-100 shadow-sm hover:shadow">
								<div className="aspect-[4/3] w-full">
									<img 
										loading="lazy" 
										src={encodeURI(c.image)} 
										srcSet={buildSrcSet(c.image)}
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
										onError={handleImgError} 
										alt={c.title} 
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-105" 
									/>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent" />
								<div className="absolute top-3 left-3">
									<span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur shadow-sm ${
										c.color === 'rose' ? 'bg-rose-100/90 text-rose-800 ring-1 ring-rose-200' :
										c.color === 'blue' ? 'bg-blue-100/90 text-blue-800 ring-1 ring-blue-200' :
										c.color === 'purple' ? 'bg-purple-100/90 text-purple-800 ring-1 ring-purple-200' :
										'bg-gray-100/90 text-gray-800 ring-1 ring-gray-200'
									}`}>

										
										<span>{c.icon}</span>
										{c.title}
									</span>
								</div>
								<div className="absolute inset-0 flex items-end justify-center p-4">
									<p className="text-white text-base sm:text-lg font-semibold drop-shadow text-center">
										Shop {c.title}
									</p>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
})

export default CategoryCards


