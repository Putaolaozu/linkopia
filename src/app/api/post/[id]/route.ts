import Post from "@models/post";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

type paramType = { id: string };

export const GET = async (req: Request, { params }: { params: paramType }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id).populate("creator");

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: paramType }) => {
  const { post, tag } = await req.json();

  try {
    await connectToDB();

    let existingPost = await Post.findById(params.id);
    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: paramType }) => {
  try {
    await connectToDB();
    await Post.findByIdAndRemove(params.id);

    return new Response("Post deleted", { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
