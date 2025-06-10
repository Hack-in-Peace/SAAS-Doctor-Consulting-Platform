"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `The doctor of the future will give no medicine but will interest their patients in the care of the human frame, in diet, and in the cause and prevention of disease.`
export function TextGenerateEffectDemo() {
  return(
    <div className=" mx-[5vw]">
        <TextGenerateEffect words={words} />
    </div>
  ) 
}
