import React from "react";
import PromptCard from "./PostCard";
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
      <h1 className="text-xl sm:text-3xl font-semibold font-mono text-left">
        <span className="blue_gradient">{name} Posts</span>
      </h1>
      {desc && <p className="desc text-left">{desc}</p>}
      <div className="mt-16 grid grid-cols-3 gap-4">
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
