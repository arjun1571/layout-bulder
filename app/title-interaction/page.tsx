"use client";
import Link from "next/link";
import React, { useState } from "react";

const AlphabetTileInteraction: React.FC = () => {
  const [outputString, setOutputString] = useState("");

  const handleTileClick = (letter: string) => {
    setOutputString((prevString) => {
      const lastThreeChars = prevString.slice(-3);
      if (lastThreeChars === letter.repeat(3)) {
        return prevString.slice(0, -3) + "_";
      } else {
        return prevString + letter;
      }
    });
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="p-5">
      <div className="flex mx-auto w-full items-center justify-center">
        <Link
          href={"/recursive"}
          className="bg-black text-white px-12 py-4 rounded-lg text-lg font-bold"
        >
          Back to Recursive Pate
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-14">
        {alphabet.split("").map((letter, index) => (
          <div
            key={index}
            className="bg-blue-200 p-8 text-center cursor-pointer rounded-lg hover:bg-blue-300 text-black font-bold text-lg"
            onClick={() => handleTileClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div id="outputString" className="flex mx-auto w-full mt-10">
        <p className="flex mx-auto text-2xl">{outputString}</p>
      </div>
    </div>
  );
};

export default AlphabetTileInteraction;
