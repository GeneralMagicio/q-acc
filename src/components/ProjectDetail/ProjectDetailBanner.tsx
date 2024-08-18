import React from "react";
import Image from "next/image";
const ProjectDetailBanner = () => {
  return (
    <div
      className="w-full h-[450px] lg:w-2/3  bg-cover bg-center rounded-3xl relative"
      style={{
        backgroundImage: "url('/images/project-card/card-image.jpeg')",
      }}
    >
      <div className=" flex flex-col absolute  bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2">
        <div className="border rounded-md bg-white p-1 block w-fit">
          <Image
            height={64}
            width={65}
            src={"/images/Vector.png"}
            alt="abc vector"
          />
        </div>
        <div className="flex flex-col text-white gap-2">
          <h1 className="font-normal font-redHatText">ABC</h1>
          <h1 className="text-4xl md:text-[41px]  font-bold leading-10">
            The amazing Pancake project
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailBanner;
