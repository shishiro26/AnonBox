"use client";
import React from "react";

const Share = ({ id }: { id: string }) => {
  const handleShare = (id: string) => {
    const shareData = {
      title: "Check out this complaint",
      text: "Here's an anonymous complaint you might find interesting:",
      url: `${window.location.origin}/complaint/${id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.error("Share not supported in this browser.");
    }
  };

  return (
    <button className="text-sm" onClick={() => handleShare(id)}>
      share
    </button>
  );
};

export default Share;
