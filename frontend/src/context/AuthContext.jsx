import { useState, useContext, createContext, useEffect } from "react";


const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("user")
    }

    useEffect(() => {
        try {
            const usr = JSON.parse(localStorage.getItem("user"))
            if (usr) {
                setUser(usr)
                setIsLoggedIn(true)
            }
        } catch (err) {
            // user is undefined or something
            // not logged in

        }
    }, [])

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setUser(JSON.parse(user))
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    const testFunc = () => {
        alert("test function")
    }
    return (
        <AuthContext.Provider value={{
            isLoggedIn, setIsLoggedIn,
            user, setUser,
            openLoginModal, setOpenLoginModal,
            openRegisterModal, setOpenRegisterModal, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const authState = () => {
    return useContext(AuthContext);
}

export default AuthContextProvider;