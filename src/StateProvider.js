import React, { createContext, useContext, useReducer } from "react";

// creating context, where data layer actually lives
export const StateContext = createContext();

// State provider is actual data layer.
// function parameter are higher order compoenet
// children is <App /> Component

export const StateProvider = ({ reducer, initialState, children }) => (
  // to setup the data layer
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// allows us to pull information from data layer.
export const useStateValue = () => useContext(StateContext);
