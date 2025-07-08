// import { usePrivado } from '@/hooks/usePrivado';
// import { IconExternalLink } from '../Icons/IconExternalLink';
// import { useFetchUser } from '@/hooks/useFetchUser';

export const VerificationBanner = () => {
  // const { isVerified, isLoading } = usePrivado();
  // const { data: user } = useFetchUser();
  // const isUserProfileCreated = user?.fullName != null && user?.email != null;
  // const showVerificationBanner =
  //   !isVerified &&
  //   !isLoading &&
  //   isUserProfileCreated &&
  //   !(
  //     user?.hasEnoughGitcoinPassportScore ||
  //     user?.hasEnoughGitcoinAnalysisScore ||
  //     user?.skipVerification
  //   );

  // console.log(
  //   'score',
  //   user?.hasEnoughGitcoinPassportScore,
  //   user?.hasEnoughGitcoinAnalysisScore,
  // );

  // return (
  //   showVerificationBanner && (
  //     <div
  //       className='w-full h-14 bg-[#FFEAB5] px-8 py-4 flex flex-row justify-center gap-2 items-center relative'
  //       hidden={!showVerificationBanner}
  //     >
  //       <div className='flex justify-end gap-2'>
  //         {/* <Image
  //           src='/images/icons/info.svg'
  //           alt='info'
  //           height={24}
  //           width={24}
  //         /> */}
  //         {/* <p className='text-gray-900 font-normal font-redHatText'>
  //           You’re not eligible to support a project
  //         </p> */}
  //       </div>
  //       <div
  //         className='flex flex-row gap-2  justify-start cursor-pointer center items-center'
  //         onClick={() => window.open('/create/get-verified')}
  //       >
  //         <p className='text-giv-500'>Get Verified</p>
  //         <IconExternalLink size={12} color={'#5326ec'} />
  //       </div>
  //     </div>
  //   )
  // );
  return null; // remove verification banner
};
