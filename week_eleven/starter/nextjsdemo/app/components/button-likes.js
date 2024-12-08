"use client";

import React from "react";

export default function ButtonLikes() {
    const [likes, setLikes] = React.useState(0);
    const [isStudent, setStudent] = React.useState(false);

  function handleClick() {
    setLikes(likes + 1);
    // setLikes(prevLikes => prevLikes + 1);

    if (isStudent) {
      console.log(" you are qualified");
    } else {
      setStudent((isStudent) => {
        isStudent = true;
      });
    }

    console.log("button clicked");
  }
  return (
    <div>
      <button onClick={handleClick}>Likes({likes})</button>
    </div>
  );
}
