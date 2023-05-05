import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import ShoppingPage from "./pages/ShoppingPage";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<ShoppingPage />}></Route>
      </Routes>
    </>
  );
}

export default App;