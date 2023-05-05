import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Collection from '../components/Collection';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <Collection></Collection>
      <Footer></Footer>
    </>
  )
}

export default Home