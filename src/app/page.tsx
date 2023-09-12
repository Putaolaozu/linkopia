import Feed from "@components/Feed";
import React from "react";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <hgroup className="text-center">
        <span className="text-xl sm:text-3xl font-mono font-semibold">Break the Information Cocoons</span>
        <br className="max-md:hidden"></br>
        <h1 className="head_text red_blue_gradient">Share interesting links</h1>
      </hgroup>
      <p className="desc text-center">
        <span className="font-semibold">Linkopia</span> is a place that aimed to break your information cocoons, by
        sharing web pages to each other.
      </p>
      <Feed></Feed>
    </section>
  );
}

export default Home;
