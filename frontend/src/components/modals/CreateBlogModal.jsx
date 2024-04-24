import React, { useEffect, useState } from 'react'
import { Modal, TextInput, Label, Textarea, Button } from 'flowbite-react'
import { modalState } from '../../context/ModalContext'
import axios from 'axios';
import apiurl from '../apiurl';
import { alertState } from '../../context/AlertContext';
import { authState } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const CreateBlogModal = () => {
    const navigate = useNavigate();
    const { openCreateModal, setOpenCreateModal,
        editId,
        setEditId, blogDetails,
        setBlogDetails, setRefresh } = modalState();
    const { setAlert } = alertState();
    const { isLoggedIn, user, setOpenLoginModal } = authState();



    const handlePostBlog = async () => {
        if (!blogDetails.title || !blogDetails.content) {
            alert("title and content required")
            return
        }
        try {
            let resp;
            let options = {};

            if (isLoggedIn) {
                options = {
                    "headers": {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }

            }
            if (editId) {
                resp = await axios.put(`${apiurl}/blogs/${editId}`, blogDetails, options);
            } else {
                resp = await axios.post(apiurl + "/blogs", blogDetails, options)

            }
            if (resp.status == 200) {
                console.log(resp)
                setOpenCreateModal(false);
                setBlogDetails({});
                setEditId(null);
                setRefresh(Math.random()); // trigger refresh after the udpate
                setAlert({ type: "success", "message": resp.data.message })
            } else {
                setOpenCreateModal(false)
                setAlert({ type: "failure", message: "error occured" })
            }

        } catch (err) {
            setOpenCreateModal(false)
            setAlert({ type: "failure", message: err?.response?.data?.message || "error occured" })
        }


    }
    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            const resp = await axios.delete(`${apiurl}/blogs/${editId}`, config)
            console.log(resp)
            if (resp.status == 204) {
                setAlert({ type: "success", message: "Deleted" })
                navigate("/")
            } else {
                setAlert({ type: "failure", message: data.message })
            }
        } catch (err) {
            console.log(err)
            setAlert({ type: "failure", message: err.response?.data?.message || "something went wrong" })
        }
        setOpenCreateModal(false)
    }
    return (

        <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
            <Modal.Header>Create new Blog</Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Title" />
                    </div>
                    <TextInput id="title" type="text" sizing="md" value={blogDetails.title}
                        onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="content" value="Content" />
                    </div>
                    <Textarea id="content" type="text" sizing="md" className='h-40'
                        value={blogDetails.content}
                        onChange={(e) => setBlogDetails({ ...blogDetails, content: e.target.value })}

                    />
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-end'>
                <Button color="green" onClick={() => { setBlogDetails({}); setOpenCreateModal(false) }}>
                    Cancel
                </Button>
                {editId ?
                    <Button color="failure" onClick={handleDelete}>Delete</Button>
                    : ""
                }

                <Button onClick={handlePostBlog}>{editId ? "Edit" : "Post"} Blog</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default CreateBlogModal