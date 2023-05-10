import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <header className="bg-cover bg-center flex items-center text-gray-800 py-24 px-4 md:px-8" style={{ backgroundImage: `url(src/assets/bg-main.png)` }}>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenue sur la boutique <span className='text-pink-600'>Orgonite 40</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Découvrez notre collection exclusive d'orgonite soigneusement sélectionnées pour améliorer votre énergie et votre bien-être.
        </p>
        <button className="bg-pink-800 text-white font-bold py-2 px-4 rounded hover:bg-pink-700">
          <Link to="/shop">Boutique</Link>
        </button>
      </div>
    </header>
  )
}

export default Hero