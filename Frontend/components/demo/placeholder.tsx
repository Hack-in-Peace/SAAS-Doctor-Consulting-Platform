"use client";

import Image from "next/image";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import img from "@public/bg-doctor.jpg"
import { TextGenerateEffectDemo } from "./textreveal";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"
export function PlaceholdersAndVanishInputDemo() {

  const be = process.env.NEXT_PUBLIC_BE_URI2;

  const [sympTxt, setSympTxt] = useState<string | null>(null);
  const [resTxt, setResTxt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const placeholders = [
    "Fever, cough, sore throat",
    "difficulty swallowing",
    "bone pain, night sweats, and fever",
    "Bruising or bleeding"
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSympTxt(e.target.value);
  };
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Generating Response....")
    setLoading(true);
    const res = await axios.get(`${be}/groqAPI?symptoms=${sympTxt}`);

    setResTxt(res.data.value.choices[0].message.content)
    toast("Suggestions Generated Successfully!")
    setLoading(false);
  };



  return (
    <div className="h-full flex flex-col justify-center  items-center px-4 relative py-[5vh]">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        You Give the symptoms, we give the remedy!
      </h2>
      <p className=" mb-4">Type your symptoms below and press enter</p>
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
      <div className="mt-5">
        {resTxt&& !loading?
        <div className=" w-[80vw] h-full font-semibold bg-white px-[5vw] py-[5vh] rounded-md shadow-md">
             {resTxt}
        </div>:loading?
        <div>
          <SkeletonCard/>
        </div>: <div></div>}
      </div>
    </div>
  );
}



export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[500px] w-[800px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
