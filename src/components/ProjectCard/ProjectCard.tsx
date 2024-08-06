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
      <div className="relative p-6">
        <div className="absolute bg-white -top-12 left-0 w-16 h-16 p-3 rounded-tr-xl">
          <Image
            src="/images/project-card/logo.svg"
            alt=""
            width={40}
            height={40}
          />
        </div>

        <h2 className="text-lg font-semibold">Project Title</h2>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt, nisl nec ultricies.
        </p>
      </div>
    </div>
  );
};
