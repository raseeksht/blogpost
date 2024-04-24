import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import apiurl from './apiurl';
import { alertState } from '../context/AlertContext';
import { modalState } from '../context/ModalContext';

const IndividualBlog = () => {
    const { setAlert } = alertState();
    const blogId = useParams().blogId;
    const [blog, setBlog] = useState();

    const { setOpenCreateModal, setEditId, setBlogDetails, refresh } = modalState();

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`${apiurl}/blogs/${blogId}`)
            console.log(data.data)
            // setAlert({ type: "success", message: data.message })
            // setting new blog data
            setBlog(data.data)
        } catch (error) {
            console.log(error)
            setAlert({ type: "failure", message: error?.message || "Some error" })

        }
    }

    const handleEditBlog = (blog) => {

        setBlogDetails(blog)
        setEditId(blog._id)
        setOpenCreateModal(true);


    }

    useEffect(() => {
        console.log("use effect in effect")
        fetchBlog();
    }, [refresh]);

    return (
        <>
            <h1 className='text-2xl text-center'>Individual Blog Details</h1>
            {blog ? <div className='mx-10'>
                <h1 className='text-2xl'>{blog.title} <i className="fas fa-pen-to-square cursor-pointer" onClick={() => handleEditBlog(blog)}></i></h1>
                <p>
                    <strong>Content:</strong> {blog.content}
                </p>

            </div > : "loading..."
            }

        </>
    )
}

export default IndividualBlog