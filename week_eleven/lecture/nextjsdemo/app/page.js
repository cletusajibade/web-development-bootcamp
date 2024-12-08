import React from "react";
import Header from "./components/header";
import LikeButton from "./components/like-button";
import Footer from "./components/footer";

export default function Home() {
  let person = {
    name: "James Bond",
    age: 25,
    location: "London",
  };

  return (
    <div className="wrapper">
      <Header title="React/NextJs Demo" />
      Name: {person.name} <br /> Age: {person.age} <br /> Location:{" "}
      {person.location}
      <LikeButton />
      <Footer />
    </div>
  );
}
