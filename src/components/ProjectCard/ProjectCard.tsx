import Image from "next/image";
import React from "react";

export const ProjectCard = () => {
  return (
    <div className="relative  w-96 rounded-xl bg-white overflow-hidden shadow-md shadow-gray-200 ">
      <div className="relative h-48">
        <Image
          src="/images/project-card/card-image.jpeg"
          alt="Project Card"
          layout="fill"
        />
      </div>
      <div className="relative p-6 text-start flex flex-col gap-4">
        <div className="absolute bg-white -top-12 left-0 w-16 h-16 p-3 rounded-tr-xl">
          <Image
            src="/images/project-card/logo.svg"
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div>
          <p className="text-pink-500">DEGEN</p>
          <h2 className="text-lg font-bold">Here is another awesome project</h2>
        </div>
        <p className="text-gray-500">
          The Commons Simulator is a gamified simulation tool powered by a
          cadCAD backend that was developed by the Commons Stack&apos;s
          Decentralized Dev community.
        </p>
        <div className="border-t-[1px]"></div>
      </div>
    </div>
  );
};
