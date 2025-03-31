import React from "react";
import { Carousel } from "flowbite-react";

export default function Home() {
  return (
    <div className="m-5 flex-col">
      <div className="flex justify-self-auto m-auto h-auto ">
        <div className="ml-20 justify-start">
          <img className="max-h-28 max-w-28" src="MCCPLOGO.png" />
        </div>
        <div className="flex-col justify-center font-serif m-auto">
          <p className="text-xl md:text-4xl font-extrabold">Mashimoni Moyo</p>
          <p className="md:text-2xl italic">Learn Today Lead Tomorrow</p>
        </div>
      </div>

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel leftControl=" " rightControl=" ">
          <img src="IMG-20250205-WA0001.jpg" alt="..." />
          <img src="IMG-20250205-WA0000.jpg" alt="..." />
          <img src="IMG-20250122-WA0002.jpg" alt="..." />
          <img src="IMG-20250122-WA0001.jpg" alt="..." />
        </Carousel>
      </div>
      <div className="flex h-56  m-3 p-2">
        <div className="flex-col justify-center m-auto font-serif">
          <p className="text-6xl justify-center font-bold">Mission:</p>
          <p className="text-4xl pt-4 font-thin">Empowering Tomorrow's Leaders</p>
        </div>
      </div>
    </div>
  );
}
