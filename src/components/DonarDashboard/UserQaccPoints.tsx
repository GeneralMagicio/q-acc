import Image from 'next/image';

export default function UserQaccPoints() {
  return (
    <div className='inline-flex items-center px-6 py-4 bg-white rounded-2xl border-2 border-r-4 border-b-4 border-black shadow-sm'>
      <span className='text-gray-500 text-xl mr-4'>Your q/acc points</span>
      <div className='flex items-center'>
        <Image
          src='/images/icons/points.svg'
          alt='points'
          width={24}
          height={24}
          className='w-6 h-6'
        />
        <span className='text-black text-3xl font-bold'>
          {(1200).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
