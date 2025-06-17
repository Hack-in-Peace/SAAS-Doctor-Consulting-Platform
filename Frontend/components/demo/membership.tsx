"use client"

import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useState } from "react";


//ensuring the razorpay object is recognized properly
declare global {
  interface Window {
    Razorpay: any;
  }
}

export function CardSpotlightDemo() {
  const Amount = 999; //subscription fees
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async ()=>{

  
    setIsProcessing(true);

    try {

      //Create order
      const response = await fetch("api/payment", {method: "POST"});
      const data = await response.json();
      
      //Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: Amount * 1000,
        currency: "INR",
        name: "Consult-Ease",
        description: "Subscription",
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("Payment successful", response);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }catch(error){
      console.error("Payment failed", error);
    }finally {
      setIsProcessing(false);
    }
  };
   
  return (
    <div className="flex gap-[20vw] items-center justify-center mb-[2vh]">

<CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Free Membership Plan
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        
        <ul className="list-none  mt-2 flex flex-col gap-2">
          <Step title="Basic Consultations" />
          <Step title="Limited access to general health consultations" />
          <Step title="Access to general practitioners only" />
          <Step title="Basic appointment booking features with limited time slots." />
        </ul>
        <button className="px-8 py-2 mt-[7vh] rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
        Rs.0/month
        </button>

      </div>

    </CardSpotlight>
    <CardSpotlight className="h-96 w-96">
    <script src="https://checkout.razorpay.com/v1/checkout.js" />
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Paid Membership Plan
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
    
        <ul className="list-none  mt-2 flex flex-col gap-2">
          <Step title="Unlimited Consultations" />
          <Step title="Specialist Access" />
          <Step title="Priority Appointments" />
          <Step title="24/7 On-Demand Consultations" />
          <Step title="+ All free membership plans" />
        </ul>
        
        <button 
        onClick={handlePayment}
        disabled={isProcessing}
        className="px-8 py-2 mt-[9vh] rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500 disabled:bg-gray-400">
         {isProcessing  ? "Processing...": "Rs.999/month"}
        </button>
      </div>

    </CardSpotlight>
    </div>

  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
