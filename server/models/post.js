const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
        type: String,
        required: [true, "Title must be filled"]
    },
    content: String,
    image: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    tags: []
  })


const Post = mongoose.model('Post', PostSchema)

module.exports = Post