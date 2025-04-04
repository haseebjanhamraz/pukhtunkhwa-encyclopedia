"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text"
import LinearGradient from "@/components/magicui/linear-gradient"
import RetroGrid from "@/components/magicui/retro-grid"
import TextReveal from "@/components/magicui/text-reveal"

import AnimatedListDemo from "./animatedlist-demo/page"
import Poetry from "./custom-components/Poetry"
import GameCard from "./game-card/page"
import GlobePage from "./globe-section/page"

export default function IndexPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 mx-auto justify-center mt-20">
        <div className="flex max-w-[980px] flex-col items-center gap-6 retro-theme relative">
          <div
            className={cn(
              "group rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 z-10"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black text-neutral-600 z-10">
              <span>🕹️ Pukhtunkhwa.com is an encyclopedia of the region</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel font-bold leading-tight tracking-wider text-accent-foreground text-center z-10">
            We feel the blossom of our soil{" "}
            <p className="underline decoration-gray-400 decoration-4 underline-offset-2 mt-0 lg:mt-3 md:mt-0 sm:mt-0 z-10 font-destar">
              پښتونخوا
            </p>
          </h1>
          <p className="max-w-[700px] text-lg sm:text-xl text-accent-foreground text-center z-10">
            Step into a world of Pukhtunkhwa, where simplicity and nostalgia
            blend to create a timeless experience.
          </p>
        </div>
        <RetroGrid className="z-0 absolute inset-0 max-w-[1000]" />
        <div className="flex gap-4 justify-center">
          <Link
            href={siteConfig.links.docs}
            rel="noreferrer"
            className={buttonVariants()}
          >
            Visit Pukhtunkhwa
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            Guide
          </Link>
        </div>
      </section>

      {/* Globe and Animated List Section */}
      <div className="pt-20 flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
        <GlobePage />
        <AnimatedListDemo />
      </div>

      {/* Text Reveal Section */}
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-black overflow-hidden h-auto">
        <TextReveal text="Pukhtunkhwa – Where history echoes, culture thrives, and the spirit of the Pashtun nation lives on." />
        <TextReveal text="Pukhtunkhwa, historically known as Khyber Pakhtunkhwa, is the cultural heartland of the Pashtun nation, rich in history, traditions, and resilience. Nestled in the northwest of Pakistan, it is a land of breathtaking landscapes, from the rugged mountains of Swat and Chitral to the fertile plains of Peshawar. Pukhtunkhwa.com is dedicated to preserving and promoting the region's heritage by documenting its history, music, art, and traditions. Through interactive maps and curated content, we aim to highlight the beauty, struggles, and contributions of the Pashtun people, ensuring that their legacy continues to thrive for future generations." />
      </div>

      {/* Game Card Section */}
      <div className="pt-20 flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
        <GameCard />
      </div>

      {/* Poetry Section */}
      <Poetry />
    </>
  )
}
