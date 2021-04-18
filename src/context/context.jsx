import React, {createContext, useReducer} from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "HANDLER_MESSAGE":
      return {
        ...state,
        message: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  message: false,
};

export const setMessageAC = (value) =>
  ({type: 'HANDLER_MESSAGE', value})


const StoreGlobal = ({children}) => {

  const [context, contextDispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{context, contextDispatch}}>{children}</Context.Provider>
  );
};

const Context = createContext(initialState);
export {StoreGlobal, Context};