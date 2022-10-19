import { createContext, useReducer } from "react";
import getError from "../utils/getError";

const userReducer = (initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...initialState, loading: true}
    case 'SET_USER_INFO':
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {...initialState, userInfo: action.payload.user, token: action.payload.token, loading: false, error: ''};
    case 'SET_ERROR':
      alert(getError(action.payload))
      return {...initialState, error: action.payload, loading: false}
    case 'LOGOUT':
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      return {...initialState, token: null, userInfo: null}
    default:
      return initialState;
  }
} 

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    error: '',
    loading: false
  }
  const [ state, dispatch ] = useReducer(userReducer, initialState);
  return(
    <UserContext.Provider value = {{state: state, dispatch: dispatch}} >
      {children}
    </UserContext.Provider>
  )
}