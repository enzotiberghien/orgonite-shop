import React, { createContext, useEffect, useReducer, useState } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  products: [],
  cart: [],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)


  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };


  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addToCart,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
