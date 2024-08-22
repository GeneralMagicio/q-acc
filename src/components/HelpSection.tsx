import links from "@/lib/constants/links";
import React from "react";

export const HelpSection = () => {
  return (
    <div className="container py-10 relative flex flex-col gap-6 text-center text-2xl font-light">
      <h1 className="text-4xl text-giv-500 font-bold ">Need help?</h1>
      <p>
        Stuck or have questions? Our team is on standby to assist you.
        <br />
        Send us an email at{" "}
        <a className="text-pink-500" href="mailto:qacc@giveth.io">
          qacc@giveth.io
        </a>
        , or drop us a message at{" "}
        <a
          href={links.DISCORD_SUPPORT}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500"
        >
          Giveth’s Discord #general channel
        </a>
        .
      </p>
    </div>
  );
};
