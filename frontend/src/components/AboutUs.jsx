const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">A propos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src="https://media.istockphoto.com/id/1398159195/sv/foto/close-up-view-of-woman-hands-holding-and-using-orgonite-or-orgone-pyramid-converting-negative.jpg?s=612x612&w=0&k=20&c=IOr0-M8gTS1yQeOSDPyXyG_ymrdcOngYC2wO9uRa5yE="
            alt="Esoteric Stones Shop"
            className="w-full h-full object-cover rounded-md"
          />
          <div>
            <p className="text-lg mb-6">
              Bienvenue sur Orgonite Harmony, votre boutique dédiée aux orgonites sous forme de pyramides, de dômes, de médaillons ainsi qu'aux cristaux. Certains se demandent, mais qu'est-ce qu'une orgonite ?            </p>
            <p className="text-lg mb-6">
              L'Orgonite est un alliage de minéraux et de métaux réunis au sein d'une résine que l'on appelle "Matrice". Cet assemblage répond à un procédé de fabrication extrêmement précis. La matrice est composée de carbone, elle est souvent réalisée à base d'époxy ou de résine polyester. En son sein, on peut trouver différents métaux comme le cuivre, le bronze, le laiton, le zinc, parfois même de l'or ou de l'argent. À ceux-ci s'ajoutent les minéraux minutieusement choisis : Cristal de roche, Quartz rose, Améthyste, Aventurine...
            </p>
            
            <p className="text-lg mb-6">
              L'orgonite protège des flux magnétiques auxquels nous sommes quotidiennement exposés.
            </p>
            <p className="text-lg">
              Ces derniers émanent des équipements électriques et électromagnétiques. Lorsqu'ils fonctionnent, ils produisent des ondes négatives et néfastes pour l'être humain. L'orgonite capte ces flux afin de les transformer en ondes positives qui vont apporter des bienfaits considérables non seulement sur les personnes qui y sont exposées mais également sur la structure de leur environnement de vie qui s'en trouve transformé.            </p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default AboutUs