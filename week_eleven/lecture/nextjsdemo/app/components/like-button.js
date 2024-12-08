"use client"; // This tells React to render the component on the client.
import React from "react";

export default function LikeButton() {
  const [likes, setLikes] = React.useState(0);
  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <div>
      <button className="like-button" onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}
