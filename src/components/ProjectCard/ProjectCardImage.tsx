'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface ProjectCardImageProps {
  src?: string;
  alt: string;
  layout: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc: string;
}

const ProjectCardImage: React.FC<ProjectCardImageProps> = ({
  src,
  alt,
  layout,
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
      layout={layout}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
};

export default ProjectCardImage;
