
import asyncHandler from 'express-async-handler';
import blogModel from '../models/blog.models.js';
import { makeResponse } from '../helpers/helperFunctions.js';

const createBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    try {
        const blog = await blogModel.create({ title, content });
        if (blog) {
            res.json(makeResponse("s", "Blog Created successfullt", blog))
        } else {
            res.status(500).json(makeResponse("f", "failed to create new blog"))
        }
    } catch (err) {
        throw new Error(err?.message || "unknown error occured while creating blog")
    }
})

const getAllBLogs = asyncHandler(async (req, res) => {
    const { pagenumber, blogperpage } = req.query

    const offset = (pagenumber - 1) * blogperpage
    console.log(offset)
    try {
        const blogs = await blogModel.find().sort({ createdAt: -1 }).skip(offset).limit(blogperpage)
        res.json(makeResponse("s", "All blog available are here", blogs))
    } catch (err) {
        throw new Error(err?.message || "unknown error occured while fetchin blogs")
    }
})

const getBlogById = asyncHandler(async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const blog = await blogModel.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json(makeResponse("f", "No blog exists with that Id"))
        }
        res.json(makeResponse("s", "Blog fetched successfully", blog))

    } catch (err) {
        throw new Error(err?.message || "unknown error occured while fetching blog")

    }
})

const deleteBlogById = asyncHandler(async (req, res) => {
    const blogId = req.params.blogId;

    const blog = await blogModel.deleteOne({ _id: blogId });
    if (blog.deletedCount == 1) {
        res.status(204).json(makeResponse("s", "Successfully deleted"))
    }
    else {
        res.status(400).json(makeResponse("f", "NO such blog with that id"))
    }
})

const updateBlogById = asyncHandler(async (req, res) => {
    const blogId = req.params.blogId;

    console.log(blogId)

    const { title, content } = req.body;

    console.log(title, content)

    try {
        const blog = await blogModel.findOneAndUpdate({ _id: blogId }, { title, content }, { new: true });
        res.json(makeResponse("s", "blog updated successfully", blog))
    }
    catch (err) {
        throw new Error(err?.message || "error updating blog");
    }

})


const countBlogs = asyncHandler(async (req, res) => {
    try {
        const totalBlogCount = await blogModel.countDocuments({});
        return res.json({ totalBlogs: totalBlogCount });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Error fetching blog count" }); // Send a generic error response
    }
});

export { createBlog, getAllBLogs, getBlogById, deleteBlogById, updateBlogById, countBlogs };