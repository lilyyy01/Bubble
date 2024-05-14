"use client"

// import '../styles/globals.css';

import { SingleImageDropzone } from './components/singleImageDropZone';
import { useEdgeStore } from "./lib/edgestore";

import { useSession } from "next-auth/react";  // hook for users session

// import type { AppProps } from 'next/app';
import React from 'react';
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore, reset } = useEdgeStore();

  const { data } = useSession();
  console.log("session data info: ", data);

  let username = data?.user?.name;
  if (typeof username !== "string"){
    username = "4321";
  }

  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  return (
    <div className="flex flex-col items-center m-6 gap-2 bg-black">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 2,  // 2MB
        }}
        onChange={(file) => {
          setFile(file);
        }}
      />

      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-150"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <button
        className="bg-white text-black rounded px-2 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicImages.upload({
              file,
              // the image is used as the users profile, so the type is profile...
              input: { type: "profile", userId: username! },
              onProgressChange: (progress) => {setProgress(progress);},
            });

            // save your data here
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >Submit</button>
      {/* <div>Access info: {data?.user} </div> */}
    </div>
  );
}
