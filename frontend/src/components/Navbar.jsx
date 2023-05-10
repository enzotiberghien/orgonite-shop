import { useEffect, useState } from "react";
import navLogo from "../assets/navLogo.png";
import { NavLink } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { imageUrlFor } from "../../sanity/client";
import { loadStripe } from '@stripe/stripe-js';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, removeFromCart } = useGlobalState()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])

  const calculateTotal = () => {
    return cart.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.price) * 1;
    }, 0);
  };


  const stripePromise = loadStripe('pk_live_51N68dJD9RqnLjs180Ubmun5izIQOEtHkC8w1U5Wuox8u5AFAZ3AvSpJdvoziK1SfKClTbsEpy2XFeZHtxC8148OJ00khGhJF7k');

  const redirectToCheckout = async () => {
    const stripe = await stripePromise;

    const items = cart.map((product) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            images: [imageUrlFor(product.imageSrc).url()],
          },
          unit_amount: parseInt(parseFloat(product.price) * 100),
        },
        quantity: 1,
      };
    });

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: items }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  const onClickCheckout = async (e) => {
    e.preventDefault()
    await redirectToCheckout()
  }


  return (
    <>
      <nav className="bg-gray-100 px-4 py-2 md:px-8 md:py-4 flex items-center justify-between">
        <img src={navLogo} alt="Orgonite 40 logo" className="h-8 md:h-12" />
        <div className="flex items-center md:hidden">
          <button onClick={() => setOpen(true)}>
            <i className="fa-solid fa-cart-shopping text-gray-800 mr-2" />
            <span className="text-gray-800 mr-4">{cart.length}</span>
          </button>
          <button
            className="text-gray-800 focus:outline-none focus:text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <ul className="hidden md:flex md:text-base md:items-center space-x-4">
          <li className="py-1 md:py-0 text-gray-800 hover:text-gray-600">
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li className="py-1 md:py-0 text-gray-800 hover:text-gray-600">
            <NavLink to="/shop">Boutique</NavLink>
          </li>
          <li className="flex items-center">
            <button onClick={() => setOpen(true)}>
              <i className="fa-solid fa-cart-shopping text-gray-800 mr-2" />
              <span className="text-gray-800">{cart.length}</span>
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 w-64 md:hidden transition-transform duration-200 ease-in-out bg-gray-100 p-4 py-6 space-y-4`}
      >
        <button
          className="text-gray-800 focus:outline-none focus:text-gray-600 float-right"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        <ul className="text-base">
          <li className="pl-3 py-1 text-gray-800 hover:text-gray-600">
            <NavLink to="/">Acceuil</NavLink>
          </li>
          <li className="pl-3 py-1 text-gray-800 hover:text-gray-600">
            <NavLink to="/shop">Boutique</NavLink>
          </li>
        </ul>
      </div>


      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Panier</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={imageUrlFor(product.imageSrc).url()}
                                      alt={product.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">x1 {product.quantity}</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => { removeFromCart(product) }}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Supprimer
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>{calculateTotal().toFixed(2)}€</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Livraison et taxes calculées à la suite</p>
                        <div className="mt-6">
                          <a
                            href="#"
                            onClick={onClickCheckout}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Suivant
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            ou
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continuer le shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Navbar;
