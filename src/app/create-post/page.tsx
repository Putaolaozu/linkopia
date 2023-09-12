"use client";

import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProps } from "@utils/types";

function CreatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<FormProps["post"]>({ link: "", tag: "", comment: "" });
  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          link: post.link,
          userId: session?.user?.id,
          tag: post.tag,
          comment: post.comment,
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

  return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}></Form>;
}

export default CreatePrompt;
