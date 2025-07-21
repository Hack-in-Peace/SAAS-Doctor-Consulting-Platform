
"use client";
import { useEffect, useState } from "react";

"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  },[]);
  if (!hasMounted) return null;
  const testimonials = [
  {
    quote:
      "The care and attention I received were exceptional. The doctor truly listened and helped me understand my condition clearly. I feel so much better now.",
    name: "Sarah Chen",
    designation: "Patient from TechFlow City Clinic",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Booking an appointment was simple, and I was connected with a specialist in no time. The consultation was thorough and very reassuring.",
    name: "Michael Rodriguez",
    designation: "Mother Of Two",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This service made getting medical advice so easy. The doctor explained everything patiently and helped me get the treatment I needed.",
    name: "Emily Watson",
    designation: "Working Professional",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "From quick responses to expert care, everything was handled smoothly. I felt genuinely cared for throughout the consultation process.",
    name: "James Kim",
    designation: "Returning Patient",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Having access to quality medical advice from home has been a lifesaver. The doctors are experienced, and the platform is easy to use.",
    name: "Lisa Thompson",
    designation: "First-time Patient",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

  return(
    <div>
        <h1 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black mt-[4vh]">Testimonials</h1>
    <AnimatedTestimonials testimonials={testimonials} />
  </div>
  )

  
}
