"use client";
import Profile from "@components/Profile";
import { postProps } from "@utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<postProps[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session]);

  const handleEdit = (post: postProps) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post: postProps) => {
    const hasConfirmed = confirm(`Are you sure you want to delete this prompt?`);

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            const filteredPosts = posts?.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return posts && posts.length > 0 ? (
    <Profile name="Your" desc="" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}></Profile>
  ) : (
    <h2 className="text-xl sm:text-2xl italic">You've got no post yet. 🤓</h2>
  );
};

export default ProfilePage;
