"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { PostCardProps } from "@utils/types";
import Link from "next/link";

function PostCard({ post, handleTagClick, handleEdit, handleDelete }: PostCardProps) {
  const { data: session } = useSession();
  const pathName = usePathname();

  return (
    <div className="post_card z-20">
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
      </div>
      <Link href={post.link || ""} className="block my-4 font-satoshi text-lg text-blue-700 hover:underline">
        {post.link.split("//")[1]}
      </Link>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.comment}</p>
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
          <button
            className="font-inter submit_btn"
            onClick={() => {
              if (handleEdit) {
                handleEdit(post);
              }
            }}>
            Edit
          </button>
          <button
            className="font-inter delete_btn"
            onClick={() => {
              if (handleDelete) {
                handleDelete(post);
              }
            }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
