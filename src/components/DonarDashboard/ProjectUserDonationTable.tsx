import React, { useEffect, useState } from 'react';
import { fetchUserDonations } from '@/services/donation.services';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import Pagination from '../Pagination';
import { formatDateMonthDayYear } from '@/helpers/date';

interface ProjectUserDonationTableProps {
  userId: number;
  projectId: number;
}

interface Donation {
  id: number;
  amount: number;
  createdAt: string;
  transactionId: string;
  project: {
    id: number;
  };
}

const itemPerPage = 5;

const ProjectUserDonationTable: React.FC<ProjectUserDonationTableProps> = ({
  userId,
  projectId,
}) => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageDonations, setPageDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchUserDonationData = async () => {
      const data = await fetchUserDonations(userId);
      if (data) {
        const { donations } = data;

        // Filter donations for the specified projectId
        const filteredDonations = donations.filter(
          (donation: Donation) => donation.project.id === projectId,
        );

        setTotalCount(filteredDonations.length);
        setPageDonations(
          filteredDonations.slice(page * itemPerPage, (page + 1) * itemPerPage),
        );
      }
    };

    fetchUserDonationData();
  }, [userId, projectId, page]);

  if (totalCount === 0) {
    return (
      <div className='bg-white w-full h-[500px] flex items-center justify-center font-bold text-[25px] text-[#82899A]'>
        You didn’t make any contributions to this project yet.
      </div>
    );
  }

  return (
    <div className='container flex flex-col py-1 md:px-6 gap-10'>
      <div className='flex gap-10 lg:flex-row flex-col '>
        <div className='flex flex-col w-full font-redHatText overflow-x-auto'>
          <div className='flex justify-between'>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Date
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Amount [POL]
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Transaction
            </div>
          </div>

          <div className=''>
            {pageDonations.map(donation => (
              <div key={donation.id} className='flex justify-between'>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {formatDateMonthDayYear(donation.createdAt)}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {donation.amount} POL
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
                  <a
                    href={`https://explorer.com/tx/${donation.transactionId}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconViewTransaction size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-center'>
            <Pagination
              currentPage={page}
              totalCount={totalCount}
              setPage={setPage}
              itemPerPage={itemPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUserDonationTable;
