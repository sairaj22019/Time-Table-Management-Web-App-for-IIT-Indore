
"use client";

import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Images() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const dashboards = [
    { name: "Student Dashboard", src: "/pic.png", alt: "student" },
    { name: "Professor Dashboard", src: "/pic.png", alt: "professor" },
    { name: "Admin Dashboard", src: "/pic.png", alt: "admin" },
  ];

  return (
    <div className="w-full flex justify-center py-10 px-4 bg-gray-50">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full max-w-4xl"
      >
          <CarouselPrevious />
        <CarouselContent>
          {dashboards.map((item, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <Card className="w-full my-2 mx-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                  <div className="w-full h-auto relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1000}
                      height={600}
                      className="w-full h-auto rounded-md object-contain"
                    />
                  </div>
                  <p className="text-center font-semibold text-lg text-gray-800">
                    {item.name}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Images;
