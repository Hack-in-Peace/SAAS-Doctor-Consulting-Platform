"use client";

import Image from "next/image";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import img from "@public/bg-doctor.jpg"
import { TextGenerateEffectDemo } from "./textreveal";
export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Can you suggest treatment options?",
    "Are my medications appropriate or safe?",
    "What lifestyle changes can improve my condition?",
    "Can you explain my lab test results?"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[45rem] flex flex-col justify-center  items-center px-4 relative ">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Ask Consult-Ease Anything!
      </h2>
    <div className="absolute inset-0 -z-10">
      <Image
        src={img}
        alt="Doctor"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <div className="mt-[7vh]">
      <TextGenerateEffectDemo/>
      </div>
      
    </div>
  );
}
