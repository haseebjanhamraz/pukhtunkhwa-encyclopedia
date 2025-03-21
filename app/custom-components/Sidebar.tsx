import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { divisions } from "../data/Divisions";
import { ListCollapse, CircleX } from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and collapse sidebar if screen size is small
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsMobile(true);
      }
    });
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`w-1/4 ${
        isCollapsed ? "w-12" : "w-1/4"
      } transition-all duration-300`}
    >
      <div className="w-full h-24 bg-gray-100 flex items-center justify-end p-2">
        <button onClick={toggleSidebar} className="text-gray-800">
          {isCollapsed ? (
            <ListCollapse className="cursor-pointer" />
          ) : (
            <CircleX className="cursor-pointer" />
          )}
        </button>
      </div>
      <div
        className={`w-full h-screen bg-gray-200 p-5 ${
          isCollapsed ? "p-2" : "p-5"
        }`}
      >
        <h1
          className={`text-2xl font-bold text-gray-800 ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          Divisions
        </h1>
        {!isCollapsed && (
          <>
          <Accordion type="single" collapsible>
            {divisions.map((division, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="cursor-pointer">
                  {division.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {division.districts.map((district, index) => (
                      <li key={index}>
                        <Link
                          className="cursor-pointer hover:underline"
                          href={`/districts/${district}`}
                        >
                          {district}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        <div>
          <h4 className="text-2xl font-bold">Map Markings</h4>
          <div className="flex items-center gap-2 py-2 mx-3 mt-3">
            <Image src="/city.png" height={30} width={30} alt="Map Markings" />
            <p className="text-lg font-medium">Districts</p>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
