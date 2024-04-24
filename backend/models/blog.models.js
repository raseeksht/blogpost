import mongoose, { mongo } from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const blogModel = mongoose.model("blog", blogSchema);


export default blogModel;