import React from "react";
import PromptCard from "./PromptCard";
import { handleTagClickType, postProps } from "@utils/types";

interface PromptCardListProps {
  data: postProps[];
  handleTagClick: handleTagClickType;
}

function PromptCardList({ data, handleTagClick }: PromptCardListProps) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}></PromptCard>;
      })}
    </div>
  );
}

export default PromptCardList;
