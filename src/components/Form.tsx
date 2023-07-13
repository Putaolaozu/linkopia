import Link from "next/link";
import Image from "next/image";
import { FormProps } from "@utils/types";

function Form({ type, post, setPost, submitting, handleSubmit }: FormProps) {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        Create and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form action="" onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            name=""
            id=""
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="form_textarea"
            placeholder="Write your prompt here..."
            required></textarea>
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">(#product, #webdevelopment, #idea ...)</span>
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            placeholder="product"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="cancel_btn">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="submit_btn">
            {submitting ? <Image src="assets/icons/stroke_loader.svg" alt="loader" width={30} height={30} /> : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
