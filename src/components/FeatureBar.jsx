import React from 'react'
import { TruckIcon, ShieldCheckIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'

const features = [
	{ id: 1, title: 'Free shipping', desc: 'On orders over $50', icon: TruckIcon, variant: 'blue' },
	{ id: 2, title: 'Secure checkout', desc: '256-bit SSL encryption', icon: ShieldCheckIcon, variant: 'green' },
	{ id: 3, title: '30-day returns', desc: 'Hassle-free policy', icon: ArrowPathRoundedSquareIcon, variant: 'pink' },
]

const iconGradientFor = (variant) => {
	switch (variant) {
		case 'green':
			return 'bg-gradient-to-br from-emerald-500 to-emerald-700'
		case 'blue':
			return 'bg-gradient-to-br from-blue-500 to-indigo-600'
		case 'pink':
			return 'bg-gradient-to-br from-pink-500 to-rose-500'
		default:
			return 'bg-gradient-to-br from-primary-600 via-pink-500 to-indigo-500'
	}
}

const FeatureBar = () => {
	return (
		<section className="bg-white border-y">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
				{features.map(f => (
					<div key={f.id} className="group rounded-2xl p-[1px] bg-gradient-to-br from-primary-600/30 via-pink-500/30 to-indigo-500/30 hover:from-primary-600/50 hover:via-pink-500/50 hover:to-indigo-500/50 transition">
						<div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-6 text-center hover:shadow-md transition-transform group-hover:-translate-y-0.5">
							<div className={`mx-auto h-14 w-14 rounded-2xl text-white flex items-center justify-center shadow-lg ring-2 ring-white ${iconGradientFor(f.variant)}`}>
								<f.icon className="h-7 w-7" />
							</div>
							<div className="mt-3">
								<p className="text-base font-semibold tracking-tight text-gray-900">{f.title}</p>
								<p className="mt-1 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default FeatureBar


