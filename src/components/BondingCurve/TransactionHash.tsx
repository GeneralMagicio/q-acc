'use client';

import Image from 'next/image';
import { useState } from 'react';
import config from '@/config/configuration';

interface TransactionHashProps {
  value: string;
  truncate?: boolean;
  truncateLength?: number;
  className?: string;
}

export function TransactionHash({
  value,
  truncate = true,
  truncateLength = 6,
  className,
}: TransactionHashProps) {
  const [copied, setCopied] = useState(false);

  const displayValue = truncate
    ? `${value.substring(0, truncateLength)}...${value.substring(value.length - truncateLength)}`
    : value;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`flex items-center gap-2 font-mono ${className}`}>
      <a
        href={`${config.SCAN_URL}/tx/${value}`}
        target='_blank'
        rel='noopener noreferrer'
        className='hover:underline'
      >
        <span className='text-sm'>{displayValue}</span>
      </a>
      <button
        onClick={copyToClipboard}
        className='p-1 rounded-md hover:bg-gray-100 transition-colors'
        aria-label='Copy to clipboard'
      >
        {copied ? (
          <Image
            src='/images/icons/check-green.svg'
            alt='copy'
            width={24}
            height={24}
            className='h-4 w-4 text-green-500'
          />
        ) : (
          <Image
            src='/images/icons/copy.svg'
            alt='copy'
            width={24}
            height={24}
            className='h-4 w-4 text-gray-500'
          />
        )}
      </button>
    </div>
  );
}
