import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import { IconPointerLeft } from '../Icons/IconPointerLeft';
import { IconPointerRight } from '../Icons/IconPointerRight';
import Routes from '@/lib/constants/Routes';
import { IconChevronRight } from '../Icons/IconChevronRight';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import { ProjectHoverCard } from '../ProjectCard/ProjectHoverCard';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';

const projectCardStyle = 'w-80 md:w-96';
const swiperSlideStyle = '!w-auto px-2 py-6';
const navigationStyle =
  'cursor-pointer rounded-full px-3 py-2 h-10 w-12 mx-2 select-none shadow-[0_3px_20px_0_rgba(83,38,236,0.13)]';

export const FeaturedProjects = () => {
  const { data: allProjects, isLoading: isLoadingProjects } =
    useFetchAllProjects();
  const { data: activeRoundDetails, isLoading: isLoadingActiveRound } =
    useFetchActiveRoundDetails();

  const pagElRef = useRef<HTMLDivElement>(null);
  const nextElRef = useRef<HTMLDivElement>(null);
  const prevElRef = useRef<HTMLDivElement>(null);

  //Please don't remove this
  const [_, setSwiperInstance] = useState<SwiperClass>();

  const title = isLoadingActiveRound
    ? 'Welcome'
    : activeRoundDetails?.__typename === 'QfRound'
      ? 'Welcome to q/acc round'
      : 'Welcome to early access';

  console.log('activeRoundDetails', activeRoundDetails);

  return (
    <div className='bg-white py-10'>
      <div className='container flex flex-col md:flex-row justify-between items-center mb-10'>
        <h3 className='text-3xl text-gray-400 font-bold'>{title}</h3>
        <div className='flex gap-2 items-center justify-center'>
          <div ref={prevElRef} className={navigationStyle}>
            <IconPointerLeft size={24} />
          </div>
          <div
            ref={pagElRef}
            className='flex gap-6 items-center text-xl text-gray-400 justify-center pt-1'
          ></div>
          <div ref={nextElRef} className={navigationStyle}>
            <IconPointerRight size={24} />
          </div>
        </div>
      </div>
      <div className='one-side-container flex flex-col md:flex-row overflow-hidden !pl-0 pb-10'>
        <div className='shadow-xl rounded-r-xl py-10 px-6 flex flex-col justify-center items-center gap-12'>
          <h2 className='text-6xl font-bold'>This Season&apos;s Projects</h2>
          <Link href={Routes.Projects}>
            <div className='flex gap-1 text-giv-500 items-center hover:border-b-2 border-giv-500 px-0'>
              <p className='font-bold'>Explore </p>
              <IconChevronRight size={32} />
            </div>
          </Link>
        </div>
        <div className=' overflow-x-auto'>
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
              type: 'bullets',
              renderBullet: function (index, className) {
                return (
                  '<span class="' + className + '">' + (index + 1) + '</span>'
                );
              },
            }}
            slidesPerView={'auto'}
            spaceBetween={4}
          >
            {isLoadingProjects ? (
              <h1>Loading Projects...</h1>
            ) : (
              allProjects?.projects.map(project => (
                <SwiperSlide key={project.id} className={swiperSlideStyle}>
                  {/* <Link href={`/project/${project.slug}`}> */}
                  <ProjectHoverCard
                    className={projectCardStyle}
                    project={project}
                  />
                  {/* </Link> */}
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
