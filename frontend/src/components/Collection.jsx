import React from 'react'
import medaillonImage from '../assets/medaillon.webp';
import pyramideImage from '../assets/pyramide.webp';
import domeImage from '../assets/dome.webp';
import crystauxImage from '../assets/dome.webp';


const Collection = () => {
  const products = [
    {
      imageUrl: medaillonImage,
      title: 'Medaillons',
      description: "Une pierre puissante pour la protection et l'amélioration de l'énergie.",
    },
    {
      imageUrl: pyramideImage,
      title: 'Pyramides',
      description: 'Une pierre unique pour la croissance spirituelle et la paix intérieure.',
    },
    {
      imageUrl: domeImage,
      title: 'Dômes',
      description: "Une belle pierre pour la guérison émotionnelle et l'équilibre.",
    },
  ];


  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Notre collection d'orgonites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
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