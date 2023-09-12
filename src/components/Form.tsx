import Link from "next/link";
import Image from "next/image";
import { FormProps } from "@utils/types";

function Form({ type, post, setPost, submitting, handleSubmit }: FormProps) {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="text-xl sm:text-3xl text-left font-semibold">
        <span className="blue_gradient">{type} your Post</span>
      </h1>
      <p className="desc text-left max-w-md">Share the most interesting, inspiring, fabulous links you've got!</p>

      <form action="" onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="link-input">
          <span className="font-satoshi font-semibold text-base text-gray-700">Share your link</span>
          <input
            type="text"
            name="link"
            id="link-input"
            value={post.link}
            onChange={(e) => setPost({ ...post, link: e.target.value })}
            className="form_input"
            placeholder="Paste your links here..."
            required></input>
        </label>
        <label htmlFor="tag-input">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">( #product, #webdevelopment, #idea ... )</span>
          </span>
          <input
            id="tag-input"
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            placeholder="product"
            required
          />
        </label>
        <label htmlFor="comment-input">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description <span className="font-normal">( Something you wanna say about it? )</span>
          </span>
          <textarea
            id="comment-input"
            value={post.comment}
            onChange={(e) => setPost({ ...post, comment: e.target.value })}
            className="form_textarea"
            placeholder="product"
            required
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
