import React from 'react';

// const boldClass: HTMLAttributes<HTMLDivElement>['className'] = 'font-';

const Rules = () => {
  return (
    <div className='bg-white py-12'>
      <div className='container'>
        <h1 className='text-2xl text-black font-bold'>What you need to know</h1>
        <ol className='list-decimal text-lg text-gray-600 px-4'>
          <li>
            The q/acc round lasts{' '}
            <b className='font-extrabold'>only two weeks</b>.
          </li>
          <li>
            At the end of the round, you will receive tokens from the projects
            you supported. These tokens have a
            <b className='font-extrabold'>
              {' '}
              1 year unlock schedule with a 6-month cliff
            </b>
            .
          </li>
          <li>
            The q/acc protocol prohibits citizens of the United States and
            <b className='font-extrabold'>
              {' '}
              United Kingdom from participating due to regulatory reasons.
            </b>
          </li>
          <li>
            The q/acc protocol prohibits citizens from{' '}
            <b className='font-extrabold'>
              Afghanistan, American Samoa, Anguilla, Antigua and Barbuda,
              Belarus, Bosnia Herzegovina, Central African Republic, Cuba, DR
              Congo, Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo,
              Lebanon, Libya, Mali, Montenegro, Myanmar, Nicaragua, North Korea,
              North Macedonia, Palau, Panama, Russia, Samoa, Serbia, Somalia,
              South Sudan, Sudan, Syria, Ukraine, US Virgin Islands, Vanuatu,
              Venezuela, Yemen
            </b>{' '}
            from participating due to AML compliance.
          </li>
          <li>
            The q/acc protocol uses{' '}
            <b className='font-extrabold'>Privado zkID and Gitcoin Passport</b>.
          </li>
          <li>
            There is a low cap and a high cap. The low cap is approximately{' '}
            <b className='font-extrabold'>1K USD denominated in POL</b> and
            requires <b className='font-extrabold'>Gitcoin Passport</b>. Above
            that amount, <b className='font-extrabold'>zkID is required up</b>{' '}
            until the high cap, which is{' '}
            <b className='font-extrabold'>
              approximately 15K USD denominated in POL
            </b>
            . Caps are per-person and per-project.
          </li>
          <li>
            To check and improve your{' '}
            <b className='font-extrabold'>Gitcoin Passport score</b>, go to
            passport.xyz.
          </li>
          <li>
            To get credentials with{' '}
            <b className='font-extrabold'>Privado zkID</b>, read the Privado
            zkID how-to guide.
          </li>
          <li>
            There is also a how-to guide on getting your Polygon zkEVM wallet
            ready.
          </li>
        </ol>

        {/* <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-6 '>
            <h1 className=' text-[25px] font-bold tracking-[-0.125px]'>
              What you need to know
            </h1>
            <ul className='list-disc text-[24px] font-redHatText px-4'>
              <li className='text-[#4F576A]'>
                <strong className='font-bold text-[#4F576A]'>
                  Get verified.
                </strong>{' '}
                <span className='text-[#4F576A] leading-9'>
                  Get your KYC credentials using Privado ID. Zero-knowledge ID
                  (zkID) is used by the q/acc protocol to comply with AML, and
                  to restrict the US and UK for regulatory reasons. It also
                  mitigates Sybil attacks during the q/acc rounds and protects
                  the projects and their supporters. Refer to the{' '}
                  <span className='text-pink-500 font-bold'>
                    <a href={links.PRIVADO_GUIDE_LINK} target='_blank'>
                      Complete zkID guide{' '}
                    </a>
                  </span>
                  and contact{' '}
                  <span className='text-pink-500 font-bold'>
                    <a href={links.TELEGRAM_SUPPORT} target='_blank'>
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
                Make sure you have everything set up on Polygon zkEVM. You csan
                only support projects with $POL, and you will also need a little
                $ETH for gas on Polygon zkEVM. For assistance, read this{' '}
                <span className='text-pink-500 font-bold'>
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
            <OnBoardButton />
          </div>

          <div className='flex  text-center '>
            <p className='text-[32px] font-bold text-[#4F576A] tracking-[-0.32px]'>
              Got stuck somewhere in the zkID process? If you’re having trouble
              or received an error, don’t hesitate to contact{' '}
              <span className='text-pink-500 font-bold'>
                <a href={links.TELEGRAM_SUPPORT} target='_blank'>
                  q/acc Support Telegram channel
                </a>
              </span>{' '}
              or email{' '}
              <span className='text-pink-500 font-bold'>
                <a href='mailto:qacc@giveth.io'>qacc@giveth.io.</a>
              </span>{' '}
              We’ll help you get back on track right away.
            </p>
            <p></p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Rules;
