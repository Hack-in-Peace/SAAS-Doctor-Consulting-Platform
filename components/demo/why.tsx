import { FocusCards } from "@/components/ui/focus-cards";
import img1 from "@public/doc-img1.jpg"
import img3 from "@public/doc-img3.jpg"
import img4 from "@public/doc-img4.jpg"
export function FocusCardsDemo() {
  const cards = [
    {
      title: "Expert Doctors at Your Fingertips",
      description: "Access highly qualified and experienced medical professionals anytime, anywhere.",

      src: img1,
    },
    {
        title: "Instant Appointments",
        description: "Say goodbye to long waiting times—book consultations instantly with ease.",
        src: img4,
      },
      {
        title: "24/7 Availability",
        description: "Get round-the-clock access to expert doctors, ensuring medical assistance is always just a click away, no matter the time or place.",

        src: img3,
      },


   
  ];

  return (
    <div className="mt-[4vh]">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Why to choose us ?
      </h2>
    <FocusCards cards={cards} />
    </div>
  )
}
