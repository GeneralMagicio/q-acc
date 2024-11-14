import Image from 'next/image';
import React from 'react';

export const QaccProjects = () => {
  return (
    <div className='bg-white relative'>
      <div className=' absolute right-0 top-10'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='116'
          height='44'
          viewBox='0 0 116 44'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M207.869 21.9665L207.524 23.2188C206.804 26.0501 205.364 28.6463 203.344 30.7544C201.325 32.8626 198.795 34.4108 196.001 35.2483C193.207 36.0858 190.244 36.184 187.401 35.5334C184.557 34.8828 181.931 33.5055 179.777 31.5357C177.33 29.3055 175.566 26.4253 174.689 23.23L174.369 22.0299H174.39L173.965 19.9836C173.169 16.0725 171.452 12.4085 168.957 9.2968C168.668 8.93474 168.343 8.56621 168.048 8.22824L167.674 7.79715L167.632 7.74815L166.716 6.82894L166.476 6.63794C166.264 6.46373 166.034 6.26859 165.789 6.06387C165.2 5.56614 164.534 5.00266 163.866 4.53865C159.345 1.34983 153.89 -0.237221 148.367 0.0287192C142.844 0.294659 137.567 2.39839 133.371 6.00694C129.308 9.47001 126.476 14.1603 125.301 19.3735C125.268 19.5163 125.234 19.6769 125.206 19.8086C125.195 19.8648 125.185 19.9129 125.177 19.9514L124.736 22.001H124.816L124.481 23.2147C123.761 26.0462 122.321 28.6426 120.302 30.7509C118.282 32.8592 115.752 34.4075 112.958 35.245C110.164 36.0825 107.201 36.1807 104.358 35.5299C101.514 34.8792 98.8878 33.5017 96.7338 31.5317C94.2889 29.3021 92.5253 26.4235 91.648 23.23L91.3146 21.9913H91.2049L90.7882 19.9844C89.9917 16.0735 88.2748 12.4097 85.7801 9.29758C85.4909 8.93552 85.1663 8.567 84.8714 8.22902L84.4972 7.79793L84.4556 7.74893L83.5397 6.82982L83.2993 6.63872C83.087 6.46452 82.857 6.26947 82.6134 6.06476C82.0236 5.56702 81.3578 5.00344 80.6903 4.53943C76.1684 1.35069 70.7143 -0.236337 65.1909 0.0296011C59.6676 0.295539 54.3905 2.39923 50.1946 6.00772C46.1315 9.47079 43.2996 14.1611 42.124 19.3742C42.0912 19.5171 42.0575 19.6777 42.0294 19.8093C42.0182 19.8655 42.0086 19.9137 41.9998 19.9522L41.5679 21.964H41.5238L41.1777 23.2164C40.4577 26.0479 39.0179 28.6443 36.9986 30.7526C34.9793 32.8609 32.4494 34.4092 29.6553 35.2467C26.8612 36.0843 23.8981 36.1824 21.0549 35.5316C18.2117 34.8808 15.5852 33.5034 13.4313 31.5333C10.9864 29.3032 9.22312 26.424 8.34624 23.23L8.01294 21.9913L6.73084 21.9745C6.26769 21.9705 5.80055 21.9705 5.34701 21.9705H4.88386L0 21.964L0.425492 24.0135C1.22225 27.9243 2.93918 31.5881 5.43358 34.7003C5.72285 35.0583 6.04815 35.4309 6.34222 35.7689C6.47604 35.9214 6.60266 36.0643 6.71724 36.1967L6.75891 36.249L7.6748 37.1641L7.91517 37.3551V37.3592C8.12752 37.5294 8.35829 37.7245 8.60188 37.93C9.19163 38.4309 9.85753 38.9913 10.525 39.4609C15.0472 42.6492 20.5014 44.2354 26.0246 43.9688C31.5479 43.7021 36.8246 41.5977 41.0198 37.9886C45.0835 34.5248 47.9153 29.8332 49.0897 24.6188C49.1233 24.476 49.157 24.3162 49.1842 24.1837L49.2147 24.0409L49.6466 22.0339H49.6906L50.036 20.7847C50.7561 17.9532 52.196 15.3569 54.2154 13.2486C56.2348 11.1404 58.7648 9.592 61.5589 8.75448C64.3531 7.91697 67.3161 7.81886 70.1594 8.4696C73.0027 9.12035 75.6292 10.4978 77.7832 12.4678C80.2279 14.6967 81.9917 17.5744 82.8698 20.7671L83.2032 22.0058H83.3129L83.7304 24.0127C84.5272 27.9233 86.2438 31.587 88.7377 34.6995C89.0269 35.0576 89.3515 35.4301 89.6464 35.7681C89.7794 35.9206 89.9068 36.0635 90.0206 36.1959L90.063 36.2481L90.9781 37.1633L91.2185 37.3544V37.3584C91.4308 37.5286 91.6608 37.7237 91.9052 37.9292C92.495 38.4302 93.1609 38.9905 93.8283 39.4601C98.3505 42.6483 103.805 44.2345 109.328 43.9678C114.851 43.7011 120.128 41.5968 124.323 37.9878C128.387 34.5243 131.219 29.8326 132.394 24.6181C132.427 24.4752 132.461 24.3154 132.488 24.183C132.5 24.1308 132.509 24.0818 132.519 24.0401L132.959 21.9906H132.879L133.214 20.7799C133.934 17.9484 135.374 15.3521 137.393 13.2438C139.412 11.1356 141.942 9.5872 144.736 8.74968C147.531 7.91216 150.494 7.81396 153.337 8.46471C156.18 9.11545 158.807 10.493 160.961 12.463C163.406 14.6913 165.17 17.5693 166.047 20.7623L166.368 21.9665H166.345L166.771 24.016C167.568 27.9266 169.285 31.5903 171.779 34.7028C172.068 35.0608 172.394 35.4332 172.688 35.7712C172.821 35.9237 172.947 36.0667 173.062 36.1992L173.104 36.2513L174.019 37.1665L174.26 37.3576V37.3616C174.472 37.5318 174.703 37.7268 174.946 37.9323C175.536 38.4333 176.202 38.9936 176.87 39.4633C181.392 42.6515 186.846 44.2378 192.37 43.9711C197.893 43.7045 203.17 41.6 207.365 37.991C211.429 34.527 214.261 29.8356 215.436 24.6213C215.469 24.4784 215.502 24.3187 215.53 24.1862L215.56 24.0432L216 21.9937L207.869 21.9665ZM2.50722 25.3663C2.4952 25.3229 2.48481 25.2796 2.47279 25.2362C2.50164 25.3414 2.53126 25.4473 2.56171 25.5517C2.54007 25.4899 2.52084 25.4281 2.50321 25.3663H2.50722ZM7.58906 34.612C7.30861 34.2909 7.02813 33.9698 6.7597 33.6382C7.02733 33.9682 7.30861 34.2917 7.58906 34.612ZM10.6219 37.4049C10.3359 37.1737 10.0538 36.9353 9.77257 36.6969C10.0546 36.9377 10.3335 37.1737 10.6219 37.4049C10.9104 37.6361 11.1997 37.861 11.5033 38.0713C11.1956 37.861 10.9048 37.6361 10.6179 37.4049H10.6219ZM89.1319 20.3343C89.1255 20.303 89.1175 20.2717 89.1111 20.2412C89.1111 20.2717 89.1215 20.303 89.1279 20.3343H89.1319ZM88.7161 18.6324C88.7321 18.6894 88.7457 18.7473 88.7609 18.8043C88.7217 18.6614 88.6808 18.5193 88.6407 18.378C88.6616 18.4631 88.688 18.5473 88.7104 18.6324H88.7161ZM83.6334 9.3899C83.9147 9.71101 84.1943 10.0321 84.4628 10.3637C84.1959 10.0297 83.9147 9.70941 83.6334 9.3899ZM85.809 25.3655C85.797 25.3229 85.7865 25.2796 85.7745 25.237C85.8033 25.3406 85.8322 25.4441 85.8626 25.5469C85.841 25.4867 85.8258 25.4265 85.805 25.3663L85.809 25.3655ZM149.602 1.6983C147.273 1.69474 144.957 2.0434 142.732 2.73236C146.114 1.68537 149.69 1.42915 153.186 1.98347C156.682 2.53778 160.005 3.8878 162.898 5.92981C159.003 3.1861 154.36 1.70917 149.598 1.69918L149.602 1.6983ZM171.891 18.6316C171.906 18.683 171.918 18.7352 171.932 18.7865C171.897 18.6581 171.862 18.5305 171.824 18.4029C171.842 18.48 171.866 18.5553 171.885 18.6324L171.891 18.6316ZM167.639 10.3629C167.371 10.0289 167.09 9.70862 166.809 9.38911C167.086 9.70943 167.369 10.0289 167.639 10.3629ZM168.85 25.3655C168.838 25.3221 168.828 25.2771 168.816 25.2338C168.845 25.3414 168.875 25.4481 168.906 25.5549C168.884 25.4923 168.864 25.4297 168.846 25.3663L168.85 25.3655ZM173.103 33.6342C173.37 33.9641 173.652 34.2877 173.933 34.608C173.648 34.2917 173.366 33.9682 173.099 33.6382L173.103 33.6342ZM180.001 39.4144C182.742 40.9268 185.76 41.8678 188.874 42.1807C185.759 41.8698 182.74 40.9305 179.997 39.4192L180.001 39.4144ZM190.996 42.2956C195.092 42.3316 199.124 41.2757 202.678 39.2361C199.123 41.2782 195.09 42.3358 190.992 42.3004L190.996 42.2956Z'
            fill='#8668FC'
          />
        </svg>
      </div>
      <div className=' flex flex-col gap-12 container p-7'>
        <h1 className='text-5xl text-gray-900 font-bold '>
          Who can I support?
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 justify-center '>
          <div className='flex flex-col gap-3 text-[24px] sm:text-left'>
            <div className='w-[52px] h-[60px] '>
              <img
                src='/Icons/akarun1x.png'
                srcSet='/Icons/akarun1x.png 1x, /Icons/akarun2x.png 2x'
              />
            </div>
            <h1 className='text-pink-500 font-bold  '>
              <a href='https://q-acc.giveth.io/project/akarun'>Akarun</a>{' '}
            </h1>
            <p className='leading-9 text-[#4F576A] text-left'>
              Akarun is a mobile game where players race custom runners tied to
              live market assets. The fastest runner linked to the
              top-performing asset wins.
            </p>
          </div>

          <div className='flex flex-col gap-3 text-[24px]'>
            <div className='w-[92px] h-[60px]'>
              <Image
                src={'/Icons/beast.png'}
                width={60}
                height={60}
                alt='The Grand Timeline logo'
              />
            </div>
            <h1 className='text-pink-500 font-bold '>
              <a href='https://q-acc.giveth.io/project/ancient-beast'>
                Ancient Beast{' '}
              </a>
            </h1>
            <p className='leading-9 text-[#4F576A]'>
              Ancient Beast is an open-source, match-based (1v1 or 2v2) eSports
              strategy game played against other people or AI. It has no
              chance-based elements and is designed to be easy to learn, fun to
              play, and hard to master.
            </p>
          </div>

          <div className='flex flex-col gap-3 text-[24px]'>
            <div className='w-[50px] h-[60px]'>
              <img
                src='/Icons/citizen1x.png'
                srcSet='/Icons/citizen1x.png 1x, /Icons/citizen2x.png 2x'
              />
            </div>
            <h1 className='text-pink-500 font-bold '>
              <a href='https://q-acc.giveth.io/project/citizen-wallet'>
                Citizen Wallet
              </a>{' '}
            </h1>
            <p className='leading-9 text-[#4F576A]'>
              Citizen Wallet empowers communities and events with Web3 tools to
              easily launch, use, and manage community tokens via a mobile app
              and NFC wallets.
            </p>
          </div>

          <div className='flex flex-col gap-3 text-[24px]'>
            <div className='w-[60px] h-[60px]'>
              <Image
                src={'/Icons/grand.png'}
                width={60}
                height={60}
                alt='The Grand Timeline logo'
              />
            </div>
            <h1 className='text-pink-500 font-bold '>
              <a href='https://q-acc.giveth.io/project/the-grand-timeline'>
                The Grand Timeline
              </a>{' '}
            </h1>
            <p className='leading-9 text-[#4F576A]'>
              The Grand Timeline is a historical research and data visualization
              project about the entire history of blockchains and Web3. It will
              be the first interactive and collectible story of its kind.
            </p>
          </div>

          <div className='flex flex-col gap-3 text-[24px]'>
            <div className='w-[180px] h-[60px]'>
              <img
                src='/Icons/melodex1x.png'
                srcSet='/Icons/melodex1x.png 1x, /Icons/melodex2x.png 2x'
              />
            </div>
            <h1 className='text-pink-500 font-bold '>
              <a href='https://q-acc.giveth.io/project/melodex'>Melodex</a>{' '}
            </h1>
            <p className='leading-9 text-[#4F576A]'>
              Melodex is a decentralized exchange focused on listing
              asset-backed music tokens that represent shares in song royalty
              rights. These tokens enable passive income from music
              monetization.
            </p>
          </div>

          <div className='flex flex-col gap-3 text-[24px]'>
            <div className='w-[62px] h-[60px]'>
              <img
                src='/Icons/prismo1x.png'
                srcSet='/Icons/prismo1x.png 1x, /Icons/prismo2x.png 2x'
              />{' '}
            </div>
            <h1 className='text-pink-500 font-bold '>Prismo Technology</h1>
            <p className='leading-9 text-[#4F576A]'>
              Prismo Technology is a layer-2 hybrid public-private blockchain
              platform designed to enable secure and scalable solutions for
              enterprises and government organizations, facilitating the
              transition of traditional technologies to blockchain.
            </p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row  flex-gap-9 justify-center '>
          <div className='w-[35%]'></div>
          <div className='flex flex-col gap-3 text-[24px]  lg:w-1/2 mr-9'>
            <div className='w-[71px] h-[60px]'>
              <img
                src='/Icons/x231x.png'
                srcSet='/Icons/x231x.png 1x, /Icons/x232x.png 2x'
              />
            </div>
            <h1 className='text-pink-500 font-bold '>
              <a href='https://q-acc.giveth.io/project/x23ai'>x23.ai </a>
            </h1>
            <p className='leading-9 text-[#4F576A]'>
              x23 is automating the future of decentralized organizations by
              integrating AI tools to streamline the operation and governance of
              DAOs, making them more efficient and autonomous.
            </p>
          </div>

          <div className='flex flex-col gap-3 text-[24px] lg:w-1/2'>
            <div className='w-[86px] h-[60px] flex items-center'>
              <img
                src='/Icons/xade1x.png'
                srcSet='/Icons/xade1x.png 1x, /Icons/xade2x.png 2x'
              />
            </div>
            <h1 className='text-pink-500 font-bold '>Xade Finance</h1>
            <p className='leading-9 text-[#4F576A]'>
              Xade Finance is building the AI-powered Robinhood of DeFi. It is a
              decentralized platform driven by AI insights and tools that offers
              a seamless experience for trading and managing digital assets.
            </p>
          </div>
          <div className='w-[35%]'></div>
        </div>
      </div>
    </div>
  );
};
