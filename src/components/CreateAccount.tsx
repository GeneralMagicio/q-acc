import Link from 'next/link';
import React from 'react';
import { usePrivado } from '@/hooks/usePrivado';

const CreateAccount = () => {
  const { isVerified } = usePrivado();
  return (
    <div className='bg-white'>
      <div className='container p-6'>
        '
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-6 '>
            <h1 className=' text-[25px] font-bold tracking-[-0.125px]'>
              What should I do right now?
            </h1>
            <ul className='list-disc text-[24px] font-redHatText px-4'>
              <li className='text-[#4F576A]'>
                <strong className='font-bold text-[#4F576A]'>
                  Create and verify your q/acc account.
                </strong>{' '}
                <span className='text-[#4F576A] leading-9'>
                  Get your KYC credentials using Privado ID. Zero-knowledge ID
                  (zkID) is used by the q/acc protocol to comply with AML, and
                  to restrict the US and UK for regulatory reasons. It also
                  mitigates Sybil attacks during the q/acc rounds and protects
                  the projects and their supporters. Refer to the{' '}
                  <span className='text-[#E1458D] font-bold'>
                    <a
                      href='https://giveth.notion.site/Complete-zkID-via-Privado-ID-1223ab28d48c80458699d18cb0f54494'
                      target='_blank'
                    >
                      Complete zkID guide{' '}
                    </a>
                  </span>
                  and contact{' '}
                  <span className='text-[#E1458D] font-bold'>
                    <a href='https://t.me/qaccsupport' target='_blank'>
                      q/acc Support Telegram channel
                    </a>
                  </span>{' '}
                  if you run into any issues during this process. There is a
                  team waiting to help you!
                </span>
              </li>
              <li className='text-[#4F576A] mt-6'>
                <strong className='font-bold text-[#4F576A]'>
                  Get ready on Polygon zkEVM. 
                </strong>{' '}
                Make sure you have everything set up on Polygon zkEVM. You can
                only support projects with $POL, and you will also need a little
                $ETH for gas on Polygon zkEVM. For assistance, read this{' '}
                <span className='text-[#E1458D] font-bold'>
                  <a
                    href='https://giveth.notion.site/Get-ETH-and-POL-on-Polygon-zkEVM-1223ab28d48c8003b76fd98c3ed2a194'
                    target='_blank'
                  >
                    guide on bridging tokens to Polygon zkEVM.
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className='flex justify-center p-6'>
            {isVerified ? (
              <Link href={'/projects'}>
                <div className='px-10 py-6 flex justify-center items-center text-[white] font-bold bg-[#E1458D] rounded-full shadow-tabShadow'>
                  View Projects
                </div>
              </Link>
            ) : (
              <Link href={'/create/profile'}>
                <div className='px-10 py-6 flex justify-center items-center text-[white] font-bold bg-[#E1458D] rounded-full shadow-tabShadow'>
                  Get Verified
                </div>
              </Link>
            )}
          </div>

          <div className='flex  text-center '>
            <p className='text-[32px] font-bold text-[#4F576A] tracking-[-0.32px]'>
              Got stuck somewhere in the zkID process? If you’re having trouble
              or received an error, don’t hesitate to contact{' '}
              <span className='text-[#E1458D] font-bold'>
                <a href='https://t.me/qaccsupport' target='_blank'>
                  q/acc Support Telegram channel
                </a>
              </span>{' '}
              or email{' '}
              <span className='text-[#E1458D] font-bold'>
                <a href='mailto:qacc@giveth.io'>qacc@giveth.io.</a>
              </span>{' '}
              We’ll help you get back on track right away.
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
