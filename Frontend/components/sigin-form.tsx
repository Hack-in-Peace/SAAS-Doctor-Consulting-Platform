"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import {
  
  IconBrandGoogle,
} from "@tabler/icons-react";
import Link from "next/link";

export default function SignIn() {
  const be_uri = process.env.NEXT_PUBLIC_BE_URI;
  const router = useRouter();
    interface UserDet{
      email: string,
      password: string,
    }
  
    const [userDet, setUserDet] = useState< UserDet>({

      email: '',
      password: '',
    })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const {  email, password } = userDet;
    
    if ( !email || !password ) {
      toast.error("Please fill all the required credentials!");
      return;
    }
  
    try {

      const res = await axios.post(`${be_uri}/users/login`, userDet);

      if(res.data.message){
        toast(res.data.message);
        return;
      }
      localStorage.setItem("user_det", JSON.stringify(res.data));
      toast.success("Logged In successfully!");
      router.push("/")

    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Consult Ease
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Consult Ease if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e)=>{setUserDet({...userDet, email: e.target.value})}}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={(e)=>{setUserDet({...userDet, password: e.target.value})}}/>
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">

          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        <div>Don&apos;t have an account? <span className=" text-blue-500 underline-offset-1 underline"><Link href={"/signup"}>Sign Up</Link> </span></div>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
