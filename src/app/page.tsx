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
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

import { getMostRecentEndRound } from '@/helpers/round';

const eaRoundsData = [
  { round: 1, cap: '$5K', limit: '$100K' },
  {
    round: 2,
    cap: '$10K minus [any funds sent in previous round]',
    limit: '$200K minus [any funds collected in previous rounds]',
  },
  {
    round: 3,
    cap: '$15K minus [any funds sent in previous round]',
    limit: '$300K minus [any funds collected in previous rounds]',
  },
  {
    round: 4,
    cap: '$25K minus [any funds sent in previous round]',
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

  const isEarlyAccess = activeRoundDetails?.__typename === 'EarlyAccessRound';

  const [isRoundEnded, setIsRoundEnded] = useState(false);

  useEffect(() => {
    const fetchMostRecentEndRound = async () => {
      const res = await getMostRecentEndRound();

      return res?.__typename === 'QfRound';
    };

    const getData = async () => {
      const data = await fetchMostRecentEndRound();
      setIsRoundEnded(data);
    };

    getData();
  }, [activeRoundDetails, isRoundEnded]);

  return isProductReleased ? (
    <main className='flex flex-col gap-4'>
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
        <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
          {isRoundEnded ? '' : <RoundInfoSupporter />}

          <h1 className='text-5xl text-gray-900 font-bold my-6'>
            Welcome to q/acc Season 1
          </h1>
          <div>
            {isRoundEnded ? (
              <p>
                We're currently between seasons, but don't worry—the next
                opportunity to support q/acc projects is just around the corner.
              </p>
            ) : (
              <>
                <p>
                  The q/acc protocol provides a community-first, fair launch for
                  projects ready to tokenize and share their value creation with
                  their community of supporters. We believe in a future where
                  community-owned protocols are abundant and mainstream.
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
              {isEarlyAccess ? (
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
          ) : isEarlyAccess ? (
            <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
              <h1 className='text-gray-800 text-2xl font-bold'>
                📅 Early Access Mint Rounds
              </h1>
              <p>
                Your early-access NFT grants you access to participate in the
                project’s early access mint rounds. After each round, new tokens
                are issued and distributed by the bonding curve, and the value
                of that project’s token changes based on how many new tokens
                were minted.
              </p>
              <p>
                <span className=' italic underline'>
                  Making this a fair launch!
                </span>{' '}
                Individual caps allow more people to participate in the
                important early stage of a project’s token economy. Limits for
                the total amount raised during this period ensures that q/acc
                round supporters will also have a fair deal. Once the per-round
                limit is reached, the round is closed. When the round limit is
                reached in the last round, the early access window is closed for
                that project
              </p>
              <p>
                The per-person, per-project cap and per-round limit for each of
                the early access mint rounds are in POL. They are calculated at
                the start of the round based on what the following USD-equiv of
                POL is at that time:
              </p>
              <div className='overflow-x-auto'>
                <table className='min-w-full table-auto'>
                  <thead className=''>
                    <tr className='rounded-t-lg'>
                      <th className='px-4 py-2 text-left '>Round</th>
                      <th className='px-4 py-2 text-left'>
                        Per person, per project cap (in USD)
                      </th>
                      <th className='px-4 py-2 text-left '>
                        Per-round, per project cap (in USD)
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
                factored into how much of the matching pool is allocated to each
                project. For your support, you will receive project tokens at
                the end of the round. These tokens will grant you access to the
                project’s token-gated chat and utility of the project’s products
                and services
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
                  For Season 1, the maximum combined limit for the early access
                  window and the q/acc round is $1,050,000. The cap optimizes
                  for broad community participation, and limits the maximum
                  number of tokens issued by the ABC during the season.
                </li>
                <li>
                  <span className='text-gray-800 font-bold'>
                    Individual caps:
                  </span>{' '}
                  Individual caps allow more people to participate in the early
                  stage of a project’s token economy. Once the total collected
                  amount reaches $1M, every individual cap decreases to allow
                  even more participants the opportunity to be a suporter.
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
              <h1 className='text-gray-800 text-2xl font-bold'>🪪 KYC</h1>
              <p>
                All supporters are required to complete KYC with PrivadoID
                before participating. The q/acc protocol uses zero knowledge ID
                to comply with AML guidelines, ensure age requirements are met,
                and restrict participation from USA and UK citizens for
                regulatory reasons. This measure both protects project teams and
                mitigates Sybil attacks during q/acc rounds. If you already have
                credentials with PrivadoID, they should work here. If not, it’s
                fast and easy to set up. Get it done so you’re ready to go!.
              </p>
            </div>
          )}
        </div>
      </div>
      <About />
      <FeaturedProjects />
      <Collaborator />
    </main>
  ) : (
    redirect(Routes.KycLanding)
  );
}
