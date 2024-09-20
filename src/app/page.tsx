"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/BlockNote/editor"), {
  ssr: false,
});

export default function App() {
  return (
    <div>
      <Editor />
    </div>
  );
}
