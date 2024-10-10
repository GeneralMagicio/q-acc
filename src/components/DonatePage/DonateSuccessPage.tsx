import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, ButtonColor } from '../Button';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { useDonateContext } from '@/context/donation.context';
import config from '@/config/configuration';
import { fetchDonationStatus } from '@/helpers/donation';
import { useFetchUser } from '@/hooks/useFetchUser';
import { IconTransactionVerified } from '../Icons/IconTransactionVerified';
import { IconPendingSpinner } from '../Icons/IconPendingSpinner';

interface IDonateSuccessPage {
  transactionHash?: `0x${string}` | undefined; // Define the type for the transactionHash prop
  round?: string;
}
export enum DonationStatus {
  Verified = 'verified',
  Pending = 'pending',
}
const DonateSuccessPage: FC<IDonateSuccessPage> = ({
  transactionHash,
  round,
}) => {
  const { projectData } = useDonateContext();
  const [donationStatus, setDonationStatus] = useState<string>(
    DonationStatus.Pending,
  );
  const { data: user } = useFetchUser();

  useEffect(() => {
    if (transactionHash) {
      const checkDonationStatus = async () => {
        const donation = await fetchDonationStatus(
          Number(user?.id),
          transactionHash,
        );
        if (donation?.status === 'verified') {
          setDonationStatus(DonationStatus.Verified);
          clearInterval(interval);
          // Stop the polling when verified
        } else {
          setDonationStatus(donation?.status || DonationStatus.Pending);
        }
        console.log('Current donation', donation);
      };

      const interval = setInterval(checkDonationStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [transactionHash]);

  return (
    <div className='bg-[#F7F7F9] w-full h-screen  py-10 absolute z-40 my-20'>
      <div className='container w-full flex  flex-col gap-14 '>
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
                <h3 className='font-redHatText text-[#E1458D]'>
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
                your q/acc profile page you may view your tokens, see the unlock
                schedule and claim unlocked tokens once the unlock stream has
                started. 
              </p>

              {donationStatus === DonationStatus.Pending ? (
                <div className='p-4 flex flex-col gap-2 font-redHatText  rounded-lg bg-[#FFF] shadow-tabShadow'>
                  <h1 className=' text-[#0A91FE] font-medium flex gap-1 items-center'>
                    Transaction being processed <IconPendingSpinner />
                  </h1>
                  <span className='text-[#4F576A]'>
                    We received your contribution, we just need a bit to process
                    it.
                  </span>
                </div>
              ) : (
                <div className='p-4 flex flex-col gap-2 font-redHatText  rounded-lg bg-[#FFF] shadow-tabShadow'>
                  <h1 className=' text-[#37B4A9] font-medium flex gap-1 items-center'>
                    It's done <IconTransactionVerified size={16} />
                  </h1>
                  <span className='text-[#4F576A]'>
                    Your transaction has been verified and completely processed.
                  </span>
                </div>
              )}
            </div>

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
                      : `Tokens are locked for 1 year with a 6 month cliff. This means that after 6 months, tokens will unlock in a stream over the following 6 months.`}
                  </div>
                </div>
              </div>
              <hr />
              <h2 className='text-[#4F576A]'>
                {round === 'EarlyAccessRound'
                  ? `Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year. `
                  : 'Tokens are locked for 1 year with a 6 month cliff. This means that after 6 months, tokens are locked for 6 months and unlocked in a 6 month stream.'}
              </h2>
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

        {/* Transaction Details */}

        <div className='flex flex-col items-center gap-4'>
          <div className='text-xl text-[#1D1E1F]  text-center'>
            <p>Your transactions have been submitted.</p>
            <p>You can view them on a blockchain explorer here:</p>
          </div>

          <div className='text-xl font-redHatText'>
            <h3 className='text-[#82899A] flex gap-2'>
              <a
                href={`${config.SCAN_URL}/tx/${transactionHash}`}
                target='_blank'
              >
                <span className='text-[#E1458D] text-xl flex gap-2'>
                  {' '}
                  View the transaction <IconViewTransaction size={25} />
                </span>
              </a>
            </h3>
          </div>

          <Link href={'/projects'}>
            <Button
              color={ButtonColor.Giv}
              className={`text-white justify-center w-[242px] text-sm`}
            >
              See More Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateSuccessPage;
