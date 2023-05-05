import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <p className="text-gray-800">
        &copy; {new Date().getFullYear()} Orgonite 40. All rights reserved.
      </p>
    </footer>)
}

export default Footer