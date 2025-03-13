import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import { Button } from '../Button';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { useDonateContext } from '@/context/donation.context';
import config from '@/config/configuration';
import { IconTransactionVerified } from '../Icons/IconTransactionVerified';
import { IconPendingSpinner } from '../Icons/IconPendingSpinner';
import { updateDonation } from '@/services/donation.services';
import { IconShare } from '../Icons/IconShare';

import { IconXSocial } from '../Icons/IconXSocial';
import { IconLinkedin } from '../Icons/IconLinkedin';
import { IconFacebook } from '../Icons/IconFacebook';

interface IDonateSuccessPage {
  transactionHash?: `0x${string}` | undefined; // Define the type for the transactionHash prop
  round?: string;
  donationId: number;
  status: string;
}
export enum DonationStatus {
  Verified = 'verified',
  Pending = 'pending',
  Failed = 'failed',
  Swap_pending = 'swap_pending',
}
const DonateSuccessPage: FC<IDonateSuccessPage> = ({
  transactionHash,
  round,
  donationId,
  status,
}) => {
  const { projectData } = useDonateContext();
  const [donationStatus, setDonationStatus] = useState<string>(
    DonationStatus.Pending,
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const toggleShareModal = (state: boolean) => setIsShareModalOpen(state);

  const shareMessage = `I just bought ${projectData?.abc?.tokenTicker} on q/acc! Join me in funding awesome projects`;
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const copyLink = `${url.protocol}//${url.host}/project/${projectData?.slug}`;

  useEffect(() => {
    // TODO: It should be changed!!! I think we need to make this better
    const checkDonationStatus = async () => {
      if (status === 'success') {
        setDonationStatus(DonationStatus.Pending);
        const res = await updateDonation(DonationStatus.Verified, donationId);
        // console.log(res.status);
        // setDonationStatus(DonationStatus.Verified);
        setDonationStatus(res.status);
      }
      if (status === 'error') {
        updateDonation(DonationStatus.Failed, donationId);
        setDonationStatus(DonationStatus.Failed);
      }
    };
    checkDonationStatus();
  }, [status, donationId]);

  return (
    <div className='flex flex-col gap-6 my-10 container '>
      {donationStatus === DonationStatus.Pending ? (
        <div className=' rounded-2xl border-2 border-[#D7DDEA] bg-[#fff] '>
          <div className='p-4 flex flex-col gap-2 font-redHatText  rounded-lg  '>
            <h1 className=' text-[#0A91FE] font-medium flex gap-1 items-center'>
              <IconPendingSpinner /> Processing Your Transaction…
            </h1>
            <span className='text-[#4F576A]'>
              Your transaction is in progress and should be confirmed shortly.
              This may take a minute—hang tight!
            </span>
          </div>
        </div>
      ) : donationStatus === DonationStatus.Swap_pending ? (
        <div className=' rounded-2xl border-2 border-[#52B7FF] bg-[#fff] '>
          <div className='p-4 flex flex-col gap-2 font-redHatText  rounded-lg'>
            <h1 className=' text-[#52B7FF] font-medium flex gap-1 items-center '>
              <IconTransactionVerified size={16} /> Transaction in Progress
            </h1>
            <div className='flex gap-2 items-center'>
              <span className='text-[#4F576A]'>
                Your transaction has been sent and is being processed.
                Processing times may vary depending on the network.
              </span>
              <div className='font-medium font-redHatText'>
                <h3 className='text-[#82899A] flex gap-2'>
                  <a href={`/dashboard?tab=contributions`} target='_blank'>
                    <div className='flex gap-1 items-center'>
                      <span className='text-pink-500 flex gap-2 items-center'>
                        {' '}
                        Check the status
                      </span>
                      <IconViewTransaction size={16} />
                    </div>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : donationStatus === DonationStatus.Verified ? (
        <div className=' rounded-2xl border-2 border-[#37B4A9] bg-[#fff] '>
          <div className='p-4 flex flex-col gap-2 font-redHatText  rounded-lg'>
            <h1 className=' text-[#37B4A9] font-medium flex gap-1 items-center '>
              <IconTransactionVerified size={16} /> All Set! 🎉
            </h1>
            <div className='flex gap-2 items-center'>
              <span className='text-[#4F576A]'>
                Your transaction is complete and confirmed. Thanks for being
                part of q/acc!
              </span>
              <div className='font-medium font-redHatText'>
                <h3 className='text-[#82899A] flex gap-2'>
                  <a
                    href={`${config.SCAN_URL}/tx/${transactionHash}`}
                    target='_blank'
                  >
                    <div className='flex gap-1 items-center'>
                      <span className='text-pink-500 flex gap-2 items-center'>
                        {' '}
                        View the transaction
                      </span>
                      <IconViewTransaction size={16} />
                    </div>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4 flex flex-col gap-2 font-redHatText  rounded-lg bg-[#FFF] shadow-tabShadow'>
          <span className='text-[#4F576A]'>Some error occured</span>
        </div>
      )}
      <div className='bg-[#F7F7F9] w-full     z-40  '>
        <div className=' w-full flex  flex-col gap-14'>
          <div className='flex  flex-col w-full lg:flex-row '>
            {/* About Project */}
            <div className='w-full lg:w-1/2 shadow-xl  lg:rounded-l-xl min-h-[450px] p-8 gap-8 flex flex-col'>
              <div
                className='w-full h-[288px] bg-cover bg-center rounded-3xl relative'
                style={{
                  backgroundImage: `url(${projectData?.image})`,
                }}
              ></div>

              <div className='flex flex-col gap-4'>
                <div>
                  <h1 className='text-[#121B4B] text-lg  font-bold'>
                    {projectData?.title}
                  </h1>
                  <h3 className='font-redHatText text-pink-500'>
                    {projectData?.adminUser.name}
                  </h3>
                </div>
                <div className='text-[#4F576A] font-redHatText'>
                  <p>{projectData?.teaser}</p>
                </div>
              </div>
            </div>

            {/* Your are Giver Now */}
            <div className='w-full bg-white lg:w-1/2 lg:rounded-r-xl  flex flex-col gap-8 p-10 shadow-xl min-h-[450px] '>
              <div
                className='w-full min-h-[288px] flex flex-col gap-8  '
                style={{
                  backgroundImage: "url('/images/successbg.png')",
                }}
              >
                <h1 className='text-3xl text-[#121B4B] font-bold text-center'>
                  Thank You
                </h1>
                <p className='bg-white '>
                  Tokens will be distributed at the end of the q/acc round. On
                  your q/acc profile page you may view your tokens, see the
                  unlock schedule and claim unlocked tokens once the unlock
                  stream has started. 
                </p>

                {/* Token Lock Schedule */}

                <div className='flex flex-col p-4 border-[1px] border-[#D7DDEA] rounded-lg  gap-2'>
                  <div className='flex gap-2 items-center'>
                    <h1 className='font-medium  text-[#1D1E1F]'>
                      Token Lock Schedule{' '}
                    </h1>
                    <div className='relative group'>
                      <IconTokenSchedule />
                      <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                        <h3 className='font-bold'>Token Lock Schedule</h3>
                        {round === 'EarlyAccessRound'
                          ? `Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year.`
                          : `Tokens are locked for 1 year with a 6 month cliff. This means that tokens are locked completely for 6 months, and then unlocked gradually in a 6 month stream.`}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h2 className='text-[#4F576A]'>
                    {round === 'EarlyAccessRound'
                      ? `Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year. `
                      : 'Tokens are locked for 1 year with a 6 month cliff. This means that tokens are locked completely for 6 months, and then unlocked gradually in a 6 month stream.'}
                  </h2>
                </div>

                <div className='flex p-4 justify-between border border-[#D7DDEA] bg-[#FFF] rounded-lg font-redHatText items-center text-[#1D1E1F] font-semibold leading-6'>
                  <div>
                    <span className=' '>q/acc points you've earned</span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span>1200</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      viewBox='0 0 32 32'
                      fill='none'
                    >
                      <circle cx='16' cy='16' r='15' fill='#101010' />
                      <path
                        d='M16.9559 17.6581L23.2158 23.8003L23.9654 23.0206L17.5223 16.6986H25V15.6272H17.9338L23.8437 9.82831L23.0646 9.07754L16.9559 15.0714V8H15.864V15.0715L9.87251 9.19262L9.10038 9.95024L14.8861 15.6272H1V16.6986H15.2976L9.10818 22.7717L9.88031 23.5293L15.864 17.6581V25H16.9559V17.6581Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Socials */}
              {/* <div className=' flex flex-col gap-2 text-center font-redHatText'>
              <h2 className='text-xl'>Share this with your friends</h2>
              <div className='flex gap-6  justify-center'>
                <IconXSocial size={25} />
                <IconLinkedin size={25} />
                <IconFacebook size={25} />
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className=' flex flex-col gap-8 bg-[#fff] p-6 rounded-2xl shadow-tabShadow font-redHatText'>
        <div className='flex gap-2 items-center'>
          <IconShare size={24} color='#1D1E1F' />
          <span className='text-[#1D1E1F] text-2xl font-bold'>
            Spread the Imapct!
          </span>
        </div>
        <div className=' flex flex-col p-6 justify-center gap-6 bg-[#F7F7F9] border border-[#BBC3D4] rounded-xl border-dashed text-center'>
          <div className='text-center text-[#1D1E1F] font-medium text-lg'>
            I just bought {projectData?.abc?.tokenTicker} on q/acc! Join me in
            funding awesome projects.
          </div>
          <div className=' flex justify-center gap-6 items-center'>
            <TwitterShareButton title={shareMessage || ''} url={copyLink || ''}>
              <div className='px-6 py-3 border border[#E7E1FF] bg-[#F6F3FF] rounded-xl flex items-center  '>
                <IconXSocial />
              </div>
            </TwitterShareButton>
            <LinkedinShareButton
              summary={shareMessage}
              title={shareMessage}
              url={copyLink || ''}
            >
              <div className='px-6 py-3 border border[#E7E1FF] bg-[#F6F3FF] rounded-xl flex items-center'>
                <IconLinkedin />
              </div>
            </LinkedinShareButton>
            <FacebookShareButton
              title={shareMessage || ''}
              url={copyLink || ''}
              hashtag={shareMessage}
            >
              <div className='px-6 py-3 border border[#E7E1FF] bg-[#F6F3FF] rounded-xl flex items-center'>
                <IconFacebook />
              </div>
            </FacebookShareButton>
          </div>
        </div>
      </div>

      <div className='flex  md:flex-row flex-col py-4 px-8 justify-between items-center gap-4'>
        <div className='flex flex-col gap-2'>
          <span className='text-[#1D1E1F] font- font-semibold font-redHatText'>
            Buy more tokens?
          </span>
          <span className='text-[#1D1E1F]'>
            There are still more projects on q/acc, let’s find a new token to
            buy!
          </span>
        </div>

        <Link href={'/projects'}>
          <Button className='bg-white text-[#E1458D] w-[220px] flex justify-center items-center shadow-tabShadow font-redHatText'>
            Explore Projects
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DonateSuccessPage;
