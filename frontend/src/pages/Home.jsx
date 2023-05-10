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
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md text-center text-sm">
          <p>Nous utilisons des cookies pour optimiser votre expérience.</p>
          <button className="mt-2 p-1 bg-blue-500 text-white rounded" onClick={handleAccept}>
            J'accepte
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Home;
