import React, { useRef, useState } from "react";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";

export const FeaturedProjects = () => {
  const pagElRef = useRef<HTMLDivElement>(null);
  const nextElRef = useRef<HTMLDivElement>(null);
  const prevElRef = useRef<HTMLDivElement>(null);
  //Please don't remove this
  const [_, setSwiperInstance] = useState<SwiperClass>();

  return (
    <div className="one-side-container bg-red-400 ">
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
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        }}
        slidesPerView={"auto"}
        spaceBetween={30}
      >
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
          <ProjectCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
