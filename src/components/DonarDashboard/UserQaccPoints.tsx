import Image from 'next/image';

export default function UserQaccPoints() {
  return (
    <div className='inline-flex items-center px-4 py-1 bg-white rounded-xl border-[1px] border-r-4 border-b-4 border-black shadow-sm'>
      <span className='text-gray-500 mr-4'>Your q/acc points</span>
      <div className='flex items-center'>
        <Image
          src='/images/icons/points.svg'
          alt='points'
          width={24}
          height={24}
          className='w-6 h-6'
        />
        <span className='text-black text-2xl font-bold'>
          {(1200).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
