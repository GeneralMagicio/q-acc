'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface ProjectCardImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc: string;
}

const ProjectCardImage: React.FC<ProjectCardImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc,
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc || fallbackSrc}
      alt={alt}
      fill={true}
      objectFit='cover'
      width={width}
      height={height}
      className={`rounded-xl ${className}`}
      onError={handleError}
    />
  );
};

export default ProjectCardImage;
