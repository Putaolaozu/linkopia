import React from "react";
import PostCard from "./PostCard";
import { handleTagClickType, postProps } from "@utils/types";

interface PostCardListProps {
  data: postProps[];
  handleTagClick: handleTagClickType;
}

function PostCardList({ data, handleTagClick }: PostCardListProps) {
  return (
    <div className="mt-16 post_layout">
      {data.map((post) => {
        return <PostCard key={post._id} post={post} handleTagClick={handleTagClick}></PostCard>;
      })}
    </div>
  );
}

export default PostCardList;
