import { CardSpotlightDemo } from "@/components/demo/membership";
import { NavigationMenuDemo } from "@/components/demo/navbar";
import { PlaceholdersAndVanishInputDemo } from "@/components/demo/placeholder";
import { AnimatedTestimonialsDemo } from "@/components/demo/testimonials";
import { FocusCardsDemo } from "@/components/demo/why";


export default function Home() {
  return (
    <div className="flex flex-col gap-5">

      <PlaceholdersAndVanishInputDemo/>
      <FocusCardsDemo/>
      <AnimatedTestimonialsDemo/>
      <CardSpotlightDemo/>
    </div>
    

  )
}
