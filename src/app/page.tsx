'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Banner } from '@/components/Banner';
import Collaborator from '@/components/Collaborator';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import About from '@/components/About';
import { RoundInfoSupporter } from '@/components/RoundInfoSupporter';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { isEarlyAccessBranch, isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

import { getMostRecentEndRound } from '@/helpers/round';
import links from '@/lib/constants/links';
import { QaccProjects } from '@/components/QaccProjects';
import CreateAccount from '@/components/CreateAccount';
import QaccRoundCounter from '@/components/QaccRoundCounter';

const eaRoundsData = [
  { round: 1, cap: '$5K', limit: '$100K' },
  {
    round: 2,
    cap: '$15K minus [any funds sent in previous round]',
    limit: '$300K minus [any funds collected in previous rounds]',
  },
  {
    round: 3,
    cap: '$25K minus [any funds sent in previous rounds]',
    limit: '$500K minus [any funds collected in previous rounds]',
  },
];

const qaccRoundData = [
  { collected: 'Less than $1,000,000', limit: '$2,500' },
  { collected: 'Between $1,000,000 - $1,050,000 ', limit: '$250' },
  { collected: 'At $1,050,000 ', limit: 'Round closes for this project' },
];

export default function Home() {
  const { data: activeRoundDetails, isLoading: isLoadingActiveROund } =
    useFetchActiveRoundDetails();

  const [isQaccRound, setIsQaccRound] = useState(false);
  const isEarlyAccess = activeRoundDetails?.__typename === 'EarlyAccessRound';
  // const isQaccRound = activeRoundDetails?.__typename === 'QfRound';

  const [isRoundEnded, setIsRoundEnded] = useState(false);

  useEffect(() => {
    const fetchMostRecentEndRound = async () => {
      const res = await getMostRecentEndRound();
      if (
        res?.roundNumber === 3 ||
        activeRoundDetails?.__typename === 'QfRound'
      ) {
        setIsQaccRound(true);
      }
      return res?.__typename === 'QfRound';
    };

    const getData = async () => {
      const data = await fetchMostRecentEndRound();

      setIsRoundEnded(data);
    };

    getData();
  }, [activeRoundDetails, isRoundEnded]);

  return isProductReleased ? (
    <main className='flex flex-col '>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='bg-white relative overflow-hidden'>
        <Image
          src='/images/bg/round1.png'
          alt='round'
          width={500}
          height={500}
          style={{ position: 'absolute', top: '0', right: '0', opacity: 0.3 }}
        />

        {isEarlyAccessBranch ? (
          <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
            {isRoundEnded ? '' : <RoundInfoSupporter />}

            <h1 className='text-5xl text-gray-900 font-bold my-6'>
              Welcome to q/acc Season 1
            </h1>
            <div>
              {isRoundEnded ? (
                <p>
                  We're currently between seasons, but don't worry—the next
                  opportunity to support q/acc projects is just around the
                  corner.
                </p>
              ) : (
                <>
                  <p>
                    The q/acc protocol provides a community-first, fair launch
                    for projects ready to tokenize and share their value
                    creation with their community of supporters. We believe in a
                    future where community-owned protocols are abundant and
                    mainstream.
                  </p>
                  <br />
                  <p> The future of tokenization starts here.</p>
                  <br />
                </>
              )}

              {isRoundEnded ? (
                <>
                  <p>
                    {' '}
                    In the meantime, you can explore q/acc projects’ tokens
                    available on{' '}
                    <span className='text-[#E1458D] font-bold'>Quickswap</span>.
                  </p>
                  <br />
                  <p> Stay tuned for the next q/acc season!</p>
                </>
              ) : (
                <>
                  {isEarlyAccess ? (
                    <p>
                      If you’ve been invited by a project to their early access
                      period, you’re in the right place.
                      <br />
                    </p>
                  ) : (
                    ''
                  )}

                  <p> Here’s what you need to know:</p>
                </>
              )}
            </div>

            {isRoundEnded ? (
              ''
            ) : (
              <>
                {isEarlyAccess || !isQaccRound ? (
                  <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
                    <h1 className='text-gray-800 text-2xl font-bold'>
                      🔐 Private Chat
                    </h1>
                    <p>
                      You already have access to the project’s token-gated chat
                      using the early access NFT sent to your wallet address by
                      the project. Drop by to meet the team.
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </>
            )}

            {isRoundEnded ? (
              ''
            ) : isEarlyAccess || !isQaccRound ? (
              <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
                <h1 className='text-gray-800 text-2xl font-bold'>
                  📅 Early Access
                </h1>
                <p>
                  Your early-access NFT grants you access to participate in the
                  project’s early access mint rounds. After each round, new
                  tokens are issued and distributed by the bonding curve, and
                  the value of that project’s token changes based on how many
                  new tokens were minted.
                </p>
                <p>
                  <span className=' italic underline'>
                    Making this a fair launch!
                  </span>{' '}
                  Individual caps allow more people to participate in the
                  important early stage of a project’s token economy. Limits for
                  the total amount raised during this period ensures that q/acc
                  round supporters will also have a fair deal. Once the
                  per-round limit is reached, the round is closed. When the
                  round limit is reached in the last round, the early access
                  window is closed for that project.
                </p>
                <p>
                  The per-person, per-project cap and per-round limit for each
                  of the early access mint rounds are in POL. They are
                  calculated at the start of the round based on what the
                  following USD-equiv of POL is at that time.
                </p>
                <p>
                  Once the per-round limit has reached 90%, the per-person
                  per-per-project cap is adjusted downward to prevent multiple
                  pending transactions from exceeding the per-round limit. What
                  this means is: the sooner your supporters act, the better.
                </p>
                <div className='overflow-x-auto'>
                  <table className='min-w-full table-auto'>
                    <thead className=''>
                      <tr className='rounded-t-lg'>
                        <th className='px-4 py-2 text-left '>Round</th>
                        <th className='px-4 py-2 text-left'>
                          Per-person, per-project cap (in USD)
                        </th>
                        <th className='px-4 py-2 text-left '>
                          Per-round limit (in USD)
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-left'>
                      {eaRoundsData.map((row, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? 'bg-white' : ''}`}
                        >
                          <td className='px-4 py-2 rounded-tl-lg rounded-bl-lg'>
                            {row.round}
                          </td>
                          <td className='px-4 py-2'>{row.cap}</td>
                          <td className='px-4 py-2  rounded-tr-lg rounded-br-lg'>
                            {row.limit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
                <h1 className='text-gray-800 text-2xl font-bold'>
                  📅 q/acc Round
                </h1>
                <p>
                  During this q/acc round, your support is a signal that is
                  factored into how much of the matching pool is allocated to
                  each project. For your support, you will receive project
                  tokens at the end of the round. These tokens will grant you
                  access to the project’s token-gated chat and utility of the
                  project’s products and services
                </p>
                <p>
                  <span className=' italic underline'>
                    Making this a fair launch!
                  </span>{' '}
                  In the q/acc round, two important limits are observed: an
                  overall season cap and individual cap.
                </p>
                <ul className='flex flex-col gap-4 list-disc px-10'>
                  <li>
                    <span className='text-gray-800 font-bold'>Season cap:</span>{' '}
                    For Season 1, the maximum combined limit for the early
                    access window and the q/acc round is $1,050,000. The cap
                    optimizes for broad community participation, and limits the
                    maximum number of tokens issued by the ABC during the
                    season.
                  </li>
                  <li>
                    <span className='text-gray-800 font-bold'>
                      Individual caps:
                    </span>{' '}
                    Individual caps allow more people to participate in the
                    early stage of a project’s token economy. Once the total
                    collected amount reaches $1M, every individual cap decreases
                    to allow even more participants the opportunity to be a
                    suporter.
                  </li>
                </ul>
                <div className='overflow-x-auto'>
                  <table className='min-w-full table-auto'>
                    <thead className=''>
                      <tr className='rounded-t-lg'>
                        <th className='px-4 py-2 text-left'>
                          Total Collected Amount (in USD)
                        </th>
                        <th className='px-4 py-2 text-left '>
                          Per-Person, Per-Project Cap (in USD)
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-left'>
                      {qaccRoundData.map((row, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? 'bg-white' : ''}`}
                        >
                          <td className='px-4 py-2'>{row.collected}</td>
                          <td className='px-4 py-2  rounded-tr-lg rounded-br-lg'>
                            {row.limit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {isRoundEnded ? (
              ''
            ) : (
              <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
                <h1 className='text-gray-800 text-2xl font-bold'>🪪 zkID</h1>
                <p>
                  The q/acc protocol uses Privado ID zero knowledge system to
                  maintain integrity and ensure privacy. Participants receive
                  their KYC credential from the Synaps identity verification
                  provider. Whether you have an existing Giveth profile or are
                  creating a new one, you’ll need to complete your{' '}
                  <strong className='font-bold'>
                    zero-knowledge identity verification (zkID)
                  </strong>
                  .
                </p>
                <p>The process is simple:</p>
                <ul className='list-disc px-10'>
                  <li>
                    <strong className='font-bold'>Liveness Check:</strong> This
                    step confirms you’re a real human.
                  </li>
                  <li>
                    <strong className='font-bold'>Documentation Check:</strong>{' '}
                    This step ensures you are not a minor and prevents
                    AML-listed countries from participating, as well as those
                    from the US or UK for regulatory reasons.
                  </li>
                </ul>
                <p>
                  Once verified, your wallet will hold your{' '}
                  <strong className='font-bold'>KYC credential</strong>, which
                  will allow you to participate without sharing personal data.
                  This easy process protects against Sybil attacks and
                  strengthens regulatory compliance.
                </p>
                <p>
                  We’ve put together a simple{' '}
                  <a
                    href={links.PRIVADO_GUIDE_LINK}
                    target='_blank'
                    className='font-bold text-pink-500'
                    referrerPolicy='no-referrer'
                  >
                    step-by-step
                  </a>{' '}
                  guide to walk you through the process.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
            {/* Heading */}
            <div className='flex flex-col gap-6'>
              <h1 className='text-5xl text-gray-900 font-bold mt-10'>
                The q/acc round is starting soon, and you’ll want IN!
              </h1>
              <div className='leading-9 text-[#4F576A]'>
                <p>
                  Get involved with these innovative web3 projects at the
                  earliest stage of their token economies.
                </p>
                <p>
                  Create an account now - zkID verification can take up to 24
                  hours.
                </p>
              </div>

              <QaccRoundCounter />
            </div>

            {/* Why qacc */}

            <div className='flex flex-col p-6 gap-6 rounded-2xl bg-[#F7F7F9] z-40'>
              <h1 className='text-gray-800 text-2xl font-bold'>
                🙋 Why q/acc?
              </h1>
              <div>
                <p>
                  The current approach to token launches often sidelines the
                  community, leaving you out of the action. With the q/acc
                  protocol, that changes. Now, you can participate at the very
                  earliest stage of a web3 startup’s token economy, gaining a
                  stake in these projects’ success and direct access to their
                  teams. 
                </p>
                <p>
                  It’s a win for you, a win for web3 builders, and a boost for
                  the Polygon zkEVM ecosystem.
                </p>
              </div>

              <div className='flex justify-center rounded-md  mx-auto w-[90%] sm:h-[300px] md:h-[500px] lg:h-[720px]'>
                <iframe
                  className='w-full'
                  src='https://www.youtube.com/embed/m30ElzaR--4'
                  title='Quadratic Acceleration (q/acc): The Future of Tokenization'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>

            {/* Whats a Qacc Round */}

            <div className='flex flex-col p-6 gap-6 rounded-2xl bg-[#F7F7F9] z-40 '>
              <h1 className='text-gray-800 text-2xl font-bold'>
                ⌛ What’s a q/acc round?
              </h1>
              <div className='text-[#4F576A] font-redHatText'>
                <p>
                  The q/acc round is open for only two weeks, giving you the
                  chance to support these projects at the very start of their
                  token economies. At the end of the round, you receive tokens
                  for the projects you have supported.
                </p>
                <p className='mb-10'>
                  Additionally, your support provides a signal for the Quadratic
                  Funding (QF) allocation of a Matching Pool. The funds from
                  this pool are then used to provision liquidity for these
                  projects on our partner DEX, QuickSwap. After the q/acc round
                  ends, anyone can acquire the project’s tokens on QuickSwap.
                </p>
                <p className=' italic'>
                  * If you are from an Anti-Money Laundering (AML) listed
                  country or from the US or UK, you will not be able to
                  participate in the q/acc round. Zero-knowledge ID (zkID) is
                  used to comply with AML, and to restrict the US and UK for
                  regulatory reasons. It also mitigates Sybil attacks during the
                  q/acc rounds, ensuring a fair launch, as well as protecting
                  the projects and their supporters. When you create your q/acc
                  account, you will be prompted to complete zkID with our
                  identity partner, Privado.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {isEarlyAccessBranch ? (
        ''
      ) : (
        <>
          <div className='w-full  h-[30px] bg-[#FBBA80]'></div>
          <QaccProjects />
          <br></br>
          <CreateAccount />
          <div className='w-full  h-[30px] bg-[#FBBA80]'></div>
          <br></br>
        </>
      )}

      <About />
      <br />
      {isEarlyAccessBranch ? <FeaturedProjects /> : ''}
      <Collaborator />
    </main>
  ) : (
    redirect(Routes.KycLanding)
  );
}
