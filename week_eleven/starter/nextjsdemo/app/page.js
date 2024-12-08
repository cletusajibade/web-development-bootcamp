import React from "react";
import Header from "./components/header";
import ButtonLikes from "./components/button-likes";

export default function Home() {
  return (
    <div>
      Home Page
      <Header title="Welcome to Javascript and React Framework" age="25" />
      <ButtonLikes />
    </div>
  );
}
