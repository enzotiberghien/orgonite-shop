import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <header className="bg-cover bg-center text-gray-800 py-24 px-4 md:px-8" style={{ backgroundImage: `url()` }}>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenue sur la boutique Orgonite 40
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Découvrez notre collection exclusive d'orgonite soigneusement sélectionnées pour améliorer votre énergie et votre bien-être.
        </p>
        <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
          <Link to="/shop">Shop Now</Link>
        </button>
      </div>
    </header>
  )
}

export default Hero