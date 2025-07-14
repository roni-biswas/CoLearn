import React, { useEffect } from "react";
import { useMatches } from "react-router";

const DynamicTitle = () => {
  const matches = useMatches();

  useEffect(() => {
    // Collect all titles from matched routes that have a handle.title
    const titleParts = matches.map((m) => m.handle?.title).filter(Boolean); // remove undefined

    // Join with pipes and set the document title
    if (titleParts.length) {
      document.title = `${titleParts.join(" | ")} | CoLearn`;
    } else {
      document.title = "CoLearn"; // fallback default
    }
  }, [matches]);

  return null;
};

export default DynamicTitle;
