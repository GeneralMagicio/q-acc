import { FC, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import useRemainingTime from '@/hooks/useRemainingTime';
import { Button, ButtonColor } from '../Button';
import { getAdjustedEndDate } from '@/helpers/date';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { NFTModal } from '../Modals/NFTModal';
import { checkUserOwnsNFT } from '@/helpers/token';
import { IProject } from '@/types/project.type';

interface ISupportButtonProps {
  project: IProject;
  disabled?: boolean;
}

export const SupportButton: FC<ISupportButtonProps> = ({
  project,
  disabled,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const { address } = useAccount();
  const router = useRouter();

  const adjustedEndDate = getAdjustedEndDate(activeRoundDetails?.endDate);
  const remainingTime = useRemainingTime(
    activeRoundDetails?.startDate,
    adjustedEndDate,
  );
  const handleSupport = (e: any) => {
    e.stopPropagation();
    async function checkUser() {
      if (activeRoundDetails?.__typename !== 'QfRound') {
        console.log(activeRoundDetails);
        const res = await checkUserOwnsNFT(
          project?.abc?.nftContractAddress || '',
          address || '',
        );
        if (res) {
          router.push(`/support/${project.slug}`);
        } else {
          setModalOpen(true);
        }
      } else {
        router.push(`/support/${project.slug}`);
      }
    }
    checkUser();
  };
  return (
    <>
      <NFTModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        showCloseButton={true}
      />
      <Button
        color={ButtonColor.Giv}
        className={`w-full justify-center opacity-80 ${remainingTime === 'Time is up!' ? '' : 'hover:opacity-100'}`}
        onClick={handleSupport}
        disabled={
          remainingTime === 'Time is up!' ||
          remainingTime === '--:--:--' ||
          disabled
        }
      >
        Buy Token
      </Button>
    </>
  );
};
