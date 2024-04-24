import { useState, useContext, createContext } from "react";

const ModalContext = createContext();


const ModalContextProvider = ({ children }) => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [blogDetails, setBlogDetails] = useState({});
    const [refresh, setRefresh] = useState(1);


    return (
        <ModalContext.Provider value={{
            openCreateModal, setOpenCreateModal,
            editId, setEditId,
            blogDetails, setBlogDetails,
            refresh, setRefresh

        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const modalState = () => {
    return useContext(ModalContext);
}

export default ModalContextProvider;
