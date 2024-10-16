import React from 'react';
import Image from 'next/image';
import { Banner } from '@/components/Banner';
import About from '@/components/About';
import Collaborator from '@/components/Collaborator';
import { KycLandingButton } from '@/components/KycLandingButton';

const KycLanding = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='bg-white relative overflow-hidden pt-20'>
        <Image
          src='/images/bg/round1.png'
          alt='round'
          width={500}
          height={500}
          style={{ position: 'absolute', top: '0', right: '0', opacity: 0.2 }}
        />
        <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
          <div>
            <h1 className='text-5xl text-gray-900 font-bold mb-6'>
              Get ready for Season 1
            </h1>
            <p>
              We use Privado ID zero knowledge identity system to maintain the
              integrity of quadratic acceleration while ensuring privacy. All
              participants are required to complete verification in order to
              receive a KYC credential from the Synaps identity provider.
            </p>
            <br />
            <p>
              This quick and simple process protects against Sybil attacks and
              ensures that prohibited regions are excluded.
            </p>
          </div>

          <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
            <h1 className='text-gray-800 text-2xl font-bold'>
              Add KYC credentials to your account
            </h1>
            <p>
              If you don’t have an account, you will be prompted to create one.
            </p>
            <ol className='list-decimal pl-6'>
              <li className='mb-8'>
                Click the <strong>“Get started”</strong> button 
                <p>
                  A new tab will open where you can complete the verification
                  steps.
                </p>
              </li>
              <li className='mb-8'>
                Verification may take up to 24 hours but is often done much
                faster
                <p>
                  Once your credentials are successfully validated, the status
                  will be displayed on your profile page.
                </p>
              </li>
            </ol>
          </div>
          <div>
            <KycLandingButton />
          </div>
        </div>
      </div>
      <About />
      <Collaborator />
    </div>
  );
};

export default KycLanding;
