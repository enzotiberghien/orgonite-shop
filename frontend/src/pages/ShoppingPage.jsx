import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import useGlobalState from "../hooks/useGlobalState";
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { client, getProducts, imageUrlFor } from "../../sanity/client";
import Footer from "../components/Footer"

const ShoppingPage = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    })()
  }, [])

  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, cart } = useGlobalState()
  const [filteredProducts, setFilteredProducts] = useState() // Initialize filteredProducts as an empty array

  const filterByCategory = (category) => {
    if (filteredProducts === null) setFilteredProducts(products)
    const newArr = products.filter(e => e.category === category) // Filter products instead of filteredProducts
    setFilteredProducts(newArr)
  }


  const sortOptions = [
    { name: 'Prix: Bas a Haut', href: '#', current: false },
    { name: 'Prix: Haut a bas', href: '#', current: false },
  ]
  const subCategories = [
    { name: 'Colliers', href: '#' },
    { name: 'Cotbag', href: '#' },
    { name: 'Pyramides', href: '#' },
    { name: 'Orgonites', href: '#' },
  ]

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCartClick = async () => {
    // Implement your add to cart logic here
    console.log("Add to cart:", selectedProduct);
    addToCart(selectedProduct)
    closeModal();
  };

  return (
    <>
      <Navbar></Navbar>
      {/* Add the modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <button
              className="float-right text-gray-800 focus:outline-none focus:text-gray-600"
              onClick={closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedProduct.name}</h2>
            <img
              src={imageUrlFor(selectedProduct.imageSrc).url()}
              alt={selectedProduct.imageAlt}
              className="w-full h-64 mb-4 object-cover object-center"
            />
            <p className="text-lg font-medium text-gray-900 mb-4">{selectedProduct.price}€</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addToCartClick}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}


      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Boutique</h1>

              <div className="flex items-center">
                <div className="hidden lg:flex align-bottom pr-12">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="flex space-x-12 text-sm font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a onClick={(e) => {
                          e.preventDefault()
                          filterByCategory(category.name)
                          console.log(filteredProducts)
                        }} href={category.href}>{category.name}</a>

                      </li>
                    ))}
                  </ul>
                </div>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid min-h-screen grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

                {/* Product grid */}
                <div className="lg:col-span-4">
                  <div className="bg-white">
                    <div>
                      <h2 className="sr-only">Products</h2>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                          <a
                            key={product.id}
                            onClick={() => openModal(product)}
                            className="group w-full focus:outline-none hover:cursor-pointer"
                          >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <img
                                src={imageUrlFor(product.imageSrc).url()}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                              />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}€</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default ShoppingPage