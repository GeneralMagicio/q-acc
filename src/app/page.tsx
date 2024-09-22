'use client';
import { Banner } from '@/components/Banner';
import Collaborator from '@/components/Collaborator';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import About from '@/components/About';

const roundsData = [
  { round: 1, cap: '$5K', limit: '$100K' },
  {
    round: 2,
    cap: '$10K minus [funds sent in previous round]',
    limit: '$200K minus [funds collected in previous rounds]',
  },
  {
    round: 3,
    cap: '$15K minus [funds sent in previous round]',
    limit: '$300K minus [funds collected in previous rounds]',
  },
  {
    round: 4,
    cap: '$25K minus [funds sent in previous round]',
    limit: '$500K minus [funds collected in previous rounds]',
  },
];

export default function Home() {
  return (
    <main className='flex flex-col gap-4'>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='bg-white'>
        <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
          <div>
            <h1 className='text-5xl text-gray-900 font-bold mb-6'>
              Welcome to q/acc Season 1
            </h1>
            <p>
              The q/acc protocol provides a community-first, fair launch for
              projects ready to tokenize and share their value creation with
              their community of supporters. We believe in a future where
              community-owned protocols are abundant and mainstream.
            </p>
            <br />
            <p>
              If you’ve been invited by a project to their early access period,
              you’re in the right place.
              <br />
              Here’s what you need to know:
            </p>
          </div>

          <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
            <h1 className='text-gray-800 text-2xl font-bold'>
              🔐 Private Chat
            </h1>
            <p>
              You already have access to the project’s token-gated chat using
              the early access NFT sent to your wallet address by the project.
              Drop by to meet the team.
            </p>
          </div>

          <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
            <h1 className='text-gray-800 text-2xl font-bold'>
              📅 Early Access Mint Rounds
            </h1>
            <p>
              To invite you to their early access window, the project team mints
              a special NFT to your address. That NFT grants you access to
              participate in the early access mint rounds for their project.
              After each round, the value of the project’s token increases based
              on how many new tokens were minted.
            </p>
            <p>
              Making this a fair launch! Individual caps allow more people to
              participate in the important early stage of a project’s token
              economy. Limits for the total amount raised during this period
              ensures that q/acc round supporters will also have a fair deal.
              Once the per-round limit is reached, the round is closed. When the
              limit is reached in the last round, the early access window is
              closed.
            </p>
            <p>
              The per-person cap and per-round limit for each of the early
              access mint rounds are in POL. They are calculated at the start of
              the round based on what the following USD-equiv of POL is at that
              time:
            </p>
            <div className='overflow-x-auto'>
              <table className='min-w-full table-auto'>
                <thead className=''>
                  <tr className='rounded-t-lg'>
                    <th className='px-4 py-2 text-left '>Round</th>
                    <th className='px-4 py-2 text-left'>Per-person cap</th>
                    <th className='px-4 py-2 text-left '>Per-round limit</th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  {roundsData.map((row, index) => (
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

          <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
            <h1 className='text-gray-800 text-2xl font-bold'>🪪 KYC</h1>
            <p>
              You will be asked to complete a zero knowledge KYC before you
              support a project during the mint rounds. This step mitigates
              Sybil attacks and prevents prohibited actors from participating.
              It is fast and easy: find the step-by-step instructions on how to
              complete KYC in our{' '}
              <a
                className='text-[#E1458D] font-semibold'
                target='_blank'
                href='https://giveth.notion.site/Quadratic-Acceleration-q-acc-Knowledge-Hub-4752f35fee2a47fe9e29556dbcfe6883'
              >
                Knowledge Hub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <About />
      <FeaturedProjects />
      <Collaborator />
    </main>
  );
}
