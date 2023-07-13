"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([
    { creator: { email: "", id: "", image: "", username: "", _id: "" }, prompt: "", tag: "", _id: "" },
  ]);
  const [searchedResult, setSearchedResult] = useState([
    { creator: { email: "", id: "", image: "", username: "", _id: "" }, prompt: "", tag: "", _id: "" },
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    const searchResult = filterPrompts(e.target.value);
    setSearchedResult(searchResult);
  };

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((item) => {
      return regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt);
    });
  };

  const handleTagClick = async (tagName: string) => {
    setSearchText(tagName);
    const searchResult = await filterPrompts(tagName);
    setSearchedResult(searchResult);
  };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick}></PromptCardList>
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick}></PromptCardList>
      )}
    </section>
  );
}

export default Feed;
