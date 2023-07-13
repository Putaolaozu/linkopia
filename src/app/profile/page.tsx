"use client";
import Profile from "@components/Profile";
import { postProps } from "@utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      creator: { email: "", id: "", image: "", username: "", _id: "" },
      prompt: "",
      tag: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user?.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post: postProps) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: postProps) => {
    const hasConfirmed = confirm(`Are you sure you want to delete this prompt?`);

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}></Profile>
  );
};

export default ProfilePage;
