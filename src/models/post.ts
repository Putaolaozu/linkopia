import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  link: {
    type: String,
    require: [true, "Link is required!"],
  },

  comment: {
    type: String,
    require: [true, "Comment is required!"],
  },
  tag: {
    type: String,
    require: [true, "Tag is required!"],
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
