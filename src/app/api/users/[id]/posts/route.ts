import Prompt from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
