import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Collection from '../components/Collection';
import Footer from '../components/Footer';


const Home = () => {
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  const handleAccept = () => {
    // you should ideally also set the cookie in browser to remember the user's choice
    setShowCookiePopup(false);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Collection />
      {showCookiePopup && (
        <div className="fixed inset-x-0 bottom-0 bg-pink-600 text-white py-4 px-6 shadow-md text-sm z-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold mb-2">Votre vie privée est importante pour nous</h2>
              <p>Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. En naviguant sur le site, vous consentez à utiliser des cookies.</p>
            </div>
            <button className="ml-4 bg-white text-pink-600 rounded px-4 py-2 font-bold" onClick={handleAccept}>
              J'accepte
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Home;
