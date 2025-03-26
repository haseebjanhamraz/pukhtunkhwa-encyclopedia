"use client"

import {
  MagicCard,
  MagicContainer,
} from "@/components/magicui/magic-card";
import Image from "next/image";
import useDistricts from "../hooks/useDistricts";
import Link from "next/link";
export default function GameCard() {
  const { districts } = useDistricts();
  return (
    <div className="mx-auto flex max-w-full flex-col items-center space-y-4 text-center">
      <h2 className="font-heading text-4xl leading-[1.1] sm:text-6xl md:text-3xl lg:text-5xl font-bold">
        Must Visit Places
      </h2>
      <p className="text-muted-foreground max-w-[85%] pb-1 sm:pb-1 lg:pb-10 leading-normal sm:text-lg sm:leading-7">
        Here are some of our favorite places to visit in Pukhtunkhwa.
      </p>

      <MagicContainer
        className={
          "mt-60 flex h-auto w-full flex-wrap justify-center gap-4 px-14 pb-10 md:mt-20 lg:mt-20"
        }
      >
        {districts.map((district) => (
          district.mustVisit && (
            <MagicCard key={district.name} className="flex w-4/2 sm:w-4/3 md:w-1/4 lg:1/4 cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl relative">
              <p className="z-10 whitespace-nowrap text-4xl text-white dark:text-white hover:scale-150 transition-all duration-300 text-shadow-lg font-bold">
                <Link href={`/districts/${district._id}`}>
                  {district.name}
                </Link>
              </p>
              <div className="absolute inset-0">
                <Image
                  src={district.image}
                  alt={district.name}
                  fill
                  className="object-cover dark:brightness-50 brightness-75 dark:contrast-150"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw "
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
              </div>
            </MagicCard>
          )
        ))}
      </MagicContainer>
    </div>
  );
}

