const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">A propos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src="https://image-uniservice.linternaute.com/image/450/3/1649729709/7818838.jpg"
            alt="Esoteric Stones Shop"
            className="w-full h-full object-cover rounded-md"
          />
          <div>
            <p className="text-lg mb-6">
              Bienvenue sur Orgonite 40, votre boutique en ligne dédiée à l'orgonite, aux colliers, aux pierres et aux pyramides ésotériques. Nous nous engageons à vous offrir la meilleure sélection de pierres ésotériques soigneusement sélectionnées, parfaites pour vos besoins spirituels et énergétiques. Notre passion pour ces pierres uniques et puissantes nous pousse à parcourir le monde à la recherche des meilleurs spécimens, que nous mettons à votre disposition dans un seul et même endroit pratique.
            </p>
            <p className="text-lg">
              Notre mission est de vous aider à exploiter l'énergie et la beauté des pierres ésotériques, en favorisant l'équilibre, la sérénité et le bien-être dans votre vie. Nous sommes fiers de la qualité de nos pierres et nous nous efforçons de vous offrir un service client exceptionnel.              </p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default AboutUs