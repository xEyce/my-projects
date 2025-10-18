import { createContext, useContext, useState } from "react";


const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const useStateContext = () => useContext(StateContext);

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCES_TOKEN'));

    const setToken = () => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    );
}

