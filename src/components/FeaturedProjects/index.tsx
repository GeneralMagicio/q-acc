import React, { useRef, useState } from "react";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { IconPointerLeft } from "../Icons/IconPointerLeft";
import { IconPointerRight } from "../Icons/IconPointerRight";

const swiperSlideStyle = "!w-auto px-2 py-2";
const navigationStyle =
  "cursor-pointer rounded-full shadow-lg px-3 py-2 h-10 w-12 mx-2 select-none";

export const FeaturedProjects = () => {
  const pagElRef = useRef<HTMLDivElement>(null);
  const nextElRef = useRef<HTMLDivElement>(null);
  const prevElRef = useRef<HTMLDivElement>(null);
  //Please don't remove this
  const [_, setSwiperInstance] = useState<SwiperClass>();

  return (
    <div className="bg-white mt-4 py-10">
      <div className="container flex justify-between items-center mb-10">
        <h3 className="text-3xl text-gray-400 font-bold">
          #QuadraticAccelerator
        </h3>
        <div className="flex gap-2 items-center">
          <div ref={prevElRef} className={navigationStyle}>
            <IconPointerLeft size={24} />
          </div>
          <div
            ref={pagElRef}
            className="flex gap-2 items-center text-xl text-gray-400"
          ></div>
          <div ref={nextElRef} className={navigationStyle}>
            <IconPointerRight size={24} />
          </div>
        </div>
      </div>
      <div className="one-side-container flex overflow-hidden !pl-0 pb-10">
        <div className="shadow-xl rounded-r-xl px-6 flex items-center">
          <h2 className="text-6xl font-bold">This Season&apos;s Projects</h2>
        </div>
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: nextElRef.current,
            prevEl: prevElRef.current,
          }}
          pagination={{
            el: pagElRef.current,
            clickable: true,
            type: "bullets",
            renderBullet: function (index, className) {
              return (
                '<span class="' + className + '">' + (index + 1) + "</span>"
              );
            },
          }}
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ProjectCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
