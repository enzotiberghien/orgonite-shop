import React from 'react'

const Collection = () => {
  const products = [
    {
      imageUrl: 'https://media.istockphoto.com/id/1425317558/photo/carnelian-orgonite-pyramid.jpg?b=1&s=170667a&w=0&k=20&c=g_dr51fxCaKmi0KnRpzu3TX7O-61qxcjVJ0-ic1lAE8=',
      title: 'Medaillons',
      description: "Une pierre puissante pour la protection et l'amélioration de l'énergie.",
    },
    {
      imageUrl: 'https://media.istockphoto.com/id/991579270/photo/crystals-and-orgonite.jpg?b=1&s=170667a&w=0&k=20&c=4w7RZeWNQQtojJA8GwVAoh3oLxVyJ5DriHQmcOvJrWM=',
      title: 'Cotbag',
      description: 'Une pierre unique pour la croissance spirituelle et la paix intérieure.',
    },
    {
      imageUrl: 'https://media.istockphoto.com/id/1425317325/photo/orgonite-carnelian-pyramid-close-up.jpg?b=1&s=170667a&w=0&k=20&c=ad0V_Ysq6r703cctBbEGA69dIFS7uD8IlOS6dbV6ZyY=',
      title: 'Pyramides',
      description: "Une belle pierre pour la guérison émotionnelle et l'équilibre.",
    },
    {
      imageUrl: 'https://media.istockphoto.com/id/1425318325/photo/orgonite-pyramid-and-mala-necklace.jpg?b=1&s=170667a&w=0&k=20&c=oB-su_73zHg1Fsz1Tu9MuY-VQxyHef5t9GYBjXsIKyY=',
      title: 'Colliers',
      description: "Une pierre unique pour la croissance spirituelle et la paix intérieure.",
    },
  ];


  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Notre collection d'orgonites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-lg">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collection