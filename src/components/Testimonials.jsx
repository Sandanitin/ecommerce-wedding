import React from 'react'

const testimonials = [
	{ id: 1, name: 'Aisha', text: 'Great quality and quick delivery. My go-to shop now!', avatar: 'https://i.pravatar.cc/80?img=11' },
	{ id: 2, name: 'Marco', text: 'Customer service was super helpful. Highly recommend!', avatar: 'https://i.pravatar.cc/80?img=22' },
	{ id: 3, name: 'Lena', text: 'Love the selection and fair pricing.', avatar: 'https://i.pravatar.cc/80?img=33' },
]

const Testimonials = () => {
	return (
		<section className="bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h2 className="text-2xl font-semibold">What customers say</h2>
				<div className="mt-6 grid md:grid-cols-3 gap-6">
					{testimonials.map(t => (
						<figure key={t.id} className="card p-6">
							<blockquote className="text-gray-700">“{t.text}”</blockquote>
							<figcaption className="mt-4 flex items-center gap-3">
								<img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
								<div>
									<p className="font-medium text-gray-900">{t.name}</p>
									<p className="text-sm text-gray-500">Verified buyer</p>
								</div>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	)
}

export default Testimonials


