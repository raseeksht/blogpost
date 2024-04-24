import React from 'react'
import { Button, Modal } from 'flowbite-react'
import { modalState } from '../context/ModalContext'
import AllBlogs from './AllBlogs'
import { authState } from '../context/AuthContext'

const Home = () => {
    const { openCreateModal, setOpenCreateModal } = modalState();
    const { isLoggedIn, setOpenLoginModal } = authState();
    const handleCreateNewBlog = () => {
        if (!isLoggedIn) {
            setOpenLoginModal(true)
        } else {
            setOpenCreateModal(true)

        }
    }
    return (
        <>
            <div className='mx-20'>
                <div>Home</div>
                <Button onClick={() => handleCreateNewBlog()}>Create New Blog</Button >

                <AllBlogs />




            </div>

        </>
    )
}

export default Home