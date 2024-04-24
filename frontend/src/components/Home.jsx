import React from 'react'
import { Button, Modal } from 'flowbite-react'
import { modalState } from '../context/ModalContext'
import AllBlogs from './AllBlogs'

const Home = () => {
    const { openCreateModal, setOpenCreateModal } = modalState();
    return (
        <>
            <div className='mx-20'>
                <div>Home</div>
                <Button onClick={() => setOpenCreateModal(true)}>Create New Blog</Button >

                <AllBlogs />




            </div>

        </>
    )
}

export default Home