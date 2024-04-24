import express from 'express';
import {
    createBlog,
    deleteBlogById,
    getAllBLogs,
    getBlogById,
    updateBlogById
} from '../controllers/post.controllers.js';

const router = express.Router();

// create post
router.post("/", createBlog);
router.get("/", getAllBLogs);
router.get("/:blogId", getBlogById);

router.delete("/:blogId", deleteBlogById);

router.put("/:blogId", updateBlogById);

export default router;


