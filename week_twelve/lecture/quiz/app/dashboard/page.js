"use client";

import { useActionState } from "react";
import { getData } from "@/lib/server-actions";

const initialState = {
  message: "",
};

export default function Home() {
  const { data, error, isLoading } = useActionState(getData, initialState);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
