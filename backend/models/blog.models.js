import mongoose, { mongo } from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    }
}, { timestamps: true })

const blogModel = mongoose.model("blog", blogSchema);


export default blogModel;