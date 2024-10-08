"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("../components/BlockNote/editor"), {
  ssr: false,
});

export default function App() {
  const router = useRouter();
  return (
    <div className="space-y-10 flex flex-col items-center justify-center w-full">
      <a className="w-full mt-10" href="https://www.lipsum.com" target="_blank">
        <Button className="w-full ">LOREM TEXT</Button>
      </a>
      <a
        className="w-full mt-10"
        href="https://www.youtube.com/embed/TpF99SHncp0"
        target="_blank"
      >
        <Button className="w-full ">VİDEO</Button>
      </a>
      <Editor />
    </div>
  );
}
1;
