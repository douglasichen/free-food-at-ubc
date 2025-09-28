import { useEffect } from 'react';

import React from "react";
import { EventsList, Event } from "./components/EventsList";
import { Button } from "./components/ui/button";
import eventsData from "../data.json";
import { FaDiscord } from "react-icons/fa";

const sampleEvents: Event[] = eventsData as Event[];

// debug
// function logViewportUnitsQuick() {
//   const vwInPixels = window.innerWidth;
//   const vhInPixels = window.innerHeight;
  
//   console.log(`1vw ≈ ${vwInPixels}px (approximate)`);
//   console.log(`1vh ≈ ${vhInPixels}px (approximate)`);
  
//   return { vw: vwInPixels, vh: vhInPixels };
// }

export default function App() {

// debug 
  // useEffect(() => {
  //   // Log viewport units when component mounts
  //   logViewportUnitsQuick();
    
  //   // Optionally, listen for resize events
  //   const handleResize = () => {
  //     console.log('Viewport resized:');
  //     logViewportUnitsQuick();
  //   };
    
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
        {/* Fixed Discord Join Button */}
        <a
          className="cursor-pointer fixed text-white shadow-lg px-6  py-2 rounded-full font-medium flex items-center gap-2"
          href="https://discord.gg/HMeTnejcdD"
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: 'fixed', zIndex: 20, right: "calc(50vw - min(310px, 45vw))", top: "1.4%", backgroundColor: "#5865F2", color: "white", padding: "5px 10px"}}
        >
          <FaDiscord /><b>Get Notified!</b>
        </a>

      <div className="max-w-2xl mx-auto relative">
        <div className="mb-2">
          <h1 className="text-gray-900 mb-2">Free Food <span className="text-blue-600">@ UBC</span> </h1>
        </div>
        <EventsList events={sampleEvents} />
        <div style={{ height: "30rem" }} />
      </div>
    </div>
  );
}
