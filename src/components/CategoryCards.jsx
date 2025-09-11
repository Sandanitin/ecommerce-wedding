import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
	{ id: 'wedding', title: 'Wedding Dresses', image: '/images/wedding dresses.jpg' },
	{ id: 'bridal-accessories', title: 'Bridal Accessories', image: '/images/bridal assessories.jpg' },
	{ id: 'bridal-jewelry', title: 'Bridal Jewelry', image: '/images/bridal jewerlay.jpg' },
]

const CategoryCards = () => {
	const handleImgError = (e) => {
		if (!e?.currentTarget) return
		e.currentTarget.onerror = null
		e.currentTarget.src = '/images/logo.png'
	}

	const buildSrcSet = (url) => {
		try {
			if (url.startsWith('/')) return undefined
			const base = url.split('?')[0]
			const params = (url.split('?')[1] ?? 'auto=format&fit=crop&q=80')
			return [
				`${base}?${params}&w=600 600w`,
				`${base}?${params}&w=900 900w`,
				`${base}?${params}&w=1200 1200w`,
			].join(', ')
		} catch {
			return undefined
		}
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center mb-6">
				<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
					<span className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Bridal Collections</span>
				</h2>
				<p className="mt-1 text-gray-600">Discover everything you need for your perfect wedding day</p>
				<div className="mt-4">
					<Link to="/products?category=wedding" className="btn-secondary">View all bridal</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
									<span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100/90 text-rose-800 ring-1 ring-rose-200 backdrop-blur">
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
}

export default CategoryCards


