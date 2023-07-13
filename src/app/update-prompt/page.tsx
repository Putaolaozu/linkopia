"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

function EditPrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams?.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();

      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const editPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (promptId === "" || promptId === null) {
      alert("Prompt ID not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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

export default EditPrompt;
