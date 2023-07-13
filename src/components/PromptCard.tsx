"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { PromptCardProps } from "@utils/types";
import Link from "next/link";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={`/profile`} className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image || "/assets/icons/loader.svg"}
            alt={post.creator.username || "loading"}
            width={40}
            height={40}
            className="rounded-full object-contain"></Image>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </Link>

        <div
          className={`copy_btn ${copied ? "copied" : "hover:bg-gray-100 transition-all cursor-pointer"}`}
          onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
            alt={copied ? "already copied" : "copy this prompt"}></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          if (handleTagClick) {
            handleTagClick(post.tag);
          }
        }}>
        #{post.tag}
      </p>

      {session?.user?.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => {
              if (handleEdit) {
                handleEdit(post);
              }
            }}>
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => {
              if (handleDelete) {
                handleDelete(post);
              }
            }}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
