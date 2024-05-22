"use client";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Link from "next/link";

type Partition = {
  id: string;
  color: string;
  children?: Partition[];
  direction?: "vertical" | "horizontal";
};

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const initialPartition: Partition = {
  id: nanoid(),
  color: randomColor(),
};

const Recursive: React.FC = () => {
  const [partitions, setPartitions] = useState<Partition[]>([initialPartition]);
  const [challengeStarted, setChallengeStarted] = useState(false);

  const splitPartition = (id: string, direction: "vertical" | "horizontal") => {
    const splitHelper = (partitions: Partition[]): Partition[] => {
      return partitions.map((partition) => {
        if (partition.id === id) {
          if (partition.children) {
            return {
              ...partition,
              children: splitHelper(partition.children),
            };
          } else {
            return {
              ...partition,
              direction,
              children: [
                { id: nanoid(), color: partition.color },
                { id: nanoid(), color: randomColor() },
              ],
            };
          }
        } else if (partition.children) {
          return {
            ...partition,
            children: splitHelper(partition.children),
          };
        }
        return partition;
      });
    };
    setPartitions((prevPartitions) => splitHelper(prevPartitions));
  };

  const removePartition = (id: string) => {
    const removeHelper = (partitions: Partition[]): Partition[] => {
      return partitions.reduce<Partition[]>((acc, partition) => {
        if (partition.id === id) return acc;
        if (partition.children) {
          partition.children = removeHelper(partition.children);
        }
        acc.push(partition);
        return acc;
      }, []);
    };
    setPartitions((prevPartitions) => removeHelper(prevPartitions));
  };

  const renderPartitions = (partitions: Partition[]): JSX.Element[] => {
    return partitions.map((partition) => (
      <div
        key={partition.id}
        style={{
          flex: 1,
          backgroundColor: partition.color,
          display: "flex",
          flexDirection: partition.direction === "vertical" ? "row" : "column",
          position: "relative",
        }}
      >
        {!partition.children && (
          <div
            style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
            className="gap-5 flex  mx-auto justify-center items-center w-full h-full"
          >
            <button
              className="bg-green-600 px-10 text-white py-3 rounded-lg"
              onClick={() => splitPartition(partition.id, "vertical")}
            >
              V
            </button>
            <button
              className="bg-green-600 px-10 text-white py-3 rounded-lg "
              onClick={() => splitPartition(partition.id, "horizontal")}
            >
              H
            </button>
            <button
              className="bg-red-500 px-10 text-white py-3 rounded-lg"
              onClick={() => removePartition(partition.id)}
            >
              -
            </button>
          </div>
        )}
        {partition.children ? renderPartitions(partition.children) : null}
      </div>
    ));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="bg-cyan-300"
    >
      {!challengeStarted ? (
        <div className="flex mx-auto justify-center h-screen items-center gap-5 ">
          <button
            onClick={() => setChallengeStarted(true)}
            className="bg-black  text-white  py-4 w-52 rounded-lg text-lg font-bold"
          >
            Start Challenge
          </button>
          <button className="bg-black  text-white  py-4 w-52 rounded-lg text-lg font-bold">
            <Link href={"/title-interaction"}>Title page</Link>
          </button>
        </div>
      ) : (
        renderPartitions(partitions)
      )}
    </div>
  );
};

export default Recursive;
