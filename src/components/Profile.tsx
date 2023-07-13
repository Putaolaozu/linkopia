import React from "react";
import PromptCard from "./PromptCard";
import { handleDeleteType, handleEditType, postProps } from "@utils/types";

interface ProfileProps {
  name: string;
  desc: string;
  data: postProps[];
  handleEdit?: handleEditType;
  handleDelete?: handleDeleteType;
}

function Profile({ name, desc, data, handleEdit, handleDelete }: ProfileProps) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => {
          return (
            <PromptCard key={post._id} post={post} handleEdit={handleEdit} handleDelete={handleDelete}></PromptCard>
          );
        })}
      </div>
    </section>
  );
}

export default Profile;
