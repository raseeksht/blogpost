import React, { useEffect, useState } from 'react'
import axios from 'axios';
import apiurl from './apiurl';
import { Blockquote, Pagination, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import { modalState } from '../context/ModalContext';



const BlogBox = ({ blog }) => {
    const navigate = useNavigate();
    const parseDate = (date) => {
        date = new Date(date);
        // console.log(date.getYear())

        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
    return (
        <>
            <div className='border-solid border-2 my-3' onClick={() => navigate(`/blog/${blog._id}`)}>
                {blog.title}
                <p>
                    {blog.content}
                </p>
                <p>
                    Published : {parseDate(blog.createdAt)}
                </p>
                <p>
                    Author: {blog?.author?.username || "Anonymous"}
                </p>
            </div>
        </>
    )
}

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [blogPerPage, setBlogPerPage] = useState(3); // x blog per page

    const { refresh } = modalState();

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    const fetchBlogs = async () => {
        const blogCountResp = await axios.get(apiurl + "/blogs/countblogs")
        setTotalPages(blogCountResp.data.totalBlogs)

        const { data } = await axios.get(`${apiurl}/blogs?blogperpage=${blogPerPage}&pagenumber=${currentPage}`)
        setBlogs(data.data)
        console.log(data)
    }
    useEffect(() => {
        fetchBlogs()
    }, [currentPage, refresh])
    return (
        <>
            <div>
                <h1 className='text-2xl'>Explore the Blogs By All Creators:
                </h1>
                <div className=''>
                    {blogs.map(blog => (
                        <BlogBox blog={blog} key={blog._id} />

                    ))}
                </div>
            </div>

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={currentPage} totalPages={Math.ceil(totalPages / blogPerPage)} onPageChange={onPageChange} />
            </div>
        </>
    )
}

export default AllBlogs