"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { postProps } from "@utils/types";
import PostCardList from "./PostCardList";

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<postProps[]>();
  const [searchedResult, setSearchedResult] = useState<postProps[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
    const searchResult = filterPosts(e.target.value);
    setSearchedResult(searchResult);
  };

  const filterPosts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return posts?.filter((item) => {
      return (
        regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.link) || regex.test(item.comment)
      );
    });
  };

  const handleTagClick = async (tagName: string) => {
    setSearchText(tagName);
    const searchResult = await filterPosts(tagName);
    setSearchedResult(searchResult);
  };

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <input
          type="text"
          placeholder="Search for a post..."
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      {posts && posts.length > 0 && searchedResult ? (
        <PostCardList data={searchedResult} handleTagClick={handleTagClick}></PostCardList>
      ) : (
        posts && posts.length > 0 && <PostCardList data={posts} handleTagClick={handleTagClick}></PostCardList>
      )}
    </section>
  );
}

export default Feed;
