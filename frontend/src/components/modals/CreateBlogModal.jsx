import React, { useState } from 'react'
import { Modal, TextInput, Label, Textarea, Button } from 'flowbite-react'
import { modalState } from '../../context/ModalContext'
import axios from 'axios';
import apiurl from '../apiurl';
import { alertState } from '../../context/AlertContext';

const CreateBlogModal = () => {
    const { openCreateModal, setOpenCreateModal, editId, setEditId, blogDetails, setBlogDetails, setRefresh } = modalState();
    const { setAlert } = alertState();

    const handlePostBlog = async () => {
        if (!blogDetails.title || !blogDetails.content) {
            alert("title and content required")
            return
        }
        let resp;
        if (editId) {
            console.log("putting in the serveri", editId)
            resp = await axios.put(`${apiurl}/blogs/${editId}`, blogDetails);
        } else {
            resp = await axios.post(apiurl + "/blogs", blogDetails)

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
        console.log(resp)

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
                <Button color="failure" onClick={() => { setBlogDetails({}); setOpenCreateModal(false) }}>
                    Cancel
                </Button>
                <Button onClick={handlePostBlog}>Post Blog</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default CreateBlogModal