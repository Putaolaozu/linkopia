"use client";

import Form from "@components/Form";
import { FormProps } from "@utils/types";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

function EditPost() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<FormProps["post"]>({ link: "", tag: "", comment: "" });
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams?.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/post/${postId}`);
      const data = await response.json();

      setPost({ link: data.link, tag: data.tag, comment: data.comment });
    };

    if (postId) {
      getPromptDetails();
    }
  }, [postId]);

  const editPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (postId === "" || postId === null) {
      alert("Prompt ID not found");
    }

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          comment: post.comment,
          link: post.link,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt}></Form>;
}

export default EditPost;
