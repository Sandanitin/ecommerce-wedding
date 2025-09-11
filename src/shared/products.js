const placeholder = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

const products = [
  { id: 1, title: 'Elegant A-Line Wedding Gown', category: 'wedding', price: 1299.99, rating: 4.9, image: '/images/wedding dresses.jpg', description: 'Stunning A-line wedding dress with intricate lace details, flowing train, and delicate beading.' },
  { id: 2, title: 'Classic Ball Gown', category: 'wedding', price: 1599.99, rating: 4.8, image: '/images/hero1.jpg', description: 'Timeless ball gown silhouette with full tulle skirt and crystal embellishments.' },
  { id: 3, title: 'Modern Mermaid Dress', category: 'wedding', price: 1199.99, rating: 4.7, image: '/images/hero2.jpg', description: 'Sleek mermaid silhouette with dramatic train and elegant back detail.' },
  { id: 4, title: 'Bridal Veil with Pearls', category: 'bridal-accessories', price: 199.99, rating: 4.8, image: '/images/bridal assessories.jpg', description: 'Delicate cathedral-length veil with pearl accents and lace trim.' },
  { id: 5, title: 'Bridal Tiara', category: 'bridal-accessories', price: 149.99, rating: 4.6, image: '/images/bridal assessories.jpg', description: 'Elegant crystal tiara with vintage-inspired design for your special day.' },
  { id: 6, title: 'Bridal Jewelry Set', category: 'bridal-jewelry', price: 399.99, rating: 4.7, image: '/images/bridal jewerlay.jpg', description: 'Complete pearl and crystal jewelry set including necklace, earrings, and bracelet.' },
  { id: 7, title: 'Wedding Shoes', category: 'bridal-accessories', price: 179.99, rating: 4.5, image: '/images/hero1.jpg', description: 'Comfortable ivory satin heels with crystal details for your wedding day.' },
  { id: 8, title: 'Bridal Bouquet', category: 'bridal-accessories', price: 89.99, rating: 4.4, image: '/images/bridal assessories.jpg', description: 'Beautiful white rose bouquet with baby breath and greenery accents.' },
  { id: 9, title: 'Wedding Ring Set', category: 'bridal-jewelry', price: 899.99, rating: 4.9, image: '/images/bridal jewerlay.jpg', description: 'Classic diamond engagement ring and matching wedding band set.' },
  { id: 10, title: 'Bridal Clutch', category: 'bridal-accessories', price: 79.99, rating: 4.3, image: '/images/bridal assessories.jpg', description: 'Elegant pearl-embellished clutch perfect for your wedding essentials.' },
  { id: 11, title: 'Wedding Garter Set', category: 'bridal-accessories', price: 49.99, rating: 4.2, image: '/images/bridal assessories.jpg', description: 'Delicate lace garter set with blue ribbon and pearl details.' },
  { id: 12, title: 'Bridal Earrings', category: 'bridal-jewelry', price: 129.99, rating: 4.6, image: '/images/bridal jewerlay.jpg', description: 'Elegant drop earrings with pearls and crystals for your wedding day.' },
  { id: 13, title: 'Wedding Guest Book', category: 'bridal-accessories', price: 39.99, rating: 4.1, image: '/images/hero3.jpg', description: 'Beautiful leather-bound guest book for your wedding memories.' },
  { id: 14, title: 'Bridal Robe', category: 'bridal-accessories', price: 69.99, rating: 4.4, image: '/images/hero2.jpg', description: 'Luxurious satin robe with lace trim for getting ready photos.' },
  { id: 15, title: 'Wedding Cake Topper', category: 'bridal-accessories', price: 59.99, rating: 4.3, image: '/images/hero1.jpg', description: 'Elegant crystal cake topper to crown your wedding cake.' },
]

export default products


