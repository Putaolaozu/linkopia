import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req: {
  json: () => PromiseLike<{ userId: any; prompt: any; tag: any }> | { userId: any; prompt: any; tag: any };
}) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
