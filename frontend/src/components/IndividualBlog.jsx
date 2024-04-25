import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import apiurl from './apiurl';
import { alertState } from '../context/AlertContext';
import { modalState } from '../context/ModalContext';
import { TextInput, Label, Button, Avatar } from 'flowbite-react';
import { authState } from '../context/AuthContext';

const IndividualBlog = () => {
    const { setAlert } = alertState();
    const { isLoggedIn, setOpenLoginModal } = authState();
    const { setRefresh } = modalState();

    const blogId = useParams().blogId;
    const [blog, setBlog] = useState();
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState("");

    const { setOpenCreateModal, setEditId, setBlogDetails, refresh } = modalState();

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`${apiurl}/blogs/${blogId}`)
            const commentOnThisBlog = await axios.get(`${apiurl}/comments/${blogId}`)
            setBlog(data.data)
            setComments(commentOnThisBlog.data.data)
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

    const handleAddComment = async () => {
        if (!newComment) {
            alert("COmmnet cannot be empty")
            return
        }
        if (!isLoggedIn) {
            setOpenLoginModal(true);
            return
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            const addComment = await axios.post(`${apiurl}/comments/${blogId}`, {
                content: newComment
            }, config)
            if (addComment.status == 200) {
                console.log(addComment);
                setAlert({ type: "success", message: addComment.data.message })
                setRefresh(Math.random());
            }

        } catch (err) {
            console.log(err)
            setAlert({ type: "failure", message: err?.response?.data?.message || "failed to add comment" })
        }

    }

    useEffect(() => {
        fetchBlog();
    }, [refresh]);

    return (
        <>
            <div className='container mx-10'>
                <h1 className='text-2xl text-center'>Individual Blog Details</h1>
                {blog ? <div className=''>
                    <h1 className='text-2xl'>{blog.title} <i className="fas fa-pen-to-square cursor-pointer" onClick={() => handleEditBlog(blog)}></i></h1>
                    <p>
                        <strong>Content:</strong> {blog.content}
                    </p>

                </div > : "loading..."
                }

                <div className='flex'>

                    <div className="md:w-[50%%] w-[100%] mt-20">
                        <div className="mb-2 block">
                            <Label htmlFor="email3" value="What do you think of this post? " />
                        </div>
                        <TextInput
                            id="comment"
                            type="text"
                            placeholder="Aeesome Blog"
                            value={newComment}
                            onChange={(e) => { setNewComment(e.target.value) }}

                        />
                        <Button onClick={handleAddComment}>Add Comment</Button>
                    </div>
                </div>

                <div className='mt-7'>

                    {
                        comments && comments.length > 0 ?
                            <div className='justify-start'>
                                {comments.map(comment => (

                                    <div key={comment._id} className='justify-start border-solid h-[50px] my-2'>
                                        <div>

                                            <Avatar alt="User settings" img={comment.commentor.profilePic} rounded className='absolute' />
                                        </div>
                                        <div className='pl-[50px]'>
                                            <h3 className='font-bold'>{comment.commentor.username}</h3>
                                            {comment.content}
                                        </div>
                                        <hr />
                                    </div>

                                ))}
                            </div> : "No Comments. Make Your first Comment now..."
                    }
                </div>
            </div>
        </>
    )
}

export default IndividualBlog